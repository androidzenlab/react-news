import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from './reducers';
import ArticlesIndex from './components/articles_index'
import ArticleShow from './components/article_show'
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/news/:title" component={ArticleShow} />
          <Route path="/" component={ArticlesIndex} />
        </Switch>
      </div>
    </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'));
