import { useOAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWarmUpBrowser } from './utils/useWarmUpBrowser';

// Define your stack param list
type RootStackParamList = {
  ProfileScreen: undefined;
  // add other screens here if needed
};

export default function IndexScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useWarmUpBrowser(); // optional optimization

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // Navigate to ProfileScreen on successful sign-in
        navigation.navigate('ProfileScreen');
      }
    } catch (err) {
      console.error('OAuth error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.continueButton} onPress={handleSignIn}>
        <LinearGradient
          colors={['#8A2BE2', '#FF1493']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.continueButtonText}>Start Chatting</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  continueButton: {
    borderRadius: 25,
    overflow: 'hidden',
    width: 180,
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});