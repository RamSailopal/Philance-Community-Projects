// var connectionPool = require('../util/dbconnection');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var moment = require('moment')
var users = require("./users.model");
var userSettings = require("./user.settings.model");
var userSkills = require("./user.skills.model");
var authentication = require("./authentication.model");
var userNotifications = require("./user.notifications.model");
var projects = require("../projects/projects.model");
var projectDetails = require("../projects/project.details.model");
var projectTeam = require("../projects/projects.team.model");
var projectAttachments = require("../projects/project.attachments.model");
const sequelize = require('../util/dbconnection');
const Op = sequelize.Op;
const Sequelize = require('sequelize');
var config = require('../config/config')
var authutil = require('../util/authutil')
var userHelper=require('../helpers/user')
var {mediaHost}=require('../config')
const randtoken=require('rand-token')

exports.createProfile = (req, res, next) => {

    users.findOne({ where: { email: req.body.email } }).then(_user => {
        if (_user == null) {
            console.log('Not Registered');
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: "password hashing failed! detailed error as follows - " + err
                    });
                } else {
                    users.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        location: req.body.location,
                        status:'ACTIVE',
                        creationDate:new Date()
                    }).then((_user) => {
//TODO: Change the logic if other user makes a created by
                        users.findOne({where:{email:req.body.email}})
                        .then((founduser)=>{
                            users.update({
                                createdBy:founduser.userId
                            },{
                                where:{
                                    userId:founduser.userId
                                }
                            }).then(()=>{
                                userSettings.create({
                                    userId:founduser.userId,
                                    emailNotifications:'YES',
                                    textNotifications:'NO',
                                    pushNotifications:'NO',
                                    createdBy:founduser.userId,
                                    creationDate:new Date(),
                                    lastUpdatedBy:founduser.userId,
                                    lastUpdatedDate:new Date(),
                                }).then(()=>{
                                    res.status(200).json({
                                        message: "User # " + req.body.firstName + " " + req.body.lastName + " Registered Successfully",
                                        user: _user
                                    });
                                }).catch((err)=>{
                                    res.status(500).json({
                                        error: err.message
                                    });
                                })
                            }).catch((err)=>{
                                res.status(500).json({
                                    error: err.message
                                });
                            })
                        })

                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err.message
                        });
                    })
                }
            })
        } else {
            console.log('User Registered');
            return res.status(409).json({
                message: "User # " + req.body.firstName + " " + req.body.lastName + " already registered",
                user: _user
            })
        }

    }
    )
}

exports.refreshAuthToken=(req,res,next)=>{
    
    authentication.findOne({
        where:{
            [Op.and]:{
                authToken:req.headers.authorization,
                refreshToken:req.headers.refreshtoken,
                userId:req.params.userId
            }
        },
        logging:false
    }).then((_userauth)=>{
        if(_userauth){

            users.findOne({
                where:{
                    [Op.and]:{
                        userId:_userauth.userId
                    }
                },
                logging:false
            }).then((_user)=>{
                const token = jwt.sign(
                    {
                        email: _user.email,
                        userId: _user.userId
                    }, 'philance_secret',
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h",
                    }
                );
                const refreshToken = randtoken.uid(256)
                authentication.update({
                    authToken:token,
                    refreshToken:refreshToken
                },{
                    where:{
                        refreshToken:req.headers.refreshtoken
                    },
                    logging:false
                }).then(()=>{
                    res.send({
                        message:'Token Refreshed',
                        token,refreshToken,
                        userId:_user.userId
                    })
                })
            })
        }else{
            res.status(403).send()
        }
    })
}

exports.login = (req, res, next) => {
    users.findOne({
        where: { email: req.body.email }
    }).then(_user => {
        if (_user == null) {
            return res.status(409).json({
                message: "User not Found"
            });
        }
        bcrypt.compare(req.body.password, _user.password, (err, result) => {
            if (err) {
                return res.status(409).json({
                    message: "authentication failed"
                });
            }

            if (result) {
                const token = jwt.sign(
                    {
                        email: _user.email,
                        userId: _user.userId
                    }, 'philance_secret',
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h",
                    }
                );
                const refreshToken = randtoken.uid(256)
                authentication.create({
                    userId:_user.userId,
                    email:_user.email,
                    authToken:token,
                    platform:req.headers.platform,
                    refreshToken:refreshToken,
                    createdBy:_user.userId,
                })
                return res.status(200).json({
                    message: "authentication successful",
                    token: token,
                    refreshToken: refreshToken,
                    userId: _user.userId
                });
            }
            res.status(409).json({
                message: "authentication failed"
            });
        });

    })

}

exports.search = (req, res, next) => {
    //TODO: Add Validators
    var userName;

    if (req.body.dist || req.body.loc) {
        if (req.body.dist == null || req.body.loc == null) {
            res.status(409).send({ message: `${req.body.dist ? 'Location ' : ' Distance '} is required` })
        }
    }

    var _sql = `SELECT * FROM users ` + `    `;

    _sql = req.body.skill == null ? _sql : _sql + `INNER JOIN user_skills `;
    // _sql=req.body.ptype==null?_sql:_sql+`INNER JOIN user_skills `;

    _sql = Object.keys(req.body).length === 0 ? _sql : _sql + `WHERE `;
    _sql = req.body.fname == null ? _sql : _sql + `users.fname LIKE '%${req.body.fname}%' AND `;
    _sql = req.body.lname == null ? _sql : _sql + `users.lname LIKE '%${req.body.lname}%' AND `;
    _sql = req.body.personLoc == null ? _sql : _sql + `users.location LIKE '%${req.body.personLoc}%' AND `;
    _sql = req.body.email == null ? _sql : _sql + `users.email= '${req.body.email}' AND`;
    _sql = req.body.skill == null ? _sql : _sql + `user_skills.skill_name LIKE '%${req.body.skill}%' AND`;

    _sql = _sql.slice(0, -4)

    sequelize.query(_sql, { type: sequelize.QueryTypes.SELECT }).then((_users) => {
        res.status(200).send(_users)
    })
        .catch((err) => {
            res.status(200).send(err)
        })



}
exports.getProfile = (req, res, next) => {

    users.hasMany(userSkills, { foreignKey: 'userId' });
    users.findAll({
        where: { userId: req.params.userId },
        include: [{ model: userSkills, nested: true, duplicating: false, required: false }]
    }).then((_user) => {
        res.status(200).json({
            user: _user
        });
    }
    )
}


exports.updateProfile = (req, res, next) => {
    var _count = 0;
    // users.belongsTo(userSkills, { as: 'userSkills', foreignKey: 'userId' });
    users.hasMany(userSkills, { foreignKey: 'userId' });
    users.hasOne(userNotifications, { foreignKey: 'userId' });

    // sequelize.transaction(function (t) {
    users.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        zipCode:req.body.postalCode,
        country:req.body.country,
        phoneNumber: req.body.contact,
        title:req.body.title,
        interests: req.body.interests?req.body.interests.toString():null,
        organization: req.body.organization,
        description: req.body.description,
        phoneNumber: req.body.contact,
        lastUpdatedBy: req.body.userId,
        lastUpdatedDate: new Date()
    },
        {
            where: {
                email: req.body.currentEmail,
            }
        }, {
            include: [{ model: userSkills, nested: true }]
        }
    )
        .then(_user => {
            if(req.body.password){
                authutil.createPassword(req.body.password).then((response) => {
                    users.update({
                        password: response.hash
                    }, {
                            where: {
                                userId:req.body.userId
                            }
                        }).then(() => {
                            console.log('Successful')
                            //send email
                        })
                })
            }
            if (_user&&req.body.userSkills) {
                userSkills.destroy({ where: { userId: req.body.userId }, truncate: true, force: true }).then(
                    sequelize.transaction(function (t) {
                        sequelize.Promise.each(req.body.userSkills, function (itemToUpdate) {
                            userSkills.create({
                                userId: req.body.userId,
                                skillCode: itemToUpdate.skillCode,
                                skillName: itemToUpdate.skillName,
                                certified: itemToUpdate.certified,
                                certificationLink: itemToUpdate.certificationLink,
                                startDate: itemToUpdate.startDate,
                                endDate: itemToUpdate.endDate,
                                createdBy: req.body.userId,
                                lastUpdatedBy: req.body.userId
                            }).then((_createdRecords) => {
                                _count++;
                                if (_count === (req.body.userSkills).length) {
                                    // if (_createdRecords) {
                                    if (typeof req.body.userNotifications !== 'undefined' && req.body.userNotifications !== null) {
                                        userNotifications.findOne({ where: { userId: req.body.userId } }).then(_userNotifications => {

                                            if (_userNotifications) {
                                                userNotifications.update({
                                                    notificationTrigger: req.body.userNotifications.notificationTrigger,
                                                    email: req.body.userNotifications.email,
                                                    text: req.body.userNotifications.text,
                                                    push: req.body.userNotifications.push,
                                                    lastUpdatedBy: req.body.userId,
                                                }, { where: { userId: req.body.userId } }).then(_updateCount => {
                                                    users.findAll({
                                                        where: { userId: req.body.userId },
                                                        include: [{ model: userSkills, nested: true, duplicating: false, required: false },
                                                        { model: userNotifications, nested: true, duplicating: false, required: false }]
                                                    }).then((_user) => {
                                                        res.status(200).json({
                                                            user: _user
                                                        });
                                                    }
                                                    )
                                                }
                                                )
                                            } else {
                                                userNotifications.create({
                                                    notificationTrigger: req.body.userNotifications.notificationTrigger,
                                                    email: req.body.userNotifications.email,
                                                    text: req.body.userNotifications.text,
                                                    push: req.body.userNotifications.push,
                                                    lastUpdatedBy: req.body.userId,
                                                    userId: req.body.userId
                                                }).then(_userNotifications => {
                                                    users.findAll({
                                                        where: { userId: req.body.userId },
                                                        include: [{ model: userSkills, nested: true, duplicating: false, required: false },
                                                        { model: userNotifications, nested: true, duplicating: false, required: false }]
                                                    }).then((_user) => {
                                                        res.status(200).json({
                                                            user: _user
                                                        });
                                                    }
                                                    )
                                                }
                                                )
                                            }
                                        }
                                        )
                                    } else {
                                        users.findAll({
                                            where: { userId: req.body.userId },
                                            include: [{ model: userSkills, nested: true, duplicating: false, required: false },
                                            { model: userNotifications, nested: true, duplicating: false, required: false }]
                                        }).then((_user) => {
                                            res.status(200).json({
                                                user: _user
                                            });
                                        }
                                        )
                                    }
                                }
                            })
                        })
                    })
                )
                authutil.createPassword(req.body.password).then((response) => {
                    users.update({
                        password: response.hash
                    }, {
                            where: {
                                email: decoded.email
                            }
                        }).then(() => {
                            console.log('Password Change Successful')
                            //send email
                        })
                    res.status(200).send(response)
    
                })
                // users.findAll({
                //     where: { userId: req.body.userId },
                //     include: [{ model: userSkills, nested: true, as: 'userSkills',duplicating: false,required : false }]
                // }).then((_user) => {
                //     res.status(200).json({
                //         user: _user
                //     });
                // }
                // )
            }else{
                res.status(200).send({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    zipCode:req.body.postalCode,
                    country:req.body.country,
                    phoneNumber: req.body.contact,
                    title:req.body.title,
                    interests: req.body.interests?req.body.interests.toString():null,
                    organization: req.body.organization,
                    description: req.body.description,
                    phoneNumber: req.body.contact,
                    lastUpdatedBy: req.body.userId,
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    // })
}

/**
 * This is to get the list of projects either created by user or applied by the user
 */

exports.getProjects = (req, res, next) => {

    projects.hasMany(projectDetails, { foreignKey: 'projectId' });
    projects.hasMany(projectTeam, { foreignKey: 'projectId' });
    users.hasMany(projectTeam, { foreignKey: 'userId' });
    projectTeam.belongsTo(users, { foreignKey: 'userId' });

    // var sql = 'select distinct proj.*, \'OWNER\' from projects proj where 1 = 1 and proj.created_by =' + req.params.userId + ' union ' +
    //     'select distinct proj.*, projteam.role from projects proj, project_team projteam where 1 = 1 and proj.project_id = projteam.project_id and user_id =' + req.params.userId;

    // sequelize.sync();
    // sequelize.query(sql, { model: projects }).then((_projects) => {
    //     res.status(200).json({
    //         Projects: _projects
    //     });
    // }
    // )
    projects.findAll({
        include:[
		{
			model: projectAttachments,
		},
		{
            model:projectTeam,
            where:{
                userId:req.params.userId
            },
		}]
    }).then((_projs)=>{
        res.status(200).send(_projs)
    })
}

exports.createPasswordResetToken = (req, res, next) => {
    users.findOne({
        where:{
            email:req.body.email
        }
    }).then((__user)=>{
        if(__user){
            var email = req.body.email;
            const token = jwt.sign(
                {
                    email: req.body.email
                }, 'philance_secret',
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );
            var dev
            if (process.env.NODE_ENV === 'production'){
                dev = config.production.secure;

            }else{
                dev = config.development.unsecure;

            }
            //send email
            userHelper.emailUsers({
                config:{
                    from:'noreply@philance.org',
                    to: req.body.email,                      //email to be requested from the database
                },
                data:{
                    url:dev.protocol + dev.host + dev.port + '/philance/users/passwordReset?token=' + token,
                    subject:'Philance Password Reset',
                    text:'Dear User, \nPlease click the following link to reset your password\n\n'+dev.protocol + dev.host + dev.port + '/resetPassword/' + token+'\n This link is valid for 1 hour only.\nRegards\nPhilance Support'
                }})
            res.status(200).send({
                backendURL: dev.protocol + dev.host + dev.port + '/philance/users/passwordReset?token=' + token
            })    
        }else{
            res.status(409).send({
                message:'Invalid Email'
            })
        }
    })


    console.log("In user password reset Controller");
};
exports.passwordReset = (req, res, next) => {
    jwt.verify(req.query.token, 'philance_secret', function (err, decoded) {
        if (err) {
            console.log(decoded + ' failed')
            res.status(401).send(err)
        } else {
            if(parseInt(Date.now()/1000)-decoded.iat>3600){

                //TODO: One time usage Implementation

                res.status(401).send({error:"token Expired"})
            }else{
                authutil.createPassword(req.body.password).then((response) => {
                    users.update({
                        password: response.hash
                    }, {
                            where: {
                                email: decoded.email
                            }
                        }).then(() => {
                            console.log('Successful')
                            //send email
                        })
                    res.status(200).send(response)
    
                }).catch((error) => {
                    res.status(500).send(error)
                })
    
            }

        }

    });
}

exports.updateUserImage=(req,res,next)=>{
    users.update({
        userProfileImagePath: mediaHost()+req.file.filename,
        userProfileImageUrl: `/philance/users/image/${JSON.parse(req.body.param).userInfo.userId}${req.file.filename}`,

    },
        {
            where: {
                userId: JSON.parse(req.body.param).userInfo.userId,
            }
        }
    )
    res.status(200).send(
        {
            user:{
                userProfileUrl:JSON.parse(req.body.param).userInfo.userId
            }
        })

}

exports.getUserImage = (req, res, next) => {
    users.findOne({
        where:{
            [Op.and]:{
                userId:req.params.userId,
                userProfileImageUrl: `/philance/users/image/${req.params.userId}/uploads/${req.params.filename}`,
            }
        }
    }).then((instance)=>{
        res.sendFile(instance.userProfileImagePath)
    }).catch((err)=>{
        res.status(404).send(err)
    })
}
exports.getUserNotifications = (req, res, next) => {
    userNotifications.hasOne(users, { foreignKey: 'createdBy' })
    userNotifications.findAll({
        where:{
            userId:req.params.userId,
        },
        include: [
            { 
                model: users,
                on:{
                    col1:sequelize.where(sequelize.col("user.user_id"), "=", sequelize.col("user_notifications.created_by")),
                },
                nested: false, 
                duplicating: false, 
                attributes: [
                    'userId', 
                    'firstName', 
                    'lastName', 
                    'email'
                ]
            }],        
        order:[
            ['creationDate', 'DESC']
        ],
        limit:10,
        logging:false
    }).then((instance)=>{
        res.status(200).send(instance)
    }).catch((err)=>{
        res.status(404).send(err)
    })
}
exports.userLogout=((req,res,next)=>{
    authentication.destroy({
        where:{
            [Op.and]:{
                authToken:req.headers.authorization,
                userId:req.params.userId
            }
        }
    }).then(()=>{
        res.send({
            message:'User Logged out'
        })
    }).catch(()=>{
        res.status(500).send({
            message:'User cannot be Logged out'
        })
    })
})
exports.updateUserSettings=((req,res,next)=>{
    userSettings.update({
        emailNotifications:req.body.emailNotifications,
        textNotifications:req.body.textNotifications,
        pushNotifications:req.body.pushNotifications,
    },{
        where:{
            userId:req.params.userId
        }
    }).then((userSettingsRes)=>{
        userSettings.findOne({
            where:{
                userId:req.params.userId
            }
        }).then((resp)=>{
            res.status(200).send({
                userSettings:resp
            }
            )
        })
    })
})
exports.getUserSettings=((req,res,next)=>{
    userSettings.findOne({
        where:{
            userId:req.params.userId
        }
    }).then((userSettings)=>{
        if(userSettings){
            res.status(200).send({
                userSettings
            })
        }else{
            res.status(404).send({
                message:'Settings not found'
            })
        }
    })
})