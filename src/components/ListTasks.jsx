import React, { useRef } from 'react'
import { ScrollView, View, Text, Dimensions, Animated } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

//IMPORT ICONS
import { MaterialCommunityIcons } from '@expo/vector-icons'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ListView, ListViewHidden, DoneTodoText, TodoText, colors } from '../styles/appStyles'

const ListTasks = ({ tasks, setTasks, handleEditingTask, handleEditTask, modalOn }) => {

    //DELETE ONE SPECIFIC TASK
    const handleDeleteTask = (rowKey) => {
        const newTasks = tasks.filter(task => task.key !== rowKey)

        AsyncStorage.setItem("storedTasks", JSON.stringify(newTasks)).then(() => {
            setTasks(newTasks)
        }).catch(error => console.log('error:', error))
    }

    const rowTranslateAnimatedValues = {};

    Array(tasks.length + 2)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;
        if (
            value > Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {
                handleDeleteTask(key)
                animationIsRunning.current = false;
            });
        }
    };

    //RENDER TASKS
    const renderItem = data => (
        <Animated.View>
            <ListView underlayColor={colors.secondary}>
                <ScrollView>
                    {data.item.isChecked ?
                        <MaterialCommunityIcons
                            name="checkbox-marked-outline"
                            size={28}
                            color="white"
                            onPress={() => handleEditTask({
                                title: data.item.title,
                                isChecked: !data.item.isChecked,
                                key: data.item.key
                            })}
                            style={{
                                position: 'absolute'
                            }}
                        />
                        : 
                        <MaterialCommunityIcons
                            name="checkbox-blank-outline"
                            size={28}
                            color="white"
                            onPress={() => handleEditTask({
                                title: data.item.title,
                                isChecked: !data.item.isChecked,
                                key: data.item.key
                            })}
                            style={{
                                position: 'absolute'
                            }}
                        />
                    }

                    {data.item.isChecked ?
                        <DoneTodoText onPress={() => {handleEditingTask(data.item)}}>{data.item.title}</DoneTodoText>
                        :
                        <TodoText onPress={() => {handleEditingTask(data.item)}}>{data.item.title}</TodoText>
                    }
                </ScrollView>
            </ListView>
        </Animated.View>
    );

    const renderHiddenItem = data => (
        <ListViewHidden>
            <Text style={{ 
                    color: colors.alternative,
                    fontSize: 16,
                    fontStyle: 'italic',
                    marginTop: 4,
                    marginBottom: 4
                }}
            >
                Suppression...
            </Text>

            <TodoText style={{ color: 'transparent' }}>{data.item.title}</TodoText>
        </ListViewHidden>
    );

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
                    marginTop: -16
                }}>
                    <SwipeListView
                        disableLeftSwipe
                        data={tasks}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        leftOpenValue={Dimensions.get('window').width}
                        onSwipeValueChange={onSwipeValueChange}
                        useNativeDriver={false}
                    />
                </View>
            }
        </>
    )
}

export default ListTasks