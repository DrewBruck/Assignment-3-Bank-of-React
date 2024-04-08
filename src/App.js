/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  updateCreditList = (newCredit) => {
    this.setState({
      creditList: [...this.state.creditList, newCredit]
    });
  }

  updateBalance = (newBalance) => {
    this.setState({
      accountBalance: newBalance
    });
  }

  calculateAccountBalance = () => {
    const totalCredits = this.state.creditList.reduce((totalCredits, credit) => totalCredits + credit.amount, 0);
    const totalDebits = this.state.debitList.reduce((totalDebits, debit) => totalDebits + debit.amount, 0);
    return totalCredits - totalDebits;
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }



  // Update state's accountBalance after "Credit" or "Debit" button is clicked
  addCredit = (credit) => {
    let newBalance = this.state.accountBalance + credit.amount;
    this.setState({
      accountBalance: newBalance
    });
  }

  addDebit = (debit) => {
    let newBalance = this.state.accountBalance - debit.amount;
    this.setState({
      accountBalance: newBalance
    });
  }


  // Fetch credit and debit data from API
  componentDidMount() {
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({creditList: data}, () => {
          this.calculateAccountBalance()})
      }).then(() => {
        fetch('https://johnnylaicode.github.io/api/debits.json')
        .then((response) => response.json())
        .then((data) => {
          this.setState({debitList: data}, () => {
            this.calculateAccountBalance()})
          })
      });


  }

  



  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits 
      credits={this.state.creditList} 
      balance={this.state.accountBalance}
      updateBalance={this.updateBalance}
      updateCreditList={this.updateCreditList}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/my-react-app">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;