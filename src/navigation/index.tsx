import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import type { StaticParamList } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {RootState} from "../store/Store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ToDo from "../screens/ToDo";
import Done from "../screens/Done";
import { createDrawerNavigator } from '@react-navigation/drawer';
import LeaderTeamView from "../screens/LeaderTeamView";
import LeaderMemberView from "../screens/LeaderMemberView";
import { BLACK, BLUE, LIGHT_BLUE, PURPLE } from "../res/colors";
import CreateTasks from "../screens/CreateTasks";
import Settings from "../screens/Settings";
import LeaderTaskView from "../screens/LeaderTaskView";
import { Image } from "react-native";

const AuthStack:StaticParamList = createNativeStackNavigator({
    screenOptions:{
        headerShown:false,
        headerTintColor: BLUE
    },
    screens:{
        Login:Login,
        CreateAccount:CreateAccount
    },
    id:undefined
});


const TaskStack:StaticParamList = createBottomTabNavigator({
    screenOptions:({route}) => ({
        animation: 'shift',
        headerShown:false,
        tabBarStyle: {
            backgroundColor: BLUE
        },
        tabBarActiveTintColor: LIGHT_BLUE,
        tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'ToDo') {
                return(<Image style={{height: '100%', width: '100%', tintColor: color}}
                    source={require('/Users/jusman/Documents/Training/Projects/TaskManagement/assets/todo.png')}/>)
            } else if (route.name === 'Done') {
                return(<Image style={{height: '100%', width: '100%', tintColor: color}}
                    source={require('/Users/jusman/Documents/Training/Projects/TaskManagement/assets/done.png')}/>)
            }

        },
        
    }),
    screens:{
        ToDo:ToDo,
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
            backgroundColor: BLUE,
        },
        headerTintColor: LIGHT_BLUE,
        drawerStyle:{
            backgroundColor: BLUE
        },
        drawerActiveTintColor:LIGHT_BLUE,
        drawerLabelStyle: {
            color: 'white',
        },
        headerTitleStyle:{
            color: LIGHT_BLUE
        }
    },

    screens: {
        Tasks:TaskStack,
        Settings:Settings

    }
});

const LeaderDrawer = createDrawerNavigator({
    screenOptions:{
        headerStyle:{
            backgroundColor: BLUE,
        },
        headerTintColor: LIGHT_BLUE,
        drawerStyle:{
            backgroundColor: BLUE
        },
        drawerActiveTintColor:LIGHT_BLUE,
        drawerLabelStyle: {
            color: 'white',
        },
        headerTitleStyle:{
            color: LIGHT_BLUE
        }
    },
    screens: {
        Teams:LeaderStack,
        CreateTasks: CreateTasks,
        LeaderTaskView:LeaderTaskView,
        Settings:Settings

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