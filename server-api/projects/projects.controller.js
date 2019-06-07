var distance = require('google-distance');
distance.apiKey = '';
var projects = require("./projects.model");
var projectTasks = require("./project.tasks.model");
var projectDetails = require("./project.details.model");
var projectUpdates = require("./project.updates.model");
var projectAttachments = require("./project.attachments.model");
var taskAttachments = require("./tasks.attachments.model");
const projectLinkAttachments = require('../projects/project.link.attachments.model');
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
        country: req.body.country,
        projectSummary: req.body.summary,
        projectChallenge: req.body.challenge,
        projectSolution: req.body.solution,
        projectJustification: req.body.justification,
        budgetDetails: req.body.budgetDetails,
        city: req.body.city,
        suppliesNeeded: req.body.suppliesNeeded,

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
                status: 'ACCEPTED',
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
                        userGroup.bulkCreate([{
                            groupId: _groupResp.groupId,
                            projectId: _projects.projectId,
                            userId: req.body.userId
                        }]).then(() => {
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
exports.updatesProjectOnly = (req, res) => {
    projects.update(
        req.body.fields, {
            where: {
                projectId: req.params.projectId
            }
        }
    ).then(() => {
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

            throw err
        });
    }).catch(err => {
        res.status(500).send(err)
    })
}

exports.updateProjects = (req, res, next) => {
    if (req.query.exclusiveUpdate) {
        this.updatesProjectOnly(req, res, next)
        return
    }
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
            estimatedBudget: req.body.estimatedBudget,
            lastUpdatedDate: new Date(),
            lastUpdatedBy: req.body.userId,
            suppliesNeeded: req.body.suppliesNeeded,
            city: req.body.city,
            projectSummary: req.body.projectSummary,
            projectChallenge: req.body.projectChallenge,
            projectSolution: req.body.projectSolution,
            projectJustification: req.body.projectJustification,
            budgetDetails: req.body.budgetDetails,
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
                            req.body.projectDetails.length == 0) {
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

                                                throw err
                                            });
                                        }
                                    }).catch(function (err) {

                                        throw err
                                    });
                            }).then(() => {
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
 * Current input in Req
 *      body:{
 *          country,
 *          volunteers,
 *          freelancers,
 *          keywords,
 *          projectStatus,
 *          interests
 *      }
 *  sample output
 * "respProjects": [
 *      {
 *          "project_id": 1,
 *          "project_name": "Improve Rural Moroccan Schools: Sami's Project",
 *          "description": "fjkshdjkfsd",
 *          "volunteers": "5",
 *          "freelancers": "7",
 *          "location": "Sample Location",
 *          "start_date": "2019-03-21T18:30:00.000Z",
 *          "end_date": "2019-03-26T18:30:00.000Z",
 *          "zip_code": "125055",
 *          "country": "India",
 *          "estimated_budget": "50000.00",
 *          "status": "ACTIVE",
 *          "creation_date": "2019-03-19T13:25:13.000Z",
 *          "created_by": 1,
 *          "last_updated_date": "2019-03-20T12:53:07.000Z",
 *          "last_updated_by": 1,
 *          "original_name": null,
 *          "attachment": null,
 *          "defaultImage":'Should have unique name'
 *          "interests": [
 *              'Child Welfare','etc'
 *          ]
 *      },
 */
projects.hasMany(projectDetails, { foreignKey: 'projectId', as: 'searchableProjectDetails' });

// projects.belongsTo(users, {
//     foreignKey: 'created_by',
//     scope: {
//         created_by:
//         {
//             $col: 'projectCreatedByDetails.user_id'
//         }
//     },
//     as: 'projectCreatedByDetails'
// });


exports.getProjects = (req, res, next) => {
    // projects.hasMany(projectDetails, { foreignKey: 'projectId' });
    const offset = (req.body.activePage - 1) * req.body.pageSize
    const limit = req.body.pageSize
    var whereClause = {}
    /**
     * Directly Match country with body
     */
    if (req.body.country) {
        whereClause['country'] = req.body.country
    }
    /**
     * Check for volunteers greater than 0
     */

    if (req.body.volunteers) {
        whereClause['volunteers'] = {
            [Op.gt]: 0
        }
    }

    /**
     * Check for freelancers greater than 0
     */

    if (req.body.freelancers) {
        whereClause['freelancers'] = {
            [Op.gt]: 0
        }
    }

    /**
     * in the following logic, We are checking the keyworkd in different sets of columns.
     * in the following example, Keywords are matched either by project name, OR by project description
     */
    if (req.body.keywords) {
        /**
         * Convert comma seperated keywords to array
         */
        let keywords = req.body.keywords.split(',')
        whereClause[Op.or] = [{
            [Op.or]: keywords.map(keyword => {
                return {
                    projectName: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            })
        },
        {
            [Op.or]: keywords.map(keyword => {
                return {
                    description: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            })
        },
        ]
    }

    /**
     * Directly Match country with body
     */

    if (!req.body.status) {
        whereClause['status'] =
            { [Op.not]: 'UNPUBLISHED' }
    } else {
        whereClause['status'] = req.body.status
    }

    let query = {
        where: whereClause
    }
    let query1 = {
        where: whereClause
    }
    if (req.query.l) {
        query['limit'] = parseInt(req.query.l)
    }
    if (offset) {
        query['offset'] = offset
    }
    if (limit) {
        query['limit'] = limit
    }
    if (req.body.obd) {
        if (req.body.obd == 'DESC') {
            query['order'] = [['creationDate', 'DESC']]
        } else {
            query['order'] = [['creationDate']]
        }
    }

    if (req.body.interests) {
        query['include'] = []
        query['include'][0] = {
            model: projectDetails,
            required: false,
            as: 'searchableProjectDetails',
            attributes: [
                'name'
            ],
            where: {
                name: [req.body.interests]
            }
        }
        query['include'][1] = {
            model: projectDetails,
            required: false,
            attributes: [
                'name'
            ]
        }
    } else {
        query['include'] = []
        query['include'][0] =
            {
                model: projectDetails,
                required: false,
                attributes: [
                    'name'
                ]
            }
        query['include'][1] = {
            model: users,
            required: false,
            attributes: [
                'firstName', 'lastName',
            ],
            as: 'projectCreatedByDetails'

        }
    }

    /**
     * Execute the query by including/joining the project details with the projects table 
     */
    //total pages shown in the pagination 
    projects.findAndCountAll(
        // {
        //     where: {
        //         status:
        //             { [Op.not]: 'UNPUBLISHED' }
        //     }
        // }
        query1
    )
        .then((data) => {
            let pages = Math.ceil(data.count);
            //total pages shown in the pagination 
            projects.findAll(query).then((resp) => {
                res.status(200).send({
                    respProjects: resp,
                    totalPages: pages
                })
            }).catch((err) => {

                res.status(500).send(err)
            })
        });
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
projects.hasMany(projectTeam, {
    foreignKey: 'projectId',
    as: 'acceptedVolunteers'
});
projects.hasMany(projectTeam, {
    foreignKey: 'projectId',
    as: 'acceptedFreelancers'
});
projects.hasMany(projectAttachments, {
    foreignKey: 'projectId'
});
projects.hasMany(projectLinkAttachments, {
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
projects.belongsTo(users, {
    foreignKey: 'created_by',
    scope: {
        created_by: {
            $col: 'projectCreatedByDetails.user_id'
        }
    },
    as: 'projectCreatedByDetails'
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
                model: users,
                attributes: ['userId', 'firstName', 'lastName', 'organization', 'title', 'rate', 'auth_src', 'status', 'interests', 'location', 'description', 'country']

            }
        },
        {
            model: users,
            required: false,
            attributes: [
                'firstName', 'lastName', 'email'
            ],
            as: 'projectCreatedByDetails'
        },
        {
            model: projectLinkAttachments,
            // as: 'projectLinks',
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
                as: "author",
                attributes: ['userId', 'firstName', 'lastName', 'organization', 'title', 'rate', 'auth_src', 'status', 'interests', 'location', 'description', 'country']
            },
            {
                model: users,
                as: "assignee",
                attributes: ['userId', 'firstName', 'lastName', 'organization', 'title', 'rate', 'auth_src', 'status', 'interests', 'location', 'description', 'country']
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
                attributes: ['userId', 'firstName', 'lastName', 'organization', 'title', 'rate', 'auth_src', 'status', 'createdBy', 'interests', 'location', 'description', 'country']
            }, //, {attributes: ['fname' ,'lname', 'email'] }//, where : {userId : projectTeam.userId}}
            ]
        },
        {
            model: projectTeam,
            nested: true,
            duplicating: false,
            required: false,
            as: 'acceptedVolunteers',

            where: {
                [Op.and]: {
                    projectId: req.params.projectId,
                    status: "ACCEPTED",
                    role: 'volunteer'
                }
            }
        },
        {
            model: projectTeam,
            nested: true,
            duplicating: false,
            required: false,
            as: 'acceptedFreelancers',

            where: {
                [Op.and]: {
                    projectId: req.params.projectId,
                    status: "ACCEPTED",
                    role: 'freelancer'
                }
            }
        }
        ]
    }).then((_project) => {
        res.status(200).json({
            project: _project
        });
    }).catch(err => {

        res.status(500).json({
            error: err
        });
    })
}
exports.getRecentProject = (req, res, next) => {

    projects.findAll({
        limit: 3,
        order: [
            [{
                model: projects,
                as: 'projects'
            }, 'creation_date', 'DESC']
        ],
        include: [{
            model: projectDetails,
            nested: true,
            duplicating: false,
            required: false,
            attributes: [
                'name'
            ],
        }]
    }).then((_project) => {
        res.status(200).json({
            recentProject: _project
        });
    }).catch(err => {

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
                                        to: Owner.dataValues.email, //email to be requested from the database
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
                                        to: user.dataValues.email, //email to be requested from the database
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

                res.status(500).json({
                    error: err.message
                });
            })
        } else {

            return res.status(409).json({
                message: "User already applied for the Project",
                Application: _projectTeam
            })
        }

    })
}

exports.submitQuery = (req, res, next) => {


    // contactQuery.create({
    //     firtsName: req.body.firtsName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     queryDate: new Date(),
    //     message: req.body.message,
    // }).then((res) => {

    //     res.status(200).json({
    //         response: res
    //     });
    // }).catch(err => {
    //    
    //     res.status(500).json({
    //         error: err
    //     });
    // })
    userHelper.emailUsersAsync({
        config: {
            from: req.body.email,
            to: 'ajay.kapur@philance.org', //email to be requested from the database
        },
        data: {
            subject: `Philance Query from Contact Form by ${req.body.firstName} ${req.body.lastName} `,
            text: req.body.message
        }
    }).then(resp => {
        res.status(200).send(resp)
    }).catch(err => {
        res.status(500).send(err)
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
            attributes: ['userId', 'firstName', 'lastName']
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
                attributes: ['userId', 'firstName', 'lastName']
            }]
        }).then(function (_projectTeam) {
            res.status(200).json({
                Candidates: _projectTeam
            });
        })
    }).catch(err => {

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

exports.getProjectTaskAttachments = (req, res, next) => {
    taskAttachments.findOne({
        where: {
            [Op.and]: {
                projectId: req.params.projectId,
                taskId: req.params.taskId,
                attachment: `/philance/projects/${req.params.projectId}/tasks/${req.params.taskId}/files/uploads/${req.params.fileName}`,
            }
        }
    }).then((instance) => {
        res.sendFile(instance.attachmentPath)
    }).catch((err) => {
        res.status(404).send(err)
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

exports.changeDefaultImage = (req, res, next) => {
    projects.update({
        defaultImage: req.body.imageUri,
    }, {
            where: {
                projectId: req.params.projectId
            }
        }).then((resp) => {
            res.status(200).send(resp)
        })
}
exports.createProjectUpdate = (req, res, next) => {

    projectUpdates.create({
        projectId: req.body.projectId,
        creationDate: new Date(),
        text: req.body.text,
        lastUpdatedDate: new Date(),
        createdBy: req.body.userId,
        lastUpdatedBy: req.body.userId,
    }).then(() => {
        res.status(200).send({
            message: 'successfully created the update'
        })
    }).catch(() => {

        res.status(500).send({
            message: 'could not create the update'
        })
    })
}
exports.updateProjectUpdate = (req, res, next) => {
    projectUpdates.update({
        creationDate: new Date(),
        text: req.body.text,
        lastUpdatedDate: new Date(),
        createdBy: req.body.userId,
        lastUpdatedBy: req.body.userId,
    }, {
            where: {
                projectId: req.body.projectId,
            }
        }).then(() => {
            res.status(200).send({
                message: 'successfully created the update'
            })
        }).catch(() => {

            res.status(500).send({
                message: 'could not create the update'
            })
        })
}
projectUpdates.belongsTo(users, {
    foreignKey: 'created_by',
    scope: {
        created_by: {
            $col: 'createdByDetails.user_id'
        }
    },
    as: 'createdByDetails'
});
exports.getProjectUpdates = (req, res, next) => {

    const offset = (req.body.activePage - 1) * req.body.pageSize
    const limit = req.body.pageSize
    projectUpdates.findAndCountAll({
        where: {
            projectId: req.params.projectId,
        },
    })
        .then((data) => {
            let pages = Math.ceil(data.count);
            projectUpdates.findAll({
                offset: offset,
                limit: limit,
                order: [['creationDate', 'DESC']],
                where: {
                    projectId: req.params.projectId,
                },
                include: {
                    model: users,
                    attributes: [
                        'firstName', 'lastName', 'email'
                    ],
                    as: 'createdByDetails'

                }
            }).then(resp => {
                res.status(200).send({
                    updates: resp,
                    totalPages: pages
                })
            }).catch(err => {
                res.status(500).send({
                    message: 'could not retrieve updates'
                })
            })
        })
}
exports.getProjectUpdate = (req, res, next) => {

}
exports.deleteProjectUpdate = (req, res, next) => {

    projectUpdates.destroy({
        where: {
            [Op.and]: {
                projectId: req.params.projectId,
                updateId: req.params.updateId
            }
        }
    }).then((response) => {
        res.sendStatus(200)
    })
}