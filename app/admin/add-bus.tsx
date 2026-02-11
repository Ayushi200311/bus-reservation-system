import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddBus() {
  const router = useRouter();
  const [busNumber, setBusNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [type, setType] = useState('AC Sleeper (2+1)');
  const [seats, setSeats] = useState('30');

  const handleSave = async () => {
    try {
      const response = await fetch('http://192.168.76.252:3000/admin/add-bus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bus_number: busNumber, operator, type, seats })
      });
      if (response.ok) {
        Alert.alert("Success", "Bus Added Successfully!");
        router.back();
      } else {
        Alert.alert("Error", "Failed to add bus");
      }
    } catch (e) { Alert.alert("Error", "Network Error"); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Bus</Text>
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
          <Text style={styles.btnText}>Save Bus</Text>
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