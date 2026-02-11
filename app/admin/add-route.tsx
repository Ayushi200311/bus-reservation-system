import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddRoute() {
  const router = useRouter();
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [km, setKm] = useState('');

  const handleSave = async () => {
    try {
      const response = await fetch('http://192.168.76.252:3000/admin/add-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, destination: dest, distance_km: km })
      });
      if (response.ok) {
        Alert.alert("Success", "Route Created!");
        router.back();
      }
    } catch (e) { Alert.alert("Error", "Network Error"); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Create Route</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>Source City</Text>
        <TextInput style={styles.input} placeholder="From City" placeholderTextColor="#666" value={source} onChangeText={setSource} />
        
        <Text style={styles.label}>Destination City</Text>
        <TextInput style={styles.input} placeholder="To City" placeholderTextColor="#666" value={dest} onChangeText={setDest} />
        
        <Text style={styles.label}>Distance (Km)</Text>
        <TextInput style={styles.input} placeholder="e.g. 350" placeholderTextColor="#666" keyboardType="numeric" value={km} onChangeText={setKm} />

        <TouchableOpacity style={styles.btn} onPress={handleSave}>
          <Text style={styles.btnText}>Add Route</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
// Use same styles as above
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  label: { color: '#aaa', marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  btn: { backgroundColor: '#4dffb8', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});