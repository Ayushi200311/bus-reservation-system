// // import { Ionicons } from '@expo/vector-icons';
// // import { useLocalSearchParams, useRouter } from 'expo-router';
// // import React, { useState } from 'react';
// // import {
// //     FlatList,
// //     ListRenderItem,
// //     SafeAreaView,
// //     StyleSheet,
// //     Text,
// //     TextInput,
// //     TouchableOpacity,
// //     View
// // } from 'react-native';

// // // 1. Define Types for your Data
// // interface Point {
// //   id: string;
// //   name: string;
// //   location: string;
// //   time: string;
// //   date: string;
// // }

// // // 2. Define Types for URL Params
// // type BoardingScreenParams = {
// //   fromCity?: string;
// //   toCity?: string;
// //   travelDate?: string;
// //   busName?: string;
// // };

// // // Dummy Data
// // const BOARDING_POINTS: Point[] = [
// //   { id: '1', name: 'KHIJADIYA BYPASS', location: 'Khijadiya Bypass', time: '23:25', date: '12 Jan' },
// //   { id: '2', name: 'VICTORIA BRIDGE', location: 'Victoria Bridge', time: '23:25', date: '12 Jan' },
// //   { id: '3', name: 'GULAB NAGAR', location: 'Gulab Nagar', time: '23:30', date: '12 Jan' },
// //   { id: '4', name: 'JAMBUDA', location: 'Jambuda', time: '23:30', date: '12 Jan' },
// // ];

// // const DROPPING_POINTS: Point[] = [
// //   { id: '1', name: 'DHUMAD CHOKDI', location: 'Dhumad Chokdi', time: '07:40', date: '13 Jan' },
// //   { id: '2', name: 'SAMA TALAV', location: 'Sama Talav', time: '07:45', date: '13 Jan' },
// //   { id: '3', name: 'PANDYA BRIDGE', location: 'Pandya Bridge', time: '07:55', date: '13 Jan' },
// // ];

// // export default function BoardingScreen() {
// //   const router = useRouter();
  
// //   // Cast params to your specific type
// //   const params = useLocalSearchParams<BoardingScreenParams>(); 

// //   // State Types
// //   const [activeTab, setActiveTab] = useState<'boarding' | 'dropping'>('boarding');
// //   const [selectedBoarding, setSelectedBoarding] = useState<string | null>(null);
// //   const [selectedDropping, setSelectedDropping] = useState<string | null>(null);

// //   const currentList: Point[] = activeTab === 'boarding' ? BOARDING_POINTS : DROPPING_POINTS;
// //   const selectedId = activeTab === 'boarding' ? selectedBoarding : selectedDropping;

// //   const handleSelect = (id: string) => {
// //     if (activeTab === 'boarding') setSelectedBoarding(id);
// //     else setSelectedDropping(id);
// //   };

// //   const handleProceed = () => {
// //     if (!selectedBoarding || !selectedDropping) {
// //         alert("Please select both Boarding and Dropping points");
// //         return;
// //     }
// //     console.log("Proceeding with:", { selectedBoarding, selectedDropping });
// //     // Navigate to Seat Selection or Payment here
// //     router.push('/passenger-details');
// //   };

// //   const renderItem: ListRenderItem<Point> = ({ item }) => {Q
// //     const isSelected = selectedId === item.id;
// //     return (
// //       <TouchableOpacity 
// //         style={[styles.pointCard, isSelected && styles.selectedCard]} 
// //         onPress={() => handleSelect(item.id)}
// //         activeOpacity={0.7}
// //       >
// //         <View style={styles.radioContainer}>
// //           <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
// //             {isSelected && <View style={styles.radioInner} />}
// //           </View>
// //         </View>
        
// //         <View style={styles.pointInfo}>
// //           <Text style={styles.pointName}>{item.name}</Text>
// //           <Text style={styles.pointLocation}>{item.location}</Text>
// //         </View>

// //         <View style={styles.pointTime}>
// //           <Text style={styles.timeText}>{item.time}</Text>
// //           <Text style={styles.dateText}>{item.date}</Text>
// //         </View>
// //       </TouchableOpacity>
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       {/* 1. HEADER */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => router.back()}>
// //           <Ionicons name="arrow-back" size={24} color="#fff" />
// //         </TouchableOpacity>
// //         <View style={styles.headerContent}>
// //           <Text style={styles.routeTitle}>
// //             {params.fromCity || 'Source'} → {params.toCity || 'Destination'}
// //           </Text>
// //           <Text style={styles.subTitle}>
// //             {params.travelDate} | {params.busName || 'Bus Name'}
// //           </Text>
// //         </View>
// //       </View>

// //       {/* 2. TABS (Boarding / Dropping) */}
// //       <View style={styles.tabContainer}>
// //         <TouchableOpacity 
// //           style={[styles.tab, activeTab === 'boarding' && styles.activeTab]}
// //           onPress={() => setActiveTab('boarding')}
// //         >
// //           <Text style={[styles.tabText, activeTab === 'boarding' && styles.activeTabText]}>
// //             Boarding Points
// //           </Text>
// //           {activeTab === 'boarding' && <View style={styles.activeLine} />}
// //         </TouchableOpacity>

// //         <TouchableOpacity 
// //           style={[styles.tab, activeTab === 'dropping' && styles.activeTab]}
// //           onPress={() => setActiveTab('dropping')}
// //         >
// //           <Text style={[styles.tabText, activeTab === 'dropping' && styles.activeTabText]}>
// //             Dropping Points
// //           </Text>
// //           {activeTab === 'dropping' && <View style={styles.activeLine} />}
// //         </TouchableOpacity>
// //       </View>

// //       {/* 3. SEARCH BAR */}
// //       <View style={styles.searchContainer}>
// //         <Text style={styles.searchLabel}>
// //           Select your {activeTab === 'boarding' ? 'Boarding' : 'Dropping'} point
// //         </Text>
// //         <View style={styles.searchBox}>
// //           <Ionicons name="search" size={20} color="#666" />
// //           <TextInput 
// //             placeholder={`Search for ${activeTab} point`}
// //             placeholderTextColor="#666"
// //             style={styles.input}
// //           />
// //         </View>
// //       </View>

// //       {/* 4. LIST OF POINTS */}
// //       <FlatList
// //         data={currentList}
// //         keyExtractor={(item) => item.id}
// //         contentContainerStyle={{ paddingBottom: 100 }}
// //         renderItem={renderItem}
// //       />

// //       {/* 5. BOTTOM BUTTON */}
// //       <View style={styles.footer}>
// //         <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
// //           <Text style={styles.proceedText}>Proceed</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#000' },
  
// //   // Header
// //   header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
// //   headerContent: { marginLeft: 16 },
// //   routeTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// //   subTitle: { color: '#aaa', fontSize: 12, marginTop: 2 },

// //   // Tabs
// //   tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#222' },
// //   tab: { flex: 1, alignItems: 'center', paddingVertical: 16 },
// //   tabText: { color: '#666', fontSize: 14, fontWeight: '600' },
// //   activeTabText: { color: '#fff' },
// //   activeLine: { height: 3, backgroundColor: '#FF1E1E', width: '100%', position: 'absolute', bottom: 0 },

// //   // Search
// //   searchContainer: { padding: 16 },
// //   searchLabel: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
// //   searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', padding: 12, borderRadius: 8 },
// //   input: { marginLeft: 10, color: '#fff', flex: 1 },

// //   // List Item
// //   pointCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#1a1a1a' },
// //   selectedCard: { backgroundColor: '#1a1a1a' },
  
// //   // Radio Button
// //   radioContainer: { marginRight: 16 },
// //   radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#666', alignItems: 'center', justifyContent: 'center' },
// //   radioOuterSelected: { borderColor: '#FF1E1E' },
// //   radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF1E1E' },

// //   // Info
// //   pointInfo: { flex: 1 },
// //   pointName: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
// //   pointLocation: { color: '#aaa', fontSize: 12, marginTop: 2 },

// //   // Time
// //   pointTime: { alignItems: 'flex-end' },
// //   timeText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
// //   dateText: { color: '#aaa', fontSize: 12 },

// //   // Footer
// //   footer: { position: 'absolute', bottom: 0, width: '100%', padding: 16, backgroundColor: '#000', borderTopWidth: 1, borderColor: '#222' },
// //   proceedBtn: { backgroundColor: '#FF1E1E', padding: 16, borderRadius: 8, alignItems: 'center' },
// //   proceedText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// // });


// import { Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//     FlatList,
//     ListRenderItem,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';

// interface Point {
//   id: string;
//   name: string;
//   location: string;
//   time: string;
//   date: string;
// }

// // DUMMY DATA
// const BOARDING_POINTS: Point[] = [
//   { id: '1', name: 'KHIJADIYA BYPASS', location: 'Khijadiya Bypass', time: '23:25', date: '12 Jan' },
//   { id: '2', name: 'VICTORIA BRIDGE', location: 'Victoria Bridge', time: '23:25', date: '12 Jan' },
//   { id: '3', name: 'GULAB NAGAR', location: 'Gulab Nagar', time: '23:30', date: '12 Jan' },
//   { id: '4', name: 'JAMBUDA', location: 'Jambuda', time: '23:30', date: '12 Jan' },
// ];

// const DROPPING_POINTS: Point[] = [
//   { id: '1', name: 'DHUMAD CHOKDI', location: 'Dhumad Chokdi', time: '07:40', date: '13 Jan' },
//   { id: '2', name: 'SAMA TALAV', location: 'Sama Talav', time: '07:45', date: '13 Jan' },
//   { id: '3', name: 'PANDYA BRIDGE', location: 'Pandya Bridge', time: '07:55', date: '13 Jan' },
// ];

// export default function BoardingScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams(); 

//   const [activeTab, setActiveTab] = useState<'boarding' | 'dropping'>('boarding');
//   const [selectedBoarding, setSelectedBoarding] = useState<string | null>(null);
//   const [selectedDropping, setSelectedDropping] = useState<string | null>(null);

//   const currentList = activeTab === 'boarding' ? BOARDING_POINTS : DROPPING_POINTS;
//   const selectedId = activeTab === 'boarding' ? selectedBoarding : selectedDropping;

//   const handleSelect = (id: string) => {
//     if (activeTab === 'boarding') setSelectedBoarding(id);
//     else setSelectedDropping(id);
//   };

//   // ✅ THIS IS THE FIXED FUNCTION
//   const handleProceed = () => {
//     if (!selectedBoarding || !selectedDropping) {
//         alert("Please select both Boarding and Dropping points");
//         return;
//     }

//     // Get the actual names of the points
//     const boardingName = BOARDING_POINTS.find(p => p.id === selectedBoarding)?.name;
//     const droppingName = DROPPING_POINTS.find(p => p.id === selectedDropping)?.name;

//     // Navigate AND pass all the seat data forward
//     router.push({
//       pathname: '/passenger-details',
//       params: {
//         ...params, // <--- This keeps selectedSeats & totalPrice safe!
//         boardingPoint: boardingName,
//         droppingPoint: droppingName,
//       }
//     });
//   };

//   const renderItem: ListRenderItem<Point> = ({ item }) => {
//     const isSelected = selectedId === item.id;
//     return (
//       <TouchableOpacity 
//         style={[styles.pointCard, isSelected && styles.selectedCard]} 
//         onPress={() => handleSelect(item.id)}
//         activeOpacity={0.7}
//       >
//         <View style={styles.radioContainer}>
//           <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
//             {isSelected && <View style={styles.radioInner} />}
//           </View>
//         </View>
        
//         <View style={styles.pointInfo}>
//           <Text style={styles.pointName}>{item.name}</Text>
//           <Text style={styles.pointLocation}>{item.location}</Text>
//         </View>

//         <View style={styles.pointTime}>
//           <Text style={styles.timeText}>{item.time}</Text>
//           <Text style={styles.dateText}>{item.date}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <View style={styles.headerContent}>
//           <Text style={styles.routeTitle}>
//              {params.fromCity} → {params.toCity}
//           </Text>
//           <Text style={styles.subTitle}>
//              {params.travelDate}
//           </Text>
//         </View>
//       </View>

//       {/* TABS */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'boarding' && styles.activeTab]}
//           onPress={() => setActiveTab('boarding')}
//         >
//           <Text style={[styles.tabText, activeTab === 'boarding' && styles.activeTabText]}>Boarding Points</Text>
//           {activeTab === 'boarding' && <View style={styles.activeLine} />}
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'dropping' && styles.activeTab]}
//           onPress={() => setActiveTab('dropping')}
//         >
//           <Text style={[styles.tabText, activeTab === 'dropping' && styles.activeTabText]}>Dropping Points</Text>
//           {activeTab === 'dropping' && <View style={styles.activeLine} />}
//         </TouchableOpacity>
//       </View>

//       {/* LIST */}
//       <FlatList
//         data={currentList}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 100 }}
//         renderItem={renderItem}
//       />

//       {/* FOOTER */}
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
//           <Text style={styles.proceedText}>Proceed</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
//   headerContent: { marginLeft: 16 },
//   routeTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   subTitle: { color: '#aaa', fontSize: 12, marginTop: 2 },
//   tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#222' },
//   tab: { flex: 1, alignItems: 'center', paddingVertical: 16 },
//   tabText: { color: '#666', fontSize: 14, fontWeight: '600' },
//   activeTabText: { color: '#fff' },
//   activeLine: { height: 3, backgroundColor: '#FF1E1E', width: '100%', position: 'absolute', bottom: 0 },
//   pointCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#1a1a1a' },
//   selectedCard: { backgroundColor: '#1a1a1a' },
//   radioContainer: { marginRight: 16 },
//   radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#666', alignItems: 'center', justifyContent: 'center' },
//   radioOuterSelected: { borderColor: '#FF1E1E' },
//   radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF1E1E' },
//   pointInfo: { flex: 1 },
//   pointName: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
//   pointLocation: { color: '#aaa', fontSize: 12, marginTop: 2 },
//   pointTime: { alignItems: 'flex-end' },
//   timeText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
//   dateText: { color: '#aaa', fontSize: 12 },
//   footer: { position: 'absolute', bottom: 0, width: '100%', padding: 16, backgroundColor: '#000', borderTopWidth: 1, borderColor: '#222' },
//   proceedBtn: { backgroundColor: '#FF1E1E', padding: 16, borderRadius: 8, alignItems: 'center' },
//   proceedText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });


import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Point {
  id: string; // or number, depending on your DB
  name: string; // e.g., "type" from DB (Boarding/Dropping)
  location: string;
  time: string;
  date?: string; // Optional if your DB doesn't send date for stops
}

export default function BoardingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); 

  // --- 1. STATE MANAGEMENT ---
  const [loading, setLoading] = useState(true);
  const [boardingList, setBoardingList] = useState<Point[]>([]);
  const [droppingList, setDroppingList] = useState<Point[]>([]);

  const [activeTab, setActiveTab] = useState<'boarding' | 'dropping'>('boarding');
  const [selectedBoarding, setSelectedBoarding] = useState<string | null>(null);
  const [selectedDropping, setSelectedDropping] = useState<string | null>(null);

  // --- 2. FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        // Replace with your computer's IP
        const response = await fetch(
          `http://172.24.149.252:3000/get-bus-points?busId=${params.busId}`
        );
        const data = await response.json();
        
        // Map DB fields to UI fields if necessary, or just set them directly
        // Assuming backend returns: { boarding: [...], dropping: [...] }
        setBoardingList(data.boarding || []);
        setDroppingList(data.dropping || []);
      } catch (error) {
        console.error("Error fetching points:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (params.busId) {
      fetchPoints();
    }
  }, [params.busId]);

  // --- 3. DYNAMIC LIST LOGIC ---
  const currentList = activeTab === 'boarding' ? boardingList : droppingList;
  const selectedId = activeTab === 'boarding' ? selectedBoarding : selectedDropping;

  const handleSelect = (id: string) => {
    if (activeTab === 'boarding') setSelectedBoarding(id);
    else setSelectedDropping(id);
  };

  const handleProceed = () => {
    if (!selectedBoarding || !selectedDropping) {
        alert("Please select both Boarding and Dropping points");
        return;
    }

    // Find the full object to get the location name
    const boardingPointObj = boardingList.find(p => p.location === selectedBoarding || p.id === selectedBoarding); // Adjust match logic based on your ID
    const droppingPointObj = droppingList.find(p => p.location === selectedDropping || p.id === selectedDropping);

    // Navigate
    router.push({
      pathname: '/passenger-details',
      params: {
        ...params,
        // Send the Location Name (e.g., "Iscon Circle")
        boardingPoint: boardingPointObj?.location, 
        droppingPoint: droppingPointObj?.location,
      }
    });
  };

  const renderItem: ListRenderItem<Point> = ({ item }) => {
    // We use location or ID as the unique key
    const isSelected = selectedId === (item.location || item.id); 
    
    return (
      <TouchableOpacity 
        style={[styles.pointCard, isSelected && styles.selectedCard]} 
        onPress={() => handleSelect(item.location || item.id)} // Using location as ID for simplicity
        activeOpacity={0.7}
      >
        <View style={styles.radioContainer}>
          <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </View>
        
        <View style={styles.pointInfo}>
          {/* Display Location as main text */}
          <Text style={styles.pointName}>{item.location}</Text>
          {/* Display Type or extra info as subtext */}
          <Text style={styles.pointLocation}>{item.name || item.type}</Text> 
        </View>

        <View style={styles.pointTime}>
          <Text style={styles.timeText}>{item.time}</Text>
          {/* If you have date, show it, else show travel date */}
          <Text style={styles.dateText}>{item.date || params.travelDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF1E1E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.routeTitle}>
             {params.fromCity} → {params.toCity}
          </Text>
          <Text style={styles.subTitle}>
             {params.travelDate}
          </Text>
        </View>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'boarding' && styles.activeTab]}
          onPress={() => setActiveTab('boarding')}
        >
          <Text style={[styles.tabText, activeTab === 'boarding' && styles.activeTabText]}>Boarding Points</Text>
          {activeTab === 'boarding' && <View style={styles.activeLine} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'dropping' && styles.activeTab]}
          onPress={() => setActiveTab('dropping')}
        >
          <Text style={[styles.tabText, activeTab === 'dropping' && styles.activeTabText]}>Dropping Points</Text>
          {activeTab === 'dropping' && <View style={styles.activeLine} />}
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={currentList}
        keyExtractor={(item, index) => index.toString()} // Fallback key
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={renderItem}
        ListEmptyComponent={
            <Text style={{color:'#666', textAlign:'center', marginTop: 20}}>
                No points found for this bus.
            </Text>
        }
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
  headerContent: { marginLeft: 16 },
  routeTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subTitle: { color: '#aaa', fontSize: 12, marginTop: 2 },
  tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#222' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  tabText: { color: '#666', fontSize: 14, fontWeight: '600' },
  activeTabText: { color: '#fff' },
  activeLine: { height: 3, backgroundColor: '#FF1E1E', width: '100%', position: 'absolute', bottom: 0 },
  pointCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#1a1a1a' },
  selectedCard: { backgroundColor: '#1a1a1a' },
  radioContainer: { marginRight: 16 },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#666', alignItems: 'center', justifyContent: 'center' },
  radioOuterSelected: { borderColor: '#FF1E1E' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF1E1E' },
  pointInfo: { flex: 1 },
  pointName: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  pointLocation: { color: '#aaa', fontSize: 12, marginTop: 2 },
  pointTime: { alignItems: 'flex-end' },
  timeText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  dateText: { color: '#aaa', fontSize: 12 },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 16, backgroundColor: '#000', borderTopWidth: 1, borderColor: '#222' },
  proceedBtn: { backgroundColor: '#FF1E1E', padding: 16, borderRadius: 8, alignItems: 'center' },
  proceedText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});