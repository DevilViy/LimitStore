import React,{ Component } from 'react'
import { View, Text } from 'react-native'
import NavigationBar from '../../components/NavigationBar'
import { List } from 'antd-mobile';

const Item = List.Item

class SearchResult extends Component{
    render(){
        return(
            <View>
                <NavigationBar title={'搜索结果'} />
                <List renderHeader={() => '好友'}>
                </List>
                <List renderHeader={() => '聊天记录'}>
                </List>
                <List renderHeader={() => '应用'}>
                </List>
            </View>
        )
    }
}

export default SearchResult