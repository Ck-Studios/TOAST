import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, TouchableOpacity,
  View, LayoutAnimation,
} from "react-native";
import LikeButton from "../../../common/ui/components/Button/LikeButton";
import ShareButton from "../../../common/ui/components/Button/ShareButton";
import ShowOriginButton from "../../../common/ui/components/Button/ShowOriginButton";
import {getContentRetrieve} from "../../../common/commonService";
import {
  Container,RetrieveTitle,
  RightwardBiasedBackButton,
  RightwardBiasedContainer,
  ThemeColor,
} from "../../../common/Theme"
import Icon from "react-native-vector-icons/Ionicons";
import {observer} from "mobx-react"
import {observable} from "mobx"
import ContentView from "../../../common/ui/components/Content/ContentView";
import RetrieveImage from "../../../common/ui/components/Retrieve/RetrieveImage";
import BackButton from "../../../common/ui/components/Button/BackButton";

@observer
export default class PolicyRetrieveContainer extends Component {
  @observable isActionButtonVisible = true;
  scrollViewOffset = 0;

  componentWillMount() {
    // this.id = this.props.navigation.state.params.item.id;
    // getContentRetrieve(this.id, noticeStore);
  }

  onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = (currentOffset > 0 && currentOffset > this.scrollViewOffset)
      ? 'down' : 'up';
    const isActionButtonVisible = direction === 'up';
    if (isActionButtonVisible !== this.isActionButtonVisible) {
      this.isActionButtonVisible = isActionButtonVisible;
    }
    this.scrollViewOffset = currentOffset
  };

  render() {
    // const item = noticeStore.pool[this.id];
    return (
      <View style={styles.container}>
        <View style={RightwardBiasedBackButton}>

          {/*BackButton*/}
          <BackButton style={{padding: 15}}/>
        </View>

        <ScrollView
          style={Container}
          onScroll={this.onScroll}
        >
          {/*Image*/}
          <RetrieveImage/>

          {/*Button*/}
          <View style={styles.ButtonGroup}>
            <Icon name={'ios-eye'} size={25} color={ThemeColor} style={{margin:5}}/>
            <Icon name={'ios-chatbubbles'} size={25} color={ThemeColor} style={{margin:5}}/>
            {/*<LikeButton item={item}/>*/}
            {/*<ShowOriginButton url={item.url}/>*/}
          </View>

          {/*Title*/}
          <Text style={styles.retrieveTitle}>죄송합니다.</Text>

          {/*Content*/}
          <ContentView content={'정보가 아직 입력되지 않았습니다.'} style={styles.contentView}/>

        </ScrollView>
        {/*<ShareButton item={item} visible={this.isActionButtonVisible}/>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Container,
    flexDirection: 'row'
  },
  ButtonGroup: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
  },
  retrieveTitle: {
    ...RetrieveTitle,
    marginTop: 10,
    paddingRight: 20,
  },
  contentView: {
    marginRight: 10,
  },
});
