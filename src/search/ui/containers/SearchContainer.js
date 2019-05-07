import React, {Component} from "react";
import {View, StyleSheet,} from "react-native";
import SearchBar from "../components/SearchBar";
import KeywordList from "../components/KeywordList";
import SearchResult from "../components/SearchResult";
import {observer} from "mobx-react";
import CircularButton from "../../../common/ui/components/Button/CircularButton";
import {observable} from "mobx";
import {SEARCH_ACTIVITY, SEARCH_NOTICE} from "../../../utils/ApolloQuery";
import NoticeList from "../../../notice/ui/components/NoticeList";
import ActivityList from "../../../activity/ui/components/ActivityList";

@observer
export default class SearchContainer extends Component {
  @observable keyword;

  onEnter(keyword) {
    this.keyword = keyword;
  }

  render() {
    const type = this.props.navigation.state.params.searchType;
    return (
      <View style={styles.container}>
        <SearchBar
          onEnter={this.onEnter.bind(this)}
        />

        {this.keyword === undefined ?
          <KeywordList/> :
          type === 'notice' ?
            <SearchResult
              keyword={this.keyword}
              searchType={type}
              navigation={this.props.navigation}
              payloadName={'notices'}
              query={SEARCH_NOTICE}
              list={NoticeList}
            />
            :
            <SearchResult
              keyword={this.keyword}
              searchType={type}
              navigation={this.props.navigation}
              payloadName={'activities'}
              query={SEARCH_ACTIVITY}
              list={ActivityList}
            />
        }
        <CircularButton
          style={styles.closeButton}
          icon={'md-close'}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },

  closeButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 15,
  }
});
