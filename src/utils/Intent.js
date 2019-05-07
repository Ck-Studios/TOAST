import Share from "react-native-share";
import {Alert, Linking} from "react-native";

export function shareContent(title, url) {
  Share.open({
    message: title,
    url: url,
  });
}

export function share(item) {
  console.warn(item);
  shareContent(
    "[TOAST] " + item.title,
    "https://luna.toast.one/s/" + item.id,
  );
}

export function openURL(url) {
  Linking.openURL(url);
}

export function openLink(url) {
  if (!isLinkExist(url)) {
    Alert.alert(
      '죄송합니다',
      '이 컨텐츠는 아직 원본 링크를 수집하지 못했습니다.'
    )
  } else {
    openURL(url);
  }
}

export function isLinkExist(url) {
  return !(url === "" || url === undefined || url === null || url === "http://");
}