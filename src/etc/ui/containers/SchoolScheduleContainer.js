import React, {Component} from 'react';
import {WebView, StyleSheet, View, FlatList, Image, Text, Dimensions} from "react-native";
import Header from "../../../common/ui/components/Header";
import {ContentText, SmallContentText, WhiteBackgroundColor} from "../../../common/Theme";

const {width, height} = Dimensions.get('window');

export default class SchoolScheduleContainer extends Component {
  render() {
    // let {title, uri} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Header title={'학사 일정'} hideSearch={true} navigation={this.props.navigation}/>
        <View>
          <FlatList
            data={[
              {date: '9월 1일', title: '2018학년도 2학기 학기 개시'},
              {date: '9월 3일', title: '2학기 개강'},
              {date: '9월 3일', title: '학부생 조기졸업 신청/대학원생(석박사통합과정) 조기수료 신청/석박사통합과정 포기신청 시작'},
              {date: '9월 3일', title: '수강신청 확인/변경 시작'},
              {date: '9월 4일', title: '대학원생 논문제출자격시험 응시(면제) 신청 시작'},
              {date: '9월 5일', title: '2018학년도 2학기 추가등록(2018학년도 2학기 등록 마감) 시작'},
              {date: '9월 6일', title: '학부생 조기졸업 신청/대학원생(석박사통합과정) 조기수료 신청/석박사통합과정 포기신청 끝'},
              {date: '9월 7일', title: '수강신청 확인/변경 끝'},
              {date: '9월 7일', title: '대학원생 논문제출자격시험 응시(면제) 신청 끝'},
              {date: '9월 7일', title: '2018학년도 2학기 추가등록(2018학년도 2학기 등록 마감) 끝'},
              {date: '9월 10일', title: '학부생 학점포기 신청 시작'},
              {date: '9월 12일', title: '학부생 학점포기 신청 끝'},
              {date: '9월 18일', title: '학부생 학점포기 성적 반영'},
              {date: '9월 19일', title: '학부생 수강철회 신청 시작'},
              {date: '9월 21일', title: '학부생 수강철회 신청 끝'},
              {date: '9월 27일', title: '입대휴학자 제대복학 기한'},
              {date: '9월 28일', title: '공부자탄강일'},
              {date: '10월 1일', title: '학부생 수강철회/재수강 성적 반영'},
              {date: '10월 1일', title: '등록금 분할납부 2차 등록(4회 분납자) 시작'},
              {date: '10월 4일', title: '등록금 분할납부 2차 등록(4회 분납자) 끝'},
              {date: '10월 8일', title: '대학원생 학위과정 변경 신청(석사 → 석박사통합과정) 시작'},
              {date: '10월 15일', title: '대학원생 학위과정 변경 신청(석사 → 석박사통합과정) 끝'},
              {date: '10월 22일', title: '등록금 분할납부 최종(2회 분납자)/3차 등록(4회 분납자) 시작'},
              {date: '10월 22일', title: '2학기 중간시험 시작'},
              {date: '10월 22일', title: '학부생 2학기 중간강의평가 시작'},
              {date: '10월 23일', title: '대학원생 학위논문 예비·본심사 신청 시작'},
              {date: '10월 24일', title: '등록금 분할납부 최종(2회 분납자)/3차 등록(4회 분납자) 끝'},
              {date: '10월 26일', title: '2학기 중간시험 끝'},
              {date: '10월 29일', title: '학부생 2학기 중간시험 성적공시 시작'},
              {date: '10월 30일', title: '대학원생 학위논문 예비·본심사 신청 끝'},
              {date: '11월 2일', title: '학부생 2학기 중간시험 성적공시 끝'},
              {date: '11월 2일', title: '학부생 2학기 중간강의평가 끝'},
              {date: '11월 12일', title: '등록금 분할납부 최종 등록(4회 분납자) 시작'},
              {date: '11월 12일', title: '학부생 교직과정 신청 시작'},
              {date: '11월 14일', title: '등록금 분할납부 최종 등록(4회 분납자) 끝'},
              {date: '11월 16일', title: '학부생 교직과정 신청 끝'},
              {date: '11월 19일', title: '학부생 2019학년도 1학기 장학금 신청 시작'},
              {date: '11월 26일', title: '군입대자 인정학점 신청가능 입대일 시작'},
              {date: '12월 3일', title: '2학기 기말강의평가 시작'},
              {date: '12월 3일', title: '학부생 2019학년도 1학기 학·석사연계과정 신청 시작'},
              {date: '12월 7일', title: '학부생 졸업평가 결과보고서 제출 기한'},
              {date: '12월 14일', title: '2학기 기말강의평가 끝'},
              {date: '12월 14일', title: '학부생 2019학년도 1학기 학·석사연계과정 신청 끝'},
              {date: '12월 17일', title: '2학기 기말시험 시작'},
              {date: '12월 21일', title: '2학기 기말시험 끝'},
              {date: '12월 21일', title: '군입대자 인정학점 신청가능 입대일 끝'},
              {date: '12월 22일', title: '겨울방학 시작'},
              {date: '12월 24일', title: '겨울 계절수업 시작'},
              {date: '12월 27일', title: '2학기 성적입력 끝'},
              {date: '12월 27일', title: '2학기 성적공시 시작'},
              {date: '12월 28일', title: '대학원 학위논문 심사결과보고서 제출기한'},
              {date: '12월 31일', title: '2019년 2월 졸업예정 학부생 3품인증 취득증빙 제출기한'},
              {date: '1월 2일', title: '2학기 성적공시 끝'},
              {date: '1월 4일', title: '학부생 2019학년도 1학기 장학금 신청 끝'},
              {date: '2월 28일', title: '겨울방학 끝'},
            ]}
            renderItem={({item}) => {
              return <View
                style={{flexDirection: 'row'}}>
                <View style={{
                  width: 4, height: 68,
                  marginLeft: 110,
                  backgroundColor: '#B6B6B6',
                }}/>

                <View style={{
                  marginLeft: 20,
                  height: 50,
                  justifyContent: 'center',
                }}>
                  <Text style={{...ContentText, width: width - 150}}>{item.title}</Text>
                  {/*<Text style={{...SmallContentText}}>test2</Text>*/}
                </View>

                <Image
                  style={{
                    position: 'absolute',
                    left: 105, top: 17,
                    width: 15, height: 15,
                  }}
                  resizeMode={'stretch'}
                  source={require('../../../../static/gray_circle.png')}
                />

                <Text style={{
                  position: 'absolute',
                  left: 25, top: 17,
                  ...ContentText,
                }}>
                  {item.date}
                </Text>
                {/*{mark}*/}
              </View>;
            }}
          />
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

  webview: {
    height: '100%',
    width: '100%',
  },
});