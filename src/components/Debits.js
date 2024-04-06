import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  const [debits, setDebits] = useState([]);
  const [newDebit, setNewDebit] = useState({ amount: '', description: '' });

  // Fetch data from professor's API. make sure you use the link for credits
  useEffect(() => {
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then(response => response.json())
      .then(data => setDebits(data))
      .catch(error => console.error('Error fetching debits:', error));
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDebit(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDebitWithDate = {
      ...newDebit,
      date: new Date().toISOString()
    };
    setDebits(prevDebits => [...prevDebits, newDebitWithDate]);
    setNewDebit({ amount: '', description: '' });
  };

  //Render the list of Debit items in a grid layout
  //edited the css document to make this legible and not crazy looking haha
  const debitsGrid = () => {
    return (
      <div className="d-flex">
      <div className="debits-grid">
        <div className="debit-row">
          <div className="debit-column">
            <p><b><u>Amount</u></b></p>
            {debits.map((debit, index) => (
              <p key={index}>{debit.amount}</p>
            ))}
          </div>
          <div className="debit-column">
            <p><b><u>Description</u></b></p>
            {debits.map((debit, index) => (
              <p key={index}>{debit.description}</p>
            ))}
          </div>
          <div className="debit-column">
            <p><b><u>Date</u></b></p>
            {debits.map((debit, index) => (
              <p key={index}>{debit.date.slice(0, 10)}</p>
            ))}
          </div>
        </div>
      </div>
      </div>
    );
  };


  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsGrid()}

      <form onSubmit={handleSubmit}>
        <input type="text" name="description" placeholder="Enter Description" value={newDebit.description} onChange={handleInputChange} />
        <input type="number" name="amount" placeholder="Enter Amount" value={newDebit.amount} onChange={handleInputChange} />
        <button type="submit">Add Debit</button>
      </form>

      <br />
      <Link to="/">Return to Home</Link>
      <br />
      <br />
      <br />
      <AccountBalance accountBalance={props.accountBalance} />
    </div>
  );
};

export default Debits;
