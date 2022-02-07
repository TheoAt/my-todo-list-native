import React from 'react'
import { ScrollView, View, Text, Dimensions } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

//IMPORT ICONS
import { MaterialCommunityIcons } from '@expo/vector-icons'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ListView, ListViewHidden, TaskView, HiddenButton, SwipedTodoText, TodoText, colors } from '../styles/appStyles'

const ListTasks = ({ tasks, setTasks, handleEditingTask, handleEditTask }) => {
    const handleDeleteTask = (rowKey) => {
        const newTasks = tasks.filter(task => task.key !== rowKey)

        AsyncStorage.setItem("storedTasks", JSON.stringify(newTasks)).then(() => {
            setTasks(newTasks)
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
                            const RowText = data.item.isChecked ? SwipedTodoText : TodoText;

                            return(
                                <ListView underlayColor={colors.secondary} >
                                    <ScrollView>
                                        <TaskView>
                                            {data.item.isChecked ?
                                                <MaterialCommunityIcons
                                                    name="checkbox-marked-outline"
                                                    size={24}
                                                    color="white"
                                                    style={{
                                                        position: 'absolute'
                                                    }}
                                                    onPress={() => handleEditTask({
                                                        title: data.item.title,
                                                        isChecked: !data.item.isChecked,
                                                        key: data.item.key
                                                    })}
                                                />
                                                : 
                                                <MaterialCommunityIcons
                                                    name="checkbox-blank-outline"
                                                    size={24}
                                                    color="white"
                                                    style={{
                                                        position: 'absolute'
                                                    }}
                                                    onPress={() => handleEditTask({
                                                        title: data.item.title,
                                                        isChecked: !data.item.isChecked,
                                                        key: data.item.key
                                                    })}
                                                />
                                            }

                                            <RowText onPress={() => {handleEditingTask(data.item)}}>{data.item.title}</RowText>
                                        </TaskView>
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
                        leftOpenValue={Dimensions.get('window').width}
                        disableLeftSwipe
                        showsVerticalScrollIndicator={false}
                        style={{
                            flex: 1,
                            marginBottom: 20
                        }}
                        onRowOpen={(rowKey) => {
                            handleDeleteTask(rowKey) 
                        }}
                    />
                </>
            }
        </>
    )
}

export default ListTasks