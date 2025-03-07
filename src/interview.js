import React from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

const CustomButton = (props) => {

    const{title} = props;

    return(
        <TouchableOpacity style={styles.buttonContainer}
            onPress={props.onPress}
        >
            <Text>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const CustomFlatlist = (props) => {
    const {data} = props;

    const toRenderFlatlist = ({item}) => {
        return(
        <View style={styles.flatlistItemStyle}>
            <Text>
                {item.title}
            </Text>
            <Text>
                {item.description}
            </Text>
        </View>
        )
    };

    return(
        <SafeAreaView>
            <FlatList
                data={data}
                renderItem={toRenderFlatlist}
                keyExtractor={({item}) => {item.id}}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: '10%',
        width: '50%',
        borderWidth: 1
    },
    flatlistItemStyle:{
        borderWidth: 1,
        height: '20%',
        width: '80%'
    }
})
