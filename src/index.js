import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./components/main.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
document.getElementById('root')
);

reportWebVitals();

