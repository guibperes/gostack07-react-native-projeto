import React, { useState, useEffect } from 'react';

import { api } from '../../services/api';
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
  Author,
} from './styles';

export function User({ navigation }) {
  const user = navigation.getParam('user');
  const [stars, setStars] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function handleGetStars() {
      const { data } = await api.get(`/users/${user.login}/starred`, {
        params: {
          page,
        },
      });

      setStars([...stars, ...data]);
      setRefreshing(false);
    }
    handleGetStars();
  }, [page]);

  function handleRefresh() {
    if (page === 1) return;

    setRefreshing(true);
    setStars([]);
    setPage(1);
  }

  function handleRepoWebview(repo) {
    navigation.navigate('Webview', { repo });
  }

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
        onRefresh={handleRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Starred onTouchEnd={() => handleRepoWebview(item)}>
            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});
