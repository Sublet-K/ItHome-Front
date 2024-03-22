import React from 'react';
import Card from 'react-credit-cards-2';
import * as s from '@shared/components/styles/Public.styles.js';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
  formatPassword,
} from './utils';

import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { TextField } from '@mui/material';

export default class PaymentForm extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
    password: '',
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    } else if (target.name === 'cardpassword') {
      target.value = formatPassword(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };
  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment" className="mt-4">
        <div className="flex justify-between">
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <TextField
                id="standard-size-small"
                size="small"
                label="카드 번호"
                variant="standard"
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <TextField
                id="standard-size-small"
                size="small"
                label="성함"
                variant="standard"
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <TextField
                  id="standard-size-small"
                  size="small"
                  label="만료일"
                  variant="standard"
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <TextField
                  id="standard-size-small"
                  size="small"
                  label="CVC"
                  variant="standard"
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <TextField
                  id="standard-size-small"
                  size="small"
                  label="비밀번호 앞 두자리"
                  variant="standard"
                  type="tel"
                  name="cardpassword"
                  className="form-control"
                  pattern="\d{0,9}"
                  placeholder="카드 비밀번호 앞 두자리"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <TextField
              id="standard-size-small"
              size="small"
              label="성함"
              variant="standard"
              type="hidden"
              name="issuer"
              value={issuer}
            />

            <div className="form-actions flex justify-end">
              <s.NormalButton>PAY</s.NormalButton>
            </div>
          </form>
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
