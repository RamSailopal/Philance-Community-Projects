import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import Link from "@material-ui/core/Link";
import GridItem from "components/Grid/GridItem.jsx";
import Typography from "@material-ui/core/Typography";
import publicHomePageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import bannerImage2 from "philance/assets/img/bannerImage3.jpeg";
import bannerImage3 from "philance/assets/img/bannerImage3.jpg";
import bannerImage1 from "philance/assets/img/bannerImage1.jpg";
import howItWorks1 from "philance/assets/img/PhilanceHowItWorks_NonprofitsImage.jpg";
import howItWorks2 from "philance/assets/img/PhilanceHowItWorks_SponsorsImage.jpg";
import howItWorks3 from "philance/assets/img/PhilanceHowItWorks_JobSeekerImage.jpg";
import recentProject1 from "philance/assets/img/SampleProjectImage1.jpg";
import recentProject2 from "philance/assets/img/SampleImage2_solarpanel.jpg";
import recentProject3 from "philance/assets/img/SampleProjectImage3.jpg";
import { getPublicPageProjects } from '../../actions/findProject'
import jobSeeker from "philance/assets/img/PhilanceHowItWorks_JobSeekerImage.jpg";
import {
  Input,
  Label,
  Icon,
  Progress,
  Divider,
  Header
} from "semantic-ui-react";
import {

  recentProjects
} from "../../actions/findProject";

import { List } from "semantic-ui-react";
import Badge from "components/Badge/Badge.jsx";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { relative } from "path";
import Edit from "@material-ui/icons/Edit";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { hostname } from "../../../config";

const fadeProperties = {
  interval: 5000,
  transitionDuration: 1000,
  infinite: true,
  indicators: true,
  showThumbs: false,
  autoPlay: true,
  emulateTouch: true,
  useKeyboardArrows: true,
  infiniteLoop: true,
  showStatus: false,
  showIndicators: false
};

class PublicHomePage extends React.Component {
  componentDidMount() {
    document.body.setAttribute('style', '')
    setTimeout(() => {
      if (this.props.isLoggedIn) {
        this.props.history.push('/home')
      }
    }, 1000);
    this.props.getPublicPageProjects(4)
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} style={{ margin: "0px" }}>
            <Carousel {...fadeProperties} height={600}>
              <div
                style={{
                  background: "rgb(33, 33, 33)"
                }}
              >
                <img
                  src={bannerImage1}
                  style={{ opacity: "0.6", objectFit: "cover" }}
                  height="600px"
                  width="100%"
                />
                <h2
                  style={{
                    textAlign: "center",
                    marginTop: "0px",
                    marginBottom: "0px"
                  }}
                >
                  <font color="white" className={classes.fontClassMain}>
                    Nonprofits: Post projects to raise funds and create jobs
                  </font>
                </h2>
              </div>
              <div
                style={{
                  background: "rgb(33, 33, 33)"
                }}
              >
                <img
                  src={bannerImage2}
                  style={{ opacity: "0.6", objectFit: "cover" }}
                  height="600px"
                  width="100%"
                />
                <h2
                  style={{
                    textAlign: "center",
                    marginTop: "0px",
                    marginBottom: "0px"
                  }}
                >
                  <font color="white" className={classes.fontClassMain}>
                    Donors: Fund projects to support causes and sponsor jobs
                  </font>
                </h2>
              </div>
              <div
                style={{
                  background: "rgb(33, 33, 33)"
                }}
              >
                <img
                  src={bannerImage3}
                  style={{ opacity: "0.6", objectFit: "cover" }}
                  height="600px"
                  width="100%"
                />
                <h2
                  style={{
                    textAlign: "center",
                    marginTop: "0px",
                    marginBottom: "0px"
                  }}
                >
                  <font color="white" className={classes.fontClassMain}>
                    Freelancers: Work on projects for a living-wage
                  </font>
                </h2>
              </div>
            </Carousel>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" style={{ marginTop: "0px" }}>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <Card testimonial style={{ padding: "20px", marginTop: "0px" }}>
              <CardBody>
                <GridContainer justify="center" style={{ marginTop: "0px" }}>
                  <GridItem xs={11} sm={11} md={12} lg={8} style={{ margin: "5px", textAlign: 'center' }}>
                    <Typography
                      component="p"
                      variant="display1"
                      style={{ color: "#ff7b00" }}
                    >
                      PhiLance is a crowdfunding platform for nonprofits so they can
                       raise funds for their projects and create
                      living-wage paying jobs in the communities they serve.
                </Typography>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Divider horizontal style={{ marginBottom: "50px", marginTop: "60px" }}>
          <Header className={classes.dividerTitle} as="h1">
            How It Works
          </Header>
        </Divider>
        <GridContainer justify="center">
          <GridItem xs={11} sm={12} md={3}>
            <Card product className={classes.cardHover}>
              <CardHeader image>
                <img src={howItWorks1} alt="..." />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder} />
                <div>
                  <p className={classes.cardProductDesciprion}>
                    <div>
                      <h4
                        className={classes.dividerTitle}
                        style={{ paddingTop: "15px" }}
                      >
                        NONPROFITS
                      </h4>
                      <List
                        bulleted
                        selection
                        animated
                        verticalAlign="middle"
                        size="huge"
                      >
                        <List.Item>
                          <List.Content>
                            <List.Header>Post Projects</List.Header>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Raise Funds</List.Header>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>
                              Find Volunteers & Contractors
                            </List.Header>
                          </List.Content>
                        </List.Item>
                      </List>
                    </div>
                  </p>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={11} sm={12} md={3}>
            <Card product className={classes.cardHover}>
              <CardHeader image>
                <img src={howItWorks2} alt="..." />
              </CardHeader>
              <CardBody>
                <div>
                  <p className={classes.cardProductDesciprion}>
                    <div>
                      <h4
                        className={classes.dividerTitle}
                        style={{ paddingTop: "15px" }}
                      >
                        DONORS
                      </h4>
                      <List
                        bulleted
                        selection
                        animated
                        verticalAlign="middle"
                        size="huge"
                      >
                        <List.Item>
                          <List.Content>
                            <List.Header>Sponsor projects and jobs</List.Header>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>
                              Create measurable social impact
                            </List.Header>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>
                              Get recognition on social media
                            </List.Header>
                          </List.Content>
                        </List.Item>
                      </List>
                    </div>
                  </p>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={11} sm={12} md={3}>
            <Card product className={classes.cardHover}>
              <CardHeader image>
                <img src={howItWorks3} alt="..." />
              </CardHeader>
              <CardBody>
                <div>
                  <p className={classes.cardProductDesciprion}>
                    <div>
                      <h4
                        className={classes.dividerTitle}
                        style={{ paddingTop: "15px" }}
                      >
                        FREELANCERS
                      </h4>
                      <List
                        bulleted
                        selection
                        animated
                        verticalAlign="middle"
                        size="huge"
                      >
                        <List.Item>
                          <List.Content>
                            <List.Header>Work on projects</List.Header>
                          </List.Content>
                        </List.Item>

                        <List.Item>
                          <List.Content>
                            <List.Header>
                              Find living-wage paying jobs
                            </List.Header>
                          </List.Content>
                        </List.Item>

                        <List.Item>
                          <List.Content>
                            <List.Header>Get on-the-job training</List.Header>
                          </List.Content>
                        </List.Item>
                      </List>
                    </div>
                  </p>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Divider horizontal style={{ marginBottom: "30px", marginTop: "60px" }}>
          <Header as="h1" className={classes.dividerTitle}>
            Recent Projects
          </Header>
        </Divider>
        <GridContainer justify="center">
          {
            this.props.publicHomePageProjects ?
              this.props.publicHomePageProjects.map(project => {
                return (
                  <GridItem xs={11} sm={12} md={3} className="row-grid-item">
                    <Card className={classes.card}>
                      <GridContainer direction="row">
                        <GridItem xs={12} sm={12} md={12}>
                          <Link onClick={() => this.props.history.push(`/project-details/info?p=${project.projectId}`)}>
                            <CardMedia
                              component="img"
                              style={{
                                maxHeight: "300px",
                                height: "100%",
                                "&:hover": {
                                  background: "blue"
                                }
                              }}
                              image={project.defaultImage ? hostname() + project.defaultImage : recentProject1}
                            />
                          </Link>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <CardContent style={{ height: "100%" }}>
                            <div
                              style={{
                                display: "flex",
                                marginBottom: 4,
                                justifyContent: "space-between",
                                textAlign: "center"
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  maxHeight: "15px",
                                  marginTop: "12px"
                                }}
                              >
                                {
                                  project.project_details ?
                                    project.project_details.map(detail => {
                                      return (

                                        <Typography
                                          style={{
                                            paddingRight: "0.5em",
                                            fontSize: 12,
                                            fontWeight: 400
                                          }}
                                          color="textSecondary"
                                        >
                                          {detail.name}
                                        </Typography>

                                      )
                                    })
                                    :
                                    null
                                }

                                <Typography
                                  color="textSecondary"
                                  style={{
                                    paddingLeft: "0.5em",
                                    fontSize: 12,
                                    fontWeight: 400,
                                    borderLeft: "0.2em solid #bababa"
                                  }}
                                >
                                  {project.country}
                                </Typography>

                              </div>
                            </div>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              style={{ marginBottom: 0 }}
                            >
                              <Link onClick={() => this.props.history.push(`/project-details/info?p=${project.projectId}`)}> {project.projectName}</Link>
                              {<Badge color="success">{project.status}</Badge>}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              style={{ marginBottom: 8 }}
                            >
                              CREATED BY {project.projectCreatedByDetails.firstName}
                            </Typography>
                            <h4 component="h4">
                              {project.projectSummary ? project.projectSummary.substring(0, 100) + '...(more)' : ''}{" "}
                            </h4>
                            <GridContainer style={{ marginTop: "15px" }}>
                              <GridItem xs={12} sm={12} md={12}>
                                <h4 color="textSecondary" style={{ marginBottom: 2, color: "rgba(120, 155, 93, 0.92)", display: 'flex', textTransform: 'uppercase', fontWeight: '600' }}>
                                  <span style={{
                                    color: 'green', paddingRight: '6px'
                                  }}>$0</span>raised of ${project.estimatedBudget} goal
                            </h4>
                                <Progress
                                  size="small"
                                  percent={0}
                                  progress
                                  active
                                  color="green"
                                  style={{
                                    width: "95%",
                                    display: "inline-block"
                                  }}
                                />
                              </GridItem>
                            </GridContainer>
                          </CardContent>
                        </GridItem>
                      </GridContainer>
                    </Card>
                  </GridItem>
                )
              })
              :
              null
          }
        </GridContainer>
      </div>
    );
  }
}

PublicHomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    publicHomePageProjects: state.findProject.publicHomePageProjects,
    isLoggedIn: state.auth.isLoggedIn,
    recentProject: state.findProject.recentProject,
    impactCategories: state.findProject.impactCategories,
    projectStatus: state.findProject.projectStatus,
    interestOptions: state.common.interestOptions,
  };
};
export default connect(
  mapStateToProps,
  {
    getPublicPageProjects,
  }
)(withStyles(publicHomePageStyle)(PublicHomePage));
