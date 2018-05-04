import React, {Component} from 'react';
import {StyleSheet, Image, Text, Linking, View, WebView} from 'react-native';
import NavigationBar from '../../../components/NavigationBar'
//import HTMLView from 'react-native-htmlview';

import {Button,Toast} from 'antd-mobile'
//import F2 from '@antv/f2'
const indexHtml=require("./index.html")


class MainContainer extends Component {

    componentDidMount() {

    }

    componentDidUpdate() {

    }



    render() {
        
        return (
            <View style={styles.container}>
                <NavigationBar title={"MainContai"}/>

                <Text>
                    我是MainContainer
                </Text>
                <WebView
                    ref={w => { this.webview = w; }}
                    style={{
                        backgroundColor: "blue",
                        height: 300,
                    }}
                    source={indexHtml}
                    //scalesPageToFit={true}
                />
                <Button onClick={()=>this.forceUpdate()}>ffff</Button>
                {/*<HTMLView*/}
                    {/*value={htmlContent}*/}
                    {/*stylesheet={styles}*/}
                    {/*renderNode={renderNode}*/}
                {/*/>*/}
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
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
    CESHI: {
        backgroundColor: "#FF3366",
        color: 'red'
    }
});

export default MainContainer;