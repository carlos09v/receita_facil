// Atalho: rnbc
import { View, Text } from 'react-native';

import { styles } from './styles';

type IngredientsData = {
  data: {
    id: string;
    name: string;
    amount: string;
  }
}

export function Ingredients({ data }: IngredientsData) {
  return (
    <View style={styles.container}>
        <Text style={styles.name}>{data.name}</Text>
        <Text>{data.amount}</Text>
    </View>
  );
}