import React, {Component} from "react"
import {StyleSheet, View} from "react-native";
import Header from "../../../common/ui/components/Header";
import IcampusArticleList from "../components/IcampusArticleList";
import {Query} from "react-apollo";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import NetworkErrorAlert from "../../../common/ui/components/Etc/NetworkErrorAlert";
import {GET_SUBJECT_CONTENTS} from "../../../utils/ApolloQuery";

export default class IcampusArticleListContainer extends Component {
  render() {
    const item = this.props.navigation.state.params.item;
    const title = item.lectureName;
    return (
      <Query query={GET_SUBJECT_CONTENTS} variables={{id: item.id}}>
        {({loading, error, data}) => {
          if (loading) return <LoadingIndicator/>;
          if (error) return <NetworkErrorAlert/>;
          const subjectContentsList = data.subjectContents;
          return (
            <View style={styles.container}>
              <Header title={title}/>
              <IcampusArticleList data={subjectContentsList}/>
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
    backgroundColor: 'white',
  },
});