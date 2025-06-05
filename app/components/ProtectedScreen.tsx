import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import ProfileScreen from '../ProfileScreen';
export default function ProtectedScreen() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (!isSignedIn) {
    router.replace('/');
    return null;
  }

  return <ProfileScreen />;
}

