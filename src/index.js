import React from 'react';
import { render } from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Gamedev from './routes/Gamedev.js'
import Contact from './routes/Contact.js'

const rootElement = document.getElementById("root");
render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="gamedev" element={<Gamedev />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </Router>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
