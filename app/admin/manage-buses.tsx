import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/theme';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Bus = {
  bus_id: number;
  bus_number: string;
  operator: string;
  type: string;
  seats: number;
  status?: string;
};

export default function ManageBuses() {
  const router = useRouter();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBuses = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/buses`);
      const data = await res.json();
      setBuses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to load buses');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchBuses();
  }, [fetchBuses]);

  const handleDelete = (item: Bus) => {
    Alert.alert('Delete Bus', `Remove bus ${item.bus_number}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/admin/bus/${item.bus_id}`, { method: 'DELETE' });
            if (res.ok) fetchBuses();
            else {
              const err = await res.json().catch(() => ({}));
              Alert.alert('Error', err.error || 'Could not delete');
            }
          } catch (e) {
            Alert.alert('Error', 'Network error');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Bus }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="bus-outline" size={22} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.busNum}>{item.bus_number}</Text>
        <Text style={styles.meta}>{item.operator} • {item.type} • {item.seats} seats</Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push({ pathname: '/admin/add-bus', params: { bus_id: item.bus_id, bus_number: item.bus_number, operator: item.operator, type: item.type, seats: String(item.seats) } })}
        style={styles.iconBtn}
      >
        <Ionicons name="create-outline" size={22} color="#4dffb8" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item)} style={styles.iconBtn}>
        <Ionicons name="trash-outline" size={22} color="#FF1E1E" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fleet Manager</Text>
        <TouchableOpacity onPress={() => router.push('/admin/add-bus')}>
          <Ionicons name="add-circle" size={30} color="#4dffb8" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FF1E1E" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={buses}
          keyExtractor={(item) => String(item.bus_id)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchBuses(); }} tintColor="#FF1E1E" />}
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
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  busNum: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  meta: { color: '#888', fontSize: 12, marginTop: 2 },
  iconBtn: { padding: 8 },
});
