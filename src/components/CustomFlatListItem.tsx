import React from "react";
import { View, Text, StyleSheet, Image, GestureResponderEvent, SafeAreaView } from "react-native";
import { FieldPath, FieldValue } from "@react-native-firebase/firestore";
import CustomButton from "./CustomButton";
import { BLUE, LIGHT_BLUE } from "../res/colors";

interface Props{
    text:string,
    image:string
    onViewPress: (event: GestureResponderEvent) => void,
    onDeletePress:(event: GestureResponderEvent) => void
}

const CustomFlatListItem:React.FC<Props> = (props) => {
    const {text, image } = props;

    return(
        <SafeAreaView style={styles.outerContainer}>
            <View style={{flexDirection:'row'}}>
            <View style={styles.imageContainer}>
                <Image style={styles.imageStyle}
                    tintColor={'white'}
                    source={image}
                />
            </View>
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
            </View>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        height: '10%',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor:LIGHT_BLUE,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 4,
            width: -2
        },
        elevation: 10,
        shadowRadius: 3,
        justifyContent: 'center',
        margin: 5
    },
    container:{
        flex:7,
        // height: '75%',
        // width: '100%',
        //borderWidth: .5,
        //borderColor: 'white',
        flexDirection: 'row',
        //alignSelf: "center",
        //margin: '1%',
        // borderRadius: 10,
        //fontSize: 20,
        //textAlign: 'center',
        //backgroundColor: BLACK,
        // shadowColor: 'black',
        // shadowOpacity: .2,
        // shadowOffset: {
        //     height: 4,
        //     width: -2
        // },
        // elevation: 10,
        // shadowRadius: 3
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        marginRight: '5%'

    },
    textStyle: {
        flex: 1,
        fontSize: 25,
        margin:'2%',
        color: 'black',
        marginLeft: '5%'
    },
    imageStyle: {
        //flex:1,
        height: '30%',
        width: '30%',
        alignSelf: 'center',
        //tintColor: 'white'
    },
    imageContainer: {
        flex: 1, 
        justifyContent:'center',
        backgroundColor: BLUE,
        borderRadius: 10
    }
    
})

export default CustomFlatListItem;