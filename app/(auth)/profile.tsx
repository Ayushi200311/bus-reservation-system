// // import { useRouter } from 'expo-router';
// // import React from 'react';
// // import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import { COLORS, SIZES } from '../constants/theme';

// // export default function Profile() {
// //   const router = useRouter();

// //   return (
// //     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => router.back()}>
// //           <Icon name="arrow-back" size={26} color={COLORS.text} />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>My Profile</Text>
// //         <View style={{ width: 26 }} />
// //       </View>

// //       {/* Profile Card */}
// //       <View style={styles.profileCard}>
// //         <View style={styles.imageWrap}>
// //           <Image
// //             source={{ uri: 'https://i.pravatar.cc/300' }}
// //             style={styles.avatar}
// //           />
// //           <TouchableOpacity style={styles.cameraBtn}>
// //             <Icon name="photo-camera" size={18} color="#fff" />
// //           </TouchableOpacity>
// //         </View>

// //         <ProfileItem label="User Name" value="Robbus Yaman" />
// //         <ProfileItem label="Email Address" value="demo@gmail.com" />
// //         <ProfileItem label="Phone Number" value="+1234 567 890" />
// //         <ProfileItem label="Address" value="Washington DC, US" />
// //         <ProfileItem label="Lifetime Insurance" value="Yes" />

// //         <TouchableOpacity style={styles.updateBtn}>
// //           <Text style={styles.updateText}>Update Profile</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // function ProfileItem({label, value }: {label: string; value: string}) {
// //   return (
// //     <View style={styles.item}>
// //       <Text style={styles.itemLabel}>{label}</Text>
// //       <Text style={styles.itemValue}>{value}</Text>
// //     </View>
// //   );
// // }


// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: COLORS.background,
// //     padding: 20,
// //   },

// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginTop: 30,
// //     marginBottom: 20,
// //   },

// //   headerTitle: {
// //     color: COLORS.text,
// //     fontSize: 18,
// //     fontWeight: '700',
// //   },

// //   profileCard: {
// //     backgroundColor: COLORS.card,
// //     borderRadius: SIZES.radius,
// //     padding: 20,
// //   },

// //   imageWrap: {
// //     alignItems: 'center',
// //     marginBottom: 25,
// //   },

// //   avatar: {
// //     width: 120,
// //     height: 120,
// //     borderRadius: 60,
// //     borderWidth: 3,
// //     borderColor: COLORS.primary,
// //   },

// //   cameraBtn: {
// //     position: 'absolute',
// //     bottom: 6,
// //     right: 130 / 4,
// //     backgroundColor: COLORS.primary,
// //     width: 36,
// //     height: 36,
// //     borderRadius: 18,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },

// //   item: {
// //     backgroundColor: COLORS.background,
// //     borderRadius: SIZES.radius,
// //     padding: 16,
// //     marginBottom: 14,
// //   },

// //   itemLabel: {
// //     color: COLORS.muted,
// //     fontSize: 12,
// //     marginBottom: 4,
// //   },

// //   itemValue: {
// //     color: COLORS.text,
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },

// //   updateBtn: {
// //     backgroundColor: COLORS.primary,
// //     paddingVertical: 16,
// //     borderRadius: SIZES.radius,
// //     marginTop: 20,
// //   },

// //   updateText: {
// //     color: '#fff',
// //     textAlign: 'center',
// //     fontSize: 16,
// //     fontWeight: '700',
// //   },
// // });




// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { COLORS, SIZES } from '../constants/theme';

// // Define URL locally
// const API_BASE_URL = 'http://192.168.104.252:3000'; 

// export default function Profile() {
//   const router = useRouter();
  
//   // 1. STATE MANAGEMENT
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false); 
  
//   // User Data State
//   const [phone, setPhone] = useState(''); 
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
  
//   // NEW FIELDS
//   const [gender, setGender] = useState('Male'); // Default
//   const [insurance, setInsurance] = useState('No'); // Default

//   // 2. FETCH DATA ON LOAD
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const storedPhone = await AsyncStorage.getItem('userPhone');
        
//         if (!storedPhone) {
//           console.log("No user logged in");
//           setLoading(false);
//           return;
//         }

//         setPhone(storedPhone);

//         const response = await fetch(`${API_BASE_URL}/profile?phone=${storedPhone}`);
//         const data = await response.json();

//         if (response.ok) {
//           setName(data.name || '');
//           setEmail(data.email || '');
//           // Load Gender and Insurance from DB, fallback to defaults if null
//           setGender(data.gender || 'Male');
//           setInsurance(data.insurance || 'No');
//         }
//       } catch (error) {
//         console.error("Profile Fetch Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // 3. HANDLE UPDATE
//   const handleUpdate = async () => {
//     if (!name || !email) {
//       Alert.alert("Missing Info", "Name and Email are required");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/update-profile`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           phone: phone,
//           name: name,
//           email: email,
//           gender: gender,     // Sending new field
//           insurance: insurance // Sending new field
//         })
//       });

//       const result = await response.json();

//       if (response.ok) {
//         Alert.alert("Success", "Profile Updated Successfully!");
//         setIsEditing(false);
//       } else {
//         Alert.alert("Error", result.error || "Update failed");
//       }
//     } catch (error) {
//       console.error("Update Error:", error);
//       Alert.alert("Error", "Could not connect to server");
//     }
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Icon name="arrow-back" size={26} color={COLORS.text} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My Profile</Text>
//         <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
//           <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>
//             {isEditing ? "Cancel" : "Edit"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Profile Card */}
//       <View style={styles.profileCard}>
//         <View style={styles.imageWrap}>
//           <Image
//             source={{ uri: 'https://i.pravatar.cc/300' }}
//             style={styles.avatar}
//           />
//           <TouchableOpacity style={styles.cameraBtn}>
//             <Icon name="photo-camera" size={18} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         {/* --- FORM FIELDS --- */}
        
//         <ProfileInput 
//           label="Full Name" 
//           value={name} 
//           onChangeText={setName} 
//           editable={isEditing} 
//           icon="person"
//         />

//         <ProfileInput 
//           label="Phone Number" 
//           value={phone} 
//           onChangeText={() => {}} 
//           editable={false} 
//           icon="phone"
//         />

//         <ProfileInput 
//           label="Email Address" 
//           value={email} 
//           onChangeText={setEmail} 
//           editable={isEditing} 
//           icon="email"
//           keyboardType="email-address"
//         />

//         {/* --- GENDER SELECTION --- */}
//         <View style={styles.item}>
//           <Text style={styles.itemLabel}>Gender</Text>
//           <View style={{ flexDirection: 'row', marginTop: 5 }}>
//             <TouchableOpacity 
//               style={[
//                 styles.genderBtn, 
//                 gender === 'Male' ? styles.genderBtnActive : {},
//                 !isEditing && { opacity: 0.7 }
//               ]}
//               disabled={!isEditing}
//               onPress={() => setGender('Male')}
//             >
//               <Text style={[styles.genderText, gender === 'Male' ? {color:'#fff'} : {}]}>Male</Text>
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={[
//                 styles.genderBtn, 
//                 gender === 'Female' ? styles.genderBtnActive : {},
//                 !isEditing && { opacity: 0.7 }
//               ]}
//               disabled={!isEditing}
//               onPress={() => setGender('Female')}
//             >
//               <Text style={[styles.genderText, gender === 'Female' ? {color:'#fff'} : {}]}>Female</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* --- INSURANCE (Read Only / Display) --- */}
//         <View style={styles.item}>
//            <Text style={styles.itemLabel}>Insurance Status</Text>
//            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//              <Icon name="security" size={20} color={COLORS.muted} style={{ marginRight: 10 }} />
//              <Text style={[styles.itemValue, { color: insurance === 'Yes' ? '#4CAF50' : '#aaa' }]}>
//                {insurance === 'Yes' ? 'Active' : 'Not Insured'}
//              </Text>
//            </View>
//         </View>

//         {/* Save Button */}
//         {isEditing && (
//           <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
//             <Text style={styles.updateText}>Save Changes</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// // Reusable Input Component
// function ProfileInput({ label, value, onChangeText, editable, icon, keyboardType }: any) {
//   return (
//     <View style={[styles.item, !editable && { opacity: 0.7 }]}>
//       <Text style={styles.itemLabel}>{label}</Text>
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Icon name={icon} size={20} color={COLORS.muted} style={{ marginRight: 10 }} />
//         <TextInput
//           style={[styles.itemValue, { flex: 1, color: editable ? '#fff' : '#aaa' }]}
//           value={value}
//           onChangeText={onChangeText}
//           editable={editable}
//           placeholder={editable ? `Enter ${label}` : "Not set"}
//           placeholderTextColor="#444"
//           keyboardType={keyboardType || 'default'}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background, 
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 30,
//     marginBottom: 20,
//   },
//   headerTitle: {
//     color: COLORS.text, 
//     fontSize: 18,
//     fontWeight: '700',
//   },
//   profileCard: {
//     backgroundColor: COLORS.card, 
//     borderRadius: SIZES.radius,
//     padding: 20,
//   },
//   imageWrap: {
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 3,
//     borderColor: COLORS.primary, 
//   },
//   cameraBtn: {
//     position: 'absolute',
//     bottom: 6,
//     right: 35, 
//     backgroundColor: COLORS.primary,
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   item: {
//     backgroundColor: COLORS.background, 
//     borderRadius: SIZES.radius,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: '#222',
//   },
//   itemLabel: {
//     color: COLORS.muted, 
//     fontSize: 12,
//     marginBottom: 8,
//   },
//   itemValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     padding: 0, 
//   },
//   // Gender Styles
//   genderBtn: {
//     flex: 1,
//     paddingVertical: 10,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 8,
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   genderBtnActive: {
//     backgroundColor: COLORS.primary,
//     borderColor: COLORS.primary,
//   },
//   genderText: {
//     color: '#666',
//     fontWeight: '600',
//   },
//   updateBtn: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 16,
//     borderRadius: SIZES.radius,
//     marginTop: 20,
//   },
//   updateText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '700',
//   },
// });



import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../constants/theme';

// ✅ Define API URL
const API_BASE_URL = 'http://172.24.149.252:3000'; 

export default function Profile() {
  const router = useRouter();
  
  // 1. STATE MANAGEMENT
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); 
  
  // User Data State
  const [phone, setPhone] = useState(''); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male'); // Default
  const [insurance, setInsurance] = useState('No'); // Default

  // 2. FETCH DATA FROM DATABASE ON LOAD
 // 2. FETCH DATA FROM DATABASE ON LOAD (DEBUG VERSION)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedPhone = await AsyncStorage.getItem('userPhone');
        
        if (!storedPhone) {
          console.log("No user logged in");
          setLoading(false);
          return;
        }

        setPhone(storedPhone);
        console.log("Fetching profile for:", storedPhone);
        console.log("URL:", `${API_BASE_URL}/profile?phone=${storedPhone}`);

        const response = await fetch(`${API_BASE_URL}/profile?phone=${storedPhone}`);
        
        // --- DEBUGGING START ---
        const text = await response.text(); // Get raw text first
        console.log("Raw Server Response:", text); // See what the server actually sent

        try {
          const data = JSON.parse(text); // Try to parse it manually
          if (response.ok) {
            setName(data.name || ''); 
            setEmail(data.email || '');
            setGender(data.gender || 'Male');
            setInsurance(data.insurance || 'No');
          } else {
             console.error("Server Error:", data.error);
          }
        } catch (jsonError) {
          console.error("CRITICAL ERROR: Server returned HTML, not JSON.");
          console.error("Did you restart the backend?");
        }
        // --- DEBUGGING END ---

      } catch (error) {
        console.error("Profile Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  // 3. HANDLE SAVE / UPDATE
  const handleUpdate = async () => {
    if (!name || !email) {
      Alert.alert("Missing Info", "Name and Email are required");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/update-profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone,
          name: name,
          email: email,
          gender: gender,
          insurance: insurance
        })
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Profile Updated Successfully!");
        setIsEditing(false);
      } else {
        Alert.alert("Error", result.error || "Update failed");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to server");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>
            {isEditing ? "Cancel" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraBtn}>
            <Icon name="photo-camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* --- FORM FIELDS --- */}
        
        {/* Name (Fetched from Table) */}
        <ProfileInput 
          label="Full Name" 
          value={name} 
          onChangeText={setName} 
          editable={isEditing} 
          icon="person"
        />

        {/* Phone (Read Only - Unique ID) */}
        <ProfileInput 
          label="Phone Number" 
          value={phone} 
          onChangeText={() => {}} 
          editable={false} 
          icon="phone"
        />

        {/* Email (Fetched from Table) */}
        <ProfileInput 
          label="Email Address" 
          value={email} 
          onChangeText={setEmail} 
          editable={isEditing} 
          icon="email"
          keyboardType="email-address"
        />

        {/* --- GENDER SELECTION --- */}
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Gender</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TouchableOpacity 
              style={[
                styles.genderBtn, 
                gender === 'Male' ? styles.genderBtnActive : {},
                !isEditing && { opacity: 0.7 }
              ]}
              disabled={!isEditing}
              onPress={() => setGender('Male')}
            >
              <Text style={[styles.genderText, gender === 'Male' ? {color:'#fff'} : {}]}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.genderBtn, 
                gender === 'Female' ? styles.genderBtnActive : {},
                !isEditing && { opacity: 0.7 }
              ]}
              disabled={!isEditing}
              onPress={() => setGender('Female')}
            >
              <Text style={[styles.genderText, gender === 'Female' ? {color:'#fff'} : {}]}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- INSURANCE STATUS (Read Only) --- */}
        <View style={styles.item}>
           <Text style={styles.itemLabel}>Insurance Status</Text>
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <Icon name="security" size={20} color={COLORS.muted} style={{ marginRight: 10 }} />
             <Text style={[styles.itemValue, { color: insurance === 'Yes' ? '#4CAF50' : '#aaa' }]}>
               {insurance === 'Yes' ? 'Active' : 'Not Insured'}
             </Text>
           </View>
        </View>

        {/* Save Button */}
        {isEditing && (
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

// Reusable Input Component
function ProfileInput({ label, value, onChangeText, editable, icon, keyboardType }: any) {
  return (
    <View style={[styles.item, !editable && { opacity: 0.7 }]}>
      <Text style={styles.itemLabel}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={icon} size={20} color={COLORS.muted} style={{ marginRight: 10 }} />
        <TextInput
          style={[styles.itemValue, { flex: 1, color: editable ? '#fff' : '#aaa' }]}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          placeholder={editable ? `Enter ${label}` : "Not set"}
          placeholderTextColor="#444"
          keyboardType={keyboardType || 'default'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, 
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
  headerTitle: {
    color: COLORS.text, 
    fontSize: 18,
    fontWeight: '700',
  },
  profileCard: {
    backgroundColor: COLORS.card, 
    borderRadius: SIZES.radius,
    padding: 20,
  },
  imageWrap: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.primary, 
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 6,
    right: 35, 
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: COLORS.background, 
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#222',
  },
  itemLabel: {
    color: COLORS.muted, 
    fontSize: 12,
    marginBottom: 8,
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '600',
    padding: 0, 
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  genderBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderText: {
    color: '#666',
    fontWeight: '600',
  },
  updateBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    marginTop: 20,
  },
  updateText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
});