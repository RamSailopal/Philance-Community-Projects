import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Timeline from "@material-ui/icons/Timeline";
import Accessibility from "@material-ui/icons/Accessibility";
import Photo from "@material-ui/icons/Photo";
import Help from "@material-ui/icons/Help";
import Video from "@material-ui/icons/OndemandVideo";
import Keyboard from "@material-ui/icons/Keyboard";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import pvtHomePageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

import {connect} from 'react-redux';



class PvtHomePage extends React.Component {
 
  render() {
    const { classes } = this.props;

    return (
        <GridContainer direction="row" justify="center">
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}><font face="impact">My Hub</font></h2>
              <CardBody>
                <GridContainer justify="center">
				 <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      // classes={classes}
                      title="Helpful Tips"
                      description="Make sure your description contains clear information about the project and its requirements, while at the same time really selling the project to prospective people."
                      icon={Help}
                      iconColor="rose"
                    />
					 <br></br>
				  </GridItem>
				   <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      // classes={classes}
                      title="-"
                      description="Upload supporting documents where ever possible. Think about creating a clear project plan in a document that can be viewed by prospective project team members."
                      icon={Help}
                      iconColor="rose"
                    />
					<br></br>
				  </GridItem>
				   <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      // classes={classes}
                      title="-"
                      description="Spread the word about the successful projects that you have completed and remember to mention the platform to enable others to replicate your success"
                      icon={Help}
                      iconColor="rose"
                    />
					<br></br>
					<a href="https://twitter.com/PhilanceOrg" target="_blank"><p align="center"><font color="blue"><b>#PhilanceOrg</b></font></p></a>
					<br></br>
				  </GridItem>
				  <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      // classes={classes}
                      title="-"
                      description="Your feedback is very important to us and so click on the feedback link to help us improve the platform for you and others"
                      icon={Help}
                      iconColor="rose"
                    />
					<br></br>
					<a href="http://philance.org/contact/" target="_blank"><p align="center"><font color="blue"><b>FEEDBACK</b></font></p></a>
					<br></br>
				  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      // classes={classes}
                      title="Helpful videos"
                      description=""
                      icon={Video}
                      iconColor="rose"
                    />
					<br></br>
                    <div>
                      <ReactPlayer
                        url="https://youtu.be/n8b2A7ThU4Y"
                        className="react-player"
                        width="100%"
                        height="260px"
                        controls
                      />
                    </div>
					<br></br>
                  </GridItem>
				   <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      // classes={classes}
                      title=""
                      description=""
                      icon={Video}
                      iconColor="rose"
                    />
					<br></br>
                    <div>
                      <ReactPlayer
                        url="https://youtu.be/e6BxcdbI5Ws"
                        className="react-player"
                        width="100%"
						height="260px"
                        controls
                      />
                    </div>
					<br></br>
                  </GridItem>
				   <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      // classes={classes}
                      title=""
                      description=""
                      icon={Video}
                      iconColor="rose"
                    />
					<br></br>
                    <div>
                      <ReactPlayer
                        url="https://youtu.be/Sr0UgNB2L-8"
                        className="react-player"
                        width="100%"
                        height="260px"
                        controls
                      />
                    </div>
				  <br></br>
                  </GridItem>
				   <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      // classes={classes}
                      title=""
                      description=""
                      icon={Video}
                      iconColor="rose"
                    />
					<br></br>
                    <div>
                      <ReactPlayer
                        url="https://youtu.be/7zosJdqP7nM"
                        className="react-player"
                        width="100%"
                        height="260px"
                        controls
                      />
                    </div>
					 <br></br>
					 <br></br>
					 <br></br>
                  </GridItem>
				   <GridItem xs={12} sm={8} md={5}>
                    <a href="https://twitter.com/hashtag/communityproject" target="_blank"><InfoArea
                      // classes={classes}
                      title="Social Media"
                      description=" twitter - #communityprojects"
                      icon={Keyboard}
                      iconColor="rose"
                    /></a>
					 <br></br>
					 <div align="center">
					 <img src="https://d1afx9quaogywf.cloudfront.net/sites/default/files/Logos/Twitter400x2302.png" height="70px" width="100px"/>
					 </div>
					 <br></br>
				  </GridItem>
				  <GridItem xs={12} sm={8} md={5}>
                    <a href="https://www.instagram.com/explore/tags/communityprojects/?hl=en" target="_blank"><InfoArea
                      // classes={classes}
                      title="-"
                      description=" Instagram - #communityprojects"
                      icon={Photo}
                      iconColor="rose"
                    /></a>
					 <br></br>
					  <div align="center">
					 <img src="https://www.telegraph.co.uk/content/dam/technology/2016/05/11/new-instagram-logo_1_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpg?imwidth=450" height="70px" width="100px"/>
					 </div>
					 <br></br>
				  </GridItem>
				  <GridItem xs={12} sm={8} md={5}>
                    <a href="https://www.linkedin.com/search/results/content/?keywords=%23communityprojects&origin=GLOBAL_SEARCH_HEADER" target="_blank"><InfoArea
                      // classes={classes}
                      title="-"
                      description=" LinkedIn - #communityprojects"
                      icon={Keyboard}
                      iconColor="rose"
                    /></a>
					 <br></br>
					  <div align="center">
					 <img src="https://media.licdn.com/dms/image/C4D0BAQFlLFOliANaJg/company-logo_200_200/0?e=2159024400&v=beta&t=6XtTMPqhowDtrl8OtsJ89rf0DfEQWrKQf1dvkrWS-lI" height="50px" width="50px"/>
					 </div>
					 <br></br>
				  </GridItem>
				  <GridItem xs={12} sm={8} md={5}>
                    <a href="https://www.facebook.com/hashtag/communityprojects?source=feed_text&__tn__=*NK-R" target="_blank"><InfoArea
                      // classes={classes}
                      title="-"
                      description=" Facebook - #communityprojects"
                      icon={Keyboard}
                      iconColor="rose"
                    /></a>
					 <br></br>
					  <div align="center">
					 <img src="data:image/png;base64,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" height="50px" width="50px"/>
					 </div>
					 <br></br>
				  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
    );
  }
}

PvtHomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(pvtHomePageStyle)(PvtHomePage));
