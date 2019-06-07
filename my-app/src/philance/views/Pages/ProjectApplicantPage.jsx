import React from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Toaster from "../../components/Toaster/Toaster";
import Loader from "../../components/Loader/Loader"
import CardText from "components/Card/CardText.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Badge from "components/Badge/Badge.jsx";
import userProfileStyles from "philance/views/PageStyles/UserProfileStyles.jsx";

import {
  getUserById
} from '../../actions/userProfile'
import { getApplicantForProject } from "../../actions/projectDetails";

class ProjectApplicant extends React.Component {
  state = {
    value: '',
    loader: false
  }
  toggleLoader = (flag) => {
    this.setState({
      loader: flag
    });
  }
  componentWillUnmount() {
  }
  componentDidMount() {

    this.props.getApplicantForProject({
      projectId: this.props.match.params.projectId,
      userId: this.props.match.params.userId
    },
      () => {
        //callback
      })
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={classes.justifyContentCenter}>
        <Loader loader={this.state.loader} />
        <Toaster display={this.props.toast} message={this.props.text} />
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info" text>
              <CardText color="info">
                <h3>Application to work on project</h3>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer align="right" direction="column">
                  <GridItem style={{ marginRight: 5 }}>
                    <Button color="info" round className={classes.marginRight} onClick={() => {
                      // this.props.history.push('..')
                      this.props.history.goBack()
                    }}>
                      <i class="fa fa-angle-left"></i> Back to Review Candidates
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                  <GridItem xs={5} sm={6} md={9}>
                    {/* <FormLabel component="legend" style={{ fontSize: 20, fontWeight: '500', color: '#777' }}> */}
                    <h1 align="center" style={{ padding: '0.25em 0', color: '#3e4b59', fontSize: '2.5em' }}>
                      <strong>
                        {this.props.projectName}
                        <Badge color="success">Active</Badge>
                      </strong>{" "}
                    </h1>
                    {/* {this.props.projectName} */}
                    {/* </FormLabel> */}
                  </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={6}>
                    <FormLabel component="legend" style={{ fontSize: 15, fontWeight: '500', color: '#777', marginTop: -15 }}>
                      <font size="8">   {this.props.projectDesc}</font>
                    </FormLabel>
                  </GridItem>
                </GridContainer>
                <br /><br />
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6} align="left">
                    <FormLabel component="legend" style={{ fontSize: 15, fontWeight: '400', color: '#777', marginTop: -15 }}>
                      <h4><strong>Applicant Message</strong></h4>
                    </FormLabel>
                    <FormLabel component="legend" style={{ fontSize: 15, fontWeight: '400', color: '#777', marginTop: -15 }}>
                      {this.props.message}
                    </FormLabel>
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6} align="left">
                    <FormLabel component="legend" style={{ fontSize: 15, fontWeight: '400', color: '#777', marginTop: -15 }}>
                      <h4><strong>Role: {this.props.applicantRole}</strong></h4>
                    </FormLabel>
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

ProjectApplicant.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    projectName: state.viewProjectApplication.projectName,
    projectDesc: state.viewProjectApplication.projectDesc,
    applicantRole: state.viewProjectApplication.applicantRole,
    name: state.viewProjectApplication.name,
    status: state.viewProjectApplication.status,
    message: state.viewProjectApplication.message,
    applicationDate: state.viewProjectApplication.applicationDate,
    email: state.viewProjectApplication.email,
    phoneNumber: state.viewProjectApplication.phoneNumber,
    description: state.viewProjectApplication.description
  }
}

export default connect(mapStateToProps, {
  getUserById,
  getApplicantForProject
})(withStyles(userProfileStyles)(ProjectApplicant));
