import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  }
});

function FindBarsButton(props) {
  const { classes } = props;
  return (
    <div>
      <Link to="/map" style={{textDecoration: 'none'}}>
        <Button variant="contained" className={classes.button}>
          Find Bars!
        </Button>
      </Link>
    </div>
  );
}

FindBarsButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FindBarsButton);