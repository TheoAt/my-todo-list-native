import React from 'react'
import { View,  StyleSheet } from 'react-native'

//STYLES
import { HeaderBanner, HeaderTitle, HeaderButton, colors } from '../styles/appStyles'

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
    return(
        <View style={stylesHeader.containerHeader}>
            <HeaderBanner source={require('../assets/header_banner.gif')} alt='header_banner' />
            <View style={stylesHeader.containerText}>
                <HeaderTitle>Quoi de neuf, Theo ?</HeaderTitle>
                <HeaderButton>
                    <MaterialCommunityIcons name='delete-empty' size={24} color={colors.tertiary} />
                </HeaderButton>
            </View>
        </View>
    )
}

export default Header