import React from "react"
import PropTypes from "prop-types"
import ReactTable from "react-table"
import { NavLink } from "react-router-dom";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles"
import Person from "@material-ui/icons/Person";
import ViewList from "@material-ui/icons/ViewList";

// @material-ui/core components
import Button from "components/CustomButtons/Button.jsx";
import Tooltip from '@material-ui/core/Tooltip';

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Card from "components/Card/Card.jsx"
import CardBody from "components/Card/CardBody.jsx"
import imag from "philance/assets/img/Helpingothers4.jpg";

// redux
import { connect } from 'react-redux'
import { myProject, storeList } from '../../actions/myProject'
import { getProjectById, idStored } from '../../actions/projectDetails'
import { getProjectCandidateReviewList } from '../../actions/candidateReview'

import Loader from "../../components/Loader/Loader"
//import publicHomePageStyle from "./PublicHomePageStyle";
import { hostname } from "../../../config";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 13,
  }
})

class MyProjectsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      loading: false,
      loader: false,
      data: [],
	  fndimag: ''
    }
  }

  componentDidMount() {
    this.props.myProject(this.props.id,(flag=>{
      this.props.response ?
      this.renderData() : null
    }))
    this.toggleLoader(true)
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })
  handleItemClick = async (e, { id }) => {
    await this.setState({ activeItem: id })
    this.renderProjects()
  }

    getimg(att) {
     const { classes } = this.props;
     var fownd="0";	
     var fndimag="/static/media/Helpingothers4.023cec80.jpg";
	if (att) {
					att.map((value, key) => {
						var attbits=att[key].originalName.split(".")
						if (attbits[0] === "ProjectImage") {
							fndimag=hostname() + att[key].attachment
						}
					})
					
	}
	else {
			var attbits=""
			fndimag='/static/media/Helpingothers4.023cec80.jpg'
	}
	return fndimag
  }
  
  color(i) {
    if (i === 1) return '#dbebf6'
  }

  toggleLoader = (flag) => {
    this.setState({
      loader: flag
    });
  }

  renderData(){
    const { classes } = this.props;
    let i = 0;
    this.props.response ?
      this.props.response.map((element) => {
        i = i === 2 ? 1 : i + 1
        let startDate = new Date(element.startDate);
        let endDate = new Date(element.endDate);
        startDate = startDate.toDateString()
        endDate = endDate.toDateString()
        let sample = {
		  Imag: 
               <span><img src={this.getimg(element.project_attachments)} height="100px" width="200px"></img></span>,
          project_name: element.projectName,
          status: element.status,
          startDate: startDate,
          endDate: endDate,
          Close: "",
          Complete: "",
          Action: <span>
            <Tooltip title="Details" classes={{ tooltip: classes.lightTooltip }}>
              <NavLink to={`/project-details/info`}>
              <Button
                round
                justIcon
                simple
                onClick={() => {
                this.toggleLoader(true)
                  this.props.getProjectById({id:element.projectId},(flag)=>{
                    this.toggleLoader(flag)
                    // this.props.history.push(`/project-details/${element.project_id}`)
                    this.props.idStored(element.projectId)
                  })
                }}
                color="info"
                className="like"
              ><ViewList /></Button>

              </NavLink>
            </Tooltip>
            <Tooltip title="Review" classes={{ tooltip: classes.lightTooltip }}>
              <Button
                justIcon
                round
                simple onClick={() => {
                  this.toggleLoader(true)
                  this.props.getProjectCandidateReviewList(element.projectId, (flag)=>{
                    this.toggleLoader(flag)
                    this.props.idStored(element.projectId)
                    this.props.history.push(`../projectCandidateReview/${element.projectId}/`)
                  })
                }} color="info"
                className="like"
              ><Person /></Button>
            </Tooltip>
          </span>
        }
        return(
        this.setState((prev)=>({
          data:[...prev.data,sample]
      }))
        );
      }) : null
      this.toggleLoader(false)
  }

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        <Loader loader={this.state.loader} />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <CardBody>
                <ReactTable style={{ overflow: "none" }}
                  data={this.state.data}
                  columns={[
				    {
                          Header: <strong></strong>,
                          accessor: "Imag",
                          sortable: false,
						  width:200
                        },
                    {
                      Header: <strong>Name</strong>,
                      accessor: "project_name",
                      filterable: true,
                      filterMethod: this.columnFilter,
					  width:100
                    },
                    {
                      Header: <strong>Status</strong>,
                      accessor: "status",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Start</strong>,
                      accessor: "startDate",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Target End</strong>,
                      accessor: "endDate",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Close</strong>,
                      accessor: "Close",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong></strong>,
                      accessor: "Action",
                      sortable: false,
                    }                    
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

const mapStateToProps = state => {
  return {
    response: state.mypro.response,
    length: state.mypro.length,
    list: state.mypro.list,
    id: state.auth.userId,
	projectAttachments: state.proDetails.projectAttachments
  }
}

MyProjectsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getProjectCandidateReviewList, storeList, getProjectById, idStored, myProject })(withStyles(styles)(MyProjectsPage));
