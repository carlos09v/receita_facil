// Atalho: rnbc
import { View, Text, Pressable, ScrollView, Image, Modal, Share } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react';

import { styles } from './styles';
import { RootStackParamList } from '../../@types/route.params';
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'
import { Ingredients } from '../../components/Ingredients';
import { Instructions } from '../../components/Instructions';
import { VideoView } from '../../components/Video';
import { isFavorite, removeFavorite, saveFavorite } from '../../utils/storage';
import { FoodType } from '../../@types/food';

export function Detail() {
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>()
  const navigation = useNavigation()
  const [showVideo, setShowVideo] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const shareRecipe = async () => {
    try {
      await Share.share({
        url: "https://github.com/carlos09v", // So no IOS
        message:
          `Receita: ${route.params.data.name}
Ingredientes: ${route.params.data.total_ingredients}\n
Vi lá no app Receita Fácil !`
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFavoriteRecipe = async (recipe: FoodType) => {
    if (favorite) {
      await removeFavorite(recipe.id)
      setFavorite(false)
    } else {
      await saveFavorite('@appreceitas', recipe)
      setFavorite(true)
    }
  }


  useLayoutEffect(() => {
    const getStatusFavorite = async () => {
      const recipeFavorite = await isFavorite(route.params.data)
      setFavorite(recipeFavorite)
    }
    getStatusFavorite()

    navigation.setOptions({
      title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
      headerRight: () => (
        <Pressable onPress={() => handleFavoriteRecipe(route.params.data)}>
          {favorite ? (
            <Entypo
              name='heart'
              size={28}
              color="#ff4141"
            />
          ) : (
            <Entypo
              name='heart-outlined'
              size={28}
              color="#ff4141"
            />
          )}
        </Pressable>
      )
    })
  }, [navigation, route.params?.data, favorite])

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 14 }} style={styles.container} showsVerticalScrollIndicator={false} >
      <Pressable onPress={() => setShowVideo(true)}>
        <View style={styles.playIcon}>
          <AntDesign name='playcircleo' size={48} color="#fafafa" />
        </View>

        <Image
          source={{ uri: route.params.data.cover }}
          style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{route.params.data.name}</Text>
          <Text style={styles.ingredientsText}>Ingredientes: ({route.params.data.total_ingredients})</Text>
        </View>

        <Pressable onPress={shareRecipe}>
          <Feather name='share-2' size={24} color="#121212" />
        </Pressable>
      </View>

      {route.params.data.ingredients.map(item => (
        <Ingredients key={item.id} data={item} />
      ))}

      <View style={styles.instructionsArea}>
        <Text style={styles.instructionsText}>Modo de preparo</Text>
        <Feather
          name='arrow-down'
          size={24}
          color="#fff"
        />
      </View>

      {route.params?.data.instructions.map((item, index) => (
        <Instructions key={item.id} {...item} index={index} />
      ))}

      <Modal visible={showVideo} animationType='slide'>
        <VideoView
          handleClose={() => setShowVideo(false)}
          videoUrl={route.params.data.video}
        />
      </Modal>
    </ScrollView>
  );
}