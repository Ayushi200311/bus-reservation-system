import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AllBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.76.252:3000/admin/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>All Bookings</Text>
      </View>
      {loading ? <ActivityIndicator size="large" color="#2196F3" style={{marginTop:50}}/> : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.pnr + item.seat_no}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.pnr}>#{item.pnr}</Text>
                <Text style={styles.seat}>Seat: {item.seat_no}</Text>
              </View>
              <Text style={styles.name}>{item.passenger_name}</Text>
              <Text style={styles.sub}>Bus: {item.bus_number}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  card: { backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  pnr: { color: '#2196F3', fontWeight: 'bold' },
  seat: { color: '#fff', fontWeight: 'bold' },
  name: { color: '#fff', fontSize: 16, marginTop: 5 },
  sub: { color: '#666', fontSize: 12, marginTop: 2 }
});