import React, { useEffect, useState } from 'react'
import { View,  StyleSheet } from 'react-native'
import ModalEditName from './modal/ModalEditName'
import ModalDeleteTasks from './modal/ModalDeleteTasks'

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

const Header = ({ tasks, setTasks, name, setName, isNamed }) => {

    //Edit name
    const [ modalEditOn, setModalEditOn ] = useState(false)

    //Delete tasks modal
    const [ modalDeleteOn, setModalDeleteOn ] = useState(false)

    return(
        <>
            <View style={stylesHeader.containerHeader}>
                <HeaderBanner source={require('../assets/header_banner.gif')} alt='header_banner' />
                <View style={stylesHeader.containerText}>
                    <HeaderTitle onPress={() => isNamed || name ? setModalEditOn(true) : null}>
                        {!isNamed && !name ?
                            'Bienvenue sur TouDou !'
                            :
                            `Quoi de neuf, ${name} ?`
                        }
                    </HeaderTitle>

                    {isNamed || name ?
                        <HeaderButton onPress={() => tasks.length !== 0 ? setModalDeleteOn(true) : null}>
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
    )
}

export default Header