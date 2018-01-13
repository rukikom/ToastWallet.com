import React, { Component } from 'react';
import { Button, Colors, Row, Column } from 'react-foundation';
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';

import toastImg from '../images/toast_trans.png';
import faqContent from '../assets/faq.json';

export default class FAQ extends Component {
  constructor(props) {
    super(props);
  }

  renderRow = (entry, idx) => {
    const question = entry.q;
    const answer = entry.a;

    return (
      <Row key={question} className="block" isExpanded>
        <Column small={12} large={12}>
          <div className="question-block">
            <h5 className="question-letter">Q{idx + 1}:</h5>
            <h5 className="question">{question}</h5>
          </div>
          <p
            className="dark-text"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </Column>
      </Row>
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
            <h1 className="header-text">ToastWallet FAQ</h1>
            <h4 className="header-text">
              Answers to many frequently ask questions.
            </h4>
          </Column>
        </Row>
        <Row className="container" isExpanded>
          {faqContent.map((entry, idx) => this.renderRow(entry, idx))}
        </Row>
      </div>
    );
  }
}
