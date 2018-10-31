import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        textAlign:"center",
        marginTop: "280px",
        zIndex: 10,
        color:"blue !important",
    },
});

let container= {
    position: "fixed",
    top:0,
    left:0,
    textAlign:"center",
    height: "100%",
    width: "100%",
    background: "rgba(255, 255, 255, 0.6)",
    zIndex: 9,
}
const Loader = (props) => {
    const { classes } = props;
    if (props.loader === true) {
        return (
            <div style={container}>
                <CircularProgress className={classes.progress}/>
            </div>
        );
    } else {
        return (
            <span></span>
        );
    }

}

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);