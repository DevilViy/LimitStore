import React,{ Component } from 'react'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class NavigationBar extends Component{
    goBack = () => {
        let { dispatch } = this.props
        dispatch({
            type:'goBack'
        })
    }
    render(){
        let { title, left, right } = this.props
        if (typeof(title)==='string'){
            title=<Text style={{fontSize:18,fontWeight:'bold',color:'#d2eafb'}}>{title}</Text>
        }
        if (right){
            right = right.map((item,index)=>{//强行添加key
                item = { ...item, key:index }
                return item
            })
        }
        if (left){
            left = left.map((item,index)=>{//强行添加key
                item = { ...item, key:index }
                return item
            })
        }else{
            left = [
                <TouchableOpacity key='navDefaultLeft' onPress={this.goBack}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon name={'chevron-left'} color='#d2eafb' size={16}/>
                        <Text style={{color:'#d2eafb',fontSize:16,marginBottom:2}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ]
        }
        return(
            <View style={styles.container}>
                <View style={styles.left}>{left}</View>
                <View style={styles.title}>{title}</View>
                <View style={styles.right}>{right}</View>
            </View>
        )
    }
}

NavigationBar = connect(({dispatch})=>({dispatch}))(NavigationBar)

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#3e9ce9',
        height:60,
        paddingTop:10,
        flexDirection:'row',
        alignItems:'center',
        zIndex:100,
    },
    left:{
        flex:1,
        flexDirection:'row',
        marginLeft:10
    },
    title:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    right:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:10
    }
})

export default NavigationBar