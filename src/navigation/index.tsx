import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import type { StaticParamList } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {RootState} from "../store/Store";
import LeaderTaskScreen from "../screens/LeaderTaskScreen";
import MemberTaskScreen from "../screens/MemberTaskScreen";

const AuthStack:StaticParamList = createNativeStackNavigator({
    screens:{
        Login:Login,
        CreateAccount:CreateAccount
    },
    id:undefined
});

const TaskStack:StaticParamList = createNativeStackNavigator({
    screens:{
        MemberTaskScreen
    },
    id:undefined
});

const LeaderStack:StaticParamList = createNativeStackNavigator({
    screens:{
        LeaderTaskScreen:LeaderTaskScreen
    },
    id:undefined
});

const LoggedOutStackNavigator = createStaticNavigation(AuthStack);
const LoggedInStackNavigator = createStaticNavigation(TaskStack);
const LeaderLoggedInStackNavigator = createStaticNavigation(LeaderStack);

const AppNavigation = () => {
    const login = useSelector((state:RootState) => state.login)
    return (login.loggedIn?(login.leader?<LeaderLoggedInStackNavigator/>:<LoggedInStackNavigator/>):<LoggedOutStackNavigator/>);
}

export default AppNavigation;