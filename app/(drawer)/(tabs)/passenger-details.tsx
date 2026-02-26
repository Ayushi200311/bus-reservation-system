// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// // --- TYPES ---
// interface Passenger {
//   seatId: string;
//   name: string;
//   age: string;
//   gender: 'male' | 'female';
// }

// export default function PassengerDetailsScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams();

//   // ============================================================
//   // 1. SAFE DATA PARSING (Fixes the Crash)
//   // ============================================================
//   const selectedSeatsString = typeof params.selectedSeats === 'string' ? params.selectedSeats : '';
  
//   // .filter(Boolean) removes empty strings caused by trailing commas like "L1,L2,"
//   const selectedSeatsArray = selectedSeatsString.split(',').filter(seat => seat.trim() !== '');

//   // If no seats found (should not happen), default to 0 to prevent crash
//   const seatCount = selectedSeatsArray.length;
  
//   const basePrice = Number(params.totalPrice) || 0; 
//   const insuranceFee = 19; 
//   const grandTotal = basePrice + insuranceFee;

//   // ============================================================
//   // 2. STATE
//   // ============================================================
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState(''); 
//   const [phone, setPhone] = useState(''); 
//   const [passengers, setPassengers] = useState<Passenger[]>([]);

//   // ============================================================
//   // 3. INITIALIZE FORMS & USER DATA
//   // ============================================================
//   useEffect(() => {
//     // A. Guard Clause: If no seats, go back (Prevents white screen crash)
//     if (seatCount === 0) {
//         Alert.alert("Error", "No seats selected. Please select seats first.", [
//             { text: "OK", onPress: () => router.back() }
//         ]);
//         return;
//     }

//     // B. Create Passenger Forms
//     const initialPassengers = selectedSeatsArray.map(seatId => ({
//       seatId: seatId,
//       name: '',
//       age: '',
//       gender: 'male' as const 
//     }));
//     setPassengers(initialPassengers);

//     // C. Get Logged In User Info
//     const fetchUserInfo = async () => {
//       try {
//         const storedPhone = await AsyncStorage.getItem('userPhone');
//         if (storedPhone) {
//           setPhone(storedPhone);
//           // Optional: Fetch email from backend
//           // const res = await fetch(`http://172.24.149.252:3000/profile?phone=${storedPhone}`);
//           // const data = await res.json();
//           // if(data.email) setEmail(data.email);
//         }
//       } catch (error) {
//         console.log("Storage Error:", error);
//       }
//     };
//     fetchUserInfo();
//   }, [selectedSeatsString]);

//   const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
//     const updated = [...passengers];
//     updated[index] = { ...updated[index], [field]: value };
//     setPassengers(updated);
//   };

//   // ============================================================
//   // 4. HELPER: DATE FORMATTER (Fixes "Seats Visible" Issue)
//   // ============================================================
//   const convertDateForBackend = (dateStr: string | string[] | undefined) => {
//     if (!dateStr || typeof dateStr !== 'string') return '2026-01-01'; // Default Fallback
    
//     // Check if it is already YYYY-MM-DD
//     if (dateStr.includes('-')) return dateStr;

//     // Convert "12 Jan 2026" OR "12/01/2026" to "2026-01-12"
//     // This example assumes input is "DD/MM/YYYY" or similar from your previous code
//     try {
//         // If your app uses slashes: 12/02/2026
//         if (dateStr.includes('/')) {
//             const [day, month, year] = dateStr.split('/');
//             return `${year}-${month}-${day}`;
//         }
//         // If your app uses text: 12 Jan 2026 (Simple parse)
//         const dateObj = new Date(dateStr);
//         return dateObj.toISOString().split('T')[0];
//     } catch (e) {
//         return dateStr; // Send as is if fail
//     }
//   };

//   // ============================================================
//   // 5. HANDLE PROCEED (BOOKING)
//   // ============================================================
//   const handleProceed = async () => {
//     if (!email || !phone) { Alert.alert("Missing Info", "Please enter contact details"); return; }
    
//     // Validate that passengers have names
//     const isFormValid = passengers.every(p => p.name.trim().length > 0 && p.age.trim().length > 0);
//     if (!isFormValid) { Alert.alert("Missing Info", "Please fill Name and Age for all passengers"); return; }

//     setLoading(true);

//     try {
//       // 1. Prepare Data
//       // 🔴 IMPORTANT: Use the params.busId, NOT params.busName
//       if (!params.busId) {
//           Alert.alert("Error", "Bus ID is missing. Cannot book.");
//           setLoading(false);
//           return;
//       }

//       // 🔴 REPLACES IP WITH YOUR OWN
//       const response = await fetch('http://172.24.149.252:3000/book-ticket', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userPhone: phone,
//           busId: params.busId, 
//           // Use the helper to ensure DB gets YYYY-MM-DD
//           travelDate: convertDateForBackend(params.travelDate), 
//           totalAmount: grandTotal,
//           passengers: passengers
//         })
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Success
//         router.push({
//           pathname: '/payment',
//           params: { 
//             amount: grandTotal, 
//             pnr: result.pnr 
//           }
//         });
//       } else {
//         Alert.alert("Booking Failed", result.error || "Unknown Error");
//       }
//     } catch (error) {
//       console.error("Booking Error:", error);
//       Alert.alert("Network Error", "Could not connect to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{ flex: 1 }}
//       >
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Passenger Details</Text>
//         </View>

//         <ScrollView contentContainerStyle={styles.scrollContent}>
          
//           {/* TRIP SUMMARY */}
//           <View style={styles.card}>
//             <View style={styles.rowBetween}>
//               <Text style={styles.tripRoute}>{params.fromCity} → {params.toCity}</Text>
//             </View>
//             <Text style={styles.tripSubInfo}>{seatCount} Seats ({selectedSeatsArray.join(', ')}) • {params.travelDate}</Text>
//             <Text style={styles.operatorName}>{params.busName}</Text>
//           </View>

//           {/* CONTACT DETAILS */}
//           <View style={styles.card}>
//             <Text style={styles.sectionTitle}>Contact Details</Text>
//             <View style={styles.inputRow}>
//                <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.inputIcon} />
//                <TextInput 
//                  style={styles.input} 
//                  value={email}
//                  onChangeText={setEmail}
//                  placeholder="Email ID"
//                  placeholderTextColor="#666"
//                  keyboardType="email-address"
//                />
//             </View>
//             <View style={[styles.inputRow, { marginTop: 12 }]}>
//                <Ionicons name="call-outline" size={20} color="#aaa" style={styles.inputIcon} />
//                <TextInput 
//                  style={styles.input} 
//                  value={phone}
//                  onChangeText={setPhone}
//                  placeholder="Mobile Number"
//                  placeholderTextColor="#666"
//                  keyboardType="phone-pad"
//                />
//             </View>
//           </View>

//           {/* PASSENGER FORMS */}
//           <View style={styles.card}>
//             <Text style={styles.sectionTitle}>Passenger Details</Text>
            
//             {passengers.map((p, index) => (
//               <View key={index} style={styles.passengerForm}>
//                 <View style={styles.seatBadgeRow}>
//                    <View style={styles.seatBadge}>
//                       <Ionicons name="person" size={12} color="#fff" />
//                       <Text style={styles.seatBadgeText}>Seat {p.seatId}</Text>
//                    </View>
//                 </View>

//                 <View style={styles.formRow}>
//                   <View style={{ flex: 2, marginRight: 10 }}>
//                     <Text style={styles.label}>Name</Text>
//                     <TextInput 
//                         style={styles.inputField} 
//                         value={p.name}
//                         onChangeText={(txt) => updatePassenger(index, 'name', txt)}
//                         placeholder="Name"
//                         placeholderTextColor="#666"
//                     />
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text style={styles.label}>Age</Text>
//                     <TextInput 
//                         style={styles.inputField} 
//                         value={p.age}
//                         onChangeText={(txt) => updatePassenger(index, 'age', txt)}
//                         placeholder="Age"
//                         placeholderTextColor="#666"
//                         keyboardType="numeric"
//                         maxLength={2}
//                     />
//                   </View>
//                 </View>

//                 <View style={styles.genderRow}>
//                     <TouchableOpacity 
//                         style={[styles.genderBtn, p.gender === 'male' && styles.genderBtnActive]}
//                         onPress={() => updatePassenger(index, 'gender', 'male')}
//                     >
//                         <Text style={[styles.genderText, p.gender === 'male' && styles.genderTextActive]}>Male</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity 
//                         style={[styles.genderBtn, p.gender === 'female' && styles.genderBtnActive]}
//                         onPress={() => updatePassenger(index, 'gender', 'female')}
//                     >
//                         <Text style={[styles.genderText, p.gender === 'female' && styles.genderTextActive]}>Female</Text>
//                     </TouchableOpacity>
//                 </View>
//                 {index < passengers.length - 1 && <View style={styles.divider} />}
//               </View>
//             ))}
//           </View>

//           <View style={{ height: 100 }} /> 
//         </ScrollView>

//         {/* FOOTER */}
//         <View style={styles.footer}>
//             <View>
//                 <Text style={styles.totalPrice}>₹{grandTotal}</Text>
//                 <Text style={styles.taxText}>{seatCount} Seats + Tax</Text>
//             </View>
//             <TouchableOpacity 
//                 style={[styles.proceedBtn, loading && {opacity: 0.7}]} 
//                 onPress={handleProceed}
//                 disabled={loading}
//             >
//                 {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.proceedText}>Proceed to Pay</Text>}
//             </TouchableOpacity>
//         </View>

//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
//   headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
//   scrollContent: { padding: 16 },
//   card: { backgroundColor: '#111', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#222' },
//   rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   divider: { height: 1, backgroundColor: '#333', marginVertical: 12 },
//   tripRoute: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   detailsLink: { color: '#FF1E1E', fontSize: 12 },
//   tripSubInfo: { color: '#aaa', fontSize: 12, marginTop: 4 },
//   operatorName: { color: '#888', fontSize: 12, marginTop: 2 },
//   sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
//   inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222', borderRadius: 8, paddingHorizontal: 12 },
//   inputIcon: { marginRight: 10 },
//   input: { flex: 1, color: '#fff', paddingVertical: 12, fontSize: 14 },
//   passengerForm: { marginBottom: 8 },
//   seatBadgeRow: { flexDirection: 'row', marginBottom: 10 },
//   seatBadge: { backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
//   seatBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
//   formRow: { flexDirection: 'row', marginBottom: 12 },
//   label: { color: '#888', fontSize: 12, marginBottom: 6 },
//   inputField: { backgroundColor: '#222', color: '#fff', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, fontSize: 14 },
//   genderRow: { flexDirection: 'row', marginTop: 4 },
//   genderBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderWidth: 1, borderColor: '#333', borderRadius: 6, marginHorizontal: 4 },
//   genderBtnActive: { backgroundColor: '#FF1E1E', borderColor: '#FF1E1E' },
//   genderText: { color: '#666', fontSize: 12 },
//   genderTextActive: { color: '#fff', fontWeight: 'bold' },
//   footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#111', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: '#333' },
//   totalPrice: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
//   taxText: { color: '#666', fontSize: 10 },
//   proceedBtn: { backgroundColor: '#FF1E1E', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 8 },
//   proceedText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });



import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Passenger {
  seatId: string;
  name: string;
  age: string;
  gender: 'male' | 'female';
}

export default function PassengerDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse Seats
  const selectedSeatsString = typeof params.selectedSeats === 'string' ? params.selectedSeats : '';
  const selectedSeatsArray = selectedSeatsString.split(',').filter(seat => seat.trim() !== '');
  const seatCount = selectedSeatsArray.length;
  
  const basePrice = Number(params.totalPrice) || 0; 
  const insuranceFee = 19; 
  const grandTotal = basePrice + insuranceFee;

  // State
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  // ============================================================
  // FETCH USER DATA (Phone & Email)
  // ============================================================
  useEffect(() => {
    if (seatCount === 0) {
        Alert.alert("Error", "No seats selected.", [{ text: "OK", onPress: () => router.back() }]);
        return;
    }

    const initialPassengers = selectedSeatsArray.map(seatId => ({
      seatId: seatId,
      name: '',
      age: '',
      gender: 'male' as const 
    }));
    setPassengers(initialPassengers);

    const fetchUserData = async () => {
      try {
        const storedPhone = await AsyncStorage.getItem('userPhone');
        if (storedPhone) {
          setPhone(storedPhone);
          // Fetch full profile (email) from backend
          const res = await fetch(`http://172.24.149.252:3000/profile?phone=${storedPhone}`);
          const data = await res.json();
          if(data.email) setEmail(data.email);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };
    fetchUserData();
  }, [selectedSeatsString]);

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleProceed = async () => {
    if (!email || !phone) { Alert.alert("Missing Info", "Please enter contact details"); return; }
    const isFormValid = passengers.every(p => p.name.trim().length > 0 && p.age.trim().length > 0);
    if (!isFormValid) { Alert.alert("Missing Info", "Please fill details for all passengers"); return; }

    // Ensure we have the unique trip ID coming from previous screens
    const rawScheduleId = params.scheduleId;
    const scheduleId = Array.isArray(rawScheduleId) ? rawScheduleId[0] : rawScheduleId;
    if (!scheduleId) {
      Alert.alert(
        "System Error",
        "Trip information is missing. Please go back and select the bus again."
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://172.24.149.252:3000/book-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhone: phone,
          scheduleId: scheduleId,
          totalAmount: grandTotal,
          passengers: passengers
        })
      });

      const result = await response.json();
      if (response.ok) {
        router.push({
          pathname: '/payment',
          params: { amount: grandTotal, pnr: result.pnr }
        });
      } else {
        Alert.alert("Booking Failed", result.error);
      }
    } catch (error) {
      Alert.alert("Network Error", "Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Passenger Details</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* TRIP SUMMARY */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={{flex: 1}}>
                <Text style={styles.tripRoute}>{params.fromCity} → {params.toCity}</Text>
                <Text style={styles.tripSubInfo}>{params.travelDate} • {seatCount} Seat(s)</Text>
              </View>
              <View style={styles.priceBadge}>
                <Text style={styles.priceBadgeText}>₹{grandTotal}</Text>
              </View>
            </View>
          </View>

          {/* CONTACT INFO */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.inputGroup}>
                <Ionicons name="mail-outline" size={18} color="#FF1E1E" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email Address"
                  placeholderTextColor="#555"
                />
            </View>
            <View style={styles.inputGroup}>
                <Ionicons name="call-outline" size={18} color="#FF1E1E" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Mobile Number"
                  placeholderTextColor="#555"
                  keyboardType="phone-pad"
                />
            </View>
          </View>

          {/* PASSENGER CARDS */}
          {passengers.map((p, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.passengerHeader}>
                 <Text style={styles.passengerTitle}>Passenger {index + 1}</Text>
                 <View style={styles.seatIndicator}>
                   <Text style={styles.seatText}>Seat {p.seatId}</Text>
                 </View>
              </View>

              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput 
                style={styles.formInput} 
                value={p.name}
                onChangeText={(txt) => updatePassenger(index, 'name', txt)}
                placeholder="Enter full name"
                placeholderTextColor="#555"
              />

              <View style={styles.rowBetween}>
                <View style={{ flex: 1, marginRight: 15 }}>
                  <Text style={styles.inputLabel}>Age</Text>
                  <TextInput 
                    style={styles.formInput} 
                    value={p.age}
                    onChangeText={(txt) => updatePassenger(index, 'age', txt)}
                    placeholder="24"
                    placeholderTextColor="#555"
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flex: 1.5 }}>
                  <Text style={styles.inputLabel}>Gender</Text>
                  <View style={styles.genderContainer}>
                    <TouchableOpacity 
                      style={[styles.genderOption, p.gender === 'male' && styles.genderActive]}
                      onPress={() => updatePassenger(index, 'gender', 'male')}
                    >
                      <Text style={[styles.genderTxt, p.gender === 'male' && styles.genderTxtActive]}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.genderOption, p.gender === 'female' && styles.genderActive]}
                      onPress={() => updatePassenger(index, 'gender', 'female')}
                    >
                      <Text style={[styles.genderTxt, p.gender === 'female' && styles.genderTxtActive]}>Female</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}

          <View style={{ height: 120 }} /> 
        </ScrollView>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerPrice}>₹{grandTotal}</Text>
            <Text style={styles.footerSub}>Inclusive of all taxes</Text>
          </View>
          <TouchableOpacity 
            style={[styles.payBtn, loading && {opacity: 0.8}]} 
            onPress={handleProceed}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.payBtnText}>Proceed to Pay</Text>}
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: '#000' },
  backBtn: { padding: 8, backgroundColor: '#111', borderRadius: 10 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  scrollContent: { padding: 16 },
  
  // Summary Card
  summaryCard: { backgroundColor: '#FF1E1E', borderRadius: 15, padding: 20, marginBottom: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tripRoute: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tripSubInfo: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  priceBadge: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  priceBadgeText: { color: '#FF1E1E', fontWeight: 'bold', fontSize: 16 },

  // Generic Card
  card: { backgroundColor: '#111', borderRadius: 15, padding: 18, marginBottom: 15, borderWidth: 1, borderColor: '#222' },
  sectionTitle: { color: '#fff', fontSize: 15, fontWeight: '600', marginBottom: 15 },
  
  // Inputs
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 15, marginBottom: 10, height: 50 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: '#fff', fontSize: 14 },
  
  // Passenger Form
  passengerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  passengerTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  seatIndicator: { backgroundColor: '#222', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  seatText: { color: '#FF1E1E', fontSize: 11, fontWeight: 'bold' },
  inputLabel: { color: '#888', fontSize: 12, marginBottom: 8 },
  formInput: { backgroundColor: '#1a1a1a', borderRadius: 10, padding: 12, color: '#fff', fontSize: 14, marginBottom: 15 },
  
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  genderContainer: { flexDirection: 'row', backgroundColor: '#1a1a1a', borderRadius: 10, padding: 4 },
  genderOption: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  genderActive: { backgroundColor: '#FF1E1E' },
  genderTxt: { color: '#666', fontSize: 12, fontWeight: '600' },
  genderTxtActive: { color: '#fff' },

  // Footer
  footer: { 
    position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#111', 
    padding: 20, paddingBottom: Platform.OS === 'ios' ? 35 : 20, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderColor: '#222', borderTopLeftRadius: 20, borderTopRightRadius: 20
  },
  footerPrice: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  footerSub: { color: '#666', fontSize: 10, marginTop: 2 },
  payBtn: { backgroundColor: '#FF1E1E', paddingVertical: 14, paddingHorizontal: 25, borderRadius: 12 },
  payBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});