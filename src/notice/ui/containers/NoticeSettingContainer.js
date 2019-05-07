import React, {Component} from "react"
import NoticeSetter from "../components/NoticeSetter";
import {observable} from "mobx";
import {observer} from "mobx-react";
import client from "../../../utils/ApolloClient";
import {GET_ALL_NOTICE_SOURCE} from "../../../utils/ApolloQuery";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import NoticeSetterButton from "../components/NoticeSetterButton";
import {applicationStore} from "../../../application/ApplicationStore";

@observer
export default class NoticeSettingContainer extends Component {
  @observable loaded = false;
  @observable mode;
  @observable curationTab;

  onSetterButtonPress() {
    this.mode = 'initialize'
  }

  componentWillMount() {
    this.mode = this.props.mode;

    client.getInstance().query({query: GET_ALL_NOTICE_SOURCE})
      .then((response) => {
        this.curationTab = response.data.noticeSources;
        this.loaded = true;
      })
      .catch((error) => {
        console.warn('NoticeSettingContainer network error', error);
        this.loaded = true;
      });
  }

  render() {
    if (!this.loaded) {
      return <LoadingIndicator/>
    }
    else if (this.mode === 'initialize') {
      return (
        <NoticeSetter
          data={this.curationTab}
          onSettingCompelete={(preset) => {
            this.props.onSettingCompelete(preset);
            applicationStore.noticeAlarmTutorial = true;
          }}
        />
      )
    }
    else if (this.mode === 'edit') {
      return <NoticeSetter
        data={this.curationTab}
        onSettingCompelete={this.props.onSettingCompelete}
      />
    }
    else {
      return <NoticeSetterButton onPress={this.onSetterButtonPress.bind(this)}/>
    }
  }
}
