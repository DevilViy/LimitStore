import React,{Component}from 'react';
import {connect} from  'react-redux'
import { StyleSheet, Image, Text, Linking, View, ScrollView } from 'react-native';
import ScreenUtil from '../../utils/ScreenUtils'
import NavigationBar from '../../components/NavigationBar'
import { SearchBar, Button, List, Badge, SwipeAction } from 'antd-mobile';
import moment from 'moment';
import {GetInformation,UpdateInformationById,DelectInformationById} from '../../actions/InformationModule'


const Item = List.Item
const Brief = Item.Brief

class InformationModule extends Component {
    constructor(props){
        super(props)
        console.log('props',props)
        const {InformationModule:{showData}}=props
        this.state={
            showData
        }
    }
    componentWillMount(){
        dispatch(GetInformation())
    }
    componentWillReceiveProps(nextProps){
        const {InformationModule:{showData}}=nextProps
        this.setState({
            showData:showData
        })
    }
    searchFocus=()=>{
        dispatch({
            type:'navigate',
            payload:{
                page:"Search"
            }
        })
    }
    itemOnclick=(index)=>{
        console.log('click',index)
        dispatch(UpdateInformationById({id:index,type:'dot'}))
    }
    render() {
        const {showData,ssss=0} = this.state
        console.log('showData',showData,this.state)
        return (
            <View style={styles.container}>
                <NavigationBar title={"信息"} left={[]}/>
                <ScrollView>
                    <SearchBar placeholder="Search" onSubmit={(value)=>this.searchSubmit(value)} onFocus={this.searchFocus}/>
                    {showData.map((e,index)=>{
                        let backColor = e.priority?'#ecf6fd':'white'
                        let topText = e.priority?'取消置顶':'置顶'
                        return(
                            <SwipeAction
                                key={index}
                                style={{ backgroundColor: 'gray' }}
                                autoClose
                                //  disabled={index!==ssss}
                                right={[
                                {
                                    text: topText,
                                    onPress: () => dispatch(UpdateInformationById({id:index,type:'priority'})),
                                    style: { backgroundColor: '#ddd', color: 'white' },
                                },
                                {
                                    text: '删除',
                                    onPress: () => dispatch(DelectInformationById(index)),
                                    style: { backgroundColor: '#F4333C', color: 'white' },
                                },
                                ]}
                                onOpen={() => this.setState({ssss:index})}
                                onClose={() => console.log('global close')}
                            >
                                <Item onClick={()=>this.itemOnclick(index)} style={{backgroundColor:backColor}} extra={
                                    <View style={{backgroundColor:'red',flex:1}}>
                                        {/* <Text style={{fontSize:ScreenUtil.setSpText(25),color:'#919191'}}>{moment(e.time).calendar()}</Text> */}
                                        {/* <View><Badge text={99}/></View> */}
                                    </View>
                                } align="top">
                                    <View style={{flexDirection:'row',width:'80%'}}>
                                        <Badge dot={e.dot?true:false}>
                                            <Image source={require('../../img/test.png')} style={styles.listImage}/>
                                        </Badge>
                                        <View style={{flexDirection:'column',marginLeft:ScreenUtil.scaleSize(30),marginVertical:ScreenUtil.scaleSize(10),justifyContent:'space-between'}}>
                                            <Text style={{fontSize:ScreenUtil.setSpText(35)}}>{e.title}</Text>
                                            <Text numberOfLines={1} style={{fontSize:ScreenUtil.setSpText(25),color:'#919191'}}>{e.container}</Text>
                                        </View>
                                    </View>
                                </Item>
                            </SwipeAction>
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor:'white',
       // backgroundColor: 'red'
    },
    header:{
        backgroundColor:'#3e9ce9',
        height:ScreenUtil.scaleSize(60),
        flexDirection:'row',
        alignItems:'center',
    },
    listImage:{
        width:ScreenUtil.scaleSize(100),
        height:ScreenUtil.scaleSize(100),
    }
});

const mapStateToProps=(state)=>{
    return {
        InformationModule:state.InformationModule
    }
}

export default connect(mapStateToProps)(InformationModule);