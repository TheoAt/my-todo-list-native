import React from 'react'
import { ScrollView, View, Text, Dimensions } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

//IMPORT ICONS
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ListView, ListViewHidden, TaskView, SwipedTodoText, TodoText, colors } from '../styles/appStyles'

const ListTasks = ({ tasks, setTasks, handleEditingTask, handleEditTask, modalOn }) => {
    const handleDeleteTask = (rowKey) => {
        const newTasks = tasks.filter(task => task.key !== rowKey)

        AsyncStorage.setItem("storedTasks", JSON.stringify(newTasks)).then(() => {
            setTasks(newTasks)
        }).catch(error => console.log('error:', error))
    }

    return(
        <>
            {tasks.length === 0 ?
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
                    {modalOn ?
                        <Text style={{
                            fontSize: 16,
                            color: `${colors.tertiary}`,
                            marginTop: 0,
                            marginBottom: 64
                        }}>
                            Ajout d'une nouvelle tâche...
                        </Text>
                        :
                        <Text style={{
                            fontSize: 16,
                            color: `${colors.tertiary}`,
                            marginTop: 0,
                            marginBottom: 64
                        }}>
                            Vous n'avez pas de tâches aujourd'hui.
                        </Text>
                    }
                </View>
                :
                <View style={{
                        flex: 1,
                        paddingTop: 24,
                        backgroundColor: `${colors.primary}`,
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                        marginTop: -16,
                        display: 'flex',
                        justifyContent: 'center'                       
                    }} 
                >
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
                                    <TaskView>
                                        <FontAwesome
                                            name="long-arrow-right"
                                            size={24}
                                            color="white"
                                        />
                                        <MaterialCommunityIcons
                                            name='delete-empty-outline'
                                            size={24}
                                            color={colors.tertiary}
                                            style={{
                                                marginLeft: 8
                                            }}
                                        />
                                    </TaskView>
                                </ListViewHidden>
                            )
                        }}
                        leftOpenValue={Dimensions.get('window').width / 2}
                        disableLeftSwipe
                        showsVerticalScrollIndicator={false}
                        style={{
                            flex: 1
                        }}
                        onRowOpen={(rowKey) => {
                            handleDeleteTask(rowKey) 
                        }}
                    />
                </View>
            }
        </>
    )
}

export default ListTasks