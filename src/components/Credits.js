/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import React, {useState} from 'react';



const Credits = (props) => {
  const { credits, balance, updateBalance, updateCreditList} = props;
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const addCredit = (e) => {
    e.preventDefault();
    const newCredit = {
      id: credits.length + 1,
      description: description,
      amount: amount,
      date: new Date().toLocaleString()
    };
    updateCreditList([...credits, newCredit]);
    updateBalance(balance + parseInt(amount));
  }


  return (
    <div style={{textAlign: 'center'}}>
      <h1>Credits</h1>
      <ul style={{listStyle: 'none', paddingLeft: 0, textAlign: 'center'}}>
        {credits.map((credit) => {
          return (
            <li key={credit.id}>
              <div className='credit-item'>
              <strong>Description:</strong> {credit.description} <br/>
              <strong>Amount:</strong> ${credit.amount} <br/>
              <strong>Date:</strong> {credit.date} <br/>
              <br/>
              </div>
            </li>
          );
        })}
      </ul>
      <br/>
      <AccountBalance accountBalance={balance}/>
      <div className='add-credit'>
        {/* <h3>Add Credit</h3> */}
        <form onSubmit={addCredit}>
          <label>
            Description:
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
          </label>
          <label>
            Amount:
            <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)}/>
          </label>
          <button type='submit'>Add Credit</button>
        </form>
        </div>
      <Link to="/">Return to Home</Link>
    </div>
  );
}







export default Credits;