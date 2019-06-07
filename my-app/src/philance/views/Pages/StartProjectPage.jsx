import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { notification } from 'antd';
import Lottie from 'react-lottie'
import animationData from '../../../assets/animations/3399-upload.json'

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
import CardFooter from "components/Card/CardFooter.jsx";
import Delete from "@material-ui/icons/Delete";
import CardIcon from "components/Card/CardIcon.jsx";
import Assignment from "@material-ui/icons/Create";
import Muted from "components/Typography/Muted.jsx";
// @material-ui/icons
import mimetypes from '../../../mimetypes'
// styles for buttons on sweetalert
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// import notificationsStyle from "../../../assets/jss/";
import notificationsStyle from "../../../assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";

// @material-ui/icons
import Check from "@material-ui/icons/Check";

import Close from "@material-ui/icons/Close";
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import {
  InterestsDropdown,
  CountryDropdown
} from "../../components/DoubleDropdown";
import { connect } from "react-redux";
import { Label, Icon, Form, Input, TextArea } from "semantic-ui-react";
import Loader from "../../components/Loader/Loader";
import { getCommonInfo } from "../../actions/common";

import {
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
  startProjectUnmount,
  uploadFiles,
  uploadLinks,
  countryChanged,
  interestschanged,
  projectSummaryChanged,
  projectChallengeChanged,
  projectSolutionChanged,
  projectJustificationChange,
  documentsFilesChanged,
  imagesFilesChanged,
  budgetDetailsChange,
  cityChange,
  projectSuppliesNeededChange,
} from "../../actions/startProject";
import Toaster from "../../components/Toaster/Toaster";
import store from "../../store/store";
import bgImag from "philance/assets/img/VolunteerProject2.jpg";
import imageIcon from "philance/assets/img/backgroundImage.svg";
import { START_PROJECT_REQUEST_SUCCESS } from "../../actions/types.js";
import { startProjectSubmitValidation } from "../../helpers/validators";
const uid = Math.random()
  .toString(36)
  .substring(7);
var data = [];
let styles = {
  ...notificationsStyle,
  ...startProjectPageStyle,
  inputLabelStart: { marginBottom: 5, marginTop: 15, color: "black" },
  paddingTopGridItem: { paddingTop: '15px !important' },
  ribbonText: {
    color: '#f8f1f1', fontWeight: '400'
  }

};
function Transition(props) {
  return <Slide direction="down" {...props} />;
}
class StartProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationMessage: '',
      checked: "",
      name: "",
      description: "",
      freelancers: "",
      volunteers: "",
      interests: "",
      loader: false,
      noticeModal: false,
      volunteerStatus: true,
      freeLanceStatus: true,
      volunteers: 0,
      freeLancers: 0,
      startDate: null,
      invalidName: false,
      files: [],
      data: [],
      invalidBudget: false,
      invalidZipCode: false,
      invalidCity: false,
      invalidDescription: false,
      invalidDropdown: false,
      invalidInterests: false,
      invalidCountry: false,
      invalidStartDate: false,
      invalidImageFiles: false,
      invalidEndDate: false,
      invalidVolunteers: false,
      invalidFreelancers: false,
      invalidChallenge: false,
      invalidSummary: false,
      invalidSolution: false,
      invalidBudgetDetails: false,
      invalidJustification: false,
      videoLinks: [
        {
          userId: this.props.userId,
          link: "",
          attachmentType: "videoLink",
          attachmentDetails: ""
        }
      ],
      projectLinks: [],
      imagesFiles: [],
      documentsFiles: []
    };

    this.myRef = React.createRef();
    this.fileInput = React.createRef();
  }

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.handleClickOpen("noticeModal");
    } else {
      this.props.history.push('/home/start-project')
    }
    this.props.getCommonInfo();
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }

  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.props.history.push("/login");
    this.setState(x);
  }

  componentWillUnmount() {
    this.props.startProjectUnmount();
  }

  toggleLoader = async flag => {
    await this.setState({
      loader: flag
    });
  };

  validate = async value => {
    this.setState({
      [value]: true
    });
  };

  onProjectNameChange = async text => {
    if (text === "") {
      this.validate("invalidName");
    }
    await this.setState({ invalidName: false });
    this.props.projectNameChanged(text);
    this.props.textChanged();
  };

  onDescriptionChange = async text => {
    if (text === "") {
      this.validate("invalidDescription");
    }
    await this.setState({ invalidDescription: false });
    this.props.descriptionChanged(text);
    this.props.textChanged();

  };

  onBudgetChange = async text => {
    if (text === "" || !text.match("^[0-9]*$")) {
      this.validate("invalidBudget");
    }
    await this.setState({ invalidBudget: false });
    this.props.budgetChanged(text);
    this.props.textChanged();

  };
  async onProjectImagesInputChange(files) {
    const { classes } = this.props;
    this.setState({
      invalidImageFiles: false
    }, () => {
      Array.from(files).map(file => {
        if (
          !mimetypes.imageTypes.includes(file.type)
        ) {
          return this.setState({
            invalidImageFiles: true,
            invalidImageFilesMessage: "Invalid file Types"
          })
        }
      })
    })

    if (files.length == 0) {
      data = [];
    }
    var a = [];
    await this.props.imagesFilesChanged(files, async () => {
      (await files)
        ? Array.from(this.props.imagesFiles).map((value, key) => {
          if (Array.from(files)[key]) {
            if (this.props.imagesFiles[key].size < 16777216) {
              a = [
                <span className={classes.customFont}>
                  {this.props.imagesFiles[key].name}
                </span>,
                <Button
                  simple
                  justIcon
                  color="info"
                  onClick={() => {
                    //call delete action
                    this.fileSplicer(this.props.imagesFiles, key, 'image');
                  }}
                >
                  <Delete />
                </Button>
              ];
              data.push(a);
            } else {
              a = [
                <span className={classes.customFont}>
                  <font color="red">
                    {"The size of the file is bigger than 16MB"}
                  </font>
                </span>
              ];
              data.push(a);
              setTimeout(
                function () {
                  this.fileSplicer(this.props.imagesFiles, key, 'image');
                }.bind(this),
                5000
              );
            }
          }
        })
        : null;
    });
    await this.setState({
      imagesFiles: data
    });
    data = [];
  }
  async onProjectDocumentsInputChange(files) {
    const { classes } = this.props;

    if (files.length == 0) {
      data = [];
    }
    var a = [];
    await this.props.documentsFilesChanged(files, async () => {

      (await files)
        ? Array.from(this.props.documentsFiles).map((value, key) => {

          if (Array.from(files)[key]) {
            if (this.props.documentsFiles[key].size < 16777216) {
              a = [
                <span className={classes.customFont}>
                  {this.props.documentsFiles[key].name}
                </span>,
                <Button
                  simple
                  justIcon
                  color="info"
                  onClick={() => {
                    //calling delete action
                    this.fileSplicer(this.props.documentsFiles, key, 'document');
                  }}
                >
                  <Delete />
                </Button>
              ];
              data.push(a);

            } else {
              a = [
                <span className={classes.customFont}>
                  <font color="red">
                    {"The size of the file is bigger than 16MB"}
                  </font>
                </span>
              ];
              data.push(a);
              setTimeout(
                function () {
                  this.fileSplicer(this.props.documentsFiles, key, 'document');
                }.bind(this),
                5000
              );
            }
          }
        })
        : null;
    });
    await this.setState({
      documentsFiles: data
    });
    data = [];
  }

  onEndDateChange = async text => {
    const { startDate } = this.props;
    if (text === undefined) {
      this.validate("invalidStartDate");
    } else if (text < this.props.startDate) {
      this.validate("invalidEndDate");
    }
    await this.setState({ invalidEndDate: false });
    this.props.endDateChanged(text);
    this.props.textChanged();

  };
  onDescriptionChange(text) {
    this.props.descriptionChanged(text);
    this.props.textChanged();
  }

  onFreeLancersChange = async text => {
    if (
      parseInt(this.props.volunteers) + parseInt(text) < 1 ||
      parseInt(this.props.volunteers) === NaN ||
      parseInt(text) == NaN
    ) {
      this.validate("invalidResource");
      this.props.freelancersChanged(text);
      this.props.textChanged();
    } else if (
      !text.match("^[0-9]{1,3}$") &&
      !this.props.volunteers.match("^[0-9]{1,3}$")
    ) {
      this.validate("invalidFreelancers");
      this.props.freelancersChanged(text);
      this.props.textChanged();
    }
    await this.setState({ invalidResource: false });
    this.props.freelancersChanged(text);
    this.props.textChanged();

  };

  onStartDateChange = async text => {
    if (text === undefined) {
      this.validate("invalidStartDate");
    }
    await this.setState({ invalidStartDate: false });
    this.props.startDateChanged(text);
    this.props.textChanged();

  };
  onVolunteersChange = async text => {
    if (
      parseInt(this.props.freeLancers) + parseInt(text) < 1 ||
      parseInt(this.props.freeLancers) === NaN ||
      parseInt(text) == NaN
    ) {
      this.validate("invalidResource");
      this.props.volunteersChanged(text);
      this.props.textChanged();
    } else if (
      !text.match("^[0-9]{1,3}$") &&
      !this.props.freelancers.match("^[0-9]{1,3}$")
    ) {
      this.validate("invalidVolunteers");
      this.props.volunteersChanged(text);
      this.props.textChanged();
    }
    await this.setState({ invalidResource: false });
    this.props.volunteersChanged(text);
    this.props.textChanged();

  };
  onZipCodeChange = async text => {
    if (text === "") {
      this.validate("invalidZipCode");
    }
    await this.setState({ invalidZipCode: false });
    this.props.zipCodeChanged(text);
    this.props.textChanged();

  };

  onCityChange = async text => {
    if (text === "") {
      this.validate("invalidCity");
    }
    await this.setState({ invalidCity: false });
    this.props.cityChange(text)
    this.props.textChanged();

  };

  onProjectSummaryChange = async text => {
    if (text === "") {
      this.validate("invalidSummary");
    }
    await this.setState({ invalidSummary: false });
    this.props.projectSummaryChanged(text);
    this.props.textChanged();

  };

  onBudgetDetailsChange = async text => {
    if (text === "") {
      this.validate("invalidBudgetDetails");
    }
    await this.setState({ invalidBudgetDetails: false });
    this.props.budgetDetailsChange(text);
    this.props.textChanged();

  };

  onProjectSuppliesNeededChange = async text => {
    if (text === "") {
      this.validate("invalidProjectSuppliesNeeded");
    }
    this.props.projectSuppliesNeededChange(text);
    this.props.textChanged();

  };

  onProjectChallengeChange = async text => {
    if (text === "") {
      this.validate("invalidChallenge");
    }
    await this.setState({ invalidChallenge: false });
    this.props.projectChallengeChanged(text);
    this.props.textChanged();

  };

  onProjectSolutionChange = async text => {
    if (text === "") {
      this.validate("invalidSolution");
    }
    await this.setState({ invalidSolution: false });
    this.props.projectSolutionChanged(text);
    this.props.textChanged();
  };

  onProjectJustificationChange = async text => {
    if (text === "") {
      this.validate("invalidJustification");
    }
    await this.setState({ invalidJustification: false });
    this.props.projectJustificationChange(text);
    this.props.textChanged();

  };

  onCountryChanged = async text => {
    if (text === "") {
      this.validate("invalidCountry");
    }
    await this.setState({ invalidCountry: false });
    store.dispatch(countryChanged(text));
    store.dispatch(textChanged());

  };

  fileSplicer = async (files, key, fileType) => {
    var a = [];
    await Array.from(files).map((value, index) => {
      if (index != key) {
        a.push(value);
      }
    });
    switch (fileType) {
      case 'image': {
        return this.onProjectImagesInputChange(a);
      }
      case 'document': {
        return this.onProjectDocumentsInputChange(a);
      }
      default: {
        return null
      }
    }
  };

  handleImageUploadTriggerClick() {
    this.refs.imageFileInput.click();
  }

  handleDocumentsUploadTriggerClick() {
    this.refs.documentFileInput.click();
  }

  onSubmit() {
    if (!this.props.isLoggedIn) {
      return this.handleClickOpen("noticeModal");
    }
    let form = {
      name: this.props.name,
      description: this.props.description,
      volunteers: this.props.volunteers,
      freelancers: this.props.freelancers,
      zipCode: this.props.zipCode,
      country: this.props.country,
      interests: this.props.interests,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      budget: this.props.budget,
      userId: this.props.userId,
      summary: this.props.summary,
      challenge: this.props.challenge,
      solution: this.props.solution,
      justification: this.props.justification,
      budgetDetails: this.props.budgetDetails,
      city: this.props.city,
      suppliesNeeded: this.props.suppliesNeeded,
      imagesFiles: this.props.imagesFiles,
    }
    startProjectSubmitValidation(form).then(() => {
      this.toggleLoader(true);
      this.props.startProject(
        form,
        projectId => {
          this.props.uploadFiles(
            {
              uploadType: "startProjectFiles",
              attachmentType: "image",
              userInfo: {
                userId: this.props.userId,
                projectId: projectId
              }
            },
            this.props.imagesFiles,
            () => {
              this.setState({
                notificationMessage: 'Uploading...',
                description: <div>
                  <Lottie
                    options={
                      {
                        loop: true,
                        autoplay: true,
                        animationData: animationData,
                        rendererSettings: {
                          preserveAspectRatio: 'xMidYMid slice'
                        }
                      }
                    }
                    height={40}
                    width={40}
                  />
                </div>
              }, () => {
                notification.open({
                  message: this.state.notificationMessage,
                  duration: 5
                });
              })
              this.props.uploadFiles(
                {
                  uploadType: "startProjectFiles",
                  attachmentType: "document",
                  userInfo: {
                    userId: this.props.userId,
                    projectId: projectId
                  }
                },
                this.props.documentsFiles,
                () => {
                  this.props.uploadLinks(
                    [
                      ...this.state.videoLinks,
                      ...this.state.projectLinks
                    ],
                    projectId,
                    () => {
                      this.toggleLoader(false);
                      store.dispatch({
                        type: START_PROJECT_REQUEST_SUCCESS
                      });
                      this.setState({
                        notificationMessage: 'All Files Uploaded'
                      }, () => {
                        notification.open({
                          message: this.state.notificationMessage,
                          duration: 5
                        });
                      })

                      setTimeout(() => {
                        this.props.history.push(
                          `/home/my-projects`
                        );
                      }, 2000);
                    }
                  );
                }
              );
            }
          );
        },
        flag => {
          this.setState({
            notificationMessage: 'Project Created. Uploading Files and Links now.'
          })
          notification.open({
            message: this.state.notificationMessage,
            duration: 5
          });
        }
      );
    }).catch((resp) => {
      const filtered = Object.keys(resp)
        .filter(key => resp[key])
        .reduce((obj, key) => {
          obj[key] = resp[key];
          return obj;
        }, {});
      this.setState(filtered)
      notification.open({
        message: "Please Fill Missing/Invalid Fields",
        duration: 5,
        description: `Please Provide ${
          Object.keys(filtered).map(field => {
            switch (field) {
              case "invalidBudget": {
                return "Budget"
              }
              case "invalidName": {
                return "Name"
              }
              case "invalidZipCode": {
                return "Zip Code"
              }
              case "invalidCity": {
                return "City"
              }
              case "invalidDescription": {
                return "Description"
              }
              case "invalidDropdown": {
                return "Dropdown"
              }
              case "invalidInterests": {
                return "Interests"
              }
              case "invalidCountry": {
                return "Country"
              }
              case "invalidStartDate": {
                return "Start Date"
              }
              case "invalidImageFiles": {
                return "Image Files"
              }
              case "invalidEndDate": {
                return "End Date"
              }
              case "invalidVolunteers": {
                return "Volunteers"
              }
              case "invalidFreelancers": {
                return "Free lancers"
              }
              case "invalidChallenge": {
                return "Challenge Description"
              }
              case "invalidSummary": {
                return "Summary"
              }
              case "invalidSolution": {
                return "Solution"
              }
              case "invalidBudgetDetails": {
                return "Budget Details"
              }
              case "invalidJustification": {
                return "Justification"
              }
            }
          }).join().split(',').join(', ')}`
      })
    })
  }
  render() {

    const { classes } = this.props;
    return (
      <div>
        <div
          style={{
            height: "23em",
            marginRight: "-31px",
            marginLeft: "-31px",
            opacity: 1,
            marginBottom: "50px",
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
            {this.props.isLoggedIn ? null : (
              <h2>
                <font
                  color="white"
                  face="verdana"
                  className={classes.fontClass1}
                >
                  Start A Project
                </font>
              </h2>
            )}
          </div>
        </div>

        <GridContainer
          className={
            this.props.isLoggedIn
              ? classes.justifyContentCenter
              : classes.container
          }
        >

          <Loader loader={this.state.loader} />

          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info" text>
                <CardText color="info">
                  <h4>Start a project to help others OR ask for help</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <Form>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <br />
                      <br />
                      <Label
                        className={classes.label}
                        style={{ marginTop: 0 }}
                        color="orange"
                        ribbon
                      >
                        <div style={{ textAlign: "center" }}>
                          <h4 className={classes.ribbonText}> Basic Details</h4>
                        </div>
                      </Label>
                    </GridItem>
                  </GridContainer>
                  <br />
                  <GridContainer>
                    <div ref={this.myRef} />
                    <GridItem xs={12} sm={12} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Project Name
                      </InputLabel>
                        <Form.Input
                          onBlur={() => {
                            if (this.props.name === "") {
                              this.validate("invalidName");
                            }
                          }}
                          style={{ width: "100%" }}
                          maxLength={140}
                          placeholder="Enter a Project Name"
                          onChange={e => {
                            this.onProjectNameChange(e.target.value);
                          }}
                          error={this.state.invalidName}
                        />
                        {this.state.invalidName ? (
                          <Label basic style={{ color: "red" }} pointing>
                            Please enter a project name
                        </Label>
                        ) : null}
                      </Form.Field>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Project Summary
                      </InputLabel>
                        <Form.TextArea
                          maxLength={1000}
                          style={{ width: "100%" }}
                          placeholder="Give an overview of what the project is about..."
                          onChange={e => {
                            this.onProjectSummaryChange(e.target.value);
                          }}
                          onBlur={() => {
                            if (this.props.summary === "") {
                              this.validate("projectSummary");
                            }
                          }}
                          error={this.state.invalidSummary}
                          autoHeight
                          rows="2"
                        />
                        {this.state.invalidSummary ? (
                          <Label basic style={{ color: "red", marginTop: '0em' }} pointing>
                            Please enter project Summary
                        </Label>
                        ) : null}
                      </Form.Field>

                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Project Challenge
                      </InputLabel>

                        <Form.TextArea
                          maxLength={1000}
                          style={{ width: "100%" }}
                          placeholder="Describe the problem that you ae trying to address..."
                          onChange={e => {
                            this.onProjectChallengeChange(e.target.value);
                          }}
                          autoHeight
                          rows="2"
                          error={this.state.invalidChallenge}
                        />
                        {this.state.invalidChallenge ? (
                          <Label basic style={{ color: "red" }} pointing>
                            Please enter project Challenge
                          </Label>
                        ) : null}

                      </Form.Field>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Project Solution
                      </InputLabel>

                        <Form.TextArea
                          maxLength={1000}
                          style={{ width: "100%" }}
                          placeholder="Describe your proposed solution to the above challenge..."
                          onChange={e => {
                            this.onProjectSolutionChange(e.target.value);
                          }}
                          error={this.state.invalidSolution}
                          autoHeight
                          rows="2"
                        />
                        {this.state.invalidSolution ? (
                          <Label basic style={{ color: "red" }} pointing>
                            Please enter project Solution
                          </Label>
                        ) : null}

                      </Form.Field>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Project Justification / Impact
                      </InputLabel>

                        <Form.TextArea
                          maxLength={1000}
                          style={{ width: "100%" }}
                          placeholder="Describe why the project is justified, who will benefit from it and what benefits they will receive..."
                          onChange={e => {
                            this.onProjectJustificationChange(e.target.value);
                          }}
                          error={this.state.invalidJustification}
                          autoHeight
                          rows="2"
                        />
                        {this.state.invalidJustification ? (
                          <Label basic style={{ color: "red" }} pointing>
                            Please enter project Justification
                          </Label>
                        ) : null}

                      </Form.Field>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={4} md={4} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Country
                      </InputLabel>
                        <CountryDropdown
                          onCountryChanged={this.onCountryChanged}
                          defaultValue={this.props.country}
                          action={this.state.invalidCountry}
                        />
                      </Form.Field>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Project Zip Code
                      </InputLabel>
                        <Form.Input
                          style={{ width: "100%" }}
                          placeholder="Enter zip code of location where project is taking place"
                          onChange={e => {
                            this.onZipCodeChange(e.target.value);
                          }}
                          error={this.state.invalidZipCode}
                        />
                        {this.state.invalidZipCode ? (
                          <Label basic style={{ color: "red" }} pointing>
                            Please enter the zip code
                        </Label>
                        ) : null}
                      </Form.Field>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Project City
                      </InputLabel>
                        <Form.Input
                          style={{ width: "100%" }}
                          placeholder="Enter the project city"
                          onChange={e => {
                            this.onCityChange(e.target.value);
                          }}
                          error={this.state.invalidCity}
                        />
                        {this.state.invalidCity ? (
                          <Label basic style={{ color: "red" }} pointing>
                            Please enter the city
                        </Label>
                        ) : null}
                      </Form.Field>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Impact Category
                      </InputLabel>
                        <InterestsDropdown
                          onInterestsChange={async (e, { value }) => {
                            await this.setState({ value: value });
                            if (this.state.value === []) {
                              await this.setState({
                                invalidInterests: true
                              });
                              store.dispatch(interestschanged(value));
                            } else {
                              await this.setState({ invalidInterests: false });
                              store.dispatch(interestschanged(value));
                              store.dispatch(textChanged());
                            }
                          }}
                          interestOptions={this.props.interestOptions}
                          action={this.state.invalidInterests}
                          defaultValue={
                            this.props.interests ? this.props.interests : null
                          }
                        />
                      </Form.Field>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6} >

                      <br />
                      <br />
                      <Label
                        className={classes.label}
                        style={{ marginTop: 0 }}
                        color="violet"
                        ribbon
                      >
                        <div style={{ textAlign: "center" }}>
                          <h4 className={classes.ribbonText}> Budget Details</h4>
                        </div>
                      </Label>
                    </GridItem>
                  </GridContainer>
                  <br />
                  <GridContainer>
                    <GridItem
                      xs={12}
                      sm={4}
                      md={3}
                      lg={2}
                      className={classes.paddingTopGridItem}

                    >
                      <Form.Field required>
                        <InputLabel
                          className={classes.label}
                          style={{ marginBottom: 2, color: "black" }}
                        >
                          Budget
                      </InputLabel>
                        <Form.Input
                          labelPosition="left"
                          type="number"
                          placeholder="Amount"
                          onChange={e => {
                            this.onBudgetChange(e.target.value);
                          }}
                          error={this.state.invalidBudget}
                        >
                          <Label>$</Label>
                          <input />
                        </Form.Input>
                      </Form.Field>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.paddingTopGridItem}
                      style={{ width: "100%" }}
                    >
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Budget details
                      </InputLabel>

                        <Form.TextArea
                          maxLength={1000}
                          style={{ width: "100%" }}
                          placeholder="You can give a breakdown of how the money will be spent"
                          onChange={e => {
                            this.onBudgetDetailsChange(e.target.value);
                          }}
                          error={this.state.invalidBudgetDetails}
                          autoHeight
                          rows="2"
                        />
                        {this.state.invalidBudgetDetails ? (
                          <Label basic style={{ color: "red" }} pointing>
                            Please enter the budgetDetails
                          </Label>
                        ) : null}
                      </Form.Field>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={6} >
                      <br />
                      <br />
                      <Label
                        className={classes.label}
                        style={{ marginTop: 0 }}
                        color="red"
                        ribbon
                      >
                        {/* <img src={resource} height='30px' /> */}
                        <div style={{ textAlign: "center" }}>
                          <h4 className={classes.ribbonText}> Resources Needed</h4>
                        </div>
                      </Label>
                    </GridItem>
                  </GridContainer>
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6} className={classes.paddingTopGridItem} >
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Volunteers (Unpaid)
                      </InputLabel>

                        <Form.Input
                          style={{ width: "100%" }}
                          placeholder="Enter Number of Volunteers"
                          defaultValue={this.props.volunteers}
                          onChange={e => {
                            this.onVolunteersChange(e.target.value);
                          }}
                        />
                      </Form.Field>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Freelancers (Paid)
                      </InputLabel>

                        <Form.Input
                          style={{ width: "100%" }}
                          placeholder="Enter Number of Freelancers"
                          defaultValue={this.props.freelancers}
                          onChange={e => {
                            this.onFreeLancersChange(e.target.value);
                          }}
                        />
                        {this.state.invalidResource ? (
                          <Label basic style={{ color: "red" }} pointing="left">
                            Please Enter Some resources
                          </Label>
                        ) : null}
                      </Form.Field>
                    </GridItem>
                  </GridContainer>

                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={12} className={classes.paddingTopGridItem}>
                      <Form.Field required>
                        <InputLabel
                          className={
                            classes.label + " " + classes.inputLabelStart
                          }
                        >
                          Project Supplies Needed
                      </InputLabel>
                        <Form.TextArea
                          maxLength={1000}
                          style={{ width: "100%" }}
                          placeholder="Please enter supplies needed..."
                          onChange={e => {
                            this.onProjectSuppliesNeededChange(e.target.value);
                          }}
                          autoHeight
                          rows="2"
                        />
                      </Form.Field>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem
                      xs={12}
                      sm={4}
                      md={4}
                      style={{ marginTop: "30px" }}
                    >
                      {/* <Card>
                        <CardBody> */}
                      {this.state.invalidStartDate ? (
                        <InputLabel className={classes.label}>
                          <span style={{ color: "red" }}>
                            Project Start Date
                          </span>
                        </InputLabel>
                      ) : (
                          <InputLabel className={classes.label}>
                            <span style={{ color: "black" }}>
                              Project Start Date
                          </span>
                          </InputLabel>
                        )}
                      <br />
                      <FormControl fullWidth>
                        <GridContainer>
                          <GridItem xs={9}>
                            <Datetime
                              timeFormat={false}
                              onChange={date => this.onStartDateChange(date._d)}
                              isValidDate={function (current) {
                                return current.isAfter(
                                  Datetime.moment().subtract(1, "day")
                                );
                              }}
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <Icon
                              bordered
                              inverted
                              color="teal"
                              name="calendar alternate outline"
                            />
                          </GridItem>
                        </GridContainer>
                      </FormControl>
                      {/* </CardBody>
                      </Card> */}
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={4}
                      md={4}
                      style={{ marginTop: "30px" }}
                    >
                      {/* <Card>
                        <CardHeader color="info" icon>
                        </CardHeader>
                        <CardBody> */}
                      {this.state.invalidEndDate ? (
                        <InputLabel className={classes.label}>
                          <span style={{ color: "red" }}>
                            Project End Date (Estimated)
                          </span>
                        </InputLabel>
                      ) : (
                          <InputLabel className={classes.label}>
                            <span style={{ color: "black" }}>
                              Project End Date (Estimated)
                          </span>
                          </InputLabel>
                        )}
                      <br />
                      <FormControl fullWidth>
                        <GridContainer>
                          <GridItem xs={9}>
                            <Datetime
                              style={{ "z-index": "999 !important" }}
                              timeFormat={false}
                              onChange={date => this.onEndDateChange(date._d)}
                              isValidDate={current => {
                                return current.isAfter(
                                  Datetime.moment(
                                    this.props.startDate
                                      ? this.props.startDate
                                      : null
                                  ).subtract(1, "day")
                                );
                              }}
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <Icon
                              bordered
                              inverted
                              color="teal"
                              name="calendar alternate outline"
                            />
                          </GridItem>
                        </GridContainer>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <br />
                      <br />
                      <Label
                        className={classes.label}
                        style={{ marginTop: 0 }}
                        color="blue"
                        ribbon
                      >
                        {/* <img src={resource} height='30px' /> */}
                        <div style={{ textAlign: "center" }}>
                          <h4 className={classes.ribbonText}>Media</h4>
                        </div>
                      </Label>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6} lg={6}>
                      <Card style={{ height: '500px', overflowY: 'scroll' }}>
                        <h4 className={classes.cardTitle} style={{ paddingTop: '20px' }}>
                          Upload Project Images
                        </h4>
                        <img
                          className={classes.cardImgTop}
                          alt="100%x180"
                          style={{
                            width: "100%",
                            display: "block",
                            objectFit: "contain",
                            maxHeight: '250px'
                          }}
                          src={imageIcon}
                          data-holder-rendered="true"
                        />
                        <CardBody className={classes.justifyContentCenter} style={{ textAlign: 'center', }}>

                          <label as="label" basic htmlFor={uid}>
                            <input
                              type="file"
                              id={uid}
                              accept={mimetypes.image}
                              ref="imageFileInput"
                              multiple
                              style={{ display: "none" }}
                              name="files"
                              onChange={e =>
                                this.onProjectImagesInputChange(e.target.files)
                              }
                            />
                            {
                              this.state.invalidImageFiles ? this.state.invalidImageFilesMessage ? this.state.invalidImageFilesMessage : <label style={{ color: "red", textAlign: 'center' }}>Please Upload atleast one image</label> : null
                            }
                          </label>
                          <GridContainer>
                            <GridItem
                              xs={12}
                              sm={12}
                              className={classes.justifyContentCenter}
                            >
                              <GridContainer
                                className={classes.justifyContentCenter}
                              >
                                <GridItem
                                  className={classes.justifyContentCenter}
                                >
                                  <div
                                    style={{
                                      width: "100%",
                                      textAlign: "center"
                                    }}
                                  >
                                    <Button
                                      round
                                      color="info"
                                      onClick={() =>
                                        this.handleImageUploadTriggerClick()
                                      }
                                    >
                                      Select Files{"\t\t\t"}
                                    </Button>
                                  </div>
                                </GridItem>
                                <GridItem xs={12}>
                                  {this.props.imagesFiles.length != 0 ? (
                                    <Card>
                                      <CardBody>
                                        <Table
                                          tableHead={[
                                            <strong>Name</strong>,
                                            ""
                                          ]}
                                          fixedHeader={true}
                                          tableHeaderStyle={{
                                            borderRight:
                                              "40px solid transparent"
                                          }}
                                          tableData={this.state.imagesFiles}
                                          customHeadCellClasses={[
                                            classes.description,
                                            classes.description,
                                            classes.description,
                                            classes.left,
                                            classes.left,
                                            classes.left
                                          ]}
                                          customHeadClassesForCells={[
                                            0,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6
                                          ]}
                                          customCellClasses={[
                                            classes.customFont,
                                            classes.customFont,
                                            classes.customFont,
                                            classes.tdNumber,
                                            classes.tdNumber +
                                            " " +
                                            classes.tdNumberAndButtonGroup,
                                            classes.tdNumber
                                          ]}
                                          customClassesForCells={[
                                            1,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6
                                          ]}
                                        />
                                      </CardBody>
                                    </Card>
                                  ) : null}
                                </GridItem>
                                <GridItem />
                              </GridContainer>
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                        <CardFooter chart>
                          <div style={{ width: '100%', textAlign: "center" }}>
                            <label basic> Allowed File Types: JPG, JPEG, or PNG / Max file
                            size 16MB</label>
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} lg={6}>
                      <Card style={{ height: '500px', overflowY: 'scroll' }}>
                        <h4 className={classes.cardTitle} style={{ paddingTop: '20px' }}>
                          Upload Project Documents
                          </h4>
                        <img
                          className={classes.cardImgTop}
                          alt="100%x180"
                          style={{
                            width: "100%",
                            display: "block",
                            objectFit: "contain",
                            maxHeight: '250px'
                          }}
                          src={imageIcon}
                          data-holder-rendered="true"
                        />
                        <CardBody className={classes.justifyContentCenter} >
                          <label as="label" basic htmlFor={uid}>
                            <input
                              type="file"
                              id={uid}
                              ref="documentFileInput"
                              multiple
                              accept={mimetypes.document}
                              style={{ display: "none" }}
                              name="files"
                              onChange={e =>
                                this.onProjectDocumentsInputChange(
                                  e.target.files
                                )
                              }
                            />
                          </label>
                          <GridContainer>
                            <GridItem
                              xs={12}
                              sm={12}
                              className={classes.justifyContentCenter}
                            >
                              <GridContainer
                                className={classes.justifyContentCenter}
                              >
                                <GridItem
                                  className={classes.justifyContentCenter}
                                >
                                  <div
                                    style={{
                                      width: "100%",
                                      textAlign: "center"
                                    }}
                                  >
                                    <Button
                                      round
                                      color="info"
                                      onClick={() =>
                                        this.handleDocumentsUploadTriggerClick()
                                      }
                                    >
                                      Select Files{"\t\t\t"}
                                    </Button>
                                  </div>
                                </GridItem>
                                <GridItem xs={12}>
                                  {this.props.documentsFiles.length != 0 ? (
                                    <Card>
                                      <CardBody>
                                        <Table
                                          tableHead={[
                                            <strong>Name</strong>,
                                            ""
                                          ]}
                                          fixedHeader={true}
                                          tableHeaderStyle={{
                                            borderRight:
                                              "40px solid transparent"
                                          }}
                                          tableData={this.state.documentsFiles}
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
                                            classes.tdNumber +
                                            " " +
                                            classes.tdNumberAndButtonGroup,
                                            classes.tdNumber
                                          ]}
                                          customClassesForCells={[1, 2, 3, 4, 5, 6]}
                                        />
                                      </CardBody>
                                    </Card>
                                  ) : null}
                                </GridItem>
                                <GridItem />
                              </GridContainer>
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                        <CardFooter chart>
                          <div style={{ width: '100%', textAlign: "center" }}>
                            <label basic>Allowed File Types: PDF, DOC, etc / Max file size
                            16MB</label>
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} lg={6}>
                      <Card style={{ height: '500px', overflowY: 'scroll' }}>
                        <h4 className={classes.cardTitle} style={{ paddingTop: '20px' }}>
                          Add Project Video Link
                          </h4>
                        <img
                          className={classes.cardImgTop}
                          alt="100%x180"
                          style={{
                            width: "100%",
                            display: "block",
                            objectFit: "contain",
                            maxHeight: '250px'
                          }}
                          src={imageIcon}
                          data-holder-rendered="true"
                        />
                        <CardBody className={classes.justifyContentCenter} >

                          <div style={{ padding: "19px 0" }}>
                            <GridContainer direction="column">
                              <GridItem xs={12} sm={12} md={12} lg={12}>
                                <GridContainer direction="row">
                                  <GridItem xs={12} sm={12} md={12} lg={12}>
                                    <Input
                                      style={{ width: "100%" }}
                                      placeholder="Enter video link"
                                      onBlur={e => {
                                        try {
                                          if (
                                            (new URL(this.state.videoLinks[0].link).hostname == "www.youtube.com" || new URL(this.state.videoLinks[0].link).hostname == "youtube.com") ||
                                            (new URL(this.state.videoLinks[0].link).hostname == "www.vimeo.com" || new URL(this.state.videoLinks[0].link).hostname == "youtube.com")
                                          ) {
                                            console.log('ok');
                                          }
                                          else {
                                            return this.setState({
                                              invalidVideoLink: true,
                                              videoLinks: [
                                                {
                                                  userId: this.props.userId,
                                                  link: "",
                                                  attachmentType: "videoLink",
                                                  attachmentDetails: ""
                                                }
                                              ],
                                            })
                                          }
                                        } catch (error) {
                                          return this.setState({
                                            invalidVideoLink: true,
                                            videoLinks: [
                                              {
                                                userId: this.props.userId,
                                                link: "",
                                                attachmentType: "videoLink",
                                                attachmentDetails: ""
                                              }
                                            ],
                                          })
                                        }
                                      }
                                      }
                                      onChange={e => {
                                        let temp = e.target.value;
                                        this.setState(ps => {
                                          return {
                                            videoLinks: [
                                              {
                                                ...ps.videoLinks[0],
                                                link: temp
                                              }
                                            ]
                                          };
                                        });
                                      }}
                                    />
                                  </GridItem>
                                </GridContainer>
                              </GridItem>
                            </GridContainer>
                          </div>
                        </CardBody>
                        <CardFooter chart>
                          <div style={{ width: '100%', textAlign: "center" }}>
                            <label basic>  Add a video from Vimeo or YouTube</label>
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} lg={6}>
                      <Card style={{ height: '500px', overflowY: 'scroll' }}>
                        <h4 className={classes.cardTitle} style={{ paddingTop: '20px' }}>
                          Add External Links
                          </h4>
                        <img
                          className={classes.cardImgTop}
                          alt="100%x180"
                          style={{
                            width: "100%",
                            display: "block",
                            objectFit: "contain",
                            maxHeight: '250px'
                          }}
                          src={imageIcon}
                          data-holder-rendered="true"
                        />
                        <CardHeader>

                        </CardHeader>
                        <CardBody className={classes.justifyContentCenter} >

                          <div style={{ padding: "19px 0" }}>
                            <GridContainer direction="column">
                              <Button disabled={this.state.projectLinks.length == 3} onClick={() => {
                                this.setState((ps) => {
                                  return {
                                    projectLinks: [...ps.projectLinks, {
                                      userId: this.props.userId,
                                      link: "",
                                      attachmentType: "projectLink",
                                      attachmentDetails: ""
                                    }]
                                  }
                                })
                              }} justIcon round>+</Button>
                              {this.state.projectLinks.map((obj, index) => {
                                return (
                                  <GridItem xs={12} sm={12} md={12} lg={12}>
                                    <GridContainer direction="row">
                                      <GridItem xs={10} sm={10} md={10} lg={10}>
                                        <Input
                                          value={this.state.projectLinks[index].link}
                                          style={{ width: "100%" }}
                                          placeholder={
                                            "Enter Project link " + (index + 1)
                                          }
                                          onChange={e => {
                                            let temp = e.target.value;
                                            this.setState(ps => {
                                              return {
                                                projectLinks: [
                                                  ...ps.projectLinks.slice(
                                                    0,
                                                    index
                                                  ),
                                                  {
                                                    ...ps.projectLinks[index],
                                                    link: temp
                                                  },
                                                  ...ps.projectLinks.slice(
                                                    index + 1
                                                  )
                                                ]
                                              };
                                            });
                                          }}
                                        />
                                      </GridItem>
                                      <GridItem xs={1} sm={1} md={1} lg={1}>
                                        <Button justIcon onClick={() => {
                                          this.setState(ps => {
                                            return {
                                              projectLinks: [
                                                ...ps.projectLinks.slice(
                                                  0,
                                                  index
                                                ),
                                                ...ps.projectLinks.slice(
                                                  index + 1
                                                )
                                              ]
                                            };
                                          });
                                        }}>X</Button>
                                      </GridItem>
                                      <br />
                                    </GridContainer>
                                  </GridItem>
                                );
                              })}
                            </GridContainer>
                          </div>
                        </CardBody>
                        <CardFooter chart>
                          <div style={{ width: '100%', textAlign: "center" }}>
                            <label basic> Add external links to project resources</label>
                          </div>
                        </CardFooter>
                      </Card>
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
                          style={{ height: "60px" }}
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
                            <b>Please Login to Start a Project</b>
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
                            onClick={() => this.props.history.push("/login")}
                            color="info"
                            round
                            className={classes.center}
                          >
                            Go to Login
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Button
                        id="Sayve"
                        onClick={() => this.onSubmit()}
                        color="info"
                      >
                        {this.props.text}
                      </Button>
                    </GridItem>
                  </GridContainer>
                </Form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.start.name,
    description: state.start.description,
    zipCode: state.start.zipCode,
    city: state.start.city,
    budgetDetails: state.start.budgetDetails,
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
    documentsFiles: state.start.documentsFiles,
    imagesFiles: state.start.imagesFiles,
    uploadStatus: state.start.uploadStatus,
    country: state.start.country,
    isLoggedIn: state.auth.isLoggedIn,
    summary: state.start.summary,
    challenge: state.start.challenge,
    solution: state.start.solution,
    justification: state.start.justification,
    suppliesNeeded: state.start.suppliesNeeded
  };
};

StartProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {
    textChanged,
    budgetChanged,
    descriptionChanged,
    endDateChanged,
    freelancersChanged,
    projectNameChanged,
    startDateChanged,
    volunteersChanged,
    cityChange,
    zipCodeChanged,
    startProject,
    getCommonInfo,
    startProjectUnmount,
    uploadFiles,
    uploadLinks,
    projectSummaryChanged,
    projectChallengeChanged,
    projectSolutionChanged,
    projectJustificationChange,
    documentsFilesChanged,
    imagesFilesChanged,
    budgetDetailsChange,
    projectSuppliesNeededChange
  }
)(withStyles(styles)(StartProject));
