import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddSchedule() {
  const router = useRouter();
  
  // Use IDs directly for simplicity (In a real app, you'd use a Dropdown)
  const [busId, setBusId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [date, setDate] = useState('2026-02-15 22:00:00'); // Default Format
  const [price, setPrice] = useState('1200');

  const publishSchedule = async () => {
    try {
      // REPLACE IP
      const response = await fetch('http://192.168.76.252:3000/admin/add-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            bus_id: busId, 
            route_id: routeId, 
            departure: date, 
            arrival: '2026-02-16 06:00:00', // Dummy arrival for now
            price: price 
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Schedule Published! Users can now search for this.");
      } else {
        Alert.alert("Error", data.error);
      }
    } catch(e) { Alert.alert("Error", "Network Error"); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Add Schedule</Text>
      </View>

      <ScrollView contentContainerStyle={{padding: 20}}>
        <Text style={styles.label}>Bus ID (Check Database)</Text>
        <TextInput style={styles.input} value={busId} onChangeText={setBusId} placeholder="e.g. 1" placeholderTextColor="#666" keyboardType="numeric"/>

        <Text style={styles.label}>Route ID (Check Database)</Text>
        <TextInput style={styles.input} value={routeId} onChangeText={setRouteId} placeholder="e.g. 1" placeholderTextColor="#666" keyboardType="numeric"/>

        <Text style={styles.label}>Departure (YYYY-MM-DD HH:MM:SS)</Text>
        <TextInput style={styles.input} value={date} onChangeText={setDate} placeholderTextColor="#666"/>

        <Text style={styles.label}>Price (₹)</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholderTextColor="#666"/>

        <TouchableOpacity style={styles.btn} onPress={publishSchedule}>
            <Text style={styles.btnText}>Publish Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
  label: { color: '#aaa', marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#111', color: '#fff', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  btn: { backgroundColor: '#FF1E1E', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});