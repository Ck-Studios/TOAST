import React, {Component} from 'react';
import {WebView, StyleSheet, View, Text, Image, FlatList, ScrollView, TouchableOpacity, Alert} from "react-native";
import Header from "../../../common/ui/components/Header";
import {ContentText, GrayTextColor, SmallContentText, ThemeColor, WhiteBackgroundColor} from "../../../common/Theme";
import luna from "../../../utils/Luna";
import {observer} from "mobx-react";
import {observable, action} from "mobx";
import _ from "lodash";
import WidgetShell from "../../../common/ui/components/WidgetShell";
import HorizontalCategoryList from "../../../common/ui/components/List/HorizontalCategoryList";

@observer
export default class ShuttleBusContainer extends Component {
  @observable busData = [
    {station: '', time: '위치를 찾을 수 없음', position: 'stop'},
    {station: '', time: '위치를 찾을 수 없음', position: 'next'},
    {station: '', time: '위치를 찾을 수 없음', position: 'no'},
    {station: '', time: '위치를 찾을 수 없음', position: 'stop'}
  ];

  @observable lastTime = '-';
  @observable busCount = '-';

  @observable shuttleType = {
    title: '혜화 (인사캠)',
    type: 'hyehwa',
  };

  @observable shuttleTypeList = [
    {
      title: '혜화 (인사캠)',
      type: 'hyehwa',
    },
    // {
    //   title: '인문·자연',
    //   type: 'inja',
    // },
    // {
    //   title: '분당 (자과캠)',
    //   type: 'bundang',
    // },
    // {
    //   title: '일산 (자과캠)',
    //   type: 'ilsan',
    // },
    // {
    //   title: '인천 (자과캠)',
    //   type: 'incheon',
    // },
  ];

  shuttleBusInfos = {
    hyehwa: {
      1: {station: '농구장 앞', nextTime: 4.0},
      2: {station: '학생회관', nextTime: 1.0},
      3: {station: '정문 (하교)', nextTime: 3.0},
      4: {station: '혜화로터리', nextTime: 1.5},
      5: {station: '', nextTime: 1.5},
      6: {station: '혜화역', nextTime: 2},
      7: {station: '', nextTime: 2},
      8: {station: '맥도날드 앞', nextTime: 1.5},
      9: {station: '정문 (등교)', nextTime: 1.5},
      10: {station: '600주년 기념관', nextTime: 2.0},
    },

    inja: {
      title: '인문·자연',
      hours: {},
      fare: {},
      lines: [
        {station: ''}
      ],
    }
  };

  state = {
    timer: null,
    busData: [],
  };

  componentDidMount() {
    let timer = setInterval(() => this.refreshData(), 1000 * 10);
    this.setState({timer});

    this.refreshData();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  @action
  refreshData() {
    const self = this;

    if (this.shuttleType.type === 'hyehwa') {
      const busline_skku_hyehwa = this.shuttleBusInfos['hyehwa'];
      luna.get('https://www.skku.edu/skku/app/getBusData.do?route=2009&_=15343257021388' + Date())
        .then(function (response) {
          let infos = _.uniqBy(response.data.items, 'Sequence');
          self.busCount = 0;
          let busData = infos.map((item) => {
            if (item.Kind !== '') {
              self.busCount++;
            }

            return {station: busline_skku_hyehwa[item.Sequence].station, position: 'no'}
          });

          let lastTime = new Date();
          self.lastTime = lastTime.getHours() + '시 ' + lastTime.getMinutes() + '분';

          for (let current = 0; current < 10; current++) {
            let safeGuard = 0;
            let time = "";

            if (infos[current].Kind === "2") {
              busData[current].time = '정차중';
              busData[current].position = 'stop';
              continue;
            }

            let rawTime = 0;
            let busstopIndex = current;
            while (safeGuard++ < 50) {
              busstopIndex = ((busstopIndex - 1) + 10) % 10;
              rawTime += busline_skku_hyehwa[busstopIndex + 1].nextTime;

              if (infos[busstopIndex].Kind === "") {
                continue;
              } else if (infos[busstopIndex].Kind === "2") {
                rawTime -= infos[busstopIndex].usetime;
                break;
              } else if (infos[busstopIndex].Kind === "3") {
                rawTime -= infos[busstopIndex].usetime;
                if (busData[busstopIndex].station === '') {
                  busstopIndex -= 1;
                }
                busData[busstopIndex].position = 'next';
                break;
              }
            }

            rawTime = Math.floor(rawTime);

            if (rawTime <= 1) {
              busData[current].time = '잠시 후 도착';
            } else {
              busData[current].time = rawTime + '분 후 도착';
            }

            if (safeGuard === 50) {
              busData[current].time = '운행하지 않음';
              busData[current].position = 'no';
            }
          }

          for (let current = 0; current < 10; current++) {
            if (infos[current].Kind === "2") {
              busData[current].time = '정차중';
              busData[current].position = 'stop';
            } else if (infos[current].Kind === "3") {
              busData[current].position = 'next';
            }

            if (busData[current].station === '' && infos[current].Kind !== "") {
              busData[current - 1].position = 'next';
            }
          }

          if (self.busCount === 0) {
            busData = busData.map((item) => {
              return {station: item.station, time: '운행 종료', position: 'no'};
            });
          }

          self.busData = busData;
        }.bind(this));
    }

  }

  render() {
    return <View style={styles.container}>
      <Header title={'실시간 셔틀버스'} hideSearch={true} navigation={this.props.navigation}/>

      <HorizontalCategoryList
        style={styles.gridList}
        data={this.shuttleTypeList}
        onPress={(item) => {}}
      />

      <Text
        style={{
          marginTop: 5,
          marginLeft: 20, marginRight: 15, marginBottom: 10,
          textAlign: 'right',
          ...SmallContentText,
        }}>
        {this.lastTime} 기준 · {this.busCount}대 운행 중
      </Text>

      <FlatList
        data={this.busData}
        renderItem={({item}) => {

          let busMarkPosition = 7;

          if (item.position === 'next') {
            busMarkPosition = 40;
          }

          let busMark = (item.position !== 'no') ? <Image
            style={{
              position: 'absolute',
              left: 25, top: busMarkPosition,
              width: 35, height: 35,
            }}
            resizeMode={'stretch'}
            source={require('../../../../static/icon_bus.png')}
          /> : null;

          if (item.station === undefined || item.station === '') {
            return null;
          } else {
            return <View
              style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 4, height: 68,
                  marginLeft: 40,
                  backgroundColor: '#B6B6B6',
                }}/>

              <View
                style={{
                  marginLeft: 20,
                  height: 50,
                  justifyContent: 'center',
                }}>
                <Text style={{...ContentText}}>
                  {item.station}
                </Text>
                <Text style={{...SmallContentText}}>
                  {item.time}
                </Text>
              </View>

              <Image
                style={{
                  position: 'absolute',
                  left: 35, top: 17,
                  width: 15, height: 15,
                }}
                resizeMode={'stretch'}
                source={require('../../../../static/icon_busstop.png')}
              />
              {busMark}
            </View>;
          }
        }}
      />

      <View></View>
      {/*<WebView*/}
      {/*style={styles.webview}*/}
      {/*source={{uri: uri}}*/}
      {/*/>*/}
    </View>;
  }
}


const
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },

    gridList: {
      padding: 10,
    },

    gridItem: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
      marginBottom: 5,
      alignItems: 'center',
    },

    iconContainer: {
      backgroundColor: '#ffffff',
      borderColor: '#ddddddaa',
      borderWidth: 1,
      borderRadius: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },

    descriptionText: {
      padding: 10,
      fontSize: 12,
      color: GrayTextColor,
      fontFamily: 'NanumSquareR',
    },
  });