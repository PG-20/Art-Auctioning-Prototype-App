import React from 'react';
import {
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    View,
    Dimensions,
} from 'react-native';
import { Icon } from 'expo';

import img1 from '../assets/images/art1.jpg';
import img2 from '../assets/images/art2.jpg';
import artist1 from '../assets/images/artist1.jpg';
import artist2 from '../assets/images/artist2.jpg';

const dim = Dimensions.get("window");
const DeviceWidth = dim.width;


const dat = [{url: img1, name: "Starry night", desc: "Timeless classic with water colors this is a long description",
                  fin: "2018-08-01 15:00", price: "$1000",bids: "10",
                  interested: "13",
                  artist: "Mat",
                  artistImg: artist1,
                  details: [{key: "Creation Date", val: "1920-04-17"},{key: "Size",val: "1m x 1m"},{key: "Method", val: "Water Colors"}], },
             {url: img2, name: "van gogh", desc: "timeless classic with man",
                 fin: "2018-08-01 16:00", price: "$2000", bids: "11",
                 interested: "15",
                 artist: "Gogh",
                 artistImg: artist2,
                 details: [{key: "Creation Date", val: "2017-04-17"},{key: "Size",val: "50cm x 60cm"},{key: "Method", val: "Pastel Colors"}]}
];

export class ArtItem extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <TouchableOpacity disabled={this.props.details}
                              style={{marginTop: 5}}
                              onPress={() => {this.props.navigation.navigate('Painting', {'item': this.props.item})}}>
                <View style={this.props.details?{display: 'none'}:{flexDirection: 'row',alignItems: 'center', marginBottom: 8}}>
                    <Image source={this.props.item.artistImg} style={styles.artistImg}/>
                    <Text style={styles.artistName}>{this.props.item.artist}</Text>
                </View>
                <ImageBackground source={this.props.item.url} style={styles.image}>
                    <Text style={this.props.details?{display: 'none'}:styles.fin}>Bidding ends at {this.props.item.fin}</Text>
                    <TouchableOpacity style={this.props.details?styles.ar:{display: 'none'}}
                                      onPress={() => {this.props.navigation.navigate('CameraScreen')}}>
                        <Icon.MaterialCommunityIcons
                            name={'augmented-reality'}
                            size={50}
                        />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: "95%", alignSelf: 'center'}}>
                    <View style={{width: "70%"}}>
                        <Text style={styles.name}>{this.props.item.name}</Text>
                        <Text style={styles.desc}>{this.props.item.desc}</Text>
                        <View style={this.props.details?{display: 'none'}:styles.inline}>
                            <Icon.Ionicons
                                name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
                                size={18}
                                style={{marginLeft: -8, marginRight: 2}}
                            />
                            <Text style={styles.interested}>{this.props.item.interested} people are also watching</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.price}>{this.props.item.price}</Text>
                        <Text style={this.props.details?{display: 'none'}:styles.bids}>{this.props.item.bids} bids</Text>
                    </View>
                </View>
                <View style={this.props.details?[styles.inline,{marginRight: 10, alignSelf: 'flex-end'}]:{display: 'none'}}>
                    <Icon.Ionicons
                        name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
                        size={18}
                        style={{marginRight: 2}}
                    />
                    <Text style={[styles.interested,{textAlign: 'right'}]}>{this.props.item.interested} people are also watching</Text>
                </View>
                <View style={{width: "95%",height: 1.1, borderTopWidth: 0.5, margin : 5}}></View>
                <View style={this.props.details?{}:{display: 'none'}}>
                    <Text style={[styles.name,{marginLeft: 10}]}>Artist</Text>
                    <View style={{flexDirection: 'row',alignItems: 'center', marginBottom: 5}}>
                        <Image source={this.props.item.artistImg} style={styles.artistImg}/>
                        <Text style={styles.artistName}>{this.props.item.artist}</Text>
                    </View>
                    <View style={{width: "95%",height: 1.1, borderTopWidth: 0.5, margin : 5}}></View>
                </View>
            </TouchableOpacity>
        )
    }
};
export class ContentSelector extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selected: 0,
        };
        this.handleChange=this.handleChange.bind(this)
    }

    handleChange(select){
        this.props.outerToggle(select);
        this.setState({selected: select})
    }

    render(){
        return (
            <View style={{width: this.props.width, flexDirection: 'row', height: 30, alignSelf: 'center', marginTop: 10}}>
                <TouchableOpacity style={[this.state.selected==0?styles.selectedItem:styles.unSelectedItem,
                    {borderTopLeftRadius: 5,
                     borderBottomLeftRadius: 5}]}
                                  onPress={() => this.handleChange(0)}>
                    <Text style={this.state.selected==0?styles.selectedItemText:styles.unSelectedItemText}>{this.props.options[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5},
                    this.state.selected==1?styles.selectedItem:styles.unSelectedItem]}
                                  onPress={() => this.handleChange(1)}>
                    <Text style={this.state.selected==1?styles.selectedItemText:styles.unSelectedItemText}>{this.props.options[1]}</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

export default class ArtScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            selected: 0,
        }
        this.handleToggle=this.handleToggle.bind(this)
    }

    static navigationOptions = {
        title: 'Title',
        headerTitleStyle: {
            textAlign:"center",
            flex:1
        },
        headerRight: (
            <View style={{marginRight: 10,flexDirection: 'row',alignItems: 'center',}}>
                <TouchableOpacity>
                    <Icon.Ionicons
                        name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                        size={25}
                        style={{marginRight: 20}}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon.Ionicons
                        name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
                        size={25}
                    />
                </TouchableOpacity>
            </View>
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

    handleToggle(select){
        this.setState({selected: select})
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ContentSelector width="50%" options={["All","My Bid"]} outerToggle={this.handleToggle}/>
                <FlatList data = {this.state.selected===0?dat:[dat[0]]}
                          renderItem={({item}) => {return (<ArtItem item={item} navigation={this.props.navigation} />)}}
                          keyExtractor={(item) => item.name}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    artistImg:{
        height: 50,
        width: 50,
        borderRadius: 25,
        marginLeft: 10,
    },
    fin:{
        position: 'absolute',
        color: '#fff',
        bottom: 0,
        left: 0,
        marginLeft: 10,
        marginBottom: 15,
    },
    ar:{
        position: 'absolute',
        right: 0,
        marginTop: 15,
        marginRight: 10,
    },
    artistName: {
        marginLeft: 10,
        fontSize: 20,
    },
    image: {
        width: DeviceWidth,
        height: 300,
    },
    name: {
        fontSize: 25,
        fontWeight: "500",
        marginBottom: 5,
    },
    desc: {
        fontSize: 20,
    },
    interested:{
        fontSize: 12,
    },
    price:{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    bids: {
        textAlign: 'right',
        fontSize: 15,
    },
    selectedItem:{
        alignItems: 'center',
        justifyContent: 'center',
        width: "50%",
        backgroundColor: 'rgb(255,66,87)',
        borderColor: 'rgb(255,66,87)',
        borderWidth: 1,
    },
    unSelectedItem:{
        alignItems: 'center',
        justifyContent: 'center',
        width: "50%",
        borderColor: 'rgb(255,66,87)',
        borderWidth: 1,
    },
    selectedItemText:{
        color: '#fff',
        fontSize: 18,
    },
    unSelectedItemText:{
        color: 'rgb(255,66,87)',
        fontSize: 18,
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
});



