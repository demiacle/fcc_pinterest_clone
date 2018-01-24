import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { unregister } from './registerServiceWorker';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(<App />,
  document.getElementById('root'));
//registerServiceWorker();

unregister();