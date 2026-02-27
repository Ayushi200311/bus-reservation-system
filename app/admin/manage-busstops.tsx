import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type BusStop = {
  stop_id: number;
  city_name?: string;
  stop_name: string;
  landmark?: string | null;
};

export default function ManageBusStops() {
  const router = useRouter();
  const [stops, setStops] = useState<BusStop[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [cityName, setCityName] = useState('');
  const [stopName, setStopName] = useState('');
  const [landmark, setLandmark] = useState('');

  const fetchStops = async () => {
    try {
      const res = await fetch('http://192.168.76.252:3000/admin/busstops');
      const data = await res.json();
      setStops(data);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to load bus stops');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStops();
  }, []);

  const handleAddStop = async () => {
    if (!stopName.trim()) {
      Alert.alert('Validation', 'Stop name is required');
      return;
    }

    try {
      const res = await fetch('http://192.168.76.252:3000/admin/add-busstop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city_name: cityName,
          stop_name: stopName,
          landmark,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        Alert.alert('Error', err.error || 'Failed to add bus stop');
        return;
      }

      setModalVisible(false);
      setCityName('');
      setStopName('');
      setLandmark('');
      fetchStops();
    } catch (e) {
      Alert.alert('Error', 'Network error');
    }
  };

  const renderItem = ({ item }: { item: BusStop }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="bus-outline" size={20} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.stopName}>{item.stop_name}</Text>
        {!!item.city_name && <Text style={styles.cityName}>{item.city_name}</Text>}
        {!!item.landmark && <Text style={styles.landmark}>{item.landmark}</Text>}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Bus Stops</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={30} color="#4dffb8" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF1E1E" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={stops}
          keyExtractor={(item) => item.stop_id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={renderItem}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Bus Stop</Text>

            <Text style={styles.label}>City Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Ahmedabad"
              placeholderTextColor="#666"
              value={cityName}
              onChangeText={setCityName}
            />

            <Text style={styles.label}>Stop Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Nehrunagar Bus Stop"
              placeholderTextColor="#666"
              value={stopName}
              onChangeText={setStopName}
            />

            <Text style={styles.label}>Landmark (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Near XYZ Mall"
              placeholderTextColor="#666"
              value={landmark}
              onChangeText={setLandmark}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#333' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#FF1E1E' }]}
                onPress={handleAddStop}
              >
                <Text style={styles.modalBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  stopName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cityName: { color: '#4dffb8', fontSize: 12, marginTop: 2 },
  landmark: { color: '#888', fontSize: 12, marginTop: 2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: { color: '#aaa', marginBottom: 8, marginTop: 10 },
  input: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  modalBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalBtnText: { color: '#fff', fontWeight: 'bold' },
});

