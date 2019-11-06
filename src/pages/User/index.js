import React, { useState, useEffect } from 'react'

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
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function handleGetStars () {
      const { data } = await api.get(`/users/${user.login}/starred`, {
        params: {
          per_page: 10,
          page
        }
      })

      setStars([...stars, ...data])
    }
    handleGetStars()
  }, [page])

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
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.2}
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
