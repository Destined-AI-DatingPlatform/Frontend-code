// import { useUser } from '@clerk/clerk-expo';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import React from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import SignOutButton from './components/SignOutButton';

// type RootStackParamList = {
//   ProfileScreen: undefined;
//   PreferenceScreen: undefined;
// };

// export default function ProfileScreen() {
//   const { user } = useUser();
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();


//   return (
//     <View style={styles.container}>
//       <View style={styles.signOutContainer}>
//         <SignOutButton />
//       </View>
      
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Profile Details</Text>
//         <Text style={styles.subtitle}>Fill up the following details</Text>
        
//         <Text style={styles.label}>First Name</Text>
//         <TextInput 
//           style={styles.input} 
//           value={user?.firstName || ''}
//           editable={false}
//         />
        
//         <Text style={styles.label}>Last Name</Text>
//         <TextInput 
//           style={styles.input} 
//           value={user?.lastName || ''}
//           editable={false}
//         />
        
//         <Text style={styles.label}>DOB</Text>
//         <TextInput 
//           style={styles.input} 
//           placeholder="Select Date"
//         />
        
//         <Text style={styles.label}>Select Gender</Text>
//         <TextInput 
//           style={styles.input} 
//           placeholder="Select Gender"
//         />
        
//         <TouchableOpacity 
//         onPress={() => navigation.navigate('PreferenceScreen')}
//         style={styles.continueButton}>
//           <LinearGradient
//             colors={['#8A2BE2', '#FF1493']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.gradient}
//           >
//             <Text style={styles.continueButtonText}>Continue</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   signOutContainer: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
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
//     borderRadius: 40, // Increased border radius for more curve
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   continueButton: {
//   borderRadius: 25,      // bigger radius for a pill-shaped button
//   overflow: 'hidden',
//   marginTop: 30,
//   width: 180,            // reduce width (adjust as you like)
//   alignSelf: 'center',   // center the button horizontally
// },
// gradient: {
//   paddingVertical: 12,   // smaller vertical padding for a smaller height
//   paddingHorizontal: 20, // horizontal padding for button content spacing
//   alignItems: 'center',
//   justifyContent: 'center',
// },

//   continueButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });




// import { useUser } from '@clerk/clerk-expo';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import SignOutButton from './components/SignOutButton';

// type RootStackParamList = {
//   ProfileScreen: undefined;
//   PreferenceScreen: { profileData: ProfileData };
// };

// type ProfileData = {
//   clerkUserId: string;
//   gender: string;
//   dob: string;
// };

// export default function ProfileScreen() {
//   const { user } = useUser();
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const [gender, setGender] = useState('');
//   const [dob, setDob] = useState('');

//   const handleContinue = () => {
//     if (!user?.id) return;
    
//     const profileData = {
//       clerkUserId: user.id,
//       gender,
//       dob,
//     };
    
//     navigation.navigate('PreferenceScreen', { profileData });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.signOutContainer}>
//         <SignOutButton />
//       </View>
      
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Profile Details</Text>
//         <Text style={styles.subtitle}>Fill up the following details</Text>
        
//         <Text style={styles.label}>First Name</Text>
//         <TextInput 
//           style={styles.input} 
//           value={user?.firstName || ''}
//           editable={false}
//         />
        
//         <Text style={styles.label}>Last Name</Text>
//         <TextInput 
//           style={styles.input} 
//           value={user?.lastName || ''}
//           editable={false}
//         />
//         <Text style={styles.label}>DOB</Text>
//         <TextInput 
//           style={styles.input} 
//           placeholder="Select Date"
//           value={dob}
//           onChangeText={setDob}
//         />
        
//         <Text style={styles.label}>Select Gender</Text>
//         <TextInput 
//           style={styles.input} 
//           placeholder="Select Gender"
//           value={gender}
//           onChangeText={setGender}
//         />
        
        
//         <TouchableOpacity 
//           onPress={handleContinue}
//           style={styles.continueButton}
//           // disabled={!gender || !dob}
//         >
//           <LinearGradient
//             colors={['#8A2BE2', '#FF1493']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.gradient}
//           >
//             <Text style={styles.continueButtonText}>Continue</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // ... keep your existing styles ...


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   signOutContainer: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
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
//     borderRadius: 40, // Increased border radius for more curve
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   continueButton: {
//   borderRadius: 25,      // bigger radius for a pill-shaped button
//   overflow: 'hidden',
//   marginTop: 30,
//   width: 180,            // reduce width (adjust as you like)
//   alignSelf: 'center',   // center the button horizontally
// },
// gradient: {
//   paddingVertical: 12,   // smaller vertical padding for a smaller height
//   paddingHorizontal: 20, // horizontal padding for button content spacing
//   alignItems: 'center',
//   justifyContent: 'center',
// },

//   continueButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


import { useUser } from '@clerk/clerk-expo';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SignOutButton from './components/SignOutButton';

type RootStackParamList = {
  ProfileScreen: undefined;
  PreferenceScreen: { profileData: ProfileData };
};

type ProfileData = {
  clerkUserId: string;
  gender: string;
};

export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [gender, setGender] = useState('');

  const handleContinue = () => {
    if (!user?.id) return;
    
    const profileData = {
      clerkUserId: user.id,
      gender,
    };
    
    navigation.navigate('PreferenceScreen', { profileData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.signOutContainer}>
        <SignOutButton />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Profile Details</Text>
        <Text style={styles.subtitle}>Fill up the following details</Text>
        
        <Text style={styles.label}>First Name</Text>
        <TextInput 
          style={styles.input} 
          value={user?.firstName || ''}
          editable={false}
        />
        
        <Text style={styles.label}>Last Name</Text>
        <TextInput 
          style={styles.input} 
          value={user?.lastName || ''}
          editable={false}
        />
        
        <Text style={styles.label}>Select Gender</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Select Gender"
          value={gender}
          onChangeText={setGender}
        />
        
        <TouchableOpacity 
          onPress={handleContinue}
          style={styles.continueButton}
          // disabled={!gender}
        >
          <LinearGradient
            colors={['#8A2BE2', '#FF1493']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
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
  signOutContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
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