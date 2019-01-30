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
import Chart from 'react-google-charts';
import Component from "react-component-component";
// redux
import { connect } from 'react-redux'
import { myProject, storeList } from '../../actions/myProject'
import { getProjectById, idStored } from '../../actions/projectDetails'
import { getProjectCandidateReviewList } from '../../actions/candidateReview'

import Loader from "../../components/Loader/Loader"
//import publicHomePageStyle from "./PublicHomePageStyle";

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
    maxWidth: 'none',
  }
})

class ProjectTaskView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      loading: false,
      loader: false,
      data: []
	  
    }
	this.props = {
       chartData: []
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

  color(i) {
    if (i === 1) return '#dbebf6'
  }

  toggleLoader = (flag) => {
    this.setState({
      loader: flag
    });
  }
  
  chrtDat(projectTasks) {
        var chartData= [[ { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },]]
		projectTasks.map((value,key)=>{
		 chartData.push(
	  [
		 value.taskId, 
		 value.taskName,
		 new Date(value.startDate),
		 new Date(value.endDate), 
		 null, 
		 100,
		 null,])
	  })
	  if ( chartData[1] == null ) {
		chartData.push(
	  [
		 null, 
		 null,
		 new Date(null), 
		 new Date(null),
		 null,
		 null, 
		 null,])
	  }
	
	  return chartData
}

  taskbutcol(creatby,userid) {
	if (userid == creatby) {
			var col="info" 
	}
	else {
		    var col="secondary"
	}
	return col
  }
  
  taskbutdis(creatby,userid) {
	if (userid == creatby) {
			var stat="" 
	}
	else {
		    var stat="disabled"
	}
	return stat
 }

  renderData(){
    const { classes } = this.props;
    let i = 0;
    this.props.response ?
      this.props.response.map((element) => {
        i = i === 2 ? 1 : i + 1
        let startDate = new Date(element.start_date);
        let endDate = new Date(element.end_date);
        startDate = startDate.toDateString()
        endDate = endDate.toDateString()
        let sample = {
          project_name: element.project_name,
          status: element.status,
          startDate: startDate,
          endDate: endDate,
          Close: "",
          Complete: "",
          Action: <span>
            <Tooltip title="Details" classes={{ tooltip: classes.lightTooltip }}>
              <NavLink to={`/project-details/${element.project_id}/info`}>
              <Button
                round
                justIcon
                simple
                onClick={() => {
                this.toggleLoader(true)
                  this.props.getProjectById({id:element.project_id},(flag)=>{
                    this.toggleLoader(flag)
                    // this.props.history.push(`/project-details/${element.project_id}`)
                    this.props.idStored(element.project_id)
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
                  this.props.getProjectCandidateReviewList(element.project_id, (flag)=>{
                    this.toggleLoader(flag)
                    this.props.idStored(element.project_id)
                    this.props.history.push(`../projectCandidateReview/${element.project_id}/`)
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

        {/* <Loader loader={this.state.loader} /> */}
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <CardBody>
        <GridContainer align="right" direction="column">
          <GridItem style={{ marginRight: 45 }}>
          
		   
		   {/* <NavLink to={`/project-details/:projectId/tasks/create`}> */}
              <Button 
			  
			  color={this.taskbutcol(this.props.createdBy,this.props.id)}
			  
			  disabled={this.taskbutdis(this.props.createdBy,this.props.id)}
			  
			  round className={classes.marginRight} 
			  
			  onClick={() => {
                    if ( this.props.id == this.props.createdBy) {
						this.props.history.push('tasks/create')
					}
			  }}
			  >
                  + Create Task
              </Button> 
          {/* </NavLink> */}
          </GridItem>
          <br/><br/><br/>
      </GridContainer>
                <ReactTable style={{ overflow: "none" }}
                  data={
                    this.props.projectTasks.map((value,key)=>{
                      return{
						taskId:value.taskId,
                        task_name:
                        <Tooltip title={value.taskName} classes={{ tooltip: classes.lightTooltip }}>          
                        <span>{value.taskName}</span>
                        </Tooltip>,
                        status:value.status,
                        startDate:new Date(value.startDate).toDateString(),
                        endDate:new Date(value.endDate).toDateString(),
                        assignee:value.assignee.firstName+' '+value.assignee.lastName,
                        author:value.author.firstName+' '+value.author.lastName,
                        priority:value.priority,
                        action:
                        <Tooltip title="Task Details" classes={{ tooltip: classes.lightTooltip }}>
                          <Button justIcon simple color="info" className={classes.marginRight} onClick={() => {
                            this.props.getProjectById({id:this.props.projectId},()=>{
                              this.props.history.push(`tasks/${value.taskId}`)
                            })
                          }}>
                            <ViewList/>
                          </Button>
                        </Tooltip>
                      
					  }
                    
                    })
                  }
                  columns={[
                    {
                      Header: <strong>Task ID</strong>,
                      accessor: "taskId",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Task Name</strong>,
                      accessor: "task_name",
                      filterable: true,
                      filterMethod: this.columnFilter
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
                      Header: <strong>Assignee</strong>,
                      accessor: "assignee",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Author</strong>,
                      accessor: "author",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Priority</strong>,
                      accessor: "priority",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong></strong>,
                      accessor: "action",
                      sortable: false,
                    }                    
                  ]}
                  defaultPageSize={5}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
                										<br></br>
										<br></br>
		<h3><b>Gantt Chart</b></h3>
	
<Chart
  width={'100%'}
  height={'400px'}
  chartType="Gantt"
  loader={<div>Loading Chart</div>}
  data={this.chrtDat(this.props.projectTasks)}
   options={{
    gantt: {
      criticalPathEnabled: false,
      innerGridHorizLine: {
        stroke: '#c6d9ec',
        strokeWidth: 2,
      },
      innerGridTrack: { fill: '#ffffff' },
      innerGridDarkTrack: { fill: '#ffffff' },
    },
  }}
  rootProps={{ 'data-testid': '1' }}
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
    response: state.projectTasks.response,
    projectTasks: state.proDetails.projectTasks,
    projectId: state.proDetails.id,
	createdBy: state.proDetails.createdBy,
    id: state.auth.userId,
  }
}

ProjectTaskView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getProjectCandidateReviewList, storeList, getProjectById, idStored, myProject })(withStyles(styles)(ProjectTaskView));
