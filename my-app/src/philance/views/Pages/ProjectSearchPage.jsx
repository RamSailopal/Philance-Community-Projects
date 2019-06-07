import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
//import Pagination from 'react-js-pagination';
import { Input, Label, Icon, Progress, } from "semantic-ui-react";
//import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Person from "@material-ui/icons/Person";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// @material-ui/icons
import ViewList from "@material-ui/icons/ViewList";
import Assignment from "@material-ui/icons/Search";
import Slide from "@material-ui/core/Slide";
import Close from "@material-ui/icons/Close";
import Link from "@material-ui/core/Link";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InterestsDropdown from "../../components/DoubleDropdown/InterestsDropdown";
import CountryDropdown from "../../components/DoubleDropdown/CountryDropdown";
import projectSearchStyle from "philance/views/PageStyles/ProjectSearchStyles.jsx";
import Badge from "components/Badge/Badge.jsx";
import imag from "philance/assets/img/Helpingothers4.jpg";
import bgImag from "philance/assets/img/VolunteerProject2.jpg";
import { hostname } from "../../../config";
import {
  locationChanged,
  resourceChanged,
  projectStatusChanged,
  impactCategoriesChanged,
  countryChanged,
  keywordChanged,
  findProjectUnmount,
  findProjects
} from "../../actions/findProject";

import Loader from "../../components/Loader/Loader";
import { getProjectById, idStored } from "../../actions/projectDetails";
import { getProjectCandidateReviewList } from "../../actions/candidateReview";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import { Tag, Divider, Pagination } from 'antd';
import store from "../../store/store";
//require("bootstrap/less/bootstrap.less");
const styles = theme => ({
  ...projectSearchStyle,
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
    fontSize: 13
  },

  textField: {
    flexBasis: 200,
    height: "2px",
    width: "50%",
    fontSize: "1.5em"
  },

  cardMedia: {
    "&:hover": {
      opacity: 0.7,
      cursor: "pointer"
    }
  },
  backImage: {
    "&:hover": {
      opacity: 0.9,
      cursor: "pointer"
    }
  },
  link: {
    marginRight: '3px',
    "&:hover": {
      opacity: 0.9,
      cursor: "pointer"
    }
  }
});
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ProjectSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      impactCategory: [],
      yourLocation: "",
      resourceType: "0",
      projectStatus: "0",
      distanceFromYou: "0",
      loader: false,
      activePage: 1,
      pageSize: 10
    };
  }

  handlePageChange = async (page) => {
    await this.setState({ activePage: page });
    this.findProjects();
  }

  onShowSizeChange = async (page, pagesPerPage) => {
    await this.setState({ pageSize: pagesPerPage });
    await this.setState({ activePage: 1 })
    this.findProjects();
  }

  getimg(id) {
    var { classes } = this.props;
    this.props.getProjectById({ id: id }, () => { });
    var fndimag = "/static/media/Helpingothers4.023cec80.jpg";
    if (this.props.projectAttachments) {
      this.props.projectAttachments.map((value, key) => {
        var attbits = this.props.projectAttachments[key].originalName.split(
          "."
        );
        if (attbits[0] === "ProjectImage") {
          fndimag = hostname() + this.props.projectAttachments[key].attachment;
        }
      });
    } else {
      var attbits = "";
      fndimag = "/static/media/Helpingothers4.023cec80.jpg";
    }
    return fndimag;
  }

  componentWillUnmount() {
    this.props.findProjectUnmount();
  }

  onLocationChange = text => {
    this.props.locationChanged(text);
  };

  onCountryChanged = text => {
    store.dispatch(countryChanged(text));
  };

  handleResourceType = event => {
    this.props.resourceChanged(event.target.value);
  };
  handleProjectStatus = event => {
    this.props.projectStatusChanged(event.target.value);
  };
  handleImpactCategory = value => {
    this.props.impactCategoriesChanged(value);
  };
  onCountryChange = text => {
    this.props.countryChanged(text);
  };
  onKeywordChange = text => {
    this.props.keywordChanged(text);
  };
  color(i) {
    if (i === 1) return "#dbebf6";
  }
  toggleLoader = async flag => {
    await this.setState({
      loader: flag
    });
  };
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  findProjects() {
    this.toggleLoader(true);
    const {
      impactCategories,
      yourLocation,
      country,
      keyword,
      projectStatus,
      resourceType,
    } = this.props;
    const { activePage, pageSize } = this.state
    this.props.findProjects(
      {
        impactCategories,
        yourLocation,
        country,
        keyword,
        projectStatus,
        resourceType,
        activePage, pageSize
      },
      flag => {
        this.toggleLoader(flag);
      }
    );
  }
  state = {
    noticeModal: false
  };
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/home/find-project')
    }
    this.findProjects();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div style={{
          height: '23em',
          marginRight: '-31px',
          marginLeft: '-31px',
          opacity: 1,
          marginBottom: "50px",
          zIndex: 3,
          position: "relative",
          background: '#222222 none repeat scroll 0 0',
        }}>
          <img
            className={classes.backImage}
            src={bgImag}
            style={{ height: '23em', width: '100%', opacity: '0.6', objectFit: "cover" }}
          />
          <div>
            {this.props.isLoggedIn ? null : (
              <h2>
                <font color="white" face="verdana" className={classes.fontClass1}>
                  Find A Project
              </font>
              </h2>
            )}
          </div>
        </div>
        <Loader loader={this.state.loader} />
        <GridContainer justify="center" style={{ zIndex: '100 !important' }}>
          <GridItem xs={11} sm={10} md={10} lg={8} >
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Find Projects</h4>
              </CardHeader>
              <CardBody>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={3} style={{ marginTop: 30 }}>
                      <CountryDropdown onCountryChanged={this.onCountryChanged} defaultValue={this.props.userCountry} />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3} style={{ marginTop: 30 }}>
                      <InterestsDropdown
                        onInterestsChange={
                          async (e, { value }) => {
                            await this.setState({ value: value })
                            if (!this.state.value) {
                              await this.setState({
                                valid: true
                              })
                              this.handleImpactCategory(value)
                            }
                            else {
                              await this.setState({ valid: false })
                              this.handleImpactCategory(value)
                            }
                          }
                        }
                        interestOptions={this.props.interestOptions} defaultValue={this.props.impactCategories} />
                    </GridItem>
                    {/* </GridContainer>
                    <br />
                    <GridContainer> */}
                    <GridItem xs={12} sm={6} md={3} style={{ marginTop: 17 }}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="resource-type"
                          className={classes.selectLabel}
                        >
                          Resource Type
                        </InputLabel>
                        <Select
                          value={this.props.resourceType}
                          onChange={this.handleResourceType}
                          MenuProps={{ className: classes.selectMenu }}
                          classes={{ select: classes.select }}
                          inputProps={{
                            name: "resourceType",
                            id: "resource-type"
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Choose Resource Type
                          </MenuItem>
                          {
                            ['Needs Volunteers', 'Needs Freelancers', 'Any'].map((prop, key) => {
                              return (
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value={prop}
                                  key={key}
                                >
                                  {prop}
                                </MenuItem>
                              );
                            })
                          }
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3} style={{ marginTop: 17 }}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="project-status"
                          className={classes.selectLabel}
                        >
                          Project Status
                        </InputLabel>
                        <Select
                          value={this.props.projectStatus}
                          onChange={this.handleProjectStatus}
                          MenuProps={{ className: classes.selectMenu }}
                          classes={{ select: classes.select }}
                          inputProps={{
                            name: "projectStatus",
                            id: "project-status"
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Choose Project Status
                          </MenuItem>
                          {
                            ['ACTIVE', 'CLOSED', 'ANY'].map((prop, key) => {
                              return (
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value={prop}
                                  key={key}
                                >
                                  {prop}
                                </MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>
                      <CustomInput
                        labelText="Comma seperated keywords"
                        id="keywords"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          name: "keywordsHashtags",
                          onChange: e => {
                            this.onKeywordChange(e.target.value)
                          }
                        }}
                      />
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={4}
                      md={4}
                      className={classes.center}
                    >
                      <Dialog
                        classes={{
                          root: classes.center + " " + classes.modalRoot,
                          paper: classes.modal
                        }}
                        open={this.state.noticeModal}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => this.handleClose("noticeModal")}
                        aria-labelledby="notice-modal-slide-title"
                        aria-describedby="notice-modal-slide-description"
                      >
                        <DialogTitle
                          id="notice-modal-slide-title"
                          disableTypography
                          className={classes.modalHeader}
                        >
                          <Button
                            justIcon
                            className={classes.modalCloseButton}
                            key="close"
                            style={{ float: "right" }}
                            aria-label="Close"
                            color="transparent"
                            onClick={() => this.handleClose("noticeModal")}
                          >
                            <Close className={classes.modalClose} />
                          </Button>
                        </DialogTitle>
                        <DialogContent
                          id="notice-modal-slide-description"
                          className={classes.modalBody}
                        >
                          <p style={{ fontSize: "16px" }}>
                            Please Login to View Project Details
                            </p>
                        </DialogContent>
                        <DialogActions
                          className={
                            classes.modalFooter +
                            " " +
                            classes.modalFooterCenter
                          }
                        >
                          <Button
                            onClick={() => this.props.history.push('/login')}
                            color="info"
                            round
                            className={classes.center}
                          >
                            Go to Login
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </GridItem>
                    {/* </GridContainer>
                       <br />
                       <GridContainer> */}
                    <GridItem xs={12} sm={4} md={4} style={{ marginTop: 30, textAlign: 'right' }}>
                      <Button color="info" onClick={() => this.findProjects()}>
                        Find
                      </Button>
                    </GridItem>
                  </GridContainer>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        {/* <Card>
                <CardBody > */}
        {this.props.tableData ? <div>
          <GridContainer justify="center">
            {this.props.tableData.map(cardData => {
              let startDate = new Date(cardData.startDate)
              let endDate = new Date(cardData.endDate)
              startDate = startDate.toDateString()
              endDate = endDate.toDateString()
              let imag1 = cardData.defaultImage
              if (!imag1) {
                imag1 = imag
              }
              else {
                imag1 = hostname() + imag1
              }
              return (
                <GridItem xs={11} sm={5} md={5} lg={8} className="row-grid-item">
                  <Card className={classes.card}>
                    <GridContainer direction="row"
                    >
                      <GridItem xs={12} sm={12} md={12} lg={4}>
                        <CardMedia
                          component="img"
                          className={classes.cardMedia}
                          style={{
                            height: '100%',
                            maxHeight: '250px',
                            width: '100%',
                            '&:hover': {
                              background: 'blue'
                            }
                          }}
                          //  width="30%"
                          image={cardData.defaultImage ? hostname() + cardData.defaultImage : imag}
                          onClick={() => {
                            let id = cardData.projectId
                            this.props.isLoggedIn ? this.props.history.push(`/home/project-details/info?p=${cardData.projectId}`) : this.props.history.push(`/project-details/info?p=${cardData.projectId}`)
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12} lg={8}>
                        <CardContent style={{ padding: '0px 10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', marginTop: '12px', marginBottom: '0.1em' }}>
                              <Typography style={{ paddingRight: '0.5em', fontSize: 14, fontWeight: 700 }} color="textSecondary">
                                {cardData.project_details.map(detail => { return detail.name + ', ' })}
                                <Divider type="vertical" style={{ background: "#bababa" }} />
                              </Typography>
                              <Typography color="textSecondary" style={{ color: "rgb(255, 104, 22)", fontSize: 14, fontWeight: 800, }}>
                                {' ' + cardData.country}
                              </Typography>
                            </div>
                          </div>
                          <Typography gutterBottom variant="h5" component="h1" style={{ fontSize: '1.5rem', margin: '0.5em 0 0 0' }}>
                            <Link
                              className={classes.link}
                              color="inherit"
                              onClick={() => {
                                let id = cardData.projectId
                                this.props.isLoggedIn ? this.props.history.push(`/home/project-details/info?p=${cardData.projectId}`) : this.props.history.push(`/project-details/info?p=${cardData.projectId}`)
                              }}
                            >  {cardData.projectName}</Link>{cardData.status == "ACTIVE" ? <Tag color="green">{cardData.status}</Tag> : <Tag color="red">{cardData.status}</Tag>}
                          </Typography>
                          {/* <Typography color="textSecondary" style={{ marginBottom: 8 }}>
                        CREATED BY {cardData.createdByDetails.firstName} {cardData.createdByDetails.lastName}
                      </Typography> */}

                          <Typography style={{ margin: ' 0.5em 0 0em 0', overflow: 'hidden', position: 'relative', fontSize: '1.1rem', color: "#3e4b59", fontWeight: 400, height: '2.9em', /* exactly three lines */ }} component="h3">
                            {cardData.projectSummary}

                          </Typography>
                          <Link
                            className={classes.link}
                            color="inherit"
                            onClick={() => {
                              let id = cardData.projectId
                              this.props.isLoggedIn ? this.props.history.push(`/home/project-details/info?p=${cardData.projectId}`) : this.props.history.push(`/project-details/info?p=${cardData.projectId}`)
                            }}
                          >   (...more)</Link>

                          <GridContainer style={{ marginTop: '10px' }}>
                            <GridItem xs={12} sm={12} md={12} lg={12} >
                              <h4 color="textSecondary" style={{ marginBottom: 2, color: "rgba(120, 155, 93, 0.92)", display: 'flex', textTransform: 'uppercase', fontWeight: '600' }}>
                                <span style={{
                                  color: 'green', paddingRight: '6px'
                                }}>$0</span>raised of ${cardData.estimatedBudget} goal
                            </h4>
                              <Progress size="small" percent={0} progress active color='green' style={{ width: '95%', display: "inline-block" }} />
                            </GridItem >
                            {/* <GridItem xs={12} sm={12} md={6}>
                            <GridContainer>
                              <GridItem xs={6} sm={6} md={6} >
                                <Input type='number' placeholder='Amount' style={{ width: '100%' }}
                                    size="big"
                                     labelPosition='left'
                                     >
                                    <Label >$</Label>
                                  <input />
                                </Input>
                              </GridItem>
                              <GridItem xs={6} sm={6} md={6} >
                                <Button color="success" style={{ width: '100%', marginTop: 0, }} className={classes.button}>
                                  Donate
                                  </Button>
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                       */}
                          </GridContainer>
                        </CardContent>
                      </GridItem>
                    </GridContainer>
                  </Card>
                </GridItem>
              )
            })}
          </GridContainer>
          <GridContainer justify="center">
            <Pagination showSizeChanger hideOnSinglePage pageSizeOptions={['2', '5', '10', '20', '50']} onShowSizeChange={this.onShowSizeChange} pageSize={this.state.pageSize} current={this.state.activePage} onChange={this.handlePageChange} total={this.props.totalPages} />
          </GridContainer>
        </div> : null}


      </div>
    );
  }
}

ProjectSearch.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    tableData: state.findProject.tableData,
    totalPages: state.findProject.totalPages,
    impactCategories: state.findProject.impactCategories,
    yourLocation: state.findProject.yourLocation,
    resourceType: state.findProject.resourceType,
    projectStatus: state.findProject.projectStatus,
    distanceFromYou: state.findProject.distanceFromYou,
    keyword: state.findProject.keyword,
    country: state.findProject.country,
    textChanged: state.findProject.textChanged,
    interestOptions: state.common.interestOptions,
    resourceTypeOptions: state.findProject.resourceTypeOptions,
    projectAttachments: state.proDetails.projectAttachments
  };
};
export default connect(
  mapStateToProps,
  {
    getProjectCandidateReviewList,
    locationChanged,
    resourceChanged,
    projectStatusChanged,
    impactCategoriesChanged,
    countryChanged,
    findProjectUnmount,
    keywordChanged,
    findProjects,
    getProjectById,
    idStored
  }
)(withStyles(styles)(ProjectSearch));
