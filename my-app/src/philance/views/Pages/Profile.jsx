import React from "react";
import PropTypes from "prop-types";

import {connect} from 'react-redux'
// @material-ui/core components

import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";

import {CountryDropdown, InterestsDropdown} from '../../components/DoubleDropdown'
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

import { Label } from 'semantic-ui-react';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "philance/components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";

import userProfileStyles from "philance/views/PageStyles/UserProfileStyles.jsx";

import avatar from "assets/img/faces/UpdateProfileAvatarIcon.png";

import {
  getUserById
} from '../../actions/userProfile'

class Profile extends React.Component {

  componentWillUnmount() {
  }
  componentDidMount(){
    this.props.getUserById(this.props.match.params.id,this.props.authToken)
  }


  render() {
    const { classes } = this.props;
    return (
        <GridContainer justify="center">
       <br/>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  View profile - <small></small>
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  {<CustomInput                
                      labelText="Email address"
                      id="email-address"
                      inputProps={{
                        value: this.props.email
                      }}
                    />
                    }
                  </GridItem>
                </GridContainer>
                <br/>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                      <FormLabel className={classes.labelHorizontal} style={{color:"#777777",marginBottom:'2vh'}}>
                        Country
                      </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CountryDropdown disabled={true} onCountryChange={null} defaultValue={this.props.country}/>
                    <br/>
                  </GridItem>
                  <GridItem xs={12} sm={6}>
                      <FormLabel className={classes.labelHorizontal} style={{color:"#777777",marginBottom:'2vh'}}>
                        Impact Category Interests
                      </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                  
                    <InterestsDropdown disabled={true} interestOptions={this.props.interestOptions} defaultValue={this.props.interests?this.props.interests.split(','):null}
                  />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Your Zip Code"
                      id="postal-code"
                      inputProps={{
                        disabled:true,
                        value: this.props.postalCode
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Phone"
                      id="contact"
                      inputProps={{
                        disabled:true,
                        value: this.props.contact
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>

                </GridItem>
                </GridContainer>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <Label
                as="label"
                basic
                style={{cursor:'pointer'}}
                >
              <CardAvatar profile>
                  <img src={this.props.userImageUrl?this.props.userImageUrl:avatar} alt="Profile Pic"/>
              </CardAvatar>
                
              </Label>
              
              <CardBody profile>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      inputProps={{
                        disabled:true,
                        value: this.props.name
                      }}
                      formControlProps={{
                        fullWidth: true,
                        
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Title"
                      id="title"
                      inputProps={{
                        disabled:true,
                        defaultValue: this.props.title
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>


                    <CustomInput
                      labelText="Organization"
                      id="organization"
                      inputProps={{
                        disabled:true,
                        value: this.props.organization
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                        labelText="Description about me"
                        id="about-me"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                        disabled:true,
                        multiline: true,
                          rows: 5,
                        value: this.props.description
                        }
                      }
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    contact: state.publicUserPage.contact,
    email: state.publicUserPage.email,
    country: state.publicUserPage.country,
    postalCode: state.publicUserPage.postalCode,
    description: state.publicUserPage.description,
    name: state.publicUserPage.name,
    title: state.publicUserPage.title,
    organization: state.publicUserPage.organization,
    interests: state.publicUserPage.interests,
    interestOptions: state.common.interestOptions,
    userImageUrl: state.publicUserPage.userImageUrl,
    authToken: state.auth.authToken,
  }
}

export default connect(mapStateToProps, {
getUserById
})(withStyles(userProfileStyles)(Profile));
