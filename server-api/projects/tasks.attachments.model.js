'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
const projectTasks = require("./project.tasks.model");

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully for Project Details.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database for Project Details : ', err);
//   });

const taskAttachments = sequelize.define('task_attachments', {
    taskId: {
        field: 'task_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {   
            model: projectTasks,
            key: 'task_id'
        }
    },
    projectId: {
        field: 'project_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        field: 'name',
        type: Sequelize.STRING,
    },
    originalName: {
        field: 'original_name',
        type: Sequelize.STRING,
    },
    attachment: {
        field: 'attachment',
        type: Sequelize.STRING,
        primaryKey: true,
    },
    attachmentPath: {
        field: 'attachment_path',
        type: Sequelize.STRING,
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
},
    {
        timestamps: false,
        freezeTableName: true
    },
    {
    instanceMethods: {
        toJSON: function () {
          var values = this.get();
          if (this.projects) {
            values.taskId = projectTasks.taskId;
          }   
          return values;
        }
      }
    }
);
module.exports = taskAttachments;