import React from "react";
import Datetime from "react-datetime";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import PublicPagesHeader from "philance/components/Header/PublicPagesHeader.jsx"
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Header from '../../components/Header/Header/Header'
import { projectPagesRoutes } from "philance/routes/pages.jsx"

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

// @material-ui/icons

import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import { InterestsDropdown, CountryDropdown } from '../../components/DoubleDropdown'
import { connect } from 'react-redux'
import {
  Icon
} from 'semantic-ui-react';
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";

import {
  budgetChanged,
  descriptionChanged,
  endDateChanged,
  freelancersChanged,
  projectNameChanged,
  startDateChanged,
  volunteersChanged,
  zipCodeChanged,
  statusChanged,
  removeToaster,
  countryChanged,
  updateProject,
  interestsChanged
} from '../../actions/projectDetails'
import { PROJECT_DETAILS_UPDATE_SUCESS } from '../../actions/types'

import { myProject } from '../../actions/myProject'
import store from '../../store/store'
import Loader from "../../components/Loader/Loader"
import Toaster from "../../components/Toaster/Toaster";
import { hostname } from "../../../config";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import PvtPagesHeader from "../../components/Header/PvtPagesHeader";
import ProjectPagesHeader from "../../components/Header/ProjectPagesHeader";
const style = {
  ...extendedTablesStyle,
  ...startProjectPageStyle,
  ...sweetAlertStyle

};
class ProjectNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      interests: [],
      loader: false
    };
  }
  warningWithConfirmMessage() {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="You need to login to Apply for this project"
          onConfirm={() => this.props.history.push('/login')}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Login!"
          cancelBtnText="Cancel"
          showCancel
        >
        </SweetAlert>
      )
    });
  }

  componentWillUnmount() {
    this.props.removeToaster()
    this.props.myProject(this.props.userId, () => { })
  }

  onProjectNameChange(text) {
    this.props.projectNameChanged(text)
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text)
  }

  onBudgetChange(text) {
    this.props.budgetChanged(text)
  }

  onEndDateChange(text) {
    this.props.endDateChanged(text)
  }

  onFreeLancersChange(text) {
    this.props.freelancersChanged(text)
  }

  onStartDateChange(text) {
    this.props.startDateChanged(text)
  }

  onVolunteersChange(text) {
    this.props.volunteersChanged(text)
  }

  onCountryChanged(text) {
    store.dispatch(countryChanged(text))
  }

  onZipCodeChange(text) {
    this.props.zipCodeChanged(text)
  }

  onStatusChange(text) {
    this.props.statusChanged(text)
  }

  onInterestsChange(text) {
    this.props.interestsChanged(text)
  }

  toggleLoader = (flag) => {
    this.setState({
      loader: flag
    });
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <GridContainer className={this.props.isLoggedIn ? classes.justifyContentCenter : classes.container}>
        <Header
          doNotDisplayTopRightButton
          sidebarMinimize={false}
          miniActive={false}
          routes={projectPagesRoutes}
          // handleDrawerToggle={this.handleDrawerToggle}
          {...rest} />
        <CardHeader style={{ marginRight: '70%' }}>
          <ProjectPagesHeader {...rest} />

        </CardHeader >
        {/* <CardBody > */}
        <Switch>
          {projectPagesRoutes.map((prop, key) => {
            if (prop.redirect) {
              return (
                <Redirect from={prop.path} to={prop.pathTo} key={key} />
              );
            }
            return (
              <Route
                path={prop.path}
                // component={prop.component}
                key={key}
                render={(props) => <prop.component {...props} />}
              />
            );
          })}
        </Switch>
        {/* </CardBody> */}
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.proDetails.name,
    description: state.proDetails.description,
    zipCode: state.proDetails.zipCode,
    freelancers: state.proDetails.freelancers,
    volunteers: state.proDetails.volunteers,
    startDate: state.proDetails.startDate,
    status: state.proDetails.status,
    endDate: state.proDetails.endDate,
    budget: state.proDetails.budget,
    toast: state.proDetails.toast,
    id: state.proDetails.id,
    country: state.proDetails.country,
    interests: state.proDetails.interests,
    isLoggedIn: state.auth.isLoggedIn,
    interestOptions: state.common.interestOptions,
    requestCompleted: state.start.requestCompleted,
    createdBy: state.proDetails.createdBy,
    projectAttachments: state.proDetails.projectAttachments,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, {
  budgetChanged,
  descriptionChanged,
  endDateChanged,
  freelancersChanged,
  projectNameChanged,
  startDateChanged,
  volunteersChanged,
  zipCodeChanged,
  statusChanged,
  removeToaster,
  countryChanged,
  updateProject,
  myProject,
  interestsChanged
})(withStyles(style)(ProjectNavigator));
