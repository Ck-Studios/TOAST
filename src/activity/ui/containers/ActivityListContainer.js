import React, {Component} from "react";
import {View} from "react-native";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {
  showContentFilterMenu,
  setContentFilter,
  hideContentFilterMenu,
} from "../../../common/commonService";
import {Container} from "../../../common/Theme";
import ContentFilter from "../../../common/ui/components/Content/ContentFilter";
import ContentFilterMenu from "../../../common/ui/components/Content/ContentFilterMenu";
import ActivityListApollo from "../components/ActivityListApollo";

@observer
export default class ActivityListContainer extends Component {
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
          filter={this.filter.name}
        />
        <ActivityListApollo
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
