'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');

const userGroup = sequelize.define(
    'user_group',
    {
        userGroupId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'user_group_id',
        },
        userId: {
            type: Sequelize.INTEGER,
            field: 'user_id',
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        groupId: {
            type: Sequelize.INTEGER,
            field: 'group_id',
            references: {
                model: 'group',
                key: 'group_id'
            }
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

module.exports = userGroup;