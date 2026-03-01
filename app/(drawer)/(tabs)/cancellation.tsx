import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Ticket {
  id: string;
  source: string;
  destination: string;
  date: string;
  time: string;
  busName: string;
  seatNo: string;
  pnr: string;
  status: string;
  amount: number;
}

export default function CancellationScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchCancellable();
  }, []);

  const fetchCancellable = async () => {
    try {
      const phone = await AsyncStorage.getItem('userPhone');
      if (!phone) {
        setLoading(false);
        return;
      }
      const res = await fetch(`http://172.24.149.252:3000/my-bookings?phone=${phone}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        const mapped: Ticket[] = data
          .filter((b: any) => b.status === 'Confirmed')
          .map((b: any) => ({
            id: b.booking_id.toString(),
            source: b.from_city,
            destination: b.to_city,
            date: b.date_only,
            time: b.dep_time,
            busName: b.bus_name,
            seatNo: b.seat_no,
            pnr: b.pnr,
            status: b.status,
            amount: b.amount,
          }));
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingOnly = mapped.filter((t) => {
          const d = new Date(t.date);
          if (!isNaN(d.getTime())) {
            d.setHours(0, 0, 0, 0);
            return d >= today;
          }
          // If parsing fails, keep it cancellable by default
          return true;
        });

        setTickets(upcomingOnly);
      }
    } catch (e) {
      console.error('Cancellation fetch error', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (ticket: Ticket) => {
    Alert.alert(
      'Cancellation',
      'Online cancellation is not enabled in this demo.\nPlease contact support with your PNR.',
      [{ text: 'OK' }],
    );
  };

  const renderItem = ({ item }: { item: Ticket }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.busName}>{item.busName}</Text>
        <Text style={styles.pnr}>PNR: {item.pnr}</Text>
      </View>
      <Text style={styles.route}>{item.source} → {item.destination}</Text>
      <Text style={styles.date}>{item.date} • {item.time}</Text>

      <View style={styles.detailRow}>
        <Text style={styles.seat}>Seat: {item.seatNo}</Text>
        <Text style={styles.amount}>₹{item.amount}</Text>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.policyBadge}>
          <Ionicons name="information-circle-outline" size={14} color="#FFB74D" />
          <Text style={styles.policyText}>Cancellation charges may apply</Text>
        </View>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => handleCancel(item)}>
          <Text style={styles.cancelText}>Request Cancellation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cancellations</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF1E1E" />
        </View>
      ) : (
        <>
          <FlatList
            data={tickets}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={tickets.length ? styles.list : styles.emptyList}
            ListEmptyComponent={
              <View style={styles.center}>
                <Ionicons name="receipt-outline" size={50} color="#333" />
                <Text style={styles.emptyText}>No bookings available for cancellation</Text>
              </View>
            }
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Cancellation Policy (Demo)</Text>
            <Text style={styles.infoLine}>• Free cancellation up to 24 hours before departure.</Text>
            <Text style={styles.infoLine}>• Within 24 hours, operator charges may apply.</Text>
            <Text style={styles.infoLine}>• Contact customer support for full assistance.</Text>
          </View>
        </>
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 },
  list: { padding: 16, paddingBottom: 100 },
  emptyList: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: {
    backgroundColor: '#111',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#222',
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  busName: { color: '#fff', fontSize: 15, fontWeight: '600' },
  pnr: { color: '#ccc', fontSize: 12 },
  route: { color: '#ddd', fontSize: 14, marginTop: 2 },
  date: { color: '#888', fontSize: 12, marginTop: 2 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  seat: { color: '#aaa', fontSize: 13 },
  amount: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  policyBadge: { flexDirection: 'row', alignItems: 'center' },
  policyText: { color: '#FFB74D', fontSize: 11, marginLeft: 4 },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF1E1E',
  },
  cancelText: { color: '#FF1E1E', fontSize: 12, fontWeight: '600' },
  emptyText: { color: '#666', marginTop: 10 },
  infoBox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#222',
    backgroundColor: '#050505',
  },
  infoTitle: { color: '#fff', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  infoLine: { color: '#888', fontSize: 12, marginTop: 2 },
});

