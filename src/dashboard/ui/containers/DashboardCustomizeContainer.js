import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform, TouchableOpacity, Button, FlatList,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import SelectedItem from "../components/SelectedItem";
import {dashboardStore} from "../../DashboardStore";
import {dashboardService} from "../../DashboardService";
import {observer} from "mobx-react"
import {toJS} from "mobx";
const window = Dimensions.get('window');

@observer
export default class DashboardCustomizeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  renderRow = ({data, active}) => {
    return <SelectedItem data={data} active={active}/>
  };
  onChangeOrder = (nextOrder) => {
    this.order = nextOrder;
  };

  render() {
    const data = dashboardStore.currentSubscription;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          dashboardService.patchSubscription(this.order);
          this.props.navigation.goBack();
        }}>
          <Text>완료</Text>
        </TouchableOpacity>

        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          onChangeOrder={this.onChangeOrder.bind(this)}
          data={toJS(data)}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,

  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },


});