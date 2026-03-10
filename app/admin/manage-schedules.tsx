// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     FlatList,
//     Modal,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View
// } from 'react-native';

// export default function ManageSchedules() {
//   const router = useRouter();
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Modal State
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);

//   // Form State
//   const [busId, setBusId] = useState('');
//   const [routeId, setRouteId] = useState('');
//   const [departure, setDeparture] = useState('');
//   const [arrival, setArrival] = useState('');
//   const [price, setPrice] = useState('');

//   // --- 1. FETCH DATA ---
//   const fetchSchedules = async () => {
//     try {
//       // REPLACE IP
//       const response = await fetch('http://192.168.76.252:3000/admin/schedules');
//       const data = await response.json();
//       setSchedules(data);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSchedules();
//   }, []);

//   // --- 2. HANDLE DELETE ---
//   const handleDelete = (id) => {
//     Alert.alert("Delete Trip?", "This action cannot be undone.", [
//       { text: "Cancel", style: "cancel" },
//       { 
//         text: "Delete", 
//         style: "destructive", 
//         onPress: async () => {
//           try {
//             await fetch(`http://192.168.76.252:3000/admin/schedule/${id}`, { method: 'DELETE' });
//             fetchSchedules(); // Refresh list
//           } catch(e) { Alert.alert("Error", "Network Error"); }
//         }
//       }
//     ]);
//   };

//   // --- 3. HANDLE SUBMIT (ADD OR EDIT) ---
//   const handleSubmit = async () => {
//     const url = isEditing 
//       ? `http://192.168.76.252:3000/admin/schedule/${selectedId}` // Edit URL
//       : `http://192.168.76.252:3000/admin/add-schedule`;           // Add URL

//     const method = isEditing ? 'PUT' : 'POST';

//     // For Edit, we only need Price/Time. For Add, we need Bus/Route too.
//     const body = isEditing 
//       ? { price, departure, arrival }
//       : { bus_id: busId, route_id: routeId, departure, arrival, price };

//     try {
//       const response = await fetch(url, {
//         method: method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body)
//       });

//       if (response.ok) {
//         Alert.alert("Success", isEditing ? "Schedule Updated!" : "Schedule Added!");
//         setModalVisible(false);
//         fetchSchedules(); // Refresh List
//       } else {
//         Alert.alert("Error", "Operation Failed");
//       }
//     } catch (e) { Alert.alert("Error", "Network Error"); }
//   };

//   // --- 4. OPEN EDIT MODAL ---
//   const openEdit = (item) => {
//     setIsEditing(true);
//     setSelectedId(item.schedule_id);
//     setPrice(item.price.toString());
//     setDeparture(item.departure);
//     setArrival(item.arrival);
//     setModalVisible(true);
//   };

//   // --- 5. OPEN ADD MODAL ---
//   const openAdd = () => {
//     setIsEditing(false);
//     setBusId(''); setRouteId(''); setPrice(''); setDeparture(''); setArrival('');
//     setModalVisible(true);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.row}>
//         <View>
//             <Text style={styles.route}>{item.source} ➝ {item.destination}</Text>
//             <Text style={styles.bus}>{item.bus_number} ({item.operator})</Text>
//             <Text style={styles.date}>{new Date(item.departure).toDateString()}</Text>
//             <Text style={styles.time}>{new Date(item.departure).toLocaleTimeString()} - {new Date(item.arrival).toLocaleTimeString()}</Text>
//         </View>
//         <Text style={styles.price}>₹{item.price}</Text>
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.actionRow}>
//         <TouchableOpacity style={styles.editBtn} onPress={() => openEdit(item)}>
//             <Ionicons name="create-outline" size={20} color="#fff" />
//             <Text style={styles.btnLabel}>Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.delBtn} onPress={() => handleDelete(item.schedule_id)}>
//             <Ionicons name="trash-outline" size={20} color="#FF1E1E" />
//             <Text style={[styles.btnLabel, {color: '#FF1E1E'}]}>Delete</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
//         <Text style={styles.headerTitle}>Manage Schedules</Text>
//         <TouchableOpacity onPress={openAdd}>
//             <Ionicons name="add-circle" size={32} color="#4dffb8" />
//         </TouchableOpacity>
//       </View>

//       {loading ? <ActivityIndicator size="large" color="#FF1E1E" style={{marginTop: 50}}/> : (
//         <FlatList
//           data={schedules}
//           keyExtractor={(item) => item.schedule_id.toString()}
//           renderItem={renderItem}
//           contentContainerStyle={{ padding: 16 }}
//         />
//       )}

//       {/* --- ADD/EDIT MODAL --- */}
//       <Modal visible={modalVisible} animationType="slide" transparent={true}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>{isEditing ? "Edit Trip" : "Add New Trip"}</Text>

//             {/* Show Bus/Route IDs only when Adding new */}
//             {!isEditing && (
//               <>
//                 <TextInput style={styles.input} placeholder="Bus ID" placeholderTextColor="#666" value={busId} onChangeText={setBusId} keyboardType="numeric"/>
//                 <TextInput style={styles.input} placeholder="Route ID" placeholderTextColor="#666" value={routeId} onChangeText={setRouteId} keyboardType="numeric"/>
//               </>
//             )}

//             <TextInput style={styles.input} placeholder="Departure (YYYY-MM-DD HH:MM:SS)" placeholderTextColor="#666" value={departure} onChangeText={setDeparture}/>
//             <TextInput style={styles.input} placeholder="Arrival (YYYY-MM-DD HH:MM:SS)" placeholderTextColor="#666" value={arrival} onChangeText={setArrival}/>
//             <TextInput style={styles.input} placeholder="Price" placeholderTextColor="#666" value={price} onChangeText={setPrice} keyboardType="numeric"/>

//             <View style={styles.modalActions}>
//                 <TouchableOpacity style={[styles.modalBtn, {backgroundColor: '#333'}]} onPress={() => setModalVisible(false)}>
//                     <Text style={styles.modalBtnText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.modalBtn, {backgroundColor: '#FF1E1E'}]} onPress={handleSubmit}>
//                     <Text style={styles.modalBtnText}>{isEditing ? "Update" : "Save"}</Text>
//                 </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   header: { flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent:'space-between', borderBottomWidth: 1, borderColor: '#222' },
//   headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

//   card: { backgroundColor: '#111', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
//   row: { flexDirection: 'row', justifyContent: 'space-between' },
//   route: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   bus: { color: '#aaa', fontSize: 12, marginTop: 2 },
//   date: { color: '#888', fontSize: 12, marginTop: 8 },
//   time: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
//   price: { color: '#4dffb8', fontSize: 18, fontWeight: 'bold' },

//   divider: { height: 1, backgroundColor: '#333', marginVertical: 12 },

//   actionRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
//   editBtn: { flexDirection: 'row', alignItems: 'center' },
//   delBtn: { flexDirection: 'row', alignItems: 'center' },
//   btnLabel: { color: '#fff', marginLeft: 5, fontSize: 14, fontWeight: '500' },

//   // Modal
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
//   modalContent: { backgroundColor: '#1a1a1a', padding: 20, borderRadius: 12 },
//   modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   input: { backgroundColor: '#000', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
//   modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
//   modalBtn: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
//   modalBtnText: { color: '#fff', fontWeight: 'bold' }
// });


import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_BASE_URL } from '../../constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function ManageSchedules() {
  const router = useRouter();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Form State
  const [busId, setBusId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [price, setPrice] = useState('');

  // --- DATE PICKER STATE ---
  const [departure, setDeparture] = useState(new Date());
  const [arrival, setArrival] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [currentField, setCurrentField] = useState<'dep' | 'arr'>('dep');

  // --- 1. FETCH DATA ---
  const fetchSchedules = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/schedules`);
      const data = await response.json();
      setSchedules(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // --- DATE PICKER HANDLER ---
  const onDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowPicker(false); // Close picker on Android

    if (selectedDate) {
      if (currentField === 'dep') setDeparture(selectedDate);
      else setArrival(selectedDate);
    }
  };

  const showDatepicker = (field: 'dep' | 'arr', mode: 'date' | 'time') => {
    setCurrentField(field);
    setPickerMode(mode);
    setShowPicker(true);
  };

  // Helper to format Date for SQL (YYYY-MM-DD HH:MM:SS)
  const formatForDB = (dateObj) => {
    return dateObj.toISOString().slice(0, 19).replace('T', ' ');
  };

  // --- 2. HANDLE DELETE ---
  const handleDelete = (id) => {
    Alert.alert("Delete Trip?", "Cannot be undone.", [
      { text: "Cancel" },
      {
        text: "Delete", style: "destructive", onPress: async () => {
          try {
            await fetch(`${API_BASE_URL}/admin/schedule/${id}`, { method: 'DELETE' });
            fetchSchedules();
          } catch (e) { Alert.alert("Error", "Network Error"); }
        }
      }
    ]);
  };

  // --- 3. HANDLE SUBMIT ---
  const handleSubmit = async () => {
    const url = isEditing
      ? `${API_BASE_URL}/admin/schedule/${selectedId}`
      : `${API_BASE_URL}/admin/add-schedule`;

    const method = isEditing ? 'PUT' : 'POST';

    const body = isEditing
      ? { price, departure: formatForDB(departure), arrival: formatForDB(arrival) }
      : { bus_id: busId, route_id: routeId, departure: formatForDB(departure), arrival: formatForDB(arrival), price };

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        Alert.alert("Success", "Saved!");
        setModalVisible(false);
        fetchSchedules();
      } else {
        Alert.alert("Error", "Operation Failed");
      }
    } catch (e) { Alert.alert("Error", "Network Error"); }
  };

  // --- 4. OPEN EDIT ---
  const openEdit = (item) => {
    setIsEditing(true);
    setSelectedId(item.schedule_id);
    setPrice(item.price.toString());
    setDeparture(new Date(item.departure)); // Parse existing DB date
    setArrival(new Date(item.arrival));
    setModalVisible(true);
  };

  // --- 5. OPEN ADD ---
  const openAdd = () => {
    setIsEditing(false);
    setBusId(''); setRouteId(''); setPrice('');
    setDeparture(new Date()); setArrival(new Date());
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.route}>{item.source} ➝ {item.destination}</Text>
          <Text style={styles.bus}>{item.bus_number} ({item.operator})</Text>
          <Text style={styles.date}>{new Date(item.departure).toDateString()}</Text>
          <Text style={styles.time}>{new Date(item.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.editBtn} onPress={() => openEdit(item)}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.btnLabel}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.delBtn} onPress={() => handleDelete(item.schedule_id)}>
          <Ionicons name="trash-outline" size={20} color="#FF1E1E" />
          <Text style={[styles.btnLabel, { color: '#FF1E1E' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Schedules</Text>
        <TouchableOpacity onPress={openAdd}>
          <Ionicons name="add-circle" size={32} color="#4dffb8" />
        </TouchableOpacity>
      </View>

      {loading ? <ActivityIndicator size="large" color="#FF1E1E" style={{ marginTop: 50 }} /> : (
        <FlatList data={schedules} keyExtractor={(item) => item.schedule_id.toString()} renderItem={renderItem} contentContainerStyle={{ padding: 16 }} />
      )}

      {/* --- MODAL --- */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isEditing ? "Edit Trip" : "Add New Trip"}</Text>

            {!isEditing && (
              <>
                <TextInput style={styles.input} placeholder="Bus ID" placeholderTextColor="#666" value={busId} onChangeText={setBusId} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Route ID" placeholderTextColor="#666" value={routeId} onChangeText={setRouteId} keyboardType="numeric" />
              </>
            )}

            {/* DATE PICKERS */}
            <Text style={styles.label}>Departure Time</Text>
            <View style={styles.dateRow}>
              <TouchableOpacity style={styles.dateBtn} onPress={() => showDatepicker('dep', 'date')}>
                <Text style={styles.dateText}>{departure.toLocaleDateString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateBtn} onPress={() => showDatepicker('dep', 'time')}>
                <Text style={styles.dateText}>{departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Arrival Time</Text>
            <View style={styles.dateRow}>
              <TouchableOpacity style={styles.dateBtn} onPress={() => showDatepicker('arr', 'date')}>
                <Text style={styles.dateText}>{arrival.toLocaleDateString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateBtn} onPress={() => showDatepicker('arr', 'time')}>
                <Text style={styles.dateText}>{arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Price (₹)</Text>
            <TextInput style={styles.input} placeholder="Price" placeholderTextColor="#666" value={price} onChangeText={setPrice} keyboardType="numeric" />

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#333' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#FF1E1E' }]} onPress={handleSubmit}>
                <Text style={styles.modalBtnText}>{isEditing ? "Update" : "Save"}</Text>
              </TouchableOpacity>
            </View>

            {/* ACTUAL PICKER COMPONENT */}
            {showPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={currentField === 'dep' ? departure : arrival}
                mode={pickerMode}
                is24Hour={false}
                display="default"
                onChange={onDateChange}
              />
            )}

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#111', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  route: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bus: { color: '#aaa', fontSize: 12, marginTop: 2 },
  date: { color: '#888', fontSize: 12, marginTop: 8 },
  time: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  price: { color: '#4dffb8', fontSize: 18, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#333', marginVertical: 12 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
  editBtn: { flexDirection: 'row', alignItems: 'center' },
  delBtn: { flexDirection: 'row', alignItems: 'center' },
  btnLabel: { color: '#fff', marginLeft: 5, fontSize: 14, fontWeight: '500' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1a1a1a', padding: 20, borderRadius: 12 },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#000', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  label: { color: '#aaa', fontSize: 12, marginBottom: 5, marginTop: 5 },

  // Date Picker Buttons
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dateBtn: { backgroundColor: '#333', padding: 10, borderRadius: 8, width: '48%', alignItems: 'center' },
  dateText: { color: '#fff', fontWeight: 'bold' },

  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  modalBtn: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  modalBtnText: { color: '#fff', fontWeight: 'bold' }
});