import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from "@material-ui/core/Slide";

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
  textChanged,
  budgetChanged,
  descriptionChanged,
  endDateChanged,
  freelancersChanged,
  filesChanged,
  projectNameChanged,
  startDateChanged,
  volunteersChanged,
  zipCodeChanged,
  startProject,
  startProjectUnmount,
  uploadFiles,
  countryChanged,
  interestschanged
} from '../../actions/startProject'
import Toaster from "../../components/Toaster/Toaster";
import store from '../../store/store'

const uid = Math.random().toString(36).substring(7);
var data = []

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
class StartProject extends React.Component {
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
      freeLancers: null,
      startDate: null,
      validName: false,
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

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.handleClickOpen("noticeModal")
    }
    this.props.getCommonInfo()
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
    this.props.startProjectUnmount()
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

  onProjectNameChange = async (text) => {
    if (text === "") {
      this.validate("ProjectName")
    }
    else {
      await this.setState({ validName: false })
      this.props.projectNameChanged(text)
      this.props.textChanged()
    }
  }

  onDescriptionChange = async (text) => {
    if (text === "") {
      this.validate("Description")
    }
    else {
      await this.setState({ validDescription: false })
      this.props.descriptionChanged(text)
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
          a =
            [<span className={classes.customFont}>
              {this.props.files[key].name}
            </span>,
            <Button simple justIcon color='info' onClick={() => {
              //call delete action
              this.fileSplicer(this.props.files, key);
            }}>
              <Delete />
            </Button>]

          data.push(a)

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
      this.validate("startDate")
    }
    else {
      await this.setState({ validEndDate: false })
      this.props.endDateChanged(text)
      this.props.textChanged()
    }
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
  onCountryChanged = async (text) => {
    if (text === "") {
      this.validate("Country")
    }
    else {
      await this.setState({ validCountry: false })
      store.dispatch(countryChanged(text))
      store.dispatch(textChanged())
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
  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={this.props.isLoggedIn ? classes.justifyContentCenter : classes.container}>
        {this.props.requestCompleted ? <Toaster display={this.props.requestCompleted} message={'Project has been created'} /> : null}
        <Loader loader={this.state.loader} />
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info" text>
              <CardText color="info">
                <h4>Start a project to help others OR ask for help</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <div ref={this.myRef} />
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      labelText="Project Name"
                      id="projectName"
                      error={this.state.validName}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Enter a Project Name",
                        onChange: e => {
                          this.onProjectNameChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      labelText="Project Description"
                      id="projectDescription"
                      error={this.state.validDescription}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Enter a Project Description",
                        onChange: e => {
                          this.onDescriptionChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                    <InputLabel className={classes.label} style={{ marginBottom: 5, marginTop: 10 }}>
                      Country
                        </InputLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer spacing={8}>
                  <GridItem xs={6}>
                    <CountryDropdown onCountryChanged={this.onCountryChanged} defaultValue={this.props.country} action={this.state.validCountry} />
                  </GridItem>
                </GridContainer>
                <GridContainer spacing={8}>
                  <GridItem xs={6} style={{}}>
                    <CustomInput
                      labelText="Project Zip Code"
                      id="projectLocation"
                      error={this.state.validZipCode}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Enter zip code of location where it took place",
                        onChange: e => {
                          this.onZipCodeChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}><br />
                    <InputLabel className={classes.label} style={{ marginBottom: 5, marginTop: 10 }}>
                      Impact Category
                        </InputLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}><br />
                    <InterestsDropdown
                      onInterestsChange={
                        async (e, { value }) => {
                          await this.setState({ value: value })
                          if (this.state.value === []) {
                            await this.setState({
                              validInterests: true
                            })
                            store.dispatch(interestschanged(value))
                          }
                          else {
                            await this.setState({ validInterests: false })
                            store.dispatch(interestschanged(value))
                            store.dispatch(textChanged())
                          }
                        }
                      }
                      interestOptions={this.props.interestOptions} action={this.state.validInterests} defaultValue={this.props.interests ? this.props.interests : null}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}><br /><br />
                    <InputLabel className={classes.label} style={{ marginTop: 20 }}>
                      Resources Needed
                        </InputLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem style={{ marginTop: 23 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={
                            async () => {
                              await this.setState({ volunteerStatus: !this.state.volunteerStatus })
                              this.state.volunteerStatus ? this.onVolunteersChange('') : null
                            }
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      label="Volunteers (Unpaid)"
                    />
                  </GridItem>
                  <GridItem md={6}>
                    <CustomInput
                      id="volunteers"
                      labelText="Enter Number of Volunteers"
                      error={this.state.validVolunteers}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.volunteers,
                        disabled: this.state.volunteerStatus,
                        placeholder: "",
                        onChange: e => {
                          this.onVolunteersChange(e.target.value)
                        }
                      }}
                    />

                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem style={{ marginTop: 23 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={
                            async () => {
                              await this.setState({ freeLanceStatus: !this.state.freeLanceStatus })
                              this.state.freeLanceStatus ? this.onFreeLancersChange('') : null
                            }
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      label="Freelancers (Paid)"
                    />
                  </GridItem>
                  <GridItem md={6}>
                    <CustomInput
                      labelText="Enter Number of Freelancers"
                      id="projectDescription"
                      error={this.state.validFreelancers}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.freelancers,
                        disabled: this.state.freeLanceStatus,
                        placeholder: "",
                        onChange: e => {
                          this.onFreeLancersChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardBody>
                        {this.state.validStartDate ?
                          <InputLabel className={classes.label}>
                            <span style={{ color: "red" }}>Project Start Date</span>
                          </InputLabel>
                          :
                          <InputLabel className={classes.label}>
                            Project Start Date
                          </InputLabel>
                        }
                        <br />
                        <FormControl fullWidth>
                          <GridContainer>
                            <GridItem xs={9}>
                              <Datetime
                                timeFormat={false}
                                onChange={date => this.onStartDateChange(date._d)}
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
                            <span style={{ color: "red" }}>Project End Date (Estimated)</span>
                          </InputLabel>
                          :
                          <InputLabel className={classes.label}>
                            Project End Date (Estimated)
                          </InputLabel>
                        }

                        <br />
                        <FormControl fullWidth>
                          <GridContainer>
                            <GridItem xs={9}>
                              <Datetime
                                style={{'z-index':'999 !important'}}
                                timeFormat={false}
                                onChange={date => this.onEndDateChange(date._d)}
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
                <GridContainer>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      labelText="Budget"
                      id="projectDescription"
                      error={this.state.validBudget}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Enter Estimated Budget (USD)",
                        onChange: e => {
                          this.onBudgetChange(e.target.value)
                        }
                      }}
                    />
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
                    <Label
                      basic
                    >
                      <GridContainer className={classes.justifyContentCenter}>
                        <GridItem>
                          <Button color="info" onClick={() => this.handleClick()}>
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
                                      this.state.files
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
                        <GridItem>
                        </GridItem>
                      </GridContainer>
                    </Label>
                  </GridItem>
                </GridContainer>
                <br />
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
                          Please Login to Start a Project
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
                    <Button onClick={() => {
                      if (!this.props.isLoggedIn) {
                        this.handleClickOpen("noticeModal")
                      } else {
                        this.toggleLoader(true)
                        const {
                              name,
                          description,
                          volunteers,
                          freelancers,
                          zipCode,
                          country,
                          interests,
                          startDate,
                          endDate,
                          budget,
                          userId,
                          files
                            } = this.props
                        this.props.startProject({
                          name,
                          description,
                          volunteers,
                          freelancers,
                          zipCode,
                          country,
                          interests,
                          startDate,
                          endDate,
                          budget,
                          userId,
                          files
                        }, (projectId) => {
                          this.props.uploadFiles(
                            {
                              uploadType: 'startProjectFiles',
                              userInfo: {
                                userId: this.props.userId,
                                projectId: projectId
                              }
                            },
                            this.props.files,
                          )
                        }, (flag) => {
                          this.toggleLoader(flag)
                        })
                        if (this.props.name === "") {
                          this.setState({ validName: true })
                        }
                        if (this.props.description === "") {
                          this.setState({ validDescription: true })
                        }
                        if (this.props.interests === "") {
                          this.setState({ validInterests: true })
                        }
                        if (this.props.interests !== "") {
                          this.setState({ validInterests: false })
                        }
                        if (this.props.country === "") {
                          this.setState({ validCountry: true })
                        }
                        if (this.props.country !== "") {
                          this.setState({ validCountry: false })
                        }
                        if (this.props.startDate === "") {
                          this.setState({ validStartDate: true })
                        }
                        if (this.props.endDate === "") {
                          this.setState({ validEndDate: true })
                        }
                        if (this.props.budget === "") {
                          this.setState({ validBudget: true })
                        }
                        if (this.props.zipCode === "") {
                          this.setState({ validZipCode: true })
                        }
                        if (this.props.volunteers === "") {
                          this.setState({ validVolunteers: true })
                        }
                        if (this.props.freelancers === "") {
                          this.setState({ validFreelancers: true })
                        }
                      }
                    }}

                      color="info"
                    >
                      {this.props.text}
                    </Button>
                  </GridItem>
                </GridContainer>
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
    name: state.start.name,
    description: state.start.description,
    zipCode: state.start.zipCode,
    freelancers: state.start.freelancers,
    volunteers: state.start.volunteers,
    startDate: state.start.startDate,
    endDate: state.start.endDate,
    budget: state.start.budget,
    text: state.start.text,
    interests: state.start.interests,
    interestOptions: state.common.interestOptions,
    requestCompleted: state.start.requestCompleted,
    userId: state.user.userId,
    files: state.start.files,
    uploadStatus: state.start.uploadStatus,
    country: state.start.country,
    isLoggedIn: state.auth.isLoggedIn
  }
}

StartProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  textChanged,
  budgetChanged,
  descriptionChanged,
  endDateChanged,
  freelancersChanged,
  projectNameChanged,
  startDateChanged,
  volunteersChanged,
  zipCodeChanged,
  startProject,
  getCommonInfo,
  startProjectUnmount,
  filesChanged,
  uploadFiles
})(withStyles(startProjectPageStyle, notificationsStyle)(StartProject));
