import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Hamburger from '@material-ui/icons/Dehaze';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  }
});

const MenuMapButton = (props) => {
  const { classes } = props;

      return (
        <div>
          <Fab onClick={() => {this.props.callBackFromMenuButton("allo")}} className={classes.fab} color={"primary"}>
            <Hamburger className={classes.extendedIcon} />
          </Fab>
        </div>
    );
}

MenuMapButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuMapButton);