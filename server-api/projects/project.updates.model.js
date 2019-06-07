'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
var projects = require("./projects.model");

const projectUpdates = sequelize.define('project_updates', {
    projectId: {
        field: 'project_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'project_id'
        }
    },
    updateId: {
        type: Sequelize.INTEGER,
        field: 'update_id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.STRING,
        field: 'text',
        allowNull: false,
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
                    values.projectId = projects.projectId;
                }
                return values;
            }
        }
    }
);
module.exports = projectUpdates;