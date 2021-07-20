import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CourseContextProvider } from './context/CourseContext';

ReactDOM.render(
  <React.StrictMode>
    <CourseContextProvider>
      <App />
    </CourseContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
