

// import { useAuth } from '@clerk/clerk-expo'; // 👈 Import Clerk Auth
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useState } from 'react';
// import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

// type RootStackParamList = {
//   PreferenceScreen: { profileData: { clerkUserId: string; gender: string; dob: string } };
// };

// type PreferenceData = {
//   location: string;
//   minAge: string;
//   maxAge: string;
//   interest: string;
// };

// export default function PreferenceScreen() {
//   const route = useRoute<RouteProp<RootStackParamList, 'PreferenceScreen'>>();
//   const { profileData } = route.params;
//   const { getToken } = useAuth(); // 👈 Access getToken from Clerk
//   const navigation = useNavigation(); // 👈 Get navigation object

//   const [preferenceData, setPreferenceData] = useState<PreferenceData>({
//     location: '',
//     minAge: '',
//     maxAge: '',
//     interest: ''
//   });

//   const handleSubmit = async () => {
//     try {
//       if (!preferenceData.location || !preferenceData.minAge || !preferenceData.maxAge || !preferenceData.interest) {
//         Alert.alert('Error', 'Please fill all fields');
//         return;
//       }

//       const payload = {
//         clerkUserId: profileData.clerkUserId,
//         gender: profileData.gender,
//         location: preferenceData.location,
//         minAge: parseInt(preferenceData.minAge),
//         maxAge: parseInt(preferenceData.maxAge),
//         interest: preferenceData.interest
//       };

//       console.log('Submitting preferences:', payload);

//       const token = await getToken(); // 👈 Retrieve the Clerk token
//       console.log('Clerk token:', token);

//       const response = await fetch('http://10.9.92.164:8765/USERMICROSERVICE/api/interests', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, // 👈 Use token here
//         },
//         body: JSON.stringify(payload),
//       });

// //       const response = await fetch('http://10.9.92.164:8765/USERMICROSERVICE/api/interests', {
// //   method: 'POST',
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Authorization': `Bearer ${token}`,
// //   },
// //   body: JSON.stringify(payload),
// // });


//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       Alert.alert('Success', 'Preferences saved successfully!');
//       // Optionally navigate
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert('Error', 'Failed to save preferences');
//     }

//     // Navigate to MatchScreen after success
//       navigation.navigate('MatchScreen' as never);
//   };

//   const handleChange = (field: keyof PreferenceData, value: string) => {
//     setPreferenceData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Likes, Interests</Text>
//         <Text style={styles.subtitle}>Select age and location for match fixing</Text>

//         <Text style={styles.label}>Minimum expected age of the partner</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter minimum age"
//           keyboardType="numeric"
//           value={preferenceData.minAge}
//           onChangeText={(text) => handleChange('minAge', text)}
//         />

//         <Text style={styles.label}>Maximum expected age of the partner</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter maximum age"
//           keyboardType="numeric"
//           value={preferenceData.maxAge}
//           onChangeText={(text) => handleChange('maxAge', text)}
//         />

//         <Text style={styles.label}>Your location</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your location"
//           value={preferenceData.location}
//           onChangeText={(text) => handleChange('location', text)}
//         />

//         <Text style={styles.label}>Interests</Text>
//         <TextInput
//           style={[styles.input, { height: 100 }]}
//           placeholder="Enter your interests (comma separated)"
//           multiline
//           value={preferenceData.interest}
//           onChangeText={(text) => handleChange('interest', text)}
//         />

//         <TouchableOpacity
//           style={styles.continueButton}
//           onPress={handleSubmit}
//           disabled={!preferenceData.location || !preferenceData.minAge || !preferenceData.maxAge || !preferenceData.interest}
//         >
//           <LinearGradient
//             colors={['#8A2BE2', '#FF1493']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.gradient}
//           >
//             <Text style={styles.continueButtonText}>Submit</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // Add StyleSheet definition for styles
// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   formContainer: {
//     padding: 20,
//     marginTop: 80,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 30,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     marginTop: 16,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 40,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   continueButton: {
//     borderRadius: 25,
//     overflow: 'hidden',
//     marginTop: 30,
//     width: 180,
//     alignSelf: 'center',
//   },
//   gradient: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   continueButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

import { useAuth } from '@clerk/clerk-expo';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  PreferenceScreen: { profileData: { clerkUserId: string; gender: string; dob: string } };
};

type PreferenceData = {
  location: string;
  minAge: string;
  maxAge: string;
  interest: string;
};

export default function PreferenceScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'PreferenceScreen'>>();
  const { profileData } = route.params;
  const { getToken } = useAuth();
  const navigation = useNavigation();

  const [preferenceData, setPreferenceData] = useState<PreferenceData>({
    location: '',
    minAge: '',
    maxAge: '',
    interest: ''
  });

  const handleChange = (field: keyof PreferenceData, value: string) => {
    setPreferenceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const { location, minAge, maxAge, interest } = preferenceData;
      if (!location || !minAge || !maxAge || !interest) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }

      const payload = {
        clerkUserId: profileData.clerkUserId,
        gender: profileData.gender,
        location,
        minAge: parseInt(minAge),
        maxAge: parseInt(maxAge),
        interest
      };

      const token = await getToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(
        'https://ef5a-118-103-143-2.ngrok-free.app/USERMICROSERVICE/api/interests',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error('Backend error:', errText);
        throw new Error('Failed to save preferences');
      }

      Alert.alert('Success', 'Preferences saved successfully!');
      navigation.navigate('MatchScreen' as never); // Navigate on success
    } catch (error: any) {
      console.error('Error saving preferences:', error.message || error);
      Alert.alert('Error', 'Failed to save preferences. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Likes, Interests</Text>
        <Text style={styles.subtitle}>Select age and location for match fixing</Text>

        <Text style={styles.label}>Minimum expected age of the partner</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter minimum age"
          keyboardType="numeric"
          value={preferenceData.minAge}
          onChangeText={(text) => handleChange('minAge', text)}
        />

        <Text style={styles.label}>Maximum expected age of the partner</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter maximum age"
          keyboardType="numeric"
          value={preferenceData.maxAge}
          onChangeText={(text) => handleChange('maxAge', text)}
        />

        <Text style={styles.label}>Your location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your location"
          value={preferenceData.location}
          onChangeText={(text) => handleChange('location', text)}
        />

        <Text style={styles.label}>Interests</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter your interests (comma separated)"
          multiline
          value={preferenceData.interest}
          onChangeText={(text) => handleChange('interest', text)}
        />

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleSubmit}
          disabled={!preferenceData.location || !preferenceData.minAge || !preferenceData.maxAge || !preferenceData.interest}
        >
          <LinearGradient
            colors={['#8A2BE2', '#FF1493']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.continueButtonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
    marginTop: 80,
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 40,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  continueButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 30,
    width: 180,
    alignSelf: 'center',
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
