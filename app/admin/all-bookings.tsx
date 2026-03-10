// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function AllBookings() {
//   const router = useRouter();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://10.81.83.252:3000/admin/bookings')
//       .then(res => res.json())
//       .then(data => setBookings(data))
//       .catch(e => console.error(e))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
//         <Text style={styles.headerTitle}>All Bookings</Text>
//       </View>
//       {loading ? <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 50 }} /> : (
//         <FlatList
//           data={bookings}
//           keyExtractor={(item) => item.pnr + item.seat_no}
//           contentContainerStyle={{ padding: 16 }}
//           renderItem={({ item }) => (
//             <View style={styles.card}>
//               <View style={styles.row}>
//                 <Text style={styles.pnr}>#{item.pnr}</Text>
//                 <Text style={styles.seat}>Seat: {item.seat_no}</Text>
//               </View>
//               <Text style={styles.name}>{item.passenger_name}</Text>
//               <Text style={styles.sub}>Bus: {item.bus_number}</Text>
//             </View>
//           )}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   header: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#222' },
//   headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
//   card: { backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
//   row: { flexDirection: 'row', justifyContent: 'space-between' },
//   pnr: { color: '#2196F3', fontWeight: 'bold' },
//   seat: { color: '#fff', fontWeight: 'bold' },
//   name: { color: '#fff', fontSize: 16, marginTop: 5 },
//   sub: { color: '#666', fontSize: 12, marginTop: 2 }
// });


import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/theme';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * AllBookings Component: Part of the Admin Reporting Module[cite: 84, 208].
 * This screen fetches and displays all passenger records and booking history 
 * to allow the Administrator to maintain system integrity.
 */
export default function AllBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/bookings`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header aligned with SDLC system design phases */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Booking Records</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4dffb8" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={bookings}
          // keyExtractor ensures uniqueness for data integrity [cite: 93, 141]
          keyExtractor={(item, index) => item.booking_id?.toString() || index.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.pnr}>ID: #{item.booking_id}</Text>
                <Text style={styles.status}>{item.booking_status}</Text>
              </View>
              
              <Text style={styles.name}>{item.full_name || 'Anonymous Passenger'}</Text>
              
              <View style={styles.detailsRow}>
                <Ionicons name="bus-outline" size={14} color="#666" />
                <Text style={styles.sub}> Seat {item.seat_number} | {item.bus_name}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.sub}> {new Date(item.booking_date).toLocaleDateString()}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { 
    flexDirection: 'row', 
    padding: 20, 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderColor: '#222',
    marginTop: 10
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  card: { 
    backgroundColor: '#111', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#333' 
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  detailsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  pnr: { color: '#4dffb8', fontWeight: 'bold' },
  status: { color: '#aaa', fontSize: 11, textTransform: 'uppercase' },
  name: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sub: { color: '#888', fontSize: 13, marginLeft: 5 }
});