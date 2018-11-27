import React from 'react';
import {
    Image,
    Platform,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Icon, LinearGradient} from "expo";

import img1 from '../assets/images/art1.jpg';
import img2 from '../assets/images/art2.jpg';
import water from '../assets/images/watercolor.jpg';
import acrylic from '../assets/images/acrylic.jpg';
import ink from '../assets/images/ink.jpg';
import diy from '../assets/images/diy.jpg';
import ceramic from '../assets/images/ceramic.jpg'

const catDat = [{cat: "Ink", img: ink},{cat: "Acrylic", img: acrylic},{cat: "Ceramic", img: ceramic},{cat: "DIY Gift", img: diy},{cat: "Water Color", img: water},{cat: "Famous", img: img1}];

const dim = Dimensions.get("window");
const DeviceWidth = dim.width;

class CategoryItem extends  React.Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <TouchableOpacity style={{width: (this.props.index+1)%3===0?"95%":"46%"}}>
                    <ImageBackground source={this.props.item.img}
                                     style={{width: "100%",
                                         marginBottom: 10}}
                                     resizeMode='cover'>
                        <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.4)']}>
                            <View style={{justifyContent: 'center',height: 150, alignItems: 'center'}}>
                                <Text style={{textAlign: "center", color: 'white'} }>{this.props.item.cat}</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
            </TouchableOpacity>
        )

    }
}

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Explore",
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            flex:1
        },
        headerRight: (
            <View></View>
        ),
        headerLeft: (
            <TouchableOpacity>
                <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                    size={26}
                    style={{marginLeft: 15}}
                />
            </TouchableOpacity>
        )

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Swiper activeDotColor="#fff">
                        <View style={styles.slide}>
                            <Image source={img1} style={styles.swiperImg}/>
                        </View>
                        <View style={styles.slide}>
                            <Image source={img2} style={styles.swiperImg}/>
                        </View>
                    </Swiper>
                </View>
                <FlatList
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1,justifyContent: 'space-evenly'}}
                    style={{marginTop: 8}}
                    data={catDat}
                    horizontal={false}
                    renderItem={({ item, index }) => <CategoryItem item={item} index={index}/>}
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                />
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe',
    },

    wrapper: {
        height: "35%",

    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiperImg:{
        width: DeviceWidth,
        height: "100%",
    },

});
