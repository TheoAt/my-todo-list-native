import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading';
import Header from './src/components/Header';

export default function App() {
  const [ ready, setReady ] = useState(false)

  //Initial tasks
  const [ tasks, setTasks ] = useState([])

  const loadTasks = () => {
    AsyncStorage.getItem("storedTasks").then(data => {
      if(data !== null) {
        setTasks(JSON.parse(data))
      }
    }).catch(error => console.log('error:', error))
  }

  return (
    <>
        <View>
          <Header />
          {/* <Home tasks={tasks} setTasks={setTasks} /> */}
          <StatusBar style='light'/>
        </View>
    </>
    
  );
}
