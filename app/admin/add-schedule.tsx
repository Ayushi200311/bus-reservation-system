import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/theme';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type Bus = { bus_id: number; bus_number: string };
type Route = { route_id: number; source: string; destination: string };

export default function AddSchedule() {
  const router = useRouter();
  const [busId, setBusId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [price, setPrice] = useState('1200');
  const [departure, setDeparture] = useState(new Date());
  const [arrival, setArrival] = useState(new Date(Date.now() + 8 * 60 * 60 * 1000));
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [currentField, setCurrentField] = useState<'dep' | 'arr'>('dep');
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/admin/buses`).then(r => r.json()).then(d => setBuses(d || [])).catch(() => {});
    fetch(`${API_BASE_URL}/admin/routes`).then(r => r.json()).then(d => setRoutes(d || [])).catch(() => {});
  }, []);

  const busItems = buses.map(b => ({ label: b.bus_number, value: String(b.bus_id) }));
  const routeItems = routes.map(r => ({ label: `${r.source} → ${r.destination}`, value: String(r.route_id) }));

  const formatForDB = (d: Date) => d.toISOString().slice(0, 19).replace('T', ' ');

  const onPickerChange = (e: any, selected?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selected) {
      if (currentField === 'dep') setDeparture(selected);
      else setArrival(selected);
    }
  };

  const publishSchedule = async () => {
    if (!busId || !routeId || !price) {
      Alert.alert("Validation", "Select bus, route and enter price");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/add-schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bus_id: parseInt(busId),
          route_id: parseInt(routeId),
          departure: formatForDB(departure),
          arrival: formatForDB(arrival),
          price: parseFloat(price),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", "Schedule published! Users can search for this trip.");
        router.back();
      } else {
        Alert.alert("Error", data.error || "Failed to add schedule");
      }
    } catch (e) {
      Alert.alert("Error", "Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Schedule</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
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

        <Text style={styles.label}>Route</Text>
        <View style={styles.pickerWrap}>
          <RNPickerSelect
            value={routeId}
            onValueChange={setRouteId}
            items={routeItems}
            placeholder={{ label: 'Select route...', value: null }}
            style={pickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <Text style={styles.label}>Departure</Text>
        <View style={styles.dateRow}>
          <TouchableOpacity style={styles.dateBtn} onPress={() => { setCurrentField('dep'); setPickerMode('date'); setShowPicker(true); }}>
            <Text style={styles.dateText}>{departure.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateBtn} onPress={() => { setCurrentField('dep'); setPickerMode('time'); setShowPicker(true); }}>
            <Text style={styles.dateText}>{departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Arrival</Text>
        <View style={styles.dateRow}>
          <TouchableOpacity style={styles.dateBtn} onPress={() => { setCurrentField('arr'); setPickerMode('date'); setShowPicker(true); }}>
            <Text style={styles.dateText}>{arrival.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateBtn} onPress={() => { setCurrentField('arr'); setPickerMode('time'); setShowPicker(true); }}>
            <Text style={styles.dateText}>{arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            value={currentField === 'dep' ? departure : arrival}
            mode={pickerMode}
            display="default"
            onChange={onPickerChange}
          />
        )}

        <Text style={styles.label}>Price (₹)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="e.g. 1200"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />

        <TouchableOpacity style={[styles.btn, loading && { opacity: 0.6 }]} onPress={publishSchedule} disabled={loading}>
          <Text style={styles.btnText}>{loading ? 'Publishing...' : 'Publish Schedule'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const pickerStyles = StyleSheet.create({
  inputIOS: { fontSize: 16, padding: 14, color: '#fff' },
  inputAndroid: { fontSize: 16, padding: 14, color: '#fff' },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
  label: { color: '#aaa', marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#111', color: '#fff', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  pickerWrap: { backgroundColor: '#111', borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 4 },
  dateRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  dateBtn: { flex: 1, backgroundColor: '#111', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  dateText: { color: '#fff', fontSize: 16 },
  btn: { backgroundColor: '#FF1E1E', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
