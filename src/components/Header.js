import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { Menu, MenuItem } from 'react-foundation';
import ActiveLink from './ui/ActiveLink';

@withRouter
export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar">
        <Menu>
          <ActiveLink to={'/'} activeOnlyWhenExact>
            <MenuItem>Home</MenuItem>
          </ActiveLink>
          <ActiveLink to={'/faq'} activeOnlyWhenExact>
            <MenuItem>FAQ</MenuItem>
          </ActiveLink>
          <ActiveLink to={'/backupChecker'} activeOnlyWhenExact>
            <MenuItem>Backup Checker</MenuItem>
          </ActiveLink>
        </Menu>
      </div>
    );
  }
}
