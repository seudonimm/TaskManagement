import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Modal, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import LogoutButton from "../components/LogoutButton";
import { useSelector } from "react-redux";
import store, { RootState } from "../store/Store";
import CustomFlatListItem from "../components/CustomFlatListItem";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import { useNavigation } from "@react-navigation/native";
import CustomInputField from "../components/CustomInputField";
import { collection } from "@react-native-firebase/firestore";
import { BLACK, PURPLE } from "../res/colors";
import LinearGradient from "react-native-linear-gradient";

const LeaderTeamView:React.FC = () => {

    const login = useSelector((state:RootState) => state.login);
    const teams = useSelector((state:RootState) => state.teams);

    const navigation = useNavigation();
    
    const [teamName, setTeamName] = useState<string>('');
    const [createTeamModalVisible, setCreateTeamModalVisible] = useState<boolean>(false);

    const [teamMembers, setTeamMembers] = useState<object>({});

    const onCreateTeamPress = async(teamName:string):Promise<void> => {
        // FirestoreHelper.createTeam('Users', login.data._data.email,teamName);
        setCreateTeamModalVisible(false);
        store.dispatch({type:'CREATE_TEAM', payload:{collectionName:'Users', docName:login.data._data.email, teamName} })
    }

    const onViewButtonPress = (teamName:string) => {
        navigation.navigate('LeaderMemberView', {teamName});
    }
    const onDeleteButtonPress = () => {

    }

    const getMembers = async (collectionName:string) => {
        // let members = await FirestoreHelper.getMemberUsers('Users');
        // setTeamMembers(members);
        //store.dispatch({type:'GET_MEMBER_USERS', payload:{collectionName}})
    }

    const toRenderFlatListItem = ({item}:{item:string}) => {
        return(
            <CustomFlatListItem
                text={item}
                onViewPress={() => onViewButtonPress(item)}
                onDeletePress={() => onDeleteButtonPress}
            />
        )
    }
    // const toRenderMemberFlatListItem = ({item, index}:{item:string, index:number}) => {
    //     return(
    //         <CustomFlatListItem
    //             text={teams.data._docs[index].name}
    //             onViewPress={() => onViewButtonPress}
    //             onDeletePress={() => onDeleteButtonPress}
    //         />
    //     )
    // }

    useEffect(
        () => {
            getMembers('Users');
            store.dispatch({type:'GET_TEAMS_DATA', payload:{email:login.data._data.email}});
        },[]
    )
    return(
        <LinearGradient style={{flex:1}}
            colors={[PURPLE, BLACK, BLACK]}
            locations={[0, .1, 1]}
            start={{x: 0.0, y: 0}} end={{x: 0.5, y: 1.0}}
        >
        <SafeAreaView style={styles.container}>

            <CustomButton
                text="Create Team"
                onPress={():void => setCreateTeamModalVisible(!createTeamModalVisible)}
            />
            <FlatList
                data={Object.keys(teams.teams)}
                renderItem={toRenderFlatListItem}
            />
            <View  style={styles.centeredView}>
                <Modal
                    visible={createTeamModalVisible}
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        {/* <FlatList
                            data={teams.data._docs}
                            renderItem={toRenderMemberFlatListItem}
                        /> */}
                        <CustomInputField
                            text="Team Name"
                            onChangeText={(t:string):void => setTeamName(t)}
                        />
                        <CustomButton
                            text="Create Team"
                            onPress={() => onCreateTeamPress(teamName)}
                        />
                    </View>
                </Modal>
            </View>
            <LogoutButton/>
        </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: BLACK
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        height: '20%',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        verticalAlign: 'middle',
        backgroundColor: 'orange',
        margin: 10,
        padding: '5%',
        shadowColor: 'black',
        shadowRadius:20,
        shadowOpacity: .50,
        elevation: 2,
        shadowOffset: {
            width: 25,
            height: 25
        }
    }
})
export default LeaderTeamView;