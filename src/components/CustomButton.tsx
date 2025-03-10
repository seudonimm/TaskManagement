import React, { memo } from "react";
import { 
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { BLUE, PURPLE } from "../res/colors";

interface Props{
    text:string,
    style?: object,
    onPress: (event: GestureResponderEvent) => void,
    testID?: string

}
const CustomButton:React.FC<Props> = props => {

    const {text} = props;

    return(
        <TouchableOpacity style={{...styles.buttonStyle, ...props.style}}
            onPress={props.onPress}
            testID={props.testID}
        >
        <Text style={styles.textStyle}>
            {text}
        </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        flex:1,
        //height: '10%',
        width: '75%',
        backgroundColor: BLUE,
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: '1%',
        //padding: '3%'
    },
    textStyle: {
        zIndex:1,
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
});

export default memo(CustomButton);