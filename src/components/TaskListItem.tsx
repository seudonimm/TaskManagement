import React from "react";
import { View, Text, StyleSheet, StyleProp, TextStyle, GestureResponderEvent, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { FieldPath, FieldValue } from "@react-native-firebase/firestore";
import CustomButton from "./CustomButton";
import { BLACK, BLUE } from "../res/colors";

interface Props{
    title:string,
    dateDue:string
    onPress: (event: GestureResponderEvent) => void
}

const TaskListItem:React.FC<Props> = (props) => {
    const {title, dateDue } = props;

    return(
        <TouchableOpacity style={styles.container}
            onPress={props.onPress}
        >
            <View style={styles.imageContainer}>
                <Image style={styles.imageStyle}
                    source={require('/Users/jusman/Documents/Training/Projects/TaskManagement/assets/clipboard-whte.png')}
                />
            </View>
            <View style={{flex: 3}}>
                <Text style={styles.textStyle}>
                    {title}
                </Text>
                <Text style={styles.dateTextStyle}>
                    {dateDue}
                </Text>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: '20%',
        width: '85%',
        flexDirection: 'row',
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
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    textStyle: {
        flex: 1,
        fontSize: 25,
        margin:'5%',
    },    
    dateTextStyle: {
        flex: 1,
        fontSize: 15,
        margin:'5%',
        color: 'grey'
    },
    imageStyle: {
        //flex:1,
        height: '30%',
        width: '30%',
        alignSelf: 'center',
    },
    imageContainer: {
        flex: 1, 
        justifyContent:'center',
        backgroundColor: BLUE,
        borderRadius: 10
    }
})

export default TaskListItem;