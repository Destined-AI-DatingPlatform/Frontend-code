
import { useAuth, useUser } from '@clerk/clerk-expo';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type RootStackParamList = {
  DatingMatches: undefined;
  RecommendedUserProfileScreen: {
    userId: string;
    userDetails?: {
      first_name: string;
      last_name: string;
      image_url: string;
    };
  };
};

type DatingMatchesNavigationProp = StackNavigationProp<RootStackParamList, 'DatingMatches'>;

type Recommendation = {
  id: string | number;
  recommendedUserId: string;
  score: number;
};

type ClerkUser = {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
};

type RecommendationWithUser = Recommendation & {
  userDetails?: ClerkUser;
};

export default function DatingMatchesScreen() {
  const { user } = useUser();
  const { getToken } = useAuth(); // 🔐 Access token for authenticated requests
  const navigation = useNavigation<DatingMatchesNavigationProp>();
  const [recommendations, setRecommendations] = useState<RecommendationWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const userId = user?.id;
        if (!userId) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const token = await getToken(); // 🔐 Fetch token from Clerk
        if (!token) {
          throw new Error('Unable to retrieve authentication token');
        }

        const backendUrl = `https://ef5a-118-103-143-2.ngrok-free.app/RECOMMENDATIONMICROSERVICE/api/recommendations/fetch-and-save/${userId}`;
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ Send token to backend
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch recommendations: ${response.status}`);
        }

        const data: Recommendation[] = await response.json();

        const enrichedData: RecommendationWithUser[] = await Promise.all(
          data.map(async (rec) => {
            try {
              const userResponse = await fetch(
                `https://api.clerk.dev/v1/users/${rec.recommendedUserId}`,
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer sk_test_PDfTXQjaEv6z4ZF1xskpztog2mRXsegitn9L6HXeKn`,
                  },
                }
              );

              if (!userResponse.ok) {
                throw new Error(`Failed to fetch Clerk user: ${userResponse.status}`);
              }

              const userData = await userResponse.json();

              const userDetails: ClerkUser = {
                id: userData.id,
                first_name: userData.first_name ?? 'Unknown',
                last_name: userData.last_name ?? '',
                image_url: userData.image_url ?? '',
              };

              return {
                ...rec,
                userDetails,
              };
            } catch (err) {
              console.warn(`Error fetching Clerk user ${rec.recommendedUserId}`, err);
              return {
                ...rec,
                userDetails: undefined,
              };
            }
          })
        );

        setRecommendations(enrichedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  const handleViewProfile = (userId: string, userDetails?: ClerkUser) => {
    navigation.navigate('RecommendedUserProfileScreen', { userId, userDetails });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dating Matches</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dating Matches</Text>
      <Text style={styles.subtitle}>Check out lists of matches & keep enjoying</Text>

      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.matchesContainer}
        renderItem={({ item }) => (
          <View style={styles.matchCard}>
            {item.userDetails?.image_url ? (
              <Image source={{ uri: item.userDetails.image_url }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.placeholderAvatar]}>
                <Text style={{ color: '#fff' }}>No Image</Text>
              </View>
            )}

            <View style={styles.matchDetails}>
              <Text style={styles.matchName}>
                {item.userDetails
                  ? `${item.userDetails.first_name} ${item.userDetails.last_name}`
                  : item.recommendedUserId.replace('user_', 'User ')}
              </Text>
              <Text style={styles.userIdText}>ID: {item.recommendedUserId}</Text>

              <TouchableOpacity
                style={styles.viewProfileButton}
                onPress={() => handleViewProfile(item.recommendedUserId, item.userDetails)}
                activeOpacity={0.7}
              >
                <MaskedView
                  maskElement={
                    <Text style={[styles.buttonText, { backgroundColor: 'transparent' }]}>
                      View Profile
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={['#8A2BE2', '#FF1493']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={[styles.buttonText, { opacity: 0 }]}>View Profile</Text>
                  </LinearGradient>
                </MaskedView>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  matchesContainer: {
    paddingBottom: 20,
  },
  matchCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  placeholderAvatar: {
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchDetails: {
    flex: 1,
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userIdText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  viewProfileButton: {
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
