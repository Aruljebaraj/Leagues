import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Alert, StatusBar, Dimensions, Linking,
    TextInput, BackHandler, Platform, FlatList, Share, ImageBackground
} from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import * as Theme from '../Other/Theme'
import * as constant from '../Other/Constants'
import { openDatabase } from 'react-native-sqlite-storage';
import Loader from '../Other/Loader'
import Entypo from 'react-native-vector-icons/Entypo'
import Images from '../Other/Images';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import PastEvent from'../Scenes/PastEvent';
import AllEvent from'../Scenes/AllEvent';

var db = openDatabase({ name: constant.DataBaseName });
const FirstRoute = () => (
    <View  >
        <PastEvent/>
    </View>
  );
   
  const SecondRoute = () => (
      <View  >
      <AllEvent/>
  </View>
  );
   
export default class LeagueDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            NewData: [],
            loading: false,
            height: Dimensions.get("window").height,
            width:Dimensions.get('window').width,
            showDefault: true,
            error: false,
            routes: [
                { key: 'first', title: 'Past Event' },
                { key: 'second', title: 'All Season' },
              ],
              index: 0,
        }
      
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        let data = {
            method: 'GET',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
       let url = 'https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id='+this.props.Id;
     //   let url = 'https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id='+4328;
        return fetch(url, data)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    NewData: responseJson.leagues[0],

                });
                var test =this.state.NewData
               console.log(test)
            }).catch((error) => {
                console.error(error);
            });

    }
   
    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 5, width: '100%',backgroundColor:Theme.colors.theme }} />
        )
    }

    AddFav (){
        const { NewData } = this.state;
        var id =NewData.idLeague
        var strSport =NewData.StrSport
        var strLeague =NewData.strLeague

        try {

            db.transaction(function (txn) {
                txn.executeSql(
                    
                            "INSERT INTO " + constant.FavTable + " (idLeague,strLeague, strSport) VALUES (?,?,?)",
                            [id,strLeague, strSport],
                            (tx, results) => {
                                if (results.rowsAffected > 0) {
                                  
                                    alert(' Added to Favourite');
                                } else {
                                    alert(' Failed to Add');
                                }
                            }
                  
    
                );
            
            });
        } catch (error) {
            var test =error;
        }
                
            }
 
    render() {
     
        var image = this.state.showDefault ?
        Images.date : (this.state.error ?
            Images.date : { uri: "https:\/\/www.thesportsdb.com\/images\/media\/league\/fanart\/spqxtv1425356374.jpg" });
       
            return (
            <ScrollView
            //contentContainerStyle={{height:1400}}
            style={styles.Main}>

          
                <View style={{ backgroundColor: 'black' }}>
                    <StatusBar backgroundColor="#000" barStyle="light-content" />

                    <Loader loading={this.state.loading} />
                    <View style={{ flex: 1 }}>

                        <View style={{ backgroundColor: "#fff", height: 400, position: "absolute" }} >
                            <Image
                                //  delay={2000}
                                style={{ height: 400, width: this.state.width }}
                                // animation={'zoomInUp'}
                                source={
                                    image
                                }
                                onLoadEnd={() => this.setState({ showDefault: false })}
                                onError={() => this.setState({ error: true })}
                                resizeMode='cover' />
                        </View>
                        <View style={{

                            height: 50, width: this.state.width
                            , flexDirection: "row", justifyContent: "space-between",
                            position: "absolute", alignItems: "center", backgroundColor: "#000", opacity: 0.6
                        }}>
                            <TouchableWithoutFeedback style={{ width: 18, height: 18, marginLeft: 30, position: 'absolute', }} onPress={() => this.HandleBackPress()}>
                                <Image source={Images.arrow_back}
                                    style={{ width: 10, height: 18, tintColor: Theme.colors.white, marginLeft: 20, }} />
                            </TouchableWithoutFeedback>

                            {/* <Text style={{ alignSelf: "center", fontSize: 19, color: Theme.colors.black }}>Event Details</Text> */}
                            <View style={{
                                flexDirection: "row", alignSelf
                                    : "center",paddingRight:15
                            }}>

                                <TouchableOpacity style={{ alignSelf: "center", }}
                                    onPress={() => this.AddFav()}
                                    >
                                    <View  >
                                        {!this.state.isFav == true ?

                                            <Entypo name='heart-outlined' size={25} color={Theme.colors.white} />
                                            :
                                            <Entypo name='heart' size={25} color={Theme.colors.primary} />
                                        }
                                    </View>
                                </TouchableOpacity>

                                {/* <TouchableOpacity style={{ alignSelf: "center", padding: 10, marginRight: 5 }} onPress={() => this.onShare(`whatsapp://send?text=${Message.replace("@eventName", this.state.data.event_Name)
                                    .replace("@eventDate", moment(this.state.data.event_Date).format('Do MMM  YY')).replace("@location", this.state.data.venue)}`)}>
                                    <Image source={Images.forward} style={{ height: 22, width: 22, tintColor: Theme.colors.white }} />
                                </TouchableOpacity> */}

                             
                            
                          
                            </View>

                        </View>
                        <View style={{
                            flex: 1, backgroundColor: "#000", marginTop: 300,
                            opacity: 0.5
                        }}>
                            <Text style={{
                                fontSize: 24,
                                color: Theme.colors.white,
                                fontFamily: 'roboto_thin',
                                backgroundColor: "#000",
                                paddingLeft: 20,
                                height: 100, alignItems: "center"
                                , alignContent: "center",
                                justifyContent: "center",
                                textAlignVertical: "center",

                            }}>{this.state.NewData.strLeague}</Text>
                        </View>
                        <View style={{
                            flex: 1, backgroundColor: "#000",

                        }}

                        >

                            {/* <LinearGradient colors={['#000', '#000', '#0000']} >
                            

                                </LinearGradient> */}

                            <View style={{ backgroundColor: 'black', marginBottom: 30 }}>

                                <View style={{ flex: 1 }}>


                                    <View style={{ flexDirection: "column", padding: 20 }}>
                                        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                            <Image source={Images.runner}
                                                style={{ height: 30, width: 30, tintColor: Theme.colors.white }} />
                                            <Text style={styles.info, { fontSize: 18, paddingLeft: 10, color: Theme.colors.white }}>{this.state.NewData.strSport}</Text></View>
                                      
                                    </View>
                                   
                                </View>
                                <View style={{ height: 0.5, backgroundColor: "#727171", marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10 }} />
                                <View style={{
                                    flexDirection: "row", flex: 4
                                }}>
                                    <View style={{ flex: 1, alignItems: "center" }}>

                                        <Image source={Images.venue} style={{
                                            height: 40, width: 40,
                                            padding: 10, alignSelf: "center", tintColor: Theme.colors.white
                                        }} />
                                        <Text textBreakStrategy={'balanced'} style={{
                                            fontSize: 15,
                                            color: Theme.colors.white
                                            , alignSelf: 'center',
                                            padding: 5, fontStyle: Theme.fonts.Thin,
                                            textAlign: "center"
                                        }}>{this.state.NewData.strCountry}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "center" }}>

                                        <Image source={Images.schedule} style={{
                                            height: 40, width: 40,
                                            padding: 10, alignSelf: "center", tintColor: Theme.colors.white
                                        }} />
                                        <Text style={{
                                            color: Theme.colors.white,
                                            fontSize: 15, padding: 5
                                        }}>
                                            {(this.state.NewData.strCurrentSeason)}</Text>
                                        {/* <Text style={{
                                            color: Theme.colors.white,
                                            fontSize: 15
                                        }}>
                                            {moment(this.state.data.event_Date).format('YYYY')}</Text> */}


                                    </View>
                                    <View style={{ flex: 1, alignItems: "center", }}>

                                        <Image source={Images.clock} style={{
                                            height: 40, width: 40,
                                            padding: 10, alignSelf: "center", tintColor: Theme.colors.white
                                        }} />
                                        <Text style={{
                                            color: Theme.colors.white,
                                            fontSize: 15, padding: 5
                                        }}>{(this.state.NewData.intFormedYear)}</Text>
                                       
                                    </View>
                                    <View style={{ flex: 1, alignItems: "center", }}>

                                        <Image source={Images.ticket} style={{
                                            height: 40, width: 60,
                                            alignSelf: "center", tintColor: Theme.colors.white
                                        }} />
                                        {/* <Text style={{
                                            color: Theme.colors.white,
                                            fontSize: 15, padding: 5
                                        }}>{this.state.NewData.entry_Type == "True" ? ' Free \nEntry' : ('AED \n' + this.state.data.entry_Value)}</Text>
                                   */}
                                    </View>

                                </View>
                             
                                <View style={{
                                    flexDirection: "column", flex: 1,
                                    marginBottom: 10, marginTop: 10, marginRight: 20, marginLeft: 30
                                }}>

                                    <Text style={{ fontSize: 20, color: Theme.colors.white }}>{this.state.NewData.strDescriptionEN}</Text>

                                </View>





                            </View>


                        </View>

                        <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
                    </View>


                </View> 
          






        </ScrollView>
   );
    }
}
const styles = StyleSheet.create({

    TopSide: {
        flex: 1, backgroundColor: Theme.colors.gray,
        flexDirection: 'column'
    },

  
});