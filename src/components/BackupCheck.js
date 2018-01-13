import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Row, Column } from 'react-foundation';
import rippleAddressCodec from 'ripple-address-codec';
import sodium from 'libsodium-wrappers';

import toastImg from '../images/toast_trans.png';

@withRouter
export default class BackupCheck extends Component {
  allowedKeys = ['walletversion', 'pindata', 'ppdata', 'rpdata', 'accounts'];
  state = {
    backupText: '',
    backupCheckResult: <div />,
  };

  constructor(props) {
    super(props);
  }

  handleBackupTextChange = event => {
    this.setState(
      Object.assign({}, this.state, {
        backupText: event.target.value,
      })
    );
  };

  checkBackup = () => {
    this.setState(
      Object.assign({}, this.state, {
        backupCheckResult: this.doCheckBackup(this.state.backupText),
      })
    );
  };

  doCheckBackup = raw => {
    let errors = [];
    raw = raw.replace(/ |\r|\n/gm, '');
    raw = raw.replace(/;/gm, ':');
    raw = raw.replace(/“|”|’|‘|`|´|'/gm, '"');

    // pull off the front checksum we dont need it
    const json = raw.slice(8);
    try {
      const backup = JSON.parse(json);

      errors = Object.keys(backup)
        .map(key => {
          if (this.allowedKeys.indexOf(key) == -1) {
            return (
              <span key={key}>
                JSON key: {i} is not valid, should be one of 'walletversion',
                'pindata', 'ppdata', 'rpdata', 'accounts'
              </span>
            );
          }
          return null;
        })
        .filter(err => err != null);

      if (backup.pindata == null)
        errors = errors.concat([
          <span key="pindata-missing">pindata is missing</span>,
        ]);
      else {
        if (backup.pindata.hash == null)
          errors = errors.concat([
            <span key="pindata.hash-missing">pindata.hash is missing</span>,
          ]);
        if (backup.pindata.salt == null)
          errors = errors.concat([
            <span key="pindata.salt-missing">pindata.salt is missing</span>,
          ]);
        if (!this.isValidHex(backup.pindata.hash))
          errors = errors.concat([
            <span key="pindata.hash-invalid">pindata.hash is invalid</span>,
          ]);
        if (!this.isValidHex(backup.pindata.salt))
          errors = errors.concat([
            <span key="pindata.salt-invalid">pindata.salt is invalid</span>,
          ]);
      }

      if (backup.ppdata == null)
        errors = errors.concat([
          <span key="ppdata-missing">ppdata is missing</span>,
        ]);
      else {
        if (backup.ppdata.hash == null)
          errors = errors.concat([
            <span key="ppdata.hash-missing">ppdata.hash is missing</span>,
          ]);
        if (!this.isValidHex(backup.ppdata.hash))
          errors = errors.concat([
            <span key="ppdata.hash-invalid">ppdata.hash is invalid</span>,
          ]);
        if (backup.ppdata.salt1 == null)
          errors = errors.concat([
            <span key="ppdata.salt1-missing">ppdata.salt1 is missing</span>,
          ]);
        if (!this.isValidHex(backup.ppdata.salt1))
          errors = errors.concat([
            <span key="ppdata.salt1-invalid">ppdata.salt1 is invalid</span>,
          ]);
        if (backup.ppdata.salt2 == null)
          errors = errors.concat([
            <span key="ppdata.salt2-missing">ppdata.salt2 is missing</span>,
          ]);
        if (!this.isValidHex(backup.ppdata.salt2))
          errors = errors.concat([
            <span key="ppdata.salt2-invalid">ppdata.salt2 is invalid</span>,
          ]);
      }

      if (backup.rpdata == null)
        errors = errors.concat([
          <span key="rpdata-missing">rpdata is missing</span>,
        ]);
      else {
        if (backup.rpdata.hash == null)
          errors = errors.concat([
            <span key="rpdata.hash-missing">rpdata.hash is missing</span>,
          ]);
        if (!this.isValidHex(backup.rpdata.hash))
          errors = errors.concat([
            <span key="rpdata.hash-invalid">rpdata.hash is invalid</span>,
          ]);
        if (backup.rpdata.salt1 == null)
          errors = errors.concat([
            <span key="rpdata.salt1-missing">rpdata.salt1 is missing</span>,
          ]);
        if (!this.isValidHex(backup.rpdata.salt1))
          errors = errors.concat([
            <span key="rpdata.salt1-invalid">rpdata.salt1 is invalid</span>,
          ]);
        if (backup.rpdata.salt2 == null)
          errors = errors.concat([
            <span key="rpdata.salt2-missing">rpdata.salt2 is missing</span>,
          ]);
        if (!this.isValidHex(backup.rpdata.salt2))
          errors = errors.concat([
            <span key="rpdata.salt2-invalid">rpdata.salt2 is invalid</span>,
          ]);
      }

      Object.keys(backup.accounts).forEach(accountId => {
        try {
          const account = backup.accounts[accountId];
          rippleAddressCodec.decodeAccountID(accountId);
          if (account.ppsalt == null)
            errors = errors.concat([
              <span key="account-{accountId}-ppsalt-missing">
                Account {accountId} ppsalt is missing
              </span>,
            ]);
          if (!this.isValidHex(account.ppsalt))
            errors = errors.concat([
              <span key="account-{accountId}-ppsalt-invalid">
                Account {accountId} ppsalt is invalid
              </span>,
            ]);
          if (account.rpsalt == null)
            errors = errors.concat([
              <span key="account-{accountId}-rpsalt-missing">
                Account {accountId} rpsalt is missing
              </span>,
            ]);
          if (!this.isValidHex(account.rpsalt))
            errors = errors.concat([
              <span key="account-{accountId}-rpsalt-invalid">
                Account {accountId} rpsalt is invalid
              </span>,
            ]);
          if (account.ppsecret == null)
            errors = errors.concat([
              <span key="account-{accountId}-ppsecret-missing">
                Account {accountId} ppsecret is missing
              </span>,
            ]);
          if (!this.isValidHex(account.ppsecret))
            errors = errors.concat([
              <span key="account-{accountId}-ppsecret-invalid">
                Account {accountId} ppsecret is invalid
              </span>,
            ]);
          if (account.rpsecret == null)
            errors = errors.concat([
              <span key="account-{accountId}-rpsecret-missing">
                Account {accountId} rpsecret is missing
              </span>,
            ]);
          if (!this.isValidHex(account.rpsecret))
            errors = errors.concat([
              <span key="account-{accountId}-rpsecret-invalid">
                Account {accountId} rpsecret is invalid
              </span>,
            ]);
        } catch (e) {
          console.log(e);
          errors = errors.concat([
            <div>
              <span>
                Account {accountId} is invalid, check that it was transcribed
                correctly
              </span>
              <br />
            </div>,
          ]);
        }
      });

      if (errors.length === 0) {
        return (
          <div>
            <span className="bold">Backup is valid</span>
          </div>
        );
      }
    } catch (e) {
      console.log(e);
      let result = '';
      const myregexp = /Unexpected token e in JSON at position ([0-9]+)/m;
      const match = myregexp.exec('' + e);
      if (match != null) {
        result = 'SyntaxError: Unexpected end of JSON input';
      } else {
        result = 'An error occured';
      }
      errors = errors.concat([
        <span key="error" className="bold">
          {result}
        </span>,
      ]);
    }

    return (
      <div>
        {errors.map((err, idx) => {
          return (
            <div key={idx}>
              {err}
              <br />
            </div>
          );
        })}
      </div>
    );
  };

  isValidHex = h => {
    if (typeof h === 'object') {
      for (var i in h) {
        if (typeof h[i] === 'object' && !this.isValidHex(h[i])) return false;
        else if (!/^[a-f0-9]+$/m.test(h[i]) || !this.fromHexCheckSum(h[i]))
          return false;
      }
      return true;
    } else {
      return /^[a-f0-9]+$/m.test(h) && this.fromHexCheckSum(h);
    }
  };

  fromHexCheckSum = (hex, format) => {
    const chksum = hex.slice(0, 8);
    const payload = sodium.from_hex(hex.slice(8));
    if (sodium.crypto_generichash(4, payload, '', 'hex') != chksum)
      return false;
    if (format == 'string') return sodium.to_string(payload);
    return payload;
  };

  toggleAboutModal = () => {
    this.setState(
      Object.assign({}, this.state, {
        aboutModalOpen: !this.state.aboutModalOpen,
      })
    );
  };

  render() {
    return (
      <div>
        <Row className="container blue-container" isExpanded>
          <Column small={12} large={2}>
            <img
              className="toast-img"
              width="128px"
              height="128px"
              src={toastImg}
              alt="toastwallet"
            />
          </Column>
          <Column small={12} large={10}>
            <h1 className="header-text">ToastWallet Backup Checker</h1>
            <h4 className="header-text">
              You can use this tool to validate your ToastWallet backup.
            </h4>
          </Column>
        </Row>
        <Row className="container text-area-container" isExpanded>
          <textarea
            onChange={this.handleBackupTextChange}
            rows="10"
            cols="50"
          />
        </Row>
        <div className="validate-container">
          <Row isExpanded>
            <Column small={2} large={2} centerOnSmall centerOnLarge>
              <Button onClick={this.checkBackup}>Validate</Button>
            </Column>
          </Row>
          <Row className="text-center result-container" isExpanded>
            <Column small={12} large={11}>
              {this.state.backupCheckResult}
            </Column>
          </Row>
        </div>
      </div>
    );
  }
}
