// components/SignOutButton.tsx
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Button } from 'react-native';

export default function SignOutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(); // Clerk sign out
      await SecureStore.deleteItemAsync('__session'); // clear cached session
      await SecureStore.deleteItemAsync('__refresh'); // just in case
      router.replace('/'); // redirect
    } catch (err) {
      console.error('Error during sign-out:', err);
    }
  };

  return <Button title="Sign Out" onPress={handleSignOut} />;
}
