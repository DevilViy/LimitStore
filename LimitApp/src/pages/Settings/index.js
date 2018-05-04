
import React,{Component}from 'react';
import { StyleSheet, Image, Text, Linking, View,Alert,TouchableOpacity} from 'react-native';
import {connect} from  'react-redux'

import {Button,Progress} from 'antd-mobile'
import * as StorageAction from '../../actions/LoginScreen'
import {ResetNavigation} from "../../utils/ResetNavigation";
import codePush from 'react-native-code-push'
import {deploymentKey} from "../../utils/DevelopmentKey";
import {Bars} from '../../components/LoadingBar'




class Settings extends Component {
    constructor(props){
        super(props)
        this.state={
            receivedBytes:0,
            totalBytes:0,
            percent:0,
        }
    }

    signOut=()=>{
        ResetNavigation({dispatch,page:"Login"})
    }

    componentDidMount() {

    }

    codePushCheck=()=>{

        codePush.checkForUpdate(deploymentKey).then((update) => {
            console.log('update',update)
            if (!update) {
                Alert.alert("提示", "已是最新版本-_-", [
                    {
                        text: "Ok", onPress: () => {
                        console.log("点了OK");
                    }
                    }
                ]);
            } else {
                codePush.sync({
                        deploymentKey: deploymentKey,
                        updateDialog: {
                            optionalIgnoreButtonLabel: '稍后',
                            optionalInstallButtonLabel: '立即更新',
                            optionalUpdateMessage: '有新版本了，是否更新？',
                            title: '更新提示'
                        },
                        installMode: codePush.InstallMode.IMMEDIATE,

                    },
                    (status) => {
                        switch (status) {
                            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                                console.log("DOWNLOADING_PACKAGE");
                                break;
                            case codePush.SyncStatus.INSTALLING_UPDATE:
                                console.log(" INSTALLING_UPDATE");
                                break;
                        }
                    },
                    (progress) => {
                    console.log('progress',progress)
                    const {receivedBytes,totalBytes}=progress
                    this.setState({
                        receivedBytes,totalBytes,percent:Math.ceil(receivedBytes/totalBytes*100)
                    })
                        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
                    }
                );
           }
       })
    }

    render() {
        console.log('%c Setting this','color:red',this.props)
        console.log(this.state)
        const {percent}=this.state
        return (
            <View style={styles.container}>
                <Text>
                    我是Settings
                </Text>
                <Button onClick={()=>{
                    this.signOut()
                    dispatch(StorageAction.EditStorage({ userNameText: "", passWordText: "", token:"",status:0}))
                }}>退出</Button>
                <TouchableOpacity style={{height:30}}
                        type="primary" onPress={this.codePushCheck}>
                        <View style={{backgroundColor:'red',
                            flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}>
                            {percent?<Bars size={10} color={"#fff"}/>:null}
                            <Text style={{color:"#fff"}}>
                            更新{percent?percent:null}
                            </Text>
                        </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});

const mapStateToProps=({LoginScreen})=>{
    return {LoginScreen}
}

export default connect(mapStateToProps)(Settings);