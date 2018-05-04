
import React,{Component}from 'react';
import {connect} from  'react-redux'
import {StyleSheet, View, TextInput, Text} from 'react-native';
import NavigationBar from '../../../components/NavigationBar'
import {Button} from 'antd-mobile'
import TextInputLayout from '../../../components/TextInputLayout'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


class TwoTest extends Component {
    componentWillUnmount() {
        console.log('你离开了我')
    }
    render() {
        console.log('this.propsTwoTest',this.props)
        const name='kkkkk@qq.com'
        return (
            <View style={styles.container}>
                <NavigationBar title="two"/>
                <TextInputLayout
                    style={styles.inputLayout}
                    checkValid={t => {
                        console.log('onname',name,'t',t)
                        return EMAIL_REGEX.test(t)}}
                >
                    <TextInput
                        defaultValue={name}
                        style={styles.textInput}
                        placeholder={'Email'}
                        onChangeText={(test)=>{console.log('test',test)}}
                    />
                </TextInputLayout>
                <TextInputLayout style={styles.inputLayout}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Password'}
                        secureTextEntry={true}
                    />
                </TextInputLayout>
                {/*<Text>*/}
                    {/*fffff*/}
                {/*</Text>*/}
            </View>
        );
    }
}


export default connect(state=>state)(TwoTest);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    }
});