// Atalho: rnbc
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native'

import { styles } from './styles';
import { useEffect, useState } from 'react';
import { FoodType } from '../../@types/food';
import { getFavorites } from '../../utils/storage';
import { FoodList } from '../../components/FoodList';

export function Favorites() {
  const [recipes, setRecipes] = useState<FoodType[]>([])
  const isFocused = useIsFocused() // Qndo tiver na tela (true), qndo sai (false)

  useEffect(() => {
    let isActive = true

    const getRecipes = async () => {
      const result = await getFavorites('@appreceitas')
      if(isActive) setRecipes(result)
    }

    if(isActive) getRecipes()

    return () => {
      isActive = false
    }
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Receitas Favoritas</Text>

        {recipes.length === 0 && (
          <Text>Você ainda não tem nenhuma receita salva :(</Text>
        )}

        <FlatList 
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 14 }}
          data={recipes}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <FoodList {...item} />}
        />
    </SafeAreaView>
  );
}