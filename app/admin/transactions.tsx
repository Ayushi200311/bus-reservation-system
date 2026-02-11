import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Transactions() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.76.252:3000/admin/transactions')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(e => console.error(e));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.pnr}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{flex:1}}>
                <Text style={styles.pnr}>PNR: {item.pnr}</Text>
                <Text style={styles.date}>{new Date(item.booking_date).toDateString()}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.amount}>+ ₹{item.amount}</Text>
                <Text style={[styles.status, {color: item.status === 'Confirmed' ? '#4dffb8' : 'orange'}]}>{item.status}</Text>
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
  card: { flexDirection: 'row', backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 10, justifyContent: 'space-between', borderLeftWidth: 4, borderLeftColor: '#4dffb8' },
  pnr: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  date: { color: '#666', fontSize: 12, marginTop: 4 },
  amount: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  status: { fontSize: 12, marginTop: 4, textTransform: 'uppercase' }
});