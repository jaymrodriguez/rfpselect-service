import React from 'react';
import Proptypes from 'prop-types';
import { Alert, ListGroup, ListGroupItem } from 'react-bootstrap';

const mapMesssage = messageArray => (
  <ListGroup>
    {messageArray.map((item, index) => (
      <ListGroupItem bsStyle="danger" key={index}>
        {item}
      </ListGroupItem>
    ))}
  </ListGroup>
);

const AlertBox = ({ title, message, type }) => (
  <Alert bsStyle={type}>
    <h4>{title}</h4>
    {message.length > 0 ? mapMesssage(message) : null}
  </Alert>
);

AlertBox.defaultProps = {
  message: [],
};

AlertBox.propTypes = {
  title: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  message: Proptypes.arrayOf(Proptypes.string),
};

export default AlertBox;
