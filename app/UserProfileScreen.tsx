
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type UserInterestsResponse = {
  location: string;
  interestList: string[];
};

// ⚠️ Replace this with environment-safe secure storage / proxy
const CLERK_API_KEY = 'sk_test_PDfTXQjaEv6z4ZF1xskpztog2mRXsegitn9L6HXeKn';

export default function UserProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();

  const [interestsData, setInterestsData] = useState<UserInterestsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  useEffect(() => {
    if (!user?.id) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.clerk.dev/v1/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${CLERK_API_KEY}`,
          },
        });
        if (!response.ok) throw new Error(`Failed to fetch user: ${response.status}`);
        const data = await response.json();
        setFirstName(data.first_name);
        setLastName(data.last_name);
      } catch (err) {
        console.error('Error fetching Clerk user:', err);
      }
    };

    const fetchUserInterests = async () => {
      try {
        const apiUrl = `https://ef5a-118-103-143-2.ngrok-free.app/USERMICROSERVICE/api/interests/${user.id}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Failed to fetch interests: ${response.status}`);
        const data: UserInterestsResponse = await response.json();
        setInterestsData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchUserInterests();
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`https://api.clerk.dev/v1/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CLERK_API_KEY}`,
        },
        body: JSON.stringify({
          first_name: newFirstName,
          last_name: newLastName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update name');
      }

      // Refetch updated name
      const data = await response.json();
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#4B0082" />
      </TouchableOpacity>

      <Text style={styles.username}>Your Profile</Text>

      {/* Profile Image */}
      <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />

      {/* User Name */}
      <Text style={styles.username}>{firstName} {lastName}</Text>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => {
        setNewFirstName(firstName);
        setNewLastName(lastName);
        setEditModalVisible(true);
      }}>
        <Text style={styles.editButtonText}>EDIT</Text>
      </TouchableOpacity>

      {/* User ID */}
      <View style={styles.bioSection}>
        <Text style={styles.bioLabel}>User ID</Text>
        <Text style={styles.bioText}>{user?.id}</Text>
      </View>

      {/* Interests */}
      <View style={styles.interestsSection}>
        <Text style={styles.interestsLabel}>Interests</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#8A2BE2" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.interestsList}>
            {interestsData?.interestList.map((interest, idx) => (
              <View key={idx} style={styles.interestItem}>
                {interest.toLowerCase().includes('music') ? (
                  <FontAwesome5 name="music" size={16} color="#4B0082" />
                ) : interest.toLowerCase().includes('swimming') ? (
                  <MaterialCommunityIcons name="swim" size={18} color="#4B0082" />
                ) : (
                  <Icon name="star" size={16} color="#4B0082" />
                )}
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('MatchScreen' as never)}
        >
          <Icon name="heart" size={24} color="#8A2BE2" />
          <Text style={styles.navText}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('UserProfileScreen' as never)}
        >
          <Icon name="person" size={24} color="#8A2BE2" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for editing name */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Name</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={newFirstName}
              onChangeText={setNewFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={newLastName}
              onChangeText={setNewLastName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fdfdff',
    paddingTop: 60,
    alignItems: 'center',
    paddingBottom: 80,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e003e',
  },
  editButton: {
    backgroundColor: '#E0D4FD',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  editButtonText: {
    fontWeight: '700',
    color: '#4B0082',
    fontSize: 12,
  },
  bioSection: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 25,
  },
  bioLabel: {
    fontWeight: 'bold',
    color: '#4B0082',
    fontSize: 16,
    marginBottom: 4,
  },
  bioText: {
    color: '#555',
    fontSize: 14,
  },
  interestsSection: {
    width: '80%',
    alignItems: 'flex-start',
  },
  interestsLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4B0082',
    marginBottom: 10,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 8,
    backgroundColor: '#F1EDFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  interestText: {
    marginLeft: 6,
    color: '#4B0082',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#8A2BE2',
    marginTop: 2,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#4B0082',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    backgroundColor: '#8A2BE2',
    padding: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

