'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
const users = require('./users.model')
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully for users.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

const authentication = sequelize.define('authentication', {
    authId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'auth_id'
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
    },
    authToken: {
        type: Sequelize.STRING,
        field: 'auth_token'
    },
    refreshToken: {
        type: Sequelize.STRING,
        field: 'refresh_token'
    },
    platform: {
        type: Sequelize.STRING,
        field: 'platform'
    },
    creationDate: {
        type: Sequelize.DATE,
        field: 'creation_date',
        default : Sequelize.DATE
    },
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by'
    },
    lastUpdatedDate: {
        type: Sequelize.DATE,
        field: 'last_updated_date',
        default : Sequelize.DATE
    },
    lastUpdatedBy: {
        type: Sequelize.INTEGER,
        field: 'last_updated_by'
    },
},
    {
        timestamps: false,
        freezeTableName: true
    },{
        classMethods:{
            associate:function(models){
                authentication.hasMany(models.users, {foreignKey:{unique:false} })
            }
        }
    }
);

module.exports = authentication;