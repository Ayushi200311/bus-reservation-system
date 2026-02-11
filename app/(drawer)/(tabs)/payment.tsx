// import { Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';

// export default function PaymentScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
  
//   // Get the Final Amount passed from Passenger Details
//   const amount = params.amount || '0';
  
//   // Timer State (Starts at 15:00)
//   const [timeLeft, setTimeLeft] = useState(900); 

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* 1. HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <View style={{ alignItems: 'center', flex: 1 }}>
//             <Text style={styles.headerTitle}>Payment</Text>
//             <Text style={styles.headerSubtitle}>Total: ₹{amount}</Text>
//         </View>
//         <View style={styles.timerBadge}>
//             <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.content}>
        
//         {/* 2. UPI SECTION */}
//         <Text style={styles.sectionTitle}>Pay via any UPI app</Text>
//         <View style={styles.card}>
//             <TouchableOpacity style={styles.gpayOption}>
//                 <View style={styles.gpayIconBox}>
//                     {/* Placeholder for GPay Icon - using text/color for now */}
//                     <Text style={{color: '#fff', fontWeight:'bold'}}>GPay</Text>
//                 </View>
//                 <Text style={styles.optionText}>Google Pay</Text>
//             </TouchableOpacity>
            
//             <View style={styles.divider} />

//             <TouchableOpacity style={styles.row}>
//                 <View style={styles.addIconBox}>
//                     <Ionicons name="add" size={20} color="#FF1E1E" />
//                 </View>
//                 <View>
//                     <Text style={styles.optionTitle}>Enter New UPI ID</Text>
//                     <Text style={styles.optionSub}>Google pay, PhonePe, Paytm & More</Text>
//                 </View>
//             </TouchableOpacity>
//         </View>

//         {/* 3. CARD SECTION */}
//         <Text style={styles.sectionTitle}>Credit/Debit/ATM Card</Text>
//         <View style={styles.card}>
//             <TouchableOpacity style={styles.row}>
//                 <View style={styles.addIconBox}>
//                     <Ionicons name="add" size={20} color="#FF1E1E" />
//                 </View>
//                 <View>
//                     <Text style={styles.optionTitle}>Add New Card</Text>
//                     <Text style={styles.optionSub}>VISA, Mastercard, Rupay & more</Text>
//                 </View>
//             </TouchableOpacity>
//         </View>

//         {/* 4. MORE METHODS */}
//         <Text style={styles.sectionTitle}>More Payment Methods</Text>
//         <View style={styles.card}>
//             <TouchableOpacity style={styles.listOption}>
//                 <View style={styles.flexRow}>
//                     <Ionicons name="wallet-outline" size={22} color="#aaa" style={{ marginRight: 15 }} />
//                     <View>
//                         <Text style={styles.optionTitle}>Wallets</Text>
//                         <Text style={styles.optionSub}>Amazonpay, Paytm</Text>
//                     </View>
//                 </View>
//                 <Ionicons name="chevron-forward" size={20} color="#666" />
//             </TouchableOpacity>

//             <View style={styles.divider} />

//             <TouchableOpacity style={styles.listOption}>
//                 <View style={styles.flexRow}>
//                     <Ionicons name="business-outline" size={22} color="#aaa" style={{ marginRight: 15 }} />
//                     <View>
//                         <Text style={styles.optionTitle}>Net Banking</Text>
//                         <Text style={styles.optionSub}>Select from list of banks</Text>
//                     </View>
//                 </View>
//                 <Ionicons name="chevron-forward" size={20} color="#666" />
//             </TouchableOpacity>
//         </View>

//         {/* 5. FOOTER BADGES */}
//         <View style={styles.footerInfo}>
//             <Ionicons name="shield-checkmark-outline" size={18} color="#aaa" />
//             <Text style={styles.secureText}>100% Safe Payment Process</Text>
//         </View>
        
//       </ScrollView>

//       {/* PAY BUTTON */}
//       <View style={styles.footer}>
//           <TouchableOpacity style={styles.payBtn} onPress={() => alert("Payment Processing...")}>
//               <Text style={styles.payBtnText}>Pay ₹{amount}</Text>
//           </TouchableOpacity>
//       </View>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
  
//   header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
//   headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   headerSubtitle: { color: '#aaa', fontSize: 12 },
//   timerBadge: { backgroundColor: '#1a332a', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#2d8659' },
//   timerText: { color: '#4dffb8', fontSize: 12, fontWeight: 'bold' },

//   content: { padding: 16 },
//   sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  
//   card: { backgroundColor: '#111', borderRadius: 12, padding: 0, borderWidth: 1, borderColor: '#222', overflow: 'hidden' },
//   divider: { height: 1, backgroundColor: '#222', marginLeft: 16 },

//   row: { flexDirection: 'row', alignItems: 'center', padding: 16 },
//   flexRow: { flexDirection: 'row', alignItems: 'center' },
  
//   // GPay
//   gpayOption: { padding: 16, flexDirection: 'row', alignItems: 'center' },
//   gpayIconBox: { width: 40, height: 24, backgroundColor: '#333', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: '#444' },
//   optionText: { color: '#fff', fontSize: 14, fontWeight: '500' },

//   // Add New
//   addIconBox: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#330000', alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: '#660000' },
//   optionTitle: { color: '#fff', fontSize: 14, fontWeight: '500' },
//   optionSub: { color: '#666', fontSize: 12, marginTop: 2 },

//   // List Options
//   listOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },

//   // Footer Info
//   footerInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 100 },
//   secureText: { color: '#aaa', fontSize: 12, marginLeft: 8 },

//   footer: { position: 'absolute', bottom: 0, width: '100%', padding: 16, backgroundColor: '#000', borderTopWidth: 1, borderColor: '#222' },
//   payBtn: { backgroundColor: '#FF1E1E', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
//   payBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
// });



import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert,
  SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const amount = params.amount || '0';
  const pnr = params.pnr; // Get the PNR passed from the previous screen

  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); 

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // --- HANDLE PAYMENT ---
  const handlePayment = async () => {
    setLoading(true);

    // 1. SIMULATE NETWORK DELAY (2 Seconds)
    setTimeout(async () => {
      try {
        // 2. CALL BACKEND TO CONFIRM BOOKING
        // Replace with your IP Address
        const response = await fetch('http://172.24.149.252:3000/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pnr: pnr })
        });

        const result = await response.json();

        if (response.ok) {
          // 3. SUCCESS!
          setLoading(false);
          Alert.alert("Success", "Payment Received! Your Ticket is Booked.", [
            { 
              text: "View Ticket", 
              onPress: () => router.push({ pathname: '/ticket', params: { pnr: pnr } }) 
            }
          ]);
        } else {
          setLoading(false);
          Alert.alert("Error", "Payment Failed. Try again.");
        }

      } catch (error) {
        setLoading(false);
        console.error(error);
        Alert.alert("Error", "Network Error");
      }
    }, 2000); // 2000ms = 2 seconds delay
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={styles.headerTitle}>Payment</Text>
            <Text style={styles.headerSubtitle}>Total: ₹{amount}</Text>
        </View>
        <View style={styles.timerBadge}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* UPI SECTION */}
        <Text style={styles.sectionTitle}>Pay via any UPI app</Text>
        <View style={styles.card}>
            <TouchableOpacity style={styles.gpayOption} onPress={handlePayment}>
                <View style={styles.gpayIconBox}>
                    <Text style={{color: '#fff', fontWeight:'bold'}}>GPay</Text>
                </View>
                <Text style={styles.optionText}>Google Pay</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />

            <TouchableOpacity style={styles.row} onPress={handlePayment}>
                <View style={styles.addIconBox}>
                    <Ionicons name="add" size={20} color="#FF1E1E" />
                </View>
                <View>
                    <Text style={styles.optionTitle}>Enter New UPI ID</Text>
                    <Text style={styles.optionSub}>Google pay, PhonePe, Paytm & More</Text>
                </View>
            </TouchableOpacity>
        </View>

        {/* CARD SECTION */}
        <Text style={styles.sectionTitle}>Credit/Debit/ATM Card</Text>
        <View style={styles.card}>
            <TouchableOpacity style={styles.row} onPress={handlePayment}>
                <View style={styles.addIconBox}>
                    <Ionicons name="add" size={20} color="#FF1E1E" />
                </View>
                <View>
                    <Text style={styles.optionTitle}>Add New Card</Text>
                    <Text style={styles.optionSub}>VISA, Mastercard, Rupay & more</Text>
                </View>
            </TouchableOpacity>
        </View>

        {/* FOOTER INFO */}
        <View style={styles.footerInfo}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#aaa" />
            <Text style={styles.secureText}>100% Safe Payment Process</Text>
        </View>
        
      </ScrollView>

      {/* PAY BUTTON */}
      <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.payBtn, loading && { opacity: 0.7 }]} 
            onPress={handlePayment}
            disabled={loading}
          >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.payBtnText}>Pay ₹{amount}</Text>
              )}
          </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  headerSubtitle: { color: '#aaa', fontSize: 12 },
  timerBadge: { backgroundColor: '#1a332a', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#2d8659' },
  timerText: { color: '#4dffb8', fontSize: 12, fontWeight: 'bold' },

  content: { padding: 16 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  
  card: { backgroundColor: '#111', borderRadius: 12, padding: 0, borderWidth: 1, borderColor: '#222', overflow: 'hidden' },
  divider: { height: 1, backgroundColor: '#222', marginLeft: 16 },

  row: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  
  // GPay
  gpayOption: { padding: 16, flexDirection: 'row', alignItems: 'center' },
  gpayIconBox: { width: 40, height: 24, backgroundColor: '#333', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: '#444' },
  optionText: { color: '#fff', fontSize: 14, fontWeight: '500' },

  // Add New
  addIconBox: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#330000', alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: '#660000' },
  optionTitle: { color: '#fff', fontSize: 14, fontWeight: '500' },
  optionSub: { color: '#666', fontSize: 12, marginTop: 2 },

  // Footer Info
  footerInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 100 },
  secureText: { color: '#aaa', fontSize: 12, marginLeft: 8 },

  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 16, backgroundColor: '#000', borderTopWidth: 1, borderColor: '#222' },
  payBtn: { backgroundColor: '#FF1E1E', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  payBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});