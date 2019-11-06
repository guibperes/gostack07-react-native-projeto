import React, { useState, useEffect } from 'react'
import { Keyboard, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'

import { api } from '../../services/api'

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButtton,
  ProfileButtonText
} from './styles'

export function Main ({ navigation }) {
  const [newUser, setNewUser] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setloading] = useState(false)
  const [inputError, setInputError] = useState(false)

  useEffect(() => {
    async function handleStorageGet () {
      const users = await AsyncStorage.getItem('USERS')

      if (users) {
        setUsers(JSON.parse(users))
      }
    }
    handleStorageGet()
  }, [])

  useEffect(() => {
    async function handleStorageSave () {
      AsyncStorage.setItem('USERS', JSON.stringify(users))
    }
    handleStorageSave()
  }, [users])

  function handleNavigate (user) {
    navigation.navigate('User', { user })
  }

  function handleTextChange (text) {
    setNewUser(text)
    setInputError(false)
  }

  async function handleSubmit () {
    setloading(true)

    try {
      const { data: apiData } = await api.get(`/users/${newUser}`)

      const data = {
        name: apiData.name,
        login: apiData.login,
        bio: apiData.bio,
        avatar: apiData.avatar_url
      }

      setUsers([...users, data])
      setNewUser('')
      setloading(false)
      Keyboard.dismiss()
    } catch (error) {
      setloading(false)
      setInputError(true)
    }
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Adicionar Usuário'
          value={newUser}
          onChangeText={handleTextChange}
          returnKeyType='send'
          onSubmitEditing={handleSubmit}
          error={inputError}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator color='#FFF' />
          ) : (
            <Icon name='add' size={20} color='#FFF' />
          )}
        </SubmitButton>
      </Form>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButtton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButtton>
          </User>
        )}
      />
    </Container>
  )
}

Main.navigationOptions = () => ({
  title: 'Main'
})
