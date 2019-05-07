import React, {Component} from "react";
import {observer} from "mobx-react";
import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BaseGridList from "../../../common/ui/components/List/BaseGridList";
import Header from "../../../common/ui/components/Header";
import MapView from 'react-native-maps';
import DrawerIconButtonItem from "../../../application/components/DrawerIconButtonItem";
import {
  GrayTextColor,
  LargeSubtitleText,
  LightShadow,
  Shadow,
  SubtitleText,
  WhiteBackgroundColor
} from "../../../common/Theme";
import TransparentCardItem from "../../../common/ui/components/TransparentCardItem";

@observer
export default class FacilityContainer extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Header title={'학교 시설 정보'} hideSearch={true} navigation={this.props.navigation}/>
        <View
          style={{flex: 1,}}>

          {/*<Text*/}
          {/*style={{*/}
          {/*backgroundColor: '#afefa3',*/}
          {/*height: 200,*/}

          {/*textAlign: 'center',*/}
          {/*}}*/}
          {/*>*/}
          {/*지도 AREA*/}
          {/*</Text>*/}

          <MapView
            style={{height: 200,}}
            initialRegion={{
              latitude: 37.586879,
              longitude: 126.994057,
              latitudeDelta: 0.0035,
              longitudeDelta: 0.0035,
            }}
          />

          {/*<MapView*/}
          {/*initialRegion={{*/}
          {/*latitude: 36.143099,*/}
          {/*longitude: 128.392905,*/}
          {/*zoomLevel: 5,*/}
          {/*}}*/}
          {/*mapType={"Standard"}*/}
          {/*style={{ height: 300, }}*/}
          {/*/>*/}

          <FlatList
            style={styles.gridList}
            numColumns={3}
            data={[
              {
                id: 1,
                title: '건물 번호',
                image: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/03.Office-512.png',
              },
              {
                id: 2,
                title: '',
                image: '',
              },
              {
                id: 3,
                title: '',
                image: '',
              },
              {
                id: 4,
                title: '',
                image: '',
              },
              {
                id: 5,
                title: '',
                image: '',
              },
              {
                id: 6,
                title: '',
                image: '',
              },
              {
                id: 7,
                title: '',
                image: '',
              },
              {
                id: 8,
                title: '',
                image: '',
              },
              {
                id: 9,
                title: '',
                image: '',
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
                    // this.props.navigation.navigate('PolicyRetrieveContainer');
                  }}>

                  <Image
                    source={{uri: item.image}}
                    style={{width: 40, height: 40}}
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
              학교 시설 기능은 준비중입니다.
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

    paddingTop: 10,
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
  },

  descriptionText: {
    marginTop: 7,
    marginBottom: 5,
    fontSize: 12,
    color: GrayTextColor,
    fontFamily: 'NanumSquareR',
  },
});