import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function UsersList() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://192.168.76.252:3000/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(e => console.error(e));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Registered Users</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.user_id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconBox}><Ionicons name="person" size={20} color="#fff" /></View>
            <View>
                <Text style={styles.name}>{item.name || 'Unknown'}</Text>
                <Text style={styles.sub}>{item.phone}</Text>
                <Text style={styles.sub}>{item.email}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  card: { flexDirection: 'row', backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 10, alignItems: 'center' },
  iconBox: { width: 40, height: 40, backgroundColor: '#333', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  name: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sub: { color: '#888', fontSize: 12 }
});