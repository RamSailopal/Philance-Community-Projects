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

const projectDetails = sequelize.define('project_details', {
    projectId: {
        field: 'project_id',
        type: Sequelize.INTEGER,  
        primaryKey: true,   
        references: {   
            model: 'projects',
            key: 'project_id'
        }
    },
    detailType: {
        type: Sequelize.STRING,
        field: 'detail_type',
        // allowNull: false,
        primaryKey: true,
        values : ['SKILLS','IMPACT_CATEGORY']
    },
    name: {
        type: Sequelize.STRING,
        field: 'name',
        primaryKey: true
    },
    certificationReq: {
        type: Sequelize.STRING,
        field: 'certification_reqd',
        defaultValue : 'No'
    },
    certificationLink: {
        type: Sequelize.STRING,
        field: 'certification_link'
    },
    attribute1: {
        type: Sequelize.STRING,
        field: 'attribute1'
    },
    attribute2: {
        type: Sequelize.STRING,
        field: 'attribute2'
    },
    attribute3: {
        type: Sequelize.STRING,
        field: 'attribute3'
    },
    attribute4: {
        type: Sequelize.STRING,
        field: 'attribute4'
    },
    attribute5: {
        type: Sequelize.STRING,
        field: 'attribute5'
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
    // {
    //     classMethods: {
    //         associate: function(models) {
    //           projectDetails.belongsTo(models.projects, {foreignKey: 'project_id'})
    //         }
    //       }
    // },
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

module.exports = projectDetails;