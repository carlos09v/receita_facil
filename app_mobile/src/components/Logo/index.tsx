// Atalho: rnbc
import { Text } from 'react-native';
import { View } from 'moti'

import { styles } from './styles';

export function Logo() {
  return (
    <View 
      style={styles.logoArea}
      from={{
        opacity: 0,
        translateX: -50
      }}
      animate={{
        opacity: 1,
        translateX: 0
      }}
      transition={{
        type: 'spring',
        delay: 300
      }}
      >
        <Text style={styles.logoText}>Receita Fácil</Text>
    </View>
  );
}