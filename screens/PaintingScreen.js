import React from 'react';
import { ExpoConfigView } from '@expo/samples';
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
import { Icon, Permissions, Camera } from 'expo';

import person1 from '../assets/images/person1.jpeg';
import person2 from '../assets/images/person2.jpg';



import {ArtItem,ContentSelector} from "./ArtScreen";

const comments = [{
    img: person1,
    name: "Matthew",
    comment: "Indeed a timeless classic. The colour matches beautifully with the background. Everything is just perfect",
    rating: "4.9",},{
    img: person2,
    name: "Andrew",
    comment: "Pretty average painting, nothing special",
    rating: "3",
}]

class CommentComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{marginTop: 20}}>
                <FlatList data = {this.props.comments}
                          renderItem={({item, index}) => {return (
                              <View>
                                  <View style={styles.detailContainer}>
                                      <View style={styles.inline}>
                                          <Image source={item.img} style={styles.CommenterImg}/>
                                          <Text style={styles.CommenterName}>{item.name}</Text>
                                      </View>
                                      <View style={[styles.inline,{marginRight: 10}]}>
                                          <Text style={styles.val}>{item.rating}/5</Text>
                                          <Icon.Ionicons
                                              name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
                                              size={30}
                                              style={{marginLeft: -5}}
                                              color='#ffff00'/>
                                      </View>
                                  </View>
                                  <Text style={styles.comment}>{item.comment}</Text>
                                  <View style={{width: "95%",height: 1, borderTopWidth: 0.5, margin : 5}}></View>
                              </View>)}}
                          keyExtractor={(item,index) => item.name}/>
            </View>
        )
    }
}
class DetailsComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{marginTop: 20}}>
                <FlatList data = {this.props.details}
                          renderItem={({item, index}) => {return (
                              <View style={[styles.detailContainer,index%2==0?{backgroundColor: '#dce3ef'}:{}]}>
                                  <Text style={styles.key}>{item.key}</Text>
                                  <Text style={styles.val}>{item.val}</Text>
                              </View>
                          )}}
                          keyExtractor={(item,index) => item.key}
                />
            </View>
        )
    }
}

export default class PaintingScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selected: 0,
            hasCameraPermission: false,
        };
        this.toggle=this.toggle.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('item').name,
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },
            headerRight: (
                <View style={[styles.inline,{marginRight: 10}]}>
                    <TouchableOpacity>
                        <Icon.Ionicons
                            name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                            size={25}
                            style={{marginRight: 20}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon.Ionicons
                            name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
            )
    }};

    toggle(select){
        this.setState({selected: select})
    }

    renderDetails(dat){
        return (
            <DetailsComponent details={dat}/>
        )
    }

    renderComments(){
        return(
            <CommentComponent comments={comments}/>
        )
    }

    async openCamera(){
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }


    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');
        return(
            <View style={styles.container}>
                <ScrollView>
                    <ArtItem details={true} item={item} navigation={this.props.navigation}/>
                    <ContentSelector width="90%" options={["Detail","Comments"]} outerToggle={this.toggle}/>
                    {this.state.selected==0?this.renderDetails(item.details):this.renderComments()}
                    <View style={{height: 55}}></View>
                </ScrollView>
                <TouchableOpacity style={{position: 'absolute',
                    borderRadius: 5,
                    backgroundColor: 'rgb(255,66,87)',
                    bottom: 0,
                    marginBottom: 10,
                    alignSelf: 'center',
                    width: "90%",
                    height: 40,
                    justifyContent: 'center'
                }}>
                    <Text style={{fontSize: 21, color: '#fff', textAlign: 'center'}}>Buy Now</Text>
                </TouchableOpacity>
            </View>

        )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    key: {
        fontSize: 21,
        marginLeft: 10,
    },
    val: {
        textAlign: 'right',
        fontSize: 21,
        marginRight: 10,
    },
    detailContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
    },
    CommenterImg:{
        height: 40,
        width: 40,
        borderRadius: 25,
        marginLeft: 10,
    },
    CommenterName: {
        marginLeft: 10,
        fontSize: 18,
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    comment: {
        marginLeft: 10,
        fontSize: 15
    }
});