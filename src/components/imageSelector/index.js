import React, {useState} from 'react'
import {View, Text, StyleSheet, Image, Button, Alert, PermissionsAndroid} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { COLORS } from '../../constants' 

const ImageSelector = (props) => {
    const [pickedUri, setPickedUri ] = useState();
    const verifyPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Permisos de camara',
                    message: 'Se necesita acceso a la camara',
                    buttonNeutral:'Preguntar despúes',
                    buttonNegative:'No',
                    buttonPositive:'Si'
                })
            if(granted === PermissionsAndroid.RESULTS.GRANTED){
                handleTakeImage()
                return true
            } else{
                return false
            }
             } catch (err) {
                console.warn(err)
             }
    };
    const handleTakeImage = async () => {
        const isCameraOk = await verifyPermission();
        if (!isCameraOk) return 
        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
        await ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              const source = { uri: response.uri };
              console.log('response', JSON.stringify(response));
              setPickedUri(response.uri)
              props.onImage(response.uri)
            }
          });
       
    };

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