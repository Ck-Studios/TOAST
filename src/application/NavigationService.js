import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;
let _rootTabNavigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function setRootTabNavigator(navigatorRef) {
  _rootTabNavigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function replace(routeName, params) {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params,
    })
  );
}

function reset(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: routeName,
          params: params
        })],
    })
  );
}

function goBack() {
  _navigator.dispatch(
    NavigationActions.back({
      key: null,
    })
  );
}

export default {
  navigate,
  reset,
  replace,
  goBack,
  setTopLevelNavigator,
};