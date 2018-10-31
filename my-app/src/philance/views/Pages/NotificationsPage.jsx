import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table"

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { connect } from 'react-redux'

//import publicHomePageStyle from "./PublicHomePageStyle";
import notificationsPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  ...notificationsPageStyle,
  ...sweetAlertStyle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
class NotificationsPage extends React.Component {
  state={
    alert:null
  }
  warningWithConfirmMessage(message) {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          onConfirm={() => this.setState({alert:null})}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          confirmBtnText="Hide!"
        >
        <h4>
          {message}
        </h4>
        </SweetAlert>
      )
    });
  }

  render() {
    const { classes } = this.props;
    var data=[];
    this.props.data.map((value,key)=>{
      // data.push(this.props.data[key])
      this.props.data[key].message=<a style={{cursor:'pointer'}} onClick={()=>{
        this.warningWithConfirmMessage(this.props.data[key].message)
      }}>{this.props.data[key].message}</a>
    })
    return (
        <GridContainer>
          <GridContainer justify="center">
          {this.state.alert}
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <CardBody>
                <ReactTable style={{ overflow: "none" }}
                  data={this.props.data}
                  columns={[
                    {
                      Header: <strong>Date and Time</strong>,
                      accessor: "creationDate",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Sender</strong>,
                      accessor: "user.firstName",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Trigger</strong>,
                      accessor: "notificationTrigger",
                      filterable: true,
                      filterMethod: this.columnFilter,
                    },
                    {
                      Header: <strong>Message</strong>,
                      accessor: "message",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },{}
                  ]}
                  defaultPageSize={5}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"

                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
        </GridContainer>
      </GridContainer>
    );
  }
  
}

NotificationsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps =state=> {
  return {
    data:state.user.notifications,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(NotificationsPage));
