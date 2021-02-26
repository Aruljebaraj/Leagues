import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import Images from '../Other/Images';
const Empty = props => {
    return (
        <View style={styles.wrapper}>
             <Image source={Images.empty} style={styles.thumbnail} resizeMode='cover' />
             <Text style={{marginTop:20,fontSize:22,fontWeight:'bold',color:'#424242',justifyContent:'center',alignContent:'center',alignItems:'center',textAlign:'center'}}>Nothing in here yet.</Text>
             <Text style={{fontSize:18,color:'#828282',justifyContent:'center',alignContent:'center',alignItems:'center',textAlign:'center'}}>Please come back later for updates.</Text>
        </View>
    );
};


const styles = {
    wrapper: {
        marginTop: 10,
        justifyContent:'center' ,  
        width: '100%', 
    },
    thumbnailView: {
        width: '100%',
        height:300,
    },
    thumbnail: {
        width: '100%',
        height:210,
    },
    detailsView: {
        flex: 1,
    },

    shipping: {
        position: 'absolute',
        bottom: 10,
        borderWidth: 2,
        borderColor: '#DCDCDC',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 12
    },
    shippingText: {
        fontSize: 13,
        color: '#C0C0C0',
    },
    rating: {
        marginTop: 10
    },
    priceText: {
        marginTop: 5
    }

};
export default Empty;