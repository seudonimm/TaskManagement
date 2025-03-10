import React, { memo } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    View,
    Text
} from "react-native"
import { BLACK, LIGHT_BLUE } from "../res/colors";

interface Props{
    text:string,
    inputErrorMessage?:string,
    onChangeText:(text:string)=>void,
    ref?:React.LegacyRef<TextInput>,
    style?:object
    textWhite?:boolean
}
const CustomInputField:React.FC<Props> = (props) => {
    const {text, inputErrorMessage, textWhite} = props;

    return(
        <View style={styles.container}>
            <View style={{...styles.inputContainer, ...props.style}}>
                <TextInput 
                    style={{...styles.inputStyle, color:(textWhite?'white':'black')}}
                    placeholder={text}
                    placeholderTextColor={((textWhite)?'white':'black')}
                    onChangeText={props.onChangeText}
                    //cursorColor={'white'}
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
        //flex: 1,
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
        color: LIGHT_BLUE,
        alignContent:'center'
    },
    inputStyle: {
        //flex: 1,
        height: 50,
        color: 'black'
    },
    textStyle: {
        //color: 'red',
        marginLeft: '5%',
        //color: ((textWhite)?'white':'black')
    }
});

export default memo(CustomInputField);