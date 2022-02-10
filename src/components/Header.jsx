import React, { useEffect, useState } from 'react'
import { View,  StyleSheet } from 'react-native'
import ModalEditName from './modal/ModalEditName'
import ModalDeleteTasks from './modal/ModalDeleteTasks'

//STYLES
import { HeaderBanner, HeaderTitle, HeaderButton, colors } from '../styles/appStyles'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading';

//ICON
import { MaterialCommunityIcons } from '@expo/vector-icons'

const stylesHeader = StyleSheet.create({
    containerHeader : {
        display: 'flex',
        alignItems: 'center'
    },
    containerText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '88%',
        position: 'absolute',
        bottom: 36
    }
})

const Header = ({ tasks, setTasks }) => {
    //Storing name
    const [ name, setName ] = useState('')

    const loadName = () => {
        AsyncStorage.getItem("storedName").then(data => {
            if(data !== null) {
                setName(JSON.parse(data))
            }
        }).catch(error => console.log('error on stored name:', error))
    }

    const [ titleBanner, setTitleBanner ] = useState('')
    useEffect(() => {
        if(name.length === 0)
            setTitleBanner(`Quel est votre prénom ?`)
        else{
            if(tasks.length === 0)
                setTitleBanner(`Bienvenue ${name} !`)
            else
                setTitleBanner(`Quoi de neuf, ${name} ?`)
        }
    }, [name])

    //Edit name
    const [ modalEditOn, setModalEditOn ] = useState(false)

    //Loading name
    const [ ready, setReady ] = useState(false)

    //Delete tasks modal
    const [ modalDeleteOn, setModalDeleteOn ] = useState(false)

    return(
        <>
            {!ready ?
                <AppLoading
                    startAsync={loadName}
                    onFinish={() => setReady(true)} 
                    onError={console.warn}
                />
                :
                <>
                    <View style={stylesHeader.containerHeader}>
                        <HeaderBanner source={require('../assets/header_banner.gif')} alt='header_banner' />
                        <View style={stylesHeader.containerText}>
                            <HeaderTitle onPress={() => setModalEditOn(true)}>
                                {titleBanner}
                            </HeaderTitle>

                            {name ?
                                <HeaderButton onPress={() => AsyncStorage.removeItem('storedName')}>
                                    <MaterialCommunityIcons name='delete-empty' size={24} color={colors.tertiary} />
                                </HeaderButton>
                                :
                                null
                            }
                        </View>
                    </View>

                    <ModalEditName modalEditOn={modalEditOn} setModalEditOn={setModalEditOn} name={name} setName={setName} />
                    <ModalDeleteTasks modalDeleteOn={modalDeleteOn} setModalDeleteOn={setModalDeleteOn} tasks={tasks} setTasks={setTasks} />
                </>
            }
        </>
    )
}

export default Header