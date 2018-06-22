import React from 'react';
import Proptypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const AlertBox = ({ title, message, type }) => (
  <Alert bsStyle={type}>
    <h4>{title}</h4>
    {message ? <p>{message}</p> : null}
  </Alert>
);

AlertBox.defaultProps = {
  message: null,
};

AlertBox.propTypes = {
  title: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  message: Proptypes.string,
};

export default AlertBox;
