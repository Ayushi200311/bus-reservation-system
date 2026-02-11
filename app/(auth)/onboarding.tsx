import { useRouter } from 'expo-router';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Onboarding() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/o3.jpeg')}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Overlay (optional for readability) */}
      <View style={styles.overlay}>
        <Text style={styles.title}>
          Most Affordable{'\n'}Bus Rental Service
        </Text>

        <Text style={styles.subtitle}>
          Convenience on a budget with our
          Most Affordable Bus Rental Service app
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  overlay: {
    backgroundColor: 'rgba(30, 30, 30, 0.3)',
    padding: 30,
   
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },

  subtitle: {
    color: '#ddd',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#FF1E1E',
    paddingVertical: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
