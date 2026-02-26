import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BusListScreen() {
  const router = useRouter();
  const { fromCity, toCity, travelDate } = useLocalSearchParams();
  
  const [busResults, setBusResults] = useState([]); // Initialized as empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(
          `http://172.24.149.252:3000/search-buses?fromCity=${fromCity}&toCity=${toCity}&date=${travelDate}`
        );
        const data = await response.json();
        
        // ✅ FIX 1: Ensure we only set state if data is an array
        if (Array.isArray(data)) {
          setBusResults(data);
        } else {
          setBusResults([]); 
        }
      } catch (error) {
        console.error("Search Error:", error);
        setBusResults([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (fromCity && toCity) {
      fetchBuses();
    } else {
      setLoading(false);
    }
  }, [fromCity, toCity, travelDate]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.routeText}>{fromCity || 'N/A'} → {toCity || 'N/A'}</Text>
          <Text style={styles.dateText}>{travelDate || 'No Date'}</Text>
        </View>
      </View>

      {/* BUS LIST */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF1E1E" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          // ✅ FIX 2: Added a safety check for data
          data={busResults || []} 
          // ✅ FIX 3: Use schedule_id as the key to avoid duplicate key errors
          keyExtractor={(item) => item.schedule_id?.toString() || Math.random().toString()}
          ListEmptyComponent={
            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
              No buses found for this route.
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity 
              activeOpacity={0.9} 
              onPress={() => {
                router.push({
                  pathname: '/seat-selection',
                  params: {
                    fromCity,
                    toCity,
                    travelDate,
                    busName: item.bus_name,
                    scheduleId: item.schedule_id, // Important for Step 1
                    price: item.price,
                    departure: item.departure_time
                  }
                });
              }}
            >
              <View style={styles.card}>
                <View style={styles.rowBetween}>
                  <Text style={styles.busName}>{item.bus_name}</Text>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={14} color="#fff" />
                    <Text style={styles.ratingText}>4.0</Text> 
                  </View>
                </View>

                <Text style={styles.busType}>{item.bus_type}</Text>

                <View style={styles.timeRow}>
                  <Text style={styles.time}>{item.departure_time}</Text>
                  <View style={styles.durationContainer}>
                    <View style={styles.line} />
                    <Text style={styles.duration}>Direct</Text>
                    <View style={styles.line} />
                  </View>
                  <Text style={styles.time}>{item.arrival_time}</Text>
                </View>

                <View style={styles.rowBetween}>
                  <Text style={styles.seats}>{item.total_seats} Seats Left</Text>
                  <Text style={styles.price}>₹{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, marginTop: 30 },
  routeText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  dateText: { color: '#aaa', fontSize: 12 },
  card: { backgroundColor: '#111', borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#1f1f1f' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  busName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  rating: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF1E1E', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  ratingText: { color: '#fff', marginLeft: 4, fontSize: 12 },
  busType: { color: '#aaa', marginVertical: 6 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12 },
  durationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingHorizontal: 10 },
  line: { height: 1, backgroundColor: '#333', flex: 1 },
  time: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  duration: { color: '#aaa', fontSize: 10, marginHorizontal: 6 },
  seats: { color: '#FF1E1E', fontWeight: '600' },
  price: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});