

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useUser } from '@clerk/clerk-expo';
import Icon from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  ChatScreen: {
    userId: string; // Receiver ID
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
};

type ChatRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;

type Message = {
  senderId: string;
  receiverId: string;
  content: string;
};

export default function ChatScreen() {
  const { user } = useUser();
  const route = useRoute<ChatRouteProp>();
  const navigation = useNavigation();
  const { userId: receiverId, firstName, lastName, imageUrl } = route.params;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const url = `https://ef5a-118-103-143-2.ngrok-free.app/CHATMICROSERVICE/api/chat/messages?senderId=${encodeURIComponent(
        user.id
      )}&receiverId=${encodeURIComponent(receiverId)}`;

      console.log('Fetching messages from:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching messages: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    if (!user?.id) {
      console.warn('No logged in user ID');
      return;
    }

    try {
      const url =
        'https://ef5a-118-103-143-2.ngrok-free.app/CHATMICROSERVICE/api/chat/messages';

      const body = {
        senderId: user.id,
        receiverId,
        content: message,
      };

      console.log('Sending message:', body);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer sk_test_PDfTXQjaEv6z4ZF1xskpztog2mRXsegitn9L6HXeKn',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error sending message: ${response.status}`);
      }

      setMessage('');
      await fetchMessages(); // Refresh messages after sending
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]} />
        )}
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
      </View>

      {loading ? (
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>
          Loading messages...
        </Text>
      ) : (
        <FlatList
          style={styles.chatContainer}
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Text
              style={[
                styles.message,
                item.senderId === user.id
                  ? styles.myMessage
                  : styles.theirMessage,
              ]}
            >
              {item.content}
            </Text>
          )}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.navItem}
        onPress={() => navigation.navigate('UserProfileScreen' as never)}>
          <Icon name="person" size={24} color="#8A2BE2" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 40,
    flex: 1,
    padding: 20,
    paddingBottom: 100, // prevent bottom nav overlap
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    marginVertical: 10,
  },
  message: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  sendButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#8A2BE2',
    borderRadius: 8,
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
});
