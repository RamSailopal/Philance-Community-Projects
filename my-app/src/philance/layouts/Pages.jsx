import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import PublicPagesHeader from "philance/components/Header/PublicPagesHeader.jsx";
import Footer from "philance/components/Footer/Footer.jsx";

import { pagesRoutes } from "philance/routes/pages.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import Dashboard from '../layouts/Dashboard'
import bgImagePub from "philance/assets/img/team-hands-in1.jpg";

import { myProject } from '../actions/myProject'

// var ps;

class Pages extends React.Component {
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  constructor(props) {
    super(props);
    this.state = {
      // variable for deciding if the sidebar is open (true) or not (false) on a mobile device
      mobileOpen: true,
      // variables for deciding if the sidebar is mini (true) or full width (false)
      miniActive: true
    };
  }
  // function for changeing the component from open to not open and vice versa on a mobile device
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  // function for changeing the component from mini to full width and vice versa
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  render() {

    const { classes, ...rest } = this.props;
    if (this.props.isLoggedIn) {
      return (
        <Dashboard {...rest} />
      )
    }

    else {
      //display public pages
      return (
        <div>
          <PublicPagesHeader {...rest} />
          <div className={classes.wrapper} ref="wrapper">
		  <br></br>
		  <br></br>
		  <br></br>
		  <br></br>
            <div className={classes.fullPage}>
              <Switch>
                {pagesRoutes.map((prop, key) => {
                  if (prop.redirect) {
                    return (
                      <Redirect from={prop.path} to={prop.pathTo} key={key} />
                    );
                  }
                  return (
                    <Route
                      path={prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                })}
              </Switch>
              <Footer white />
              <div
                className={classes.fullPageBackground}
                style={{ backgroundImage: "url(" + bgImagePub + ")" }}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    id: state.auth.userId
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { myProject })(withStyles(pagesStyle)(Pages));
