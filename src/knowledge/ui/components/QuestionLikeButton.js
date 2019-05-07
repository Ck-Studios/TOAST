import React, {Component} from "react"
import {StyleSheet, Alert, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {knowledgeService} from "../../KnowledgeService";
import {observable} from "mobx"
import {observer} from "mobx-react"
import {ThemeColor} from "../../../common/Theme";

@observer
export default class QuestionLikeButton extends Component {
  @observable liked;
  @observable onSubmit = false;

  componentWillMount() {
    this.liked = this.props.liked;
  }

  //TODO:: REFRESH ERROR 해결해야함 !!
  componentWillReceiveProps(nextProps) {
    if (this.liked !== nextProps.liked)
      this.liked = !this.liked
  }

  onLikeButtonClicked() {
    if (this.onSubmit) return;
    this.onSubmit = true;

    knowledgeService.toggleLike(this.props.id)
      .then((response) => {
          this.liked = !this.liked;
          this.onSubmit = false;
        }
      )
      .catch((error) => {
          console.warn(error);
          Alert.alert('다시 시도해 주세요!');
          this.onSubmit = false;
        }
      )
  }

  render() {
    const iconName = this.liked ? 'md-heart' : 'md-heart-outline';
    return (
      <TouchableOpacity
        onPress={() => this.onLikeButtonClicked()}>
        <Icon style={styles.icon} name={iconName} size={15} color={ThemeColor}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    margin: 5,
  },

});