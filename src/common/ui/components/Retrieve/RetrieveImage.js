import React, {Component} from "react"
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Dimensions, Image, View, StyleSheet} from "react-native";

const {width} = Dimensions.get('window');

@observer
export default class RetrieveImage extends Component {
  @observable imageUri;
  @observable imageHeight;

  componentWillMount() {
    this.renderPoster(this.props.uri);
  }

  renderPoster(uri) {
    if (uri) {
      this.imageUri = {uri: uri};
      Image.getSize(uri,
        (imageWidth, imageHeight) => {
          imageHeight = imageHeight / (imageWidth / width);
          this.imageHeight = imageHeight * 0.85;
        });
    }
    else {
      this.imageUri = require('../../../../../static/notice_gradient.png');
      this.imageHeight = 140;
    }
  }


  render() {
    const imageWrapperStyle = [styles.imageWrapper, {height: this.imageHeight}];
    const retrieveImageStyle = [styles.retrieveImage, {height: this.imageHeight}];
    return (
      <View style={imageWrapperStyle}>
        <Image
          style={retrieveImageStyle}
          resizeMode={'stretch'}
          source={this.imageUri}
        />
      </View>


    )
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    width: width * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderBottomLeftRadius: 5,
  },

  retrieveImage: {
    width: width * 0.85,
    borderBottomLeftRadius: 5,
    alignSelf: 'flex-end',
  },
});
