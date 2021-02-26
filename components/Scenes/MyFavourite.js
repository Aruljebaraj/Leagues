import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    FlatList, StatusBar, SafeAreaView, Card, ScrollView, Dimensions, Alert
} from 'react-native';
import Loader from '../Other/Loader'
import * as constant from '../Other/Constants'
import * as Empty from '../Other/Empty'
import { Actions } from 'react-native-router-flux';
import * as Theme from '../Other/Theme'
import Entypo from 'react-native-vector-icons/Entypo'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: constant.DataBaseName });
export default class MyFavourite extends React.Component {
    constructor() {
        super();
        this.state = {
            NewData: [],
            loading: false,
            height: Dimensions.get("window").height,
            width:Dimensions.get('window').width
    
        }
    }
    componentDidMount() {
        this.setState({
            loading: true,
        
        });
        db.transaction(tx => {
            tx.executeSql("SELECT  * FROM " + constant.FavTable, [], (tx, results) => {
            
                for (let i = 0; i < results.rows.length; ++i) {
                    this.state.NewData.push(results.rows.item(i));
                   
                }
                this.setState({
                    loading: false,
                  

                });
            });
        });
      
    }
  
    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 5, width: '100%',backgroundColor:Theme.colors.theme }} />
        )
    }
    // ListEmpty = () => {
    //     return (
    //         <View style={styles.Empty}>
    //             <Empty />
    //         </View>
    //     );
    // };
    render() {
        const ItemView = ({item}) => {
            return (
               
                // <TouchableOpacity  onPress={() => Actions.leagueDetail({ Data: item, }) }>
             <View style={{width:this.state.width,backgroundColor:Theme.colors.theme,flexDirection:"row",paddingRight:20,paddingLeft:20,paddingTop:10,paddingBottom:10}}>
 <View style={{flexDirection:"column",flex:1}}>
                <Text
                  style={{ color:Theme.colors.white,fontSize:18}}
            >
                  {item.strLeague}
                </Text>
                <Text
                  style={{color:Theme.colors.white}}
            >
                  {item.strSport}
                </Text>
              
              </View>
              <Entypo name='chevron-small-right' color={'white'} size={20} style={{ padding: 10, alignSelf: "center", paddingLeft: 40 }} />
             </View>
            //  {/* </TouchableOpacity> */}
            );
          };

        return (
            <SafeAreaView style={{flex: 1}}>
            <View style={styles.TopSide}   >

                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <Loader loading={this.state.loading} />
             

                    <View style={{ flexDirection: 'column',backgroundColor:"#000" ,height:this.state.height}}>

                    <FlatList
                
          data={this.state.NewData}
          ItemSeparatorComponent={this.ListViewItemSeparator}
        //   ListEmptyComponent={this.ListEmpty}
          renderItem={ItemView}
          keyExtractor={(item, index) => `${Math.random()}`}
        />
                    
                </View>

               
            
            </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({

    TopSide: {
        flex: 1, backgroundColor: Theme.colors.gray,
        flexDirection: 'column'
    },
     Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        backgroundColor: Theme.colors.white

    },
  
});