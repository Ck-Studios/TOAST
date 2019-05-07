import React, {Component} from "react";
import {StyleSheet, View, Button} from "react-native";
import ContentFilter from "../../../common/ui/components/Content/ContentFilter";
import {
  showContentFilterMenu,
  setContentFilter,
  hideContentFilterMenu,

} from "../../../common/commonService";
import {observer} from "mobx-react";
import {observable} from "mobx";
import ContentFilterMenu from "../../../common/ui/components/Content/ContentFilterMenu";
import NoticeListApollo from "./NoticeListApollo";
import {Container} from "../../../common/Theme";


@observer
export default class NoticeListContainer extends Component {
  @observable filterMenuVisible = false;
  @observable controlledComponentVisible = true;
  @observable filter = {
    name: '최신순',
    sort: '-created_datetime'
  };

  render() {
    return (
      <View style={Container}>
        <ContentFilter
          visible={this.controlledComponentVisible}
          onPress={showContentFilterMenu.bind(this)}
          filter={this.filter.name}/>
        <NoticeListApollo
          source={this.props.source}
          sort={this.filter.sort}
          navigation={this.props.screenProps.rootNavigation}
        />
        <ContentFilterMenu
          visible={this.filterMenuVisible}
          onSelectFilterMenu={setContentFilter.bind(this)}
          onClicksHideButton={hideContentFilterMenu.bind(this)}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({});
