import React from 'react';
import { connect } from 'react-redux';

class _DataLoader extends React.Component {
  componentDidMount() {
    // TODO: Load data
  }

  render() {
    return null;
  }
}

export const DataLoader = (() => {
  const mapStateToProps = {};

  const { loadAllSites } = require('../../actions/volta_actions');

  const mapDispatchToProps = {};

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(_DataLoader);
})();
