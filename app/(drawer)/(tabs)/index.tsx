// // import { Picker } from '@react-native-picker/picker';
// // import { useNavigation } from '@react-navigation/native';
// // import { useRouter } from 'expo-router';
// // import React, { useEffect, useState } from 'react';
// // import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// // import DateTimePickerModal from 'react-native-modal-datetime-picker';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import { COLORS, SIZES } from '../../../constants/theme';



// // export default function Home() {
// //   const router = useRouter();
// //   const navigation = useNavigation();
// //  const [cities, setCities] = useState([]);
// //   const [from, setFrom] = useState('');
// //   const [to, setTo] = useState('');
// //   const [date, setDate] = useState('');
// //   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

// //   const showDatePicker = () => setDatePickerVisibility(true);
// //   const hideDatePicker = () => setDatePickerVisibility(false);

// //   // Removed the ': Date' type annotation which causes errors in standard JS files
// //   const handleConfirm = (selectedDate: Date) => {
// //       const formatted = selectedDate.toLocaleDateString();
// //       setDate(formatted);
// //       hideDatePicker();
// //     };
    
// //    useEffect(() => {
// //   const fetchCities = async () => {
// //     try {
// //       // 1. Fetch data
// //       const response = await fetch('http://172.24.149.252:3000/cities');
      
// //       // 2. Check if response is OK (status 200-299)
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
      
// //       // 3. CRITICAL CHECK: Ensure data is actually an array before setting it
// //       if (Array.isArray(data)) {
// //         setCities(data);
// //       } else {
// //         console.error("API returned non-array data:", data);
// //         setCities([]); // Fallback to empty array to prevent crash
// //       }

// //     } catch (err) {
// //       console.error("Error fetching cities:", err);
// //       setCities([]); // Fallback to empty array on error
// //     }
// //   };
// //   fetchCities();
// // }, []);
// //   const handleSearch = () => {
// //     if (!from || !to || !date) {
// //       Alert.alert("Selection Missing", "Please select Source, Destination, and Date");
// //       return;
// //     }
    
// //     router.push({
// //       pathname: '/buslist',
// //       params: { fromCity: from, toCity: to, travelDate: date }
// //     });
// //   };

// //   return (
// //     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => navigation.openDrawer()}>
// //           <Icon name="menu" size={28} color="#fff"/>
// //         </TouchableOpacity>

// //         {/* <TouchableOpacity onPress={() => router.push('../profile')}>
// //           <Image
// //             source={{ uri: 'https://i.pravatar.cc/100' }}
// //             style={styles.avatar}
// //           />
// //         </TouchableOpacity> */}
// //       </View>
      
// //       <View style={styles.card}>
        
// //         <Text style={styles.label}>From</Text>
// //         <View style={styles.inputBox}>
// //           <Picker
// //             selectedValue={from}
// //             onValueChange={(itemValue) => setFrom(itemValue)}
// //             style={{ flex: 1, color: COLORS.text }}
// //             dropdownIconColor={COLORS.primary}
// //           >
// //             <Picker.Item label="Select Source" value="" color={COLORS.muted} />
// //             {cities && cities.map((item, index) => (
// //               <Picker.Item 
// //                 key={item?.id ? String(item.id) : `from-${index}`} 
// //                 label={item?.city_name || "Loading..."} 
// //                 value={item?.city_name || ""} 
// //               />
// //             ))}
// //           </Picker>
// //         </View>

// //         <Text style={styles.label}>To</Text>
// //         <View style={styles.inputBox}>
// //           <Picker
// //             selectedValue={to}
// //             onValueChange={(itemValue) => setTo(itemValue)}
// //             style={{ flex: 1, color: COLORS.text }}
// //             dropdownIconColor={COLORS.primary}
// //           >
// //             <Picker.Item label="Select Destination" value="" color={COLORS.muted} />
// //             {cities && cities.map((item, index) => (
// //               <Picker.Item 
// //                 key={item?.id ? String(item.id) : `to-${index}`} 
// //                 label={item?.city_name || "Loading..."} 
// //                 value={item?.city_name || ""} 
// //               />
// //             ))}
// //           </Picker>
// //         </View>

// //         <Text style={styles.label}>Date of Journey</Text>
// //         <TouchableOpacity style={styles.inputBox} onPress={showDatePicker}>
// //           <Icon name="date-range" size={20} color={COLORS.primary} />
// //           <Text style={{ marginLeft: 10, color: date ? COLORS.text : COLORS.muted }}>
// //             {date || "Select Date"}
// //           </Text>
// //         </TouchableOpacity>

// //         <DateTimePickerModal
// //           isVisible={isDatePickerVisible}
// //           mode="date"
// //           onConfirm={handleConfirm}
// //           onCancel={hideDatePicker}
// //           minimumDate={new Date()}
// //         />

// //         <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
// //           <Text style={styles.searchText}>Search Buses</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );
// // }
// // // ... styles remain the same

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: COLORS.background,
// //     padding: 20,
// //   },

// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginTop: 30,
// //     marginBottom: 30,
// //   },

// //   avatar: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 18,
// //   },


// //   title: {
// //     color: COLORS.text,
// //     fontSize: 28,
// //     fontWeight: '700',
// //   },

// //   card: {
// //     backgroundColor: COLORS.card,
// //     borderRadius: SIZES.radius,
// //     padding: 20,
// //     marginBottom: 30,
// //   },

// //   label: {
// //     color: COLORS.text,
// //     marginBottom: 6,
// //     marginTop: 12,
// //   },

// //   inputBox: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: COLORS.background,
// //     borderRadius: SIZES.radius,
// //     paddingHorizontal: 12,
// //     paddingVertical: 12,
// //   },

// //   input: {
// //     flex: 1,
// //     marginLeft: 10,
// //     color: COLORS.text,
// //   },

// //   searchBtn: {
// //     backgroundColor: COLORS.primary,
// //     paddingVertical: 16,
// //     borderRadius: SIZES.radius,
// //     marginTop: 25,
// //   },

// //   searchText: {
// //     color: COLORS.text,
// //     textAlign: 'center',
// //     fontSize: 18,
// //     fontWeight: '700',
// //   },

// //   sectionTitle: {
// //     color: COLORS.text,
// //     fontSize: 18,
// //     fontWeight: '700',
// //     marginBottom: 15,
// //   },

// //   routeCard: {
// //     backgroundColor: COLORS.card,
// //     padding: 16,
// //     borderRadius: SIZES.radius,
// //     marginBottom: 12,
// //   },

// //   route: {
// //     color: COLORS.text,
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },

// //   routeSub: {
// //     color: COLORS.muted,
// //     marginTop: 4,
// //   },
// // });


// import { useNavigation } from '@react-navigation/native';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   FlatList,
//   Image, Modal,
//   ScrollView, StyleSheet, Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { COLORS } from '../../../constants/theme';

// export default function Home() {
//   const router = useRouter();
//   const navigation = useNavigation();
  
//   const [cities, setCities] = useState([]);
//   const [filteredCities, setFilteredCities] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [date, setDate] = useState('');
  
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectingFor, setSelectingFor] = useState('from'); // 'from' or 'to'
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   useEffect(() => {
//     fetchCities();
//   }, []);

//   const fetchCities = async () => {
//     try {
//       const response = await fetch('http://172.24.149.252:3000/cities');
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         setCities(data);
//         setFilteredCities(data);
//       }
//     } catch (err) { console.error(err); }
//   };

//   const handleSearchCity = (text) => {
//     setSearchQuery(text);
//     const filtered = cities.filter(item => 
//       item.city_name.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredCities(filtered);
//   };

//   const openCityPicker = (type) => {
//     setSelectingFor(type);
//     setSearchQuery('');
//     setFilteredCities(cities);
//     setModalVisible(true);
//   };

//   const selectCity = (cityName) => {
//     if (selectingFor === 'from') setFrom(cityName);
//     else setTo(cityName);
//     setModalVisible(false);
//   };

//   const handleConfirmDate = (selectedDate) => {
//     setDate(selectedDate.toLocaleDateString());
//     setDatePickerVisibility(false);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.background }}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         {/* Header (Same as before) */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.openDrawer()}>
//             <View style={styles.menuCircle}><Icon name="menu" size={24} color={COLORS.text} /></View>
//           </TouchableOpacity>
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.welcomeText}>Hello, Traveler!</Text>
//             <Text style={styles.subWelcome}>Where to today?</Text>
//           </View>
//           <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.avatar} />
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Plan Your Journey</Text>

//           {/* FROM SELECTION */}
//           <Text style={styles.label}>Departure From</Text>
//           <TouchableOpacity style={styles.inputBox} onPress={() => openCityPicker('from')}>
//             <Icon name="bus-side" size={22} color={COLORS.primary} style={styles.fieldIcon} />
//             <Text style={[styles.inputText, !from && { color: COLORS.muted }]}>
//               {from || "Select Source"}
//             </Text>
//           </TouchableOpacity>

//           {/* TO SELECTION */}
//           <Text style={styles.label}>Destination To</Text>
//           <TouchableOpacity style={styles.inputBox} onPress={() => openCityPicker('to')}>
//             <Icon name="map-marker-radius-outline" size={22} color={COLORS.primary} style={styles.fieldIcon} />
//             <Text style={[styles.inputText, !to && { color: COLORS.muted }]}>
//               {to || "Select Destination"}
//             </Text>
//           </TouchableOpacity>

//           {/* DATE SELECTION */}
//           <Text style={styles.label}>Travel Date</Text>
//           <TouchableOpacity style={styles.inputBox} onPress={() => setDatePickerVisibility(true)}>
//             <Icon name="calendar-month-outline" size={22} color={COLORS.primary} style={styles.fieldIcon} />
//             <Text style={[styles.inputText, !date && { color: COLORS.muted }]}>
//               {date || "Pick a date"}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.searchBtn} onPress={() => router.push('/buslist')}>
//             <Text style={styles.searchText}>Find Available Buses</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* 🚀 THE PROFESSIONAL SEARCH MODAL */}
//       <Modal visible={modalVisible} animationType="slide" transparent={false}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <TouchableOpacity onPress={() => setModalVisible(false)}>
//               <Icon name="close" size={28} color={COLORS.text} />
//             </TouchableOpacity>
//             <Text style={styles.modalTitle}>Select {selectingFor === 'from' ? 'Source' : 'Destination'}</Text>
//           </View>

//           <View style={styles.searchBar}>
//             <Icon name="magnify" size={22} color={COLORS.muted} />
//             <TextInput 
//               placeholder="Search city..." 
//               placeholderTextColor={COLORS.muted}
//               style={styles.searchInput}
//               value={searchQuery}
//               onChangeText={handleSearchCity}
//               autoFocus
//             />
//           </View>

//           <FlatList 
//             data={filteredCities}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <TouchableOpacity style={styles.cityItem} onPress={() => selectCity(item.city_name)}>
//                 <Icon name="city-variant-outline" size={20} color={COLORS.muted} />
//                 <Text style={styles.cityText}>{item.city_name}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       </Modal>

//       <DateTimePickerModal 
//         isVisible={isDatePickerVisible} mode="date" 
//         onConfirm={handleConfirmDate} onCancel={() => setDatePickerVisibility(false)} 
//       />
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 40,
//     marginBottom: 30,
//   },
//   menuCircle: {
//     width: 45,
//     height: 45,
//     borderRadius: 25,
//     backgroundColor: COLORS.card,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   headerTextContainer: { flex: 1, marginLeft: 15 },
//   welcomeText: { color: COLORS.text, fontSize: 20, fontWeight: '700' },
//   subWelcome: { color: COLORS.muted, fontSize: 14 },
//   avatar: { width: 45, height: 45, borderRadius: 25, borderWidth: 2, borderColor: COLORS.primary },
  
//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 20,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//   },
//   cardTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginBottom: 20 },
//   label: { color: COLORS.text, fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 10 },
//   inputBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.background,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 55,
//     marginBottom: 15,
//   },
//   fieldIcon: { marginRight: 10 },
//   picker: { flex: 1, color: COLORS.text, marginLeft: -10 },
  
//   searchBtn: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.primary,
//     height: 60,
//     borderRadius: 15,
//     marginTop: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//   },
//   searchText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
//   sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginTop: 30, marginBottom: 15 },
//   recentItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       backgroundColor: COLORS.card,
//       padding: 15,
//       borderRadius: 12,
//       marginBottom: 10
//   },
//   recentText: { color: COLORS.text, marginLeft: 10, fontSize: 15 },

//   // ... existing styles for container, card, header ...
//   inputBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.background,
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     height: 55,
//     marginBottom: 15,
//   },
//   inputText: { fontSize: 16, color: COLORS.text, marginLeft: 10 },
  
//   // 🏙️ MODAL STYLES
//   modalContainer: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
//   modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 20 },
//   modalTitle: { color: COLORS.text, fontSize: 20, fontWeight: '700', marginLeft: 15 },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.card,
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     height: 50,
//     marginBottom: 20,
//   },
//   searchInput: { flex: 1, color: COLORS.text, marginLeft: 10, fontSize: 16 },
//   cityItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#222',
//   },
//   cityText: { color: COLORS.text, fontSize: 16, marginLeft: 15 },
// });



import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../constants/theme';

export default function Home() {
  const router = useRouter();
  const navigation = useNavigation();

  // State
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const [modalVisible, setModalVisible] = useState(false);
  const [selectingFor, setSelectingFor] = useState('from');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    fetchCities();
    loadRecentSearches();
  }, []);

  // --- Logic Functions ---

  const fetchCities = async () => {
    try {
      const response = await fetch('http://172.24.149.252:3000/cities');
      const data = await response.json();
      if (Array.isArray(data)) {
        setCities(data);
        setFilteredCities(data);
      }
    } catch (err) {
      console.error('Fetch Cities Error:', err);
    }
  };

  const loadRecentSearches = async () => {
    try {
      const saved = await AsyncStorage.getItem('recent_bus_searches');
      if (saved) setRecentSearches(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  };

  const saveSearch = async (fromCity, toCity) => {
    const newSearch = { from: fromCity, to: toCity, id: Date.now().toString() };
    // Filter out duplicates and keep only last 2
    const filtered = recentSearches.filter(s => s.from !== fromCity || s.to !== toCity);
    const updated = [newSearch, ...filtered].slice(0, 2);
    setRecentSearches(updated);
    await AsyncStorage.setItem('recent_bus_searches', JSON.stringify(updated));
  };

  const handleSwap = () => {
    if (!from && !to) return;
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const openCityPicker = (type) => {
    setSelectingFor(type);
    setSearchQuery('');
    setFilteredCities(cities);
    setModalVisible(true);
  };

  const selectCity = (cityName) => {
    if (selectingFor === 'from') setFrom(cityName);
    else setTo(cityName);
    setModalVisible(false);
  };

  const handleSearchCity = (text) => {
    setSearchQuery(text);
    const filtered = cities.filter((item) =>
      item.city_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleSearch = () => {
    if (!from || !to || !date) {
      Alert.alert("Selection Missing", "Please select both Source and Destination cities.");
      return;
    }
    if (from === to) {
      Alert.alert("Invalid Route", "Source and Destination cities cannot be the same.");
      return;
    }

    saveSearch(from, to);
    router.push({
      pathname: '/buslist',
      params: { fromCity: from, toCity: to, travelDate: date }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => (navigation as any).openDrawer()}>
            <View style={styles.menuCircle}><Icon name="menu" size={24} color={COLORS.text} /></View>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>Hello, Traveler!</Text>
            <Text style={styles.subWelcome}>Where to today?</Text>
          </View>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.avatar} />
        </View>

        {/* Search Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Plan Your Journey</Text>

          <View style={styles.selectionWrapper}>
            <View>
              <Text style={styles.label}>Departure From</Text>
              <TouchableOpacity style={styles.inputBox} onPress={() => openCityPicker('from')}>
                <Icon name="bus-side" size={22} color={COLORS.primary} />
                <Text style={[styles.inputText, !from && { color: COLORS.muted }]}>{from || "Select Source"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
              <Icon name="swap-vertical" size={24} color="#FFF" />
            </TouchableOpacity>

            <View>
              <Text style={styles.label}>Destination To</Text>
              <TouchableOpacity style={styles.inputBox} onPress={() => openCityPicker('to')}>
                <Icon name="map-marker-radius-outline" size={22} color={COLORS.primary} />
                <Text style={[styles.inputText, !to && { color: COLORS.muted }]}>{to || "Select Destination"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.label}>Travel Date</Text>
          <TouchableOpacity style={styles.inputBox} onPress={() => setDatePickerVisibility(true)}>
            <Icon name="calendar-month-outline" size={22} color={COLORS.primary} />
            <Text style={styles.inputText}>{date}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchText}>Find Available Buses</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {recentSearches.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.recentCard}
                onPress={() => { setFrom(item.from); setTo(item.to); }}
              >
                <Icon name="history" size={20} color={COLORS.muted} />
                <Text style={styles.recentText}>{item.from}  →  {item.to}</Text>
                <Icon name="chevron-right" size={20} color={COLORS.muted} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* City Picker Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={28} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select {selectingFor === 'from' ? 'Source' : 'Destination'}</Text>
          </View>

          <View style={styles.searchBar}>
            <Icon name="magnify" size={22} color={COLORS.muted} />
            <TextInput 
              placeholder="Search city..." 
              placeholderTextColor={COLORS.muted}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchCity}
              autoFocus
            />
          </View>

          <FlatList 
            data={filteredCities}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.cityItem} onPress={() => selectCity(item.city_name)}>
                <Icon name="city-variant-outline" size={20} color={COLORS.muted} />
                <Text style={styles.cityText}>{item.city_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(d) => { setDate(d.toLocaleDateString()); setDatePickerVisibility(false); }}
        onCancel={() => setDatePickerVisibility(false)}
        minimumDate={new Date()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 30 },
  menuCircle: { width: 45, height: 45, borderRadius: 25, backgroundColor: COLORS.card, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  headerTextContainer: { flex: 1, marginLeft: 15 },
  welcomeText: { color: COLORS.text, fontSize: 20, fontWeight: '700' },
  subWelcome: { color: COLORS.muted, fontSize: 14 },
  avatar: { width: 45, height: 45, borderRadius: 25, borderWidth: 2, borderColor: COLORS.primary },
  card: { backgroundColor: COLORS.card, borderRadius: 20, padding: 20, elevation: 4 },
  cardTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginBottom: 20 },
  selectionWrapper: { position: 'relative' },
  label: { color: COLORS.text, fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 10 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 12, paddingHorizontal: 15, height: 55, marginBottom: 15 },
  inputText: { fontSize: 16, color: COLORS.text, marginLeft: 10 },
  swapButton: { position: 'absolute', right: 20, top: '48%', zIndex: 10, backgroundColor: COLORS.primary, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: COLORS.card },
  searchBtn: { backgroundColor: COLORS.primary, height: 60, borderRadius: 15, marginTop: 20, justifyContent: 'center', alignItems: 'center' },
  searchText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  recentSection: { marginTop: 25 },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700', marginBottom: 15 },
  recentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  recentText: { flex: 1, color: COLORS.text, marginLeft: 12, fontSize: 14, fontWeight: '500' },
  modalContainer: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 20 },
  modalTitle: { color: COLORS.text, fontSize: 20, fontWeight: '700', marginLeft: 15 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 12, paddingHorizontal: 15, height: 50, marginBottom: 20 },
  searchInput: { flex: 1, color: COLORS.text, marginLeft: 10, fontSize: 16 },
  cityItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#222' },
  cityText: { color: COLORS.text, fontSize: 16, marginLeft: 15 },
});