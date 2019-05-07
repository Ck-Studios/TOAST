import {
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator, TabBarTop,
} from "react-navigation";
import ActivityRetrieveContainer from "../activity/ui/containers/ActivityRetrieveContainer";
import ArchiveContainer from "../archive/ui/containers/ArchiveContainer";
import DashboardContainer from "../dashboard/ui/containers/DashboardContainer";
import NoticeRetrieveContainer from "../notice/ui/containers/NoticeRetrieveContainer";
import SearchContainer from "../search/ui/containers/SearchContainer";
import DashboardCustomizeContainer from "../dashboard/ui/containers/DashboardCustomizeContainer";
import MyQuestionContainer from "../knowledge/ui/containers/MyQuestionContainer";
import MyAnswerContainer from "../knowledge/ui/containers/MyAnswerContainer";
import DrawerContentComponents from "./components/DrawerContentComponents";
import KnowledgeTabContainer from "../knowledge/ui/containers/KnowledgeTabContainer";
import React, {Component} from "react";
import PolicyContainer from "../policy/ui/containers/PolicyContainer";
import PolicyRetrieveContainer from "../policy/ui/containers/PolicyRetrieveContainer";
import NoticeTabContainer from "../notice/ui/containers/NoticeTabContainer";
import ActivityTabContainer from "../activity/ui/containers/ActivityTabContainer";
import {DebugLayout, GrayTextColor, Shadow, ThemeColor} from "../common/Theme";
import {Dimensions, View, TouchableOpacity, Text, Platform, SafeAreaView} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import FacilityContainer from "../facility/ui/containers/FacilityContainer";
import LikeListContainer from "../archive/ui/containers/LikeListContainer";
import ViewListContainer from "../archive/ui/containers/ViewListContainer";
import {tdiStore} from "../tdi/TdiStore";
import TdiFab from "../tdi/ui/components/TdiFab";
import TdiMessage from "../tdi/ui/components/TdiMessage";
import RootTabComponent from "./components/RootTabComponent";
import {tdiService} from "../tdi/TdiService";
import WebBrowserContainer from "../common/ui/containers/WebBrowserContainer";
import IntroContainer from "../intro/ui/containers/IntroContainer";
import UpdateProfileContainer from "../user/ui/containers/UpdateProfileContainer";
import ShuttleBusContainer from "../etc/ui/containers/ShuttleBusContainer";
import SchoolMealContainer from "../etc/ui/containers/SchoolMealContainer";
import AlarmListContainer from "../archive/ui/containers/AlarmListContainer";
import KeywordContainer from "./KeywordContainer";
import SuggestionContainer from "../etc/ui/containers/SuggestionContainer";
import firebase from "react-native-firebase";
import SplashContainer from "../common/ui/containers/SplashContainer";
import NavigationService from "./NavigationService";
import IcampusArticleListContainer from "../icampus/ui/containers/IcampusArticleListContainer";
import IcampusSubjectListContainer from "../icampus/ui/containers/IcampusSubjectListContainer";
import IcampusRetrieveContainer from "../icampus/ui/containers/IcampusRetrieveContainer";
import SchoolScheduleContainer from "../etc/ui/containers/SchoolScheduleContainer";
import {applicationStore} from "./ApplicationStore";

const {width, height} = Dimensions.get('window');

export const tabBarOptions = {
  tabBarOptions: {
    activeTintColor: ThemeColor,
    inactiveTintColor: '#868694',
    style: {
      backgroundColor: 'white',
    },

    indicatorStyle: {
      backgroundColor: ThemeColor,
      padding: 1.5,
      borderRadius: 2,
      width: width * 0.2222,
      marginLeft: width * 0.0666,

    },
    labelStyle: {
      fontSize: 14,
      fontFamily: 'NanumSquareB',
    },
  },
};

export const scrollableTabBarOptions = {
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
};

const viewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 40,
};

const textStyle = {
  fontFamily: 'NanumSquareB',
  color: ThemeColor,
  fontSize: 12,
};


export const RootTab = createMaterialTopTabNavigator({
    Dashboard: {
      screen: DashboardContainer,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <View style={[viewStyle, {marginRight: 30}]}>
            <Icon name={'ios-clipboard'} color={tintColor} size={24}/>
            {focused ?
              <Text style={textStyle}>대시보드</Text> : null}
          </View>
        )
      }
    },
    Archive: {
      screen: ArchiveContainer,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <View style={[viewStyle, {marginLeft: 30}]}>
            <Icon name={'ios-folder-open'} color={tintColor} size={24}/>
            {focused ?
              <Text style={textStyle}>아카이브</Text> : null}
          </View>
        )
      }
    },
  }, {
    initialRouteName: 'Dashboard',
    tabBarComponent: RootTabComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: ThemeColor,
      inactiveTintColor: GrayTextColor,
      iconStyle: {
        width: 60,
        height: 40,
      },
      style: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 60,
        ...Shadow,
      },
      indicatorStyle: {
        height: 0,
      },
      showIcon: true,
      showLabel: false,
      pressColor: ThemeColor,
    }
  }
);


export const RootDrawer = createDrawerNavigator({
    Home: RootTab,
  },
  {
    drawerWidth: width * 0.85,
    contentComponent: DrawerContentComponents,
  });


const RootStackNavigator = createStackNavigator({
  RootDrawer: RootTab,
  SplashContainer: SplashContainer,
  NoticeTabContainer: NoticeTabContainer,
  NoticeRetrieveContainer: NoticeRetrieveContainer,
  ActivityTabContainer: ActivityTabContainer,
  ActivityRetrieveContainer: ActivityRetrieveContainer,
  SearchContainer: SearchContainer,
  KnowledgeTabContainer: KnowledgeTabContainer,
  PolicyContainer: PolicyContainer,
  PolicyRetrieveContainer: PolicyRetrieveContainer,
  FacilityContainer: FacilityContainer,
  LikeListContainer: LikeListContainer,
  ViewListContainer: ViewListContainer,
  WebBrowserContainer: WebBrowserContainer,
  UpdateProfileContainer: UpdateProfileContainer,
  ShuttleBusContainer: ShuttleBusContainer,
  SchoolMealContainer: SchoolMealContainer,
  KeywordContainer: KeywordContainer,
  AlarmListContainer: AlarmListContainer,
  SchoolScheduleContainer: SchoolScheduleContainer,
  IntroContainer: IntroContainer,
  SuggestionContainer: SuggestionContainer,
  IcampusArticleListContainer: IcampusArticleListContainer,
  IcampusSubjectListContainer: IcampusSubjectListContainer,
  IcampusRetrieveContainer: IcampusRetrieveContainer,
}, {
  initialRouteName: 'SplashContainer',
  headerMode: 'none',
  cardStyle: {shadowColor: 'transparent'},

});

export function RootStack() {
  return (
    <RootStackNavigator
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);

        if (prevScreen !== currentScreen) {
          // Log currentScreen to firebase analytics
          firebase.analytics().setCurrentScreen(currentScreen);

        }
      }}
    />)
}

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}