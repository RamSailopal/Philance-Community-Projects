import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";

import {
  CountryDropdown,
  InterestsDropdown
} from "../../components/DoubleDropdown";
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

import { Label } from "semantic-ui-react";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "philance/components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import store from "../../store/store";

import userProfileStyles from "philance/views/PageStyles/UserProfileStyles.jsx";

import avatar from "assets/img/faces/UpdateProfileAvatarIcon.png";
import { notification } from 'antd'
import { registerToast } from "../../actions/register";

import {
  textChanged,
  updateProfile,
  contactChanged,
  emailChanged,
  postalCodeChanged,
  descriptionChanged,
  oraganizationChanged,
  titleChanged,
  nameChanged,
  passwordChanged,
  updateUnmount,
  getUserInfo,
  profileImageChange,
  getUserProfileImage,
  uploadFiles,
  countryChanged,
  interestschanged
} from "../../actions/userProfile";

import Toaster from "../../components/Toaster/Toaster";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messag: "",
      emailval: false
    };
  }

  onCountryChanged(text) {
    store.dispatch(countryChanged(text));
    store.dispatch(textChanged());
  }

  componentWillUnmount() {
    this.props.registerToast();
    this.props.updateUnmount();
    this.props.getUserInfo(this.props.currentEmail);
  }
  componentDidMount() {
    if (this.props.imageRefresh) {
      this.props.getUserProfileImage(this.props.userId);
    }
  }
  onEmailChange(text) {
    this.props.emailChanged(text);
    this.props.textChanged();
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
    this.props.textChanged();
  }

  onOrganizationChange(text) {
    this.props.oraganizationChanged(text);
    this.props.textChanged();
  }

  onNameChange(text) {
    this.props.nameChanged(text);
    this.props.textChanged();
  }

  onTitleChange(text) {
    this.props.titleChanged(text);
    this.props.textChanged();
  }

  onContactChange(text) {
    this.props.contactChanged(text);
    this.props.textChanged();
  }

  onFirstNameChange(text) {
    this.props.firstNameChanged(text);
    this.props.textChanged();
  }

  onLastNameChange(text) {
    this.props.lastNameChanged(text);
    this.props.textChanged();
  }

  onPostalCodeChange(text) {
    this.props.postalCodeChanged(text);
    this.props.textChanged();
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text);
    this.props.textChanged();
  }
  onProfileImageChange(e) {
    this.props.profileImageChange(e.target.files[0]);
  }
  onButtonPress() {
    var {
      contact,
      email,
      postalCode,
      country,
      password,
      description,
      name,
      organization,
      title,
      interests,
      currentEmail,
      userId
    } = this.props;

    var validator = require("email-validator");
    if (!validator.validate(this.props.email)) {
      this.setState({
        messag: "The email format is incorrect",
        emailval: true
      });
    } else {
      this.setState({ messag: "", emailval: false });
    }
    if (!this.props.contact.match("[0-9]+")) {
      this.setState({
        messag: "Phone numbers should contain numbers only",
        emailval: true
      });
    }
    this.props.updateProfile({
      name,
      email,
      password,
      contact,
      country,
      postalCode,
      description,
      organization,
      title,
      interests,
      currentEmail,
      userId
    }, (flag) => {
      notification.success({
        message: 'Profile Update',
        description:
          'Your profile is updated successfully',

      });
    });
    this.props.registerToast();

  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        {this.props.update ? (
          <Toaster
            display={this.props.update}
            message={"Your Changes have been Saved Successfully"}
          />
        ) : null}
        <br />
        {this.state.emailval ? (
          <Toaster display={this.state.emailval} message={this.state.messag} />
        ) : null}
        <br />
        <h4 className={classes.welcomeHeading}>
          <Toaster
            display={this.props.showToast}
            header={
              "Welcome to Philance! Please take a few moments to complete your User Profile and you can then post a project or join an existing project."
            }
          />
          <br />
        </h4>

        <br />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Edit Profile - <small>Complete your profile</small>
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {this.props.currentEmail ? (
                      <CustomInput
                        labelText="Email address"
                        id="email-address"
                        inputProps={{
                          value: this.props.currentEmail
                        }}
                        formControlProps={{
                          fullWidth: true,
                          onChange: e => {
                            this.onEmailChange(e.target.value);
                          }
                        }}
                      />
                    ) : (
                        <CustomInput
                          labelText="Email address"
                          id="email-address"
                          formControlProps={{
                            fullWidth: true,
                            onChange: e => {
                              this.onEmailChange(e.target.value);
                            }
                          }}
                        />
                      )}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onPasswordChange(e.target.value);
                        }
                      }}
                      inputProps={{
                        type: "password"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                    <FormLabel
                      className={classes.labelHorizontal}
                      style={{ color: "#777777", marginBottom: "2vh" }}
                    >
                      Country
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CountryDropdown
                      onCountryChanged={this.onCountryChanged}
                      defaultValue={this.props.country}
                    />
                    <br />
                  </GridItem>
                  <GridItem xs={12} sm={6}>
                    <FormLabel
                      className={classes.labelHorizontal}
                      style={{ color: "#777777", marginBottom: "2vh" }}
                    >
                      Impact Category Interests
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <InterestsDropdown
                      onInterestsChange={async (e, { value }) => {
                        await this.setState({ value: value });
                        if (this.state.value === "") {
                          await this.setState({
                            valid: true
                          });
                          this.props.interestschanged(value);
                        } else {
                          await this.setState({ valid: false });
                          this.props.interestschanged(value);
                          store.dispatch(textChanged());
                        }
                      }}
                      interestOptions={this.props.interestOptions}
                      defaultValue={
                        this.props.interests ? this.props.interests : null
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Your Zip Code/City"
                      id="postal-code"
                      inputProps={{
                        value: this.props.postalCode
                      }}
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onPostalCodeChange(e.target.value);
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Phone"
                      id="contact"
                      inputProps={{
                        value: this.props.contact
                      }}
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onContactChange(e.target.value);
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Button
                      color="info"
                      onClick={() => {
                        this.onButtonPress();
                      }}
                    >
                      {this.props.text}
                    </Button>
                  </GridItem>
                </GridContainer>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <Label as="label" basic style={{ cursor: "pointer" }}>
                <CardAvatar profile>
                  {this.props.displayImage ? (
                    <img
                      src={
                        this.props.userImageUrl
                          ? this.props.userImageUrl
                          : avatar
                      }
                      alt="Profile Pic"
                    />
                  ) : (
                      <img src={avatar} alt="Profile Pic" />
                    )}
                </CardAvatar>
                <input
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  name="files"
                  onChange={e => this.onProfileImageChange(e)}
                />
              </Label>
              {this.props.filesSelected ? (
                <Button
                  onClick={() => {
                    this.props.uploadFiles(
                      {
                        uploadType: "userProfileImage",
                        userInfo: {
                          userId: this.props.userId
                        }
                      },
                      this.props.userImageFile
                    );
                  }}
                  color="info"
                >
                  Press to Apply Profile Image
                </Button>
              ) : null}
              <CardBody profile>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      inputProps={{
                        value: !this.props.name
                          ? this.props.defaultName
                          : this.props.name
                      }}
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onNameChange(e.target.value);
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    {this.props.title ? (
                      <CustomInput
                        labelText="Title"
                        id="title"
                        inputProps={{
                          value: this.props.title
                        }}
                        formControlProps={{
                          fullWidth: true,
                          onChange: e => {
                            this.onTitleChange(e.target.value);
                          }
                        }}
                      />
                    ) : (
                        <CustomInput
                          labelText="Title"
                          id="title"
                          formControlProps={{
                            fullWidth: true,
                            onChange: e => {
                              this.onTitleChange(e.target.value);
                            }
                          }}
                        />
                      )}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    {this.props.organization ? (
                      <CustomInput
                        labelText="Organization"
                        id="organization"
                        inputProps={{
                          value: this.props.organization
                        }}
                        formControlProps={{
                          fullWidth: true,
                          onChange: e => {
                            this.onOrganizationChange(e.target.value);
                          }
                        }}
                      />
                    ) : (
                        <CustomInput
                          labelText="Organization"
                          id="organization"
                          formControlProps={{
                            fullWidth: true,
                            onChange: e => {
                              this.onOrganizationChange(e.target.value);
                            }
                          }}
                        />
                      )}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    {this.props.description ? (
                      <CustomInput
                        labelText="Description about me"
                        id="about-me"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          onChange: e => {
                            this.onDescriptionChange(e.target.value);
                          },
                          value: this.props.description
                        }}
                      />
                    ) : (
                        <CustomInput
                          labelText="Description about me"
                          id="about-me"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            multiline: true,
                            rows: 5,
                            onChange: e => {
                              this.onDescriptionChange(e.target.value);
                            }
                          }}
                        />
                      )}
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

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    contact: state.user.contact === null ? "" : state.user.contact,
    email: state.user.email,
    currentEmail: state.auth.email === "" ? state.reg.email : state.auth.email,
    country: state.user.country,
    postalCode: state.user.postalCode === null ? "" : state.user.postalCode,
    description: state.user.description,
    text: state.user.text,
    showToast: state.reg.showToast,
    password: state.user.password,
    name: state.user.name,
    title: state.user.title,
    organization: state.user.organization,
    defaultName: state.reg.firstName + " " + state.reg.lastName,
    update: state.user.update,
    interests: state.user.interests,
    interestOptions: state.common.interestOptions,
    userId: state.user.userId,
    userImageURL: state.user.userImageURL,
    userImageUrl: state.user.userImageUrl,
    filesSelected: state.common.filesSelected,
    userImageFile: state.user.userImageFile,
    displayImage: state.user.displayImage,
    imageRefresh: state.user.imageRefresh
  };
};

export default connect(
  mapStateToProps,
  {
    textChanged,
    updateProfile,
    contactChanged,
    emailChanged,
    postalCodeChanged,
    descriptionChanged,
    registerToast,
    oraganizationChanged,
    titleChanged,
    nameChanged,
    passwordChanged,
    updateUnmount,
    getUserInfo,
    profileImageChange,
    uploadFiles,
    getUserProfileImage,
    interestschanged
  }
)(withStyles(userProfileStyles)(UserProfile));
