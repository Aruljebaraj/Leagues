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
import { Actions } from 'react-native-router-flux';
import * as Theme from '../Other/Theme'
import Entypo from 'react-native-vector-icons/Entypo'
import * as constant from '../Other/Constants'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: constant.DataBaseName });
export default class Leagues extends React.Component {
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
        try {

            db.transaction(function (txn) {
                txn.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='" + constant.FavTable + "'", [],
                    function (tx, res) {
                        console.log('itemM:', res.rows.length);
                        if ( res.rows.length == 0) {
                  
                            txn.executeSql("DROP TABLE IF EXISTS " + constant.FavTable, []);
                            txn.executeSql("CREATE TABLE IF NOT EXISTS " + constant.FavTable + " (idLeague VARCHAR(10) ,strLeague VARCHAR(30), strSport varchar(55))", []);
                            console.warn("Created tables")
                        }
                    }
    
                );
    
            });

  
        } catch (error) {
            var test =error;
        }
      
   
            

        // this.setState({
        //     loading: true
        // });
        let data = {
            method: 'GET',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        let url = 'https://www.thesportsdb.com/api/v1/json/1/all_leagues.php';
        
        return fetch(url, data)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    NewData: responseJson.leagues,

                });
               
            }).catch((error) => {
                console.error(error);
            });

            

    }
  
    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 5, width: '100%',backgroundColor:Theme.colors.theme }} />
        )
    }

  
     ItemView =(rowData)=> {
        return (
           
             <TouchableOpacity  onPress={() => Actions.leagueDetail({ Id: rowData.idLeague,StrLeague:rowData.strLeague ,StrSport:rowData.strSport}) }>
         <View style={{width:this.state.width,backgroundColor:Theme.colors.theme,flexDirection:"row",paddingRight:20,paddingLeft:20,paddingTop:10,paddingBottom:10}}>
<View style={{flexDirection:"column",flex:1}}>
            <Text
              style={{ color:Theme.colors.white,fontSize:18}}
        >
              {rowData.strLeague}
            </Text>
            <Text
              style={{color:Theme.colors.white}}
        >
              {rowData.strSport}
            </Text>
          
          </View>
          <Entypo name='chevron-small-right' color={'white'} size={20} style={{ padding: 10, alignSelf: "center", paddingLeft: 40 }} />
         </View>
     </TouchableOpacity>
        );
      };

    render() {
    
      

        return (
            <SafeAreaView style={{flex: 1}}>
            <View style={styles.TopSide}   >

                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <Loader loading={this.state.loading} />
             

                    <View style={{ flexDirection: 'column',backgroundColor:"#000" ,height:this.state.height}}>

                    <FlatList
                scrollEnabled ={true}
          data={this.state.NewData}
         
          ItemSeparatorComponent={this.ListViewItemSeparator}
          renderItem={({ item: rowData,index }) => this.ItemView(rowData)}
    //       renderItem={({ item: rowData }) => {
    //         return (
    //             <TouchableWithoutFeedback 
    //             // onPress={() => Actions.leagueDetail({ Id: rowData.idLeague,StrLeague:rowData.strLeague,StrSport :rowData.strSport }) }
    //            //  onPress={()=>Actions.leagueDetail()}
    //              onPress={()=>this.Test(rowData)}
    //              >
    //             <View style={{width:this.state.width,backgroundColor:Theme.colors.theme,flexDirection:"row",paddingRight:20,paddingLeft:20,paddingTop:10,paddingBottom:10}}>
    // <View style={{flexDirection:"column",flex:1}}>
    //                <Text
    //                  style={{ color:Theme.colors.white,fontSize:18}}
    //            >
    //                  {rowData.strLeague}
    //                </Text>
    //                <Text
    //                  style={{color:Theme.colors.white}}
    //            >
    //                  {rowData.strSport}
    //                </Text>
                 
    //              </View>
    //              <Entypo name='chevron-small-right' color={'white'} size={20} style={{ padding: 10, alignSelf: "center", paddingLeft: 40 }} />
    //             </View>
    //          </TouchableWithoutFeedback>  );
    //     }}
        keyExtractor={(item, index) => index.toString()}
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

  
});