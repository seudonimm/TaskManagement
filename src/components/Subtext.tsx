import React from "react";
import {
    StyleSheet,
    Text
} from 'react-native';
import { BLUE, PURPLE } from "../res/colors";
//import { RED, WHITE } from "../res/colors";

interface Props{
    text:String
    textWhite?:boolean
    style?:object

}

const Subtext:React.FC<Props> = (props) => {
    const {text, textWhite} = props;
    return(
        <Text
            style={{...styles.textStyle, color:(textWhite?'white':'black'), ...props.style}}
        >
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'left',
        fontSize: 20,
        color: BLUE,
        margin: '4%'
    },
    
});

export default Subtext;