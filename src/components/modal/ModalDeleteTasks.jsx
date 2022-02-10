import React, { useState } from 'react'
import { Modal } from 'react-native'

import { ModalContainer, ModalView, ModalActionDelete, ModalActionGroup, ModalIcon, HeaderTitle, colors } from '../../styles/appStyles'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ModalDeleteTasks = ({ modalDeleteOn, setModalDeleteOn, setTasks }) => {

    //CLEAR ALL TASKS
    const handleClearTasks = () => {
        AsyncStorage.setItem("storedTasks", JSON.stringify([])).then(() => {
            setTasks([])
            setModalDeleteOn(false)
        }).catch(error => console.log('error:', error))
    }

    const handleCloseModal = () => {
        setModalDeleteOn(false)
    }

    return(
        <>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalDeleteOn}
                    onRequestClose={handleCloseModal}
                >
                    <ModalContainer>
                        <ModalView>
                            <ModalIcon>
                                <HeaderTitle style={{ marginTop: 8 }}>Supprimer toutes les tâches ?</HeaderTitle>
                            </ModalIcon>

                            <ModalActionGroup>
                                <ModalActionDelete color={colors.tertiary} onPress={handleClearTasks}>
                                    <AntDesign name='check' size={24} color={colors.secondary} />
                                </ModalActionDelete>

                                <ModalActionDelete color={"transparent"} onPress={handleCloseModal}>
                                    <AntDesign name='close' size={24} color={colors.tertiary} />
                                </ModalActionDelete>
                            </ModalActionGroup>
                        </ModalView>
                    </ModalContainer>
                </Modal>
        </>
    )
}

export default ModalDeleteTasks