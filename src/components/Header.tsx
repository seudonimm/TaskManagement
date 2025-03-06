import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
//import { WHITE } from "../res/colors";

interface Props{
    text:String
}

const Header:React.FC<Props> = (props) => {
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
        textAlign: 'left',
        //fontWeight: 'bold',
        fontSize: 60,
        color: 'white',
        marginBottom: '10%',
        marginLeft: '5%'
    },

});

export default Header;