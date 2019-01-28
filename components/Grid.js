import {
  FlatList,
  Dimensions,
  StyleSheet,
  PixelRatio,
} from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Grid extends Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    numColumns:PropTypes.number,
    itemMargin:PropTypes.number,
  };

  static defaultProps = {
    numColumns: 4,
    itemMargin: StyleSheet.hairlineWidth,
  };

  renderGridItem = info => {};

  render() {
    return (
      <FlatList
        {...this.props}
        renderItem={this.renderGridItem} 
      />
    );
  }

}
