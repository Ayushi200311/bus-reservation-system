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

type City = {
  city_id: number;
  name: string;
  state?: string | null;
};

export default function ManageCities() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [stateName, setStateName] = useState('');

  const fetchCities = async () => {
    try {
      const res = await fetch('http://172.24.149.252:3000/admin/cities');
      const data = await res.json();
      setCities(data);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to load cities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAddCity = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'City name is required');
      return;
    }

    try {
      const res = await fetch('http://172.24.149.252:3000/admin/add-city', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, state: stateName }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        Alert.alert('Error', err.error || 'Failed to add city');
        return;
      }

      setModalVisible(false);
      setName('');
      setStateName('');
      fetchCities();
    } catch (e) {
      Alert.alert('Error', 'Network error');
    }
  };

  const renderItem = ({ item }: { item: City }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="location-outline" size={20} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cityName}>{item.name}</Text>
        {!!item.state && <Text style={styles.cityState}>{item.state}</Text>}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Cities</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={30} color="#4dffb8" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF1E1E" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={cities}
          keyExtractor={(item) => item.city_id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={renderItem}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add City</Text>

            <Text style={styles.label}>City Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Ahmedabad"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>State (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Gujarat"
              placeholderTextColor="#666"
              value={stateName}
              onChangeText={setStateName}
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
                onPress={handleAddCity}
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
  cityName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cityState: { color: '#888', fontSize: 12, marginTop: 2 },
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

