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
              <CardHeader>
                <h2 className={classes.cardTitle}>How It Works</h2>
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
                              <li> Sign Up on PhiLance </li>
                              <li> Create your user profile </li>
                              <li>
                                {" "}
                                Create a new project and fill out project
                                details such as location, impact area,
                                description, number of volunteers and/or
                                freelancers needed, project duration and few
                                other details.{" "}
                              </li>
                              <li>
                                {" "}
                                You will be notified when volunteers and/or
                                freelancers apply to work on your project.
                                Review the applicants and form your project
                                team.{" "}
                              </li>
                              <li>
                                {" "}
                                Start the project and use PhiLance's project
                                management tools to track tasks, milestones,
                                resources and deliverables.{" "}
                              </li>
                              <li>
                                {" "}
                                Use PhiLance's collaboration tools such as chat,
                                conferencing, email, file transfer and more to
                                coordinate tasks with your project team, even if
                                some members of your team work remotely.{" "}
                              </li>
                              <li>
                                {" "}
                                Close the project upon successful completion and
                                post your results to the world!{" "}
                              </li>
                              <li>
                                {" "}
                                Start your next project or join somebody else's
                                project to work as a volunteer or freelancer!{" "}
                              </li>
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
                              <li>
                                {" "}
                                Create your user profile and set your
                                notification settings to be informed of projects
                                that match your interests{" "}
                              </li>
                              <li>
                                {" "}
                                Browse projects using a variety of search
                                criteria such as location, start date, budget,
                                impact area, keywords, etc.{" "}
                              </li>
                              <li>
                                {" "}
                                If you find a project you like, submit an
                                application to work on it as a volunteer or
                                freelancer{" "}
                              </li>
                              <li>
                                {" "}
                                If selected for the project by the project
                                owner, join the project team and start
                                contributing to the project{" "}
                              </li>
                              <li>
                                {" "}
                                Use PhiLance's project management tools to
                                update project status, tasks, milestones, and
                                deliverables{" "}
                              </li>
                              <li>
                                {" "}
                                Use PhiLance's collaboration tools such as chat,
                                conferencing, email, file transfer and more to
                                coordinate tasks with your project team, even if
                                some members of your team work remotely.{" "}
                              </li>
                              <li>
                                {" "}
                                Upon successful completion of the project,
                                publish your results to the community{" "}
                              </li>
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
