import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';

@withRouter
export default class AboutModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Modal.setAppElement('#root');
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="About"
        className="dark-text"
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
          },
        }}
      >
        <div className="dark-text">
          <h2>StarStone Limited (NZ)</h2>
          <p className="about-text">
            <a target="_blank" href="https://starstone.co.nz/">
              StarStone Limited
            </a>
            (6337452) is a software start-up based in Dunedin, New Zealand
            focused on IP development in niche markets. Our free and open source
            XRP wallet software is produced with the intention of cultivating
            our brand. To this end we hope that Toast Wallet becomes a widely
            known and respected crypto-currency brand in the near future. We
            intend to leverage this IP to provide a range of related
            business-facing services.
          </p>
          <p className="about-text">
            <a
              target="_blank"
              href="https://toastwallet.com/download/misc/Certificate%20of%20Incorporation.pdf"
            >
              Certificate of Incorporation
            </a>
          </p>
          <p className="about-text">
            Investor enquiries:
            <a href="mailto:invest@starstone.co.nz">invest@starstone.co.nz</a>
            <br />
            Employment enquiries:
            <a href="mailto:jobs@starstone.co.nz">jobs@starstone.co.nz</a>
            <br />
            All other enquiries:
            <a href="mailto:support@starstone.co.nz">support@starstone.co.nz</a>
          </p>
          <p className="about-text">Director: Richard Holland</p>
          <p className="about-text">
            C/- Mornington PO, Dunedin, New Zealand, 9011
          </p>
        </div>
      </Modal>
    );
  }
}
