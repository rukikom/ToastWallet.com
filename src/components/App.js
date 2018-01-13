import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import LazyRoute from 'lazy-route';
import Foundation from 'react-foundation';
import { ToastContainer } from 'react-toastify';

import Header from './Header';
import Footer from './Footer';

@withRouter
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <Header />

        <ToastContainer />
        <Route
          exact
          path="/faq"
          render={props => <LazyRoute {...props} component={import('./FAQ')} />}
        />
        <Route
          exact
          path="/backupChecker"
          render={props => (
            <LazyRoute {...props} component={import('./BackupCheck')} />
          )}
        />
        <Route
          exact
          path="*"
          render={props => (
            <LazyRoute {...props} component={import('./Home')} />
          )}
        />

        <Footer />
      </div>
    );
  }
}
