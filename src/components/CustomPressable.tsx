import React from "react";
import { StyleSheet, Pressable, Text, GestureResponderEvent } from "react-native";

interface Props{
    text:string,
    onPress:(event: GestureResponderEvent) => void
}

const CustomPressable:React.FC<Props> = (props) => {
    const {text} = props;

    return(
            <Pressable style={styles.container}
                onPress={props.onPress}
            >
                <Text style={styles.textStyle}>{text}</Text>
            </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        //color: WHITE,
        marginHorizontal: '10%',
        alignSelf: 'flex-end'
    },
    textStyle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});

export default CustomPressable;