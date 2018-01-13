import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, MenuItem, Row, Column } from 'react-foundation';
import FaMoney from 'react-icons/lib/fa/money';

import AboutModal from './modals/AboutModal';

import tipsImg from '../images/tips.png';
import discordIcon from '../images/discord.png';
import twitterIcon from '../images/twitter.png';
import facebookIcon from '../images/facebook.png';

@withRouter
export default class Footer extends Component {
  state = {
    aboutModalOpen: false,
  };
  constructor(props) {
    super(props);
  }

  toggleAboutModal = () => {
    this.setState(
      Object.assign({}, this.state, {
        aboutModalOpen: !this.state.aboutModalOpen,
      })
    );
  };

  render() {
    return (
      <footer className="footer">
        <Row className="container black-container footer-container" isExpanded>
          <Column small={12} large={6} offsetOnLarge={1}>
            <Menu isVertical>
              <MenuItem>
                <img
                  className="icon-img"
                  src={discordIcon}
                  alt="discord"
                  width="24px"
                  height="24px"
                />
                <a
                  className="footer-link"
                  target="_blank"
                  href="https://toastwallet.com/discord"
                >
                  Join our discord!
                </a>
              </MenuItem>
              <MenuItem>
                <img
                  className="icon-img"
                  src={twitterIcon}
                  alt="twitter"
                  width="24px"
                  height="24px"
                />
                <a
                  className="footer-link"
                  target="_blank"
                  href="https://twitter.com/ToastWallet"
                >
                  Follow us on Twitter
                </a>
              </MenuItem>
              <MenuItem>
                <img
                  className="icon-img"
                  src={facebookIcon}
                  alt="facebook"
                  width="24px"
                  height="24px"
                />
                <a
                  className="footer-link"
                  target="_blank"
                  href="https://facebook.com/ToastWallet"
                >
                  Like us on Facebook
                </a>
              </MenuItem>
              <MenuItem>
                <FaMoney color="#036903" size={26} className="icon-img" />
                <a className="footer-link" target="_blank" href={tipsImg}>
                  Donate: rToastMYRQh8boeo5Ys1CnPySmt3c9x3Y
                </a>
              </MenuItem>
            </Menu>
          </Column>
        </Row>
        <AboutModal
          isOpen={this.state.aboutModalOpen}
          closeModal={this.toggleAboutModal}
        />
        <Row className="black-container copyright-container" isExpanded>
          <Column className="center">
            <p className="clickable" onClick={this.toggleAboutModal}>
              © Copyright StarStone Limited 2017
            </p>
          </Column>
        </Row>
      </footer>
    );
  }
}
