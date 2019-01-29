import {
  Image,
  StyleSheet,
  CameraRoll,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Permissions } from 'expo';
import React, { Component } from 'react';

import Grid from './Grid';

const keyExtractor = ({ uri }) => uri;

export default class ImageRoll extends Component {
  static propTypes = {
    onPressImage: PropTypes.func,
  };

  static defaultProps = {
    onPressImage: () => {},
  };

  // Not Stateful: Doesn't directly affect component rendering
  loading = false;
  cursor = null;

  state = {
    images: [],
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = async after => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }

    const results = await CameraRoll.getPhotos({ first: 20, });

    const { edges } = results;

    const loadedImages = edges.map(item => item.node.image);

    this.setState({ images: loadedImages });
  }

  getNextImages = () => {
    if (!this.cursor) return;

    this.getImages(this.cursor);
  };

  renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return (
      <Image source={{ uri }} style={style} />
    );
  };

  render() {
    const { images } = this.state;

    return (
      <Grid
        data={images}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        onEndReached={this.getNextImages}
      />
    );
  }

}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});


/*
  Code for State's Test Images:

  images: [
    { uri: 'https://picsum.photos/600/600?image=10' },
    { uri: 'https://picsum.photos/600/600?image=20' },
    { uri: 'https://picsum.photos/600/600?image=30' },
    { uri: 'https://picsum.photos/600/600?image=40' },
  ],

*/
