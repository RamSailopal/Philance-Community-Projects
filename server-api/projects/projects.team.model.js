'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

const projectTeam = sequelize.define('project_team', {
    projectId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'project_id',
        references: {   
            model: 'projects',
            key: 'project_id'
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'user_id',
        references: {   
            model: 'users',
            key: 'user_id'
        }
    },
    role: {
        type: Sequelize.STRING,
        field: 'role'
    },
    type: {
        type: Sequelize.STRING,
        field: 'type'
    },
    startDate: {
        type: Sequelize.DATE,
        field: 'start_date'
    },
    endDate: {
        type: Sequelize.DATE,
        field: 'end_date'
    },
    creationDate: {
        type: Sequelize.DATE,
        field: 'creation_date',
        defaultValue: Sequelize.NOW
    },
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by'
    },
    lastUpdatedDate: {
        type: Sequelize.DATE,
        field: 'last_updated_date',
        defaultValue: Sequelize.NOW
    },
    lastUpdatedBy: {
        type: Sequelize.INTEGER,
        field: 'last_updated_by'
    },
    status: {
        type: Sequelize.STRING,
        field: 'status'
    },
    applicantMessage: {
        type: Sequelize.STRING,
        field: 'applicant_message'
    },
    appliedDate: {
        type: Sequelize.DATE,
        field: 'applied_date',
        defaultValue: Sequelize.NOW
    },

},
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        classMethods: {
            associate: function(models) {
              projectTeam.belongsTo(models.projects, {foreignKey: 'project_id'})
              projectTeam.belongsTo(models.users, {foreignKey: 'user_id'})
            }
          }
    },
    {
        instanceMethods: {
            toJSON: function () {
              var values = this.get();
              if (this.projects) {
                values.projectId = projects.projectId;
              }   
              return values;
            }
          }
        }
);

module.exports = projectTeam;