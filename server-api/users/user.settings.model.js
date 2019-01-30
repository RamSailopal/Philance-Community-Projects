'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
var users = require("./users.model");

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully for user skills.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

const userSettings = sequelize.define('user_settings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
    },
    userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,  
        primaryKey: true,   
        references: {   
            model: 'users',
            key: 'user_id'
        }
    },
    emailNotifications: {
        type: Sequelize.STRING,
        field: 'email_notifications'
    },
    textNotifications: {
        type: Sequelize.STRING,
        field: 'text_notifications'
    },
    pushNotifications: {
        type: Sequelize.STRING,
        field: 'push_notifications'
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
        classMethods: {
            associate: function (models) {
                userSettings.belongsTo(models.users, { foreignKey: 'user_id' })
            }
        }
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
// users.belongsTo(userSkills, { as: 'userSkills', foreignKey: 'userId' });
// users.associate = function (models) {
//     users.belongsTo(userSkills,{foreignKey:'userId'});
// };

module.exports = userSettings;