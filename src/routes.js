import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Main } from './pages/Main'
import { User } from './pages/User'

export const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159C1'
        },
        headerTintColor: '#FFF'
      }
    }
  )
)
