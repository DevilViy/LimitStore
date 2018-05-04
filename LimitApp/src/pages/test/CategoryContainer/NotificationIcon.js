// NotificationIcon.js
import React, {Component} from 'react';
import {Text, Image, View} from 'react-native';
import {connect} from 'react-redux';
import {Badge} from 'antd-mobile'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {scaleSize, setSpText} from "../../../utils/ScreenUtils";


const size = 25


class NotificationIcon extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('%c NotificationIcon_props', 'color:green', this.props)
        const {CategoryContainer: {notifications}, tintColor} = this.props;
        {/*<View style={{*/}
        {/*position: 'absolute',*/}
        {/*top: 2,*/}
        {/*right: 2,*/}
        {/*}}>*/}
        {/*<Badge text={77} overflowCount={55}*/}
        {/*/>*/}
        {/*</View>*/}
        const IconPage = (
            <View style={{
                  flexDirection: 'row',
                 alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Icon name={"tty"} size={size} color={tintColor} style={{  position: 'absolute',}}/>
                {
                    //notifications.length > 0 ?
                        <View style={{
                            bottom:6,
                            left:12,
                            // position: 'absolute',
                            // bottom:scaleSize(20),
                            // left: scaleSize(10),
                            width: 18,
                            height: 18,
                            overflow:'hidden',
                            borderRadius: 9,
                            backgroundColor: 'red',
                            justifyContent: 'center', alignItems: 'center',
                        }}>
                            <Text style={{color:'#fff',}}>5</Text>
                            {/*<View>*/}
                            {/*<Badge text={77} overflowCount={55} size="small"/>*/}
                            {/*</View>*/}
                        </View>


                    // : undefined
                }
            </View>
        )


        return (
            <View>
                {IconPage}
            </View>
        );
    }
}

const mapStateToProps = state => ({CategoryContainer: state.CategoryContainer});

export default connect(mapStateToProps, null)(NotificationIcon);