import React, { Component } from 'react';
import './App.css';

const serverPort = 3001;
const serverURL = `http://localhost:${serverPort}/`;

class CustomerApp extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      timestamp: null,
      customers: null,
      customer: null,
      loading: false,
      errorMessage: null,
      searchHistory: []  // اضافه کردن تاریخچه جستجو
    };
  }

  async getCustomer(customer) {
    this.setState({ customer });
  }

  async getCustomers() {
    const userName = document.getElementById("name").value;
    if (!userName || userName === "") {
      alert("Please provide your name");
      return;
    }

    const axios = require('axios');
    const server = axios.create({
      baseURL: serverURL
    });

    this.setState({ loading: true, errorMessage: null });

    try {
      const response = await server.post('/', { name: userName });
      const { name, timestamp, customers } = response.data;
      this.setState({
        name, timestamp, customers,
        loading: false,
        searchHistory: [{ name, timestamp, customers }, ...this.state.searchHistory]  // افزودن به تاریخچه
      });
    } catch (error) {
      this.setState({ errorMessage: "Error fetching data from server", loading: false });
    }
  }

  render() {
    return (
      <div>
        {!this.state.name &&
          <div>
            <h2>Welcome to the Customer Management App</h2>
            <p>Please enter your name to proceed:</p>
            <input type="text" id="name" data-testid="name" />
            <input type="button" value="Submit" data-testid="submit-btn" onClick={this.getCustomers.bind(this)} />
          </div>
        }
        {this.state.loading && <div className="loading">Loading, please wait...</div>}
        {this.state.errorMessage && <div className="error-message">{this.state.errorMessage}</div>}
        {this.state.name &&
          <div>
            <p>Hi <b>{this.state.name}</b>. It is now <b>{this.state.timestamp}</b> and here is our customer list:</p>
            {!this.state.customer &&
              <div>
                <p>Click on each customer to view their contact details.</p>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th># of Employees</th>
                      <th>Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.customers.map(customer =>
                      <tr key={customer.id}>
                        <td><a href="#" onClick={() => this.getCustomer(customer)}>{customer.name}</a></td>
                        <td>{customer.employees}</td>
                        <td>{customer.size}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            }
            {this.state.customer &&
              <div className="customer-details">
                <hr />
                <p><b><em>Customer Details</em></b></p>
                <p><b>Name:</b> {this.state.customer.name}</p>
                <p><b># of Employees:</b> {this.state.customer.employees}</p>
                <p><b>Size:</b> {this.state.customer.size}</p>
                {this.state.customer.contactInfo ? 
                  <p><b>Contact:</b> {this.state.customer.contactInfo.name} ({this.state.customer.contactInfo.email})</p> :
                  <p>No contact info available</p>
                }
                <input type="button" value="Back to the list" onClick={() => this.setState({ customer: null })} />
              </div>
            }
          </div>
        }
        <div className="search-history">
          <h3>Recent Searches</h3>
          <ul>
            {this.state.searchHistory.map((entry, index) => (
              <li key={index} onClick={() => this.setState({ name: entry.name, timestamp: entry.timestamp, customers: entry.customers })}>
                {entry.name} - {entry.timestamp}
              </li>
            ))}
          </ul>
        </div>

        {/* نمایش نام‌های سه‌گانه در پایین صفحه */}
        <div className="team-names">
          <p>Developed by:</p>
          <ul>
            <li>Samiullah Shirani</li>
            <li>Wais Ahmad</li>
            <li>Nasratullah</li>
          </ul>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <h1>Welcome to Customer App</h1>
      <CustomerApp />
    </div>
  );
}

export default App;
