import React, { Component } from 'react'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import Power from '../build/contracts/Power.json'
import SwitchLabels from './SwitchLabels'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'

import { Grid, Divider, Drawer, List, ListItem, Button
} from 'material-ui';

import ColumnDisplay from './ColumnDisplay';
import RowDisplay from './RowDisplay';
import NavBar from './NavBar';
import {LineChart, Legend, YAxis, XAxis, Line, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell} from 'recharts'; 

  const dataLineChart = [
    //data for Line Chart
      {name: '', 'ENERGY PRODUCED': 100, 'ENERGY SOLD': 0},
      {name: '', 'ENERGY PRODUCED': 170, 'ENERGY SOLD': 50},
      {name: '', 'ENERGY PRODUCED': 200, 'ENERGY SOLD': 25},
      {name: '', 'ENERGY PRODUCED': 150, 'ENERGY SOLD': 70},
      {name: '', 'ENERGY PRODUCED': 210, 'ENERGY SOLD': 85},
      {name: '', 'ENERGY PRODUCED': 300, 'ENERGY SOLD': 200},
      {name: 'Last 24hrs', 'ENERGY PRODUCED': 300, 'ENERGY SOLD': 220},
    ];

  //adds units to the y-axis
  const formatter = (value) => `${value} kW`;

  //data for Pie Chart
  const dataPieChart = [
    {name: 'RENEWABLE SOURCES', value: 400}, 
    {name: 'GRID', value: 300},
    //{name: 'Group C', value: 300}, 
    //{name: 'Group D', value: 200}
  ];

  //settings for Pie Chart
  const COLORS = ['#D1EEDC', '#4C5760'/*, '#FFBB28', '#FF8042'*/];
  const RADIAN = Math.PI / 180; 
  const renderCustomizedLabel = ({ 
    cx, cy, midAngle, innerRadius, outerRadius, percent, index 
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill='none' textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  };

const styles = {
  divider: {
    backgroundColor: '#77B5B0',
    height: '10px'
  }
};

const drawerMenu = ['Home', 'Main', 'View Transaction History', 'My Solar', 'Exchange Marketplace', 'Account Settings', 'Leaderboard', 'Log Out'];

class Main extends Component {
  constructor(props) {
    super(props);
    
      this.state = {
        storageValue: 0,
        web3: null,
        drawerIsOpen: false,
        dataPieChart: dataPieChart,
        dataLineChart: dataLineChart,
        production: 0 + " kWH",
        efficiency: 11 + "%",
        current_usage: 0 + " kWH",
        average_usage: 18.3 + " kWH",
        amount_spent_this_month: "$" + 0,
        amount_saved_this_month: "$" + 0,
        balance: 0
  
      }
    }
  
    toggleDrawer() {
      this.setState({
        drawerIsOpen: !this.state.drawerIsOpen
      })
    }
  
    componentWillMount() {
      // Get network provider and web3 instance.
      // See utils/getWeb3 for more info.
  
      getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });
  
        // Instantiate contract once web3 provided.
        this.instantiateContract();
        setInterval(() => this.instantiateContract(), 1000);
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
    }
  
    instantiateContract() {
      /*
        * SMART CONTRACT EXAMPLE
        *
        * Normally these functions would be called in the context of a
        * state management library, but for convenience I've placed them here.
        */
      const contract = require('truffle-contract')
      const powerContract = contract(Power)
      powerContract.setProvider(this.state.web3.currentProvider)
  
      powerContract.deployed().then(instance => {



        this.state.web3.eth.getAccounts((error, accounts) => {
          powerContract.deployed().then(instance => {
            instance.get_user_information({from: accounts[0]}).then(data => {
              this.setState({
                production: data[1] + " kWH",
                current_usage: (data[2]/1000).toPrecision(3) + " kWH",
                amount_spent_this_month: "$" + data[4],
                amount_saved_this_month: "$" + data[5],
                balance: data[0].toString()
              });
            })
          })
        })
      })
  
  
    }
  
    render() {
  
      return <div>
        <NavBar toggleDrawer={() => this.toggleDrawer()}/>
        <Grid container style={{padding: 30, height: '100%', marginTop: 30}}>
          <Grid item xs={6} style={{paddingRight: 25}}>
            <Grid container direction={'column'}>
              <Grid item xs={12}>
                <Grid container direction={'row'}>
                  <Grid item xs={5}>
                    <h1>DASHBOARD</h1>
                  </Grid>
                  <Grid item xs={4}>
                  </Grid>
                  <Grid item xs={3} >
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
                      <b style={{fontSize: 40, color: '#DCEED1', marginRight: 10 }}>{this.state.balance}</b>
                      <img src="/images/logo.png" style={{height: 40}}/>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
  
              <Divider style={styles.divider}/>
  
              <Grid item xs={12} style={{margin: '10px', height: '200px'}}>
                <Grid container style={{height: '100%'}} alignItems={'center'}>
                  <Grid item xs={3}>
                    <i className="fas fa-sun fa-8x" style={{color: '#E2D58B'}}></i>
                  </Grid>
                  <Grid item xs={6}>
                      <ColumnDisplay label={'Stored Energy'} number={this.state.production}/>
                  </Grid>
                  <Grid item xs={3}>
                    <ColumnDisplay label={'Efficiency'} number={this.state.efficiency}/>
                  </Grid>
                </Grid>
  
              </Grid>
              <Divider style={styles.divider}/>
              <Grid container style={{height: '100%', width:'100%'}} alignItems={'center'}>
                <Grid item xs={12}>
                <ResponsiveContainer width={'100%'} height={330} >
                  <LineChart width={500} height={300} data={this.state.dataLineChart}>
                    <Legend verticalAlign="bottom" height={36}/>
                    <XAxis dataKey={"name"}/>
                    <YAxis tickFormatter={formatter}/>
                    <Line type="monotone" dataKey="ENERGY PRODUCED" stroke="#D1EEDC" />
                    <Line type="monotone" dataKey="ENERGY SOLD" stroke="#4C5760" />
                  </LineChart>
                </ResponsiveContainer>
                </Grid>
                <Grid container>
                  <Grid item xs={10}>
                  </Grid>
                  <Grid item xs={2}>
                    {/* Selling Switch */}
                    <SwitchLabels/> 
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
  
          {/* Second column */}
          <Grid item xs={6} style={{paddingLeft: 25}}>
            <Grid container style={{height: 50}}/>
            <Grid container style={{height: 300}}>
              <Grid item xs={12}>
                <RowDisplay label={'Daily Usage'} text={this.state.current_usage}/>
              </Grid>
              <Grid item xs={12}>
                <RowDisplay label={'Average Usage'} text={this.state.average_usage}/>
              </Grid>
            </Grid>
            <Grid container style={{height: 43}}/>
  
            <Divider style={Object.assign({}, styles.divider, {marginBottom: 20})}/>
  
  
            <Grid container>
              <Grid item xs={6} style={{borderRight: '10px solid #77B5B0'}}>
                <Grid container>
                  <Grid item xs={12}>
                    <ResponsiveContainer width={'100%'} height={330}>
                      <PieChart width={1000} height={400} onMouseEnter={this.onPieEnter}>
                      <Legend verticalAlign="bottom" height={30} layout="vertical"/>
                        <Pie 
                          data={this.state.dataPieChart}
                          cx={200} 
                          cy={145} 
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={'90%'} 
                          fill='none'
                        >
                          <Tooltip/>
                          {
                            dataPieChart.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                          }
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
  
                <Grid container direction={'column'} style={{padding: '20px 20px 20px 30px'}}>
                  <Grid item xs={12}>
                    <ColumnDisplay label={'Amount Spent this month'} number={this.state.amount_spent_this_month} />
                  </Grid>
                  <Grid item xs={12}>
                    <ColumnDisplay label={'Amount saved this month'} number={this.state.amount_saved_this_month} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
  
          </Grid>
        </Grid>
  
  {/* DRAWER */}
        <Drawer open={this.state.drawerIsOpen} anchor="right" classes={{root: {color: '#4C5760'}}}>
          <Button onClick={() => this.toggleDrawer()} style={{color: 'grey'}}>
            Menu
          </Button>

        <List style={{width: 400, color: '#FFFFFF', backgroundColor: '#4C5760', fontSize: 20, marginRight: 10, fontFamily: "Roboto", fontWeight: 'bold'}}>

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

export default Main
