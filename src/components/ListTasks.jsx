import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { MaterialCommunityIcons } from '@expo/vector-icons'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ListView, ListViewHidden, HiddenButton, SwipedTodoText, TodoText, TodoDate, colors } from '../styles/appStyles'

const ListTasks = ({ tasks, setTasks, handleEditingTask }) => {
    //Styling task
    const [ swipedRow, setSwipedRow ] = useState()

    const handleDeleteTask = (rowKey) => {
        const newTasks = tasks.filter(task => task.key !== rowKey)

        AsyncStorage.setItem("storedTasks", JSON.stringify(newTasks)).then(() => {
            setTasks(newTasks)
            setSwipedRow(null)
        }).catch(error => console.log('error:', error))
    }

    return(
        <>
            {tasks.length == 0 ?
                <View style={{
                    flex: 1,
                    paddingTop: 24,
                    backgroundColor: `${colors.primary}`,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    marginTop: -20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: `${colors.tertiary}`,
                        marginTop: 0,
                        marginBottom: 64
                    }}>
                        Vous n'avez pas de tâches aujourd'hui.
                    </Text>
                </View>
                :
                <>
                <View style={{
                        flex: 0,
                        paddingTop: 20,
                        backgroundColor: `${colors.primary}`,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        marginTop: -20
                    }} 
                />
                <SwipeListView
                    data={tasks}
                    renderItem={(data) => {
                        const RowText = data.item.key == swipedRow ? SwipedTodoText : TodoText;

                        return(
                            <ListView underlayColor={colors.secondary} onPress={() => {handleEditingTask(data.item)}} >
                                <ScrollView>
                                    <RowText>{data.item.title}</RowText>
                                    <TodoDate>{data.item.date}</TodoDate>
                                </ScrollView>
                            </ListView>
                        )
                    }}
                    renderHiddenItem={(data) => {
                        return(
                            <ListViewHidden>
                                <HiddenButton onPress={() => handleDeleteTask(data.item.key)}>
                                    <MaterialCommunityIcons
                                        name='delete-empty-outline'
                                        size={24}
                                        color={colors.tertiary}
                                    />
                                </HiddenButton>
                            </ListViewHidden>
                        )
                    }}
                    leftOpenValue={80}
                    disableLeftSwipe={true}
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        marginBottom: 20
                    }}
                    onRowOpen={(rowKey) => {
                        setSwipedRow(rowKey)
                    }}
                    onRowClose={() => {
                        setSwipedRow(null)
                    }}
                />
                </>
            }
        </>
    )
}

export default ListTasks