import React, { memo } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    View,
    Text
} from "react-native"

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
        <View testID={props.testID}>
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputStyle}
                    placeholder={text}
                    placeholderTextColor={"white"}
                    onChangeText={props.onChangeText}
                    cursorColor={'white'}
                    ref={props.ref}
                />
            </View>
            <Text style={styles.textStyle}>
                {inputErrorMessage}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height: 50,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#1e1d24',
        borderRadius: 30,
        //justifyContent: 'left',
        borderWidth: 1,
        borderColor: 'white',
        //margin: '2%',
        paddingLeft: '10%',
        color: 'white'
    },
    inputStyle: {
        flex: 1,
        height: 50,
        color: 'white'
    },
    textStyle: {
        color: 'red',
        marginLeft: '5%'
    }
});

export default memo(CustomInputField);