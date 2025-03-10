import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Modal, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import LogoutButton from "../components/LogoutButton";
import { useSelector } from "react-redux";
import {store, RootState } from "../store/Store";
import CustomFlatListItem from "../components/CustomFlatListItem";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import { useNavigation } from "@react-navigation/native";
import CustomInputField from "../components/CustomInputField";
import { collection } from "@react-native-firebase/firestore";
import { BLACK, BLUE, PURPLE } from "../res/colors";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";

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
        store.dispatch({type:'CREATE_TEAM', payload:{collectionName:'Users', docName:login.data.email, teamName} })
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
        console.log('to top')
        return(
            <CustomFlatListItem
                text={item}
                onViewPress={() => onViewButtonPress(item)}
                onDeletePress={() => onDeleteButtonPress}
                image={require("/Users/jusman/Documents/Training/Projects/TaskManagement/assets/team.png")}
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
            store.dispatch({type:'GET_TEAMS_DATA', payload:{email:login.data.email}});
        },[]
    )
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerViewStyle}>
            <Header style={{marginBottom: '1%', justifyContent: 'center'}}
                text={"Teams"}
            />
            </View>
            {/* <View style={styles.flatlistViewContainer}> */}
                <FlatList style={{flex: 1}}
                    data={Object.keys(teams.teams)}
                    renderItem={toRenderFlatListItem}
                />

                <CustomButton style={{flex: 0, height: '5%'}}
                    text="Create Team"
                    onPress={():void => setCreateTeamModalVisible(!createTeamModalVisible)}
                />
            {/* </View> */}
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
                        <View style={styles.modalButtonsStyle}>
                            <CustomButton style={{backgroundColor: 'black'}}
                                text="Create Team"
                                onPress={():Promise<void> => onCreateTeamPress(teamName)}
                            />
                            <CustomButton style={{backgroundColor: 'black'}}
                                text="Cancel"
                                onPress={():void => setCreateTeamModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: BLACK
    },
    centeredView: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        height: '20%',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: PURPLE,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        verticalAlign: 'middle',
        backgroundColor: BLUE,
        marginTop: '50%',
        padding: '5%',
        shadowColor: 'black',
        shadowRadius:20,
        shadowOpacity: .75,
        elevation: 4,
        shadowOffset: {
            width: 30,
            height: 30
        },
    },
    flatlistViewContainer: {
        flex: 8,
        //height: '100%',
        width: '95%',
        // borderWidth: 1,
        // borderColor: PURPLE,
        alignSelf: 'center',
        borderRadius: 10,
        //margin: '1%',
        paddingVertical: '5%',
    },
    modalButtonsStyle: {
        flex:1,
        flexDirection: 'row',
        
    },
    headerViewStyle: {
        //flex: 1.5,
        backgroundColor: BLUE,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    }

})
export default LeaderTeamView;