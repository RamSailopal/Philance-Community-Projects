'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');

const messages = sequelize.define(
  'messages',
  {
    messageId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'message_id',
    },
    body: {
      type: Sequelize.STRING,
      field: 'body',
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'sent', 'received', 'seen', 'failed', 'DRAFT'],
      defaultValue: 'DRAFT',
      field: 'status',
      allowNull: false,
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

module.exports = messages;
