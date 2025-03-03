import React, { memo } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    View,
    Text
} from "react-native"
import { BLACK } from "../res/colors";

interface Props{
    text:string,
    inputErrorMessage?:string,
    onChangeText:(text:string)=>void,
    ref?:React.LegacyRef<TextInput>,
    testID?:string
}
const CustomInputField:React.FC<Props> = (props) => {
    const {text, inputErrorMessage} = props;

    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.inputStyle}
                    placeholder={text}
                    placeholderTextColor={"white"}
                    onChangeText={props.onChangeText}
                    cursorColor={'white'}
                />
            </View>
            <Text style={styles.textStyle}>
                {inputErrorMessage}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',

    },
    inputContainer:{
        //height: 50,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: BLACK,
        borderRadius: 10,
        //justifyContent: 'left',
        borderWidth: 1,
        borderColor: 'white',
        //margin: '2%',
        paddingLeft: '10%',
        color: 'white',
        alignContent:'center'
    },
    inputStyle: {
        //flex: 1,
        height: 50,
        color: 'white'
    },
    textStyle: {
        color: 'red',
        marginLeft: '5%'
    }
});

export default memo(CustomInputField);