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
const chat = socketIOClient.connect(`${hostname()}/chat`);
var userImages = {}
class ChatBox extends React.Component {
  state = {
    messages: [],
    message: ''
  }
  componentDidMount() {
    this.props.projectTeam.map((value, key) => {
      userImages[`${value.user.userId}`] = `${hostname()}${value.user.userProfileImageUrl}`
    })
    console.log(this.props)
    chat.emit('authenticate', {
      token: localStorage.getItem('auth'),
      refreshToken: localStorage.getItem('refresh'),
      projectId: this.props.projectId,
      userId: this.props.userId,
    });
    chat.on('newMessage', (messageData) => {
      console.log('------------newMessageReceived-------------');
      this.props.messageReceived({ messages: this.props.messages, messageData }, () => {
        console.log('callback');
        this.setState({
          messages: this.props.messages
        })
      })
      console.log(messageData);
    })
  }
  componentDidUpdate() {
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      chat.emit('newMessage', {
        messageHeader: {
          sender: {
            user: {
              id: this.props.userId,
              name: this.props.name
            }
          },
          creationTime: new Date()
        },
        messageBody: this.state.message,

      });
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
              creationTime: new Date()
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

      this.setState({
        message: ''
      })
    }
  }
  render() {
    const { classes } = this.props;
    return (

      <Card style={{ height: "50rem" }}>

        <div style={{ maxHeight: '40rem', marginTop: '50px', maxWidth: '100%', minWidth: '500px', overflow: 'auto', "overflow-x": "hidden" }} ref='messageList'>
          {console.log(this.props.messages)
          }
          {
            this.props.messages.map((value, key) => {
              return (
                <Paper style={{ maxHeight: '100%', marginLeft: '5%', marginRight: '5%', marginTop: '1%', marginBottom: '1%', maxWidth: '100%', overflow: 'auto', "overflow-x": "hidden" }} key={key}>

                  <GridContainer direction="row" >
                    <GridItem xs={1} sm={1} md={1} lg={1} >
                      <img style={{
                        marginLeft: '25%',
                        marginTop: '5%',
                        marginBottom: '1%',
                        width: '100%'
                      }}
                        src={this.props.userImages[`${value.messageHeader.sender.user.id}`] ? this.props.userImages[`${value.messageHeader.sender.user.id}`] : avatar} alt="Profile Pic" />
                    </GridItem>
                    <GridItem lg={9}>
                      <GridContainer direction='row' justify="space-between">
                        <GridItem>
                          <strong>{value.messageHeader.sender.user.name}</strong>
                        </GridItem>
                        <GridItem  >
                          <strong>{new Date(value.messageHeader.creationTime).toLocaleString()}</strong>
                        </GridItem>
                      </GridContainer>
                      <GridItem lg={12} style={{ width: '100%' }}>
                        <SnackbarContent
                          message={value.messageBody}
                          color="info"
                          fullWidth
                        />
                      </GridItem>
                    </GridItem>
                  </GridContainer>
                </Paper>
              )
            })
          }
        </div>
      </Card>
    );
  }
}

ChatBox.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
  }
}

export default connect(
  mapStateToProps
)(withStyles(messagesPageStyle)(ChatBox));
