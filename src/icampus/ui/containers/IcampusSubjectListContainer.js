import React, {Component} from "react"
import {StyleSheet, Text, View} from "react-native";
import Header from "../../../common/ui/components/Header";
import IcampusSubjectList from "../components/IcampusSubjectList";
import {Query} from "react-apollo";
import {GET_ALL_SUBJECT_CONTENT, GET_SUBJECTS} from "../../../utils/ApolloQuery";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import NetworkErrorAlert from "../../../common/ui/components/Etc/NetworkErrorAlert";
import IcampusSetter from "../components/IcampusSetter";
import {observer} from "mobx-react";
import {observable} from "mobx";
import client from "../../../utils/ApolloClient";
import {ContentTextBold} from "../../../common/Theme";
import {applicationStore} from "../../../application/ApplicationStore";
import {dashboardStore} from "../../../dashboard/DashboardStore";

@observer
export default class IcampusSubjectListContainer extends Component {
  @observable mode;

  componentWillMount() {
    this.mode = this.props.navigation.state.params ? this.props.navigation.state.params.mode : 'list';
  }

  render() {
    return (
      <Query fetchPolicy={'network-only'} query={GET_SUBJECTS}>
        {({loading, error, data, refetch}) => {
          if (loading) return <LoadingIndicator/>;
          if (error && error.graphQLErrors[0].message !== 'icampus id not initialized')
            return <NetworkErrorAlert/>;
          else if (error || this.mode === 'edit' || (data.subjects && data.subjects.length === 0)) return (
            <IcampusSetter
              mode={this.mode}
              onPress={() => {
                this.mode = 'list';
                refetch().then(() => {
                  client.getInstance().query({
                    query: GET_ALL_SUBJECT_CONTENT, variables: {
                      size: 5, offset: 0, fetchPolicy: 'network-only'
                    }
                  }).then((re) => {
                    dashboardStore.loadIcampusWidgetData();
                    applicationStore.appRerender += 1;
                    console.warn(re);
                  })
                })
              }}/>);
          const subjectList = data.subjects;
          return (
            <View style={styles.container}>
              <Header
                title={'아이캠퍼스'}
                removeSearch={true}
                secondButton={{
                  icon: 'md-notifications',
                  onPress: () => this.props.navigation.navigate('KeywordContainer'),
                }}
              />
              <View style={{flex: 1}}>
                <Text style={styles.title}>내가 수강중인 과목</Text>
                <IcampusSubjectList data={subjectList}/>
              </View>
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

  title: {
    ...ContentTextBold,
    marginLeft: 20,
    marginBottom: 10,
  }
});