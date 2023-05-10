// Atalho: rnbc
import { Text, SafeAreaView, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native'

import api from '../../lib/api';
import { styles } from './styles';
import { Logo } from '../../components/Logo';
import { FoodType } from '../../@types/food';
import { FoodList } from '../../components/FoodList';
import { RootStackParamList } from '../../@types/route.params';
import { Text as MotiText } from 'moti'



export function Home() {
  const [search, setSearch] = useState('')
  const [foodsData, setFoodsData] = useState<FoodType[]>([])
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await api.get('/foods')
      setFoodsData(data)
    }

    fetchApi()
  }, [])


  const handleSearch = () => {
    if (!search) return

    navigation.navigate('Search', { name: search })
    setSearch('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 15
        }}
        animate={{
          opacity: 1,
          translateY: 0
        }}
        transition={{
          delay: 100,
          type: 'timing',
          duration: 650
        }}
      >Encontre a receita</MotiText>

      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 15
        }}
        animate={{
          opacity: 1,
          translateY: 0
        }}
        transition={{
          delay: 200,
          type: 'timing',
          duration: 850
        }}
      >que combina com você</MotiText>

      <View style={styles.form}>
        <TextInput
          placeholder='Digite o nome da comida...'
          style={styles.input}
          value={search}
          onChangeText={text => setSearch(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name='search' size={28} color="#4CBE6C" />
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={item => String(item.id)}
        data={foodsData}
        renderItem={({ item }) => <FoodList {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}