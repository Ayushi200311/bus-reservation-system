// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';
// import {
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// // 1. Dummy Data matching your image
// const NOTIFICATIONS = [
//   {
//     id: '1',
//     title: 'Ticketing 20% Off',
//     description: 'Lorem ipsum dolor sit amet, consectetuer adip...',
//     time: '1:45 PM',
//     type: 'offer'
//   },
//   {
//     id: '2',
//     title: 'Discount Max 10%',
//     description: 'Lorem ipsum dolor sit amet, consectetuer adip...',
//     time: '10:20 AM',
//     type: 'offer'
//   },
//   {
//     id: '3',
//     title: 'Sunday Offer',
//     description: 'Get extra points on Sunday rides...',
//     time: '03:45 PM',
//     type: 'info'
//   },
//   {
//     id: '4',
//     title: 'Star Sunday Offer',
//     description: 'Exclusive deal for star members...',
//     time: '07:20 AM',
//     type: 'offer'
//   },
//   {
//     id: '5',
//     title: 'Biggest Offer',
//     description: 'Flat 50% off on your next booking!',
//     time: '11:45 AM',
//     type: 'offer'
//   },
//   {
//     id: '6',
//     title: 'Black Friday',
//     description: 'Don\'t miss out on the biggest sale.',
//     time: '10:20 PM',
//     type: 'alert'
//   },
// ];

// export default function NotificationsScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
      
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Notifications</Text>
//       </View>

//       {/* List */}
//       <FlatList
//         data={NOTIFICATIONS}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContent}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             {/* Left: Icon Circle */}
//             <View style={styles.iconContainer}>
//               <Ionicons name="notifications" size={24} color="#fff" />
//             </View>

//             {/* Middle: Text Info */}
//             <View style={styles.textContainer}>
//               <View style={styles.rowBetween}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <Text style={styles.time}>{item.time}</Text>
//               </View>
//               <Text style={styles.description} numberOfLines={2}>
//                 {item.description}
//               </Text>
//             </View>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000', // Dark Background
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderColor: '#222',
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   listContent: {
//     padding: 16,
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#111', // Dark Card
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 12,
//     alignItems: 'center',
//     // Border for subtle separation
//     borderWidth: 1,
//     borderColor: '#222',
//   },
//   iconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#FF1E1E', // Green color from your image
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   time: {
//     color: '#888',
//     fontSize: 12,
//   },
//   description: {
//     color: '#aaa',
//     fontSize: 12,
//     lineHeight: 16,
//   },
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

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'Booking' | 'Offer' | 'System';
  created_at: string;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    try {
      const phone = await AsyncStorage.getItem('userPhone');
      if (!phone) return;

      // REPLACE WITH YOUR IP
      const response = await fetch(`http://172.24.149.252:3000/notifications?phone=${phone}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getIcon = (type: string) => {
    if (type === 'Offer') return 'pricetag';
    if (type === 'Booking') return 'ticket';
    return 'notifications';
  };

  const getColor = (type: string) => {
    if (type === 'Offer') return '#FFD700'; // Gold
    if (type === 'Booking') return '#4dffb8'; // Green
    return '#aaa'; // Grey
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
         <Ionicons name={getIcon(item.type) as any} size={24} color={getColor(item.type)} />
      </View>
      <View style={styles.textContainer}>
         <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{new Date(item.created_at).toLocaleDateString()}</Text>
         </View>
         <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* List */}
      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#FF1E1E" /></View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
             <RefreshControl refreshing={refreshing} onRefresh={() => {setRefreshing(true); fetchNotifications()}} tintColor="#fff"/>
          }
          ListEmptyComponent={
            <View style={styles.center}>
                <Ionicons name="notifications-off-outline" size={50} color="#333" />
                <Text style={{color: '#666', marginTop: 10}}>No notifications yet</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 28,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
  
  list: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },

  card: { 
    flexDirection: 'row', 
    backgroundColor: '#111', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#222' 
  },
  iconContainer: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#1a1a1a', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  textContainer: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  time: { color: '#666', fontSize: 12 },
  message: { color: '#aaa', fontSize: 14, lineHeight: 20 }
});