import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Assignment from "@material-ui/icons/Help";

//import publicHomePageStyle from "./PublicHomePageStyle";
import howItWorksPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class HowItWorksPage extends React.Component {

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
                <h2 className={classes.cardTitle}><b><font face="impact">How It Works</font></b></h2>
              </CardHeader>
              <CardBody>
                <NavPills
                  color="info"
                  tabs={[
                    {
                      tabButton: "Post a Project",
                      tabContent: (
                        <span>
                          <p>
                            <ul>
                              <li>Sign Up on PhiLance </li>
							  <br></br>
                              <li> Create your user profile </li>
							  <br></br>
                              <li>
                                {" "}
                                Create a new project and fill out project
                                details such as location, impact area,
                                description, number of volunteers and/or
                                freelancers needed, project duration and a few
                                other details.{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                You will be notified when volunteers and/or
                                freelancers apply to work on your project.
                                Review the applicants and form your project
                                team.{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                Start the project and use PhiLance's project
                                management tools to track tasks, milestones,
                                resources and deliverables.{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                Use PhiLance's collaboration tools such as chat,
                                conferencing, email, file transfer and more to
                                coordinate tasks with your project team, even if
                                some members of your team work remotely.{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                Close the project upon successful completion and
                                post your results to the world!{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                Start your next project or join somebody else's
                                project to work as a volunteer or freelancer!{" "}
                              </li>
							  <br></br>
                            </ul>
                            <br />
                            <br />
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Work on a Project",
                      tabContent: (
                        <span>
                          <p>
                            <ul>
                              <li> Sign Up on PhiLance </li>
							  <br></br>
                              <li>
                                {" "}
                                Create your user profile and set your
                                notification settings to be informed of projects
                                that match your interests{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                Browse projects using a variety of search
                                criteria such as location, start date, budget,
                                impact area, keywords, etc.{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                If you find a project you like, submit an
                                application to work on it as a volunteer or
                                freelancer{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                If selected for the project by the project
                                owner, join the project team and start
                                contributing to the project{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                Use PhiLance's project management tools to
                                update project status, tasks, milestones, and
                                deliverables{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                Use PhiLance's collaboration tools such as chat,
                                conferencing, email, file transfer and more to
                                coordinate tasks with your project team, even if
                                some members of your team work remotely.{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                Upon successful completion of the project,
                                publish your results to the community{" "}
                              </li>
							  <br></br>
                              <li>
                                {" "}
                                Join your next project or start one of your own!{" "}
                              </li>
                            </ul>
                            <br />
                            <br />
                          </p>
                        </span>
                      )
                    }
					,
                    {
                      tabButton: "Q&A",
                      tabContent: (
                        <span>
                          <p>
                           
                              <ul><b> Who is the platform for? </b></ul>
							  <br></br>
                                {" "}
                                <ul>This platform is for ANYONE who wants to work on a social impact project.</ul>
								<ul>You could identify yourself as an individual/organization in a poorer community who sees
								a social requirement that you feel could be tackled through a project that you manage yourself.</ul>
								<ul>You could be an individual who is looking to work on these projects as a volunteer,
								or a freelancer looking to earn an income.</ul>
								<ul>You could be a local business looking to donate resources to the project.{" "}</ul>
								<ul>You could be a local business/government looking to donate funding to the project.{" "}</ul>
								<br></br>
								<br></br>
								<ul><b> Who benefits from the platform? </b></ul>
								<br></br>
								<ul>Those managing social impact projects can receive an income from successfully completing projects.</ul>
								<ul>Those working on projects can earn an income from the hours worked.</ul>
								<ul>Those contributing funding and resources can earn positive feeback from the publicity we generate.</ul>
								<ul>Overall everybody benefits from the redistributed skills and income. Those who consider themselves from more affluent demographics
								can contribute to projects that benefit those from poorer communities.
								Those in poorer communities can work on issues they know the most about and are exposed to at first hand.</ul>
								<br></br>
								<ul><b> What are some of the features of the PhiLance platform? </b></ul>
								<br></br>
								<ul>The ability to sign up on the platform as a voluneer or freelancer</ul>
								<ul>The ability to post projects</ul>
								<ul>Crowdfunding</ul>
								<ul>Project/Task management</ul>
								<ul>Analytics</ul>
								<br></br>
								<ul><b> Who owns the software behind the PhiLance platform? </b></ul>
								<br></br>
								<ul>The PhiLance platform is open-source software. <a href="https://github.com/Philance/Philance" target="_blank">Here is the link to the open source project for PhiLance on GitHub.</a> Please consider contributing to the development of this platform if you have software design and development skills.</ul>
								<br></br>
								<ul><b> How much does it cost to sign up? </b></ul>
								<br></br>
								<ul>Signing up is COMPLETELY FREE. There is no catch!!!</ul>
								<br></br>
								<ul><b> Are my details safe? </b></ul>
								<br></br>
								<ul>All personal information stored is secured in accordance with international data protection standards.
								Any information shared will be related to running/completed projects and will not be of a "personal" nature.</ul>
								<br></br>
								<ul><b> How do I get involved in the project and its mission? </b></ul>
								<br></br>
								<ul>Reach out to us at info@philance.org</ul>
								<br></br>
								<br></br>
						  </p>
                        </span>
                      )
                    }
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

HowItWorksPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(howItWorksPageStyle)(HowItWorksPage);
