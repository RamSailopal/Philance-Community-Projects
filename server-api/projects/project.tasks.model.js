'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
var projects = require("./projects.model");
var users = require("../users/users.model");

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully for Project Details.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database for Project Details : ', err);
//   });

const projectTasks = sequelize.define('project_tasks', {
    projectId: {
        field: 'project_id',
        type: Sequelize.INTEGER,  
        // primaryKey: true,   
        references: {   
            model: 'projects',
            key: 'project_id'
        }
    },
    taskId: {
        type: Sequelize.INTEGER,
        field: 'task_id',
        // allowNull: false,
        autoIncrement:true,
        primaryKey: true
    },
    taskName: {
        type: Sequelize.STRING,
        field: 'task_name',
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        field: 'description'
    },
    assignedTo: {
        type: Sequelize.STRING,
        field: 'assigned_to'
    },
    priority: {
        type: Sequelize.STRING,
        field: 'priority'
    },
    assignedBy: {
        type: Sequelize.STRING,
        field: 'assigned_by',
        references: {   
            model: users,
            key: 'user_id'
        }
    },
    status: {
        type: Sequelize.STRING,
        field: 'status'
    },
    targetHours: {
        type: Sequelize.STRING,
        field: 'target_hours'
    },
    startDate: {
        type: Sequelize.DATE,
        field: 'start_date',
    },
    endDate: {
        type: Sequelize.DATE,
        field: 'end_date',
    },
    creationDate: {
        type: Sequelize.DATE,
        field: 'creation_date',
        defaultValue: Sequelize.NOW
    },
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by',
        references: {   
            model: users,
            key: 'user_id'
        }
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
},
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        classMethods: {
            associate: function(models) {
              projectTasks.belongsTo(models.projects, {foreignKey: 'project_id'})
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
// projectTasks.associate = function (models) {
//     projects.belongsTo(projectTasks,{as: 'projectTasks', foreignKey:'projectId'} );
// };
// projects.belongsTo(projectTasks,{as: 'projectTasks', foreignKey:'projectId'} );

module.exports = projectTasks;