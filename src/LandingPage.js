import React, { Component } from 'react'
import AppBarExampleIcon from './AppBarExampleIcon'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'

import './App.css'
import {
  Grid, Divider, Switch, AppBar, IconButton, Toolbar, Typography, Drawer, List, ListItem,
  Button
} from 'material-ui';

import ColumnDisplay from './ColumnDisplay';
import RowDisplay from './RowDisplay';
import NavBar from './NavBar';
import RaisedButton from './RaisedButton';

const styles = {
  divider: {
    backgroundColor: '#77B5B0',
    height: '10px'
  }
};

const drawerMenu = ['Home', 'Main', 'View Transaction History ', 'My Solar', 'Exchange Marketplace', 'Account Settings', 'Leaderboard', 'Log Out'];

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerIsOpen: false,
    }
  }

  toggleDrawer() {
    this.setState({
      drawerIsOpen: !this.state.drawerIsOpen
    })
  }



  render() {

    return <div>
      <NavBar toggleDrawer={() => this.toggleDrawer()}/>

    <Grid container style={{padding: 30, height: 700, justifyContent: 'center', marginTop: 30}}>
        <Grid container direction={'row'} style={{
            justifyContent: 'center', 
            marginTop:150, 
            padding: '10px 5px 5px 20px', 
            width: '100%', 
            height:250,
            color: '#DCEED1', 
            fontSize: 95,
            fontFamily: "Roboto", 
            fontWeight: 'bold'
            }}>
                <Grid item>
                    <img src="/images/logo.png" style={{height: 200}}/>
                </Grid>

                <Grid item > 
                <Grid>
                    <b style={{color: '#DCEED1'}}>POWER</b>
                </Grid>
                <Grid>
                    <b style={{color: '#DCEED1'}}>CHAIN</b>
                </Grid>
                </Grid>
        </Grid>
        <Grid container direction={'row'} style={{
            justifyContent: 'center', 
            marginTop:0, 
            padding: '10px 5px 5px 20px', 
            width: '100%', 
            color: '#DCEED1', 
            fontSize: 95,
            fontFamily: "Roboto", 
            fontWeight: 'bold'
            }}>
            <Grid item > 
            
            {/* BUTTON TO GO TO MAIN.JS */}
              <Button variant="raised" className={this.button} href={'/main'} style={{backgroundColor: '#73bfb8', fontFamily: "Roboto", fontWeight: 'bold', fontSize: 45, border: 'solid', color: 'white',minWidth:450, minHeight: 150,borderRadius:30}}>
            {/*  , }} */}
              VIEW MY POWER CHAIN
            </Button>
                
                {/* <Button disabled href="/" className={button}>
                VIEW MY POWER CHAIN (Link disabled)
                </Button> */}
                {/* <Grid>
                    <b style={{color: '#DCEED1'}}>VIEW MY POWER CHAIN</b>
                </Grid> */}
            </Grid>
        </Grid>
    </Grid>
            
  {/* DRAWER */}
  <Drawer open={this.state.drawerIsOpen} anchor="right" classes={{root: {color: '#4C5760'}}}>
          <Button onClick={() => this.toggleDrawer()} style={{color: 'grey'}}>
            Menu
          </Button>

        <List style={{boxShadow: '500px', width: 400, color: '#FFFFFF', backgroundColor: '#4C5760', fontSize: 20, marginRight: 10, fontFamily: "Roboto", fontWeight: 'bold'}}>

          {drawerMenu.map((item, i) => {
            return <ListItem button key={i}>
              <a href={"/" + item} style={{color:'#FFFFFF', fontSize:'22', fontFamily:"Roboto", fontWeight:'bold'}}> {item}</a>
            </ListItem>
          })}

        </List>
      </Drawer>
    </div>
  }
}

export default LandingPage
