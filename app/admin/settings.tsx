import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminSettings() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
        {text: "Cancel"},
        {text: "Logout", style: 'destructive', onPress: () => router.replace('/login')}
    ]);
  };

  const MenuItem = ({ title, icon, color = "#fff" }) => (
    <TouchableOpacity style={styles.item} onPress={() => Alert.alert("Info", "Feature Coming Soon")}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={[styles.itemText, {color}]}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#666" style={{marginLeft:'auto'}} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Settings</Text>
      </View>
      <View style={{padding: 20}}>
        <MenuItem title="Manage Admin Users" icon="people-circle-outline" />
        <MenuItem title="Database Backup" icon="cloud-upload-outline" />
        <MenuItem title="App Version: v1.0.0" icon="information-circle-outline" color="#aaa" />
        
        <TouchableOpacity style={[styles.item, {marginTop: 40, borderColor: '#FF1E1E'}]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FF1E1E" />
            <Text style={[styles.itemText, {color: '#FF1E1E'}]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#111', borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  itemText: { marginLeft: 15, fontSize: 16, fontWeight: '500' }
});