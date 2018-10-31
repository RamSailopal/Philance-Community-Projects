import React from "react";
import PropTypes from "prop-types";
import socketIOClient from 'socket.io-client';
import { NavLink } from "react-router-dom";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Accessibility from "@material-ui/icons/Accessibility";
import { connect } from 'react-redux'

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardText from "components/Card/CardText.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CardAvatar from "components/Card/CardAvatar.jsx";
import avatar from "assets/img/faces/UpdateProfileAvatarIcon.png";
import CustomInput from "components/CustomInput/CustomInput.jsx";

//import publicHomePageStyle from "./PublicHomePageStyle";
import messagesPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

import { hostname } from '../../../config';
import {
messageReceived,
messageSent,
projectChatUnmount
} from "../../actions/projectChat";
import store from "../../store/store";
import ChatBox from "./ChatBox";
let chat = socketIOClient.connect(`${hostname()}/chat`);
var userImages={}
class ProjectChat extends React.Component {
  state = {
    messages: [],
    message:''
  }
  componentDidMount() {
  this.props.projectTeam.map((value,key)=>{
    userImages[`${value.user.userId}`]=`${hostname()}${value.user.userProfileImageUrl}`
  })
  console.log(this.props)
  chat.emit('authenticate', {
    token: localStorage.getItem('auth'),
    refreshToken: localStorage.getItem('refresh'),
    projectId: this.props.projectId,
    userId: this.props.userId,
  });
}
componentWillUnmount () {
  // alert('disconnecting')
  chat.emit('disconnectAll', 'disconnect')
  chat.disconnect()
  // alert('disconnected')
  // alert('disconnected')
  this.props.projectChatUnmount()
}
_handleKeyPress=(e)=>{
  if(e.key==='Enter'){
    this.props.messageSent(
      {
        messages: this.props.messages,
        messageData: {
          messageHeader: {
            sender: {
              user: {
                id: this.props.userId,
                name: this.props.name
              }
            },
            receiver:{
              isGroup:true,     //change later to logic to choose between 0 and 1
              receiverId:this.props.chatGroup[0].groupId
            },
            creationTime:new Date()
          },
          messageBody: this.state.message,
        }
      }, () => {
        console.log('callback');
        this.setState({
          messages: this.props.messages
        })
      })
    console.log('button pressed');

    chat.emit('newMessage', {
      messageHeader: {
        sender: {
          user: {
            id: this.props.userId,
            name: this.props.name
          }
        },
        receiver:{
          isGroup:true,
          receiverId:this.props.chatGroup[0].groupId
        },
        creationTime:new Date()
      },
      messageBody: this.state.message,

    });
    this.setState({
      message:''
    })
  }
}
render() {
  const { classes } = this.props;
  return (
    <GridContainer className={classes.justifyContentCenter}>

      <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer direction="row" justify="center" alignItems="center">
              <GridItem xs={2} sm={2} md={2} lg={2}>
                <Paper style={{ minHeight: "50rem"}}>
                <br/>
                    <NavLink to={'#'} color='info' style={{ maxHeight: '100%',marginTop:'60px', marginLeft: '5%', marginRight: '5%', marginBottom: '1%', overflow: 'auto', "overflow-x": "hidden" }}>
                      <GridContainer
                        direction="column"
                        justify="flex-start"
                        alignItems={
                          "flex-start"
                        }>
                        <GridItem  style={{ marginLeft: '5%'}}>
                          #general
                              </GridItem>
                      </GridContainer>
                    </NavLink>
                    {
                      this.props.projectTeam.map((value,key)=>{
                        return(
                          <NavLink to={'#'} color='info' style={{ maxHeight: '100%',marginTop:'60px', marginLeft: '5%', marginRight: '5%', marginBottom: '1%', overflow: 'auto', "overflow-x": "hidden" }}>
                            <GridContainer
                              direction="column"
                              justify="flex-start"
                              alignItems={
                                "flex-start"
                              }>
                              <GridItem  style={{ marginLeft: '5%'}}>
                                •{value.user.firstName}
                                    </GridItem>
                            </GridContainer>
                          </NavLink>
                          
                        )
                      })
                    }
                </Paper>
              </GridItem>
              <GridItem xs={10} sm={10} md={10} lg={10}>
                <ChatBox
                projectTeam={this.props.projectTeam} 
                userImages={userImages}
                projectId={this.props.projectId}
                userId={this.props.userId}
                messageReceived={this.props.messageReceived}
                messages={this.props.messages}
                messageSent={this.props.messageSent}
                name={this.props.name}
                />
              </GridItem>
            </GridContainer>
                <Card>
            <GridContainer
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <GridItem xs={8}sm={8}md={8}lg={8}>
              <CustomInput
              id="taskName"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onKeyPress:this._handleKeyPress,
                value:this.state.message,
                placeholder: "Enter Your Message Here",
                onChange: e => {
                  this.setState({
                    message:e.target.value
                  })
                }
              }}
            />
              </GridItem>
              <GridItem>
                <Button onClick={() => {
                  this.props.messageSent(
                    {
                      messages: this.props.messages,
                      messageData: {
                        messageHeader: {
                          sender: {
                            user: {
                              id: this.props.userId,
                              name: this.props.name
                            }
                          },
                          creationTime:new Date()
                        },
                        messageBody: this.state.message,
                      }
                    }, () => {
                      console.log('callback');
                      this.setState({
                        messages: this.props.messages
                      })
                    })
                  console.log('button pressed');

                  chat.emit('newMessage', {
                    messageHeader: {
                      sender: {
                        user: {
                          id: this.props.userId,
                          name: this.props.name
                        }
                      },
                      creationTime:new Date()
                    },
                    messageBody: this.state.message,

                  });
                  this.setState({
                    message:''
                  })
                }}>send</Button>
              </GridItem>
            </GridContainer>
                </Card>
      </GridItem>
      <GridItem>
      </GridItem>
    </GridContainer>
  );
}
}

ProjectChat.propTypes = {
classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
return {
  messages: state.projectChat.messages,
  userId: state.auth.userId,
  name: state.user.name,
  projectId: state.proDetails.id,
  projectTeam:state.proDetails.projectTeam,
  chatGroup:state.proDetails.chatGroup
}
}

export default connect(
mapStateToProps, {
  messageReceived,
  messageSent,
  projectChatUnmount
}
)(withStyles(messagesPageStyle)(ProjectChat));
