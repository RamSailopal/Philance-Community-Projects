import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

//import Button from "@material-ui/core/Button";

// @material-ui/icons
import MenuIcon from "@material-ui/icons/Menu";

// core components
import Button from "components/CustomButtons/Button";

import { pvtPagesRoutes } from "../../routes/pages.jsx";

import publicPagesHeaderStyle from "assets/jss/material-dashboard-pro-react/components/pagesHeaderStyle.jsx";

class PublicPagesHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ open: false });
    }
  }

  render() {
    const { classes, color } = this.props;
    const appBarClasses = cx({
      [" " + classes[color]]: color
    });

    var list = (
      <List className={classes.list}>
        {pvtPagesRoutes.filter(route => { return route.publicHeader == true }).map((prop, key) => {
          if (prop.redirect) {
            return null;
          }
          const navLink =
            classes.navLink +
            cx({
              [" " + classes.navLinkActive]: this.activeRoute(prop.path)
            });
          return (
            <ListItem key={key} className={classes.listItem}>
              <NavLink to={prop.path} className={navLink}>
                <ListItemIcon className={classes.listItemIcon}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.short}
                  disableTypography={true}
                  className={classes.listItemText}
                />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    );

    return (
      <AppBar className={classes.appBar + appBarClasses}>
        <Toolbar>
          <Hidden smDown implementation="css">
            <NavLink to="/">
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div>
                  <img src={require('philance/assets/logos/philancelogo.png')} alt="logo" style={{ width: "45px", verticalAlign: "middle", border: "0" }} />
                </div>
                <div>
                  <img src={require('philance/assets/logos/Philance-logo-text.png')} alt="logo" className={classes.txtimg} />
                </div>
              </div>
            </NavLink>
            <div><h6 style={{ color: '#ffe100' }}>Unleash the Power of Community</h6></div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              {/* <Typography variant="title" color="inherit"> */}
              {
                <img
                  src={require("philance/assets/logos/Philance-logo-text.png")}
                  alt="Philance"
                />
              }
              {/* </Typography> */}
            </div>
          </Hidden>
          <Hidden smDown implementation="css">
            {list}
          </Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </Button>
          </Hidden>
          <Hidden mdUp implementation="css">
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={"right"}
                open={this.state.open}
                classes={{
                  paper: classes.drawerPaper
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

PublicPagesHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(publicPagesHeaderStyle)(PublicPagesHeader);
