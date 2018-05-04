
import React,{Component}from 'react';
import {connect} from  'react-redux'
import { StyleSheet, Image, Text, Linking, View } from 'react-native';
import NavigationBar from '../../components/NavigationBar'
import {Button} from 'antd-mobile'


class OnlyTest extends Component {
    componentWillUnmount() {
        console.log('你离开了我')
    }
    render() {
        console.log('???????')
        const onPress=()=>{
            console.log('onPress')
            dispatch({
                type:'navigate',
                payload:{
                    page:"HomePage"
                }
            })
        }
        return (
            <View style={styles.container}>
                <NavigationBar title={"仅尝试"}/>
                <Button type="primary" size="small" inline onClick={onPress}> 我是Only,你点我啊</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
});

export default OnlyTest;