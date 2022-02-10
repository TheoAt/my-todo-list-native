import React, { useState } from 'react'
import { Modal } from 'react-native'

import { ModalContainer, ModalView, StyledInputName, ModalAction, ModalIcon, HeaderTitle, colors } from '../../styles/appStyles'
import { AntDesign } from '@expo/vector-icons'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

const ModalEditName = ({ modalEditOn, setModalEditOn, name, setName }) => {
    const [ nameValue, setNameValue ] = useState()

    const handleSubmit = () => {
        if(nameValue) {
            AsyncStorage.setItem("storedName", JSON.stringify(nameValue)).then(() => {
                setName(nameValue)
                setModalEditOn(false)
            }).catch(error => console.log('error:', error))
        } else {
            setModalEditOn(false)
        }
    }

    const handleCloseModal = () => {
        setModalEditOn(false)
    }

    return(
        <>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalEditOn}
                onRequestClose={handleCloseModal}
            >
                <ModalContainer>
                    <ModalView>
                        <ModalIcon>
                            <HeaderTitle style={{ marginTop: 8 }}>Modifier mon prénom</HeaderTitle>
                        </ModalIcon>

                        <ModalAction color={colors.primary} onPress={handleCloseModal}>
                                <AntDesign name='close' size={16} color={colors.tertiary} />   
                        </ModalAction>

                        <StyledInputName
                            placeholder={name}
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

export default ModalEditName