import React, {Component} from "react";
import {StyleSheet, Text, Alert, View, ActivityIndicator} from "react-native";
import BaseList from "../../../../common/ui/components/List/BaseList";
import QuestionItem from "../item/QuestionItem";
import {ListMargin, ThemeColor} from "../../../../common/Theme";
import {Query} from "react-apollo";
import {GET_QUESTIONS, PAGINATION_LENGTH, TEST} from "../../../../utils/ApolloQuery";
import LoadingIndicator from "../../../../common/ui/components/Etc/LoadingIndicator";
import NetworkErrorAlert from "../../../../common/ui/components/Etc/NetworkErrorAlert";

export default class QuestionList extends Component {
  render() {
    return (
      <Query
        query={GET_QUESTIONS}
        variables={{
          filter: this.props.filter,
          offset: 0,
          size: PAGINATION_LENGTH,
        }}
        notifyOnNetworkStatusChange={true}
      >
        {({loading, error, data, refetch, fetchMore}) => {
          if (loading && !data.questions)
            return <LoadingIndicator/>;
          if (error && !loading)
            return <NetworkErrorAlert/>;
          return (
            <BaseList
              style={styles.list}
              data={data.questions}
              ListHeaderComponent={this.props.ListHeaderComponent}
              keyExtractor={(item) => item.id}
              renderItem={({item}) =>
                <QuestionItem item={item}/>
              }
              //infinite load
              onEndReached={() =>
                fetchMore({
                  variables: {
                    offset: data.questions.length
                  },
                  updateQuery: (prev, {fetchMoreResult}) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      questions: [...prev.questions, ...fetchMoreResult.questions]
                    });
                  }
                })}
              //refreshing
              refreshing={data.networkState === 4}
              onRefresh={() => refetch()}
            />
          );
        }}
      </Query>
    )
  }
}
const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  }
});
