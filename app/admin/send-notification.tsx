import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { API_BASE_URL } from '../../constants/theme';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SendNotification() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert("Validation", "Title and message required");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/admin/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message })
      });
      const data = await response.json();
      Alert.alert("Sent", data.message);
      setTitle(''); setMessage('');
    } catch (e) { Alert.alert("Error", "Network Error"); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Send Broadcast</Text>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={styles.label}>Notification Title</Text>
        <TextInput style={styles.input} placeholder="e.g. 50% OFF Sale!" placeholderTextColor="#666" value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Message</Text>
        <TextInput style={[styles.input, { height: 100 }]} multiline placeholder="Enter details..." placeholderTextColor="#666" value={message} onChangeText={setMessage} />

        <TouchableOpacity style={styles.btn} onPress={handleSend}>
          <Text style={styles.btnText}>Send to All Users</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  label: { color: '#aaa', marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#333', textAlignVertical: 'top' },
  btn: { backgroundColor: '#FF5722', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});