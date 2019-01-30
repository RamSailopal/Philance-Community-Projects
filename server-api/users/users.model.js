'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully for users.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

const users = sequelize.define('users', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'user_id'
    },
    firstName: {
        type: Sequelize.STRING,
        field: 'fName',
        allowNull : false, 
        validate: {
            notEmpty : true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'lname'
    },
    email: {
        type: Sequelize.STRING,
        field: 'email',   
        allowNull : false,     
        validate: {
            isEmail: true,
            notEmpty : true
        }
    },
    password: {
        type: Sequelize.STRING,
        field: 'password',
        allowNull : false
    },
    phoneNumber: {
        type: Sequelize.STRING,
        field: 'ph_number'
    },
    organization: {
        type: Sequelize.STRING,
        field: 'organization'
    },
    title: {
        type: Sequelize.STRING,
        field: 'title'
    },
    rate: {
        type: Sequelize.FLOAT,
        field: 'rate'
    },
    auth_src: {
        type: Sequelize.STRING,
        field: 'auth_src'
    },
    status: {
        type: Sequelize.STRING,
        field: 'status'
    },
    lastLogin: {
        type: Sequelize.DATE,
        field: 'last_login'
    },
    creationDate: {
        type: Sequelize.DATE,
        field: 'creation_date',
        default : Sequelize.DATE
    },
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by'
    },
    lastUpdatedDate: {
        type: Sequelize.DATE,
        field: 'last_updated_date',
        default : Sequelize.DATE
    },
    lastUpdatedBy: {
        type: Sequelize.INTEGER,
        field: 'last_updated_by'
    },
    interests: {
        type: Sequelize.STRING,
        field: 'interests'
    },
    location: {
        type: Sequelize.STRING,
        field: 'location'
    },
    description: {
        type: Sequelize.STRING,
        field: 'description'
    },
    country: {
        type: Sequelize.STRING,
        field: 'country'
    },
    zipCode: {
        type: Sequelize.STRING,
        field: 'zip_code'
    },
    userProfileImageUrl:{
        type: Sequelize.STRING,
        field: 'user_profile_image_url'
    },
    userProfileImagePath:{
        type: Sequelize.STRING,
        field: 'user_profile_image_path'
    }
},
    {
        timestamps: false,
        freezeTableName: true
    },
        {
        classMethods: {
            associate: function(models) {
              users.hasMany(models.userSkills, {foreignKey: 'user_id'})
              users.hasMany(models.projectTeam, {foreignKey: 'user_id'})
            }
          }
    }
);

module.exports = users;