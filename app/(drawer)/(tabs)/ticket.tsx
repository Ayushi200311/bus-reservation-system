// import { Ionicons } from '@expo/vector-icons';
// import React, { useState } from 'react';
// import {
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// // --- TYPES ---
// interface Ticket {
//   id: string;
//   source: string;
//   destination: string;
//   date: string;
//   time: string;
//   arrivalTime: string;
//   busName: string;
//   busType: string;
//   seatNo: string;
//   pnr: string;
//   status: 'Confirmed' | 'Cancelled' | 'Completed';
//   totalAmount: string;
// }

// // --- DUMMY DATA ---
// const UPCOMING_TRIPS: Ticket[] = [
//   {
//     id: '1',
//     source: 'Jamnagar',
//     destination: 'Baroda',
//     date: 'Mon, 12 Jan 2026',
//     time: '23:00',
//     arrivalTime: '06:00',
//     busName: 'New Payal Travels',
//     busType: 'Non-AC Sleeper (2+1)',
//     seatNo: 'L1, L2',
//     pnr: 'UB7823467',
//     status: 'Confirmed',
//     totalAmount: '1219'
//   },
// ];

// const COMPLETED_TRIPS: Ticket[] = [
//   {
//     id: '2',
//     source: 'Ahmedabad',
//     destination: 'Mumbai',
//     date: 'Sun, 15 Dec 2025',
//     time: '21:30',
//     arrivalTime: '05:30',
//     busName: 'Srinath Travels',
//     busType: 'Volvo AC Sleeper',
//     seatNo: 'U5',
//     pnr: 'UB1122334',
//     status: 'Completed',
//     totalAmount: '850'
//   }
// ];

// export default function BookingsScreen() {
//   const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

//   const currentData = activeTab === 'upcoming' ? UPCOMING_TRIPS : COMPLETED_TRIPS;

//   const renderTicket = ({ item }: { item: Ticket }) => (
//     <View style={styles.card}>
      
//       {/* 1. TOP HEADER (Bus Name & Status) */}
//       <View style={styles.cardHeader}>
//         <View>
//             <Text style={styles.busName}>{item.busName}</Text>
//             <Text style={styles.busType}>{item.busType}</Text>
//         </View>
//         <View style={[styles.statusBadge, 
//             item.status === 'Confirmed' ? styles.statusConfirmed : styles.statusCompleted
//         ]}>
//             <Text style={styles.statusText}>{item.status}</Text>
//         </View>
//       </View>

//       <View style={styles.divider} />

//       {/* 2. ROUTE & TIMING */}
//       <View style={styles.routeRow}>
//         <View>
//             <Text style={styles.cityText}>{item.source}</Text>
//             <Text style={styles.timeText}>{item.time}</Text>
//         </View>
        
//         {/* Arrow & Duration */}
//         <View style={styles.durationContainer}>
//              <View style={styles.line} />
//              <Ionicons name="bus-outline" size={16} color="#666" style={{ marginHorizontal: 5 }} />
//              <View style={styles.line} />
//         </View>

//         <View style={{ alignItems: 'flex-end' }}>
//             <Text style={styles.cityText}>{item.destination}</Text>
//             <Text style={styles.timeText}>{item.arrivalTime}</Text>
//         </View>
//       </View>

//       <View style={styles.dateRow}>
//          <Text style={styles.dateText}>{item.date}</Text>
//       </View>

//       {/* 3. TICKET DETAILS GRID */}
//       <View style={styles.detailsGrid}>
//           <View style={styles.detailItem}>
//               <Text style={styles.detailLabel}>PNR NO</Text>
//               <Text style={styles.detailValue}>{item.pnr}</Text>
//           </View>
//           <View style={styles.detailItem}>
//               <Text style={styles.detailLabel}>SEAT NO</Text>
//               <Text style={styles.detailValue}>{item.seatNo}</Text>
//           </View>
//           <View style={styles.detailItem}>
//               <Text style={styles.detailLabel}>TOTAL FARE</Text>
//               <Text style={styles.detailValue}>₹{item.totalAmount}</Text>
//           </View>
//       </View>

//       {/* 4. FOOTER ACTIONS */}
//       <View style={styles.cardFooter}>
//           <TouchableOpacity style={styles.actionButton}>
//               <Ionicons name="map-outline" size={18} color="#FF1E1E" />
//               <Text style={styles.actionText}>Track Bus</Text>
//           </TouchableOpacity>
//           <View style={styles.verticalDivider} />
//           <TouchableOpacity style={styles.actionButton}>
//               <Ionicons name="download-outline" size={18} color="#FF1E1E" />
//               <Text style={styles.actionText}>Download</Text>
//           </TouchableOpacity>
//       </View>

//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
      
//       {/* HEADER */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Bookings</Text>
//       </View>

//       {/* TABS */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity 
//             style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
//             onPress={() => setActiveTab('upcoming')}
//         >
//             <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//             style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
//             onPress={() => setActiveTab('completed')}
//         >
//             <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
//         </TouchableOpacity>
//       </View>

//       {/* TICKET LIST */}
//       <FlatList
//         data={currentData}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContent}
//         renderItem={renderTicket}
//         ListEmptyComponent={
//             <View style={{ alignItems: 'center', marginTop: 50 }}>
//                 <Ionicons name="ticket-outline" size={50} color="#333" />
//                 <Text style={{ color: '#666', marginTop: 10 }}>No tickets found</Text>
//             </View>
//         }
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
  
//   header: { padding: 16, borderBottomWidth: 1, borderColor: '#222', alignItems: 'center' },
//   headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

//   // Tabs
//   tabContainer: { flexDirection: 'row', backgroundColor: '#111', margin: 16, borderRadius: 8, padding: 4 },
//   tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
//   activeTab: { backgroundColor: '#FF1E1E' },
//   tabText: { color: '#666', fontWeight: '600' },
//   activeTabText: { color: '#fff' },

//   listContent: { paddingHorizontal: 16 },

//   // Card
//   card: { backgroundColor: '#111', borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#222', overflow: 'hidden' },
  
//   cardHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
//   busName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   busType: { color: '#aaa', fontSize: 12 },
  
//   statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
//   statusConfirmed: { backgroundColor: 'rgba(76, 175, 80, 0.2)' }, // Green Tint
//   statusCompleted: { backgroundColor: 'rgba(158, 158, 158, 0.2)' }, // Grey Tint
//   statusText: { color: '#4CAF50', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },

//   divider: { height: 1, backgroundColor: '#222' },

//   // Route
//   routeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 },
//   cityText: { color: '#aaa', fontSize: 12, textTransform: 'uppercase' },
//   timeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
//   durationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' },
//   line: { height: 1, backgroundColor: '#333', flex: 1, marginHorizontal: 5 },

//   dateRow: { paddingHorizontal: 16, paddingBottom: 16 },
//   dateText: { color: '#666', fontSize: 12 },

//   // Details Grid
//   detailsGrid: { flexDirection: 'row', backgroundColor: '#1a1a1a', padding: 12, justifyContent: 'space-between' },
//   detailItem: { alignItems: 'center', flex: 1 },
//   detailLabel: { color: '#666', fontSize: 10, marginBottom: 2 },
//   detailValue: { color: '#fff', fontSize: 13, fontWeight: 'bold' },

//   // Footer
//   cardFooter: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderColor: '#222' },
//   actionButton: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
//   actionText: { color: '#FF1E1E', fontSize: 14, fontWeight: '600', marginLeft: 6 },
//   verticalDivider: { width: 1, backgroundColor: '#222' },
// });



import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// --- TYPES ---
interface Ticket {
  booking_id: number;
  source: string; // from_city from DB
  destination: string; // to_city from DB
  travel_date: string; // Formatted date
  busName: string;
  seat_no: string;
  pnr: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  amount: number;
}

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // --- ASYNC FUNCTION TO FETCH DATA ---
  const fetchBookings = async () => {
    try {
      // 1. Get Logged In User Phone
      const phone = await AsyncStorage.getItem('userPhone');
      if (!phone) {
        setLoading(false);
        return;
      }

      // 2. Fetch from Backend (Replace with your IP)
      const response = await fetch(`http://172.24.149.252:3000/my-bookings?phone=${phone}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        // Map DB fields to UI fields if needed
        const formattedData = data.map((item: any) => ({
          id: item.booking_id.toString(),
          source: item.from_city,
          destination: item.to_city,
          date: item.travel_date, // e.g. "12 Feb 2026, 10:30 PM"
          time: item.travel_date.split(',')[1], // Extract Time
          arrivalTime: item.arr_time,
          busName: item.bus_name,
          busType: item.bus_type || 'AC Sleeper',
          seatNo: item.seat_no,
          pnr: item.pnr,
          status: item.status,
          totalAmount: item.amount
        }));
        setTickets(formattedData);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Run on Load
  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter Logic (Simple date check or status check)
  // For now, we show all Confirmed in "Upcoming" and others in "Completed"
  const currentData = activeTab === 'upcoming' 
    ? tickets.filter(t => t.status === 'Confirmed') 
    : tickets.filter(t => t.status !== 'Confirmed');

  const renderTicket = ({ item }: { item: any }) => (
    <View style={styles.card}>
      
      {/* 1. TOP HEADER */}
      <View style={styles.cardHeader}>
        <View>
            <Text style={styles.busName}>{item.busName}</Text>
            <Text style={styles.busType}>AC Sleeper (2+1)</Text> 
        </View>
        <View style={[styles.statusBadge, 
            item.status === 'Confirmed' ? styles.statusConfirmed : styles.statusCompleted
        ]}>
            <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* 2. ROUTE */}
      <View style={styles.routeRow}>
        <View>
            <Text style={styles.cityText}>{item.source}</Text>
            <Text style={styles.timeText}>{item.time || '--:--'}</Text>
        </View>
        
        <View style={styles.durationContainer}>
             <View style={styles.line} />
             <Ionicons name="bus-outline" size={16} color="#666" style={{ marginHorizontal: 5 }} />
             <View style={styles.line} />
        </View>

        <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.cityText}>{item.destination}</Text>
            <Text style={styles.timeText}>{item.arrivalTime || '--:--'}</Text> 
        </View>
      </View>

      <View style={styles.dateRow}>
         <Text style={styles.dateText}>{item.date}</Text>
      </View>

      {/* 3. DETAILS GRID */}
      <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>PNR NO</Text>
              <Text style={styles.detailValue}>{item.pnr}</Text>
          </View>
          <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>SEAT NO</Text>
              <Text style={styles.detailValue}>{item.seatNo}</Text>
          </View>
          <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>TOTAL FARE</Text>
              <Text style={styles.detailValue}>₹{item.totalAmount}</Text>
          </View>
      </View>

      {/* 4. ACTIONS */}
      <View style={styles.cardFooter}>
          <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="map-outline" size={18} color="#FF1E1E" />
              <Text style={styles.actionText}>Track Bus</Text>
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="download-outline" size={18} color="#FF1E1E" />
              <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>
      </View>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
        >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
        >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="#FF1E1E" />
        </View>
      ) : (
        <FlatList
            data={currentData}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={renderTicket}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchBookings(); }} tintColor="#fff"/>
            }
            ListEmptyComponent={
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Ionicons name="ticket-outline" size={50} color="#333" />
                    <Text style={{ color: '#666', marginTop: 10 }}>No bookings found</Text>
                </View>
            }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 16, borderBottomWidth: 1, borderColor: '#222', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tabContainer: { flexDirection: 'row', backgroundColor: '#111', margin: 16, borderRadius: 8, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  activeTab: { backgroundColor: '#FF1E1E' },
  tabText: { color: '#666', fontWeight: '600' },
  activeTabText: { color: '#fff' },
  listContent: { paddingHorizontal: 16 },
  card: { backgroundColor: '#111', borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#222', overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  busName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  busType: { color: '#aaa', fontSize: 12 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  statusConfirmed: { backgroundColor: 'rgba(76, 175, 80, 0.2)' },
  statusCompleted: { backgroundColor: 'rgba(158, 158, 158, 0.2)' },
  statusText: { color: '#4CAF50', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  divider: { height: 1, backgroundColor: '#222' },
  routeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 },
  cityText: { color: '#aaa', fontSize: 12, textTransform: 'uppercase' },
  timeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  durationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' },
  line: { height: 1, backgroundColor: '#333', flex: 1, marginHorizontal: 5 },
  dateRow: { paddingHorizontal: 16, paddingBottom: 16 },
  dateText: { color: '#666', fontSize: 12 },
  detailsGrid: { flexDirection: 'row', backgroundColor: '#1a1a1a', padding: 12, justifyContent: 'space-between' },
  detailItem: { alignItems: 'center', flex: 1 },
  detailLabel: { color: '#666', fontSize: 10, marginBottom: 2 },
  detailValue: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  cardFooter: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderColor: '#222' },
  actionButton: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  actionText: { color: '#FF1E1E', fontSize: 14, fontWeight: '600', marginLeft: 6 },
  verticalDivider: { width: 1, backgroundColor: '#222' },
});