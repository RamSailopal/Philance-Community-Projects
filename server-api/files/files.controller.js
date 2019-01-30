'use strict';
var fs = require('fs');
var users = require('../users/users.model')
var {mediaHost}=require('../config')
const UserController = require('../users/users.controller');
const ProjectsController = require('../projects/projects.controller');
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
const moment = require('moment');
const projectAttachments = require('../projects/project.attachments.model');

exports.filesUpload = (req, res, next) => {
console.log(req.file);

    switch(JSON.parse(req.body.param).uploadType){

        case 'userProfileImage':{
            UserController.updateUserImage(req,res,next)
        }
        break;
        case 'projectTaskFiles':{
            ProjectsController.projectTasksFileUploaded(req,res,next)
        }
        break;
        case 'startProjectFiles':{
            // sequelize.query(`INSERT INTO philance.project_attachments () VALUES ()`)
            projectAttachments.create({
                projectId: JSON.parse(req.body.param).userInfo.projectId,
                name: req.file.filename,
                originalName: req.file.originalname,
                attachment:`/philance/projects/files/${JSON.parse(req.body.param).userInfo.projectId}${req.file.filename}`, 
                creationDate:new Date(), 
                attachmentPath:req.file.path, 
                createdBy:JSON.parse(req.body.param).userInfo.userId,
                lastUpdatedDate: new Date(),
                lastUpdatedBy: JSON.parse(req.body.param).userInfo.userId
            })
            .then(()=>{
                res.status(200).send({
                    filepath:mediaHost()+req.file.filename
                })
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).send({
                    error:err
                })
            })
        }
        break;

        default:null
        break;
    }
}