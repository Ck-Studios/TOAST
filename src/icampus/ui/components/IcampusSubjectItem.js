import React, {Component} from "react";
import {Text, StyleSheet, View, TouchableOpacity} from "react-native";
import {ContentText, GrayImageColor, SmallContentText, ThemeColor} from "../../../common/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import NavigationService from "../../../application/NavigationService";
import client from "../../../utils/ApolloClient";
import {Mutation} from "react-apollo";
import {GET_SUBJECTS, SET_ALARM_SUBJECT} from "../../../utils/ApolloQuery";
import {observable} from "mobx";
import {observer} from "mobx-react";
import _ from "lodash"

@observer
export default class IcampusSubjectItem extends Component {
  @observable onSubmit = false;

  render() {
    const item = this.props.item;
    return (
      <Mutation
        mutation={SET_ALARM_SUBJECT}
        // update={(cache, {data: {setAlarmSubject}}) => {
        //   let {subjects} = cache.readQuery({query: GET_SUBJECTS});
        //   cache.writeQuery({
        //     query: GET_SUBJECTS,
        //     data: {subjects: _.replace(subjects, (item) => item.id === setAlarmSubject.id, setAlarmSubject)}
        //   });
        // }}
      >{setAlarmSubject => (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>

          <View style={styles.container}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                NavigationService.navigate('IcampusArticleListContainer', {item: item})
              }}>
              <Text style={styles.title}>
                {item.lectureName}
              </Text>
              <Text style={styles.tutor}>{item.tutor} 교수님</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginRight: 5,}}
              onPress={() => {
                if (this.onSubmit) {
                  return;
                }
                this.onSubmit = true;
                setAlarmSubject({variables: {id: item.id}})
                  .then((response) => {
                    // console.warn(response);
                    this.onSubmit = true;
                  }).catch((error) => {
                  console.warn(error);
                  this.onSubmit = true;
                })
              }}
            >
              <Icon name={(item.alarm) ? 'md-notifications' : 'md-notifications-off'} size={22}
                    color={(item.alarm) ? ThemeColor : GrayImageColor}/>
            </TouchableOpacity>

          </View>
        </View>)}
      </Mutation>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginBottom: 18,
    marginRight: 10,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    ...ContentText,
    marginBottom: 2,
  },
  tutor: {
    ...SmallContentText,
  },
  alarms: {
    ...ContentText,
  }
});
