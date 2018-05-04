import {TabNavigator} from 'react-navigation';
import React, {Component} from 'react'

import Icon from 'react-native-vector-icons/dist/FontAwesome';


import About from '../pages/test/About'
import MainContainer from '../pages/test/MainContainer'
import CategoryContainer from '../pages/test/CategoryContainer'
import Feedback from '../pages/test/Feedback'

import InformationModule from '../pages/InformationModule'
import WorkModule from '../pages/WorkModule'
import OrganizationModule from '../pages/OrganizationModule'
import Settings from '../pages/Settings'


const size = 25

const TabContainer = TabNavigator(
    {
        InformationModule: {
            screen: InformationModule,
            navigationOptions: {
                tabBarLabel: '信息',
                tabBarIcon: ({tintColor}) => (
                    <Icon name={"tty"} size={size} color={tintColor}/>
                )
            }
        },
        WorkModule: {
            screen: WorkModule,
            navigationOptions: {
                tabBarLabel: '工作',
                tabBarIcon: ({tintColor}) => (
                    <Icon name={"dashboard"} size={size} color={tintColor}/>
                )
            }
        },
        OrganizationModule: {
            screen: OrganizationModule,
            navigationOptions: {
                tabBarLabel: '组织',
                tabBarIcon: ({tintColor}) => (
                    <Icon name={"sitemap"} size={size} color={tintColor}/>
                )
            }
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor}) => (
                    <Icon name={"user-o"} size={size} color={tintColor}/>
                )
            }
        },

        // Main: { screen: MainContainer },
        Category: { screen: CategoryContainer },
        // Feedback: { screen: Feedback },
        // MyUserCenter: { screen: About,
        //     navigationOptions:{
        //         tabBarLabel: '我的',
        //        // tabBarOnPress:({previousScene,scene,jumpToIndex})=>jumpToIndex(scene.index),
        //         tabBarIcon:({ tintColor })=>(
        //             <Icon name={"user-o"} size={25} color={ tintColor }/>
        //         )
        //     }}
    },
    {
        //lazy: true,
        backBehavior: "none",
        tabBarPosition: 'bottom',
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff',
            },
            labelStyle: {
                 margin: 0,
                 padding: 0,
                fontSize: 12,
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            },
            iconStyle:{ //只适用于android
                width:"100%",
                height:30,
                opacity:1
            }
        },
        swipeEnabled: false
    }
);


export default TabContainer;