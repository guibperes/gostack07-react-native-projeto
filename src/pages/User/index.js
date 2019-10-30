import React from 'react'
import { Text } from 'react-native'

import { Container } from './styles'

export function User ({ navigation }) {
  return (
    <Container>
      <Text>{JSON.stringify(navigation.getParam('user'))}</Text>
    </Container>
  )
}
