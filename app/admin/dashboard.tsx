// // import { Ionicons } from '@expo/vector-icons';
// // import { useRouter } from 'expo-router';
// // import React, { useState } from 'react';
// // import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// // export default function AdminDashboard() {
// //   const router = useRouter();
  
// //   // Simple State for "Quick Add Bus"
// //   const [busNumber, setBusNumber] = useState('');
// //   const [operator, setOperator] = useState('');

// //   const handleAddBus = async () => {
// //     if(!busNumber || !operator) { Alert.alert("Error", "Fill all fields"); return; }
    
// //     try {
// //       // REPLACE WITH YOUR IP
// //       const response = await fetch('http://192.168.76.252:3000/admin/add-bus', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ bus_number: busNumber, operator: operator, type: 'AC Sleeper', seats: 36 })
// //       });
// //       if (response.ok) {
// //         Alert.alert("Success", "Bus Added to Database!");
// //         setBusNumber('');
// //       }
// //     } catch(e) { Alert.alert("Error", "Network Error"); }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => router.replace('/')}>
// //             <Ionicons name="arrow-back" size={24} color="#fff" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>Admin Panel</Text>
// //       </View>

// //       <ScrollView contentContainerStyle={styles.content}>
        
// //         {/* 1. QUICK ADD BUS */}
// //         <View style={styles.card}>
// //             <Text style={styles.cardTitle}>🚌 Add New Bus</Text>
// //             <TextInput 
// //                 style={styles.input} 
// //                 placeholder="Bus Number (e.g. GJ-10-X-9999)" 
// //                 placeholderTextColor="#666"
// //                 value={busNumber}
// //                 onChangeText={setBusNumber}
// //             />
// //             <TextInput 
// //                 style={styles.input} 
// //                 placeholder="Operator Name" 
// //                 placeholderTextColor="#666"
// //                 value={operator}
// //                 onChangeText={setOperator}
// //             />
// //             <TouchableOpacity style={styles.btn} onPress={handleAddBus}>
// //                 <Text style={styles.btnText}>Save Bus</Text>
// //             </TouchableOpacity>
// //         </View>

// //         {/* 2. NAVIGATION BUTTONS */}
// //         <TouchableOpacity style={styles.navCard} onPress={() => router.push('/admin/add-schedule')}>
// //             <View style={styles.iconBox}>
// //                 <Ionicons name="calendar" size={24} color="#FF1E1E" />
// //             </View>
// //             <View>
// //                 <Text style={styles.navTitle}>Manage Schedules</Text>
// //                 <Text style={styles.navSub}>Assign buses to routes</Text>
// //             </View>
// //             <Ionicons name="chevron-forward" size={24} color="#666" style={{marginLeft:'auto'}} />
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.navCard} onPress={() => router.push('/admin/all-bookings')}>
// //             <View style={styles.iconBox}>
// //                 <Ionicons name="people" size={24} color="#FF1E1E" />
// //             </View>
// //             <View>
// //                 <Text style={styles.navTitle}>View Bookings</Text>
// //                 <Text style={styles.navSub}>See passenger manifest</Text>
// //             </View>
// //             <Ionicons name="chevron-forward" size={24} color="#666" style={{marginLeft:'auto'}} />
// //         </TouchableOpacity>

// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#000' },
// //   header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
// //   headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 16 },
// //   content: { padding: 16 },
  
// //   card: { backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#333' },
// //   cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
// //   input: { backgroundColor: '#222', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
// //   btn: { backgroundColor: '#FF1E1E', padding: 14, borderRadius: 8, alignItems: 'center' },
// //   btnText: { color: '#fff', fontWeight: 'bold' },

// //   navCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
// //   iconBox: { width: 40, height: 40, backgroundColor: '#330000', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
// //   navTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// //   navSub: { color: '#666', fontSize: 12 },
// // });


// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//     Alert,
//     Image,
//     RefreshControl,
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [refreshing, setRefreshing] = useState(false);

//   // Mock Stats (In real app, fetch these from an API)
//   const stats = {
//     revenue: '₹24,500',
//     bookings: '142',
//     buses: '8'
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     // Simulate fetching new stats
//     setTimeout(() => setRefreshing(false), 1500);
//   };

//   const handleLogout = () => {
//     Alert.alert("Logout", "Exit Admin Panel?", [
//       { text: "Cancel", style: "cancel" },
//       { 
//         text: "Logout", 
//         style: "destructive", 
//         onPress: () => router.replace('/login') 
//       }
//     ]);
//   };

//   // --- REUSABLE DASHBOARD TILE ---
//   const DashboardTile = ({ icon, title, subtitle, route, color }) => (
//     <TouchableOpacity 
//       style={styles.tile} 
//       onPress={() => route && router.push(route)}
//       activeOpacity={0.7}
//     >
//       <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}> 
//         {/* '20' adds transparency to the hex code */}
//         <Ionicons name={icon} size={28} color={color} />
//       </View>
//       <Text style={styles.tileTitle}>{title}</Text>
//       <Text style={styles.tileSubtitle}>{subtitle}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
      
//       {/* 1. TOP HEADER WITH PROFILE */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greeting}>Welcome back,</Text>
//           <Text style={styles.adminName}>Administrator</Text>
//         </View>
//         <TouchableOpacity onPress={handleLogout}>
//           <Image 
//             source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2304/2304226.png' }} 
//             style={styles.profileImage} 
//           />
//         </TouchableOpacity>
//       </View>

//       <ScrollView 
//         contentContainerStyle={styles.content}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF1E1E"/>}
//       >

//         {/* 2. STATS OVERVIEW CARDS */}
//         <View style={styles.statsContainer}>
//           <View style={styles.statCard}>
//             <Text style={styles.statLabel}>Revenue</Text>
//             <Text style={styles.statValue}>{stats.revenue}</Text>
//             <Ionicons name="trending-up" size={16} color="#4dffb8" style={{ marginTop: 4 }} />
//           </View>
//           <View style={styles.statCard}>
//             <Text style={styles.statLabel}>Bookings</Text>
//             <Text style={styles.statValue}>{stats.bookings}</Text>
//             <Ionicons name="people" size={16} color="#FFD700" style={{ marginTop: 4 }} />
//           </View>
//           <View style={styles.statCard}>
//             <Text style={styles.statLabel}>Active Buses</Text>
//             <Text style={styles.statValue}>{stats.buses}</Text>
//             <Ionicons name="bus" size={16} color="#FF1E1E" style={{ marginTop: 4 }} />
//           </View>
//         </View>

//         <Text style={styles.sectionTitle}>Quick Actions</Text>

//         {/* 3. MENU GRID (Professional Layout) */}
//         <View style={styles.gridContainer}>
          
//           <DashboardTile 
//             icon="calendar" 
//             title="Schedules" 
//             subtitle="Plan trips" 
//             route="/admin/add-schedule" 
//             color="#FF1E1E"
//           />

//           <DashboardTile 
//             icon="list" 
//             title="Bookings" 
//             subtitle="Passenger list" 
//             route="/admin/all-bookings" 
//             color="#4dffb8"
//           />

//           <DashboardTile 
//             icon="bus" 
//             title="Manage Buses" 
//             subtitle="Add fleet" 
//             // In a real app, create /admin/manage-buses
//             route="/admin/add-bus" // Assuming you create this screen or reuse a modal
//             color="#FFD700"
//           />

//           <DashboardTile 
//             icon="map" 
//             title="Routes" 
//             subtitle="City links" 
//             // In a real app, create /admin/manage-routes
//             route="/admin/add-route" 
//             color="#2196F3"
//           />

//           <DashboardTile 
//             icon="qr-code" 
//             title="Scan Ticket" 
//             subtitle="Verify PNR" 
//             route={null} // Future feature
//             color="#E91E63"
//           />

//           <DashboardTile 
//             icon="settings" 
//             title="Settings" 
//             subtitle="App config" 
//             route={null} 
//             color="#9C27B0"
//           />

//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
  
//   // Header
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 50,
//     paddingBottom: 20,
//   },
//   greeting: { color: '#aaa', fontSize: 14 },
//   adminName: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
//   profileImage: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#333' },

//   content: { paddingHorizontal: 20, paddingBottom: 40 },

//   // Stats
//   statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
//   statCard: {
//     backgroundColor: '#111',
//     width: '31%',
//     padding: 12,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#222',
//     alignItems: 'center'
//   },
//   statLabel: { color: '#666', fontSize: 10, textTransform: 'uppercase', marginBottom: 4 },
//   statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

//   sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },

//   // Grid
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   tile: {
//     width: '48%', // 2 columns with spacing
//     backgroundColor: '#111',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#222',
//     // Optional Shadow for iOS
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//   },
//   iconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   tileTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
//   tileSubtitle: { color: '#666', fontSize: 12 },
// });






import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function AdminDashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  // Mock Stats - In future, fetch these using: SELECT COUNT(*) FROM table_name
  const stats = {
    todaySales: '₹12,400',
    activeBuses: '8', // from 'buses' table
    pendingBookings: '5' // from 'bookings' table
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Exit Admin Panel?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => router.replace('/login') }
    ]);
  };

  // --- REUSABLE TILE COMPONENT ---
  const DashboardTile = ({ icon, title, subtitle, route, color }) => (
    <TouchableOpacity 
      style={styles.tile} 
      onPress={() => route ? router.push(route) : Alert.alert("Coming Soon", "Create this screen first!")}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}> 
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <View>
        <Text style={styles.tileTitle}>{title}</Text>
        <Text style={styles.tileSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Admin Console</Text>
          <Text style={styles.adminName}>Dashboard</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/9703/9703596.png' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF1E1E"/>}
      >

        {/* 2. LIVE STATS (From bookings & payments tables) */}
        {/* <View style={styles.statsContainer}>
          <View style={[styles.statCard, { borderLeftColor: '#4dffb8' }]}>
            <Text style={styles.statLabel}>Today's Revenue</Text>
            <Text style={styles.statValue}>{stats.todaySales}</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: '#FFD700' }]}>
            <Text style={styles.statLabel}>Active Fleet</Text>
            <Text style={styles.statValue}>{stats.activeBuses}</Text>
          </View>
        </View> */}

        <Text style={styles.sectionTitle}>Operations</Text>

        {/* 3. MENU GRID (Mapped to Your DB Tables) */}
        <View style={styles.gridContainer}>
          
          <DashboardTile 
            icon="calendar" 
            title="Trip Schedules" 
            subtitle="Plan & Assign Trips" 
            route="/admin/manage-schedules" // ✅ Updated Path
            color="#FF1E1E" 
          />

          <DashboardTile 
            icon="ticket" 
            title="Bookings" 
            subtitle="View Passenger Lists" 
            route="/admin/all-bookings" 
            color="#2196F3" // Blue
          />

          <DashboardTile 
            icon="bus" 
            title="Fleet Manager" 
            subtitle="Add/Edit Buses" 
            route="/admin/manage-buses" 
            color="#FFD700" // Gold
          />

          <DashboardTile 
            icon="map" 
            title="Route Master" 
            subtitle="Routes & Cities" 
            route="/admin/manage-routes" 
            color="#4dffb8" // Green
          />

          {/* Linked to: CITIES Table */}
          <DashboardTile 
            icon="location" 
            title="Cities" 
            subtitle="Origin & Destination" 
            route="/admin/manage-cities" 
            color="#03A9F4" 
          />

          {/* Linked to: BUSSTOPS Table */}
          <DashboardTile 
            icon="pin" 
            title="Bus Stops" 
            subtitle="Boarding & Dropping" 
            route="/admin/manage-busstops" 
            color="#8BC34A" 
          />

          <DashboardTile 
            icon="wallet" 
            title="Transactions" 
            subtitle="Payment History" 
            route="/admin/transactions" 
            color="#9C27B0" // Purple
          />

          <DashboardTile 
            icon="megaphone" 
            title="Broadcast" 
            subtitle="Send Offers/Alerts" 
            route="/admin/send-notification" 
            color="#FF5722" // Orange
          />

          <DashboardTile 
            icon="people" 
            title="Customers" 
            subtitle="Manage Users" 
            route="/admin/users-list" 
            color="#00BCD4" // Cyan
          />

          <DashboardTile 
            icon="shield-checkmark" 
            title="Admin Access" 
            subtitle="Manage Staff" 
            route="/admin/manage-admins" 
            color="#607D8B" // Grey
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderColor: '#222'
  },
  greeting: { color: '#aaa', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  adminName: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  profileImage: { width: 45, height: 45, borderRadius: 25, borderWidth: 1, borderColor: '#444' },

  content: { padding: 20, paddingBottom: 40 },

  // Stats
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  statCard: {
    backgroundColor: '#111',
    width: '48%',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4, // Colored bar on left
    borderWidth: 1,
    borderColor: '#222',
    elevation: 5
  },
  statLabel: { color: '#888', fontSize: 12, marginBottom: 5 },
  statValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },

  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },

  // Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: '48%', 
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tileTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  tileSubtitle: { color: '#666', fontSize: 11 },
});