import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

