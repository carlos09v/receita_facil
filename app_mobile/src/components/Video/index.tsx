// Atalho: rnbc
import { Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview'

import { styles } from './styles';
import { Feather } from '@expo/vector-icons'

export function VideoView({ handleClose, videoUrl }: { handleClose: () => void, videoUrl: string }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleClose}>
        <Feather name='arrow-left' size={24} color="#fff" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <WebView 
        style={styles.contentView}
        source={{ uri: videoUrl }}
      />
    </SafeAreaView>
  );
}