import React from "react";
import { View, Text, StyleSheet, StyleProp, TextStyle, GestureResponderEvent, SafeAreaView } from "react-native";
import { FieldPath, FieldValue } from "@react-native-firebase/firestore";
import CustomButton from "./CustomButton";
import { BLACK } from "../res/colors";

interface Props{
    text:string,
    onViewPress: (event: GestureResponderEvent) => void,
    onDeletePress:(event: GestureResponderEvent) => void
}

const CustomFlatListItem:React.FC<Props> = (props) => {
    const {text } = props;

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.textStyle}>
                {text}
            </Text>
            <View style={styles.buttonsContainer}>
                <CustomButton
                    text="View"
                    onPress={props.onViewPress}
                />
                <CustomButton
                    text="Delete"
                    onPress={props.onDeletePress}
                />
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: '30%',
        width: '90%',
        //borderWidth: .5,
        //borderColor: 'white',
        flexDirection: 'row',
        alignSelf: "center",
        margin: '1%',
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: BLACK,
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
        margin:'2%',
        color: 'black'
    },
})

export default CustomFlatListItem;