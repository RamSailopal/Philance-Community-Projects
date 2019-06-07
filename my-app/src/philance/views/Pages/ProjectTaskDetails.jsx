import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import Toaster from '../../components/Toaster/Toaster'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CardIcon from "components/Card/CardIcon.jsx";
import Assignment from "@material-ui/icons/Assignment";
import { hostname } from "../../../config";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import CustomInput from "philance/components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Delete from "@material-ui/icons/Delete";


// styles for buttons on sweetalert
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// import notificationsStyle from "../../../assets/jss/";
import notificationsStyle from "../../../assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";

// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import { InterestsDropdown, CountryDropdown } from '../../components/DoubleDropdown'
import { connect } from 'react-redux'
import { Label, Icon } from 'semantic-ui-react';
import Loader from "../../components/Loader/Loader"
import { getCommonInfo } from "../../actions/common";
import {
  descriptionChanged,
  endDateChanged,
  filesChanged,
  priorityChanged,
  projectTasksUnmount,
  startDateChanged,
  taskNameChanged,
  taskStatusChanged,
  textChanged,
  updateTaskDetails,
  uploadFiles,
  userSelectedChanged,
  deleteTaskAttachments,
} from "../../actions/projectTaskDetails";
import {
  setTaskDetails
} from '../../actions/projectTasks'
import {
  getProjectById
} from '../../actions/projectDetails'
import store from '../../store/store'

const uid = Math.random().toString(36).substring(7);
var data = []

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
class ProjectTaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '',
      name: '',
      description: '',
      freelancers: '',
      interests: '',
      loader: false,
      noticeModal: false,
      volunteerStatus: true,
      freeLanceStatus: true,
      volunteers: null,
      status: null,
      startDate: null,
      validName: false,
      isDisabled: true,
      isUpdated: false,
      messag: '',
      files: [],
      data: [],
      validBudget: false,
      validZipCode: false,
      validDescription: false,
      validDropdown: false,
      validInterests: false,
      validCountry: false,
      validStartDate: false,
      validEndDate: false,
      validVolunteers: false,
      validFreelancers: false,
    };
    this.myRef = React.createRef();
    this.fileInput = React.createRef();
  }

  handlePriority(e) {
    this.props.priorityChanged(e.target.value)
  }
  handleTaskStatus(e) {
    this.props.taskStatusChanged(e.target.value)
    this.setState({
      status: e.target.value
    })
  }
  handleUserSelected(e) {
    this.props.userSelectedChanged(e.target.value)
  }

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.handleClickOpen("noticeModal")
    }
    this.props.setTaskDetails(this.props.projectTasks, this.props.match.params.id)
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }

  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.props.history.push('/login')
    this.setState(x);
  }

  componentWillUnmount() {
    this.props.projectTasksUnmount()
  }

  toggleLoader = async (flag) => {
    await this.setState({
      loader: flag
    });
  }

  validate = async (value) => {
    if (value === "ProjectName") {
      await this.setState({
        validName: true
      })
    }
    if (value === "Description") {
      await this.setState({
        validDescription: true
      })
    }
    if (value === "startDate") {
      await this.setState({
        validStartDate: true
      })
    }
    if (value === "Budget") {
      await this.setState({
        validBudget: true
      })
    }
    if (value === "Zipcode") {
      await this.setState({
        validZipCode: true
      })
    }
    if (value === "endDate") {
      await this.setState({
        validEndDate: true
      })
    }
    if (value === "Volunteers") {
      await this.setState({
        validVolunteers: true
      })
    }
    if (value === "Freelancers") {
      await this.setState({
        validFreelancers: true
      })
    }
  }

  onTaskNameChange = async (text) => {
    if (text === "") {
      this.validate("ProjectName")
    }
    else {
      await this.setState({ validName: false })
      this.props.taskNameChanged(text)
      this.props.textChanged()
    }
  }

  onBudgetChange = async (text) => {
    if (text === "") {
      this.validate("Budget")
    }
    else {
      await this.setState({ validBudget: false })
      this.props.budgetChanged(text)
      this.props.textChanged()
    }
  }
  async onFilesChange(files) {
    const { classes } = this.props;

    if (files.length == 0) {
      data = []
    }
    var a = []
    await this.props.filesChanged(files, async () => {
      await files ? Array.from(this.props.files).map((value, key) => {
        if (Array.from(files)[key]) {
          if (this.props.files[key].size < 10485760) {
            a =
              [<span className={classes.customFont}>
                {this.props.files[key].name}
              </span>,
              <Button simple justIcon color='twitter' onClick={() => {
                //call delete action
                this.fileSplicer(this.props.files, key);
              }}>
                <Delete />
              </Button>]

            data.push(a)
          }
          else {
            a = [<span className={classes.customFont}>
              <font color="red">{"The size of the file is bigger than 10MB"}</font>
            </span>
            ]
            data.push(a);
            setTimeout(
              function () {
                this.fileSplicer(this.props.files, key);
              }
                .bind(this), 5000);
          }
        }
      }) : null
    })

    await this.setState({
      files: data
    })
    data = []

  }

  onEndDateChange = async (text) => {
    if (text === undefined) {
      this.validate("endDate")
    }
    else if (text < this.props.startDate) {
      this.validate("endDate")
    }
    else {
      await this.setState({ validEndDate: false })
      this.props.endDateChanged(text)
      this.props.textChanged()
    }
    this.state = { endDate: text };
    const {
      endDate
    } = this.props

  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text)
    this.props.textChanged()

  }
  onDescriptionChange(text) {
    this.props.descriptionChanged(text)
    this.props.textChanged()
  }

  onFreeLancersChange = async (text) => {
    if (text === "") {
      this.validate("Freelancers")
      this.props.freelancersChanged(text)
      this.props.textChanged()
    }
    else {
      await this.setState({ validFreelancers: false })
      this.props.freelancersChanged(text)
      this.props.textChanged()
    }
  }

  onStartDateChange = async (text) => {
    if (text === undefined) {
      this.validate("startDate")
    }
    else {
      await this.setState({ validStartDate: false })
      this.props.startDateChanged(text)
      this.props.textChanged()
    }
  }
  onVolunteersChange = async (text) => {
    if (text === "") {
      this.validate("Volunteers")
      this.props.volunteersChanged(text)
      this.props.textChanged()
    }
    else {
      await this.setState({ validVolunteers: false })
      this.props.volunteersChanged(text)
      this.props.textChanged()
    }
  }
  onZipCodeChange = async (text) => {
    if (text === "") {
      this.validate("Zipcode")
    }
    else {
      await this.setState({ validZipCode: false })
      this.props.zipCodeChanged(text)
      this.props.textChanged()
    }
  }

  fileSplicer = async (files, key) => {
    var a = [];
    await Array.from(files).map((value, index) => {
      if (index != key) {
        a.push(value)
      }
    })
    this.onFilesChange(a);
  }
  handleClick() {

    this.refs.fileInput.click();
  }

  taskbutcol(creatby, userid) {
    if (userid == creatby) {
      var col = "twitter"
    }
    else {
      var col = "secondary"
    }
    return col
  }

  taskbutdis(creatby, userid) {
    if (userid == creatby) {
      var stat = ""
    }
    else {
      var stat = "disabled"
    }
    return stat
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={this.props.isLoggedIn ? classes.justifyContentCenter : classes.container}>
        <Toaster display={this.state.isUpdated} message={this.state.messag} />
        <Loader loader={this.state.loader} />
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Task Details</h4>
            </CardHeader>
            <CardBody>

              <GridContainer align="right" direction="column">
                <GridItem style={{ marginRight: 45 }}>
                  {/* <NavLink to={'/project-details/tasks'} onClick={() => {
                            // this.props.history.push(`/project-details/tasks`)
                      }}> */}
                  {/* {!this.state.isDisabled ?null:
                      <Button color="info" round className={classes.marginRight} onClick={()=>{
                        this.props.getProjectById({ id: this.props.projectId }, () => {
                          // this.toggleLoader(flag);
                          this.props.history.push(`/home/project-details/tasks`)                        
                        })
                      }} >
                          Go To Project Tasks
                      </Button>} */}
                  {/* </NavLink> */}
                  <Button color={this.taskbutcol(this.props.createBy, this.props.userId)} disabled={this.taskbutdis(this.props.createBy, this.props.userId)} round className={classes.marginRight} onClick={async () => {
                    const {
                      taskName,
                      description,
                      startDate,
                      endDate,
                      text,
                      requestCompleted,
                      uploadStatus,
                      files,
                      userSelected,
                      status,
                      priority,
                      projectId,
                      userId
                    } = this.props
                    if (this.state.isDisabled) {
                      this.setState({ isDisabled: false })
                    }
                    else {
                      this.toggleLoader(true);
                      this.setState({ isDisabled: true })
                      await this.props.updateTaskDetails({
                        taskId: this.props.match.params.id,
                        taskName,
                        description,
                        startDate,
                        endDate,
                        text,
                        requestCompleted,
                        uploadStatus,
                        files,
                        userSelected,
                        status,
                        priority,
                        projectId,
                        userId
                      }, (flag) => {
                        //upload and callback
                        this.props.uploadFiles(
                          {
                            uploadType: 'projectTaskFiles',
                            taskInfo: {
                              userId: this.props.userId,
                              projectId: this.props.projectId,
                              taskId: this.props.match.params.id
                            }
                          },
                          this.props.files
                          , () => {
                            if (this.state.status == "Archived") {
                              this.props.projectTasksUnmount()
                              //  this.props.history.push('/home/project-details/tasks')
                              this.props.history.push(`/home/project-details/info?p=${this.props.projectId}`)
                            }

                            if (new Date(this.props.endDate) < new Date(this.props.startDate)) {

                              setTimeout(() => {
                                this.props.getProjectById({ id: this.props.projectId }, () => {
                                  this.props.setTaskDetails(
                                    this.props.projectTasks,
                                    this.props.match.params.id
                                  )


                                  this.toggleLoader(flag);
                                  this.setState({
                                    isUpdated: true,
                                    messag: 'End Date needs to be AFTER start date'
                                  })


                                  if (this.state.status == "Archived") {
                                    // this.props.history.push('/project-details/tasks')
                                  } else {
                                    setTimeout(() => {
                                      this.setState({
                                        isUpdated: false
                                      })
                                    }, 5000);
                                  }
                                })
                              }, 1000);

                            }
                            else {
                              setTimeout(() => {
                                this.props.getProjectById({ id: this.props.projectId }, () => {
                                  this.props.setTaskDetails(
                                    this.props.projectTasks,
                                    this.props.match.params.id
                                  )
                                  this.toggleLoader(flag);
                                  this.setState({
                                    isUpdated: true,
                                    messag: 'Task Details Amended Successfully'
                                  })
                                  if (this.state.status == "Archived") {
                                    // this.props.history.push('/project-details/tasks')
                                  } else {
                                    setTimeout(() => {
                                      this.setState({
                                        isUpdated: false
                                      })
                                    }, 5000);
                                  }
                                })
                              }, 1000);
                            }
                          }
                        )
                      })
                      // store.dispatch({ type: PROJECT_DETAILS_UPDATE_SUCESS })
                    }
                  }}
                  >
                    {this.state.isDisabled ? 'EDIT' : 'SAVE'}
                  </Button>
                  {!this.state.isDisabled ? null :
                    <Button color="twitter" round className={classes.marginRight} onClick={async () => {
                      this.props.history.goBack()
                    }}

                      color="twitter">
                      Go Back to Project
                      </Button>}
                  {this.state.isDisabled ? null :
                    <Button color="twitter" round className={classes.marginRight} onClick={async () => {
                      this.setState({
                        isDisabled: true
                      })
                      this.props.setTaskDetails(
                        this.props.projectTasks,
                        this.props.match.params.id
                      )
                    }}
                      color="twitter">
                      Cancel
                      </Button>}
                </GridItem>
                <br />
              </GridContainer>
              <form>
                <GridContainer>
                  <div ref={this.myRef} />
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      labelText="Task Name"
                      id="taskName"
                      error={this.state.validName}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.taskName,
                        placeholder: "Enter the task Name",
                        onChange: e => {
                          this.onTaskNameChange(e.target.value)
                        },
                        disabled: this.state.isDisabled
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      labelText="Task Description"
                      id="taskDescription"
                      error={this.state.validDescription}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.description,
                        placeholder: "Enter a Task Description",
                        onChange: e => {
                          this.onDescriptionChange(e.target.value)
                        },
                        disabled: this.state.isDisabled,
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={5} lg={5}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Task Status
                          </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.props.status}
                        onChange={(e) => { this.handleTaskStatus(e) }}
                        inputProps={{
                          name: "simpleSelect",
                          id: "simple-select",
                          disabled: this.state.isDisabled
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Task Status
                            </MenuItem>
                        {
                          ['Active', 'Closed', 'Archived'].map((prop, key) => {
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
                  <GridItem xs={12} sm={6} md={5} lg={5}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Choose Assignee
                          </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.props.userSelected}
                        onChange={(e) => { this.handleUserSelected(e) }}
                        inputProps={{
                          name: "simpleSelect",
                          id: "simple-select",
                          disabled: this.state.isDisabled
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Assignee
                            </MenuItem>
                        }
                           {
                          this.props.projectTeam.map((prop, key) => {
                            if (prop.status == "ACCEPTED") {
                              return (

                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value={prop.userId}
                                  key={key}
                                >
                                  {prop.user.firstName + ' ' + prop.user.lastName}
                                </MenuItem>
                              );
                            }
                          })
                        }
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={5} lg={5}>
                    <br /><br />
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Priority
                          </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.props.priority}
                        onChange={(e) => { this.handlePriority(e) }}
                        inputProps={{
                          name: "simpleSelect",
                          id: "simple-select",
                          disabled: this.state.isDisabled
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Priority
                            </MenuItem>
                        {
                          ["High", "Normal", "Low"].map((prop, key) => {
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
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardBody>
                        {this.state.validStartDate ?
                          <InputLabel className={classes.label}>
                            <span style={{ color: "red" }}>Task Start Date</span>
                          </InputLabel>
                          :
                          <InputLabel className={classes.label}>
                            Task Start Date
                          </InputLabel>
                        }
                        <br />
                        <FormControl fullWidth>
                          <GridContainer>
                            <GridItem xs={9}>
                              <Datetime
                                timeFormat={false}
                                onChange={date => this.onStartDateChange(date._d)}
                                value={new Date(this.props.startDate).toDateString()}
                                // defaultValue={new Date}
                                isValidDate={function (current) {
                                  return current.isAfter(Datetime.moment().subtract(1, 'day'))
                                }
                                }
                              />
                            </GridItem>
                            <GridItem xs={3}>
                              <Icon bordered inverted color='teal' name='calendar alternate outline' />
                            </GridItem>
                          </GridContainer>
                        </FormControl>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info" icon>
                      </CardHeader>
                      <CardBody>
                        {this.state.validEndDate ?
                          <InputLabel className={classes.label}>
                            <span style={{ color: "red" }}>Task End Date (Estimated)</span>
                          </InputLabel>
                          :
                          <InputLabel className={classes.label}>
                            Task End Date (Estimated)
                          </InputLabel>
                        }

                        <br />
                        <FormControl fullWidth>
                          <GridContainer>
                            <GridItem xs={9}>
                              <Datetime
                                timeFormat={false}
                                onChange={date => this.onEndDateChange(date._d)}
                                inputProps={{
                                  value: new Date(this.props.endDate).toDateString(),
                                  disabled: this.state.isDisabled
                                }}
                                isValidDate={function (current) {
                                  return current.isAfter(Datetime.moment().subtract(1, 'day'))
                                }
                                }
                              />
                            </GridItem>
                            <GridItem xs={3}>
                              <Icon bordered inverted color='teal' name='calendar alternate outline' />
                            </GridItem>
                          </GridContainer>
                        </FormControl>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>

                <label
                  as="label"
                  basic
                  htmlFor={uid}
                >
                  <input type="file" id={uid}
                    ref='fileInput'
                    multiple
                    style={{ display: "none" }}
                    name="files"
                    onChange={(e) => this.onFilesChange(e.target.files)}
                  />
                </label>
                <GridContainer>
                  <GridItem xs={12} sm={12} >
                    {this.state.isDisabled ? null :
                      <Label
                        basic
                      >
                        <GridContainer className={classes.justifyContentCenter}>
                          <GridItem>
                            <Button color="twitter" onClick={() => this.handleClick()}>
                              <Icon name='upload' />Select Files{'\t\t\t'}
                            </Button>
                          </GridItem>
                          <GridItem xs={12}>
                            {
                              this.props.files.length != 0 ?
                                <Card>
                                  <CardBody>
                                    <Table
                                      tableHead={[
                                        <strong>Name</strong>,
                                        ''
                                      ]}
                                      fixedHeader={true}
                                      tableHeaderStyle={{ borderRight: '40px solid transparent' }}
                                      tableData={
                                        this.state.tableData
                                      }
                                      customHeadCellClasses={[
                                        classes.description,
                                        classes.description,
                                        classes.description,
                                        classes.left,
                                        classes.left,
                                        classes.left
                                      ]}
                                      customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                                      customCellClasses={[
                                        classes.customFont,
                                        classes.customFont,
                                        classes.customFont,
                                        classes.tdNumber,
                                        classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                                        classes.tdNumber
                                      ]}
                                      customClassesForCells={[1, 2, 3, 4, 5, 6]}
                                    />
                                  </CardBody>
                                </Card>
                                : null
                            }
                          </GridItem>
                        </GridContainer>
                      </Label>}
                    <br /><br />
                    <GridItem>
                    </GridItem>
                    {this.props.taskAttachments ?
                      <GridItem xs={12}>
                        <Card>
                          <CardHeader color="info" icon>
                            <CardIcon color="info">
                              <Assignment />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>Task Attachments</h4>
                          </CardHeader>
                          <CardBody>

                            <Table
                              tableHead={[
                                <strong>Name</strong>,
                                ''
                              ]}
                              fixedHeader={true}
                              tableHeaderStyle={{ borderRight: '40px solid transparent' }}
                              tableData={
                                this.props.taskAttachments.map((value, key) => {
                                  return [<span className={classes.customFont}>
                                    <a href={hostname() + this.props.taskAttachments[key].attachment} target="_blank">{this.props.taskAttachments[key].originalName}</a>
                                  </span>,
                                  this.state.isDisabled ? null : <Button simple justIcon color='danger' onClick={() => {
                                    //call delete action
                                    this.toggleLoader(true)
                                    // this.fileSplicer(this.props.files, key);
                                    this.props.deleteTaskAttachments({
                                      name: this.props.taskAttachments[key].name,
                                      taskId: this.props.taskAttachments[key].taskId,
                                      projectId: this.props.taskAttachments[key].projectId,
                                    }, (flag) => {
                                      this.props.getProjectById({ id: this.props.projectId }, () => {
                                        this.props.setTaskDetails(
                                          this.props.projectTasks,
                                          this.props.match.params.id
                                        )
                                        this.toggleLoader(flag)
                                      })
                                    })
                                    // alert('deleting')
                                  }}>
                                    <Delete />
                                  </Button>]
                                })
                              }
                              customHeadCellClasses={[
                                classes.description,
                                classes.description,
                                classes.description,
                                classes.left,
                                classes.left,
                                classes.left
                              ]}
                              customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                              customCellClasses={[
                                classes.customFont,
                                classes.customFont,
                                classes.customFont,
                                classes.tdNumber,
                                classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                                classes.tdNumber
                              ]}
                              customClassesForCells={[1, 2, 3, 4, 5, 6]}
                            />
                          </CardBody>
                        </Card>
                      </GridItem>
                      : <h4>No Attachments for this tasks. Click on Edit add.</h4>
                    }
                  </GridItem>
                </GridContainer>
                <br />
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    taskName: state.projectTaskDetails.taskName,
    description: state.projectTaskDetails.description,
    startDate: state.projectTaskDetails.startDate,
    endDate: state.projectTaskDetails.endDate,
    text: state.projectTaskDetails.text,
    requestCompleted: state.projectTaskDetails.requestCompleted,
    uploadStatus: state.projectTaskDetails.uploadStatus,
    files: state.projectTaskDetails.files,
    userSelected: state.projectTaskDetails.userSelected,
    status: state.projectTaskDetails.status,
    priority: state.projectTaskDetails.priority,
    projectTasks: state.proDetails.projectTasks,
    createBy: state.proDetails.createdBy,
    userId: state.user.userId,
    isLoggedIn: state.auth.isLoggedIn,
    userId: state.auth.userId,
    projectId: state.proDetails.id,
    projectTeam: state.proDetails.projectTeam,
    isUpdated: state.projectTaskDetails.isUpdated,
    messag: state.projectTaskDetails.messag,
    taskAttachments: state.projectTaskDetails.taskAttachments,
  }
}

ProjectTaskDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  descriptionChanged,
  endDateChanged,
  filesChanged,
  priorityChanged,
  projectTasksUnmount,
  taskNameChanged,
  taskStatusChanged,
  textChanged,
  uploadFiles,
  userSelectedChanged,
  startDateChanged,
  updateTaskDetails,
  setTaskDetails,
  getProjectById,
  deleteTaskAttachments
})(withStyles(startProjectPageStyle, notificationsStyle)(ProjectTaskDetails));
