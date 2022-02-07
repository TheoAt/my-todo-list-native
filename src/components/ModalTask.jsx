import React from 'react'
import { Modal } from 'react-native'
import { ModalButton, ModalContainer, ModalView, StyledInput, ModalAction, ModalIcon, HeaderTitle, colors } from '../styles/appStyles'
import { AntDesign } from '@expo/vector-icons'

const ModalTask = ({ tasks, getDate, modalOn, setModalOn, taskInputValue, setTaskInputValue, handleAddTask, taskToBeEdited, setTaskToBeEdited, handleEditTask }) => {
    const handleCloseModal = () => {
        setModalOn(false)
        setTaskInputValue("")
        setTaskToBeEdited(null)
    }

    const handleSubmit = () => {
        if(!taskToBeEdited) {
            handleAddTask({
                title: taskInputValue,
                date: getDate(),
                key: tasks.length !== 0 ? `${parseInt(tasks[0].key) + 1}` : '1'
            })
        } else {
            handleEditTask({
                title: taskInputValue,
                date: taskToBeEdited.date,
                key: taskToBeEdited.key
            })
        }
        setTaskInputValue("")
    }

    return(
        <>
            <ModalButton onPress={() => {setModalOn(true)}}>
                <AntDesign name='plus' size={24} color={colors.secondary} />
            </ModalButton>

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalOn}
                onRequestClose={handleCloseModal}
            >
                <ModalContainer>
                    <ModalView>
                        <ModalIcon>
                            <HeaderTitle style={{ marginTop: 8 }}>{taskToBeEdited ? 'Modifier la tâche' : 'Nouvelle tâche'}</HeaderTitle>
                        </ModalIcon>

                        <ModalAction color={colors.primary} onPress={handleCloseModal}>
                                <AntDesign name='close' size={16} color={colors.tertiary} />   
                        </ModalAction>

                        <StyledInput
                            placeholder='Ajouter une tâche'
                            placeholderTextColor={colors.alternative}
                            selectionColor={colors.secondary}
                            autoFocus={true}
                            onChangeText={(text) => setTaskInputValue(text)}
                            value={taskInputValue}
                            onSubmitEditing={handleSubmit}
                        />
                    </ModalView>
                </ModalContainer>
            </Modal>
        </>
    )
}

export default ModalTask