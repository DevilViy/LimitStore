
import React,{Component}from 'react';
import { StyleSheet, Image, Text, Linking, View } from 'react-native';


class WorkModule extends Component {


    render() {
        return (
            <View style={styles.container}>
                <Text>
                    我是WorkModule
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //backgroundColor: 'red'
    },
});

export default WorkModule;