import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native'
import { COLORS } from '../constants'
import {useDispatch} from 'react-redux'
import { addPlace } from '../store/places.actions'
import ImageSelector from '../components/imageSelector'

const NewPlaceScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')

    const handleTitleChange = (text) => setTitle(text)
    const handleSave = () => {
        dispatch(addPlace(title))
        navigation.navigate('Direcciones')
    }

    const handleOnImage = (uri) => {
        console.warn(uri)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Titulo</Text>
                <ImageSelector onImage={handleOnImage}/>
                <TextInput style={styles.input} onChangeText={handleTitleChange} value={title} />
                <Button title="Grabar dirección" color={COLORS.MAROON} onPress={() => handleSave()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 15
    },
    label: {
        fontSize: 18,
        marginVertical: 8,

    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 8,
        padding:4,
    }
})

export default NewPlaceScreen
