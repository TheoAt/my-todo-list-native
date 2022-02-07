import React, { useEffect, useState } from 'react'
import { View,  StyleSheet } from 'react-native'
import ModalName from './ModalName'
import ModalEditName from './ModalEditName'

//STYLES
import { HeaderBanner, HeaderTitle, HeaderButton, colors } from '../styles/appStyles'

//ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

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

const Header = () => {
    //Storing name
    const [ name, setName ] = useState('')

    AsyncStorage.getItem("storedName").then(data => {
        if(data !== null) {
            setName(JSON.parse(data))
            setModalOn(false)
        }
    }).catch(error => console.log('error on stored name:', error))

    const [ modalOn, setModalOn ] = useState(name.length === 0)

    //Edit name
    const [ modalEditOn, setModalEditOn ] = useState(false)

    return(
        <>
            <View style={stylesHeader.containerHeader}>
                <HeaderBanner source={require('../assets/header_banner.gif')} alt='header_banner' />
                <View style={stylesHeader.containerText}>
                    <HeaderTitle onPress={() => setModalEditOn(true)}>
                        {name.length === 0 ? 'Quoi de neuf ?' : `Quoi de neuf, ${name} ?`}
                    </HeaderTitle>
                    <HeaderButton onPress={() => AsyncStorage.removeItem('storedName')}>
                        <MaterialCommunityIcons name='delete-empty' size={24} color={colors.tertiary} />
                    </HeaderButton>
                </View>
            </View>

            {name.length === 0 ?
                <ModalName modalOn={modalOn} setModalOn={setModalOn} setName={setName} />
                :
                null
            }

            <ModalEditName modalEditOn={modalEditOn} setModalEditOn={setModalEditOn} name={name} setName={setName} />
        </>
    )
}

export default Header