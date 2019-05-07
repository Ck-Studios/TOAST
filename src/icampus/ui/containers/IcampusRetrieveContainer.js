import React, {Component} from "react"
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native";
import Header from "../../../common/ui/components/Header";
import {Query} from "react-apollo";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import NetworkErrorAlert from "../../../common/ui/components/Etc/NetworkErrorAlert";
import {RETRIEVE_SUBJECT_CONTENT} from "../../../utils/ApolloQuery";
import ContentView from "../../../common/ui/components/Content/ContentView";
import {
  ContentText,
  ContentTextBold,
  SubtitleText,
  ThemeColor,
  WhiteBackgroundColor
} from "../../../common/Theme";
import HorizontalLine from "../../../common/ui/components/Etc/HorizontalLine";
import Nothing from "../../../common/ui/components/Etc/Nothing";
import {timeCalculator} from "../../../utils/TimeCalculator";
import {observer} from "mobx-react";
import {observable} from "mobx";

@observer
export default class IcampusRetrieveContainer extends Component {
  @observable detachTempLabel = false;

  getContentView(item) {
    if (item.type === 'homework') {
      return (<View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10,}}>
          <Text style={[styles.badge, {backgroundColor: ThemeColor,}]}>과제 시작일</Text>
          <Text style={{flex: 1, ...ContentText}}>{timeCalculator.getFormattedTime(item.startDatetime)}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10,}}>
          <Text style={[styles.badge, {backgroundColor: ThemeColor,}]}>과제 마감일</Text>
          <Text style={{flex: 1, ...ContentText}}>{timeCalculator.getFormattedTime(item.endDatetime)}</Text>
        </View>

        <Nothing
          style={{flex: 1}}
          message={'과제는 게시물 내용을 확인할 수 없습니다.'}
        />
      </View>)
    } else if (item.type === 'qna') {
      return (
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10,}}>
            <Text style={[styles.badge, {backgroundColor: ThemeColor,}]}>작성자</Text>
            <Text style={{flex: 1, ...ContentText}}>{item.writer}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10,}}>
            <Text style={[styles.badge, {backgroundColor: ThemeColor,}]}>작성일</Text>
            <Text style={{flex: 1, ...ContentText}}>{timeCalculator.getFormattedTime(item.createdDatetime)}</Text>
          </View>
          <ContentView content={item.content}/>
        </View>);
    } else {
      const attaches = (item.subjectcontentattachSet.length === 0) ?
        '없음' : `${item.subjectcontentattachSet.length}개 있음`;

      return (
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10,}}>
            <Text style={[styles.badge, {backgroundColor: ThemeColor,}]}>작성일</Text>
            <Text style={{flex: 1, ...ContentText}}>{timeCalculator.getFormattedTime(item.createdDatetime)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('아직 지원하지 않는 기능입니다.')
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10,}}>
              <Text style={[styles.badge, {backgroundColor: ThemeColor,}]}>첨부 파일</Text>
              <Text style={{flex: 1, ...ContentText}}>{attaches}</Text>
            </View>
          </TouchableOpacity>
          <ContentView content={item.content}/>
        </View>);
    }
  }

  render() {
    const item = this.props.navigation.state.params.item;
    return (
      <Query query={RETRIEVE_SUBJECT_CONTENT} variables={{id: item.id}}>
        {({loading, error, data}) => {
          console.warn(error);
          if (loading) return <LoadingIndicator/>;
          if (error) return <NetworkErrorAlert/>;
          const item = data.subjectContent;
          return (
            <View style={styles.container}>
              <Header title={'글 내용 보기'}/>
              <ScrollView style={styles.scrollContainer}>

                <Text style={{...SubtitleText}}>
                  {item.title}
                </Text>
                <HorizontalLine/>

                {this.getContentView(item)}

                {/*For Debug*/}
                {/*<Text>{JSON.stringify(item)}</Text>*/}

              </ScrollView>
              {!this.detachTempLabel &&
              <TouchableOpacity
                onPress={() => {
                  this.detachTempLabel = true;
                }}>
                <Text
                  style={{
                    margin: 20,
                    padding: 5,
                    backgroundColor: '#34495E',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  추후 첨부파일 보기 등 아이캠퍼스 관련 기능이{'\n'}강화될 예정입니다.
                </Text>
              </TouchableOpacity>
              }
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteBackgroundColor,
  },

  scrollContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },

  badge: {
    ...ContentTextBold,
    padding: 5,
    borderRadius: 2,
    color: 'white',
    marginRight: 10,
  },
});