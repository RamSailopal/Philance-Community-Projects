import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import { List, Divider } from "semantic-ui-react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";

import logo1 from "../../assets/logos/Philance-logo-text.png";
import facebook from "../../assets/socialMedia/facebookSign.svg";
import github from "../../assets/socialMedia/github.svg";
import email from "../../assets/socialMedia/emailSign.svg";
import twitter from "../../assets/socialMedia/twitterSign.svg";
import linkedin from "../../assets/socialMedia/linkedin-sign.svg";
import youtube from "../../assets/socialMedia/youtubeSign.svg";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
function Footer({ ...props }) {
  const { classes, fluid, white } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      <GridContainer justify='center'
        style={{


          backgroundColor: "#555",
          paddingBottom: "30px"
        }}
      >
        <GridItem xs={12} sm={11} md={9}>

          <GridContainer justify="space-between">
            <GridItem xs={12} sm={4} md={7} lg={4} style={{ textAlign: 'center' }}>
              <img src={logo1} />
            </GridItem>
            <GridItem xs={12} sm={6} md={5} lg={4} style={{ textAlign: 'center' }} >
              <List horizontal style={{ textAlign: 'center', paddingTop: '4px' }}>
                <List.Item className={classes.inlineBlock}>
                  <p align="left">
                    <a
                      href="https://github.com/Philance/Philance"
                      target="_blank"
                    >
                      <img src={github} height="30px" width="30px" />
                    </a>
                  </p>
                </List.Item>
                <List.Item className={classes.inlineBlock}>
                  <a
                    href="https://www.linkedin.com/company/philance/"
                    target="_blank"
                  >
                    <img style={{ background: 'white' }} src={linkedin} height="30px" width="30px" />
                  </a>
                </List.Item>
                <List.Item className={classes.inlineBlock}>
                  <a href="https://twitter.com/philanceorg" target="_blank">
                    <img style={{ background: 'white' }} src={twitter} height="30px" width="30px" />
                  </a>
                </List.Item>
                <List.Item className={classes.inlineBlock}>
                  <a
                    href="https://en-gb.facebook.com/philanceOrg/"
                    target="_blank"
                  >
                    <img style={{ background: 'white' }} src={facebook} height="30px" width="30px" />
                  </a>
                </List.Item>
                <List.Item className={classes.inlineBlock}>
                  <a
                    href="https://www.youtube.com/channel/UCb7MfGFxvWULPNeF_V3D0EQ"
                    target="_blank"
                  >
                    <img style={{ background: 'white' }} src={youtube} height="30px" width="30px" />
                  </a>
                </List.Item>
                <List.Item className={classes.inlineBlock}>
                  <a href="mailto: support@philance.org">
                    <img style={{ background: 'white' }} src={email} height="30px" width="30px" />
                  </a>
                </List.Item>
              </List>
            </GridItem>
          </GridContainer>

        </GridItem>

        <GridItem xs={12} sm={11} md={9} style={{ marginTop: "20px " }}>
          <GridContainer justify="space-between">
            <GridItem xs={12} sm={4} md={7} lg={4} style={{ textAlign: 'center' }}>
              <List divided horizontal animated size="big" style={{ paddingTop: '15px', }}>
                <List.Item style={{ color: "white" }}>
                  <List.Header as="a">
                    {" "}
                    <NavLink
                      style={{ color: "rgb(8, 167, 254)" }}
                      to={"/termofuse"}
                    >
                      Terms of Use
                  </NavLink>
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header as="a">
                    {" "}
                    <NavLink
                      style={{ color: "rgb(8, 167, 254)" }}
                      to={"/privacypolicy"}
                    >
                      Privacy Policy
                  </NavLink>
                  </List.Header>
                </List.Item>
                {/* <List.Item>
                <List.Header as="a">
                  {" "}
                  <NavLink
                    style={{ color: "rgb(8, 167, 254)" }}
                    to={"/cookiespolicy"}
                  >
                    Cookies Policy
                  </NavLink>
                </List.Header>
              </List.Item>
            */}
              </List>
            </GridItem>
            <GridItem xs={12} sm={6} md={5} lg={4} style={{ textAlign: 'center' }} >
              <p
                style={{ color: "#fff", paddingTop: '15px', fontWeight: "400" }}

              >
                Copyright &copy; {1900 + new Date().getYear()}{" "}
                <a href="https://www.philance.org" style={{ color: 'white' }} className={anchor}>
                  Philance, Inc.
            </a>
              </p>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
