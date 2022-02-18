import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Button, Alter} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { COLORS } from '../../constants' 

const ImageSelector = (props) => {
    const [pickedUri, setPickedUri ] = useState();
    const verifyPermission = async () => {};
    const handleTakeImage = async () => {};

    return(
        <View style={styles.container}>
            <View style={styles.preview}>
                {!pickedUri ? (<Text>No hay imagen seleccionada</Text>) : (
                    <Image style={styles.image} source={{uri:pickedUri}}/>
                )}
            </View>
            <Button title="Tomar foto" onPress={handleTakeImage} color={COLORS.MAROON}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    preview:{
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1,
    },
    image:{
        width: '100%',
        height: '100%',
    }


})

export default ImageSelector