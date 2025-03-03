import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Modal, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import LogoutButton from "../components/LogoutButton";
import { useSelector } from "react-redux";
import store, { RootState } from "../store/Store";
import CustomFlatListItem from "../components/CustomFlatListItem";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import { useNavigation } from "@react-navigation/native";

const LeaderMemberView:React.FC = () => {

    const login = useSelector((state:RootState) => state.login);
    const teams = useSelector((state:RootState) => state.teams);

    const navigation = useNavigation();
    
    const [teamName, setTeamName] = useState<string>('');
    const [createTeamModalVisible, setCreateTeamModalVisible] = useState<boolean>(false);

    const [teamMembers, setTeamMembers] = useState<object>({});

    const onCreateTeamPress = async(teamName:string):Promise<void> => {
        FirestoreHelper.createTeam('Users', login.data._data.email,teamName)
    }

    const onViewButtonPress = () => {

    }
    const onDeleteButtonPress = () => {

    }

    const getMembers = async (collectionName:string) => {
        // let members = await FirestoreHelper.getMemberUsers('Users');
        // setTeamMembers(members);
        store.dispatch({type:'GET_MEMBER_USERS', payload:{collectionName}})
    }

    const toRenderFlatListItem = ({item}:{item:string}) => {
        return(
            <CustomFlatListItem
                text={login.data._data.teams[item].name}
                onViewPress={() => onViewButtonPress}
                onDeletePress={() => onDeleteButtonPress}
            />
        )
    }
    const toRenderMemberFlatListItem = ({item, index}:{item:string, index:number}) => {
        return(
            <CustomFlatListItem
                text={teams.data._docs[index].name}
                onViewPress={() => onViewButtonPress}
                onDeletePress={() => onDeleteButtonPress}
            />
        )
    }

    useEffect(
        () => {
            getMembers('Users');
        },[]
    )
    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={Object.keys(login.data._data.teams)}
                renderItem={toRenderFlatListItem}
            />
            {/* <View  style={styles.centeredView}>
                <Modal
                    visible={createTeamModalVisible}
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={teams.data._docs}
                            renderItem={toRenderMemberFlatListItem}
                        />
                        <CustomButton
                            text="Create Team"
                            onPress={() => onCreateTeamPress(teamName)}
                        />
                    </View>
                </Modal>
            </View> */}
            <LogoutButton/>
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
    modalContainer: {
        width: '60%',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'orange',
        margin: 10,
        padding: 50,
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
export default LeaderMemberView;