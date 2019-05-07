import React, {Component} from "react";
import {View, StyleSheet, Alert, Text} from "react-native";
import Header from "../../../common/ui/components/Header";
import {scrollableTabBarOptions} from "../../../application/Navigator";
import {observer} from "mobx-react"
import {extendObservable, observable, action} from "mobx"
import {createMaterialTopTabNavigator} from "react-navigation";
import _ from "lodash";
import NoticeListContainer from "./NoticeListContainer";
import {GET_NOTICE_SUBSCRIPTION} from "../../../utils/ApolloQuery";
import client from "../../../utils/ApolloClient";
import NoticeSettingContainer from "./NoticeSettingContainer";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import HeaderWithSearchButton from "../../../common/ui/components/HeaderWithSearchButton";

@observer
export default class NoticeTabContainer extends Component {
  @observable NoticeTabObject = {};
  @observable NoticeTab;
  @observable preset;
  @observable loaded = false;
  @observable mode;

  addToNoticeTabList(item) {
    let obj = {};
    obj[item.name] = props => <NoticeListContainer {...props} source={item.source}/>;
    extendObservable(this.NoticeTabObject, obj);
  }

  componentWillMount() {
    if (this.props.navigation.state.params)
      this.mode = this.props.navigation.state.params.mode;
    this.loadPreset();
  }


  loadPreset() {
    client.getInstance().query({query: GET_NOTICE_SUBSCRIPTION, fetchPolicy: 'network-only'})
      .then((response) => {
        this.preset = response.data.suitedNoticeSources;
        _.forEach(this.preset, (item) => this.addToNoticeTabList(item));
        this.NoticeTab = createMaterialTopTabNavigator(this.NoticeTabObject, scrollableTabBarOptions);
        this.loaded = true
      })
      .catch((error) => {
        console.warn(error);
        this.loaded = true
      });
  }

  @action
  onSettingComplete(newPreset) {
    this.preset = newPreset;
    this.NoticeTabObject = {};
    _.forEach(this.preset, (item) => this.addToNoticeTabList(item));
    this.NoticeTab = createMaterialTopTabNavigator(this.NoticeTabObject, scrollableTabBarOptions);
    this.mode = 'list';
  }

  render() {
    if (this.mode === 'edit') {
      return <View style={styles.container}>
        <Header title={'공지사항'} navigation={this.props.navigation}
                secondButton={{
                  icon: 'notifications',
                  onPress: () => this.props.navigation.navigate('KeywordContainer'),
                }}
        />
        <NoticeSettingContainer mode={this.mode} onSettingCompelete={this.onSettingComplete.bind(this)}/>
      </View>
    }
    else if (this.loaded && !this.preset.length) {
      return (
        <View style={styles.container}>
          <Header title={'공지사항'} navigation={this.props.navigation}
                  secondButton={{
                    icon: 'notifications',
                    onPress: () => this.props.navigation.navigate('KeywordContainer'),
                  }}
          />
          <NoticeSettingContainer mode={this.mode} onSettingCompelete={this.onSettingComplete.bind(this)}/>
        </View>
      )
    }
    else if (this.loaded && this.preset.length) {
      return (
        <View style={styles.container}>
          <HeaderWithSearchButton
            title={'공지사항'}
            navigation={this.props.navigation}
            searchType={'notice'}
            secondButton={{
              icon: 'md-notifications',
              onPress: () => this.props.navigation.navigate('KeywordContainer'),
            }}
          />
          <this.NoticeTab
            screenProps={{rootNavigation: this.props.navigation}}
          />
        </View>
      );
    }
    else return <LoadingIndicator/>
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});