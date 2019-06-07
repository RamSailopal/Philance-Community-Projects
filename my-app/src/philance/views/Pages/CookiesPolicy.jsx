import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import leftImage from "philance/assets/img/left-image.png";

import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import bgImag from "philance/assets/img/VolunteerProject3.jpeg";
import CookiesPolicyStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
class CookiesPolicy extends React.Component {
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
            marginBottom: "30px",
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
            <h2>
              <font color="white" face="verdana" className={classes.fontClass1}>
                Cookies Policy
              </font>
            </h2>
          </div>
        </div>

        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem sm={12} md={5} lg={5} className={classes.fullWidth}>
              <h1 className={classes.dividerTitle1}>Term and Condition</h1>
              <h3
                style={{
                  color: "rgb(110, 107, 105)",
                  fontWeight: "400"
                }}
              >
                Nonprofits and freelancers do not pay any fees for joining and
                using the PhiLance platform. PhiLance collects a 5% platform fee
                plus a 3% third party credit card processing fee on funds raised
                from donors. Donors could optionally cover the platform and
                credit card processing fees so nonprofits get 100% of the
                intended donation amount and use those funds to pay freelancers
                working on their projects.
              </h3>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

CookiesPolicy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(CookiesPolicyStyle)(CookiesPolicy);
