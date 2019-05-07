import React, {Component} from "react";
import {View, StyleSheet, FlatList, TouchableOpacity, Text, Alert} from "react-native"
import {ContentText, Shadow, ThemeColor} from "../../../common/Theme";
import TransparentCardItem from "../../../common/ui/components/TransparentCardItem";
import WidgetShell from "../../../common/ui/components/WidgetShell";
import {observer} from "mobx-react";
import {observable} from "mobx";
import luna from "../../../utils/Luna";

@observer
export default class ToastNoticeWidget extends Component {
  @observable showNotice = false;
  @observable title = '';
  @observable message = '';
  @observable url = '';

  componentDidMount() {
    luna.get('https://luna.toast.one/status/notice')
      .then((response) => {
        response = response.data;
        if (response.result === 'ok') {
          this.title = response.title;
          this.message = response.message;
          this.url = response.url;

          this.showNotice = true;
        } else {
          this.showNotice = false;
        }
      })
      .catch((error) => {
        this.showNotice = false;
      });
  }

  render() {
    if (!this.showNotice)
      return null;
    else return (
      <TouchableOpacity
        onPress={() => {
          if (this.url) {
            this.props.navigation.navigate('WebBrowserContainer',
              {
                title: this.title,
                uri: this.url,
              });
          }
        }}>
        <WidgetShell
          title={this.title}
          navigation={this.props.navigation}>
          <Text style={styles.text}>{this.message}</Text>
        </WidgetShell>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Shadow,
    marginBottom: 20,
    backgroundColor: 'white',
  },

  text: {
    ...ContentText,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
  }
});