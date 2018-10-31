import React from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// @material-ui/icons
import ViewList from "@material-ui/icons/ViewList";
import Assignment from "@material-ui/icons/Assignment";
import Slide from "@material-ui/core/Slide";
import Close from "@material-ui/icons/Close";
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
import {
  locationChanged,
  resourceChanged,
  projectStatusChanged,
  impactCategoriesChanged,
  countryChanged,
  keywordChanged,
  findProjectUnmount,
  findProjects,
} from "../../actions/findProject";
import Loader from "../../components/Loader/Loader"
import { getProjectById, idStored } from '../../actions/projectDetails'
import { getProjectCandidateReviewList } from '../../actions/candidateReview'

import store from "../../store/store";
const styles = theme => ({
  ...projectSearchStyle,
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 13,
  }
})
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
      data: []
    };
  }

  componentWillUnmount() {
    this.props.findProjectUnmount()
  }

  onLocationChange = text => {
    this.props.locationChanged(text)
  }

  onCountryChanged = (text) => {
    store.dispatch(countryChanged(text))
  }

  handleResourceType = event => {
    this.props.resourceChanged(event.target.value)
  };

  handleProjectStatus = event => {
    this.props.projectStatusChanged(event.target.value)
  };

  handleImpactCategory = value => {
    this.props.impactCategoriesChanged(value)
  };

  onCountryChange = text => {
    this.props.countryChanged(text)
  }

  onKeywordChange = text => {
    this.props.keywordChanged(text)
  }

  color(i) {
    if (i === 1) return '#dbebf6'
  }

  toggleLoader = async (flag) => {
    await this.setState({
      loader: flag
    });
  }
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
      resourceType
    } = this.props
    this.props.findProjects(
      {
        impactCategories,
        yourLocation,
        country,
        keyword,
        projectStatus,
        resourceType
      }, (flag) => {
        this.toggleLoader(flag) 
      }
    )
  }
  state = {
    noticeModal: false
  }
  render() {
    const { classes } = this.props;

    return (
      <GridContainer className={this.props.isLoggedIn ? null : classes.container}>
        <Loader loader={this.state.loader} />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
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
                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: 30 }}>
                      <CountryDropdown onCountryChanged={this.onCountryChanged} defaultValue={this.props.userCountry} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: 30 }}>
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
                  </GridContainer>
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
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
                    <GridItem xs={12} sm={12} md={6}>
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
                    <GridItem xs={12} sm={12} md={12}>
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
                  </GridContainer>
                  <br />
                  {
                    //ui part of modal
                  }
                  <GridContainer justify="center">
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
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
                  </GridContainer>
                  <br />
                  <GridContainer>
                    <GridItem>
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

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardBody >
                <GridContainer>
                  <GridItem xs={12} sm={12}>
                    <ReactTable style={{ overflow: "none" }}
                      data={
                          this.props.tableData.map((element) => {
                            let startDate = new Date(element.start_date);
                            let endDate = new Date(element.end_date);
                            startDate = startDate.toDateString()
                            endDate = endDate.toDateString()
                            return {
                              project_name: element.project_name,
                              status: element.status,
                              startDate: startDate,
                              endDate: endDate,
                              Close: "",
                              Complete: "",
                              Action: <span>
                                <Tooltip
                                  title="Details"
                                  classes={{ tooltip: classes.lightTooltip }}
                                >
                                  <Button
                                    round
                                    justIcon
                                    simple
                                    onClick={() => {
                                      let id = element.project_id
                                      this.toggleLoader(true)
                                      this.props.getProjectById({ id }, (flag) => {
                                        this.toggleLoader(flag)
                                        this.props.history.push(`/project-details/info`)
                                        this.props.idStored(element.project_id)
                                      })
                                    }}
                                    color="info"
                                    className="like"
                                  ><ViewList /></Button>
                                </Tooltip>
                              </span>
                            }
                          })
                      }
                      columns={[
                        {
                          Header: <strong>Name</strong>,
                          accessor: "project_name",
                          filterable: true,
                          filterMethod: this.columnFilter
                        },
                        {
                          Header: <strong>Status</strong>,
                          accessor: "status",
                          filterable: true,
                          filterMethod: this.columnFilter
                        },
                        {
                          Header: <strong>Start</strong>,
                          accessor: "startDate",
                          filterable: true,
                          filterMethod: this.columnFilter
                        },
                        {
                          Header: <strong>Target End</strong>,
                          accessor: "endDate",
                          filterable: true,
                          filterMethod: this.columnFilter
                        },
                        {
                          Header: <strong>Close</strong>,
                          accessor: "Close",
                          filterable: true,
                          filterMethod: this.columnFilter
                        },
                        {
                          Header: <strong></strong>,
                          accessor: "Action",
                          sortable: false,
                        }
                      ]}
                      defaultPageSize={5}
                      showPaginationTop
                      showPaginationBottom={false}
                      className="-striped -highlight"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridContainer>

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
    impactCategories: state.findProject.impactCategories,
    yourLocation: state.findProject.yourLocation,
    resourceType: state.findProject.resourceType,
    projectStatus: state.findProject.projectStatus,
    distanceFromYou: state.findProject.distanceFromYou,
    keyword: state.findProject.keyword,
    country: state.findProject.country,
    textChanged: state.findProject.textChanged,
    interestOptions: state.common.interestOptions,
    resourceTypeOptions: state.findProject.resourceTypeOptions
  }
}


export default connect(mapStateToProps, {
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
})(withStyles(styles)(ProjectSearch));
