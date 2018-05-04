import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import NavigationBar from '../../components/NavigationBar'
import { List, InputItem, WhiteSpace, Button, Picker, Toast } from 'antd-mobile'
import TextInputLayout from '../../components/TextInputLayout'
import TimerButton from '../../components/TimerButton'
import {sendSms,checkCode} from '../../services/api'

const PHONE_REGEX = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
const Nation_Dict = [{value:'86',label:'中国大陆'},{value:'852',label:'香港行政区'},{value:'853',label:'澳门特别行政区'},{value:'886',label:'台湾地区'},{value:'1',label:'美国'},{value:'65',label:'新加坡'}]

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber:'',
            nation:['86'],
            checkNumber:'',
        };
    }
    jumpLogin=()=>{
        dispatch({
            type:'navigate',
            payload:{
                page:"Login"
            }
        })
    }
    jumpTwo=()=>{
        // 调用后端，将checkNumber传到后端，后端和发出的code匹配，返回状态值到前端
        const {phoneNumber,checkNumber} = this.state
        if(phoneNumber===''||checkNumber===''){
            Toast.info('请完整的填完信息')
        }
        else{
            checkCode({phone:phoneNumber,code:checkNumber}).then((resp)=>{
                console.log('resp',resp)
                if(resp.status===0){
                    // 验证码失效
                    Toast.info(resp.message,1)
                }
                else if(resp.status===2){
                    // 验证码输入错误
                    Toast.info(resp.message,1)
                    this.setState({
                        checkNumber:'',
                    })
                }
                else if(resp.status===1){
                    // 成功
                    dispatch({
                        type:'navigate',
                        payload:{
                            page:'RegisterTwo',
                            data:{phoneNumber:phoneNumber},
                        }
                    })
                }
            })
        }
    }
    jumpTest=()=>{
        const {phoneNumber,checkNumber} = this.state
        dispatch({
            type:'navigate',
            payload:{
                page:'RegisterTwo',
                data:{phoneNumber:phoneNumber},
            }
        })
    }
    clickGetCheck=(shouldStartCountting)=>{
        const {phoneNumber} = this.state
        if(PHONE_REGEX.test(phoneNumber)) {
            // 调用后段给用户发送code发送成功后返回状态值到前端，从而改变获取验证码的状态
            sendSms({phone:phoneNumber}).then((resp)=>{
                console.log('resp',resp)
                if(resp.status===1){
                    // 成功
                    shouldStartCountting(true)
                    Toast.info(resp.message,1)
                }
                else if(resp.status===0){
                    // 手机号被注册
                    Toast.info(resp.message,1)
                    this.setState({
                        phoneNumber:'',
                    })
                    shouldStartCountting(false)
                }
                else{
                    // 短信发送失败
                    Toast.info(resp.message,1)
                    shouldStartCountting(false)
                }
            })
        }
        else {
            // 匹配不为手机号就不能点击
            Toast.info("请输入正确的手机号码",1)
            shouldStartCountting(false)
        }
    }
    render() {
        const {phoneNumber, nation, checkNumber } = this.state
        return (
            
            <View style={styles.container}>
                {/* <StatusBar
                barStyle={'dark-content'}/> */}
                <NavigationBar title={"注册"}/>
                <View style={{height:'30%'}}>
                    <Image source={require('../../img/logo.png')} style={{marginTop:20,marginLeft:10}}/>
                </View>
                <View style={{flexDirection:'column',marginHorizontal: 10}}>
                    <Picker
                        value={nation}
                        onChange={(value) => {console.log(value);this.setState({nation: value})}}
                        data={Nation_Dict}
                        cols={1}
                    >
                        <List.Item arrow="horizontal" style={{paddingLeft:-15}}>选择国家或地区</List.Item>
                    </Picker>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop: 16,height: 40,}}>
                        <TextInput
                            style={styles.textInputDefault}
                            value={'+'+nation[0]}
                            editable={false}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'手机号'}
                            value={phoneNumber}
                            onChangeText={(value)=>{this.setState({phoneNumber:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                        <TextInput
                            style={styles.textCheckInput}
                            placeholder={'验证码'}
                            value={checkNumber}
                            onChangeText={(value)=>{this.setState({checkNumber:value})}}
                        />
                        <View style={{flexDirection:'row',justifyContent:'center',width:'50%',height: 40,alignItems:'center'}}>
                            <TimerButton enable={true}
                                style={{width: 110}}
                                textStyle={{color: '#108ee9'}}
                                timerCount={60}
                                onClick={(shouldStartCountting)=>{
                                    //shouldStartCountting：回调函数，接受一个Bool类型的参数 shouldStartCountting(true)，开始倒计时，倒计时结束时自动恢复初始状态 shouldStartCountting(false)， 按钮的selfEnable会立即被置为true
                                    this.clickGetCheck(shouldStartCountting)
                                }}/>
                        </View>
                    </View>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.jumpTwo} style={styles.submitButton}>下一步</Button>
                    <WhiteSpace />
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Text onPress={this.jumpLogin}>登陆</Text>
                    </View>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    textInputDefault:{
        width:'20%',
        fontSize: 16,
        borderBottomWidth:0.5,
        borderBottomColor:'#bfbfbf',
    },
    textInput: {
        width:'80%',
        fontSize: 16,
        borderBottomWidth:0.5,
        borderBottomColor:'#bfbfbf',
    },
    textCheckInput: {
        fontSize: 16,
        borderBottomWidth:0.5,
        borderBottomColor:'#bfbfbf',
        marginTop:16,
        height: 40,
        width:'50%',
    },
    textCheckInputPress: {
        fontSize: 16,
        borderBottomWidth:0.5,
        borderBottomColor:'#bfbfbf',
        marginTop:16,
        height: 40,
        width:'50%',
    },
    submitButton:{
        height:35,
    }
});

export default Register;