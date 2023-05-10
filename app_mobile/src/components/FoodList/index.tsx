// Atalho: rnbc
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

import { styles } from './styles';
import { FoodType } from '../../@types/food';
import { RootStackParamList } from '../../@types/route.params';


export function FoodList({ ...data }: FoodType) {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()

  const handleNavigate = () => {
    navigate('Detail', { data })
  }


  return (
    <TouchableOpacity activeOpacity={.9} style={styles.container} onPress={handleNavigate}>
        <Image 
            source={{ uri: data.cover }}
            style={styles.cover}  
        />

        <View style={styles.info}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.description}>{data.total_ingredients} ingredientes | {data.time} min</Text>
        </View>

        <LinearGradient 
            style={styles.gradient}
            colors={['transparent', 'rgba(0,0,0,0.70)', 'rgba(0,0,0,0.90)']}
        />
    </TouchableOpacity>
  );
}