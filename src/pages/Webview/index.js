import React from 'react';
import { WebView as ReactWebview } from 'react-native-webview';

export function Webview({ navigation }) {
  const url = navigation.getParam('repo').html_url;

  return <ReactWebview style={{ flex: 1 }} source={{ uri: url }} />;
}

Webview.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repo').name,
});
