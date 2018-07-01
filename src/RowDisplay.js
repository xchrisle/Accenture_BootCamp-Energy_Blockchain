import React from 'react';
import {Grid} from 'material-ui';

export default class RowDisplay extends React.Component {
  render() {
    return <Grid container alignItems={'flex-end'}>
      <Grid item xs={4}>
        <div style={{fontSize: '25px', color: '#EFFCF0'}}>
          <b>{this.props.label.toUpperCase()}</b>
        </div>
      </Grid>
      <Grid item xs={8}>
        <div style={{fontSize: '80px', color: '#DCEED1'}}>
          <b>{this.props.text}</b>
        </div>
      </Grid>
    </Grid>
  }
}
