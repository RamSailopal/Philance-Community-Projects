import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import { NavLink } from "react-router-dom";
import { Progress } from "semantic-ui-react";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Person from "@material-ui/icons/Person";
import ViewList from "@material-ui/icons/ViewList";

// @material-ui/core components
import Button from "components/CustomButtons/Button.jsx";

import Link from "@material-ui/core/Link";
//import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import imag from "philance/assets/img/Helpingothers4.jpg";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";

// redux
import { connect } from "react-redux";
import { myProject, storeList } from "../../actions/myProject";
import { getProjectById, idStored, statusChanged, updateProjectExclusive } from "../../actions/projectDetails";
import { getProjectCandidateReviewList } from "../../actions/candidateReview";

import Loader from "../../components/Loader/Loader";
//import publicHomePageStyle from "./PublicHomePageStyle";
import { hostname } from "../../../config";
import bgImag from "philance/assets/img/VolunteerProject3.jpeg";
import { Tag, Divider, Pagination, Popconfirm, message, Tooltip } from 'antd'
import EmptyState from "../../../components/EmptyState";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 1,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 12
  },
  cardMedia: {
    width: "40%",
    "&:hover": {
      opacity: 0.7,
      cursor: "pointer"
    }
  },
  link: {
    "&:hover": {
      opacity: 0.9,
      cursor: "pointer"
    }
  }
});
class MyProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      loading: false,
      loader: false,
      fndimag: "",
      upStatus: 'ACTIVE',
      localStatus: '',
      cardData1: {},
      activePage: 1,
      pageSize: 2,
    };
  }
  componentDidMount() {
    this.myProject();
  }
  myProject() {
    this.toggleLoader(true);
    const {
      id
    } = this.props;
    const { activePage, pageSize } = this.state
    this.props.myProject(
      {
        id,
        activePage, pageSize
      },
      flag => {
        this.toggleLoader(flag);
      }
    );
  }
  handlePageChange = async (page) => {
    await this.setState({ activePage: page });
    this.myProject();
  }

  onShowSizeChange = async (page, pagesPerPage) => {
    await this.setState({ pageSize: pagesPerPage });
    await this.setState({ activePage: 1 })
    this.myProject();
  }

  handleItemClick = async (e, { id }) => {
    await this.setState({ activeItem: id });
    this.renderProjects();
  };

  getimg(att) {
    const { classes } = this.props;
    var fownd = "0";
    var fndimag = "/static/media/Helpingothers4.023cec80.jpg";
    if (att) {
      att.map((value, key) => {
        var attbits = att[key].originalName.split(".");
        if (attbits[0] === "ProjectImage") {
          fndimag = hostname() + att[key].attachment;
        }
      });
    } else {
      var attbits = "";
      fndimag = "/static/media/Helpingothers4.023cec80.jpg";
    }
    return fndimag;
  }
  color(i) {
    if (i === 1) return "#dbebf6";
  }
  toggleLoader = flag => {
    this.setState({
      loader: flag
    });
  };

  confirm = (projectId) => {
    this.props.updateProjectExclusive({ status: this.state.upStatus }, { id: projectId }, () => {
      this.myProject();
    })
    message.success('Status is changed to Active');
  }

  tag(cardData) {
    if (cardData.status == "ACTIVE") {
      return <Tag color="green">{cardData.status}</Tag>
    }
    else if (cardData.status == "CLOSED") {
      return <Tag color="red">{cardData.status}</Tag>
    }
    else if (cardData.status == "UNPUBLISHED") {
      return <Tooltip placement="bottom" title="Click to Publish Project"><Popconfirm title="Are you sure you want to publish this project? It will be visible to everyone after you publish." onConfirm={() => this.confirm(cardData.projectId)} okText="Publish" cancelText="Cancel">
        <Tag color="gray">{cardData.status}</Tag>
      </Popconfirm></Tooltip>
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div
          style={{
            height: "20em",
            marginRight: "-31px",
            marginLeft: "-31px",
            opacity: 0.9,
            marginBottom: "30px",
            zIndex: 3,
            position: "relative"
          }}
        >
          <img
            className={classes.backImage}
            src={bgImag}
            style={{
              width: "100%",
              height: "20em",
              position: "relative",
              objectFit: "cover"
            }}
          />
        </div>
        <GridContainer>
          <Loader loader={this.state.loader} />
          {this.props.response
            ? <GridContainer justify="center">
                {this.props.response.map(cardData => (
                  (cardData) => this.setState({ cardData1: cardData }),
                  <GridItem xs={11} sm={5} md={5} lg={8} className="row-grid-item">
                    <Card
                      className={classes.card}
                      style={{ display: "flex" }}
                    >
                      <GridContainer direction="row">
                        <GridItem xs={12} sm={12} md={12} lg={4}>
                          <CardMedia
                            component="img"
                            className={classes.cardMedia}
                            style={{
                              width: "100%",
                              maxHeight: "250px",
                              width: "100%",
                              '&:hover': {
                                background: 'blue'
                              }
                            }}
                            //  width="30%"
                            image={
                              cardData.defaultImage
                                ? hostname() + cardData.defaultImage
                                : imag
                            }
                            onClick={() => {
                              let id = cardData.projectId;
                              this.props.history.push(
                                `/home/project-details/info?p=${cardData.projectId}`
                              );
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12} lg={8}>
                          <CardContent style={{ padding: '0px 10px' }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  marginTop: "12px"
                                }}
                              >
                                <Typography
                                  style={{
                                    paddingRight: "0.5em",
                                    fontSize: 14,
                                    fontWeight: 700
                                  }}
                                  color="textSecondary"
                                >
                                  {cardData.project_details.map(detail => {
                                    return detail.name + " ";
                                  })}
                                  <Divider type="vertical" style={{ background: "#bababa" }} />
                                </Typography>
                                <Typography
                                  color="textSecondary"
                                  style={{
                                    color: "rgb(255, 104, 22)", fontSize: 14, fontWeight: 800,
                                  }}
                                >
                                  {" " + cardData.country}
                                </Typography>
                              </div>
                              <div style={{}}>
                                <Tooltip
                                  title="Review Candidates"
                                  classes={{ tooltip: classes.lightTooltip }}
                                >
                                  <Button
                                    justIcon
                                    round
                                    simple
                                    onClick={() => {
                                      this.toggleLoader(true);
                                      this.props.getProjectCandidateReviewList(
                                        cardData.projectId,
                                        flag => {
                                          this.toggleLoader(flag);
                                          this.props.idStored(cardData.projectId);
                                          this.props.history.push(
                                            `/home/projectCandidateReview/${
                                            cardData.projectId
                                            }/`
                                          );
                                        }
                                      );
                                    }}
                                    color="twitter"
                                    className="like"
                                  >
                                    <Person />
                                  </Button>
                                </Tooltip>
                              </div>
                            </div>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h1"
                              style={{ fontSize: '1.5rem', margin: '0em 0 0 0' }}
                            >
                              <Link
                                className={classes.link}
                                color="inherit"
                                onClick={() => {
                                  let id = cardData.projectId;
                                  this.props.history.push(
                                    `/home/project-details/info?p=${
                                    cardData.projectId
                                    }`
                                  );
                                }}
                              >
                                {" "}
                                {cardData.projectName}{" "}
                              </Link>
                              {this.tag(cardData)}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              style={{ marginBottom: 8 }}
                            >
                              CREATED BY {cardData.createdByDetails.firstName}{" "}
                              {cardData.createdByDetails.lastName}
                            </Typography>
                            <Typography
                              style={{
                                margin: " 0.5 0 0em 0",
                                overflow: "hidden",
                                position: "relative",
                                height: "2.9em" /* exactly three lines */,
                                fontSize: '1.1rem', color: "#3e4b59", fontWeight: 400,
                              }}
                              component="h3"
                            >
                              {cardData.projectSummary}
                            </Typography>
                            <Link
                              className={classes.link}
                              color="inherit"
                              onClick={() => {
                                let id = cardData.projectId;
                                this.props.history.push(
                                  `/home/project-details/info?p=${
                                  cardData.projectId
                                  }`
                                );
                              }}
                            >
                              (...more)
                          </Link>
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "90%" }}>
                                <h4
                                  color="textSecondary"
                                  style={{ marginBottom: 2, color: "rgba(120, 155, 93, 0.92)", display: 'flex', textTransform: 'uppercase', fontWeight: '600' }}
                                >
                                  <span style={{
                                    color: 'green', paddingRight: '6px'
                                  }}>
                                    $0
                                </span>{" "}
                                  raised of ${cardData.estimatedBudget} goal
  
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
                              </div>
                            </div>
                          </CardContent>
                        </GridItem>
                      </GridContainer>
                    </Card>
                  </GridItem>

                ))} </GridContainer>
            : null}
            
            {this.props.response.length!=0 ? <GridContainer justify="center">
                <Pagination showSizeChanger pageSizeOptions={['2', '5', '10', '20', '50']} onShowSizeChange={this.onShowSizeChange} pageSize={this.state.pageSize} current={this.state.activePage} onChange={this.handlePageChange} total={this.props.totalPages} />
              </GridContainer> : <EmptyState/>}
          <GridContainer justify="center" />
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    response: state.mypro.response,
    length: state.mypro.length,
    totalPages: state.mypro.totalPages,
    list: state.mypro.list,
    id: state.auth.userId,
    projectAttachments: state.proDetails.projectAttachments,
    status: state.proDetails.status,
  };
};

MyProjectsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {
    getProjectCandidateReviewList,
    storeList,
    getProjectById,
    idStored,
    myProject,
    statusChanged,
    updateProjectExclusive
  }
)(withStyles(styles)(MyProjectsPage));
