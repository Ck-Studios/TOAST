import React, {Component} from "react";
import {View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList} from "react-native";
import {observer} from "mobx-react";
import _ from "lodash";
import Header from "../common/ui/components/Header";
import Icon from "react-native-vector-icons/Feather";
import {DebugLayout, GrayDividerColor, GrayTextColor, Shadow} from "../common/Theme";
import {Mutation, Query} from "react-apollo";
import LoadingIndicator from "../common/ui/components/Etc/LoadingIndicator";
import NetworkErrorAlert from "../common/ui/components/Etc/NetworkErrorAlert";
import {DELETE_KEYWORD, GET_KEYWORDS} from "../utils/ApolloQuery";
import KeywordInput from "./components/KeywordInput";
import ItemSeparator from "../common/ui/components/Etc/ItemSeparator";

const NoticeKeywordList = () => (
  <Query query={GET_KEYWORDS}>
    {({loading, error, data}) => {
      if (loading) return <LoadingIndicator/>;
      if (error) return <NetworkErrorAlert/>;
      return (
        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
            data={data.archivedKeywords}
            renderItem={({item}) => {
              return (
                <View
                  style={styles.keywordContainer}>
                  <Icon name={'tag'} size={27} color={'#BBBCCD'}/>
                  <Text style={styles.keywordTitle}>{item.word} </Text>
                  <DeleteKeyword id={item.id}/>
                </View>
              );
            }}
          />
        </View>
      );
    }}
  </Query>
);

const DeleteKeyword = ({id}) => {
  return (
    <Mutation
      mutation={DELETE_KEYWORD}
      update={(cache, {data: {deleteKeyword}}) => {
        const {archivedKeywords} = cache.readQuery({query: GET_KEYWORDS});
        cache.writeQuery({
          query: GET_KEYWORDS,
          data: {archivedKeywords: _.filter(archivedKeywords, (item => item.id != deleteKeyword.id))}
        });
      }}>
      {deleteKeyword => (
        <TouchableOpacity onPress={() => {
          deleteKeyword({
            variables: {
              id: id
            }
          })
        }}>
          <Icon name={'x'} size={20} color={'#BBBCCD'}/>
        </TouchableOpacity>
      )}
    </Mutation>
  )
};

@observer
export default class KeywordContainer extends Component {

  onEnter() {
    if (this.keyword.trim() === '') return;

    this.keywords.push(this.keyword);
    this.keyword = '';
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={'키워드 알림 등록'} hideSearch={true} navigation={this.props.navigation}/>

        <View style={styles.barContainer}>
          <Icon name={'info'} style={styles.icon} size={18} color={GrayTextColor}/>
          <KeywordInput/>
        </View>
        <NoticeKeywordList/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },

  barContainer: {
    marginBottom: 20,

    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,

    flexDirection: 'row',
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
  },

  labelSet: {},

  icon: {
    alignSelf: 'center',
    margin: 10,
    marginRight: 10,

  },

  input: {
    paddingLeft: 15,
    flex: 1,
    fontSize: 17,
    color: 'black',
    fontFamily: 'NanumSquareR',
  },

  label: {
    height: 10,
    width: 20,
    borderWidth: 1,
    borderColor: 'red',
  },


  listContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },

  title: {
    fontSize: 24,
  },

  keywordContainer: {
    borderBottomWidth: 0.2,
    borderBottomColor: GrayDividerColor,
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
  },

  keywordTitle: {
    paddingLeft: 15,

    fontSize: 18,
    color: 'black',
    fontFamily: 'NanumSquareL',
    flex: 1,
  },
});
