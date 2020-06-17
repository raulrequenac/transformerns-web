import React from "react"
import { Switch, Route } from "react-router-dom"
import Login from "./Login"
import "../styles/App.css"
import NotAuthenticatedRoute from "./NotAuthenticatedRoute"
import AuthenticatedRoute from "./AuthenticatedRoute"
import Home from "./Home"
import Salesreps from "./Salesreps"
import Leads from "./Leads"
import Opportunities from "./Opportunities"
import Contacts from "./Contacts"
import Accounts from "./Accounts"

function App() {
  return (
    <div className="App">
      <Switch>
        <NotAuthenticatedRoute exact path="/" component={Home} />
        <NotAuthenticatedRoute exact path="/salesreps" component={Salesreps} />
        <NotAuthenticatedRoute exact path="/leads" component={Leads}/>
        <NotAuthenticatedRoute exact path="/opportunities" component={Opportunities}/>
        <NotAuthenticatedRoute exact path="/contacts" component={Contacts}/>
        <NotAuthenticatedRoute exact path="/accounts" component={Accounts} />
        <AuthenticatedRoute exact path="/login" component={Login} />
      </Switch>
    </div>
  )
}

export default App
