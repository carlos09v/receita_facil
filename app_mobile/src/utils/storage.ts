import AsyncStorage from "@react-native-async-storage/async-storage";
import { FoodType } from "../@types/food";

// Buscar os favoritos
// Salvar e remover um favorito

export const getFavorites = async (key: string) => {
    const favorites = await AsyncStorage.getItem(key)
    return favorites ? JSON.parse(favorites) : []
}

export const saveFavorite = async (key: string, newItem: FoodType) => {
    let myFavorites = await getFavorites(key)

    // Verificar se ja tem o item la
    let hasItem = myFavorites.some((item: FoodType) => item.id === newItem.id)
    if(hasItem) return

    myFavorites.push(newItem)
    await AsyncStorage.setItem(key, JSON.stringify(myFavorites))
    console.log('Item salvo com sucesso!')
}

export const removeFavorite = async (id: string) => {
    let recipes = await getFavorites('@appreceitas')
    // Pegar todos, menos o do id
    let myFavorites = recipes.filter((item: FoodType) => {
        return (item.id !== id)
    })

    await AsyncStorage.setItem('@appreceitas', JSON.stringify(myFavorites))
    console.log('Item deletado com sucesso!')
    return myFavorites
}

export const isFavorite = async (recipe: FoodType) => {
    let myRecipes = await getFavorites('@appreceitas')
    const favorite = myRecipes.find((item: FoodType) => item.id === recipe.id)

    // Ta na lista
    if(favorite) return true

    return false
}