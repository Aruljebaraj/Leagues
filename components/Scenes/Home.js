import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { ThemeColors } from 'react-navigation';
import Leagues from'../Scenes/Leagues';
import MyFavourite from'../Scenes/MyFavourite';
const FirstRoute = () => (
  <View  >
      <Leagues/>
  </View>
);
 
const SecondRoute = () => (
    <View  >
    <MyFavourite/>
</View>
);
 
// const initialLayout = { width: Dimensions.get('window').width };
// const [index, setIndex] = React.useState(0);
  
 
// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });
export default class Home extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'League' },
      { key: 'second', title: 'My Favourite' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}
const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: "#000",
      elevation: 1,
    },
    indicator: {
      backgroundColor:"#000",
      borderBottomColor: "#dcdcdc",
      borderBottomWidth: 2,
      height: 56,
    }
  });
