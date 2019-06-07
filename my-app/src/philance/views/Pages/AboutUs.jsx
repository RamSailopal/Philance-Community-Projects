import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Assignment from "@material-ui/icons/Help";
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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import publicHomePageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import leftImage from "philance/assets/img/left-image.png";
import rightImage from "philance/assets/img/right-image.png";
import bgImg2 from "philance/assets/img/Helpingothers5.jpg";
import logow from "philance/assets/logos/philancelogo.png";
import logow1 from "philance/assets/logos/Philance-logo-text.png";
import prof1 from "philance/assets/img/Ram.jpg";
import prof2 from "philance/assets/img/ajay.jpg";
import advisor1 from "philance/assets/img/dave-evans.jpg";
import advisor2 from "philance/assets/img/jeff-mowatt.jpg";
import advisor3 from "philance/assets/img/julia-nord.jpg";
//import { Fade } from "react-slideshow-image";
//import { Timeline } from "react-twitter-widgets";
import bgImag from "philance/assets/img/VolunteerProject3.jpeg";

// icons
import linkedin from "philance/assets/socialMedia/linkedin(1).svg";
//card component for team
import Button from "components/CustomButtons/Button.jsx";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardAvatar from "components/Card/CardAvatar.jsx";
const fadeProperties = {
  duration: 5000,
  transitionDuration: 1000,
  infinite: true,
  indicators: true
};

class PublicHomePage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div
          style={{
            height: "23em",
            marginRight: "-31px",
            marginLeft: "-31px",
            opacity: 1,
            marginBottom: "30px",
            zIndex: 3,
            position: "relative",
            background: "#222222 none repeat scroll 0 0"
          }}
        >
          <img
            className={classes.backImage}
            src={bgImag}
            style={{
              height: "23em",
              width: "100%",
              opacity: "0.6",
              objectFit: "cover"
            }}
          />
          <div>
            <h2>
              <font color="white" face="verdana" className={classes.fontClass1}>
                About Us
              </font>
            </h2>
          </div>
        </div>
        <div className={classes.container}>
          <GridContainer
            direction="row"
            style={{ paddingTop: "40px" }}
            justify="center"
          >
            <GridItem sm={12} md={8} lg={8} className={classes.fullWidth}>
              <h1 className={classes.dividerTitleAboutUsPage}>Mission</h1>
              <Typography
                component="p"
                variant="display1"
                style={{ color: "rgb(110, 107, 105)", fontWeight: "400" }}
              >
                To reduce poverty and unemployment using the power of community
                </Typography>
            </GridItem>

          </GridContainer>
          <GridContainer
            justify="center"
            style={{ paddingTop: "40px" }}
          //className={classes.backGroundCompanyCard}
          >
            <GridItem sm={12} md={8} lg={8} className={classes.fullWidth}>
              <h1 className={classes.dividerTitleAboutUsPage}>Vision</h1>
              <Typography
                component="p"
                variant="display1"
                style={{ color: "rgb(110, 107, 105)", fontWeight: "400" }}
              >
                Create a <em>crowdfunded jobs platform</em> bringing together
               nonprofits that post projects, sponsors who fund those projects
               and individuals from distressed communities who work on those
               projects for a living wage.
                </Typography>
            </GridItem>
          </GridContainer>
          <GridContainer
            direction="row"
            style={{ paddingTop: "50px" }}
            justify="center"
          >
            <GridItem sm={12} md={8} lg={8} className={classes.fullWidth}>
              <h1 className={classes.dividerTitleAboutUsPage}>Company</h1>
              <Typography
                component="p"
                variant="display1"
                style={{ color: "rgb(110, 107, 105)", fontWeight: "400" }}
              >
                PhiLance, Inc is a Benefit Corporation incorporated in 2018 and
                 headquartered in Massachusetts, USA. If you are interested in
                 working for PhiLance, please contact us at info@philance.org.
                </Typography>
            </GridItem>
          </GridContainer>
          <GridContainer
            justify="center"
            style={{ marginTop: "80px" }}
            className={classes.backGroundTeamCard}
          >
            <GridItem
              xs={12}
              sm={2}
              md={3}
              lg={3}
              style={{ textAlign: "center" }}
            >
              <h1
                style={{ paddingTop: "35%" }}
                className={classes.dividerTitleAboutUsPage}
              >
                Team
              </h1>
            </GridItem>
            <GridItem xs={12} sm={10} md={9} lg={9}>
              <GridContainer
                justify="center"
                style={{ margin: "5px", paddingTop: "30px" }}
              >
                <GridItem xs={12} sm={4} md={4} className="row-grid-item">
                  <Card profile className={classes.card}>
                    <CardAvatar profile>
                      <img
                        src={prof2}
                        style={{
                          borderRadius: "50%",
                          padding: "20px 0",
                          width: "100%"
                        }}
                      />
                    </CardAvatar>
                    <CardContent
                      style={{ height: "100%", textAlign: "center" }}
                    >
                      <h2 className={classes.cardTitle}>Ajay Kapur</h2>
                      <h4 className={classes.cardCategoryTeam}>
                        Founder and CEO
                      </h4>
                      <a
                        href="https://www.linkedin.com/in/ajay-kapur-0231686/"
                        target="_blank"
                      >
                        <img height="30px" src={linkedin} width="30px" />
                      </a>
                    </CardContent>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} className="row-grid-item">
                  <Card className={classes.card}>
                    <CardAvatar profile>
                      <img
                        src={prof1}
                        style={{ borderRadius: "50%", width: "100%" }}
                      />
                    </CardAvatar>
                    <CardContent
                      style={{ height: "100%", textAlign: "center" }}
                    >
                      <h2 className={classes.cardTitle}>Raman Sailopal</h2>
                      <h4 className={classes.cardCategoryTeam}>CTO</h4>
                      <a
                        href="https://www.linkedin.com/in/raman-sailopal-5266457a"
                        target="_blank"
                      >
                        <img height="30px" src={linkedin} width="30px" />
                      </a>
                    </CardContent>
                  </Card>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>

          <GridContainer
            justify="center"
            style={{ marginTop: "80px" }}
            className={classes.backGroundAdvisorsCard}
          >
            <GridItem
              xs={12}
              sm={2}
              md={3}
              lg={3}
              style={{ textAlign: "center" }}
            >
              <h1
                style={{ paddingTop: "35%", color: "#000" }}
                className={classes.dividerTitleAboutUsPage}
              >
                Advisors
              </h1>
            </GridItem>
            <GridItem xs={12} sm={10} md={9} lg={9}>
              <GridContainer
                justify="center"
                style={{ margin: "5px", paddingTop: "30px" }}
              >
                <GridItem
                  xs={12}
                  sm={3}
                  md={3}
                  lg={3}
                  className="row-grid-item"
                >
                  <Card className={classes.card}>
                    <CardAvatar profile>
                      <img
                        src={advisor1}
                        style={{ borderRadius: "50%", width: "100%" }}
                      />
                    </CardAvatar>
                    <CardContent
                      style={{ height: "100%", textAlign: "center" }}
                    >
                      <h2 className={classes.cardTitle}>Dave Evans</h2>
                      <a
                        href="https://www.linkedin.com/in/dave-evans-85079010/"
                        target="_blank"
                      >
                        <img height="30px" src={linkedin} width="30px" />
                      </a>
                    </CardContent>
                  </Card>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={3}
                  md={3}
                  lg={3}
                  className="row-grid-item"
                >
                  <Card className={classes.card}>
                    <CardAvatar profile>
                      <img
                        src={advisor2}
                        style={{ borderRadius: "50%", width: "100%" }}
                      />
                    </CardAvatar>
                    <CardContent
                      style={{ height: "100%", textAlign: "center" }}
                    >
                      <h2 className={classes.cardTitle}>Jeff Mowatt</h2>
                      <a
                        href="https://www.linkedin.com/in/jeffmowatt/"
                        target="_blank"
                      >
                        <img height="30px" src={linkedin} width="30px" />
                      </a>
                    </CardContent>
                  </Card>
                </GridItem>

                <GridItem
                  xs={12}
                  sm={3}
                  md={3}
                  lg={3}
                  className="row-grid-item"
                >
                  <Card className={classes.card}>
                    <CardAvatar profile>
                      <img
                        src={advisor3}
                        style={{ borderRadius: "50%", width: "100%" }}
                      />
                    </CardAvatar>
                    <CardContent
                      style={{ height: "100%", textAlign: "center" }}
                    >
                      <h2 className={classes.cardTitle}>Julia Nord</h2>
                      <a
                        href="https://www.linkedin.com/in/julia-nord/"
                        target="_blank"
                      >
                        <img src={linkedin} height="30px" width="30px" />
                      </a>
                    </CardContent>
                  </Card>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

PublicHomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(publicHomePageStyle)(PublicHomePage);
