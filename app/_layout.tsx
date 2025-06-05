// // app/_layout.tsx
// import { ClerkProvider } from '@clerk/clerk-expo';
// import { Slot } from 'expo-router';
// import * as SecureStore from 'expo-secure-store';
// import React from 'react';

// // Get Clerk publishable key from your environment
// const clerkPubKey = "pk_test_b24tY2FpbWFuLTkxLmNsZXJrLmFjY291bnRzLmRldiQ"

// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       return await SecureStore.getItemAsync(key);
//     } catch (e) {
//       console.error('Error getting token from SecureStore', e);
//       return null;
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       await SecureStore.setItemAsync(key, value);
//     } catch (e) {
//       console.error('Error saving token to SecureStore', e);
//     }
//   },
//   async deleteToken(key: string) {
//     try {
//       await SecureStore.deleteItemAsync(key);
//     } catch (e) {
//       console.error('Error deleting token from SecureStore', e);
//     }
//   },
// };

// export default function RootLayout() {
//   return (
//     <ClerkProvider publishableKey={clerkPubKey} tokenCache={tokenCache}>
//       <Slot />
//     </ClerkProvider>
//   );
// }


import { ClerkProvider, useClerk } from '@clerk/clerk-expo';
import { Slot } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';

const clerkPubKey = "pk_test_b24tY2FpbWFuLTkxLmNsZXJrLmFjY291bnRzLmRldiQ";

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error('Error getting token from SecureStore', e);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('Error saving token to SecureStore', e);
    }
  },
  async deleteToken(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error('Error deleting token from SecureStore', e);
    }
  },
};

// Helper component to sign out on app start
function ClearSessionOnStart() {
  const { signOut } = useClerk();

  useEffect(() => {
    // This will clear the active session when the app loads
    signOut().catch(console.error);
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={clerkPubKey} tokenCache={tokenCache}>
      <ClearSessionOnStart />
      <Slot />
    </ClerkProvider>
  );
}
