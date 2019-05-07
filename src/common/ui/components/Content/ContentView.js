import React, {Component} from 'react';
import {StyleSheet, View, Linking, Dimensions, Text} from 'react-native';
import HTML from "react-native-render-html";
import {ContentText, DebugLayout, SmallContentText} from "../../../Theme";
import {purifyHTML, textToHTML} from "../../../../utils/ContentFilter";
import {openURL} from "../../../../utils/Intent";
import _ from "lodash";

const {width} = Dimensions.get('window');
export default class ContentView extends Component {
  render() {
    let {content} = this.props;
    // content = textToHTML(content);
    content = purifyHTML(content);
    // console.warn(content);
    return (
      <View style={this.props.style}>
        <HTML
          html={content}
          textSelectable={true}
          baseFontStyle={{
            ...ContentText,
            lineHeight: 22,
          }}
          ignoredStyles={['font-family', 'line-height', 'letter-spacing', 'width', 'height']}
          imagesMaxWidth={width * 0.80}
          onLinkPress={(evt, href, htmlAttribs) => {
            openURL(href);
          }}

          // renderers={{
          //   pre: (htmlAttribs, children, convertedCSSStyles, passProps, {key}) => {
          //     console.warn(children);
          //     return <Text key={key} style={convertedCSSStyles}>{children}</Text>
          //   }
          // }}
        />
      </View>
    )
  }
}