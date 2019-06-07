import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import leftImage from "philance/assets/img/left-image.png";
import rightImage from "philance/assets/img/left-image.png";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Assignment from "@material-ui/icons/Help";
import bgImag from "philance/assets/img/VolunteerProject3.jpeg";
import { Accordion, Label, Message, List } from "semantic-ui-react";
//import publicHomePageStyle from "./PublicHomePageStyle";
import howItWorksPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class HowItWorksPage extends React.Component {
  render() {
    const { classes } = this.props;
    const panels = [
      {
        key: "What is the PhiLance platform?",
        title: {
          content: (
            <Label
              size="big"
              as="a"
              tag
              color="blue"
              //  style={{ fontSize: "1.5rem" }}
              content="What is the PhiLance platform?"
            />
          ),
          icon: "question"
        },
        content: {
          content: (
            <Message
              info
              content={
                <h3>
                  It is an open-source software platform bringing together: (a)
                  nonprofits that post projects, (b) Donors including
                  individuals, businesses, foundations and public-sector
                  organizations that sponsor those projects and (c) individuals
                  seeking employment who work on those projects for a living
                  wage. It is a crowdfunding-based jobs platform for people in
                  distressed communities.
                </h3>
              }
            />
          )
        }
      },
      {
        key: "Why have PhiLance?",
        title: {
          content: (
            <Label
              size="big"
              as="a"
              tag
              color="blue"
              content="Why have PhiLance?"
            />
          ),
          icon: "question"
        },
        content: {
          content: (
            <Message
              info
              content={
                <h3>
                  Over 1 billion people live in urban slums on $1.25 a day. Over
                  30 million Americans live in inner-city neighborhoods
                  representing about a quarter of US poverty. People living in
                  these neighborhoods lack good jobs or education, face higher
                  crime rates, and have poorer health outcomes. PhiLance’s
                  crowdfunded jobs platform could provide these individuals with
                  living-wage paying jobs so they can lift themselves out of
                  poverty.
                </h3>
              }
            />
          )
        }
      },
      {
        key: "How does PhiLance work?",
        title: {
          content: (
            <Label
              size="big"
              as="a"
              tag
              color="blue"
              content="How does PhiLance work?"
            />
          ),
          icon: "question"
        },
        content: {
          content: (
            <Message
              info
              content={
                <List
                  bulleted
                  selection
                  animated
                  verticalAlign="middle"
                  size="huge"
                >
                  <List.Item>
                    <List.Header style={{ fontWeight: "300" }}>
                      A nonprofit or NGO posts a ‘project’ on Philance.
                    </List.Header>
                  </List.Item>

                  <List.Item>
                    <List.Header>
                      Individuals seeking jobs sign up to work on that project
                      in exchange for payment at an hourly or fixed rate.
                    </List.Header>
                  </List.Item>

                  <List.Item>
                    <List.Header>
                      The project gets funded through crowdfunding and grants
                      from individual donors, businesses, foundations and
                      government agencies.
                    </List.Header>
                  </List.Item>

                  <List.Item>
                    <List.Header>
                      The PhiLance platform provides task management and
                      collaboration tools to facilitate collaboration among the
                      project team members during execution of the project.
                    </List.Header>
                  </List.Item>

                  <List.Item>
                    <List.Header>
                      The transparency of platform allows anyone to check on the
                      status of the projects being executed and assess the
                      social impact of those projects.
                    </List.Header>
                  </List.Item>
                </List>
              }
            />
          )
        }
      },
      {
        key: "What are some features of the PhiLance platform?",
        title: {
          content: (
            <Label
              size="big"
              as="a"
              tag
              color="blue"
              content={" What are some features of the PhiLance platform? "}
            />
          ),
          icon: "question"
        },
        content: {
          content: (
            <Message
              info
              content={
                <List
                  bulleted
                  selection
                  animated
                  verticalAlign="middle"
                  size="huge"
                >
                  <List.Item>
                    <List.Header>
                      Registration for nonprofits, donors, volunteers and
                      freelancers
                    </List.Header>
                  </List.Item>

                  <List.Item>
                    <List.Header>
                      Project creation by nonprofits to seek funds and resources
                    </List.Header>
                  </List.Item>

                  <List.Item>
                    <List.Header>Online donations for crowdfunding</List.Header>
                  </List.Item>

                  <List.Item>
                    <List.Header>Project/task management</List.Header>
                  </List.Item>

                  <List.Item>
                    <List.Header>Online payment processing</List.Header>
                  </List.Item>

                  <List.Item>
                    <List.Header>Analytics</List.Header>
                  </List.Item>

                  <List.Item>
                    <List.Header>Integration with social media</List.Header>
                  </List.Item>
                </List>
              }
            />
          )
        }
      },
      {
        key: "Who owns the software behind the PhiLance platform?",
        title: {
          content: (
            <Label
              size="big"
              // attached="top"
              as="a"
              tag
              color="blue"
              content={"Who owns the software behind the PhiLance platform?"}
            />
          ),
          icon: "question"
        },
        content: {
          content: (
            <Message
              info
              content={
                <h3>
                  The PhiLance platform is open-source software.
                  <a href="https://github.com/Philance/Philance">
                    {" "}
                    Here is the link to the open source project for PhiLance on
                    GitHub.
                  </a>{" "}
                  Please consider contributing to the development of this
                  platform if you have software design and development skills.
                </h3>
              }
            />
          )
        }
      },
      {
        key: "When are funds disbursed to nonprofits?",
        title: {
          content: (
            <Label
              size="big"
              as="a"
              tag
              color="blue"
              content="When are funds disbursed to nonprofits?"
            />
          ),
          icon: "question"
        },
        content: {
          content: (
            <Message
              info
              content={<h3>"When are funds disbursed to nonprofits?"</h3>}
            />
          )
        }
      },
      {
        key: "Are my donations tax-deductible?",
        title: {
          content: (
            <Label
              size="big"
              as="a"
              tag
              color="blue"
              content={"Are my donations tax-deductible?"}
            />
          ),
          icon: "question"
        },
        content: {
          content: (
            <Message info content={<h3>Are my donations tax-deductible?</h3>} />
          )
        }
      },
      {
        key: "Who handles payments to the freelancers working on the projects?",
        title: {
          content: (
            <Label
              size="big"
              as="a"
              tag
              color="blue"
              content={
                " Who handles payments to the freelancers working on the projects? "
              }
            />
          ),
          icon: "question"
        },
        content: {
          content: (
            <Message
              info
              content={
                <h3>
                  Nonprofits that post projects on the PhiLance platform are
                  responsible for negotiating pay rates with freelancers who
                  want to work on those projects and disbursing payments to
                  them. PhiLance will handle disbursements from donors to the
                  nonprofits.
                </h3>
              }
            />
          )
        }
      },
      {
        key: " How do I get involved with this project and its mission?",
        title: {
          content: (
            <Label
              size="big"
              as="a"
              tag
              color="blue"
              content={
                " How do I get involved with this project and its mission?"
              }
            />
          ),
          icon: "question"
        },
        content: {
          content: (
            <Message
              info
              content={
                <h3>
                  Reach out to us at
                  <a href="info@philance.org"> info@philance.org.</a>
                </h3>
              }
            />
          )
        }
      }
    ];
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
                How It Works
              </font>
            </h2>
          </div>
        </div>

        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10} lg={10}>
              <Card>
                <CardBody>
                  <NavPills
                    color="info"
                    alignCenter
                    style={{ overflow: "hidden" }}
                    tabs={[
                      {
                        tabButton: "Overview",
                        tabContent: ""
                      },

                      {
                        tabButton: "FAQ",
                        tabContent: (
                          <span>
                            <Accordion
                              defaultActiveIndex={0}
                              panels={panels}
                              fluid
                              styled
                            />
                          </span>
                        )
                      },
                      {
                        tabButton: "Pricing",
                        tabContent: (
                          <GridContainer
                            direction="row"
                            style={{ paddingTop: "100px" }}
                          >
                            <GridItem
                              sm={12}
                              md={4}
                              lg={4}
                              style={{ marginLeft: "-5%" }}
                              className={classes.imageLeft}
                            >
                              <img
                                className={classes.backImage}
                                src={leftImage}
                                style={{
                                  objectFit: "initial",
                                  minHeight: "200px",
                                  width: "100%",
                                  maxHeight: "400px"
                                }}
                              />
                            </GridItem>
                            <GridItem
                              sm={12}
                              md={5}
                              lg={5}
                              className={classes.fullWidth}
                            >
                              <h1 className={classes.dividerTitle1}>Pricing</h1>
                              <h3
                                style={{
                                  color: "rgb(110, 107, 105)",
                                  fontWeight: "400"
                                }}
                              >
                                Nonprofits and freelancers do not pay any fees for joining and using the PhiLance platform.
PhiLance collects a 5% platform fee and there is a credit card processing fee charged by our
payment processor Stripe (currently 2.9% + $0.30 per transaction) on all donations made via
the platform. All fees are deducted from the total money raised online prior to transfer of funds
to the nonprofit recipients. Donors could optionally cover the platform and credit card
processing fees so nonprofits get 100% of the intended donation amount and use those funds
to pay freelancers working on their projects.
                              </h3>
                            </GridItem>
                          </GridContainer>
                        )
                      }
                    ]}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

HowItWorksPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(howItWorksPageStyle)(HowItWorksPage);
