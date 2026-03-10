import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/theme';
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
import RNPickerSelect from 'react-native-picker-select';

type BusStop = {
  stop_id: number;
  bus_id: number;
  type: string;
  location: string;
  time?: string;
  bus_number?: string;
};

type Bus = {
  bus_id: number;
  bus_number: string;
};

export default function ManageBusStops() {
  const router = useRouter();
  const [stops, setStops] = useState<BusStop[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingStop, setEditingStop] = useState<BusStop | null>(null);
  const [busId, setBusId] = useState<string>('');
  const [type, setType] = useState<'Boarding' | 'Dropping'>('Boarding');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('00:00');

  const fetchStops = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/busstops`);
      const data = await res.json();
      setStops(data);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to load bus stops');
    } finally {
      setLoading(false);
    }
  };

  const fetchBuses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/buses`);
      const data = await res.json();
      setBuses(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStops();
    fetchBuses();
  }, []);

  const busItems = buses.map((b) => ({ label: b.bus_number, value: String(b.bus_id) }));

  const handleSave = async () => {
    if (!location.trim()) {
      Alert.alert('Validation', 'Location is required');
      return;
    }
    if (!busId) {
      Alert.alert('Validation', 'Please select a bus');
      return;
    }

    try {
      const body = { bus_id: parseInt(busId), type, location: location.trim(), time };
      const url = editingStop ? `${API_BASE_URL}/admin/update-busstop/${editingStop.stop_id}` : `${API_BASE_URL}/admin/add-busstop`;
      const method = editingStop ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        Alert.alert('Error', err.error || 'Failed to save');
        return;
      }

      setModalVisible(false);
      setEditingStop(null);
      setBusId('');
      setLocation('');
      setTime('00:00');
      fetchStops();
    } catch (e) {
      Alert.alert('Error', 'Network error');
    }
  };

  const openEdit = (item: BusStop) => {
    setEditingStop(item);
    setBusId(String(item.bus_id));
    setType(item.type as 'Boarding' | 'Dropping');
    setLocation(item.location);
    setTime(item.time || '00:00');
    setModalVisible(true);
  };

  const handleDelete = (item: BusStop) => {
    Alert.alert('Delete Stop', `Remove stop at "${item.location}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/admin/delete-busstop/${item.stop_id}`, { method: 'DELETE' });
            if (res.ok) fetchStops();
            else Alert.alert('Error', 'Could not delete');
          } catch (e) {
            Alert.alert('Error', 'Network error');
          }
        },
      },
    ]);
  };

  const openAdd = () => {
    setEditingStop(null);
    setBusId('');
    setType('Boarding');
    setLocation('');
    setTime('00:00');
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: BusStop }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="bus-outline" size={20} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.stopName}>{item.location}</Text>
        <Text style={styles.meta}>{item.type} • Bus #{item.bus_number || item.bus_id} • {item.time || '--:--'}</Text>
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
        <Text style={styles.headerTitle}>Bus Stops</Text>
        <TouchableOpacity onPress={openAdd}>
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
            <Text style={styles.modalTitle}>{editingStop ? 'Edit Bus Stop' : 'Add Bus Stop'}</Text>

            <Text style={styles.label}>Bus</Text>
            <View style={styles.pickerWrap}>
              <RNPickerSelect
                value={busId}
                onValueChange={setBusId}
                items={busItems}
                placeholder={{ label: 'Select bus...', value: null }}
                style={pickerStyles}
                useNativeAndroidPickerStyle={false}
              />
            </View>

            <Text style={styles.label}>Type</Text>
            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[styles.typeBtn, type === 'Boarding' && styles.typeBtnActive]}
                onPress={() => setType('Boarding')}
              >
                <Text style={[styles.typeBtnText, type === 'Boarding' && { color: '#fff' }]}>Boarding</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, type === 'Dropping' && styles.typeBtnActive]}
                onPress={() => setType('Dropping')}
              >
                <Text style={[styles.typeBtnText, type === 'Dropping' && { color: '#fff' }]}>Dropping</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Location / Stop Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Nehrunagar Bus Stand"
              placeholderTextColor="#666"
              value={location}
              onChangeText={setLocation}
            />

            <Text style={styles.label}>Time (HH:MM)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 08:30"
              placeholderTextColor="#666"
              value={time}
              onChangeText={setTime}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#333' }]}
                onPress={() => { setModalVisible(false); setEditingStop(null); }}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#FF1E1E' }]} onPress={handleSave}>
                <Text style={styles.modalBtnText}>{editingStop ? 'Update' : 'Save'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const pickerStyles = StyleSheet.create({
  inputIOS: { fontSize: 16, padding: 14, color: '#fff' },
  inputAndroid: { fontSize: 16, padding: 14, color: '#fff' },
});

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
  meta: { color: '#888', fontSize: 12, marginTop: 2 },
  iconBtn: { padding: 8 },
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
  pickerWrap: {
    backgroundColor: '#000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  typeRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  typeBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  typeBtnActive: { backgroundColor: '#FF1E1E', borderColor: '#FF1E1E' },
  typeBtnText: { color: '#888' },
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
