import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Image, ScrollView } from "react-native";
import NavigationBar from '../../components/NavigationBar'
import { List, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile'
import TextInputLayout from '../../components/TextInputLayout'
import {register} from '../../services/api'

USERNAME_REGEX = /^.*[^\d].*$/
COUNT_REGEX = /^.{6,}$/

class RegisterTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameText:'',
            passWordText:'',
            passWordTextCheck:'',
            realNameText:'',
            phoneNumber:props.navigation.state.params.phoneNumber,
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
    clickRegister=()=>{
        const {userNameText,passWordText,passWordTextCheck,realNameText,phoneNumber} = this.state
        console.log('state',userNameText,realNameText,passWordText,passWordTextCheck)
        if(userNameText===''||passWordText===''||passWordTextCheck===''||realNameText===''){
            Toast.info('请完整的填完信息', 1)
        }
        else{
            if(USERNAME_REGEX.test(userNameText)){
                if(passWordText===passWordTextCheck){
                    if(COUNT_REGEX.test(passWordText)){
                        // 将密码，用户名，手机号传给后端，然后回到登陆界面
                        const body = {username:userNameText,password:passWordText,real_name:realNameText,phone:phoneNumber}
                        register(body).then((resp)=>{
                            console.log('resp',resp)
                            if(resp.status===1){
                                // 成功
                                Toast.info(resp.message, 1)
                                this.jumpLogin()
                            }
                            else if(resp.status===0){
                                // 失败
                                Toast.info(resp.message, 1)
                                this.setState({
                                    userNameText:'',
                                })
                            }
                        })
                        
                    }
                    else{
                        this.setState({
                            passWordText:'',
                            passWordTextCheck:'',
                        })
                        Toast.info('密码小于六位，请重新输入', 1)
                    }
                }
                else{
                    this.setState({
                        passWordText:'',
                        passWordTextCheck:'',
                    })
                    Toast.info('两次密码输入不一致，请重新输入', 1)
                }
            }
            else{
                this.setState({
                    userNameText:'',
                })
                Toast.info('用户名不能为纯数字，请重新输入', 1)
            }
        }
    }
    render() {
        const {userNameText,passWordText,passWordTextCheck,realNameText} = this.state
        return (
            <View style={styles.container}>
                <NavigationBar title={"注册"}/>
                <View style={{height:'30%'}}>
                    <Image source={require('../../img/logo.png')} style={{marginTop:20,marginLeft:10}}/>
                </View>
                <ScrollView style={{flexDirection:'column',marginHorizontal:10}}>
                    <Text style={{fontSize:16}}>请填写相关用户信息</Text>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop: 16,height: 40,}}>
                        <TextInput
                            style={styles.textInputDefault}
                            value={'用户名'}
                            editable={false}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'用户名不可全部为数字'}
                            value={userNameText}
                            onChangeText={(value)=>{this.setState({userNameText:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop: 16,height: 40,}}>
                        <TextInput
                            style={styles.textInputDefault}
                            value={'真实姓名'}
                            editable={false}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'务必填写真实姓名'}
                            value={realNameText}
                            onChangeText={(value)=>{this.setState({realNameText:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop: 16,height: 40,}}>
                        <TextInput
                            style={styles.textInputDefault}
                            value={'密码'}
                            editable={false}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'密码至少为6位'}
                            secureTextEntry={true}
                            value={passWordText}
                            onChangeText={(value)=>{this.setState({passWordText:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop: 16,height: 40,}}>
                        <TextInput
                            style={styles.textInputDefault}
                            value={'确认密码'}
                            editable={false}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'请再次输入密码'}
                            secureTextEntry={true}
                            value={passWordTextCheck}
                            onChangeText={(value)=>{this.setState({passWordTextCheck:value})}}
                        />
                    </View>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.clickRegister}>注册</Button>
                    <WhiteSpace />
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Text onPress={this.jumpLogin}>登陆</Text>
                    </View>
                </ScrollView>
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
    textInput: {
        width:'75%',
        fontSize: 16,
        borderBottomWidth:0.5,
        borderBottomColor:'#bfbfbf',
    },
    inputLayout: {
        marginTop: 16,
    },
    textInputDefault:{
        width:'25%',
        fontSize: 16,
        borderBottomWidth:0.5,
        borderBottomColor:'#bfbfbf',
    },
    submitButton:{
        height:35,
    }
});

export default RegisterTwo;