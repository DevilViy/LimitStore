/*
* @memo 广告页面
* */


import React,{Component}from 'react';
import {connect} from  'react-redux'
import { StyleSheet, Image, Text, Linking, View } from 'react-native';
import {Button} from 'antd-mobile'
import {ResetNavigation} from "../../utils/ResetNavigation";
import * as LoginType from '../../actionType/Login'
import * as LoginAction from '../../actions/Login'


class Advertisement extends Component {
    componentWillUnmount() {
        console.log('你离开了我')
    }

    checkStatus=()=>{
        const {LoginScreen:{status}}=this.props
        return !status
    }

    adPress=()=>{
        console.log('onPress')
        const nav_boo=this.checkStatus()
        if(nav_boo){ResetNavigation({dispatch,page:"Login"})}else{
            ResetNavigation({dispatch,page:"HomePage"})
        }
    }
    render() {
        return (
            <View style={styles.container}>

                <Button type="primary" size="small" inline onClick={this.adPress}>Advertisement 测试1</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent:'center'
    },
});

const mapStateToProps=(state)=>{
    return{LoginScreen:state.LoginScreen}
}

export default connect(mapStateToProps)(Advertisement);