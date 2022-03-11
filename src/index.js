import React from 'react';
import { render } from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Gamedev from './routes/Gamedev.js'
import Design from './routes/Design.js'
import Biology from './routes/Design.js'

const rootElement = document.getElementById("root");
render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="gamedev" element={<Gamedev />} />
        <Route path="design" element={<Design />} />
        <Route path="biology" element={<Biology />} />
      </Routes>
    </Router>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
