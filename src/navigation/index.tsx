import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import type { StaticParamList } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {RootState} from "../store/Store";
import LeaderTaskScreen from "../screens/LeaderTaskScreen";
import MemberTaskScreen from "../screens/MemberTaskScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ToDo from "../screens/ToDo";
import Doing from "../screens/Doing";
import Done from "../screens/Done";
import { createDrawerNavigator } from '@react-navigation/drawer';
import LeaderTeamView from "../screens/LeaderTeamView";
import LeaderMemberView from "../screens/LeaderMemberView";
import { BLACK, PURPLE } from "../res/colors";

const AuthStack:StaticParamList = createNativeStackNavigator({
    screenOptions:{
        headerShown:false,
        headerTintColor: BLACK
    },
    screens:{
        Login:Login,
        CreateAccount:CreateAccount
    },
    id:undefined
});


const TaskStack:StaticParamList = createBottomTabNavigator({
    screenOptions:{
        headerShown:false,
        tabBarStyle: {
            backgroundColor: BLACK
        },
        tabBarActiveTintColor: PURPLE
    },
    screens:{
        ToDo:ToDo,
        Doing:Doing,
        Done:Done

    },
    id:undefined
});


const LeaderStack:StaticParamList = createNativeStackNavigator({
    screenOptions:{
        headerShown:false,
        headerTintColor: BLACK
    },
    screens:{
        LeaderTeamView:LeaderTeamView,
        LeaderMemberView:LeaderMemberView
    },
    id:undefined
});

const MemberDrawer = createDrawerNavigator({
    screenOptions:{
        headerStyle:{
            backgroundColor: BLACK,
        },
        headerTintColor: PURPLE,
        drawerStyle:{
            backgroundColor: BLACK
        },
        drawerActiveTintColor:PURPLE,
        drawerLabelStyle: {
            color: 'white',
        },
        headerTitleStyle:{
            color: PURPLE
        }
    },

    screens: {
        Tasks:TaskStack
    }
});

const LeaderDrawer = createDrawerNavigator({
    screenOptions:{
        headerStyle:{
            backgroundColor: BLACK,
        },
        headerTintColor: PURPLE,
        drawerStyle:{
            backgroundColor: BLACK
        },
        drawerActiveTintColor:PURPLE,
        drawerLabelStyle: {
            color: 'white',
        },
        headerTitleStyle:{
            color: PURPLE
        }
    },
    screens: {
        Tasks:LeaderStack
    }
});

const LoggedOutStackNavigator = createStaticNavigation(AuthStack);
const LoggedInStackNavigator = createStaticNavigation(MemberDrawer);
const LeaderLoggedInStackNavigator = createStaticNavigation(LeaderDrawer);

const AppNavigation = () => {
    const login = useSelector((state:RootState) => state.login)
    return (login.loggedIn?(login.leader?<LeaderLoggedInStackNavigator/>:<LoggedInStackNavigator/>):<LoggedOutStackNavigator/>);
}

export default AppNavigation;