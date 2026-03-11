// import { useLocalSearchParams } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// export default function BoardingScreen() {
//   const { scheduleId } = useLocalSearchParams();

//   const [boarding, setBoarding] = useState<any[]>([]);
//   const [dropping, setDropping] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("Received scheduleId:", scheduleId);

//     if (!scheduleId) {
//       console.log("No scheduleId found");
//       setLoading(false);
//       return;
//     }

//     fetchPoints();
//   }, [scheduleId]);

//   const fetchPoints = async () => {
//     try {
//       console.log("Fetching bus points...");

//       const response = await fetch(
//         `http://172.24.149.252:3000/get-bus-points?scheduleId=${scheduleId}`
//       );

//       console.log("Response status:", response.status);

//       const data = await response.json();

//       console.log("API DATA:", data);

//       // Safe fallback if backend returns wrong format
//       setBoarding(data?.boarding || []);
//       setDropping(data?.dropping || []);
//     } catch (error) {
//       console.log("Boarding Fetch Error:", error);
//     } finally {
//       setLoading(false); // ✅ always stop loading
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="blue" />
//         <Text>Loading boarding points...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.heading}>Boarding Points</Text>

//       {boarding.length === 0 ? (
//         <Text style={styles.empty}>No boarding points found</Text>
//       ) : (
//         boarding.map((point, index) => (
//           <Text key={`${point.location}-${index}`} style={styles.item}>
//             {point.location} - {point.time}
//           </Text>
//         ))
//       )}

//       <Text style={styles.heading}>Dropping Points</Text>

//       {dropping.length === 0 ? (
//         <Text style={styles.empty}>No dropping points found</Text>
//       ) : (
//         dropping.map((point, index) => (
//           <Text key={`${point.location}-${index}`} style={styles.item}>
//             {point.location} - {point.time}
//           </Text>
//         ))
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   heading: { fontSize: 20, fontWeight: "bold", marginTop: 20 },
//   item: { marginVertical: 5, fontSize: 16 },
//   empty: { marginVertical: 10, color: "gray" },
// });


import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../constants/theme';
import { useAlert } from '../../../hooks/useAlert';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function BoardingScreen() {
  const router = useRouter();
  const { alert } = useAlert();
  const params = useLocalSearchParams();
  const { scheduleId, fromCity, toCity, travelDate } = params;

  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [boardingList, setBoardingList] = useState<any[]>([]);
  const [droppingList, setDroppingList] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<'boarding' | 'dropping'>('boarding');
  const [selectedBoarding, setSelectedBoarding] = useState<string | null>(null);
  const [selectedDropping, setSelectedDropping] = useState<string | null>(null);

  // --- FETCH DATA ---
  useEffect(() => {
    if (scheduleId) fetchPoints();
  }, [scheduleId]);

  const fetchPoints = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/get-bus-points?scheduleId=${scheduleId}`
      );
      const data = await response.json();
      setBoardingList(data.boarding || []);
      setDroppingList(data.dropping || []);
    } catch (error) {
      console.error("Error fetching points:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- SELECTION LOGIC ---
  const handleSelect = (location: string) => {
    if (activeTab === 'boarding') {
      setSelectedBoarding(location);
      
      // 🚀 Automatic Switch to Dropping Tab
      setTimeout(() => {
        setActiveTab('dropping');
      }, 450); 
    } else {
      setSelectedDropping(location);
    }
  };

  const currentList = activeTab === 'boarding' ? boardingList : droppingList;
  const selectedLocation = activeTab === 'boarding' ? selectedBoarding : selectedDropping;

  const handleProceed = () => {
    if (!selectedBoarding || !selectedDropping) {
      alert({ title: 'Select Points', message: 'Please select both Boarding and Dropping points.', icon: 'warning' });
      return;
    }

    router.push({
      pathname: '/passenger-details',
      params: {
        ...params,
        boardingPoint: selectedBoarding,
        droppingPoint: selectedDropping,
      }
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedLocation === item.location;

    return (
      <TouchableOpacity
        style={[styles.pointCard, isSelected && styles.selectedCard]}
        onPress={() => handleSelect(item.location)}
        activeOpacity={0.7}
      >
        <View style={styles.radioContainer}>
          <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </View>

        <View style={styles.pointInfo}>
          <Text style={styles.pointName}>{item.location}</Text>
          <Text style={styles.pointSubtext}>{activeTab === 'boarding' ? 'Boarding Point' : 'Dropping Point'}</Text>
        </View>

        <View style={styles.pointTime}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
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
          <Text style={styles.routeTitle}>{fromCity} → {toCity}</Text>
          <Text style={styles.subTitle}>{travelDate}</Text>
        </View>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'boarding' && styles.activeTab]}
          onPress={() => setActiveTab('boarding')}
        >
          <Text style={[styles.tabText, activeTab === 'boarding' && styles.activeTabText]}>BOARDING</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'dropping' && styles.activeTab]}
          onPress={() => setActiveTab('dropping')}
        >
          <Text style={[styles.tabText, activeTab === 'dropping' && styles.activeTabText]}>DROPPING</Text>
        </TouchableOpacity>
      </View>

      {/* SUMMARY BAR */}
      {(selectedBoarding || selectedDropping) && (
        <View style={styles.summaryBar}>
          <View style={styles.summaryItem}>
            <Ionicons name="location" size={12} color="#FF1E1E" />
            <Text style={styles.summaryText} numberOfLines={1}>{selectedBoarding || 'Select Pick-up'}</Text>
          </View>
          <Ionicons name="arrow-forward" size={12} color="#444" />
          <View style={styles.summaryItem}>
            <Ionicons name="location" size={12} color="#00FF00" />
            <Text style={styles.summaryText} numberOfLines={1}>{selectedDropping || 'Select Drop-off'}</Text>
          </View>
        </View>
      )}

      {/* LIST */}
      <FlatList
        data={currentList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No locations available for this route.</Text>
        }
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.proceedBtn, (!selectedBoarding || !selectedDropping) && {opacity: 0.5}]} 
          onPress={handleProceed}
        >
          <Text style={styles.proceedText}>Confirm Selection</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  
  // Header
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222', marginTop: 35 },
  headerContent: { marginLeft: 16 },
  routeTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subTitle: { color: '#aaa', fontSize: 12 },

  // Tabs
  tabContainer: { flexDirection: 'row', backgroundColor: '#111' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 15, borderBottomWidth: 2, borderColor: 'transparent' },
  activeTab: { borderColor: '#FF1E1E' },
  tabText: { color: '#666', fontWeight: 'bold', fontSize: 13 },
  activeTabText: { color: '#fff' },

  // Summary Bar
  summaryBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0a0a0a', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderColor: '#222', justifyContent: 'space-between' },
  summaryItem: { flexDirection: 'row', alignItems: 'center', flex: 0.45 },
  summaryText: { color: '#aaa', fontSize: 11, marginLeft: 5 },

  // List Items
  pointCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#111' },
  selectedCard: { backgroundColor: '#1a1a1a' },
  radioContainer: { marginRight: 15 },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#444', justifyContent: 'center', alignItems: 'center' },
  radioOuterSelected: { borderColor: '#FF1E1E' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF1E1E' },
  pointInfo: { flex: 1 },
  pointName: { color: '#fff', fontSize: 15, fontWeight: '500' },
  pointSubtext: { color: '#666', fontSize: 12, marginTop: 2 },
  pointTime: { alignItems: 'flex-end' },
  timeText: { color: '#FF1E1E', fontSize: 15, fontWeight: 'bold' },

  emptyText: { color: '#666', textAlign: 'center', marginTop: 50 },

  // Footer
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#111', borderTopWidth: 1, borderColor: '#222' },
  proceedBtn: { backgroundColor: '#FF1E1E', padding: 16, borderRadius: 10, alignItems: 'center' },
  proceedText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});