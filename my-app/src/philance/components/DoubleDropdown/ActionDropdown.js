import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 100,
    },
});

class ActionDropdown extends React.Component {
    constructor(props){
        super(props);
    }
    state = {
        review: '',
        name: 'hai',
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <Select
                        value={this.state.review}
                        onChange={this.handleChange}
                        displayEmpty
                        name="review"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>Select</em>
                        </MenuItem>
                        <MenuItem value="Accept">Accept</MenuItem>
                        <MenuItem value="Reject">Reject</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    }
}

ActionDropdown.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionDropdown);
