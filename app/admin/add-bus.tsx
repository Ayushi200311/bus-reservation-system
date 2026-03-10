import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { API_BASE_URL } from '../../constants/theme';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddBus() {
  const router = useRouter();
  const params = useLocalSearchParams<{ bus_id?: string; bus_number?: string; operator?: string; type?: string; seats?: string }>();
  const isEditing = !!params.bus_id;
  const [busNumber, setBusNumber] = useState(params.bus_number || '');
  const [operator, setOperator] = useState(params.operator || '');
  const [type, setType] = useState(params.type || 'AC Sleeper (2+1)');
  const [seats, setSeats] = useState(params.seats || '30');

  const handleSave = async () => {
    if (!busNumber || !operator || !type || !seats) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const url = isEditing ? `${API_BASE_URL}/admin/bus/${params.bus_id}` : `${API_BASE_URL}/admin/add-bus`;
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bus_number: busNumber, operator, type, seats: parseInt(seats) })
      });

    const result = await response.json();

    if (response.ok) {
      Alert.alert("Success", "Bus Added Successfully!");
      router.back();
    } else {
      // 🚀 This will now show the actual database error if it fails
      Alert.alert("Error", result.error || "Failed to add bus");
    }
  } catch (e) { 
    Alert.alert("Error", "Network Error: Check if server is running"); 
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Bus' : 'Add New Bus'}</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>Bus Number</Text>
        <TextInput style={styles.input} placeholder="GJ-XX-XXXX" placeholderTextColor="#666" value={busNumber} onChangeText={setBusNumber} />

        <Text style={styles.label}>Operator Name</Text>
        <TextInput style={styles.input} placeholder="Travels Name" placeholderTextColor="#666" value={operator} onChangeText={setOperator} />

        <Text style={styles.label}>Bus Type</Text>
        <TextInput style={styles.input} value={type} onChangeText={setType} placeholderTextColor="#666" />

        <Text style={styles.label}>Total Seats</Text>
        <TextInput style={styles.input} value={seats} onChangeText={setSeats} keyboardType="numeric" placeholderTextColor="#666" />

        <TouchableOpacity style={styles.btn} onPress={handleSave}>
          <Text style={styles.btnText}>{isEditing ? 'Update Bus' : 'Save Bus'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  label: { color: '#aaa', marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  btn: { backgroundColor: '#FF1E1E', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});