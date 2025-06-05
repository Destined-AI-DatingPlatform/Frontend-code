

// import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Image,
//   Modal,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// type RootStackParamList = {
//   RecommendedUserProfileScreen: {
//     userId: string;
//     userDetails: {
//       first_name: string;
//       last_name: string;
//       image_url: string;
//     };
//   };
//   ChatScreen: {
//     userId: string;
//     firstName: string;
//     lastName: string;
//     imageUrl: string;
//   };
//   MatchScreen: undefined;
//   UserProfileScreen: undefined;
// };

// type ProfileScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'RecommendedUserProfileScreen'
// >;

// type UserInterestsResponse = {
//   location: string;
//   interestList: string[];
// };

// export default function RecommendedUserProfileScreen() {
//   const route = useRoute<ProfileScreenRouteProp>();
//   const navigation = useNavigation<
//     import('@react-navigation/native').NavigationProp<RootStackParamList>
//   >();

//   const { userId, userDetails } = route.params;

//   // TODO: Replace this with actual logged-in user ID from your auth logic
//   const loggedInUserId = 'user_abc123';

//   const [interestsData, setInterestsData] = useState<UserInterestsResponse | null>(
//     null
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Report modal state
//   const [reportModalVisible, setReportModalVisible] = useState(false);
//   const [reportDescription, setReportDescription] = useState('');

//   useEffect(() => {
//     if (!userId) return;

//     const fetchUserInterests = async () => {
//       try {
//         const apiUrl = `https://ef5a-118-103-143-2.ngrok-free.app/USERMICROSERVICE/api/interests/${userId}`;
//         const response = await fetch(apiUrl);
//         if (!response.ok)
//           throw new Error(`Failed to fetch interests: ${response.status}`);
//         const data: UserInterestsResponse = await response.json();
//         setInterestsData(data);
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserInterests();
//   }, [userId]);

//   // Handler to send report
//   const handleSendReport = async () => {
//     if (!reportDescription.trim()) {
//       alert('Please enter a reason for reporting.');
//       return;
//     }

//     try {
//       const response = await fetch(
//         'https://ef5a-118-103-143-2.ngrok-free.app/USERMICROSERVICE/api/report',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             reporterUserId: loggedInUserId,
//             reportedUserId: userId,
//             reportReason: reportDescription.trim(),
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errText = await response.text();
//         throw new Error(`Error reporting user: ${errText}`);
//       }

//       alert('Report sent successfully!');
//       setReportModalVisible(false);
//       setReportDescription('');
//     } catch (error) {
//       alert(error instanceof Error ? error.message : 'Failed to send report');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Icon name="arrow-back" size={24} color="#4B0082" />
//       </TouchableOpacity>

//       <Text style={styles.username}>User Profile</Text>

//       {/* Profile Image */}
//       <Image source={{ uri: userDetails.image_url }} style={styles.avatar} />

//       {/* User Name */}
//       <Text style={styles.username}>
//         {userDetails.first_name} {userDetails.last_name}
//       </Text>

//       {/* Chat Button */}
//       <TouchableOpacity
//         style={styles.editButton}
//         onPress={() =>
//           navigation.navigate('ChatScreen', {
//             userId,
//             firstName: userDetails.first_name,
//             lastName: userDetails.last_name,
//             imageUrl: userDetails.image_url,
//           } as any)
//         }
//       >
//         <Text style={styles.editButtonText}>CHAT</Text>
//       </TouchableOpacity>

//       {/* Report Button */}
//       <TouchableOpacity
//         style={styles.reportButton}
//         onPress={() => setReportModalVisible(true)}
//       >
//         <Text style={styles.reportButtonText}>REPORT</Text>
//       </TouchableOpacity>

//       {/* User ID */}
//       <View style={styles.bioSection}>
//         <Text style={styles.bioLabel}>User ID</Text>
//         <Text style={styles.bioText}>{userId}</Text>
//       </View>

//       {/* Interests */}
//       <View style={styles.interestsSection}>
//         <Text style={styles.interestsLabel}>Interests</Text>
//         {loading ? (
//           <ActivityIndicator size="small" color="#8A2BE2" />
//         ) : error ? (
//           <Text style={styles.errorText}>{error}</Text>
//         ) : (
//           <View style={styles.interestsList}>
//             {interestsData?.interestList.map((interest, idx) => (
//               <View key={idx} style={styles.interestItem}>
//                 {interest.toLowerCase().includes('music') ? (
//                   <FontAwesome5 name="music" size={16} color="#4B0082" />
//                 ) : interest.toLowerCase().includes('swimming') ? (
//                   <MaterialCommunityIcons name="swim" size={18} color="#4B0082" />
//                 ) : (
//                   <Icon name="star" size={16} color="#4B0082" />
//                 )}
//                 <Text style={styles.interestText}>{interest}</Text>
//               </View>
//             ))}
//           </View>
//         )}
//       </View>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate('MatchScreen' as never)}
//         >
//           <Icon name="heart" size={24} color="#8A2BE2" />
//           <Text style={styles.navText}>Matches</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate('UserProfileScreen' as never)}
//         >
//           <Icon name="person" size={24} color="#8A2BE2" />
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Report Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={reportModalVisible}
//         onRequestClose={() => setReportModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Report User</Text>
//             <TextInput
//               style={styles.reportInput}
//               multiline
//               placeholder="Describe the reason for reporting..."
//               value={reportDescription}
//               onChangeText={setReportDescription}
//             />
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => {
//                   setReportModalVisible(false);
//                   setReportDescription('');
//                 }}
//               >
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.sendButton]}
//                 onPress={handleSendReport}
//               >
//                 <Text style={[styles.modalButtonText, { color: '#fff' }]}>
//                   Send
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     flex: 1,
//     backgroundColor: '#fdfdff',
//     paddingTop: 60,
//     alignItems: 'center',
//     paddingBottom: 80,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   username: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2e003e',
//   },
//   editButton: {
//     backgroundColor: '#E0D4FD',
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     borderRadius: 12,
//     marginTop: 8,
//     marginBottom: 10,
//   },
//   editButtonText: {
//     fontWeight: '700',
//     color: '#4B0082',
//     fontSize: 12,
//   },
//   reportButton: {
//     backgroundColor: '#FF3B30', // bright red
//     paddingVertical: 6,
//     paddingHorizontal: 18,
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   reportButtonText: {
//     fontWeight: '700',
//     color: '#fff',
//     fontSize: 14,
//   },
//   bioSection: {
//     width: '80%',
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   bioLabel: {
//     fontWeight: 'bold',
//     color: '#4B0082',
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   bioText: {
//     color: '#555',
//     fontSize: 14,
//   },
//   interestsSection: {
//     width: '80%',
//     alignItems: 'flex-start',
//   },
//   interestsLabel: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#4B0082',
//     marginBottom: 10,
//   },
//   interestsList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//   },
//   interestItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//     marginBottom: 8,
//     backgroundColor: '#F1EDFF',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   interestText: {
//     marginLeft: 6,
//     color: '#4B0082',
//     fontSize: 14,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     height: 60,
//     borderTopWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   navItem: {
//     alignItems: 'center',
//   },
//   navText: {
//     fontSize: 12,
//     color: '#8A2BE2',
//     marginTop: 2,
//   },

//   // Modal styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '85%',
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#4B0082',
//   },
//   reportInput: {
//     height: 100,
//     borderColor: '#8A2BE2',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     textAlignVertical: 'top',
//     marginBottom: 20,
//     fontSize: 14,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   modalButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     marginLeft: 10,
//   },
//   cancelButton: {
//     backgroundColor: '#ccc',
//   },
//   sendButton: {
//     backgroundColor: '#8A2BE2',
//   },
//   modalButtonText: {
//     fontWeight: '600',
//     fontSize: 14,
//   },
// });




import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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

type RootStackParamList = {
  RecommendedUserProfileScreen: {
    userId: string;
    userDetails: {
      first_name: string;
      last_name: string;
      image_url: string;
    };
  };
  ChatScreen: {
    userId: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
  MatchScreen: undefined;
  UserProfileScreen: undefined;
};

type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'RecommendedUserProfileScreen'
>;

type UserInterestsResponse = {
  location: string;
  interestList: string[];
};

export default function RecommendedUserProfileScreen() {
  const route = useRoute<ProfileScreenRouteProp>();
  const navigation = useNavigation<
    import('@react-navigation/native').NavigationProp<RootStackParamList>
  >();

  const { userId, userDetails } = route.params;
  const loggedInUserId = 'user_abc123';

  const [interestsData, setInterestsData] = useState<UserInterestsResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportDescription, setReportDescription] = useState('');

  useEffect(() => {
    if (!userId) return;

    const fetchUserInterests = async () => {
      try {
        const apiUrl = `https://ef5a-118-103-143-2.ngrok-free.app/USERMICROSERVICE/api/interests/${userId}`;
        const response = await fetch(apiUrl);
        if (!response.ok)
          throw new Error(`Failed to fetch interests: ${response.status}`);
        const data: UserInterestsResponse = await response.json();
        setInterestsData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInterests();
  }, [userId]);

  const handleSendReport = async () => {
    if (!reportDescription.trim()) {
      alert('Please enter a reason for reporting.');
      return;
    }

    try {
      const response = await fetch(
        'https://ef5a-118-103-143-2.ngrok-free.app/USERMICROSERVICE/api/report',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reporterUserId: loggedInUserId,
            reportedUserId: userId,
            reportReason: reportDescription.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error reporting user: ${errText}`);
      }

      alert('Report sent successfully!');
      setReportModalVisible(false);
      setReportDescription('');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to send report');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#4B0082" />
      </TouchableOpacity>

      <Text style={styles.username}>User Profile</Text>

      {/* Profile Image */}
      <Image source={{ uri: userDetails.image_url }} style={styles.avatar} />

      {/* User Name */}
      <Text style={styles.username}>
        {userDetails.first_name} {userDetails.last_name}
      </Text>

      {/* Chat Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate('ChatScreen', {
            userId,
            firstName: userDetails.first_name,
            lastName: userDetails.last_name,
            imageUrl: userDetails.image_url,
          } as any)
        }
      >
        <Text style={styles.editButtonText}>CHAT</Text>
      </TouchableOpacity>

      {/* Report Button */}
      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => setReportModalVisible(true)}
      >
        <Text style={styles.reportButtonText}>REPORT</Text>
      </TouchableOpacity>

      {/* User ID */}
      <View style={styles.bioSection}>
        <Text style={styles.bioLabel}>User ID</Text>
        <Text style={styles.bioText}>{userId}</Text>
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

      {/* Report Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={() => setReportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Report User</Text>
            <TextInput
              style={styles.reportInput}
              multiline
              placeholder="Describe the reason for reporting..."
              value={reportDescription}
              onChangeText={setReportDescription}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setReportModalVisible(false);
                  setReportDescription('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.sendButton]}
                onPress={handleSendReport}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>
                  Send
                </Text>
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
    marginBottom: 10,
  },
  editButtonText: {
    fontWeight: '700',
    color: '#4B0082',
    fontSize: 12,
  },
  reportButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  reportButtonText: {
    fontWeight: '700',
    color: '#fff',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4B0082',
  },
  reportInput: {
    height: 100,
    borderColor: '#8A2BE2',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  sendButton: {
    backgroundColor: '#8A2BE2',
  },
  modalButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
});
