import React, {Component} from 'react';
import ArchiveItem from "./ArchiveItem";
import {FlatList, Text, TouchableOpacity, View} from "react-native"
import _ from "lodash"
import {observer} from "mobx-react";
import ArchiveList from "./ArchiveList";
import WidgetShell from "../../../common/ui/components/WidgetShell";
import LoadingIndicator from "../../../common/ui/components/Etc/LoadingIndicator";
import {commonService} from "../../../common/commonService";
import {archiveService} from "../../../archive/ArchiveService";

// ArchiveList 의 MAP 버전 (10개 이하의 아이템을 사용할때만 사용 바람)
@observer
export default class ArchiveSmallList extends Component {
  render() {
    const data = this.props.data;
    return (
      <View>
        {!data && <LoadingIndicator/>}
        {data && data.map((item) =>
          (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() => {
                  commonService.addToViewCache(item, item.type);
                  this.props.navigation.navigate(archiveService.getContainer(item.type), {item: item})
                }
                }>
                <ArchiveItem item={item}/>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
    )
  }
}
