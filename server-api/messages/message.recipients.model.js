'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');

const messageRecipient = sequelize.define(
  'message_recipient',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id',
    },
    recipientId: {
      type: Sequelize.INTEGER,
      field: 'recipient_id',
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    recipientGroupId: {
      type: Sequelize.INTEGER,
      field: 'recipient_group_id',
      references: {
        model: 'user_groups',
        key: 'group_id'
      }
    },
    messageId: {
      type: Sequelize.INTEGER,
      field: 'message_id',
      references: {
        model: 'messages',
        key: 'message_id'
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

module.exports = messageRecipient;
