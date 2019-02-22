import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Assignment from "@material-ui/icons/Assignment";
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
import bgImg from "philance/assets/img/Helpingothers3.jpg";
import bgImg1 from "philance/assets/img/Helpingothers4.jpg";
import bgImg2 from "philance/assets/img/Helpingothers5.jpg";
import logow from "philance/assets/logos/philancelogo.png";
import logow1 from "philance/assets/logos/Philance-logo-text.png";
import { Fade } from 'react-slideshow-image';
import { Timeline } from 'react-twitter-widgets';
 
const fadeProperties = {
  duration: 5000,
  transitionDuration: 1000,
  infinite: true,
  indicators: true
}


class PublicHomePage extends React.Component {

  render() {
    const { classes } = this.props;

    return (
	<div className={classes.container}>
	<Fade {...fadeProperties}>
		<div align="center" className="each-fade">
			<div className="image-container" align="center">
				<img src={bgImg} height="400px" width="1200px"/>
			</div>
			<h2><font color="white" face="verdana">Start or find a socially conscious project</font></h2>
		</div>
		<div align="center" className="each-fade">
			<div align="center" className="image-container">
				<img src={bgImg1} height="400px" width="1200px"/>
			</div>
			<h2><font color="white" face="verdana">Manage the project and attain resources</font></h2>
		</div>
		<div align="center" className="each-fade">
			<div align="center" className="image-container">
			<img src={bgImg2} height="400px" width="1200px"/>
			</div>
			<h2><font color="white" face="verdana">See a tangible social impact</font></h2>
		</div>
    </Fade>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}><b><font face="impact">Unleash the Power of Community</font></b></h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      // classes={classes}
                      title="Welcome to PhiLance"
                      description="This is a platform for individuals and organizations
                          to launch and manage their very own social impact projects, so anyone can
                          make a positive change in this world."
                      icon={Accessibility}
                      iconColor="rose"
                    />
					<br></br>
                    <InfoArea
                      // classes={classes}
                      title="Mission"
                      description="Our mission is to strengthen economies in impoverished communities by creating jobs through entrepreneurial ventures"
                      icon={Assignment}
                      iconColor="primary"
                    />
					<br></br>
                    <InfoArea
                      // classes={classes}
                      title="Sign Up to Start Making an Impact Today!"
                      description="Sign Up to post your project on the PhiLance platform or
                          work on someone else's project as a freelancer or a volunteer."
                      icon={Group}
                      iconColor="info"
                    />
					<br></br>
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      // classes={classes}
                      title="Watch and Learn"
                      description="Watch this brief 1 min video to see how you can use the PhiLance platform and become a changemaker."
                      icon={Video}
                      iconColor="rose"
                    />
					<br></br>
                    <div>
                      <ReactPlayer
                        url="https://youtu.be/0kve0_k58bw"
                        className="react-player"
                        width="100%"
                        height="260px"
						muted
						controls
						playing
						loop
                      />
                    </div>
					<br></br>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
		<GridContainer justify="center">
		<GridItem xs={12} sm={12} md={5} lg={5}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}><b><font face="impact">News</font></b></h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>
                   <div>
				   <p align="left" className={classes.newz}>
				       <br></br>
					  <h3><strong>March 2019 - Platform launch</strong></h3>
					   <br></br>
					  <font size="2">We are pleased to announce that we have officially launched the PhiLance platform.</font>
					  <br></br>
					  <br></br>
					  <font size="2">Please take the time to first sign up and create your profile. You can then manage or, apply to work on your first project</font>
					  <br></br>
					  <br></br>
					  <font size="2">Your <a href="http://philance.org/contact/" target="_blank">feedback</a> and opinions are very important to us so please let us know what you think.</font>
				      <br></br>
					  <br></br>
					  <br></br>
					  <br></br>
					  <br></br>
					  <br></br>
					  <br></br>
					  <br></br>
					  <br></br>
					  <br></br>
					  <br></br>
					  <br></br>
					  <p align="center"><img src={logow} height="200px" width="200px"></img></p>
					  <p align="center"><img src={logow1} height="50px" width="200px"></img></p>
				   </p>
				   </div>
					<br></br>
				  </GridItem> 	
               </GridContainer>
			  </CardBody> 
			</Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={5} lg={5}>
            <Card className={classes.cardSignup}>
               <div align="center">
					<Timeline
						dataSource={{
						sourceType: 'profile',
						screenName: 'PhilanceOrg'
						}}
						options={{
						username: 'PhilanceOrg',
						height: '800',
						width: '900'
						}}
					onLoad={() => console.log('Timeline is loaded!')}
					/>
				</div>	
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
