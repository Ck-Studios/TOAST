import React, {Component} from "react";
import {observer} from "mobx-react";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../../../common/ui/components/Header";
import {
  GrayTextColor,
  WhiteBackgroundColor
} from "../../../common/Theme";

@observer
export default class PolicyContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title={'학사제도'} hideSearch={true} navigation={this.props.navigation}/>

        <View
          style={{flex: 1,}}>
          <View
            style={styles.univContainer}>
            <Image
              source={{uri: 'https://s3.ap-northeast-2.amazonaws.com/toast-web/Emblem_01.jpg'}}
              style={{width: 100, height: 100}}
            />
          </View>

          <FlatList
            style={styles.gridList}
            numColumns={3}
            data={[
              {
                id: 1,
                title: '학사일정',
                image: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/46.Calendar-512.png',
              },
              {
                id: 2,
                title: '수강신청',
                image: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/35.Alarm-Clock-512.png',
              },
              {
                id: 3,
                title: '휴학/복학',
                image: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/32.ID-Vertical-512.png',
              },
              {
                id: 4,
                title: '교환학생',
                image: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/31.ID-Horizontal-512.png',
              },
              {
                id: 5,
                title: '내 학사제도',
                image: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/30.User-512.png',
              },
              {
                id: 6,
                title: '계절수업',
                image: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/15.Pencil-512.png',
              },
              {
                id: 7,
                title: '복수전공',
                image: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/14.News-512.png',
              },
              {
                id: 8,
                title: '인증/졸업',
                image: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/42.Badge-512.png',
              },
              {
                id: 9,
                title: '행정 안내',
                image: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/04.Bank-512.png',
              },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({item}) =>
              <View
                style={styles.gridItem}
              >
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => {
                    console.warn(item.title);
                    this.props.navigation.navigate('PolicyRetrieveContainer');
                  }}>

                  <Image
                    source={{uri: item.image}}
                    style={{width: 30, height: 30}}
                  />

                  {/*<TransparentCardItem*/}
                  {/*item={item}*/}
                  {/*borderRadius={7}*/}
                  {/*/>*/}

                </TouchableOpacity>
                <Text style={styles.descriptionText}>{item.title}</Text>
              </View>
            }
          />

          <View
            style={{
              flex: 1, position: 'absolute', backgroundColor: '#000000bb',
              top: 0, left: 0, width: '100%', height: '100%',
            }}>

            <Text
              style={{
                color: 'white', position: 'absolute',
                top: '50%', left: 0, width: '100%',
                textAlign: 'center',
              }}
            >
              학사제도 기능은 준비중입니다.
            </Text>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteBackgroundColor,
  },

  gridList: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },

  gridItem: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },

  univContainer: {
    // height: 120,
    backgroundColor: '#ffffff',

    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,

    padding: 20,

    // borderColor: '#dddddd77',
    // borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',

    // ...LightShadow,
  },

  iconContainer: {
    flex: 1,
    width: '90%',
    height: 90,
    backgroundColor: '#ffffff',

    borderColor: '#ddddddaa',
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',

    // ...LightShadow,
  },

  descriptionText: {
    marginTop: 7,
    marginBottom: 5,
    fontSize: 12,
    color: GrayTextColor,
    fontFamily: 'NanumSquareR',
  },

});