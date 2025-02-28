import React from "react";
import {
    StyleSheet,
    Text
} from 'react-native';
//import { RED, WHITE } from "../res/colors";

interface Props{
    text:String
}

const Subtext:React.FC<Props> = (props) => {
    const {text} = props;
    return(
        <Text
            style={styles.textStyle}
        >
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        fontSize: 20,
        //color: RED,
    },
    
});

export default Subtext;