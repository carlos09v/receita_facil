// Atalho: rnbc
import { View, Text } from 'react-native';

import { styles } from './styles';

type InstructionProps = {
  id: string
  text: string
  index: number
}

export function Instructions({ ...data }: InstructionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.index + 1}- </Text>
      <Text style={styles.text}>{data.text}</Text>
    </View>
  );
}