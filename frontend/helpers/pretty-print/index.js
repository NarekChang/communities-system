/* eslint-disable */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pre = function Pre(props) {
  return process.env.DEBUG === 'true' ? _react2.default.createElement(
    'pre',
    { style: { 'wordWrap': 'break-word' } },
    JSON.stringify(props.data, null, 2)
  ) : null;
};

Pre.propTypes = {
  data: _propTypes2.default.shape({}).isRequired
};

exports.default = Pre;
