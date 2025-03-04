import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Modal, StyleSheet, View, ActivityIndicator } from "react-native";
import CustomButton from "../components/CustomButton";
import LogoutButton from "../components/LogoutButton";
import { useSelector } from "react-redux";
import store, { RootState } from "../store/Store";
import CustomFlatListItem from "../components/CustomFlatListItem";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import { useNavigation } from "@react-navigation/native";
import { StaticScreenProps } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { PURPLE, BLACK } from "../res/colors";
import Subtext from "../components/Subtext";

type Props = StaticScreenProps<{
    teamName:string
}>

interface MemberType {
    name:string
}

const LeaderMemberView:React.FC<Props> = (props) => {
    const {teamName} = props.route.params

    const login = useSelector((state:RootState) => state.login);
    const teams = useSelector((state:RootState) => state.teams);

    const navigation = useNavigation();
    
    //const [teamName, setTeamName] = useState<string>('');
    const [createTeamModalVisible, setCreateTeamModalVisible] = useState<boolean>(false);

    const [teamMembers, setTeamMembers] = useState<object>({});


    const onViewButtonPress = (collectionName:string, docName:string, teamName:string, memberName:string, memberId:string) => {
        store.dispatch({type:'ADD_MEMBER_TO_TEAM', payload:{collectionName, docName, teamName, memberName, memberId}})
    }
    const onDeleteButtonPress = () => {

    }

    const getMembers = async (collectionName:string) => {
        // let members = await FirestoreHelper.getMemberUsers('Users');
        // setTeamMembers(members);
        store.dispatch({type:'GET_MEMBER_USERS', payload:{collectionName, teamName}})
    }


    const toRenderCurrentMembersFlatListItem = ({item, index}:{item:string, index:number}):React.JSX.Element => {
        console.log("lads;khj: " +JSON.stringify(teams.teams[teamName].members[item]));
        return(
            <CustomFlatListItem
                text={Object.keys(teams.teams[teamName].members)[index]}
                onViewPress={() => onViewButtonPress}
                onDeletePress={() => onDeleteButtonPress}
            />
        )
    }
    const toRenderAllMembersFlatListItem = ({item}:{item:MemberType}):React.JSX.Element => {
        return(
            <CustomFlatListItem
                text={item._data.name}
                onViewPress={() => onViewButtonPress('Users', login.data._data.email, teamName, item._data.name, item._data.email)}
                onDeletePress={() => onDeleteButtonPress}
            />
        )
    }
    const onCancelButtonPress = ():void => {
        navigation.goBack();
    }

    useEffect(
        () => {
            getMembers('Users');
            console.log(teams.teams[teamName].members);
            console.log("teamname: " + teamName)
        },[]
    )
    return(
        <LinearGradient style={{flex:1}}
                    colors={[PURPLE, BLACK, BLACK]}
                    locations={[0, .1, 1]}
                    start={{x: 0.0, y: 0}} end={{x: 0.5, y: 1.0}}
        >
        <SafeAreaView style={styles.container}>
            <Subtext
                text={"Add Members to Team"}
            />
            <View style={styles.flatlistViewContainer}>
                <Subtext
                    text={"Current Members"}
                />
                <FlatList
                    data={Object.keys(teams.teams[teamName].members)}
                    renderItem={toRenderCurrentMembersFlatListItem}
                />
            </View>
            <View style={styles.flatlistViewContainer}>
                <Subtext
                        text={"Other Members"}
                />
                <FlatList
                    data={teams.members._docs}
                    renderItem={toRenderAllMembersFlatListItem}
                />
            </View>
            <CustomButton
                text="Cancel"
                onPress={():void => onCancelButtonPress()}
            />
        </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlistViewContainer: {
        height: '40%',
        width: '80%',
        borderWidth: 1,
        borderColor: PURPLE,
        alignSelf: 'center',
        borderRadius: 10,
        margin: '1%'
    }
})
export default LeaderMemberView;