'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');

const group = sequelize.define(
    'group',
    {
        groupId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'group_id',
        },
        projectId: {
            type: Sequelize.STRING,
            field: 'project_id',
            references: {
                model: 'projects',
                key: 'project_id'
            }
        },
        name: {
            type: Sequelize.STRING,
            field: 'name',
        },
        creationDate: {
            type: Sequelize.DATE,
            field: 'creation_date',
            defaultValue: Sequelize.NOW,
        },
        createdBy: {
            type: Sequelize.INTEGER,
            field: 'created_by',
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        lastUpdatedDate: {
            type: Sequelize.DATE,
            field: 'last_updated_date',
            defaultValue: Sequelize.NOW,
        },
        lastUpdatedBy: {
            type: Sequelize.INTEGER,
            field: 'last_updated_by',
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
);

module.exports = group;