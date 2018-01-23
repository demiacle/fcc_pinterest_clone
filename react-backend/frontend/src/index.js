import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(<BrowserRouter>
  <Switch>
    <Route exact path='/' component={App} />
    <Route path='/posts-by/:user' component={App} />}/>
  </Switch>
</BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
