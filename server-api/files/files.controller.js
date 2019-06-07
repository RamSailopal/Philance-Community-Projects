'use strict';
var fs = require('fs');
var users = require('../users/users.model')
var { mediaHost } = require('../config')
const UserController = require('../users/users.controller');
const ProjectsController = require('../projects/projects.controller');
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
const moment = require('moment');
const projectAttachments = require('../projects/project.attachments.model');
const projectLinkAttachments = require('../projects/project.link.attachments.model');
var projects = require("../projects/projects.model");

exports.filesUpload = (req, res, next) => {

    switch (JSON.parse(req.body.param).uploadType) {

        case 'userProfileImage': {
            UserController.updateUserImage(req, res, next)
            break;
        }
        case 'projectTaskFiles': {
            ProjectsController.projectTasksFileUploaded(req, res, next)
            break;
        }
        case 'editProjectFiles':
        case 'startProjectFiles': {
            projectAttachments.create({
                projectId: JSON.parse(req.body.param).userInfo.projectId,
                name: req.file.filename,
                originalName: req.file.originalname,
                attachment: `/philance/projects/files/${JSON.parse(req.body.param).userInfo.projectId}${req.file.filename}`,
                creationDate: new Date(),
                attachmentPath: req.file.path,
                createdBy: JSON.parse(req.body.param).userInfo.userId,
                lastUpdatedDate: new Date(),
                lastUpdatedBy: JSON.parse(req.body.param).userInfo.userId,
                attachmentType: JSON.parse(req.body.param).attachmentType
            })
                .then(() => {
                    if (JSON.parse(req.body.param).setDefaultImage == true) {
                        projects.update({
                            defaultImage: `/philance/projects/files/${JSON.parse(req.body.param).userInfo.projectId}${req.file.filename}`,
                        }, {
                                where: {
                                    projectId: JSON.parse(req.body.param).userInfo.projectId
                                }
                            }).then((resp) => {
                                res.status(200).send(resp)
                            }).catch(err => {

                                res.status(500).send({
                                    error: err
                                })
                            })
                    }
                    res.status(200).send({
                        filepath: mediaHost() + req.file.filename
                    })
                })
                .catch((err) => {

                    res.status(500).send({
                        error: err
                    })
                })
        }
            break;

        default: null
            break;
    }
}
exports.linksUpload = (req, res, next) => {
    if (req.body.links) {
        let counter = 0, createdCounter = 0;
        req.body.links.map((link) => {
            projectLinkAttachments.findOrCreate({
                where: {
                    projectId: link.projectId,
                    attachmentPath: link.link,
                    attachmentType: link.attachmentType,
                },
                defaults: {
                    creationDate: new Date(),
                    createdBy: link.userId,
                    lastUpdatedDate: new Date(),
                    lastUpdatedBy: link.userId,
                }
            }).then(([obj, created]) => {
                if (created) {
                    createdCounter++
                }
                counter++
                if (counter == req.body.links.length) {
                    res.status(200).send({
                        linksUploaded: createdCounter
                    })
                }
            }).catch(() => {
                res.status(500).send("some links were not uploaded")

            })
        })
    }

}

exports.linksUploadEdit = (req, res, next) => {
    if (req.body.links) {
        req.body.links.map((link, index) => {

            projectLinkAttachments.findOne({ where: { id: link.id } })
                .then(function (obj) {
                    if (obj) { // update
                        projectLinkAttachments.update({
                            projectId: link.projectId,
                            attachmentPath: link.attachmentPath,
                            attachmentDetails: link.attachmentDetails,
                            attachmentType: link.attachmentType,
                            lastUpdatedDate: new Date(),
                            lastUpdatedBy: link.userId,
                        }, {
                                where: {
                                    id: link.id,
                                }
                            }).then(() => {
                                if (index == req.body.links.length - 1) {
                                    res.status(200).send({
                                        linksUploaded: createdCounter
                                    })
                                }
                            }).catch(() => {
                                res.status(500).send("some links were not updated")
                                return
                            })
                    }
                    else { // insert
                        projectLinkAttachments.findOrCreate({
                            where: {
                                projectId: link.projectId,
                                attachmentPath: link.attachmentPath,
                                attachmentType: link.attachmentType,
                            },
                            defaults: {
                                creationDate: new Date(),
                                createdBy: link.userId,
                                lastUpdatedDate: new Date(),
                                lastUpdatedBy: link.userId,
                            }
                        }).then(() => {
                            if (index == req.body.links.length - 1) {
                                res.status(200).send({
                                    linksUploaded: createdCounter
                                })
                            }
                        }).catch(() => {
                            res.status(500).send("some links were not uploaded")

                            return
                        })
                    }
                })


        })
    }
}