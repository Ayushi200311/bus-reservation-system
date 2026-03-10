// // import { Ionicons } from '@expo/vector-icons';
// // import { useRouter } from 'expo-router';
// // import React, { useState } from 'react';
// // import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// // export default function AddRoute() {
// //   const router = useRouter();
// //   const [source, setSource] = useState('');
// //   const [dest, setDest] = useState('');
// //   const [km, setKm] = useState('');

// //   const handleSave = async () => {
// //     try {
// //       const response = await fetch('http://10.81.83.252:3000/admin/add-route', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ source, destination: dest, distance_km: km })
// //       });
// //       if (response.ok) {
// //         Alert.alert("Success", "Route Created!");
// //         router.back();
// //       }
// //     } catch (e) { Alert.alert("Error", "Network Error"); }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
// //         <Text style={styles.headerTitle}>Create Route</Text>
// //       </View>
// //       <ScrollView contentContainerStyle={{ padding: 20 }}>
// //         <Text style={styles.label}>Source City</Text>
// //         <TextInput style={styles.input} placeholder="From City" placeholderTextColor="#666" value={source} onChangeText={setSource} />

// //         <Text style={styles.label}>Destination City</Text>
// //         <TextInput style={styles.input} placeholder="To City" placeholderTextColor="#666" value={dest} onChangeText={setDest} />

// //         <Text style={styles.label}>Distance (Km)</Text>
// //         <TextInput style={styles.input} placeholder="e.g. 350" placeholderTextColor="#666" keyboardType="numeric" value={km} onChangeText={setKm} />

// //         <TouchableOpacity style={styles.btn} onPress={handleSave}>
// //           <Text style={styles.btnText}>Add Route</Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }
// // // Use same styles as above
// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#000' },
// //   header: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#222' },
// //   headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
// //   label: { color: '#aaa', marginBottom: 8, marginTop: 15 },
// //   input: { backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
// //   btn: { backgroundColor: '#4dffb8', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
// //   btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
// // });







// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// // Ensure you have installed this: npx expo install react-native-picker-select @react-native-picker/picker
// import RNPickerSelect from 'react-native-picker-select';

// export default function AddRoute() {
//   const router = useRouter();
//   const [source, setSource] = useState(null); // Stores the ID of the selected Source City
//   const [dest, setDest] = useState(null);     // Stores the ID of the selected Destination City
//   const [km, setKm] = useState('');
//   const [cities, setCities] = useState([]);

//   // Fetch cities from the MySQL table on component load
//   useEffect(() => {
//     fetchCities();
//   }, []);

//   /**
//    * Fetches city names and IDs from the backend to populate pickers.
//    * This matches your city table structure (id, city_name).
//    */
//   const fetchCities = async () => {
//     try {
//       const response = await fetch('http://10.81.83.252:3000/admin/get-cities');
//       const data = await response.json(); 
      
//       // Transform data for the picker format: { label: 'Ahmedabad', value: 1 }
//       const cityList = data.map((city: any) => ({ 
//         label: city.city_name, 
//         value: city.id 
//       }));
//       setCities(cityList);
//     } catch (e) {
//       console.error("Failed to load cities", e);
//       Alert.alert("Error", "Could not load city list. Check backend connection.");
//     }
//   };

//   /**
//    * Validates inputs and sends the new route data to the backend.
//    */
//   const handleSave = async () => {
//     // 1. Check for empty fields
//     if (!source || !dest || !km) {
//       Alert.alert("Error", "Please fill all fields");
//       return;
//     }

//     // 2. Prevent same Source and Destination
//     if (source === dest) {
//       Alert.alert("Error", "Source and Destination cannot be the same city");
//       return;
//     }

//     try {
//       const response = await fetch('http://10.81.83.252:3000/admin/add-route', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           source_id: source, 
//           destination_id: dest, 
//           distance_km: km 
//         })
//       });
      
//       if (response.ok) {
//         Alert.alert("Success", "Route Created successfully!");
//         router.back();
//       } else {
//         Alert.alert("Error", "Failed to create route. Check server logs.");
//       }
//     } catch (e) { 
//       Alert.alert("Error", "Network Error. Check your IP address/connection."); 
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Create Route</Text>
//       </View>
      
//       <ScrollView contentContainerStyle={{ padding: 20 }}>
//         {/* Source City Picker */}
//         <Text style={styles.label}>Source City</Text>
//         <View style={styles.pickerContainer}>
//           <RNPickerSelect
//             onValueChange={(value) => setSource(value)}
//             items={cities}
//             placeholder={{ label: "Select Source City...", value: null, color: '#666' }}
//             style={pickerSelectStyles}
//             useNativeAndroidPickerStyle={false}
//           />
//         </View>

//         {/* Destination City Picker */}
//         <Text style={styles.label}>Destination City</Text>
//         <View style={styles.pickerContainer}>
//           <RNPickerSelect
//             onValueChange={(value) => setDest(value)}
//             items={cities}
//             placeholder={{ label: "Select Destination City...", value: null, color: '#666' }}
//             style={pickerSelectStyles}
//             useNativeAndroidPickerStyle={false}
//           />
//         </View>

//         {/* Distance Input */}
//         <Text style={styles.label}>Distance (Km)</Text>
//         <TextInput 
//           style={styles.input} 
//           placeholder="e.g. 350" 
//           placeholderTextColor="#666" 
//           keyboardType="numeric" 
//           value={km} 
//           onChangeText={setKm} 
//         />

//         {/* Submit Button */}
//         <TouchableOpacity style={styles.btn} onPress={handleSave}>
//           <Text style={styles.btnText}>Add Route</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// /**
//  * Main UI Styles
//  */
// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#000' 
//   },
//   header: { 
//     flexDirection: 'row', 
//     padding: 20, 
//     alignItems: 'center', 
//     borderBottomWidth: 1, 
//     borderColor: '#222',
//     marginTop: 10
//   },
//   headerTitle: { 
//     color: '#fff', 
//     fontSize: 18, 
//     fontWeight: 'bold', 
//     marginLeft: 15 
//   },
//   label: { 
//     color: '#aaa', 
//     marginBottom: 8, 
//     marginTop: 15,
//     fontSize: 14 
//   },
//   input: { 
//     backgroundColor: '#111', 
//     color: '#fff', 
//     padding: 15, 
//     borderRadius: 8, 
//     borderWidth: 1, 
//     borderColor: '#333' 
//   },
//   pickerContainer: { 
//     backgroundColor: '#111', 
//     borderRadius: 8, 
//     borderWidth: 1, 
//     borderColor: '#333', 
//     overflow: 'hidden',
//     justifyContent: 'center'
//   },
//   btn: { 
//     backgroundColor: '#4dffb8', 
//     padding: 15, 
//     borderRadius: 8, 
//     alignItems: 'center', 
//     marginTop: 30 
//   },
//   btnText: { 
//     color: '#000', 
//     fontWeight: 'bold', 
//     fontSize: 16 
//   }
// });

// /**
//  * Specific styles for the Dropdown items
//  */
// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     color: 'white',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     color: 'white',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   placeholder: {
//     color: '#666',
//   }
// });




import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/theme';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function AddRoute() {
  const router = useRouter();
  const params = useLocalSearchParams(); 
  
  const [source, setSource] = useState(params.source || null);
  const [dest, setDest] = useState(params.destination || null);
  const [km, setKm] = useState(params.distance?.toString() || '');
  const [duration, setDuration] = useState(params.duration?.toString() || '');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/get-cities`);
      const data = await response.json(); 
      const cityList = data.map((city: { id: number; city_name: string }) => ({ label: city.city_name, value: city.city_name }));
      setCities(cityList);
    } catch (e) { console.error(e); }
  };

  const handleSave = async () => {
    if (!source || !dest || !km || !duration) {
      Alert.alert("Wait!", "Please fill all fields.");
      return;
    }

    const isEditing = !!params.route_id;
    const url = isEditing 
      ? `${API_BASE_URL}/admin/update-route/${params.route_id}`
      : `${API_BASE_URL}/admin/add-route`;
    
    try {
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          source, 
          destination: dest, 
          distance: km, 
          duration 
        })
      });
      
      if (response.ok) {
        Alert.alert("Success", "Route saved successfully!");
        router.back();
      } else {
        const errorData = await response.json();
        Alert.alert("Server Error", errorData.error);
      }
    } catch (e) { 
      Alert.alert("Network Error", "Check server connection."); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
          <Text style={styles.headerTitle}>{params.route_id ? "Edit Route" : "Create Route"}</Text>
        </View>
        
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.label}>Source City</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              value={source}
              onValueChange={(value) => setSource(value)}
              items={cities}
              placeholder={{ label: "Select Source...", value: null }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          <Text style={styles.label}>Destination City</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              value={dest}
              onValueChange={(value) => setDest(value)}
              items={cities}
              placeholder={{ label: "Select Destination...", value: null }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          <Text style={styles.label}>Distance (Km)</Text>
          <TextInput style={styles.input} placeholder="e.g. 350" keyboardType="numeric" value={km} onChangeText={setKm} placeholderTextColor="#666" />

          <Text style={styles.label}>Duration (Format: HH:MM)</Text>
          <TextInput style={styles.input} placeholder="e.g. 05:30" value={duration} onChangeText={setDuration} placeholderTextColor="#666" />

          <TouchableOpacity style={styles.btn} onPress={handleSave}>
            <Text style={styles.btnText}>{params.route_id ? "Save Changes" : "Add Route"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  label: { color: '#aaa', marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  pickerContainer: { backgroundColor: '#111', borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  btn: { backgroundColor: '#4dffb8', padding: 18, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { fontSize: 16, padding: 15, color: 'white' },
  inputAndroid: { fontSize: 16, padding: 15, color: 'white' },
});