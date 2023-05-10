// Atalho: rnbc
import { View, Text, FlatList } from 'react-native';
import { useRoute,RouteProp } from '@react-navigation/native'
import { useEffect, useState } from 'react';

import { styles } from './styles';
import { RootStackParamList } from '../../@types/route.params';
import api from '../../lib/api';
import { FoodType } from '../../@types/food';
import { FoodList } from '../../components/FoodList';

export function Search() {
  const route = useRoute<RouteProp<RootStackParamList, 'Search'>>()
  const [recipes, setRecipes] = useState<FoodType[]>([])

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await api.get(`/foods?name_like=${route.params.name}`)
      setRecipes(data)
    }
    fetchRecipes()
    
  }, [route.params.name])

  return (
    <View style={styles.container}>
        {/* <Text>{route.params.name}</Text> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)} 
          data={recipes}
          renderItem={({ item }) => <FoodList {...item}  />}
          ListEmptyComponent={() => <Text style={styles.text}>Não encontramos o que está buscando :(</Text>}
        />
    </View>
  );
}