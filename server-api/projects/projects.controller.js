var distance = require('google-distance');
distance.apiKey = '';
var projects = require("./projects.model");
var projectTasks = require("./project.tasks.model");
var projectDetails = require("./project.details.model");
var projectAttachments = require("./project.attachments.model");
var taskAttachments = require("./tasks.attachments.model");
var projectTeam = require("./projects.team.model");
var users = require("../users/users.model");
var userSettings = require("../users/user.settings.model");
var userNotifications = require("../users/user.notifications.model");
var group = require("../users/group.modal");
var userGroup = require("../users/user.group.modal");
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
var config = require('../config/config')
var userHelper = require('../helpers/user')
const Op = sequelize.Op;

/**
 * This function is used to create project
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createProjects = (req, res, next) => {
    console.info('\n\n\n', req.body, '\n\n\n')
    projects.create({
        projectName: req.body.projectName,
        description: req.body.description,
        volunteers: req.body.volunteers,
        freelancers: req.body.freelancers,
        zipCode: req.body.zipCode,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        estimatedBudget: req.body.estimatedBudget,
        lastUpdatedBy: req.body.userId,
        lastUpdatedDate: new Date(),
        createdBy: req.body.userId,
        country: req.body.country
    }).then(_projects => {
        sequelize.transaction(function (t) {
            projectTeam.create({
                projectId: _projects.projectId,
                userId: req.body.userId,
                type: 'OWNER',
                startDate: new Date(),
                creationDate: new Date(),
                lastUpdatedDate: new Date(),
                createdBy: req.body.userId,
                lastUpdatedBy: req.body.userId,
                status: 'ACCEPTED'
            })
            if (req.body.projectDetails) {
                sequelize.Promise.each(req.body.projectDetails, function (itemToUpdate) {
                    projectDetails.create({
                        // itemToUpdate,
                        projectId: _projects.projectId,
                        detailType: itemToUpdate.detailType,
                        name: itemToUpdate.name,
                        certificationReq: itemToUpdate.certificationReq,
                        certificationLink: itemToUpdate.certificationLink,
                        attribute1: itemToUpdate.attribute1,
                        attribute2: itemToUpdate.attribute2,
                        attribute3: itemToUpdate.attribute3,
                        attribute4: itemToUpdate.attribute4,
                        attribute5: itemToUpdate.attribute5,
                        createdBy: req.body.userId,
                        lastUpdatedBy: req.body.userId
                    });
                }).then((_createdRecords) => {
                    //create chat team and group
                    group.create({
                        name: 'general',
                        projectId: _projects.projectId
                    }).then((_groupResp) => {
                        userGroup.bulkCreate([
                            {
                                groupId: _groupResp.groupId,
                                projectId: _projects.projectId,
                                userId: req.body.userId
                            }
                        ]).then(() => {
                            projects.findAll({
                                where: {
                                    projectId: _projects.projectId
                                }
                                // ,include: [{ model: projectDetails, nested: true, as: 'projectDetails' }]
                            }).then((_resultProject) => {
                                res.status(200).json({
                                    project: _resultProject
                                });
                            })
                        })
                    })
                });
            } else {
                res.status(200).send()
            }
        })
    })
}

exports.updateProjects = (req, res, next) => {
    var _count = 0;
    projects.hasMany(projectDetails, {
        foreignKey: 'projectId'
    });

    sequelize.transaction(function (t) {
        return projects.update({
            projectName: req.body.projectName,
            description: req.body.description,
            status: req.body.status,
            volunteers: req.body.volunteers,
            freelancers: req.body.freelancers,
            zipCode: req.body.zipCode,
            country: req.body.country,
            location: req.body.location,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            lastUpdatedDate: new Date(),
            estimatedBudget: req.body.estimatedBudget,
            lastUpdatedBy: req.body.userId,
        }, {
                where: {
                    projectId: req.params.projectId
                },
                omitNull: true
            }, {
                transaction: t
            }).then(_projects => {
                projectDetails.destroy({
                    where: {
                        projectId: req.params.projectId
                    },
                    force: true
                }, {
                        transaction: t
                    }).then(() => {
                        if (req.body.projectDetails == null ||
                            req.body.projectDetails == undefined ||
                            req.body.projectDetails.length==0) {
                                projects.findAll({
                                    where: {
                                        projectId: req.params.projectId
                                    },
                                    include: [{
                                        model: projectDetails,
                                        nested: true,
                                        duplicating: false,
                                        required: false
                                    }]
                                }).then((_projects) => {
                                    res.status(200).json({
                                        project: _projects
                                    });
                                }).catch(function (err) {
                                    console.log(err);
                                    throw err
                                });
                        } else {
                            sequelize.Promise.each(req.body.projectDetails, (itemToUpdate) => {
                                projectDetails.create({
                                    projectId: req.params.projectId,
                                    detailType: itemToUpdate.detailType,
                                    name: itemToUpdate.name,
                                    certificationReq: itemToUpdate.certificationReq,
                                    certificationLink: itemToUpdate.certificationLink,
                                    attribute1: itemToUpdate.attribute1,
                                    attribute2: itemToUpdate.attribute2,
                                    attribute3: itemToUpdate.attribute3,
                                    attribute4: itemToUpdate.attribute4,
                                    attribute5: itemToUpdate.attribute5,
                                    createdBy: req.body.userId,
                                    lastUpdatedBy: req.body.userId
                                }, {
                                        omitNull: true
                                    }, {
                                        transaction: t
                                    }).then((_createdRecords) => {
                                        _count++;
                                        if (_count === (req.body.projectDetails).length) {
                                            projects.findAll({
                                                where: {
                                                    projectId: req.params.projectId
                                                },
                                                include: [{
                                                    model: projectDetails,
                                                    nested: true,
                                                    duplicating: false,
                                                    required: false
                                                }]
                                            }).then((_projects) => {
                                                res.status(200).json({
                                                    project: _projects
                                                });
                                            }).catch(function (err) {
                                                console.log(err);
                                                throw err
                                            });
                                        }
                                    }).catch(function (err) {
                                        console.log(err);
                                        throw err
                                    });
                            }).then(()=>{
                                projects.findAll({
                                    where: {
                                        projectId: req.params.projectId
                                    },
                                    include: [{
                                        model: projectDetails,
                                        nested: true,
                                        duplicating: false,
                                        required: false
                                    }]
                                }).then((_projects) => {
                                    res.status(200).json({
                                        project: _projects
                                    });
                                }).catch(function (err) {
                                    console.log(err);
                                    throw err
                                });
                            })
                        }
                    }

                    ).catch((err) => {
                        console.log("Unable to delete :- ", err);
                        res.status(500).send(err)
                    })
            }).catch((err) => {
                console.log("Unable to update :- ", err);
                res.status(500).send(err)
            })
    })
}



/**
 * GET - list of projects based on User Search Criteria. It may or may not be created or assigned to the user 
 */
exports.getProjects = (req, res, next) => {
    var _country = req.body.country
    var _volunteers = req.body.volunteers
    var _freelancers = req.body.freelancers
    var _keywords = req.body.keywords
    var _projectStatus = req.body.projectStatus
    var _impactCategories = req.body.interests


    var keywordsArray = _keywords ? _keywords.replace(', ', ',').replace(' ,', ',').split(',') : null;

    var _impactCategoriesSql = '';
    if (_impactCategories) {
        for (var i = 0; i < _impactCategories.length; i++) {
            _impactCategoriesSql = _impactCategoriesSql + `details.name= '${_impactCategories[i]}'  OR `
        }
    }
    var _keywordsSql = '';
    if (_keywords) {
        for (var i = 0; i < keywordsArray.length; i++) {
            _keywordsSql = _keywordsSql + `(projects.description LIKE '%${keywordsArray[i]}%' OR projects.project_name LIKE '%${keywordsArray[i]}%') OR `
        }
    }
    var _sql2 = 'SELECT projects.*, details.name FROM philance.projects as projects INNER JOIN philance.project_details as details ON projects.project_id=details.project_id where projects.country=\'Afghanistan\' AND (details.name=\'Elderly\' OR details.name=\'Other\' )'
    var _sql = ''
    _sql = _impactCategories.length != 0 ? _sql + 'SELECT projects.*, details.name FROM philance.projects as projects   ' : 'SELECT projects.* FROM philance.projects as projects   ';
    _sql = _impactCategories.length != 0 ? _sql + ' INNER JOIN philance.project_details as details ON projects.project_id=details.project_id   ' : _sql;
    _sql = _sql + 'where ';
    _sql = _country ? _sql + `projects.country = '${_country}'   AND ` : _sql;
    _sql = _projectStatus ? _sql + `projects.status = '${_projectStatus}'   AND ` : _sql;
    _sql = _volunteers ? _sql + `projects.volunteers > 0   AND ` : _sql;
    _sql = _freelancers ? _sql + `projects.freelancers > 0   AND ` : _sql;
    _sql = _keywords ? _sql + `${_keywordsSql.slice(0, -3)}   AND ` : _sql;
    _sql = _impactCategories.length != 0 ? _sql + `(${_impactCategoriesSql}  )` : _sql;
    _sql = _sql.slice(0, -6)
    _sql = _impactCategories.length != 0 ? _sql + `)` : _sql;

    sequelize.query(_sql, {
        type: sequelize.QueryTypes.SELECT
    }).then((projects) => {
        var respProjects = {}
        var keys = []
        for (var i = 0; i < projects.length; i++) {
            if (!keys.includes(projects[i].project_id)) {
                respProjects[projects[i].project_id] = projects[i]
                respProjects[projects[i].project_id].interests = []
                respProjects[projects[i].project_id].interests.push(projects[i].name)
            } else {
                respProjects[projects[i].project_id].interests.push(projects[i].name)
            }
            keys.push(projects[i].project_id)
        }

        res.status(200).send({
            respProjects: Object.values(respProjects)
        })
        delete respProjects;
        delete keys;

    })
        .catch((err) => {
            console.log(err)
        })

    // projects.findAll({
    //     hierarchy: true,
    //     attributes: ['project_id']
    //   }).then(function(results) {
    //     console.log(results)
    //     // res.render('index', { nested_cat: results });
    //   });

    // })
};


/**
 * This is to get the specific Project details based on the projectId 
 */


projects.hasMany(projectDetails, {
    foreignKey: 'projectId'
});
projects.hasMany(projectTeam, {
    foreignKey: 'projectId'
});
projects.hasMany(projectAttachments, {
    foreignKey: 'projectId'
});
projectAttachments.belongsTo(users, {
    foreignKey: 'createdBy'
});
projectTasks.hasMany(taskAttachments, {
    as: 'taskAttachments',
    foreignKey: 'taskId'
});
taskAttachments.belongsTo(users, {
    foreignKey: 'createdBy'
});
projects.hasMany(projectTasks, {
    foreignKey: 'projectId'
});
projectTasks.belongsTo(users, {
    as: 'assignee',
    foreignKey: 'assignedTo'
});
projectTasks.belongsTo(users, {
    as: "author",
    foreignKey: 'assignedBy'
});
projects.hasMany(group, {
    as: "chatGroup",
    foreignKey: 'projectId'
});

exports.getProjectById = (req, res, next) => {
    users.hasMany(projectTeam, {
        foreignKey: 'userId'
    });
    projectTeam.belongsTo(users, {
        foreignKey: 'userId'
    });

    projects.findAll({
        where: {
            projectId: req.params.projectId
        },
        include: [{
            model: projectDetails,
            nested: true,
            duplicating: false,
            required: false,
        },
        {
            model: projectAttachments,
            nested: true,
            include: {
                model: users
            }
        },
        {
            model: group,
            nested: true,
            required: false,
            as: 'chatGroup'
        },
        {
            model: projectTasks,
            nested: true,
            required: false,
            include: [{
                model: users,
                as: "author"
            }, {
                model: users,
                as: "assignee"
            },
            {
                model: taskAttachments,
                as: 'taskAttachments'
            }
            ],
            where: {
                status: {
                    [Op.ne]: "Archived"
                }
            }
        },
        {
            model: projectTeam,
            nested: true,
            duplicating: false,
            required: false,
            include: [{
                model: users,
                required: true,
                nested: true,
            }, //, {attributes: ['fname' ,'lname', 'email'] }//, where : {userId : projectTeam.userId}}
            ]
        }
        ]
    }).then((_project) => {

        res.status(200).json({
            project: _project
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}


exports.resourceApplyForProject = (req, res, next) => {
    users.hasOne(userSettings, {
        foreignKey: 'userId'
    })
    projectTeam.findAll({
        where: {
            projectId: req.params.projectId,
            userId: req.body.userId
        }
    }).then(_projectTeam => {
        if (_projectTeam === null || _projectTeam.length === 0) {
            projectTeam.create({
                projectId: req.params.projectId,
                userId: req.body.userId,
                applicantMessage: req.body.applicantMessage,
                role: req.body.role,
                type: 'MEMBER',
                status: 'APPLIED',
                // appliedDate: sequelize.literal('CURRENT_TIMESTAMP'),
                // creationDate: sequelize.literal('CURRENT_TIMESTAMP'),
                createdBy: req.body.userId,
                // lastUpdatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
                lastUpdatedBy: req.body.userId
            }).then((_projectTeam) => {

                users.findOne({
                    where: {
                        [Op.and]: {
                            userId: req.body.userId
                        }
                    }
                }).then((user) => {
                    projectTeam.findOne({
                        where: {
                            [Op.and]: {
                                projectId: req.params.projectId,
                                [Op.or]: {
                                    type: 'OWNER'
                                }
                            }
                        }
                    }).then((projectOwner) => {
                        var dev
                        if (process.env.NODE_ENV === 'production') {
                            dev = config.production.secure;

                        } else {
                            dev = config.development.unsecure;

                        }
                        users.findOne({
                            where: {
                                [Op.and]: {
                                    userId: projectOwner.dataValues.userId
                                }
                            },
                            include: [{
                                model: userSettings
                            }]
                        }).then((Owner) => {
                            projects.findOne({
                                where: {
                                    projectId: req.params.projectId
                                }
                            }).then((project) => {
                                console.log(project.dataValues.projectName)
                                console.log(Owner.dataValues.user_setting.dataValues);
                                console.log('Owner.dataValues.user_setting.dataValues', user.dataValues.firstName);

                                //send notifications
                                userNotifications.create({
                                    userId: projectOwner.dataValues.userId,
                                    notificationTrigger: 'USERAPPLY',
                                    email: Owner.dataValues.user_setting.dataValues.emailNotifications,
                                    push: Owner.dataValues.user_setting.dataValues.pushNotifications,
                                    text: Owner.dataValues.user_setting.dataValues.textNotifications,
                                    message: `${user.dataValues.firstName} ${user.dataValues.lastName} has applied to your project '${project.dataValues.projectName}'`,
                                    creationDate: new Date(),
                                    createdBy: req.body.userId,
                                    lastUpdatedDate: new Date(),
                                    lastUpdatedBy: req.body.userId
                                })
                                //email Owner
                                userHelper.emailUsers({
                                    config: {
                                        from: 'noreply@philance.org',
                                        to: Owner.dataValues.email,                      //email to be requested from the database
                                    },
                                    data: {
                                        subject: 'Philance Project Application',
                                        text: user.dataValues.firstName + ' has successfully applied'
                                    }
                                })
                                //email  applicant
                                userHelper.emailUsers({
                                    config: {
                                        from: 'noreply@philance.org',
                                        to: user.dataValues.email,                      //email to be requested from the database
                                    },
                                    data: {
                                        subject: 'Philance Project Application',
                                        text: 'You have successfully applied'
                                    }
                                })
                            })
                        })

                    })
                })
                //send email

                res.status(200).json({
                    message: "User successfully applied for the Project",
                    Application: _projectTeam
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err.message
                });
            })
        } else {
            console.log('User already applied for the Project');
            return res.status(409).json({
                message: "User already applied for the Project",
                Application: _projectTeam
            })
        }

    })
}



/**
 * This is to get the list if users who applied for a specific Project. This is called when comes to one comes to candidate review page
 */

exports.resourceListForReview = (req, res, next) => {

    projects.hasMany(projectDetails, {
        foreignKey: 'projectId'
    });
    projects.hasMany(projectTeam, {
        foreignKey: 'projectId'
    });
    users.hasMany(projectTeam, {
        foreignKey: 'userId'
    });
    projectTeam.belongsTo(users, {
        foreignKey: 'userId'
    });
    projectTeam.belongsTo(projects, {
        foreignKey: 'projectId'
    });

    projectTeam.findAll({
        // raw: true,
        where: {
            projectId: req.params.projectId
        },
        include: [{
            model: users,
            nested: false,
            duplicating: false,
            attributes: ['userId', 'firstName', 'lastName', 'email']
        }, {
            model: projects,
            nested: false,
            duplicating: false,
            attributes: ['projectName', 'createdBy']
        }]
    }).then((_projectTeam) => {
        res.status(200).json({
            Candidates: _projectTeam
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}

/**
 * 
 */
exports.resourceApproveOrReject = (req, res, next) => {

    users.hasMany(projectTeam, {
        foreignKey: 'userId'
    });
    projectTeam.belongsTo(users, {
        foreignKey: 'userId'
    });
    sequelize.transaction(function (t) {
        sequelize.Promise.each(req.body.projectTeam, function (itemToUpdate) {
            var startDate = null;
            switch (itemToUpdate.status) {
                case 'REJECTED':
                    startDate = null;
                    break;
                case 'ACCEPTED':
                    startDate = new Date()
                    break;
                default:
                    startDate = null;
            }
            projectTeam.update({
                startDate: itemToUpdate.startDate,
                endDate: itemToUpdate.endDate,
                status: itemToUpdate.status,
                startDate: startDate,
                lastUpdatedBy: itemToUpdate.userId,
                lastUpdatedDate: itemToUpdate.lastUpdatedDate
            }, {
                    where: {
                        projectId: req.params.projectId,
                        userId: itemToUpdate.applicantId
                    }
                })
                .then(() => {
                    projects.findOne({
                        where: {
                            projectId: req.params.projectId
                        }
                    }).then((_project) => {

                        var notificationTrigger;
                        var message;
                        switch (itemToUpdate.status) {
                            case 'ACCEPTED':
                                {
                                    notificationTrigger = 'USERSELECT'
                                    message = `Congratulations you have been selected to work on the project '${_project.dataValues.projectName}'`
                                }
                                break;
                            case 'REJECTED':
                                {
                                    message = `No openings for project '${_project.dataValues.projectName}', that you applied for`
                                }
                                break;
                            default:
                                notificationTrigger = 'USERREJECT'
                                break;
                        }
                        userNotifications.create({
                            userId: itemToUpdate.applicantId,
                            notificationTrigger: notificationTrigger,
                            message: message,
                            creationDate: new Date(),
                            createdBy: req.body.userId,
                            lastUpdatedDate: new Date(),
                            lastUpdatedBy: req.body.userId
                        })
                        //add suer to messenging group
                        if (itemToUpdate.status == 'ACCEPTED') {
                            group.findOne({
                                where: {
                                    projectId: req.params.projectId,
                                    name: 'general'
                                }
                            }).then((_groupResp) => {
                                userGroup.create({
                                    userId: itemToUpdate.applicantId,
                                    groupId: _groupResp.groupId
                                })
                            })
                        }
                    })

                })
        })
    }).then(_updatedRows => {
        projectTeam.findAll({
            raw: true,
            where: {
                projectId: req.params.projectId
            },
            include: [{
                model: users,
                nested: false,
                duplicating: false,
                attributes: ['userId', 'firstName', 'lastName', 'email']
            }]
        }).then(function (_projectTeam) {
            res.status(200).json({
                Candidates: _projectTeam
            });
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    })
}
/**
 * Update the database after the upload finishes regarding the user files
 */

exports.updateUserAttachments = (req, res, next) => {

}
/**
 * Get access of files
 */

exports.getProjectAttachments = (req, res, next) => {
    projectAttachments.findOne({
        where: {
            [Op.and]: {
                projectId: req.params.projectId,
                attachment: `/philance/projects/files/${req.params.projectId}/uploads/${req.params.fileName}`,
            }
        }
    }).then((instance) => {
        res.sendFile(instance.attachmentPath)
    }).catch((err) => {
        res.status(404).send(err)
    })
}
/**
 * get team member by userId and projectId
 */

exports.getProjectTeamMember = (req, res, next) => {
    projectTeam.belongsTo(users, {
        foreignKey: 'userId'
    })
    projectTeam.hasOne(projects, {
        foreignKey: 'project_id'
    })
    projectTeam.findOne({
        where: {
            [Op.and]: {
                userId: req.params.userId,
                projectId: req.params.projectId,
            }
        },
        include: [{
            model: users
        },
        {
            model: projects
        }
        ]
    }).then((_user) => {
        res.status(200).send(_user)
    }).catch((err) => {
        res.status(500).send(err)
    })
}
exports.deleteProjectAttachment = (req, res, next) => {
    //TODO: Delete File from server
    //
    //

    projectAttachments.destroy({
        where: {
            [Op.and]: {
                attachment: `/philance/projects/files/${req.params.projectId}/uploads/${req.params.fileName}`,
                projectId: req.params.projectId
            }
        }
    }).then((response) => {
        res.sendStatus(200)
    })
}

exports.deleteProjectTaskAttachment = (req, res, next) => {
    //TODO: Delete File from server
    //
    //
    taskAttachments.destroy({
        where: {
            [Op.and]: {
                attachment: `/philance/projects/${req.params.projectId}/tasks/${req.params.taskId}/files/uploads/${req.params.fileName}`,
                projectId: req.params.projectId,
                taskId: req.params.taskId
            }
        }
    }).then((response) => {
        res.sendStatus(200)
    })
}
exports.createProjectTask = (req, res, next) => {
    projectTasks.create({
        projectId: req.params.projectId,
        taskName: req.body.taskName,
        description: req.body.description,
        assignedTo: req.body.assignedTo,
        assignedBy: req.body.assignedBy,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        priority: req.body.priority,
        targetHours: req.body.targetHours,
        creationDate: new Date(),
        createdBy: req.body.assignedBy
    }).then((response) => {
        res.status(200).send(response)
    }).catch((err) => {
        res.status(500).send(err)
    })
}
exports.updateProjectTask = (req, res, next) => {
    projectTasks.update({
        taskName: req.body.taskName,
        description: req.body.description,
        assignedTo: req.body.assignedTo,
        assignedBy: req.body.assignedBy,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        priority: req.body.priority,
        targetHours: req.body.targetHours,
        lastUpdatedDate: new Date(),
        lastUpdatedBy: req.body.assignedBy
    }, {
            where: {
                [Op.and]: {
                    taskId: req.params.taskId,
                    projectId: req.params.projectId,
                }
            }
        }).then((response) => {
            res.status(200).send(response)
        }).catch((err) => {
            res.status(500).send(err)
        })
}
exports.projectTasksFileUploaded = (req, res, next) => {
    // log(JSON.parse(req.body.param))
    taskAttachments.create({
        taskId: JSON.parse(req.body.param).taskInfo.taskId,
        projectId: JSON.parse(req.body.param).taskInfo.projectId,
        name: req.file.filename,
        originalName: req.file.originalname,
        attachment: `/philance/projects/${JSON.parse(req.body.param).taskInfo.projectId}/tasks/${JSON.parse(req.body.param).taskInfo.taskId}/files${req.file.filename}`,
        attachmentPath: req.file.path,
        creationDate: new Date(),
        createdBy: JSON.parse(req.body.param).taskInfo.userId,
    }).then(() => {
        res.send('Files uploaded')
    })
}