import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createServer} from 'miragejs';

// Create the fake mirage server
createServer({
  routes() {
    this.get('/api/users', () => [
      {id: '1', name: 'Luke'},
      {id: '2', name: 'Leia'},
      {id: '3', name: 'Anakin'},
    ]);
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
