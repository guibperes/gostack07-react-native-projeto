import React from 'react'
import { Text } from 'react-native'

import { Container } from './styles'

export function Main () {
  return (
    <Container>
      <Text>Main</Text>
    </Container>
  )
}

Main.navigationOptions = {
  title: 'Main'
}
