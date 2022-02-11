import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

//COMPONENTS
import Home from './src/components/Home';

//IMPORT STYLES
import { Container } from './src/styles/appStyles'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading';

export default function App() {

  //Initial tasks
  const [ tasks, setTasks ] = useState([])

  const loadTasks = () => {
    AsyncStorage.getItem("storedTasks").then(data => {
      if(data !== null) {
        setTasks(JSON.parse(data))
      }
    }).catch(error => console.log('error on stored tasks:', error))
  }

  //Loading App
  const [ ready, setReady ] = useState(false)

  return (
    <>
      {!ready ?
        <AppLoading
          startAsync={loadTasks}
          onFinish={() => setReady(true)} 
          onError={console.warn}
        />
        :
        <Container>
          <Home tasks={tasks} setTasks={setTasks} />
          <StatusBar style='light'/>
        </Container>
      }
    </>
  );
}
