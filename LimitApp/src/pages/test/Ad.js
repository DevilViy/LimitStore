
import React,{Component}from 'react';
import {connect} from  'react-redux'
import { StyleSheet, Image, Text, Linking, View } from 'react-native';
import NavigationBar from '../../components/NavigationBar'
import {Button} from 'antd-mobile'
import {ResetNavigation} from "../../utils/ResetNavigation";
import * as LoginType from '../../actionType/Login'
import * as LoginAction from '../../actions/Login'


class Ad extends Component {
    componentWillUnmount() {
        console.log('你离开了我')
    }
    render() {
        console.log('???????',this.props)
        const onPress=()=>{
            console.log('onPress')
            ResetNavigation({dispatch,page:"Login"})
            // dispatch({
            //     type:'navigate',
            //     payload:{page:"Login"}
            // })

        }
        const onPress1=()=>{
            dispatch(LoginAction.Login1("ddddd"))
        }
        const onPress2=()=>{
            dispatch(LoginAction.Login2())

        }
        const onPress3=()=>{
            dispatch(LoginAction.Login3({name:'我只是测试'}))

        }
        const onPress4=()=>{
            dispatch({
                type:'navigate',
                payload:{page:"TwoTest"}
            })

        }
        const onPress5=()=>{
            dispatch({
                type:"Login_login",
                payload:{ userNameText: "",
                    passWordText: "",
                    token:"",}
            })

        }


        return (
            <View style={styles.container}>

                <Button type="primary" size="small" inline onClick={onPress}> Ad</Button>
                <Button type="primary" size="small" inline onClick={onPress1}> Ad1</Button>
                <Button type="primary" size="small" inline onClick={onPress2}> Ad2</Button>
                <Button type="primary" size="small" inline onClick={onPress3}> Ad3</Button>
                <Button type="primary" size="small" inline onClick={onPress5}> Ad5</Button>
                <Button type="primary" size="small" inline onClick={onPress4}> 跳转测试</Button>
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

const select=(state)=>{
    return{Login:state.Login}
}

export default connect(select)(Ad);