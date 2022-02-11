import React, { useState } from 'react'
import Header from './Header'
import EnterName from './EnterName'
import ListTasks from './ListTasks'
import ModalTask from './modal/ModalTask'
import Footer from './Footer'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({ tasks, setTasks }) => {

    //MODAL & INPUT
    const [ modalOn, setModalOn ] = useState(false)
    const [ taskInputValue, setTaskInputValue ] = useState()

    //ADD TASK
    const handleAddTask = (task) => {
        const newTasks = [task, ...tasks]

        AsyncStorage.setItem("storedTasks", JSON.stringify(newTasks)).then(() => {
            setTasks(newTasks)
            setModalOn(false)
        }).catch(error => console.log('error:', error))
    }

    //EDITING TASK
    const [ taskToBeEdited, setTaskToBeEdited ] = useState(null)

    const handleEditingTask = (task) => {
        setTaskToBeEdited(task)
        setModalOn(true)
        setTaskInputValue(task.title)
    }

    const handleEditTask = (editedTask) => {
        const newTasks = [...tasks]
        const taskIndex = tasks.findIndex((task) => task.key === editedTask.key)
        newTasks.splice(taskIndex, 1, editedTask)

        AsyncStorage.setItem("storedTasks", JSON.stringify(newTasks)).then(() => {
            setTasks(newTasks)
            setModalOn(false)
            setTaskToBeEdited(null)
        }).catch(error => console.log('error:', error))
    }

    //Storing name
    const [ name, setName ] = useState('')
    const [ isNamed, setIsNamed ] = useState(false)
    
    AsyncStorage.getItem("storedName").then(data => {
        if(data !== null) {
            setName(JSON.parse(data))
        }
    }).catch(error => console.log('error on stored name:', error))

    return(
        <>
            <Header tasks={tasks} setTasks={setTasks} name={name} setName={setName} isNamed={isNamed} />

            {isNamed || name ?
                <>
                    <ListTasks
                        tasks={tasks}
                        setTasks={setTasks}
                        handleEditingTask={handleEditingTask}
                        handleEditTask={handleEditTask}
                        modalOn={modalOn}
                    />    
                    <ModalTask
                        tasks={tasks}
                        modalOn={modalOn}
                        setModalOn={setModalOn}
                        taskInputValue={taskInputValue}
                        setTaskInputValue={setTaskInputValue}
                        handleAddTask={handleAddTask}
                        taskToBeEdited={taskToBeEdited}
                        setTaskToBeEdited={setTaskToBeEdited}
                        handleEditTask={handleEditTask}
                    />
                </>
                :
                <EnterName setIsNamed={setIsNamed} />
            }

            <Footer />
         </>
    )
}

export default Home