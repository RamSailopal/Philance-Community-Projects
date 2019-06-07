'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
var projects = require("./projects.model");

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully for Project Details.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database for Project Details : ', err);
//   });

const projectLinkAttachments = sequelize.define('project_link_attachments', {
    projectId: {
        field: 'project_id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: projects,
            key: 'project_id'
        }
    },
    attachmentPath: {
        field: 'attachment_path',
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    attachmentDetails: {
        field: 'attachment_details',
        type: Sequelize.STRING,
    },
    attachmentType: {
        field: 'attachment_type',
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
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
    }
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
                    values.projectId = projects.projectId;
                }
                return values;
            }
        }
    }
);
// projectDetails.associate = function (models) {
//     projects.belongsTo(projectDetails,{as: 'projectDetails', foreignKey:'projectId'} );
// };
// projects.belongsTo(projectDetails,{as: 'projectDetails', foreignKey:'projectId'} );

module.exports = projectLinkAttachments;