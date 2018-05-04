
import React,{Component}from 'react';
import {connect} from 'react-redux'
import { StyleSheet, Image, Text, Linking, View } from 'react-native';
import {Button} from 'antd-mobile'
import { Badge } from 'react-native-elements';

import NotificationIcon from './NotificationIcon'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconBadge from 'react-native-icon-badge';


const size = 25
//<Icon name={"tty"} size={size} color={tintColor}/>

class CategoryContainer extends Component {
    static  navigationOptions= ({ navigation, screenProps }) =>{
        //console.log('navigation',navigation,"params",navigation.state.params,"screenProps",screenProps,'this.props')
        return {
            tabBarLabel: '测试信息',
            tabBarIcon: ({tintColor}) => (

                <NotificationIcon tintColor={tintColor}/>

            )
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('%c 这个ReceiveProps','color:blue',nextProps)
    }

    render() {
        console.log('aaaa',this.state,this.props)
        return (
            <View style={styles.container}>
                <Text>
                    我是CategoryContainer
                </Text>
                <Button onClick={()=>{
                    //this.props.navigation.setParams({ showNumber: '1111' })
                    dispatch({
                        type:"test",
                        payload:{notifications:['test','test2']}
                    })
                }}>test</Button>
                <Badge
                    value={3}
                    textStyle={{ color: 'orange' }}
                />
                <Badge containerStyle={{ backgroundColor: 'violet'}}>
                    <Text>User 1</Text>
                </Badge>
                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
                    <IconBadge
                        MainElement={
                            <View style={{backgroundColor:'#489EFE',
                                margin:6,
                                flexDirection: 'row',alignItems: 'center',justifyContent: 'center',
                            }}>
                            <Icon name={"tty"} size={size} color={'red'} />
                            </View>
                        }
                        BadgeElement={
                            <Text style={{color:'#FFFFFF'}}>{4}</Text>
                        }
                        IconBadgeStyle={
                            {   width:12,
                                height:12,
                                overflow:"hidden",
                                backgroundColor: '#FF00EE'}
                        }
                       // Hidden={this.state.BadgeCount==0}
                    />
                </View>
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

const mapStateToProps=(state)=>{
    return {
        CategoryContainer:state.CategoryContainer
    }
}

export default CategoryContainer;