import React from 'react'
import { View, Text } from 'react-native'
import { FooterComponent, colors } from '../styles/appStyles'

const Footer = () => {
    return(
        <FooterComponent>
            <Text style={{ color: colors.alternative, fontSize: 8 }}>© TheoAt • Dev. Tous droits réservés</Text>
        </FooterComponent>
    )
}

export default Footer