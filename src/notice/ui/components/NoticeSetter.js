import React, {Component} from "react"
import {Image, Text, Alert, View, StyleSheet, TouchableOpacity, FlatList, ScrollView} from "react-native";
import {DebugLayout, Shadow} from "../../../common/Theme";
import {observer} from "mobx-react"
import {observable, action, extendObservable} from "mobx"
import NoticeSelectItem from "./NoticeSelectItem";
import _ from "lodash";
import client from "../../../utils/ApolloClient";
import {GET_NOTICE_SUBSCRIPTION, GET_NOTICES, PUT_SUITED_NOTICE} from "../../../utils/ApolloQuery";
import {applicationStore} from "../../../application/ApplicationStore";
import NavigationService from "../../../application/NavigationService";
import {dashboardStore} from "../../../dashboard/DashboardStore";

@observer
export default class NoticeSetter extends Component {
  @observable data;

  componentWillMount() {
    this.data = _.forEach(this.props.data, (item) => extendObservable(item, {selected: false}));
    client.getInstance().query(
      {
        query: GET_NOTICE_SUBSCRIPTION,
        fetchPolicy: 'network-only'
      }
    ).then((response) => {
      _.forEach(response.data.suitedNoticeSources, (item) => {
        const index = _.findIndex(this.data, (i) => i.name === item.name);
        this.data[index] = _.assign(this.data[index], {selected: true})
      })
    })
      .catch((error) => {
        console.warn(error)
      })

  }

  onSubmit() {
    const selectedItem = _.filter(this.data, (item) => item.selected).map((item) => item.source);
    if (selectedItem.length === 0) {
      Alert.alert("1개 이상의 항목을 선택해 주세요!");
      return;
    }
    client.getInstance().mutate({
      mutation: PUT_SUITED_NOTICE, variables: {
        sources: selectedItem
      }
    }).then((response) => {
      this.props.onSettingCompelete(response.data.setSuitedNotice);
      client.getInstance().query({
        query: GET_NOTICES, variables: {
          source: 'suited',
          sort: '-created_datetime',
          offset: 0,
          size: 4,
        }, fetchPolicy: 'network-only'
      }).then(() => {
        //TODO  :: flatlist 문제 해결 해야함!!
        // applicationStore.refreshQuickMenu += 1;
        dashboardStore.loadNoticeWidgetData();
      }).catch((error) => {
        console.warn('NoticeSetter GET_NOTICES error', error)
      })
    }).catch((error) => {
      console.warn('NoticeSetter PUT_SUITED_NOTICE error', error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.image}
              source={require('../../../../static/curationCompass.png')}/>
            <Text style={styles.title}>
              나에게 맞는 공지사항
            </Text>
          </View>
          <Text style={styles.subtitle}>
            여기서 오는 소식을 볼래
          </Text>
          <FlatList
            data={this.props.data}
            numColumns={3}
            keyExtractor={(item) => item.name}
            renderItem={({item}) =>
              <NoticeSelectItem item={item}/>}
          />
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20,}}>
          <TouchableOpacity
            onPress={() => NavigationService.goBack()}
          >
            <Text style={styles.footerButton}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onSubmit();
            }
            }>
            <Text style={styles.footerButton}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 20,
    ...Shadow,
  },

  content: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'NanumSquareR',
    marginBottom: 5,
  },

  horizontalView: {
    flexDirection: 'row',
  },

  image: {
    width: 45,
    height: 45,
    marginRight: 20,
  },

  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'NanumSquareB',

  },

  subtitle: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'NanumSquareR',
    marginBottom: 15,
    marginTop: 15,
  },

  item: {
    flex: 1,
  },

  footerButton: {
    fontSize: 14,
    fontFamily: 'NanumSquareR',
    color: 'black',
    padding: 10,
    marginLeft: 10,
  },

});