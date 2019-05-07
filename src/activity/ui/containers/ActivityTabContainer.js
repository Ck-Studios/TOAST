import React, {Component} from "react";
import {Dimensions, View} from "react-native";
import {Container, ThemeColor} from "../../../common/Theme";
import Header from "../../../common/ui/components/Header";
import {createMaterialTopTabNavigator} from "react-navigation";
import ActivityListContainer from "./ActivityListContainer";
import HeaderWithSearchButton from "../../../common/ui/components/HeaderWithSearchButton";

const {width, height} = Dimensions.get('window');

const ActivityTab = createMaterialTopTabNavigator(
  {
    '모든 대외활동': (props) => <ActivityListContainer {...props} source={'all'}/>,
    // 'IT ': (props) => <ActivityListContainer {...props} source={'all'}/>,
    // '과학': (props) => <ActivityListContainer {...props} source={'all'}/>,
    // '사회': (props) => <ActivityListContainer {...props} source={'all'}/>,
    // '기타': (props) => <ActivityListContainer {...props} source={'all'}/>,
  },
  {
    tabBarOptions: {
      activeTintColor: ThemeColor,
      inactiveTintColor: '#868694',
      scrollEnabled: true,
      style: {
        backgroundColor: 'white',
      },
      indicatorStyle: {
        backgroundColor: ThemeColor,
        width: width * 0.25,
        padding: 1.5,
        borderRadius: 2,
        marginLeft: width * 0.025,
      },
      tabStyle: {
        width: width * 0.3,
      },
      labelStyle: {
        fontSize: 14,
        fontFamily: 'NanumSquareB',
      },
    },
  }
);


export default class ActivityTabContainer extends Component {

  render() {
    return (
      <View style={Container}>
        <HeaderWithSearchButton
          title={'공모전 및 대외활동'}
          navigation={this.props.navigation}
          searchType={'activity'}
          // secondButton={{
          //   icon: 'md-notifications',
          //   onPress: () => this.props.navigation.navigate('KeywordContainer'),
          // }}
        />
        {/*<Header title={'공모전 및 대외활동'} navigation={this.props.navigation} type={'activity'}/>*/}
        {/*<ActivityTab*/}
          {/*screenProps={{rootNavigation: this.props.navigation}}*/}
        {/*/>*/}
        <ActivityListContainer screenProps={{rootNavigation: this.props.navigation}} source={'all'}/>
      </View>
    );
  }
}