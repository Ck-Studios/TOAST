import React, {Component} from "react";
import WidgetShell from "../../../common/ui/components/WidgetShell";
import {Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import IcampusArticleList from "../../../icampus/ui/components/IcampusArticleList";
import IcampusSetterButton from "../../../icampus/ui/components/IcampusSetterButton";
import NavigationService from "../../../application/NavigationService";
import Icon from "react-native-vector-icons/Feather";
import {GrayImageColor, GrayTextColor} from "../../../common/Theme";
import IcampusSubjectList from "../../../icampus/ui/components/IcampusSubjectList";
import {applicationStore} from "../../../application/ApplicationStore";
import {observer} from "mobx-react";
import {dashboardStore} from "../../DashboardStore";

@observer
export default class IcampusWidget extends Component {
  render() {
    const allSubjectList = dashboardStore.subjectContents;
    let button = null;
    if (allSubjectList && allSubjectList.length) {
      button = <TouchableOpacity onPress={() =>
        NavigationService.navigate('IcampusSubjectListContainer', {mode: 'edit'})}>
        <View style={{paddingRight: 10, paddingLeft: 15}}>
          <Icon name={'rotate-ccw'} size={22} color={GrayImageColor}/>
        </View>
      </TouchableOpacity>
    }
    return (
      <WidgetShell
        title={'아이캠퍼스'}
        more={'IcampusSubjectListContainer'}
        navigation={this.props.navigation}
        additionalButton={button}
      >
        {/*{loading && <LoadingIndicator/>}*/}
        {
          !dashboardStore.subjectContents.length ?
            <IcampusSetterButton onPress={() => NavigationService.navigate('IcampusSubjectListContainer')}/>
            :
            <FlatList
              style={styles.gridList}
              numColumns={2}
              data={dashboardStore.subjectContents}
              renderItem={({item}) => {
                return (
                  <View style={styles.gridItem}>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={() => {
                        NavigationService.navigate('IcampusArticleListContainer', {item: item})
                      }}>
                      <Text style={styles.descriptionText}>{item.lectureName}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          // <IcampusSubjectList data={allSubjectList}/>
        }
      </WidgetShell>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },

  content: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'NanumSquareR',
    marginBottom: 5,
  },

  image: {
    width: 45,
    height: 45,
  },

  editButton: {
    marginRight: 15,
  },

  text: {
    fontSize: 13,
    fontFamily: 'NanumSquareR',
  },

  gridList: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  gridItem: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },

  iconContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    borderColor: '#ddddddaa',
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  descriptionText: {
    flex: 1,
    padding: 10,
    fontSize: 12,
    color: GrayTextColor,
    fontFamily: 'NanumSquareR',
  },
});