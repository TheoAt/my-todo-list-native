import React, { useState } from "react";
import { View, Text, Alert } from "react-native";

//IMPORT STYLE
import { colors, StyledInputName } from '../styles/appStyles'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

const EnterName = ({ setIsNamed }) => {
    const [ nameValue, setNameValue ] = useState()

    const handleSubmit = () => {
        if(nameValue) {
            AsyncStorage.setItem("storedName", JSON.stringify(nameValue)).then(() => {
                setNameValue(nameValue)
                setIsNamed(true)
            }).catch(error => console.log('error:', error))
        } else {
            Alert.alert("Merci d'entrer votre prénom", "Pas d'inquiétude, il ne servira qu'à personnaliser votre TouDou liste !")
        }
    }

    return(
        <View style={{
            flex: 1,
            paddingTop: 24,
            backgroundColor: `${colors.primary}`,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            marginTop: -16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 16,
                color: `${colors.tertiary}`,
                marginTop: 0,
                marginBottom: 16
            }}>
                Quel est votre prénom ?
            </Text>

            <StyledInputName
                placeholder='Votre prénom'
                placeholderTextColor={colors.alternative}
                selectionColor={colors.secondary}
                autoFocus={false}
                onChangeText={(text) => setNameValue(text)}
                value={nameValue}
                onSubmitEditing={handleSubmit}
                style={{
                    marginBottom: 32,
                    width: '64%'
                }}
            />
        </View>
    )
}

export default EnterName