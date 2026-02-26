// // // // import { Ionicons } from '@expo/vector-icons';
// // // // import { useLocalSearchParams, useRouter } from 'expo-router';
// // // // import React, { useEffect, useState } from 'react';
// // // // import {
// // // //     KeyboardAvoidingView,
// // // //     Platform,
// // // //     SafeAreaView,
// // // //     ScrollView,
// // // //     StyleSheet,
// // // //     Text,
// // // //     TextInput,
// // // //     TouchableOpacity,
// // // //     View
// // // // } from 'react-native';

// // // // // --- TYPES ---
// // // // interface Passenger {
// // // //   seatId: string;
// // // //   name: string;
// // // //   age: string;
// // // //   gender: 'male' | 'female';
// // // // }

// // // // export default function PassengerDetailsScreen() {
// // // //   const router = useRouter();
// // // //   const params = useLocalSearchParams();

// // // //   // 1. Parse Data passed from previous screens
// // // //   const selectedSeatsArray = typeof params.selectedSeats === 'string' 
// // // //     ? params.selectedSeats.split(',') 
// // // //     : [];
  
// // // //   const seatCount = selectedSeatsArray.length;
// // // //   // Ensure totalPrice is treated as a number
// // // //   const basePrice = Number(params.totalPrice) || 0;
// // // //   // Add a small insurance fee (example from your image: ₹19)
// // // //   const insuranceFee = 19; 
// // // //   const grandTotal = basePrice + insuranceFee;

// // // //   // 2. State for Form Fields
// // // //   const [email, setEmail] = useState('shrirajeng86@gmail.com'); // Dummy default
// // // //   const [phone, setPhone] = useState('9106811293'); // Dummy default
// // // //   const [passengers, setPassengers] = useState<Passenger[]>([]);

// // // //   // Initialize passenger slots based on selected seats
// // // //   useEffect(() => {
// // // //     const initialPassengers = selectedSeatsArray.map(seatId => ({
// // // //       seatId: seatId,
// // // //       name: '',
// // // //       age: '',
// // // //       gender: 'male' as const // Default gender
// // // //     }));
// // // //     setPassengers(initialPassengers);
// // // //   }, []);

// // // //   // Update specific passenger details
// // // //   const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
// // // //     const updated = [...passengers];
// // // //     updated[index] = { ...updated[index], [field]: value };
// // // //     setPassengers(updated);
// // // //   };

// // // //   const handleProceed = () => {
// // // //     // Basic Validation
// // // //     if (!email || !phone) {
// // // //         alert("Please enter contact details");
// // // //         return;
// // // //     }
// // // //     // Check if all passenger names are filled
// // // //     const isFormValid = passengers.every(p => p.name.length > 0 && p.age.length > 0);
// // // //     if (!isFormValid) {
// // // //         alert("Please fill details for all passengers");
// // // //         return;
// // // //     }

// // // //     console.log("Booking Confirmed!", {
// // // //         trip: params,
// // // //         contact: { email, phone },
// // // //         passengers
// // // //     });

// // // //     alert(`Booking Successful!\nAmount: ₹${grandTotal}`);
// // // //     // Here you would normally navigate to a Payment Gateway or Success Screen
// // // //     // router.push('/payment');
// // // //   };

// // // //   return (
// // // //     <SafeAreaView style={styles.container}>
// // // //       <KeyboardAvoidingView 
// // // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // //         style={{ flex: 1 }}
// // // //       >
// // // //         <View style={styles.header}>
// // // //           <TouchableOpacity onPress={() => router.back()}>
// // // //             <Ionicons name="arrow-back" size={24} color="#fff" />
// // // //           </TouchableOpacity>
// // // //           <Text style={styles.headerTitle}>Passenger Details</Text>
// // // //         </View>

// // // //         <ScrollView contentContainerStyle={styles.scrollContent}>
// // // //           {/* 1. TRIP SUMMARY CARD */}
// // // //           <View style={styles.card}>
// // // //             <View style={styles.rowBetween}>
// // // //               <Text style={styles.tripRoute}>
// // // //                 {params.fromCity} → {params.toCity}
// // // //               </Text>
// // // //               <TouchableOpacity>
// // // //                 <Text style={styles.detailsLink}>Details &gt;</Text>
// // // //               </TouchableOpacity>
// // // //             </View>
// // // //             <Text style={styles.tripSubInfo}>
// // // //               {seatCount} Traveller(s) • {params.travelDate}
// // // //             </Text>
// // // //             <Text style={styles.operatorName}>{params.busName}</Text>
            
// // // //             <View style={styles.divider} />
            
// // // //             <View style={styles.pointRow}>
// // // //                <Text style={styles.pointLabel}>Boarding:</Text>
// // // //                <Text style={styles.pointValue}>{params.boardingPoint || 'Not Selected'}</Text>
// // // //             </View>
// // // //             <View style={styles.pointRow}>
// // // //                <Text style={styles.pointLabel}>Dropping:</Text>
// // // //                <Text style={styles.pointValue}>{params.droppingPoint || 'Not Selected'}</Text>
// // // //             </View>
// // // //           </View>

// // // //           {/* 2. CONTACT DETAILS */}
// // // //           <View style={styles.card}>
// // // //             <Text style={styles.sectionTitle}>Contact Details</Text>
// // // //             <Text style={styles.sectionSub}>Your ticket info will be sent here</Text>
            
// // // //             <View style={styles.inputRow}>
// // // //                <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.inputIcon} />
// // // //                <TextInput 
// // // //                  style={styles.input} 
// // // //                  value={email}
// // // //                  onChangeText={setEmail}
// // // //                  placeholder="Email ID"
// // // //                  placeholderTextColor="#666"
// // // //                  keyboardType="email-address"
// // // //                />
// // // //             </View>
            
// // // //             <View style={[styles.inputRow, { marginTop: 12 }]}>
// // // //                <Ionicons name="call-outline" size={20} color="#aaa" style={styles.inputIcon} />
// // // //                <TextInput 
// // // //                  style={styles.input} 
// // // //                  value={phone}
// // // //                  onChangeText={setPhone}
// // // //                  placeholder="Mobile Number"
// // // //                  placeholderTextColor="#666"
// // // //                  keyboardType="phone-pad"
// // // //                />
// // // //             </View>
// // // //           </View>

// // // //           {/* 3. PASSENGER DETAILS (Dynamic List) */}
// // // //           <View style={styles.card}>
// // // //             <Text style={styles.sectionTitle}>Passenger Details</Text>
            
// // // //             {passengers.map((p, index) => (
// // // //               <View key={index} style={styles.passengerForm}>
// // // //                 <View style={styles.seatBadgeRow}>
// // // //                    <View style={styles.seatBadge}>
// // // //                       <Ionicons name="person" size={12} color="#fff" />
// // // //                       <Text style={styles.seatBadgeText}>Seat {p.seatId}</Text>
// // // //                    </View>
// // // //                 </View>

// // // //                 <View style={styles.formRow}>
// // // //                   {/* Name Input */}
// // // //                   <View style={{ flex: 2, marginRight: 10 }}>
// // // //                     <Text style={styles.label}>Full Name</Text>
// // // //                     <TextInput 
// // // //                         style={styles.input} 
// // // //                         value={p.name}
// // // //                         onChangeText={(txt) => updatePassenger(index, 'name', txt)}
// // // //                         placeholder="Name"
// // // //                         placeholderTextColor="#666"
// // // //                     />
// // // //                   </View>

// // // //                   {/* Age Input */}
// // // //                   <View style={{ flex: 1 }}>
// // // //                     <Text style={styles.label}>Age</Text>
// // // //                     <TextInput 
// // // //                         style={styles.input} 
// // // //                         value={p.age}
// // // //                         onChangeText={(txt) => updatePassenger(index, 'age', txt)}
// // // //                         placeholder="Age"
// // // //                         placeholderTextColor="#666"
// // // //                         keyboardType="numeric"
// // // //                         maxLength={2}
// // // //                     />
// // // //                   </View>
// // // //                 </View>

// // // //                 {/* Gender Toggle */}
// // // //                 <View style={styles.genderRow}>
// // // //                     <TouchableOpacity 
// // // //                         style={[styles.genderBtn, p.gender === 'male' && styles.genderBtnActive]}
// // // //                         onPress={() => updatePassenger(index, 'gender', 'male')}
// // // //                     >
// // // //                         <Text style={[styles.genderText, p.gender === 'male' && styles.genderTextActive]}>Male</Text>
// // // //                     </TouchableOpacity>
                    
// // // //                     <TouchableOpacity 
// // // //                         style={[styles.genderBtn, p.gender === 'female' && styles.genderBtnActive]}
// // // //                         onPress={() => updatePassenger(index, 'gender', 'female')}
// // // //                     >
// // // //                         <Text style={[styles.genderText, p.gender === 'female' && styles.genderTextActive]}>Female</Text>
// // // //                     </TouchableOpacity>
// // // //                 </View>

// // // //                 {/* Divider if not last item */}
// // // //                 {index < passengers.length - 1 && <View style={styles.divider} />}
// // // //               </View>
// // // //             ))}
// // // //           </View>

// // // //           {/* 4. INSURANCE (Visual Only) */}
// // // //           <View style={[styles.card, { backgroundColor: '#1a2233' }]}> 
// // // //              <View style={styles.rowBetween}>
// // // //                  <Text style={[styles.sectionTitle, { color: '#4da6ff' }]}>Secure your trip</Text>
// // // //                  <Text style={{ color: '#aaa', fontSize: 12 }}>only at ₹19</Text>
// // // //              </View>
// // // //              <View style={{ flexDirection: 'row', marginTop: 10 }}>
// // // //                  <View style={{ marginRight: 20 }}>
// // // //                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>1.5x</Text>
// // // //                      <Text style={{ color: '#aaa', fontSize: 10 }}>Refund</Text>
// // // //                  </View>
// // // //                  <View>
// // // //                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>100%</Text>
// // // //                      <Text style={{ color: '#aaa', fontSize: 10 }}>Money Back</Text>
// // // //                  </View>
// // // //              </View>
// // // //           </View>

// // // //           <View style={{ height: 100 }} /> 
// // // //         </ScrollView>

// // // //         {/* 5. FOOTER */}
// // // //         <View style={styles.footer}>
// // // //             <View>
// // // //                 <Text style={styles.totalPrice}>₹{grandTotal}</Text>
// // // //                 <Text style={styles.taxText}>
// // // //                   Includes ₹{insuranceFee} insurance
// // // //                 </Text>
// // // //             </View>
// // // //             <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
// // // //                 <Text style={styles.proceedText}>Proceed to Pay</Text>
// // // //             </TouchableOpacity>
// // // //         </View>

// // // //       </KeyboardAvoidingView>
// // // //     </SafeAreaView>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, backgroundColor: '#000' },
  
// // // //   // Header
// // // //   header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
// // // //   headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16 },

// // // //   scrollContent: { padding: 16 },

// // // //   // Card Styles
// // // //   card: { backgroundColor: '#111', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#222' },
// // // //   rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
// // // //   divider: { height: 1, backgroundColor: '#333', marginVertical: 12 },

// // // //   // Trip Info
// // // //   tripRoute: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// // // //   detailsLink: { color: '#FF1E1E', fontSize: 12 },
// // // //   tripSubInfo: { color: '#aaa', fontSize: 12, marginTop: 4 },
// // // //   operatorName: { color: '#888', fontSize: 12, marginTop: 2 },
// // // //   pointRow: { flexDirection: 'row', marginTop: 4 },
// // // //   pointLabel: { color: '#666', fontSize: 12, width: 70 },
// // // //   pointValue: { color: '#ddd', fontSize: 12, fontWeight: '500' },

// // // //   // Contact Info
// // // //   sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
// // // //   sectionSub: { color: '#666', fontSize: 12, marginBottom: 12 },
// // // //   inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222', borderRadius: 8, paddingHorizontal: 12 },
// // // //   inputIcon: { marginRight: 10 },
// // // //   input: { flex: 1, color: '#fff', paddingVertical: 12, fontSize: 14 },

// // // //   // Passenger Form
// // // //   passengerForm: { marginBottom: 8 },
// // // //   seatBadgeRow: { flexDirection: 'row', marginBottom: 10 },
// // // //   seatBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
// // // //   seatBadgeText: { color: '#fff', fontSize: 10, marginLeft: 4, fontWeight: 'bold' },
  
// // // //   formRow: { flexDirection: 'row', marginBottom: 12 },
// // // //   label: { color: '#888', fontSize: 12, marginBottom: 6 },
  
// // // //   genderRow: { flexDirection: 'row', marginTop: 4 },
// // // //   genderBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderWidth: 1, borderColor: '#333', borderRadius: 6, marginHorizontal: 4 },
// // // //   genderBtnActive: { backgroundColor: '#FF1E1E', borderColor: '#FF1E1E' },
// // // //   genderText: { color: '#666', fontSize: 12 },
// // // //   genderTextActive: { color: '#fff', fontWeight: 'bold' },

// // // //   // Footer
// // // //   footer: { 
// // // //     position: 'absolute', bottom: 0, width: '100%', 
// // // //     backgroundColor: '#111', padding: 16, flexDirection: 'row', 
// // // //     justifyContent: 'space-between', alignItems: 'center',
// // // //     borderTopWidth: 1, borderColor: '#333'
// // // //   },
// // // //   totalPrice: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
// // // //   taxText: { color: '#666', fontSize: 10 },
// // // //   proceedBtn: { backgroundColor: '#FF1E1E', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 8 },
// // // //   proceedText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// // // // });


// // // import { Ionicons } from '@expo/vector-icons';
// // // import { useLocalSearchParams, useRouter } from 'expo-router';
// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //     KeyboardAvoidingView,
// // //     Platform,
// // //     SafeAreaView,
// // //     ScrollView,
// // //     StyleSheet,
// // //     Text,
// // //     TextInput,
// // //     TouchableOpacity,
// // //     View
// // // } from 'react-native';

// // // // --- TYPES ---
// // // interface Passenger {
// // //   seatId: string;
// // //   name: string;
// // //   age: string;
// // //   gender: 'male' | 'female';
// // // }

// // // export default function PassengerDetailsScreen() {
// // //   const router = useRouter();
// // //   const params = useLocalSearchParams();

// // //   // 1. Parse Data passed from previous screens
// // //   // We check if 'selectedSeats' is a string before splitting
// // //   const selectedSeatsString = typeof params.selectedSeats === 'string' ? params.selectedSeats : '';
// // //   const selectedSeatsArray = selectedSeatsString ? selectedSeatsString.split(',') : [];
  
// // //   const seatCount = selectedSeatsArray.length;
  
// // //   // 2. Money Logic
// // //   // Convert string price to number (e.g., "1200" -> 1200)
// // //   const basePrice = Number(params.totalPrice) || 0;
// // //   const insuranceFee = 19; 
// // //   const grandTotal = basePrice + insuranceFee;

// // //   // 3. State for Form Fields
// // //   const [email, setEmail] = useState('shrirajeng86@gmail.com'); 
// // //   const [phone, setPhone] = useState('9106811293'); 
// // //   const [passengers, setPassengers] = useState<Passenger[]>([]);

// // //   // 4. Initialize Forms: Create a form for EACH selected seat
// // //   useEffect(() => {
// // //     if (selectedSeatsArray.length > 0) {
// // //       const initialPassengers = selectedSeatsArray.map(seatId => ({
// // //         seatId: seatId,
// // //         name: '',
// // //         age: '',
// // //         gender: 'male' as const 
// // //       }));
// // //       setPassengers(initialPassengers);
// // //     }
// // //   }, [selectedSeatsString]);

// // //   // Helper to update a specific passenger's data
// // //   const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
// // //     const updated = [...passengers];
// // //     updated[index] = { ...updated[index], [field]: value };
// // //     setPassengers(updated);
// // //   };

// // //   const handleProceed = () => {
// // //     // A. Validate Contact Info
// // //     if (!email || !phone) {
// // //         alert("Please enter contact details");
// // //         return;
// // //     }
    
// // //     // B. Validate Passenger Info (Dynamic Check)
// // //     // This checks if EVERY passenger form has a Name and Age
// // //     const isFormValid = passengers.every(p => p.name.trim().length > 0 && p.age.trim().length > 0);
    
// // //     if (!isFormValid) {
// // //         alert("Please fill name and age for ALL passengers");
// // //         return;
// // //     }

// // //     // C. Navigate to Payment
// // //     console.log("Navigating to Payment with Total:", grandTotal);
    
// // //     router.push({
// // //       pathname: '/payment',
// // //       params: {
// // //         amount: grandTotal, // Calculates correct total for 1, 2, or 5 people
// // //         bookingId: 'BK' + Math.floor(Math.random() * 90000)
// // //       }
// // //     });
// // //   };

// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //       <KeyboardAvoidingView 
// // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // //         style={{ flex: 1 }}
// // //       >
// // //         <View style={styles.header}>
// // //           <TouchableOpacity onPress={() => router.back()}>
// // //             <Ionicons name="arrow-back" size={24} color="#fff" />
// // //           </TouchableOpacity>
// // //           <Text style={styles.headerTitle}>Passenger Details</Text>
// // //         </View>

// // //         <ScrollView contentContainerStyle={styles.scrollContent}>
// // //           {/* TRIP SUMMARY */}
// // //           <View style={styles.card}>
// // //             <View style={styles.rowBetween}>
// // //               <Text style={styles.tripRoute}>
// // //                 {params.fromCity} → {params.toCity}
// // //               </Text>
// // //               <Text style={styles.detailsLink}>Details &gt;</Text>
// // //             </View>
// // //             <Text style={styles.tripSubInfo}>
// // //               {seatCount} Traveller(s) • {params.travelDate}
// // //             </Text>
// // //             <Text style={styles.operatorName}>{params.busName}</Text>
            
// // //             <View style={styles.divider} />
            
// // //             <View style={styles.pointRow}>
// // //                <Text style={styles.pointLabel}>Boarding:</Text>
// // //                <Text style={styles.pointValue}>{params.boardingPoint || 'Not Selected'}</Text>
// // //             </View>
// // //             <View style={styles.pointRow}>
// // //                <Text style={styles.pointLabel}>Dropping:</Text>
// // //                <Text style={styles.pointValue}>{params.droppingPoint || 'Not Selected'}</Text>
// // //             </View>
// // //           </View>

// // //           {/* CONTACT DETAILS */}
// // //           <View style={styles.card}>
// // //             <Text style={styles.sectionTitle}>Contact Details</Text>
// // //             <Text style={styles.sectionSub}>Your ticket info will be sent here</Text>
            
// // //             <View style={styles.inputRow}>
// // //                <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.inputIcon} />
// // //                <TextInput 
// // //                  style={styles.input} 
// // //                  value={email}
// // //                  onChangeText={setEmail}
// // //                  placeholder="Email ID"
// // //                  placeholderTextColor="#666"
// // //                  keyboardType="email-address"
// // //                />
// // //             </View>
// // //             <View style={[styles.inputRow, { marginTop: 12 }]}>
// // //                <Ionicons name="call-outline" size={20} color="#aaa" style={styles.inputIcon} />
// // //                <TextInput 
// // //                  style={styles.input} 
// // //                  value={phone}
// // //                  onChangeText={setPhone}
// // //                  placeholder="Mobile Number"
// // //                  placeholderTextColor="#666"
// // //                  keyboardType="phone-pad"
// // //                />
// // //             </View>
// // //           </View>

// // //           {/* DYNAMIC PASSENGER LIST */}
// // //           <View style={styles.card}>
// // //             <Text style={styles.sectionTitle}>Passenger Details</Text>
            
// // //             {passengers.map((p, index) => (
// // //               <View key={index} style={styles.passengerForm}>
// // //                 <View style={styles.seatBadgeRow}>
// // //                    <View style={styles.seatBadge}>
// // //                       <Ionicons name="person" size={12} color="#fff" />
// // //                       <Text style={styles.seatBadgeText}>Seat {p.seatId}</Text>
// // //                    </View>
// // //                 </View>

// // //                 <View style={styles.formRow}>
// // //                   {/* Name Input */}
// // //                   <View style={{ flex: 2, marginRight: 10 }}>
// // //                     <Text style={styles.label}>Full Name</Text>
// // //                     <TextInput 
// // //                         style={styles.input} 
// // //                         value={p.name}
// // //                         onChangeText={(txt) => updatePassenger(index, 'name', txt)}
// // //                         placeholder="Enter Name"
// // //                         placeholderTextColor="#666"
// // //                     />
// // //                   </View>

// // //                   {/* Age Input */}
// // //                   <View style={{ flex: 1 }}>
// // //                     <Text style={styles.label}>Age</Text>
// // //                     <TextInput 
// // //                         style={styles.input} 
// // //                         value={p.age}
// // //                         onChangeText={(txt) => updatePassenger(index, 'age', txt)}
// // //                         placeholder="Age"
// // //                         placeholderTextColor="#666"
// // //                         keyboardType="numeric"
// // //                         maxLength={2}
// // //                     />
// // //                   </View>
// // //                 </View>

// // //                 {/* Gender Toggle */}
// // //                 <View style={styles.genderRow}>
// // //                     <TouchableOpacity 
// // //                         style={[styles.genderBtn, p.gender === 'male' && styles.genderBtnActive]}
// // //                         onPress={() => updatePassenger(index, 'gender', 'male')}
// // //                     >
// // //                         <Text style={[styles.genderText, p.gender === 'male' && styles.genderTextActive]}>Male</Text>
// // //                     </TouchableOpacity>
// // //                     <TouchableOpacity 
// // //                         style={[styles.genderBtn, p.gender === 'female' && styles.genderBtnActive]}
// // //                         onPress={() => updatePassenger(index, 'gender', 'female')}
// // //                     >
// // //                         <Text style={[styles.genderText, p.gender === 'female' && styles.genderTextActive]}>Female</Text>
// // //                     </TouchableOpacity>
// // //                 </View>

// // //                 {/* Divider between passengers */}
// // //                 {index < passengers.length - 1 && <View style={styles.divider} />}
// // //               </View>
// // //             ))}
// // //           </View>

// // //           {/* FOOTER SPACE */}
// // //           <View style={{ height: 100 }} /> 
// // //         </ScrollView>

// // //         {/* BOTTOM FOOTER */}
// // //         <View style={styles.footer}>
// // //             <View>
// // //                 <Text style={styles.totalPrice}>₹{grandTotal}</Text>
// // //                 <Text style={styles.taxText}>
// // //                   For {seatCount} Seat(s) + Taxes
// // //                 </Text>
// // //             </View>
// // //             <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
// // //                 <Text style={styles.proceedText}>Proceed to Pay</Text>
// // //             </TouchableOpacity>
// // //         </View>

// // //       </KeyboardAvoidingView>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, backgroundColor: '#000' },
// // //   header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
// // //   headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
// // //   scrollContent: { padding: 16 },
// // //   card: { backgroundColor: '#111', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#222' },
// // //   rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
// // //   divider: { height: 1, backgroundColor: '#333', marginVertical: 12 },
// // //   tripRoute: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// // //   detailsLink: { color: '#FF1E1E', fontSize: 12 },
// // //   tripSubInfo: { color: '#aaa', fontSize: 12, marginTop: 4 },
// // //   operatorName: { color: '#888', fontSize: 12, marginTop: 2 },
// // //   pointRow: { flexDirection: 'row', marginTop: 4 },
// // //   pointLabel: { color: '#666', fontSize: 12, width: 70 },
// // //   pointValue: { color: '#ddd', fontSize: 12, fontWeight: '500' },
// // //   sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
// // //   sectionSub: { color: '#666', fontSize: 12, marginBottom: 12 },
// // //   inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222', borderRadius: 8, paddingHorizontal: 12 },
// // //   inputIcon: { marginRight: 10 },
// // //   input: { flex: 1, color: '#fff', paddingVertical: 12, fontSize: 14 },
// // //   passengerForm: { marginBottom: 8 },
// // //   seatBadgeRow: { flexDirection: 'row', marginBottom: 10 },
// // //   seatBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
// // //   seatBadgeText: { color: '#fff', fontSize: 10, marginLeft: 4, fontWeight: 'bold' },
// // //   formRow: { flexDirection: 'row', marginBottom: 12 },
// // //   label: { color: '#888', fontSize: 12, marginBottom: 6 },
// // //   genderRow: { flexDirection: 'row', marginTop: 4 },
// // //   genderBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderWidth: 1, borderColor: '#333', borderRadius: 6, marginHorizontal: 4 },
// // //   genderBtnActive: { backgroundColor: '#FF1E1E', borderColor: '#FF1E1E' },
// // //   genderText: { color: '#666', fontSize: 12 },
// // //   genderTextActive: { color: '#fff', fontWeight: 'bold' },
// // //   footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#111', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: '#333' },
// // //   totalPrice: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
// // //   taxText: { color: '#666', fontSize: 10 },
// // //   proceedBtn: { backgroundColor: '#FF1E1E', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 8 },
// // //   proceedText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// // // });


// // import { Ionicons } from '@expo/vector-icons';
// // import { useLocalSearchParams, useRouter } from 'expo-router';
// // import React, { useEffect, useState } from 'react';
// // import {
// //     KeyboardAvoidingView,
// //     Platform,
// //     SafeAreaView,
// //     ScrollView,
// //     StyleSheet,
// //     Text,
// //     TextInput,
// //     TouchableOpacity,
// //     View
// // } from 'react-native';

// // // --- TYPES ---
// // interface Passenger {
// //   seatId: string;
// //   name: string;
// //   age: string;
// //   gender: 'male' | 'female';
// // }

// // export default function PassengerDetailsScreen() {
// //   const router = useRouter();
// //   const params = useLocalSearchParams();

// //   // ============================================================
// //   // 1. DATA PARSING (WITH FIXES FOR EMPTY DATA)
// //   // ============================================================
  
// //   // FIX: If no seats passed, assume 1 seat for testing so the form APPEARS.
// //   const selectedSeatsString = typeof params.selectedSeats === 'string' ? params.selectedSeats : 'L1'; 
// //   const selectedSeatsArray = selectedSeatsString.split(',').filter(s => s); // Remove empty strings
  
// //   const seatCount = selectedSeatsArray.length > 0 ? selectedSeatsArray.length : 1;
  
// //   // FIX: If price is missing, default to 600 so you don't just see 19.
// //   const basePrice = Number(params.totalPrice) || 600; 
// //   const insuranceFee = 19; 
// //   const grandTotal = basePrice + insuranceFee;

// //   // ============================================================
// //   // 2. STATE
// //   // ============================================================
// //   const [email, setEmail] = useState('shrirajeng86@gmail.com'); 
// //   const [phone, setPhone] = useState('9106811293'); 
// //   const [passengers, setPassengers] = useState<Passenger[]>([]);

// //   // ============================================================
// //   // 3. INITIALIZE FORMS (Where user adds Name/Age)
// //   // ============================================================
// //   useEffect(() => {
// //     // Determine seats to generate forms for
// //     const seatsToMap = selectedSeatsArray.length > 0 ? selectedSeatsArray : ['L1'];

// //     const initialPassengers = seatsToMap.map(seatId => ({
// //       seatId: seatId,
// //       name: '',
// //       age: '',
// //       gender: 'male' as const 
// //     }));
// //     setPassengers(initialPassengers);
// //   }, [selectedSeatsString]);

// //   // Helper: Update specific passenger form
// //   const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
// //     const updated = [...passengers];
// //     updated[index] = { ...updated[index], [field]: value };
// //     setPassengers(updated);
// //   };

// //   // ============================================================
// //   // 4. HANDLERS
// //   // ============================================================
// //   const handleProceed = () => {
// //     // Validation
// //     if (!email || !phone) {
// //         alert("Please enter contact details");
// //         return;
// //     }
    
// //     // Check if Name and Age are filled for ALL passengers
// //     const isFormValid = passengers.every(p => p.name.trim().length > 0 && p.age.trim().length > 0);
    
// //     if (!isFormValid) {
// //         alert("Please enter Name and Age for all passengers.");
// //         return;
// //     }

// //     console.log("Navigating to Payment with Total:", grandTotal);
    
// //     router.push({
// //       pathname: '/payment',
// //       params: {
// //         amount: grandTotal, 
// //         bookingId: 'BK' + Math.floor(Math.random() * 90000)
// //       }
// //     });
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <KeyboardAvoidingView 
// //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //         style={{ flex: 1 }}
// //       >
// //         {/* HEADER */}
// //         <View style={styles.header}>
// //           <TouchableOpacity onPress={() => router.back()}>
// //             <Ionicons name="arrow-back" size={24} color="#fff" />
// //           </TouchableOpacity>
// //           <Text style={styles.headerTitle}>Passenger Details</Text>
// //         </View>

// //         <ScrollView contentContainerStyle={styles.scrollContent}>
// //           {/* TRIP SUMMARY */}
// //           <View style={styles.card}>
// //             <View style={styles.rowBetween}>
// //               <Text style={styles.tripRoute}>
// //                 {params.fromCity || 'Jamnagar'} → {params.toCity || 'Baroda'}
// //               </Text>
// //               <Text style={styles.detailsLink}>Details &gt;</Text>
// //             </View>
// //             <Text style={styles.tripSubInfo}>
// //               {seatCount} Traveller(s) • {params.travelDate || '12 Jan 2026'}
// //             </Text>
// //             <Text style={styles.operatorName}>{params.busName || 'New Payal Travels'}</Text>
            
// //             <View style={styles.divider} />
            
// //             <View style={styles.pointRow}>
// //                <Text style={styles.pointLabel}>Boarding:</Text>
// //                <Text style={styles.pointValue}>{params.boardingPoint || 'Gulab Nagar'}</Text>
// //             </View>
// //             <View style={styles.pointRow}>
// //                <Text style={styles.pointLabel}>Dropping:</Text>
// //                <Text style={styles.pointValue}>{params.droppingPoint || 'Pandya Bridge'}</Text>
// //             </View>
// //           </View>

// //           {/* CONTACT DETAILS */}
// //           <View style={styles.card}>
// //             <Text style={styles.sectionTitle}>Contact Details</Text>
// //             <Text style={styles.sectionSub}>Your ticket info will be sent here</Text>
            
// //             <View style={styles.inputRow}>
// //                <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.inputIcon} />
// //                <TextInput 
// //                  style={styles.input} 
// //                  value={email}
// //                  onChangeText={setEmail}
// //                  placeholder="Email ID"
// //                  placeholderTextColor="#666"
// //                  keyboardType="email-address"
// //                />
// //             </View>
// //             <View style={[styles.inputRow, { marginTop: 12 }]}>
// //                <Ionicons name="call-outline" size={20} color="#aaa" style={styles.inputIcon} />
// //                <TextInput 
// //                  style={styles.input} 
// //                  value={phone}
// //                  onChangeText={setPhone}
// //                  placeholder="Mobile Number"
// //                  placeholderTextColor="#666"
// //                  keyboardType="phone-pad"
// //                />
// //             </View>
// //           </View>

// //           {/* --- PASSENGER INPUTS SECTION (NAME, AGE, GENDER) --- */}
// //           <View style={styles.card}>
// //             <Text style={styles.sectionTitle}>Passenger Details</Text>
// //             <Text style={styles.sectionSub}>Fill details corresponding to the seats</Text>
            
// //             {/* THIS LOOP GENERATES THE INPUTS */}
// //             {passengers.map((p, index) => (
// //               <View key={index} style={styles.passengerForm}>
                
// //                 {/* Seat Badge */}
// //                 <View style={styles.seatBadgeRow}>
// //                    <View style={styles.seatBadge}>
// //                       <Ionicons name="person" size={12} color="#fff" />
// //                       <Text style={styles.seatBadgeText}>Seat {p.seatId}</Text>
// //                    </View>
// //                 </View>

// //                 {/* NAME & AGE INPUTS */}
// //                 <View style={styles.formRow}>
// //                   {/* Name Input */}
// //                   <View style={{ flex: 2, marginRight: 10 }}>
// //                     <Text style={styles.label}>Full Name</Text>
// //                     <TextInput 
// //                         style={styles.inputField} 
// //                         value={p.name}
// //                         onChangeText={(txt) => updatePassenger(index, 'name', txt)}
// //                         placeholder="Enter Full Name"
// //                         placeholderTextColor="#666"
// //                     />
// //                   </View>

// //                   {/* Age Input */}
// //                   <View style={{ flex: 1 }}>
// //                     <Text style={styles.label}>Age</Text>
// //                     <TextInput 
// //                         style={styles.inputField} 
// //                         value={p.age}
// //                         onChangeText={(txt) => updatePassenger(index, 'age', txt)}
// //                         placeholder="Age"
// //                         placeholderTextColor="#666"
// //                         keyboardType="numeric"
// //                         maxLength={2}
// //                     />
// //                   </View>
// //                 </View>

// //                 {/* GENDER SELECTION */}
// //                 <View style={styles.genderRow}>
// //                     <TouchableOpacity 
// //                         style={[styles.genderBtn, p.gender === 'male' && styles.genderBtnActive]}
// //                         onPress={() => updatePassenger(index, 'gender', 'male')}
// //                     >
// //                         <Text style={[styles.genderText, p.gender === 'male' && styles.genderTextActive]}>Male</Text>
// //                     </TouchableOpacity>
// //                     <TouchableOpacity 
// //                         style={[styles.genderBtn, p.gender === 'female' && styles.genderBtnActive]}
// //                         onPress={() => updatePassenger(index, 'gender', 'female')}
// //                     >
// //                         <Text style={[styles.genderText, p.gender === 'female' && styles.genderTextActive]}>Female</Text>
// //                     </TouchableOpacity>
// //                 </View>

// //                 {/* Divider between passengers */}
// //                 {index < passengers.length - 1 && <View style={styles.divider} />}
// //               </View>
// //             ))}
// //           </View>

// //           {/* INSURANCE SECTION */}
// //           <View style={[styles.card, { backgroundColor: '#1a2233' }]}> 
// //              <View style={styles.rowBetween}>
// //                  <Text style={[styles.sectionTitle, { color: '#4da6ff' }]}>Secure your trip</Text>
// //                  <Text style={{ color: '#aaa', fontSize: 12 }}>only at ₹19</Text>
// //              </View>
// //              <View style={{ flexDirection: 'row', marginTop: 10 }}>
// //                  <View style={{ marginRight: 20 }}>
// //                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>1.5x</Text>
// //                      <Text style={{ color: '#aaa', fontSize: 10 }}>Refund</Text>
// //                  </View>
// //                  <View>
// //                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>100%</Text>
// //                      <Text style={{ color: '#aaa', fontSize: 10 }}>Money Back</Text>
// //                  </View>
// //              </View>
// //           </View>

// //           <View style={{ height: 100 }} /> 
// //         </ScrollView>

// //         {/* FOOTER */}
// //         <View style={styles.footer}>
// //             <View>
// //                 {/* DISPLAYS TOTAL AMOUNT */}
// //                 <Text style={styles.totalPrice}>₹{grandTotal}</Text>
// //                 <Text style={styles.taxText}>
// //                   For {seatCount} Seat(s) + Taxes
// //                 </Text>
// //             </View>
// //             <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
// //                 <Text style={styles.proceedText}>Proceed to Pay</Text>
// //             </TouchableOpacity>
// //         </View>

// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#000' },
// //   header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
// //   headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
  
// //   scrollContent: { padding: 16 },
  
// //   card: { backgroundColor: '#111', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#222' },
// //   rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
// //   divider: { height: 1, backgroundColor: '#333', marginVertical: 12 },
  
// //   tripRoute: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// //   detailsLink: { color: '#FF1E1E', fontSize: 12 },
// //   tripSubInfo: { color: '#aaa', fontSize: 12, marginTop: 4 },
// //   operatorName: { color: '#888', fontSize: 12, marginTop: 2 },
  
// //   pointRow: { flexDirection: 'row', marginTop: 4 },
// //   pointLabel: { color: '#666', fontSize: 12, width: 70 },
// //   pointValue: { color: '#ddd', fontSize: 12, fontWeight: '500' },
  
// //   sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
// //   sectionSub: { color: '#666', fontSize: 12, marginBottom: 12 },
  
// //   // Contacts
// //   inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222', borderRadius: 8, paddingHorizontal: 12 },
// //   inputIcon: { marginRight: 10 },
// //   input: { flex: 1, color: '#fff', paddingVertical: 12, fontSize: 14 },
  
// //   // Passenger Form Styles
// //   passengerForm: { marginBottom: 8 },
// //   seatBadgeRow: { flexDirection: 'row', marginBottom: 10 },
// //   seatBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
// //   seatBadgeText: { color: '#fff', fontSize: 10, marginLeft: 4, fontWeight: 'bold' },
  
// //   formRow: { flexDirection: 'row', marginBottom: 12 },
// //   label: { color: '#888', fontSize: 12, marginBottom: 6 },
  
// //   // Specific style for Name/Age inputs
// //   inputField: { 
// //     backgroundColor: '#222', 
// //     color: '#fff', 
// //     paddingVertical: 10, 
// //     paddingHorizontal: 12, 
// //     borderRadius: 8,
// //     fontSize: 14
// //   },
  
// //   genderRow: { flexDirection: 'row', marginTop: 4 },
// //   genderBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderWidth: 1, borderColor: '#333', borderRadius: 6, marginHorizontal: 4 },
// //   genderBtnActive: { backgroundColor: '#FF1E1E', borderColor: '#FF1E1E' },
// //   genderText: { color: '#666', fontSize: 12 },
// //   genderTextActive: { color: '#fff', fontWeight: 'bold' },
  
// //   footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#111', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: '#333' },
// //   totalPrice: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
// //   taxText: { color: '#666', fontSize: 10 },
// //   proceedBtn: { backgroundColor: '#FF1E1E', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 8 },
// //   proceedText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// // });


// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ 1. Import AsyncStorage
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

//   // --- 1. DATA PARSING ---
//   const selectedSeatsString = typeof params.selectedSeats === 'string' ? params.selectedSeats : '';
//   const selectedSeatsArray = selectedSeatsString ? selectedSeatsString.split(',') : [];
//   const seatCount = selectedSeatsArray.length > 0 ? selectedSeatsArray.length : 1;
//   const basePrice = Number(params.totalPrice) || 600; 
//   const insuranceFee = 19; 
//   const grandTotal = basePrice + insuranceFee;

//   // --- 2. STATE (Initialize with EMPTY strings) ---
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState(''); // ✅ Removed hardcoded value
//   const [phone, setPhone] = useState(''); // ✅ Removed hardcoded value
//   const [passengers, setPassengers] = useState<Passenger[]>([]);

//   // --- 3. FETCH USER DATA & INIT SEATS ---
//   useEffect(() => {
//     const initialize = async () => {
//       // A. Setup Passenger Forms
//       const seatsToMap = selectedSeatsArray.length > 0 ? selectedSeatsArray : ['L1'];
//       const initialPassengers = seatsToMap.map(seatId => ({
//         seatId: seatId,
//         name: '',
//         age: '',
//         gender: 'male' as const 
//       }));
//       setPassengers(initialPassengers);

//       // B. Get Logged In User Info
//       try {
//         const storedPhone = await AsyncStorage.getItem('userPhone');
        
//         if (storedPhone) {
//           setPhone(storedPhone); // ✅ Auto-fill the REAL phone number
          
//           // Optional: Fetch their email from database to auto-fill that too
//           // Replace IP with your computer's IP
//           const response = await fetch(`http://192.168.104.252:3000/profile?phone=${storedPhone}`);
//           const data = await response.json();
          
//           if (response.ok) {
//             setEmail(data.email || ''); // ✅ Auto-fill email from DB
//           }
//         } else {
//           Alert.alert("Notice", "You are not logged in. Please ensure the phone number you enter is registered.");
//         }
//       } catch (error) {
//         console.log("Error fetching user info:", error);
//       }
//     };

//     initialize();
//   }, [selectedSeatsString]);

//   // Helper to update form
//   const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
//     const updated = [...passengers];
//     updated[index] = { ...updated[index], [field]: value };
//     setPassengers(updated);
//   };

//   // --- 4. HANDLE PROCEED ---
//   const handleProceed = async () => {
//     if (!email || !phone) { Alert.alert("Missing Info", "Please enter contact details"); return; }
//     const isFormValid = passengers.every(p => p.name.trim().length > 0 && p.age.trim().length > 0);
//     if (!isFormValid) { Alert.alert("Missing Info", "Please fill all passenger details"); return; }

//     setLoading(true);

//     try {
//       // REPLACE IP WITH YOUR COMPUTER'S IP
//       const response = await fetch('http://172.24.149.252:3000/book-ticket', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userPhone: phone, // ✅ Sends the phone number currently in the box
//           busId: params.busId,
//           travelDate: params.travelDate,
//           totalAmount: grandTotal,
//           passengers: passengers
//         })
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Success! Go to payment
//         router.push({
//           pathname: '/payment',
//           params: { 
//             amount: grandTotal, 
//             pnr: result.pnr 
//           }
//         });
//       } else {
//         Alert.alert("Booking Failed", result.error);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Network Error", "Check your internet connection or IP address.");
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
//               <Text style={styles.detailsLink}>Details &gt;</Text>
//             </View>
//             <Text style={styles.tripSubInfo}>{seatCount} Seats • {params.travelDate}</Text>
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

//           {/* DYNAMIC PASSENGER LIST */}
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
//                 <Text style={styles.taxText}>{seatCount} Seats</Text>
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

// --- TYPES ---
interface Passenger {
  seatId: string;
  name: string;
  age: string;
  gender: 'male' | 'female';
}

export default function PassengerDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // ============================================================
  // 1. SAFE DATA PARSING (Fixes the Crash)
  // ============================================================
  const selectedSeatsString = typeof params.selectedSeats === 'string' ? params.selectedSeats : '';
  
  // .filter(Boolean) removes empty strings caused by trailing commas like "L1,L2,"
  const selectedSeatsArray = selectedSeatsString.split(',').filter(seat => seat.trim() !== '');

  // If no seats found (should not happen), default to 0 to prevent crash
  const seatCount = selectedSeatsArray.length;
  
  const basePrice = Number(params.totalPrice) || 0; 
  const insuranceFee = 19; 
  const grandTotal = basePrice + insuranceFee;

  // ============================================================
  // 2. STATE
  // ============================================================
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  // ============================================================
  // 3. INITIALIZE FORMS & USER DATA
  // ============================================================
  useEffect(() => {
    // A. Guard Clause: If no seats, go back (Prevents white screen crash)
    if (seatCount === 0) {
        Alert.alert("Error", "No seats selected. Please select seats first.", [
            { text: "OK", onPress: () => router.back() }
        ]);
        return;
    }

    // B. Create Passenger Forms
    const initialPassengers = selectedSeatsArray.map(seatId => ({
      seatId: seatId,
      name: '',
      age: '',
      gender: 'male' as const 
    }));
    setPassengers(initialPassengers);

    // C. Get Logged In User Info
    const fetchUserInfo = async () => {
      try {
        const storedPhone = await AsyncStorage.getItem('userPhone');
        if (storedPhone) {
          setPhone(storedPhone);
          // Optional: Fetch email from backend
          // const res = await fetch(`http://172.24.149.252:3000/profile?phone=${storedPhone}`);
          // const data = await res.json();
          // if(data.email) setEmail(data.email);
        }
      } catch (error) {
        console.log("Storage Error:", error);
      }
    };
    fetchUserInfo();
  }, [selectedSeatsString]);

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  // ============================================================
  // 4. HELPER: DATE FORMATTER (Fixes "Seats Visible" Issue)
  // ============================================================
  const convertDateForBackend = (dateStr: string | string[] | undefined) => {
    if (!dateStr || typeof dateStr !== 'string') return '2026-01-01'; // Default Fallback
    
    // Check if it is already YYYY-MM-DD
    if (dateStr.includes('-')) return dateStr;

    // Convert "12 Jan 2026" OR "12/01/2026" to "2026-01-12"
    // This example assumes input is "DD/MM/YYYY" or similar from your previous code
    try {
        // If your app uses slashes: 12/02/2026
        if (dateStr.includes('/')) {
            const [day, month, year] = dateStr.split('/');
            return `${year}-${month}-${day}`;
        }
        // If your app uses text: 12 Jan 2026 (Simple parse)
        const dateObj = new Date(dateStr);
        return dateObj.toISOString().split('T')[0];
    } catch (e) {
        return dateStr; // Send as is if fail
    }
  };

  // ============================================================
  // 5. HANDLE PROCEED (BOOKING)
  // ============================================================
  const handleProceed = async () => {
    if (!email || !phone) { Alert.alert("Missing Info", "Please enter contact details"); return; }
    
    // Validate that passengers have names
    const isFormValid = passengers.every(p => p.name.trim().length > 0 && p.age.trim().length > 0);
    if (!isFormValid) { Alert.alert("Missing Info", "Please fill Name and Age for all passengers"); return; }

    setLoading(true);

    try {
      // 1. Prepare Data
      // 🔴 IMPORTANT: Use the params.busId, NOT params.busName
      if (!params.busId) {
          Alert.alert("Error", "Bus ID is missing. Cannot book.");
          setLoading(false);
          return;
      }

      // 🔴 REPLACES IP WITH YOUR OWN
      const response = await fetch('http://172.24.149.252:3000/book-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhone: phone,
          busId: params.busId, 
          // Use the helper to ensure DB gets YYYY-MM-DD
          travelDate: convertDateForBackend(params.travelDate), 
          totalAmount: grandTotal,
          passengers: passengers
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Success
        router.push({
          pathname: '/payment',
          params: { 
            amount: grandTotal, 
            pnr: result.pnr 
          }
        });
      } else {
        Alert.alert("Booking Failed", result.error || "Unknown Error");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      Alert.alert("Network Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Passenger Details</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* TRIP SUMMARY */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.tripRoute}>{params.fromCity} → {params.toCity}</Text>
            </View>
            <Text style={styles.tripSubInfo}>{seatCount} Seats ({selectedSeatsArray.join(', ')}) • {params.travelDate}</Text>
            <Text style={styles.operatorName}>{params.busName}</Text>
          </View>

          {/* CONTACT DETAILS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Contact Details</Text>
            <View style={styles.inputRow}>
               <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.inputIcon} />
               <TextInput 
                 style={styles.input} 
                 value={email}
                 onChangeText={setEmail}
                 placeholder="Email ID"
                 placeholderTextColor="#666"
                 keyboardType="email-address"
               />
            </View>
            <View style={[styles.inputRow, { marginTop: 12 }]}>
               <Ionicons name="call-outline" size={20} color="#aaa" style={styles.inputIcon} />
               <TextInput 
                 style={styles.input} 
                 value={phone}
                 onChangeText={setPhone}
                 placeholder="Mobile Number"
                 placeholderTextColor="#666"
                 keyboardType="phone-pad"
               />
            </View>
          </View>

          {/* PASSENGER FORMS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Passenger Details</Text>
            
            {passengers.map((p, index) => (
              <View key={index} style={styles.passengerForm}>
                <View style={styles.seatBadgeRow}>
                   <View style={styles.seatBadge}>
                      <Ionicons name="person" size={12} color="#fff" />
                      <Text style={styles.seatBadgeText}>Seat {p.seatId}</Text>
                   </View>
                </View>

                <View style={styles.formRow}>
                  <View style={{ flex: 2, marginRight: 10 }}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput 
                        style={styles.inputField} 
                        value={p.name}
                        onChangeText={(txt) => updatePassenger(index, 'name', txt)}
                        placeholder="Name"
                        placeholderTextColor="#666"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput 
                        style={styles.inputField} 
                        value={p.age}
                        onChangeText={(txt) => updatePassenger(index, 'age', txt)}
                        placeholder="Age"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                        maxLength={2}
                    />
                  </View>
                </View>

                <View style={styles.genderRow}>
                    <TouchableOpacity 
                        style={[styles.genderBtn, p.gender === 'male' && styles.genderBtnActive]}
                        onPress={() => updatePassenger(index, 'gender', 'male')}
                    >
                        <Text style={[styles.genderText, p.gender === 'male' && styles.genderTextActive]}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.genderBtn, p.gender === 'female' && styles.genderBtnActive]}
                        onPress={() => updatePassenger(index, 'gender', 'female')}
                    >
                        <Text style={[styles.genderText, p.gender === 'female' && styles.genderTextActive]}>Female</Text>
                    </TouchableOpacity>
                </View>
                {index < passengers.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>

          <View style={{ height: 100 }} /> 
        </ScrollView>

        {/* FOOTER */}
        <View style={styles.footer}>
            <View>
                <Text style={styles.totalPrice}>₹{grandTotal}</Text>
                <Text style={styles.taxText}>{seatCount} Seats + Tax</Text>
            </View>
            <TouchableOpacity 
                style={[styles.proceedBtn, loading && {opacity: 0.7}]} 
                onPress={handleProceed}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.proceedText}>Proceed to Pay</Text>}
            </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
  scrollContent: { padding: 16 },
  card: { backgroundColor: '#111', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#222' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  divider: { height: 1, backgroundColor: '#333', marginVertical: 12 },
  tripRoute: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  detailsLink: { color: '#FF1E1E', fontSize: 12 },
  tripSubInfo: { color: '#aaa', fontSize: 12, marginTop: 4 },
  operatorName: { color: '#888', fontSize: 12, marginTop: 2 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222', borderRadius: 8, paddingHorizontal: 12 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', paddingVertical: 12, fontSize: 14 },
  passengerForm: { marginBottom: 8 },
  seatBadgeRow: { flexDirection: 'row', marginBottom: 10 },
  seatBadge: { backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  seatBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  formRow: { flexDirection: 'row', marginBottom: 12 },
  label: { color: '#888', fontSize: 12, marginBottom: 6 },
  inputField: { backgroundColor: '#222', color: '#fff', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, fontSize: 14 },
  genderRow: { flexDirection: 'row', marginTop: 4 },
  genderBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderWidth: 1, borderColor: '#333', borderRadius: 6, marginHorizontal: 4 },
  genderBtnActive: { backgroundColor: '#FF1E1E', borderColor: '#FF1E1E' },
  genderText: { color: '#666', fontSize: 12 },
  genderTextActive: { color: '#fff', fontWeight: 'bold' },
  footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#111', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: '#333' },
  totalPrice: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  taxText: { color: '#666', fontSize: 10 },
  proceedBtn: { backgroundColor: '#FF1E1E', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 8 },
  proceedText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});