import React from 'react';
import {Button, Grid} from 'material-ui';

export default class NavBar extends React.Component {
  render() {
    return <div style={{backgroundColor: '#4C5760', height: '60px', top: 0, position: 'fixed', width: '100%', zIndex: 100, left: 0}}>
      <Grid container>
        <Grid item xs={2}>
          <Grid container direction={'row'} style={{padding: '10px 5px 5px 20px'}}>
            <Grid item>
              <img src="/images/logo.png" style={{height: 40}}/>
            </Grid>

            <Grid item>
              <Grid>
                <b style={{color: '#EFFCF0'}}>POWER</b>
              </Grid>
              <Grid>
                <b style={{color: '#EFFCF0'}}>CHAIN</b>
              </Grid>
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={10} >
          <Grid container justify={'flex-end'}>
            <Button onClick={() => this.props.toggleDrawer()} style={{marginTop: 15, marginRight: 10}}>
              <i className="fas fa-bars fa-2x" style={{color: '#EFFCF0'}}></i>
            </Button>
          </Grid>
        </Grid>
      </Grid>

    </div>
  }
}
