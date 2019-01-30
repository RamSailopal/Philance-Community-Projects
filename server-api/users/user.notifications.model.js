'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
var users = require("./users.model");

const userNotifications = sequelize.define('user_notifications', {
    userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,  
        primaryKey: true,   
        references: {   
            model: 'users',
            key: 'user_id'
        }
    },
    notificationTrigger: {
        type: Sequelize.STRING,
        field: 'notification_trigger'
    },
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    text: {
        type: Sequelize.STRING,
        field: 'text'
    },
    push: {
        type: Sequelize.STRING,
        field: 'push'
    },
    message: {
        type: Sequelize.STRING,
        field: 'message'
    },
   creationDate: {
        type: Sequelize.DATE,
        field: 'creation_date'
    },
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by'
    },
    lastUpdatedDate: {
        type: Sequelize.DATE,
        field: 'last_updated_date'
    },
    lastUpdatedBy: {
        type: Sequelize.INTEGER,
        field: 'last_updated_by'
    },
},
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        instanceMethods: {
            toJSON: function () {
                var values = this.get();
                if (this.users) {
                    values.userId = users.userId;
                }
                return values;
            }
        }
    }
)
// users.hasOne(userNotifications, { as: 'userNotifications', foreignKey: 'userId' });
// users.associate = function (models) {
//     users.belongsTo(userSkills,{foreignKey:'userId'});
// };

module.exports = userNotifications;