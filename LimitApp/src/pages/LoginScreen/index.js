import React,{Component}from 'react';
import {connect} from  'react-redux'
import { StyleSheet, Image, Text, Linking, View, TextInput, ImageBackground, StatusBar } from 'react-native';
import NavigationBar from '../../components/NavigationBar'
import {ResetNavigation} from "../../utils/ResetNavigation";
import {Button, List, InputItem, WhiteSpace, Toast } from 'antd-mobile'
import TextInputLayout from '../../components/TextInputLayout'
import * as LoginScreenAction from '../../actions/LoginScreen'


class LoginScreen extends Component {
    constructor(props){
        super(props)
        const {LoginScreen:{userNameText,passWordText}}=props
        this.state={
            userNameText,
            passWordText,
        }
    }
    jumpRegister=()=>{
        dispatch({
            type:'navigate',
            payload:{
                page:"Register"
            }
        })
    }
    jumpForget=()=>{
        dispatch({
            type:'navigate',
            payload:{
                page:"Forget"
            }
        })
    }
    clickLogin=()=>{
        const {userNameText,passWordText} = this.state
        console.log(userNameText,passWordText)
        // console.log('onPress')
        // dispatch({
        //     type:'navigate',
        //     payload:{
        //         page:"HomePage"
        //     }
        // })
        dispatch(LoginScreenAction.Login_login({userNameText,passWordText}))
        // login({username:userNameText,password:passWordText}).then((resp)=>{
        //     console.log('resp',resp)
        //     if(resp.status===1){
        //         Toast.info('欢迎访问', 1)
        //         ResetNavigation({dispatch,page:"HomePage"})
        //     }
        //     else if(resp.status===0){
        //         Toast.info(resp.message, 1)
        //     }
        // })
    }

    componentWillReceiveProps(nextProps) {
        const {LoginScreen:{userNameText,passWordText,status,message}}=nextProps
        if(status===1){
            Toast.info('欢迎访问', 1)
            ResetNavigation({dispatch,page:"HomePage"})
        }else{
            Toast.info(message, 1)
        }
    }

    render() {
         console.log('this',this.props,this.state)
        const {userNameText,passWordText} = this.state
        return (
            <View style={{flexDirection: 'column',flex:1}}>
                {/* <StatusBar
                // animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
                hidden={false}  //是否隐藏状态栏。  
                // translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  
                barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')   
                >  
                </StatusBar>   */}
                <ImageBackground source={require('../../img/background.jpg')} style={styles.container}>
                    {/* <NavigationBar title={"登陆"}/> */}
                    {/* <View style={{height:'30%'}}><Text>some other</Text></View> */}
                    <View style={{flexDirection: 'column'}}>
                        <View style={{height:'40%'}}>
                            <Image source={require('../../img/logo.png')} style={{marginTop:40,marginLeft:20}}/>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <Text style={styles.textMax}>让组织变的可计算</Text>
                        </View>
                        <View style={{flexDirection:'column',marginHorizontal: 20}}>
                            <TextInputLayout
                                style={styles.inputLayout}
                            >
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'手机号或账号'}
                                    onChangeText={(value)=>{this.state.userNameText = value}}
                                />
                            </TextInputLayout>
                            <TextInputLayout
                                style={styles.inputLayout}
                            >
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'密码'}
                                    secureTextEntry={true}
                                    onChangeText={(value)=>{this.state.passWordText = value}}
                                />
                            </TextInputLayout>
                            <WhiteSpace/>
                            <Button type="primary" onClick={this.clickLogin} style={styles.submitButton}>登陆</Button>
                            <WhiteSpace />
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={styles.text} onPress={this.jumpForget}>忘记密码</Text>
                                <Text style={styles.text} onPress={this.jumpRegister}>注册账号</Text>
                            </View>
                        </View>
                        {/* <Text style={{backgroundColor:'red'}}onPress={onPress}>
                            我是登陆,你点我啊
                        </Text> */}
                    </View>
                    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:20}}>
                        <Text style={styles.text}>上海奇弦智能科技有限公司</Text>
                        <Text style={styles.text}>Copyright@2017</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'space-between',
        width:'100%',
        height:'100%',
    },
    textInput: {
        fontSize: 16,
        height: 40,
        color:'white'
    },
    inputLayout: {
        marginTop: 16,
    },
    submitButton:{
        height:35,
    },
    text:{
        backgroundColor:'transparent',
        color:'white',
    },
    textMax:{
        backgroundColor:'transparent',
        color:'white',
        fontSize:25,
    },
});

const mapStateToProps=(state)=>{
    return {
        LoginScreen:state.LoginScreen
    }
}

export default connect(mapStateToProps)(LoginScreen);