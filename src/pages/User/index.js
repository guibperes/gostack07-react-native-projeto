import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'

import { api } from '../../services/api'
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author
} from './styles'

export function User ({ navigation }) {
  const user = navigation.getParam('user')
  const [stars, setStars] = useState([])

  useEffect(() => {
    async function handleGetStars () {
      const { data } = await api.get(`/users/${user.login}/starred`)

      setStars([...stars, ...data])
    }
    handleGetStars()
  }, [])

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        keyExtractor={star => String(star.id)}
        renderItem={({ item }) => (
          <Starred>
            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  )
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name
})
