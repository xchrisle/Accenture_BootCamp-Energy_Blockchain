import React, { Component } from 'react'
import { Route, Link, IndexRoute, browserHistory } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import LandingPage from './LandingPage'
import Logout from './Logout'



import Main from './Main'
import './App.css'

const My404Component = () => <h1>HTTP 404 - Webpage not found</h1>

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route path='/main' component={Main} />
            <Route path='/home' component={LandingPage} />
            <Route path='/log out' component={Logout} />
          </div>
        </Router>
    )
  }
}

export default App