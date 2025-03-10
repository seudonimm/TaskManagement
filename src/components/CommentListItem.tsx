import React from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import {Timestamp } from "@react-native-firebase/firestore";

interface Props{
    name:string,
    message:string
    timeStamp:Timestamp
}

const CommentListItem:React.FC<Props> = (props) => {
    const {name, message, timeStamp } = props;

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.nameStyle}>
                {name}
            </Text>
            <Text style={styles.messageStyle}>
                {message}
            </Text>
            <Text style={styles.dateTextStyle}>
                {timeStamp.toDate().toLocaleDateString() + " " + timeStamp.toDate().toLocaleTimeString()}
            </Text>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        width: '85%',
        alignSelf: "center",
        margin: '1%',
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 4,
            width: -2
        },
        elevation: 10,
        shadowRadius: 3
    },
    nameStyle: {
        flex: 1,
        fontSize: 15,
        margin:'1%',
        marginLeft: '3%'

    },    
    messageStyle: {
        flex: 1,
        fontSize: 20,
        margin:'1%',
        marginLeft: '5%'
    },    
    dateTextStyle: {
        flex: 1,
        fontSize: 10,
        margin:'1%',
        color: 'grey',
        marginLeft: '3%'

    },
})

export default CommentListItem;