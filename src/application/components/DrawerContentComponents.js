import {StyleSheet, Text, Button, View, FlatList, ScrollView, TouchableOpacity, Image, Alert} from "react-native";
import React, {Component} from "react";
import NavigationActions from "react-navigation/src/NavigationActions";
import DrawerIconButtonItem from "./DrawerIconButtonItem";
import {
  GrayImageColor,
  GrayTextColor,
  SmallContentText, SubtitleText, ThemePinkColor,
} from "../../common/Theme";
import Icon from "react-native-vector-icons/Ionicons"
import DrawerTextButtonItem from "./DrawerTextButtonItem";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {applicationStore} from "../ApplicationStore";
import {withNavigationFocus} from 'react-navigation';
import {userStore} from "../../user/UserStore";


@observer
class DrawerContentComponents extends Component {
  IconButtonWidth = 0;

  navigateToScreen = (route) => (
    () => {
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
    });

  getInitialHeight(layout) {
    const {width} = layout;
    this.IconButtonWidth = width;
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={() => {
            }}>
              <Image
                style={styles.profileImage}
                source={userStore.profile}/>
            </TouchableOpacity>
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{userStore.name}</Text>
              <Text style={styles.profileUniversity}>{userStore.school}</Text>
              <Text style={styles.profileUniversity}>{userStore.major}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UpdateProfileContainer')}
              style={styles.settingIcon}>
              <Icon name={'md-settings'} size={35} color={GrayTextColor}/>
            </TouchableOpacity>
          </View>

          <FlatList
            style={styles.gridList}
            numColumns={5}
            onLayout={(event) => {
              this.getInitialHeight(event.nativeEvent.layout)
            }}
            data={[
              {title: '공지사항', name: 'NoticeTabContainer', id: 4, icon: 'download-cloud'},
              {title: '대외활동', name: 'ActivityTabContainer', id: 5, icon: 'briefcase'},
              {title: '질문답변', name: 'KnowledgeTabContainer', id: 1, icon: 'award'},
              {title: '학사제도', name: 'PolicyContainer', id: 2, icon: 'aperture'},
              {title: '시설정보', name: 'FacilityContainer', id: 3, icon: 'command'},
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({item}) =>
              <TouchableOpacity
                style={styles.gridItem}
                onPress={this.navigateToScreen(item.name)}>
                <DrawerIconButtonItem
                  item={item}
                  width={this.IconButtonWidth}
                />
              </TouchableOpacity>
            }
          />
          <DrawerTextButtonItem
            title={'내 소식'}
            newsNumber={0}
            newsColor={ThemePinkColor}
          />
          <DrawerTextButtonItem
            title={'알림'}
            newsNumber={0}
            newsColor={GrayImageColor}
            headerColor={'#00D577'}

          />
          <DrawerTextButtonItem
            title={'추천 컨텐츠'}
            newsNumber={0}
            newsColor={GrayImageColor}
            headerColor={ThemePinkColor}

          />

          {/*<DrawerTextButtonItem*/}
          {/*title={'토스트 사용 가이드'}*/}
          {/*onPress={() => {*/}
          {/*Alert.alert('이 기능은 b0.75 릴리즈 예정입니다.');*/}
          {/*}}*/}
          {/*/>*/}

          <DrawerTextButtonItem
            title={'오늘의 학식'}
            onPress={() => {
              this.props.navigation.navigate('SchoolMealContainer',
                {
                  title: '오늘의 학식',
                });
            }}
          />

          <DrawerTextButtonItem
            title={'실시간 셔틀버스'}
            onPress={() => {
              this.props.navigation.navigate('ShuttleBusContainer',
                {
                  title: '실시간 셔틀버스',
                });
            }}
          />

          <DrawerTextButtonItem
            title={'건의 및 오류 제보'}
            onPress={() => {
              Alert.alert('이 기능은 b0.80 릴리즈 예정입니다.');
            }}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginRight: 20,
    marginLeft: 20,

  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 7,

  },
  profileText: {
    flex: 1,
    marginLeft: 15,
    marginRight: 5,
  },
  profileName: {
    ...SubtitleText,
  },
  profileUniversity: {
    ...SmallContentText,
    color: 'black',
  },
  settingIcon: {},
  gridList: {
    marginBottom: 20,
  },
  gridItem: {}

});

export default withNavigationFocus(DrawerContentComponents);
