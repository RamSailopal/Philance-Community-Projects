import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Timeline from "@material-ui/icons/Timeline";
import Accessibility from "@material-ui/icons/Accessibility";
import Group from "@material-ui/icons/Group";
import Video from "@material-ui/icons/OndemandVideo";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import publicHomePageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class PublicHomePage extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Helping You Help Others!</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      // classes={classes}
                      title="WelcomeTo PhiLance"
                      description="This is a platform for individuals and organizations
                          to launch and manage their very own social impact projects, so anyone can
                          make a positive change in this world."
                      icon={Accessibility}
                      iconColor="rose"
                    />
                    <InfoArea
                      // classes={classes}
                      title="Mission"
                      description="Our mission is to help you launch or contribute to a project
                          having a durable social impact and provide the tools and resources you need
                          to successfully complete that project."
                      icon={Timeline}
                      iconColor="primary"
                    />
                    <InfoArea
                      // classes={classes}
                      title="Sign Up to Start Making an Impact Today!"
                      description="Sign Up to post your project on the PhiLance platform or
                          work on someone else's project as a freelancer or a volunteer."
                      icon={Group}
                      iconColor="info"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      // classes={classes}
                      title="Animated Video about PhiLance"
                      description="Watch this brief 1 min video to see how you can use the PhiLance platform and become a changemaker."
                      icon={Video}
                      iconColor="rose"
                    />
                    <div>
                      <ReactPlayer
                        url="https://youtu.be/0kve0_k58bw"
                        className="react-player"
                        width="100%"
                        height="100%"
                        controls
                      />
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

PublicHomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(publicHomePageStyle)(PublicHomePage);
