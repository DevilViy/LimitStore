import React,{ Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NavigationBar from '../../components/NavigationBar'
import { List, SearchBar } from 'antd-mobile';

const Item = List.Item

class Search extends Component{
    searchSubmit=(value)=>{
        // console.log('you submit',value)
        dispatch({
            type:'navigate',
            payload:{
                page:"SearchResult"
            }
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title={"搜索"}/>
                <SearchBar placeholder="Search" onSubmit={(value)=>this.searchSubmit(value)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor:'white',
       // backgroundColor: 'red'
    },
});

export default Search