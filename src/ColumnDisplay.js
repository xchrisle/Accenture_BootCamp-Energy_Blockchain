import React from 'react';
import {Grid} from 'material-ui';

class ColumnDisplay extends React.Component {
  render() {
    return <Grid container direction={'column'}>
      <Grid item xs={12}>
        <div style={{fontSize: '25px', color: '#EFFCF0'}}>
          <b>{this.props.label.toUpperCase()}</b>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{fontSize: '60px', color: '#DCEED1'}}>
          <b>{this.props.number}</b>
        </div>
      </Grid>

    </Grid>
  }
}

export default ColumnDisplay;