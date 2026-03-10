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

type Route = {
  route_id: number;
  source: string;
  destination: string;
  distance: string;
  duration?: string;
};

export default function ManageRoutes() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRoutes = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/routes`);
      const data = await res.json();
      setRoutes(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to load routes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  const handleDelete = (item: Route) => {
    Alert.alert('Delete Route', `Remove route ${item.source} → ${item.destination}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/admin/delete-route/${item.route_id}`, { method: 'DELETE' });
            if (res.ok) fetchRoutes();
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

  const openEdit = (item: Route) => {
    router.push({
      pathname: '/admin/add-route',
      params: {
        route_id: item.route_id,
        source: item.source,
        destination: item.destination,
        distance: item.distance,
        duration: item.duration || '',
      },
    });
  };

  const renderItem = ({ item }: { item: Route }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="map-outline" size={22} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.route}>{item.source} → {item.destination}</Text>
        <Text style={styles.meta}>Distance: {item.distance} • Duration: {item.duration || 'N/A'}</Text>
      </View>
      <TouchableOpacity onPress={() => openEdit(item)} style={styles.iconBtn}>
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
        <Text style={styles.headerTitle}>Route Master</Text>
        <TouchableOpacity onPress={() => router.push('/admin/add-route')}>
          <Ionicons name="add-circle" size={30} color="#4dffb8" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FF1E1E" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={routes}
          keyExtractor={(item) => String(item.route_id)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchRoutes(); }} tintColor="#FF1E1E" />}
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
  route: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  meta: { color: '#888', fontSize: 12, marginTop: 2 },
  iconBtn: { padding: 8 },
});
