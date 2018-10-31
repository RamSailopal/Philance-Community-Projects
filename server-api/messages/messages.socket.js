const socketIO = require('socket.io');
const { verifyJWTToken } = require('../libs/auth');
const messages = require('./messages.model');
const messageRecipients = require('./message.recipients.model');
const projects = require('../projects/projects.model');
const projectTeam = require('../projects/projects.team.model');
const sequelize = require('../util/dbconnection');
const Op = sequelize.Op;

function initializeChatSocket(server) {
  projects.hasMany(projectTeam, { foreignKey: 'projectId' });

  const io = socketIO(server);
  const chat = io.of('/chat').on('connection', function(socket) {
    console.log(
      '----------------------------------------New Chat Connection Established-------------------------------------------------------------------------'
    );

    socket.auth = false;

    socket.on('authenticate', function(data) {
      console.log('\n\n\n\n','authenticate called','\n\n\n\n',data,'\n\n\n');
      
      try {
        const dummyReq = {
          headers: {
            refreshtoken: data.refreshToken,
          },
        };
        console.log('\n\n\n\n','before verify','\n\n\n\n');
        const userDetails = verifyJWTToken(dummyReq, data.token);
        console.log('\n\n\n\n','after verify','\n\n\n\n');
        socket.userId = userDetails.userId;
        socket.projectId = data.projectId;

         projectTeam
          .findAll({
            where: {
              [Op.and]:{
                projectId: data.projectId,
                userId: data.userId,
              }
            }
          })
          .then(projects => {
            console.log('\n\n\n\n',JSON.stringify(projects),'\n\n\n\n');
            if (projects.length === 1) {
              socket.auth = true;
              socket.join(socket.projectId);
              console.log(`User id:- ${userDetails.userId} linked to project id :- ${socket.projectId}`);
            } else {
              console.log(`User id:- ${userDetails.userId} not linked to project id :- ${socket.projectId}`);
              throw { message: 'User not linked to project' };
            }
          });
      } catch (error) {
        console.log(String(error));
        
        socket.auth = false;
        socket.disconnect(String(error));
      }

      socket.on('newMessage', function(messageData) {
        console.log('-------------------------New Message----------------------',String(messageData));
        //TODO Save Message in Database

        try {

          return sequelize.transaction(function (t) {

            // chain all your queries here. make sure you return them.
            return messages.create({
              body: messageData.messageBody,
              creationDate: new Date(),
              createdBy: messageData.messageHeader.sender.user.id,
              status:'sent'
            }, {transaction: t}).then(function (message) {
              return messageRecipients.create({
                recipientGroupId:messageData.messageHeader.receiver.receiverId,
                messageId:message.messageId,
                creationDate:new Date(),
                createdBy:socket.userId,
              }, {transaction: t});
            });
          
          }).then(function (result) {
            socket.broadcast.to(socket.projectId).emit('newMessage', messageData);
            console.log('\n\n\n\n\n broadcast sent\n\n'+JSON.stringify(messageData)+'\n\n\n');
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
          }).catch(function (err) {
            // Transaction has been rolled back
            console.log('\n\n\n',err,'\n\n\n');
            
            // err is whatever rejected the promise chain returned to the transaction callback
          });

        } catch (error) {
          console.log('\n\n\n\n\n broadcast error\n\n\n\n\n');
          console.log(String(error));
          
          console.log(error);
          //TODO Handle Message Sending Error
        }
      });
      socket.on('disconnectAll', function() {
      socket.removeListener('newMessage', ()=>{console.log('Listener removed')});
      console.log('Client Disconnected');
      });
    });
  });
}

module.exports = {
  initializeChatSocket,
};
