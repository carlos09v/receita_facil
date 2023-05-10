import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'


import { Favorites } from '../pages/favorites'
import { StackRoutes } from './stackRoutes'

const Tab = createBottomTabNavigator()

export const Routes = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false, // Tirar o header
        tabBarHideOnKeyboard: true, // Esconder a tabBar qndo teclado aparecer
        tabBarShowLabel: false, // Tirar os nomes da tabBar (deixar so os icones)
        tabBarActiveTintColor: "#121212", // Cor dos icones

        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0
        }
      }}>
      <Tab.Screen 
        name='HomeTab' 
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            // Se tiver com foco
            if(focused) {
              return <Ionicons name='home' color="#000" size={size} />
            }
            
            return <Ionicons name='home-outline' color={color} size={size} />
          }
        }}
      />
      <Tab.Screen 
        name='Favorites' 
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            // Se tiver com foco
            if(focused) {
              return <Ionicons name='heart' color="#ff4141" size={size} />
            }
            
            return <Ionicons name='heart-outline' color={color} size={size} />
          }
        }}
      />
    </Tab.Navigator>
  )
}