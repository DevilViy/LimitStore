
import React,{Component}from 'react';
import { StyleSheet, Image, Text, Linking, View } from 'react-native';
import NavigationBar from '../../../components/NavigationBar'
import {Button} from 'antd-mobile'



class About extends Component {


    render() {
        const onPress=()=>{
            console.log('onPress')
            dispatch({
                type:'navigate',
                payload:{
                    page:"OnlyTest"
                }
            })
        }
        return (
            <View style={styles.container}>
                <NavigationBar title={"About"}/>
                <Button type="primary" size="small" inline onClick={onPress}> 我是Aoute,你点我啊</Button>

                <Text>
                    我是About
                </Text>
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

export default About;