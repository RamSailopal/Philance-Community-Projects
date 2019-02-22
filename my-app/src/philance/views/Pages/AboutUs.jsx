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
import bgImg from "philance/assets/img/Helpingothers3.jpg";
import bgImg1 from "philance/assets/img/Helpingothers4.jpg";
import bgImg2 from "philance/assets/img/Helpingothers5.jpg";
import logow from "philance/assets/logos/philancelogo.png";
import logow1 from "philance/assets/logos/Philance-logo-text.png";
import prof1 from "philance/assets/img/Ram.jpg";
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

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card>
			  <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Assignment />
                </CardIcon>
              </CardHeader>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>
				   <p align="center"><img src={logow} height="150px" width="150px"></img></p>
				   <p align="center"><img src={logow1} height="50px" width="200px"></img></p>
				   <br></br>
					<br></br>
                    <p align="centre">
					PhiLance Incorporated is a benefits corporation formed in Massachusetts USA.
					<br></br>
					<br></br>
					Our mission is to empower individuals from low-income, disinvested communities to find respectful, living-wage paying jobs.
					<br></br>
					<br></br>
					Over 30 million Americans live in inner city neighborhoods representing about a quarter of US poverty. About a billion people live in urban slums around the world. People living in these neighborhoods lack good jobs or education, face higher crime rates, and have poorer health outcomes. 
					<br></br>
					<br></br>
					Philance’s solution is to provide employment opportunities to people living in poor neighborhoods through a freelancing platform. People from the community would post community development projects on the platform, recruit workers from the same community to work on those projects and obtain funding for the projects by crowdfunding from donors including local and national businesses, foundations, philanthropists and government. 
					<br></br>
					<br></br>
					This would lead to an influx of funds into the community along with the added bonus of completion of community development projects through labor provided by the previously unemployed members of the community.
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					</p>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
		   <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card className={classes.cardSignup}>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>
					<p align="Left">
					<font face="impact" size="6">Open Source</font>
					<br></br>
					<br></br>
					<br></br>
					<p align="centre">
					The PhiLance platform is developed as an open source solution that welcomes contributions from anyone who feels they can improve and enhance what we are trying to achieve.</p> 
					</p>
					<br></br>
					<p align="left"><a href="https://github.com/Philance/Philance" target="_blank"><img src="data:image/png;base64,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" height="30px" width="30px"></img></a></p>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
		 <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card className={classes.cardSignup}>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>
					<p align="Left">
					<font face="impact" size="6">The Team</font>
					</p>
					<br></br>
					<br></br>
					<br></br>
					<table>
					<tr>
					<td>
					<p align="left"><img src="https://media.licdn.com/dms/image/C4E03AQFHDWfGdzFYeQ/profile-displayphoto-shrink_800_800/0?e=1556150400&v=beta&t=0e7l8UFwoK0RmyKu6VKcbdHH_kEWzcViPTeFHA2Z9NM" height="100px" width="100px"></img></p>
					<br></br>
					<br></br>
					<b>Ajay Kapur</b>
					<br></br>
					<strong><b>Founder and CEO</b></strong>
					<br></br>
					<br></br>
                    <a href="https://www.linkedin.com/in/ajay-kapur-0231686/" target="_blank"><img src="https://media.licdn.com/dms/image/C4D0BAQFlLFOliANaJg/company-logo_200_200/0?e=2159024400&v=beta&t=6XtTMPqhowDtrl8OtsJ89rf0DfEQWrKQf1dvkrWS-lI" height="30px" width="30px"/></a>
					<br></br>
					<br></br>
					</td>
					<td></td>
					<td>
					<p align="left"><img src={prof1} height="100px" width="100px"></img></p>
					<br></br>
					<br></br>
					<b>Raman Sailopal</b>
					<br></br>
					<strong><b>Director of Operations</b></strong>
					<br></br>
					<br></br>
                    <a href="https://www.linkedin.com/in/raman-sailopal-5266457a" target="_blank"><img src="https://media.licdn.com/dms/image/C4D0BAQFlLFOliANaJg/company-logo_200_200/0?e=2159024400&v=beta&t=6XtTMPqhowDtrl8OtsJ89rf0DfEQWrKQf1dvkrWS-lI" height="30px" width="30px"/></a>
                    <br></br>
					<br></br> 
					</td>
					</tr>
					</table>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
		  <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card className={classes.cardSignup}>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>
					<p align="Left">
					<font face="impact" size="6">Advisors</font>
					</p>
					<br></br>
					<br></br>
					<br></br>
					<table>
					<tr>
					<td>
					<p>
					<p align="left"><img src="https://media.licdn.com/dms/image/C4D03AQGgwaSkjdErHg/profile-displayphoto-shrink_800_800/0?e=1556150400&v=beta&t=9o703jriS22AL18lQ6K4p3_ofd4aI-ndedZqsyQwYcE" height="100px" width="100px"></img></p>
					<br></br>
					<br></br>
					<b>Jeff Mowatt</b>
					<br></br>
					<br></br>
                    <a href="https://www.linkedin.com/in/jeffmowatt/" target="_blank"><img src="https://media.licdn.com/dms/image/C4D0BAQFlLFOliANaJg/company-logo_200_200/0?e=2159024400&v=beta&t=6XtTMPqhowDtrl8OtsJ89rf0DfEQWrKQf1dvkrWS-lI" height="30px" width="30px"/></a>
					</p>
					</td>
					<td></td>
					<td>
					<p>
					<p align="left"><img src="https://media.licdn.com/dms/image/C4E03AQG5fMedfc2P8w/profile-displayphoto-shrink_800_800/0?e=1556150400&v=beta&t=hyLVmOFo3HLrtwm4o1MhkKjyogRDI9yiGwuuZIKeSA0" height="100px" width="100px"></img></p>
					<br></br>
					<br></br>
					<b>Joanne Sonenshine</b>
					<br></br>
					<br></br>
                    <a href="https://www.linkedin.com/in/joanne-sonenshine-6092ba5/" target="_blank"><img src="https://media.licdn.com/dms/image/C4D0BAQFlLFOliANaJg/company-logo_200_200/0?e=2159024400&v=beta&t=6XtTMPqhowDtrl8OtsJ89rf0DfEQWrKQf1dvkrWS-lI" height="30px" width="30px"/></a>
					</p>
					</td>
					
					</tr>
					</table>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
		<GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card className={classes.cardSignup}>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>  
					 <p align="left">
					 <img src="data:image/png;base64,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" height="100px" width="100px"></img>
					<img src="data:image/jpeg;base64,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e/Oc4DjYXOvBerDLcWxu4tz4P+zto5sRe3V5McXotPPcO92n9JVxrCwXDWU1PDTRizI2NYPYOPeT96zV58st3aVu6KgfhC/v1N6k+JX8qH38U75MSo44xd7oiALgXJd1kkADzla8Xydw7VQH3eCf8w/6XW9PtDRhjR8apfJH+KzsHnXLuz+ECpqOQe4Ns158pozFjdGNJ5tyRx7ASvCrwVzJJI7NLmuy80h4J15oI0c4Ea20CtnjMlcpt1b/AGio/pVL/us/NekOO0r3BjKinc4mwDZGkk9gAOq5FNBzM7XRkANvqAQXGwFjYk6G9r2WfsnHlxCjGl+Wj4WP8Q4EcVi+Kftj6brtERQTEREBERAREQEREGk2v2ZhxGmNNMXhuZrwWmxDm3sfPoT71BhuNov59V72/krURamVnTstiqzuOojry9Vfvb+S+fIbRfz6r/j+StVF3nl+3eVV9s1umo6KqjqmSTvfHctDiLXIIubDXQlSjazZyLEKZ1LMXhpLXXabEFp0W5RZuVt25uqt+Q+h/nVPvb+SnuzGAxUNMyliLixt9XG5JcblbVF25W9ltoiIsuPzLGHNLSLgggjtB4qBbGbsIaCtlqxIX3zCJpbbkw466/xG2g8yn6LstjuxERccFDttd3lNicscsz5WuY0tGQixBN9QQpii7LroVb8h9D/Oqfe38k+Q+h4ctVe9v5K0kXeeX7a5VVvyHUP82p97fyWVhW5yigninElQ4xuDgCRYlvC9grIROeX7OVERFlkREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH//2Q==" height="100px" width="100px"></img><b>Runner up - Boston Jan 2019</b>
				
					</p> 
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
