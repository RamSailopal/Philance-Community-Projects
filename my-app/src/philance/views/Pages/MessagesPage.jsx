import React from "react";
import PropTypes from "prop-types";
import socketIOClient from 'socket.io-client';

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Accessibility from "@material-ui/icons/Accessibility";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

//import publicHomePageStyle from "./PublicHomePageStyle";
import messagesPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

import {hostname} from '../../../config';



class MessagesPage extends React.Component {


  render() {
    const { classes } = this.props;

    return (
        <GridContainer justify="center">
          
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Messages Page</h2>
              <CardBody>
                <InfoArea
                  // classes={classes}
                  title="Messages"
                  description="Messages"
                  icon={Accessibility}
                  iconColor="rose"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
    );
  }
}

MessagesPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(messagesPageStyle)(MessagesPage);
