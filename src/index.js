//  import React from 'react';
//  import ReactDOM from 'react-dom';
//  import App from './App';
//  import { BrowserRouter } from 'react-router-dom';

//  const root = ReactDOM.createRoot(document.getElementById('root'));
//  root.render(
//   <BrowserRouter>
//    <App/>
//   </BrowserRouter>,

//  document.getElementById('root')

// );

 import React from 'react';
 import ReactDOM from 'react-dom';
 import { BrowserRouter as Router } from 'react-router-dom'; // Router import
 import App from './App'; // App import

 ReactDOM.render(
  <Router>
    <App />
  </Router>,
   document.getElementById('root')
 );




 