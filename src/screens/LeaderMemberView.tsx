import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Modal, StyleSheet, View, ActivityIndicator } from "react-native";
import CustomButton from "../components/CustomButton";
import LogoutButton from "../components/LogoutButton";
import { useSelector } from "react-redux";
import {store, RootState } from "../store/Store";
import CustomFlatListItem from "../components/CustomFlatListItem";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import { useNavigation } from "@react-navigation/native";
import { StaticScreenProps } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { PURPLE, BLACK, LIGHT_BLUE, BLUE } from "../res/colors";
import Subtext from "../components/Subtext";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import * as util from 'util'
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

    const [unassignedMembers, setUnassignedMembers] = useState<Array<object>>([{}])
    const removeAddedMembers = (assignedMemberArray:Array<object>, unassignedMemberArray:Array<object>) => {
        let arrayToReturn = [];
        console.log("looping?")

        if(assignedMemberArray.length == 0){
            for(let i = 0; i < unassignedMemberArray.length; i++){
                arrayToReturn.push(unassignedMemberArray[i]._data);
            }
            setUnassignedMembers(arrayToReturn);
        } else {
            for(let i = 0; i < unassignedMemberArray.length; i++){
                let addToArray = true
                console.log("_data: " + JSON.stringify(unassignedMemberArray[i]._data))
                console.log("_data: " + JSON.stringify(assignedMemberArray[i]))
                for(let j = 0; j < assignedMemberArray.length; j++){
                    if(unassignedMemberArray[i]._data.email == assignedMemberArray[j].id){
                        addToArray = false;
                    }
                }
                if(addToArray){
                    arrayToReturn.push(unassignedMemberArray[i]._data);
                }
            }

            setUnassignedMembers(arrayToReturn);
        }
    }

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
        console.log("lads;khj: " +JSON.stringify(teams.teams[teamName].members[index]));
        return(
            <CustomFlatListItem
                text={teams.teams[teamName].members[index].name}
                onViewPress={() => onViewButtonPress}
                onDeletePress={() => onDeleteButtonPress}
                image={require('/Users/jusman/Documents/Training/Projects/TaskManagement/assets/member.png')}
                buttonText="Add"
            />
        )
    }
    const toRenderAllMembersFlatListItem = ({item}:{item:MemberType}):React.JSX.Element => {
        return(
            <CustomFlatListItem
                text={item.name}
                onViewPress={() => onViewButtonPress('Users', login.data.email, teamName, item.name, item.email)}
                onDeletePress={() => onDeleteButtonPress}
                image={require('/Users/jusman/Documents/Training/Projects/TaskManagement/assets/member.png')}
                buttonText="Add"
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

    useEffect(
        () => {
            removeAddedMembers(teams.teams[teamName].members,teams.members._docs)
            console.log("unassigned members: " + JSON.stringify((unassignedMembers)));
        },[teams.teams[teamName].members]
    )
    return(

        <SafeAreaView style={styles.container}>
            <Subtext
                text={"Add Members to Team"}
            />
            <View style={styles.flatlistViewContainer}>
                <Subtext
                    text={"Current Members"}
                />
                <FlatList
                    data={teams.teams[teamName].members}
                    renderItem={toRenderCurrentMembersFlatListItem}
                />
            </View>
            <View style={styles.flatlistViewContainer}>
                <Subtext
                        text={"Other Members"}
                />
                <FlatList
                    //data={teams.members._docs}
                    data={unassignedMembers}
                    renderItem={toRenderAllMembersFlatListItem}
                />
            </View>
            <CustomButton
                text="Cancel"
                onPress={():void => onCancelButtonPress()}
            />
        </SafeAreaView>
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
        width: '90%',
        borderWidth: 1,
        borderColor: BLUE,
        alignSelf: 'center',
        borderRadius: 10,
        margin: '1%',
        backgroundColor: LIGHT_BLUE
    }
})
export default LeaderMemberView;