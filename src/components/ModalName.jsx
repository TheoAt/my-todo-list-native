import React, { useState } from 'react'
import { Modal, Alert } from 'react-native'
import { ModalContainer, ModalView, StyledInput, ModalIcon, HeaderTitle, colors } from '../styles/appStyles'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

const ModalName = ({ modalOn, setModalOn, setName }) => {
    const [ nameValue, setNameValue ] = useState()

    const handleSubmit = () => {
        if(nameValue) {
            AsyncStorage.setItem("storedName", JSON.stringify(nameValue)).then(() => {
                setName(nameValue)
                setModalOn(false)
            }).catch(error => console.log('error:', error))
        } else {
            Alert.alert("Prénom vide", "Merci d'entrer un prénom")
        }
    }

    return(
        <>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalOn}
            >
                <ModalContainer>
                    <ModalView>
                        <ModalIcon>
                            <HeaderTitle style={{ marginTop: 8 }}>Votre prénom</HeaderTitle>
                        </ModalIcon>

                        <StyledInput
                            placeholder='Entrez votre prénom'
                            placeholderTextColor={colors.alternative}
                            selectionColor={colors.secondary}
                            autoFocus={true}
                            onChangeText={(text) => setNameValue(text)}
                            value={nameValue}
                            onSubmitEditing={handleSubmit}
                        />
                    </ModalView>
                </ModalContainer>
            </Modal>
        </>
    )
}

export default ModalName