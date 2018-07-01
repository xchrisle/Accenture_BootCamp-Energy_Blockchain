import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import white from 'material-ui/colors/white';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const styles = {
  checked: {
    color: '#DCEED1',
    '& + $bar': {
      backgroundColor: '#DCEED1',
    },
  },
  label: {
    color: '#DCEED1',
    },
  bar:{}
};

class SwitchLabels extends React.Component {
  state = {
    checkedA: true,
    checkedB: true,
    checkedF: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {

    return (
      <FormGroup row>
        <FormControlLabel
          classes={{label:this.props.classes.checked}}
          control={
            <Switch
              checked={this.state.checkedF}   
              onChange={this.handleChange('checkedF')}
              value="checkedF"
              classes={{
                checked: this.props.classes.checked,
                bar: this.props.classes.bar
              }}
            />
          } 
          label="SELLING"
        />
      </FormGroup>
    );
  }
}

SwitchLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwitchLabels);