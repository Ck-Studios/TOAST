import React, {Component} from 'react';
import Icon from "react-native-vector-icons/Feather"

import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ViewPropTypes,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import LabelSet from "../../../common/ui/components/Etc/LabelSet";
import {searchStore} from "../../SearchStore";
import {observer} from "mobx-react"
import {GrayTextColor, Shadow} from "../../../common/Theme";
import {observable} from "mobx";

@observer
export default class SearchBar extends Component {
  @observable keyword;

  onEnter = () => {
    this.props.onEnter(this.keyword)
  };

  render() {

    // if (mode === "presentation") {
    //   return (
    //     <TouchableWithoutFeedback
    //       onPress={() => navigation.navigate('SearchContainer')}
    //     >
    //       <View style={styles.container}/>
    //     </TouchableWithoutFeedback>
    //   );
    // }

    return (
      <View style={styles.container}>
        <Icon name={'search'} style={styles.icon} size={18} color={GrayTextColor}/>

        <TextInput
          style={styles.input}
          placeholder={'검색어를 입력하세요'}
          // placeholder={searchStore.placeholder.title}
          underlineColorAndroid={'transparent'}
          onChangeText={(keyword) => {
            this.keyword = keyword;
          }}
          value={this.keyword}
          onSubmitEditing={this.onEnter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,

    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,

    flexDirection: 'row',
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',

    ...Shadow,
  },

  labelSet: {},

  icon: {
    alignSelf: 'center',
    margin: 10,
    marginRight: 10,
  },

  input: {
    paddingLeft: 15,

    flex: 1,
    fontSize: 17,
    color: 'black',
    fontFamily: 'NanumSquareR',
  },

  label: {
    height: 10,
    width: 20,
    borderWidth: 1,
    borderColor: 'red',
  },

  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});