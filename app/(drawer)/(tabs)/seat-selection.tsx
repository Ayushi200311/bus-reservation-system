// // // // // import { Ionicons } from '@expo/vector-icons';
// // // // // import { useLocalSearchParams, useRouter } from 'expo-router';
// // // // // import React, { useState } from 'react';
// // // // // import {
// // // // //     SafeAreaView,
// // // // //     ScrollView,
// // // // //     StyleSheet,
// // // // //     Text,
// // // // //     TouchableOpacity,
// // // // //     View
// // // // // } from 'react-native';

// // // // // // --- TYPES ---
// // // // // type SeatStatus = 'available' | 'booked' | 'selected' | 'female';
// // // // // type DeckType = 'lower' | 'upper';

// // // // // interface Seat {
// // // // //   id: string;
// // // // //   row: number;
// // // // //   col: number;
// // // // //   deck: DeckType;
// // // // //   status: SeatStatus;
// // // // //   price: number;
// // // // //   isSleeper?: boolean;
// // // // // }

// // // // // // --- DUMMY DATA (2 Decks) ---
// // // // // const generateSeats = (): Seat[] => {
// // // // //   const seats: Seat[] = [];
// // // // //   // Generate Lower Deck (Sleeper)
// // // // //   for (let r = 1; r <= 5; r++) {
// // // // //     for (let c = 1; c <= 3; c++) {
// // // // //       // Skip the aisle (middle column)
// // // // //       if (c === 2) continue;
// // // // //       seats.push({
// // // // //         id: `L${r}${c}`,
// // // // //         row: r,
// // // // //         col: c,
// // // // //         deck: 'lower',
// // // // //         status: Math.random() > 0.8 ? 'booked' : 'available', // Randomly book some
// // // // //         price: 600,
// // // // //         isSleeper: true,
// // // // //       });
// // // // //     }
// // // // //   }
// // // // //   // Generate Upper Deck (Sleeper)
// // // // //   for (let r = 1; r <= 5; r++) {
// // // // //     for (let c = 1; c <= 3; c++) {
// // // // //       if (c === 2) continue;
// // // // //       seats.push({
// // // // //         id: `U${r}${c}`,
// // // // //         row: r,
// // // // //         col: c,
// // // // //         deck: 'upper',
// // // // //         status: Math.random() > 0.8 ? 'booked' : 'available',
// // // // //         price: 800,
// // // // //         isSleeper: true,
// // // // //       });
// // // // //     }
// // // // //   }
// // // // //   return seats;
// // // // // };

// // // // // const SEAT_DATA = generateSeats();

// // // // // export default function SeatSelectionScreen() {
// // // // //   const router = useRouter();
// // // // //   const params = useLocalSearchParams();
// // // // //   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

// // // // //   // Toggle Selection Logic
// // // // //   const handleSeatPress = (seat: Seat) => {
// // // // //     if (seat.status === 'booked') return;

// // // // //     if (selectedSeats.includes(seat.id)) {
// // // // //       setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
// // // // //     } else {
// // // // //       setSelectedSeats([...selectedSeats, seat.id]);
// // // // //     }
// // // // //   };

// // // // //   const getSeatStyle = (status: SeatStatus) => {
// // // // //     switch (status) {
// // // // //       case 'available': return styles.seatAvailable;
// // // // //       case 'booked': return styles.seatBooked;
// // // // //       case 'selected': return styles.seatSelected;
// // // // //       case 'female': return styles.seatFemale;
// // // // //       default: return styles.seatAvailable;
// // // // //     }
// // // // //   };

// // // // //   const totalPrice = selectedSeats.length * 600; // Simplified price calculation

// // // // //   // --- RENDER HELPER ---
// // // // //   const renderDeck = (deckName: DeckType, label: string) => {
// // // // //     const deckSeats = SEAT_DATA.filter(s => s.deck === deckName);
    
// // // // //     return (
// // // // //       <View style={styles.deckContainer}>
// // // // //         <Text style={styles.deckTitle}>{label}</Text>
// // // // //         <View style={styles.gridContainer}>
// // // // //           {/* We map columns 1 and 3 (Left and Right) */}
// // // // //           <View style={styles.column}>
// // // // //             {deckSeats.filter(s => s.col === 1).map(seat => renderSeat(seat))}
// // // // //           </View>
          
// // // // //           {/* Aisle Space */}
// // // // //           <View style={styles.aisle} />

// // // // //           <View style={styles.column}>
// // // // //             {deckSeats.filter(s => s.col === 3).map(seat => renderSeat(seat))}
// // // // //           </View>
// // // // //         </View>
// // // // //       </View>
// // // // //     );
// // // // //   };

// // // // //   const renderSeat = (seat: Seat) => {
// // // // //     const isSelected = selectedSeats.includes(seat.id);
// // // // //     const finalStatus = isSelected ? 'selected' : seat.status;

// // // // //     return (
// // // // //       <TouchableOpacity
// // // // //         key={seat.id}
// // // // //         style={[styles.seatBox, getSeatStyle(finalStatus)]}
// // // // //         onPress={() => handleSeatPress(seat)}
// // // // //         disabled={seat.status === 'booked'}
// // // // //       >
// // // // //         {/* Pillow Icon for visual appeal */}
// // // // //         <View style={[styles.pillow, isSelected ? {backgroundColor: '#fff'} : {}]} />
// // // // //         {finalStatus === 'available' && (
// // // // //           <Text style={styles.seatPrice}>₹{seat.price}</Text>
// // // // //         )}
// // // // //       </TouchableOpacity>
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <SafeAreaView style={styles.container}>
// // // // //       {/* 1. HEADER */}
// // // // //       <View style={styles.header}>
// // // // //         <TouchableOpacity onPress={() => router.back()}>
// // // // //           <Ionicons name="arrow-back" size={24} color="#fff" />
// // // // //         </TouchableOpacity>
// // // // //         <View style={styles.headerContent}>
// // // // //           <Text style={styles.routeTitle}>{params.fromCity} → {params.toCity}</Text>
// // // // //           <Text style={styles.subTitle}>{params.travelDate} | {params.busName}</Text>
// // // // //         </View>
// // // // //       </View>

// // // // //       {/* 2. LEGEND */}
// // // // //       <View style={styles.legendContainer}>
// // // // //         <View style={styles.legendItem}>
// // // // //           <View style={[styles.legendBox, styles.seatAvailable]} />
// // // // //           <Text style={styles.legendText}>Available</Text>
// // // // //         </View>
// // // // //         <View style={styles.legendItem}>
// // // // //           <View style={[styles.legendBox, styles.seatSelected]} />
// // // // //           <Text style={styles.legendText}>Selected</Text>
// // // // //         </View>
// // // // //         <View style={styles.legendItem}>
// // // // //           <View style={[styles.legendBox, styles.seatBooked]} />
// // // // //           <Text style={styles.legendText}>Booked</Text>
// // // // //         </View>
// // // // //         <View style={styles.legendItem}>
// // // // //           <View style={[styles.legendBox, styles.seatFemale]} />
// // // // //           <Text style={styles.legendText}>Ladies</Text>
// // // // //         </View>
// // // // //       </View>

// // // // //       {/* 3. SEAT LAYOUT SCROLL */}
// // // // //       <ScrollView contentContainerStyle={styles.scrollContent}>
// // // // //         <View style={styles.deckWrapper}>
// // // // //           {renderDeck('lower', 'Lower Deck')}
// // // // //           {renderDeck('upper', 'Upper Deck')}
// // // // //         </View>
// // // // //       </ScrollView>

// // // // //       {/* 4. FOOTER */}
// // // // //       {selectedSeats.length > 0 && (
// // // // //         <View style={styles.footer}>
// // // // //           <View>
// // // // //             <Text style={styles.selectedText}>
// // // // //               {selectedSeats.length} Seat(s) Selected
// // // // //             </Text>
// // // // //             <Text style={styles.totalPrice}>₹{totalPrice}</Text>
// // // // //           </View>
// // // // //           <TouchableOpacity 
// // // // //             style={styles.proceedBtn} 
// // // // //             onPress={() => {
// // // // //               // Navigate to Boarding Screen with ALL info
// // // // //               router.push({
// // // // //                 pathname: '/boarding',
// // // // //                 params: {
// // // // //                   ...params, // Keep prev params (cities, date, busName)
// // // // //                   selectedSeats: selectedSeats.join(','),
// // // // //                   totalPrice: totalPrice
// // // // //                 }
// // // // //               });
// // // // //             }}
// // // // //           >
// // // // //             <Text style={styles.btnText}>Select Boarding Point</Text>
// // // // //           </TouchableOpacity>
// // // // //         </View>
// // // // //       )}
// // // // //     </SafeAreaView>
// // // // //   );
// // // // // }

// // // // // const styles = StyleSheet.create({
// // // // //   container: { flex: 1, backgroundColor: '#000' },

// // // // //   // Header
// // // // //   header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#222' },
// // // // //   headerContent: { marginLeft: 16 },
// // // // //   routeTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// // // // //   subTitle: { color: '#aaa', fontSize: 12 },

// // // // //   // Legend
// // // // //   legendContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, backgroundColor: '#111' },
// // // // //   legendItem: { flexDirection: 'row', alignItems: 'center' },
// // // // //   legendBox: { width: 16, height: 16, borderRadius: 4, marginRight: 6 },
// // // // //   legendText: { color: '#ccc', fontSize: 12 },

// // // // //   // Seats Styles
// // // // //   seatBox: {
// // // // //     width: 45, height: 90, marginVertical: 6, borderRadius: 6,
// // // // //     borderWidth: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 6
// // // // //   },
// // // // //   pillow: { width: 30, height: 6, borderRadius: 2, backgroundColor: '#444', position: 'absolute', top: 8 },
  
// // // // //   seatAvailable: { borderColor: '#888', backgroundColor: 'transparent' },
// // // // //   seatBooked: { borderColor: '#333', backgroundColor: '#333' },
// // // // //   seatSelected: { borderColor: '#FF1E1E', backgroundColor: '#FF1E1E' },
// // // // //   seatFemale: { borderColor: '#FF007F', backgroundColor: 'transparent' }, // Pink border for Ladies
  
// // // // //   seatPrice: { color: '#888', fontSize: 10 },

// // // // //   // Layout
// // // // //   scrollContent: { padding: 20 },
// // // // //   deckWrapper: { flexDirection: 'row', justifyContent: 'space-between' },
// // // // //   deckContainer: { width: '48%', backgroundColor: '#111', padding: 10, borderRadius: 12, alignItems: 'center' },
// // // // //   deckTitle: { color: '#fff', marginBottom: 15, fontWeight: 'bold' },
// // // // //   gridContainer: { flexDirection: 'row' },
// // // // //   column: { alignItems: 'center' },
// // // // //   aisle: { width: 15 }, // Space between columns

// // // // //   // Footer
// // // // //   footer: { 
// // // // //     position: 'absolute', bottom: 0, width: '100%', 
// // // // //     backgroundColor: '#111', padding: 16, flexDirection: 'row', 
// // // // //     justifyContent: 'space-between', alignItems: 'center',
// // // // //     borderTopWidth: 1, borderColor: '#333'
// // // // //   },
// // // // //   selectedText: { color: '#aaa', fontSize: 12 },
// // // // //   totalPrice: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
// // // // //   proceedBtn: { backgroundColor: '#FF1E1E', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
// // // // //   btnText: { color: '#fff', fontWeight: 'bold' },
// // // // // });



// // // import { Ionicons } from '@expo/vector-icons';
// // // import { useLocalSearchParams, useRouter } from 'expo-router';
// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //     ActivityIndicator,
// // //     Alert,
// // //     SafeAreaView,
// // //     ScrollView,
// // //     StyleSheet,
// // //     Text,
// // //     TouchableOpacity,
// // //     View
// // // } from 'react-native';

// // // // --- TYPES ---
// // // type SeatStatus = 'available' | 'booked' | 'selected' | 'female';
// // // type DeckType = 'lower' | 'upper';

// // // interface Seat {
// // //   id: string;
// // //   row: number;
// // //   col: number;
// // //   deck: DeckType;
// // //   status: SeatStatus;
// // //   price: number;
// // //   isSleeper?: boolean;
// // // }

// // // export default function SeatSelectionScreen() {
// // //   const router = useRouter();
// // //   const params = useLocalSearchParams();
  
// // //   const [loading, setLoading] = useState(true);
// // //   const [seatData, setSeatData] = useState<Seat[]>([]);
// // //   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

// // //   // 1. FETCH DATA
// // //   useEffect(() => {
// // //     const fetchSeats = async () => {
// // //       try {
// // //         const response = await fetch(`http://192.168.104.252:3000/get-seats?busId=${params.busId}&date=${params.travelDate}`);
// // //         const data = await response.json();
// // //         setSeatData(data);
// // //       } catch (error) {
// // //         console.error("Error fetching seats:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchSeats();
// // //   }, []);

// // //   // 2. HANDLE SELECTION
// // //   const handleSeatPress = (seat: Seat) => {
// // //     if (seat.status === 'booked') return;
// // //     if (selectedSeats.includes(seat.id)) {
// // //       setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
// // //     } else {
// // //       if (selectedSeats.length >= 6) {
// // //         Alert.alert("Limit Reached", "Max 6 seats allowed.");
// // //         return;
// // //       }
// // //       setSelectedSeats([...selectedSeats, seat.id]);
// // //     }
// // //   };

// // //   const totalPrice = selectedSeats.length * (seatData.length > 0 ? seatData[0].price : 0);

// // //   // 3. RENDER DECK (2+1 Layout)
// // //   const renderDeck = (deckName: DeckType, label: string) => {
// // //     const deckSeats = seatData.filter(s => s.deck === deckName);
    
// // //     return (
// // //       <View style={styles.deckContainer}>
// // //         {/* Header with Steering Wheel for Lower Deck */}
// // //         <View style={styles.deckHeaderRow}>
// // //             <Text style={styles.deckTitle}>{label}</Text>
// // //             {deckName === 'lower' && (
// // //                <Ionicons name="steering-wheel" size={24} color="#666" style={{ marginRight: 10 }}/>
// // //             )}
// // //         </View>
        
// // //         <View style={styles.gridContainer}>
          
// // //           {/* LEFT SIDE (Single Seat - Col 1) */}
// // //           <View style={styles.columnSingle}>
// // //             {deckSeats.filter(s => s.col === 1).map(seat => renderSeat(seat))}
// // //           </View>
          
// // //           {/* AISLE */}
// // //           <View style={styles.aisle} />

// // //           {/* RIGHT SIDE (Double Seats - Col 2 & 3) */}
// // //           <View style={styles.columnDouble}>
// // //              {/* Inner Column (Col 2) */}
// // //              <View style={styles.subColumn}>
// // //                 {deckSeats.filter(s => s.col === 2).map(seat => renderSeat(seat))}
// // //              </View>
             
// // //              {/* Gap between double seats */}
// // //              <View style={{width: 4}} /> 

// // //              {/* Window Column (Col 3) */}
// // //              <View style={styles.subColumn}>
// // //                 {deckSeats.filter(s => s.col === 3).map(seat => renderSeat(seat))}
// // //              </View>
// // //           </View>

// // //         </View>
// // //       </View>
// // //     );
// // //   };

// // //   const renderSeat = (seat: Seat) => {
// // //     const isSelected = selectedSeats.includes(seat.id);
    
// // //     let seatStyle = styles.seatAvailable;
    
// // //     if (seat.status === 'booked') {
// // //         seatStyle = styles.seatBooked;
// // //     } else if (isSelected) {
// // //         seatStyle = styles.seatSelected;
// // //     } else if (seat.status === 'female') {
// // //         seatStyle = styles.seatFemale; 
// // //     }

// // //     return (
// // //       <TouchableOpacity
// // //         key={seat.id}
// // //         style={[styles.seatBox, seatStyle]}
// // //         onPress={() => handleSeatPress(seat)}
// // //         disabled={seat.status === 'booked'}
// // //         activeOpacity={0.8}
// // //       >
// // //         <View style={[styles.pillow, isSelected ? {backgroundColor: '#fff'} : {}]} />
        
// // //         {/* Ladies Icon */}
// // //         {seat.status === 'female' && !isSelected && seat.status !== 'booked' && (
// // //              <View style={styles.ladiesIconContainer}>
// // //                 <Ionicons name="woman" size={14} color="#FF007F" />
// // //              </View>
// // //         )}

// // //         {/* Price/ID */}
// // //         {seat.status !== 'booked' && (
// // //             <Text style={[styles.seatPrice, isSelected && {color: '#fff'}]}>
// // //                 {isSelected ? seat.id : `₹${seat.price}`}
// // //             </Text>
// // //         )}
// // //       </TouchableOpacity>
// // //     );
// // //   };

// // //   if (loading) {
// // //       return (
// // //           <View style={[styles.centerContainer]}>
// // //               <ActivityIndicator size="large" color="#FF1E1E" />
// // //           </View>
// // //       )
// // //   }

// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //       {/* HEADER */}
// // //       <View style={styles.header}>
// // //         <TouchableOpacity onPress={() => router.back()}>
// // //           <Ionicons name="arrow-back" size={24} color="#fff" />
// // //         </TouchableOpacity>
// // //         <View style={styles.headerContent}>
// // //           <Text style={styles.routeTitle}>{params.fromCity} → {params.toCity}</Text>
// // //           <Text style={styles.subTitle}>{params.travelDate} | {params.busName}</Text>
// // //         </View>
// // //       </View>

// // //       {/* LEGEND */}
// // //       <View style={styles.legendContainer}>
// // //         <View style={styles.legendItem}>
// // //           <View style={[styles.legendBox, styles.seatAvailable]} />
// // //           <Text style={styles.legendText}>Available</Text>
// // //         </View>
// // //         <View style={styles.legendItem}>
// // //           <View style={[styles.legendBox, styles.seatFemale]} >
// // //              <Ionicons name="woman" size={10} color="#FF007F" style={{ alignSelf:'center', marginTop:1}} />
// // //           </View>
// // //           <Text style={styles.legendText}>Ladies</Text>
// // //         </View>
// // //         <View style={styles.legendItem}>
// // //           <View style={[styles.legendBox, styles.seatSelected]} />
// // //           <Text style={styles.legendText}>Selected</Text>
// // //         </View>
// // //         <View style={styles.legendItem}>
// // //           <View style={[styles.legendBox, styles.seatBooked]} />
// // //           <Text style={styles.legendText}>Booked</Text>
// // //         </View>
// // //       </View>

// // //       {/* SEATS SCROLL */}
// // //       <ScrollView contentContainerStyle={styles.scrollContent}>
// // //         <View style={styles.deckWrapper}>
// // //           {renderDeck('lower', 'Lower')}
// // //           {renderDeck('upper', 'Upper')}
// // //         </View>
// // //       </ScrollView>

// // //       {/* FOOTER */}
// // //       {selectedSeats.length > 0 && (
// // //         <View style={styles.footer}>
// // //           <View>
// // //             <Text style={styles.selectedText}>
// // //               {selectedSeats.length} Seat(s) | {selectedSeats.join(', ')}
// // //             </Text>
// // //             <Text style={styles.totalPrice}>₹{totalPrice}</Text>
// // //           </View>
// // //           <TouchableOpacity 
// // //             style={styles.proceedBtn} 
// // //             onPress={() => {
// // //               router.push({
// // //                 pathname: '/boarding',
// // //                 params: {
// // //                   ...params,
// // //                   selectedSeats: selectedSeats.join(','),
// // //                   totalPrice: totalPrice
// // //                 }
// // //               });
// // //             }}
// // //           >
// // //             <Text style={styles.btnText}>Proceed</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       )}
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, backgroundColor: '#fff' }, // Changed to Light theme per image or keep #000 for Dark
// // //   centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },

// // //   header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
// // //   headerContent: { marginLeft: 16 },
// // //   routeTitle: { color: '#000', fontSize: 16, fontWeight: 'bold' },
// // //   subTitle: { color: '#666', fontSize: 12 },

// // //   legendContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderColor:'#eee' },
// // //   legendItem: { flexDirection: 'column', alignItems: 'center' },
// // //   legendBox: { width: 20, height: 20, borderRadius: 4, marginBottom: 4, borderWidth: 1, borderColor: '#ccc' },
// // //   legendText: { color: '#666', fontSize: 10 },

// // //   // Seat Styles (Matching the grey/white look)
// // //   seatBox: {
// // //     width: 40, height: 75, marginVertical: 4, borderRadius: 4,
// // //     borderWidth: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 6
// // //   },
// // //   pillow: { width: 25, height: 4, borderRadius: 2, backgroundColor: '#ccc', position: 'absolute', top: 6 },
  
// // //   seatAvailable: { borderColor: '#ccc', backgroundColor: '#fff' },
// // //   seatBooked: { borderColor: '#ccc', backgroundColor: '#ddd' }, // Grey filled
// // //   seatSelected: { borderColor: '#FF1E1E', backgroundColor: '#FF1E1E' }, // Red Selected
// // //   seatFemale: { borderColor: '#FF007F', backgroundColor: '#fff' }, // Pink Border

// // //   ladiesIconContainer: { position: 'absolute', top: 30 },
// // //   seatPrice: { color: '#666', fontSize: 9, fontWeight:'600' },

// // //   // Layout Grid
// // //   scrollContent: { padding: 16 },
// // //   deckWrapper: { flexDirection: 'row', justifyContent: 'space-between' },
  
// // //   deckContainer: { width: '48%', backgroundColor: '#fff', borderRadius: 8, padding: 8, borderWidth: 1, borderColor:'#eee' },
// // //   deckHeaderRow: { flexDirection:'row', justifyContent:'space-between', marginBottom: 10 },
// // //   deckTitle: { color: '#000', fontWeight: 'bold' },

// // //   gridContainer: { flexDirection: 'row', justifyContent: 'center' },
  
// // //   // Columns
// // //   columnSingle: { alignItems: 'center' },
// // //   columnDouble: { flexDirection: 'row' },
// // //   subColumn: { alignItems: 'center' },
// // //   aisle: { width: 15 },

// // //   footer: { 
// // //     position: 'absolute', bottom: 0, width: '100%', 
// // //     backgroundColor: '#fff', padding: 16, flexDirection: 'row', 
// // //     justifyContent: 'space-between', alignItems: 'center',
// // //     borderTopWidth: 1, borderColor: '#eee', elevation: 10
// // //   },
// // //   selectedText: { color: '#666', fontSize: 12 },
// // //   totalPrice: { color: '#000', fontSize: 18, fontWeight: 'bold' },
// // //   proceedBtn: { backgroundColor: '#FF1E1E', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
// // //   btnText: { color: '#fff', fontWeight: 'bold' },
// // // });


// // import { Ionicons } from '@expo/vector-icons';
// // import { useLocalSearchParams, useRouter } from 'expo-router';
// // import React, { useEffect, useState } from 'react';
// // import {
// //   ActivityIndicator,
// //   Alert,
// //   SafeAreaView,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View
// // } from 'react-native';

// // type SeatStatus = 'available' | 'booked' | 'selected' | 'female';
// // type DeckType = 'lower' | 'upper';

// // interface Seat {
// //   id: string;
// //   row: number;
// //   col: number;
// //   deck: DeckType;
// //   status: SeatStatus;
// //   price: number;
// //   isSleeper?: boolean;
// // }

// // export default function SeatSelectionScreen() {
// //   const router = useRouter();
// //   const params = useLocalSearchParams();
  
// //   const [loading, setLoading] = useState(true);
// //   const [seatData, setSeatData] = useState<Seat[]>([]);
// //   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

// //   // 1. FETCH DYNAMIC SEATS FROM DATABASE
// //   useEffect(() => {
// //     const fetchSeats = async () => {
// //       try {
// //         // REPLACE WITH YOUR IP
// //         const response = await fetch(`http://172.24.149.252:3000/get-seats?busId=${params.busId}&date=${params.travelDate}`);
// //         const data = await response.json();
// //         setSeatData(data);
// //       } catch (error) {
// //         console.error("Error fetching seats:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchSeats();
// //   }, []);

// //   // 2. SELECTION LOGIC
// //   const handleSeatPress = (seat: Seat) => {
// //     if (seat.status === 'booked') return;
// //     if (selectedSeats.includes(seat.id)) {
// //       setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
// //     } else {
// //       if (selectedSeats.length >= 6) {
// //         Alert.alert("Limit", "Max 6 seats.");
// //         return;
// //       }
// //       setSelectedSeats([...selectedSeats, seat.id]);
// //     }
// //   };

// //   const totalPrice = selectedSeats.length * (seatData.length > 0 ? seatData[0].price : 0);

// //   // 3. RENDER DECK (Dynamic Rows)
// //   const renderDeck = (deckName: DeckType, label: string) => {
// //     const deckSeats = seatData.filter(s => s.deck === deckName);
    
// //     return (
// //       <View style={styles.deckContainer}>
// //         {/* Deck Header */}
// //         <View style={styles.deckHeader}>
// //             <Text style={styles.deckTitle}>{label}</Text>
// //             {deckName === 'lower' && <Ionicons name="steering-wheel" size={24} color="#666" />}
// //         </View>
        
// //         <View style={styles.seatsArea}>
          
// //           {/* LEFT SIDE (Single Seat) */}
// //           <View style={styles.columnLeft}>
// //             {deckSeats.filter(s => s.col === 1).map(seat => renderSeat(seat))}
// //           </View>
          
// //           {/* AISLE */}
// //           <View style={styles.aisle} />

// //           {/* RIGHT SIDE (Double Seats) */}
// //           <View style={styles.columnRight}>
// //              {/* Inner (Col 2) */}
// //              <View style={styles.subColumn}>
// //                 {deckSeats.filter(s => s.col === 2).map(seat => renderSeat(seat))}
// //              </View>
             
// //              {/* Gap */}
// //              <View style={{width: 6}} /> 

// //              {/* Window (Col 3) */}
// //              <View style={styles.subColumn}>
// //                 {deckSeats.filter(s => s.col === 3).map(seat => renderSeat(seat))}
// //              </View>
// //           </View>

// //         </View>
// //       </View>
// //     );
// //   };

// //   const renderSeat = (seat: Seat) => {
// //     const isSelected = selectedSeats.includes(seat.id);
    
// //     // Style Logic for Dark Theme
// //     let seatStyle = styles.seatAvailable;
// //     if (seat.status === 'booked') seatStyle = styles.seatBooked;
// //     else if (isSelected) seatStyle = styles.seatSelected;
// //     else if (seat.status === 'female') seatStyle = styles.seatFemale; 

// //     return (
// //       <TouchableOpacity
// //         key={seat.id}
// //         style={[styles.seatBox, seatStyle]}
// //         onPress={() => handleSeatPress(seat)}
// //         disabled={seat.status === 'booked'}
// //         activeOpacity={0.8}
// //       >
// //         {/* Pillow (Darker grey on dark theme) */}
// //         <View style={[styles.pillow, isSelected ? {backgroundColor: '#fff'} : {}]} />
        
// //         {/* Ladies Icon (Pink) */}
// //         {seat.status === 'female' && !isSelected && seat.status !== 'booked' && (
// //              <Ionicons name="woman" size={12} color="#FF007F" style={styles.ladiesIcon} />
// //         )}

// //         {/* Text */}
// //         {seat.status !== 'booked' && (
// //             <Text style={[styles.seatPrice, isSelected && {color: '#fff'}]}>
// //                 {isSelected ? seat.id : `₹${seat.price}`}
// //             </Text>
// //         )}
// //       </TouchableOpacity>
// //     );
// //   };

// //   if (loading) return (
// //       <View style={{flex:1, backgroundColor:'#000', justifyContent:'center', alignItems:'center'}}>
// //           <ActivityIndicator size="large" color="#FF1E1E" />
// //       </View>
// //   );

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       {/* HEADER */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => router.back()}>
// //           <Ionicons name="arrow-back" size={24} color="#fff" />
// //         </TouchableOpacity>
// //         <View style={styles.headerContent}>
// //           <Text style={styles.routeTitle}>{params.fromCity} → {params.toCity}</Text>
// //           <Text style={styles.subTitle}>{params.travelDate} | {params.busName}</Text>
// //         </View>
// //       </View>

// //       {/* LEGEND (Dark Mode) */}
// //       <View style={styles.legendContainer}>
// //         <View style={styles.legendItem}>
// //           <View style={[styles.legendBox, styles.seatAvailable]} />
// //           <Text style={styles.legendText}>Available</Text>
// //         </View>
// //         <View style={styles.legendItem}>
// //           <View style={[styles.legendBox, styles.seatFemale]} >
// //              <Ionicons name="woman" size={10} color="#FF007F" style={{ alignSelf:'center', marginTop:1}} />
// //           </View>
// //           <Text style={styles.legendText}>Ladies</Text>
// //         </View>
// //         <View style={styles.legendItem}>
// //           <View style={[styles.legendBox, styles.seatSelected]} />
// //           <Text style={styles.legendText}>Selected</Text>
// //         </View>
// //         <View style={styles.legendItem}>
// //           <View style={[styles.legendBox, styles.seatBooked]} />
// //           <Text style={styles.legendText}>Booked</Text>
// //         </View>
// //       </View>

// //       {/* SCROLL AREA */}
// //       <ScrollView contentContainerStyle={styles.scrollContent}>
// //         <View style={styles.decksWrapper}>
// //           {renderDeck('lower', 'Lower')}
// //           {renderDeck('upper', 'Upper')}
// //         </View>
// //       </ScrollView>

// //       {/* FOOTER (Black & Red) */}
// //       {selectedSeats.length > 0 && (
// //         <View style={styles.footer}>
// //           <View>
// //             <Text style={styles.selectedText}>{selectedSeats.length} Seat(s)</Text>
// //             <Text style={styles.totalPrice}>₹{totalPrice}</Text>
// //           </View>
// //           <TouchableOpacity 
// //             style={styles.proceedBtn} 
// //             onPress={() => router.push({
// //                 pathname: '/boarding',
// //                 params: { ...params, selectedSeats: selectedSeats.join(','), totalPrice }
// //             })}
// //           >
// //             <Text style={styles.btnText}>Proceed</Text>
// //           </TouchableOpacity>
// //         </View>
// //       )}
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   // --- DARK THEME BASICS ---
// //   container: { flex: 1, backgroundColor: '#000' },
  
// //   header: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderColor: '#222', alignItems: 'center' },
// //   headerContent: { marginLeft: 16 },
// //   routeTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// //   subTitle: { color: '#aaa', fontSize: 12 },

// //   legendContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, backgroundColor: '#111', borderBottomWidth: 1, borderColor:'#222' },
// //   legendItem: { flexDirection: 'column', alignItems: 'center' },
// //   legendBox: { width: 20, height: 20, borderRadius: 4, marginBottom: 4, borderWidth: 1, borderColor: '#444' },
// //   legendText: { color: '#888', fontSize: 10 },

// //   scrollContent: { padding: 16 },
// //   decksWrapper: { flexDirection: 'row', justifyContent: 'space-between' },
  
// //   // --- DECK CONTAINER (Dark Grey) ---
// //   deckContainer: { 
// //     width: '48%', 
// //     backgroundColor: '#111', 
// //     borderWidth: 1, 
// //     borderColor: '#333', 
// //     borderRadius: 8, 
// //     padding: 8 
// //   },
// //   deckHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
// //   deckTitle: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

// //   seatsArea: { flexDirection: 'row', justifyContent: 'center' },
  
// //   // Columns
// //   columnLeft: { alignItems: 'center' },
// //   columnRight: { flexDirection: 'row' }, 
// //   subColumn: { alignItems: 'center' },
// //   aisle: { width: 15 },

// //   // --- SEAT STYLES (Dark Mode) ---
// //   seatBox: {
// //     width: 36, 
// //     height: 70, 
// //     marginVertical: 4, 
// //     borderRadius: 4,
// //     borderWidth: 1, 
// //     justifyContent: 'flex-end', 
// //     alignItems: 'center', 
// //     paddingBottom: 4
// //   },
// //   pillow: { width: 20, height: 4, borderRadius: 2, backgroundColor: '#333', position: 'absolute', top: 5 },
// //   ladiesIcon: { position: 'absolute', top: 25 },
// //   seatPrice: { fontSize: 8, color: '#666', fontWeight:'bold' },

// //   // COLORS
// //   seatAvailable: { borderColor: '#555', backgroundColor: '#1a1a1a' }, // Dark grey outline
// //   seatBooked: { borderColor: '#333', backgroundColor: '#222' }, // Very dark filled
// //   seatSelected: { borderColor: '#FF1E1E', backgroundColor: '#FF1E1E' }, // Bright Red
// //   seatFemale: { borderColor: '#FF007F', backgroundColor: '#1a1a1a' }, // Pink Border

// //   // Footer
// //   footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#111', padding: 16, borderTopWidth: 1, borderColor: '#333', flexDirection: 'row', justifyContent: 'space-between', elevation: 5 },
// //   selectedText: { color: '#aaa' },
// //   totalPrice: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
// //   proceedBtn: { backgroundColor: '#FF1E1E', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
// //   btnText: { color: '#fff', fontWeight: 'bold' },
// // });


// import { Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// // --- TYPES ---
// type SeatStatus = 'available' | 'booked' | 'selected' | 'female';
// type DeckType = 'lower' | 'upper';

// interface Seat {
//   id: string;
//   row: number;
//   col: number;
//   deck: DeckType;
//   status: SeatStatus;
//   price: number;
//   bus_id: number; // Added to link to boarding points
// }
// console.log("PARAMS RECEIVED:", route.params);
// export default function SeatSelectionScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
  
//   const [loading, setLoading] = useState(true);
//   const [seatData, setSeatData] = useState<Seat[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchSeats = async () => {
//       try {
//         setLoading(true);
//         setSelectedSeats([]); // 🚀 Fix: Clear previous selection on new bus visit
        
//         // Fetch seats based on unique scheduleId
//         const response = await fetch(
//           `http://172.24.149.252:3000/get-seats?scheduleId=${params.scheduleId}`
//         );
//         const data = await response.json();
        
//         if (Array.isArray(data)) {
//           setSeatData(data);
//         } else {
//           setSeatData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching seats:", error);
//         setSeatData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (params.scheduleId) {
//       fetchSeats();
//     }
//   }, [params.scheduleId]);

//   const handleSeatPress = (seat: Seat) => {
//     // Prevent clicking booked seats
//     if (seat.status === 'booked' || seat.status === 'female') return; 

//     if (selectedSeats.includes(seat.id)) {
//       setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
//     } else {
//       if (selectedSeats.length >= 6) {
//         Alert.alert("Limit Reached", "You can only select up to 6 seats.");
//         return;
//       }
//       setSelectedSeats([...selectedSeats, seat.id]);
//     }
//   };

//   const totalPrice = selectedSeats.length * (seatData.length > 0 ? seatData[0].price : 0);

//   const renderSeat = (seat: Seat) => {
//     const isSelected = selectedSeats.includes(seat.id);
    
//     let seatStyle = styles.seatAvailable;
//     let iconName = null;

//     // 🚀 Logic: Visual differentiation for Male vs Female bookings
//     if (seat.status === 'booked') {
//         seatStyle = styles.seatBooked;
//     } else if (seat.status === 'female') {
//         seatStyle = styles.seatFemale;
//     } else if (isSelected) {
//         seatStyle = styles.seatSelected;
//     }

//     return (
//       <TouchableOpacity
//         key={seat.id}
//         style={[styles.seatBox, seatStyle]}
//         onPress={() => handleSeatPress(seat)}
//         disabled={seat.status === 'booked' || seat.status === 'female'} 
//       >
//         <View style={[styles.pillow, isSelected ? {backgroundColor: '#fff'} : {}]} />
        
//         {seat.status === 'female' && (
//             <Ionicons name="woman" size={14} color="#fff" style={styles.centerIcon} />
//         )}
//         {seat.status === 'booked' && (
//             <Ionicons name="man" size={14} color="#666" style={styles.centerIcon} />
//         )}

//         <Text style={[styles.seatPrice, (isSelected || seat.status === 'female') && {color: '#fff'}]}>
//           {isSelected ? seat.id : seat.status === 'available' ? `₹${seat.price}` : ''}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderDeck = (deckName: DeckType, label: string) => {
//     // 🚀 Fix: Safety check using (seatData || []) to prevent .filter crash
//     const deckSeats = (seatData || []).filter(s => s.deck === deckName);
    
//     return (
//       <View style={styles.deckContainer}>
//         <View style={styles.deckHeader}>
//             <Text style={styles.deckTitle}>{label} Deck</Text>
//             {deckName === 'lower' && <Ionicons name="steering-wheel" size={24} color="#666" />}
//         </View>
//         <View style={styles.seatsArea}>
//           <View style={styles.columnLeft}>
//             {deckSeats.filter(s => s.col === 1).map(seat => renderSeat(seat))}
//           </View>
//           <View style={styles.aisle} />
//           <View style={styles.columnRight}>
//              <View style={styles.subColumn}>
//                 {deckSeats.filter(s => s.col === 2).map(seat => renderSeat(seat))}
//              </View>
//              <View style={{width: 6}} /> 
//              <View style={styles.subColumn}>
//                 {deckSeats.filter(s => s.col === 3).map(seat => renderSeat(seat))}
//              </View>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   if (loading) return (
//       <View style={{flex:1, backgroundColor:'#000', justifyContent:'center', alignItems:'center'}}>
//           <ActivityIndicator size="large" color="#FF1E1E" />
//       </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <View style={styles.headerContent}>
//           <Text style={styles.routeTitle}>{params.fromCity} → {params.toCity}</Text>
//           <Text style={styles.subTitle}>{params.travelDate}</Text>
//         </View>
//       </View>

//       {/* LEGEND */}
//       <View style={styles.legend}>
//         <View style={styles.legendItem}><View style={[styles.lBox, styles.seatAvailable]} /><Text style={styles.lText}>Empty</Text></View>
//         <View style={styles.legendItem}><View style={[styles.lBox, styles.seatBooked]} /><Text style={styles.lText}>Male</Text></View>
//         <View style={styles.legendItem}><View style={[styles.lBox, styles.seatFemale]} /><Text style={styles.lText}>Female</Text></View>
//         <View style={styles.legendItem}><View style={[styles.lBox, styles.seatSelected]} /><Text style={styles.lText}>Chosen</Text></View>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.decksWrapper}>
//           {renderDeck('lower', 'Lower')}
//           {renderDeck('upper', 'Upper')}
//         </View>
//       </ScrollView>

//       {selectedSeats.length > 0 && (
//         <View style={styles.footer}>
//           <View>
//             <Text style={styles.selectedText}>{selectedSeats.length} Seat(s) Selected</Text>
//             <Text style={styles.totalPrice}>₹{totalPrice}</Text>
//           </View>
//           {/* <TouchableOpacity 
//             style={styles.proceedBtn} 
//             onPress={() => router.push({
//                 pathname: '/boarding',
//                 params: { 
//                     ...params, 
//                     selectedSeats: selectedSeats.join(','), 
//                     totalPrice,
//                     // 🚀 CRITICAL: Passing bus_id from database to fetch points
//                     busId: seatData[0]?.bus_id 
//                 }
//             })}
//           >
//             <Text style={styles.btnText}>Select Points</Text>
//           </TouchableOpacity> */}
//           <TouchableOpacity 
//   style={styles.proceedBtn} 
//   onPress={() => {
//     // 🚀 Check seatData first, if not available yet, use params from previous page
//     const finalBusId = seatData[0]?.bus_id || params.busId;

//     router.push({
//         pathname: '/boarding',
//         params: { 
//             ...params, 
//             selectedSeats: selectedSeats.join(','), 
//             totalPrice,
//             busId: finalBusId // This will now be a real ID (1 or 7 etc.)
//         }
//     });
//   }}
// >
//   <Text style={styles.btnText}>Select Points</Text>
// </TouchableOpacity>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   header: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderColor: '#222', alignItems: 'center', marginTop: 35 },
//   headerContent: { marginLeft: 16 },
//   routeTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   subTitle: { color: '#aaa', fontSize: 12 },
  
//   legend: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: '#111' },
//   legendItem: { flexDirection: 'row', alignItems: 'center' },
//   lBox: { width: 14, height: 14, borderRadius: 2, marginRight: 5 },
//   lText: { color: '#aaa', fontSize: 10 },

//   scrollContent: { padding: 16, paddingBottom: 100 },
//   decksWrapper: { flexDirection: 'row', justifyContent: 'space-between' },
//   deckContainer: { width: '48%', backgroundColor: '#111', borderWidth: 1, borderColor: '#333', borderRadius: 8, padding: 8 },
//   deckHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
//   deckTitle: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
//   seatsArea: { flexDirection: 'row', justifyContent: 'center' },
//   columnLeft: { alignItems: 'center' },
//   columnRight: { flexDirection: 'row' }, 
//   subColumn: { alignItems: 'center' },
//   aisle: { width: 15 },
  
//   seatBox: { width: 36, height: 70, marginVertical: 4, borderRadius: 4, borderWidth: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 4, position: 'relative' },
//   pillow: { width: 20, height: 4, borderRadius: 2, backgroundColor: '#333', position: 'absolute', top: 5 },
//   centerIcon: { position: 'absolute', top: 25 },
//   seatPrice: { fontSize: 8, color: '#666', fontWeight:'bold' },

//   seatAvailable: { borderColor: '#444', backgroundColor: '#1a1a1a' },
//   seatBooked: { borderColor: '#222', backgroundColor: '#333', opacity: 0.6 },
//   seatSelected: { borderColor: '#FF1E1E', backgroundColor: '#FF1E1E' },
//   seatFemale: { borderColor: '#FF007F', backgroundColor: '#FF007F' },

//   footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#111', padding: 20, borderTopWidth: 1, borderColor: '#333', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   selectedText: { color: '#aaa', fontSize: 12 },
//   totalPrice: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
//   proceedBtn: { backgroundColor: '#FF1E1E', paddingVertical: 14, paddingHorizontal: 25, borderRadius: 10 },
//   btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
// });



import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Match the types to your actual LOG output
type SeatStatus = 'available' | 'booked' | 'female';
type DeckType = 'lower' | 'upper';

interface Seat {
  id: string;      // From your Log: "L11"
  row: number;     // From your Log: 1
  col: number;     // From your Log: 1
  deck: DeckType;  // From your Log: "lower"
  status: SeatStatus; // From your Log: "booked" or "available"
  price: string;   // From your Log: "1200.00"
  bus_id?: number; 
}

export default function SeatSelectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [loading, setLoading] = useState(true);
  const [seatData, setSeatData] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    if (params.scheduleId) {
      fetchSeats();
    }
  }, [params.scheduleId]);

  const fetchSeats = async () => {
    try {
      setLoading(true);
      setSelectedSeats([]); 
      
      const response = await fetch(
        `http://172.24.149.252:3000/get-seats?scheduleId=${params.scheduleId}`
      );
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setSeatData(data);
      } else {
        setSeatData([]);
      }
    } catch (error) {
      console.log("FETCH ERROR:", error);
      setSeatData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatPress = (seat: Seat) => {
    // Logic matches your status "booked" from logs
    if (seat.status === 'booked' || seat.status === 'female') return; 

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      if (selectedSeats.length >= 6) {
        Alert.alert("Limit Reached", "Max 6 seats allowed.");
        return;
      }
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  // Convert string price to number for calculation
  const unitPrice = seatData.length > 0 ? parseFloat(seatData[0].price) : 0;
  const totalPrice = selectedSeats.length * unitPrice;

  const renderSeat = (seat: Seat) => {
    const isSelected = selectedSeats.includes(seat.id);
    let seatStyle = styles.seatAvailable;

    if (seat.status === 'booked') seatStyle = styles.seatBooked;
    else if (seat.status === 'female') seatStyle = styles.seatFemale;
    else if (isSelected) seatStyle = styles.seatSelected;

    return (
      <TouchableOpacity
        key={seat.id} // Fixed: Uses "id" from your API logs
        style={[styles.seatBox, seatStyle]}
        onPress={() => handleSeatPress(seat)}
        disabled={seat.status === 'booked'} 
      >
        <View style={[styles.pillow, isSelected ? {backgroundColor: '#fff'} : {}]} />
        
        {seat.status === 'female' && <Ionicons name="woman" size={14} color="#fff" style={styles.centerIcon} />}
        {seat.status === 'booked' && <Ionicons name="man" size={14} color="#666" style={styles.centerIcon} />}

        <Text style={[styles.seatPrice, (isSelected || seat.status === 'female') && {color: '#fff'}]}>
          {isSelected ? seat.id : seat.status === 'available' ? `₹${seat.price}` : ''}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDeck = (deckName: DeckType, label: string) => {
    const deckSeats = (seatData || []).filter(s => s.deck === deckName);
    
    return (
      <View style={styles.deckContainer}>
        <View style={styles.deckHeader}>
            <Text style={styles.deckTitle}>{label} Deck</Text>
            {deckName === 'lower' && <Ionicons name="steering-wheel" size={24} color="#666" />}
        </View>
        <View style={styles.seatsArea}>
          <View style={styles.columnLeft}>
            {deckSeats.filter(s => s.col === 1).map(seat => renderSeat(seat))}
          </View>
          <View style={styles.aisle} />
          <View style={styles.columnRight}>
             <View style={styles.subColumn}>
                {deckSeats.filter(s => s.col === 2).map(seat => renderSeat(seat))}
             </View>
             <View style={{width: 6}} /> 
             <View style={styles.subColumn}>
                {deckSeats.filter(s => s.col === 3).map(seat => renderSeat(seat))}
             </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading) return (
      <View style={{flex:1, backgroundColor:'#000', justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#FF1E1E" />
      </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.routeTitle}>{params.fromCity} → {params.toCity}</Text>
          <Text style={styles.subTitle}>{params.travelDate}</Text>
        </View>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}><View style={[styles.lBox, styles.seatAvailable]} /><Text style={styles.lText}>Empty</Text></View>
        <View style={styles.legendItem}><View style={[styles.lBox, styles.seatBooked]} /><Text style={styles.lText}>Booked</Text></View>
        <View style={styles.legendItem}><View style={[styles.lBox, styles.seatFemale]} /><Text style={styles.lText}>Female</Text></View>
        <View style={styles.legendItem}><View style={[styles.lBox, styles.seatSelected]} /><Text style={styles.lText}>Chosen</Text></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.decksWrapper}>
          {renderDeck('lower', 'Lower')}
          {renderDeck('upper', 'Upper')}
        </View>
      </ScrollView>

      {selectedSeats.length > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={styles.selectedText}>{selectedSeats.length} Seat(s)</Text>
            <Text style={styles.totalPrice}>₹{totalPrice.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.proceedBtn}
            onPress={() => {
              const rawScheduleId = params.scheduleId;
              const scheduleId = Array.isArray(rawScheduleId)
                ? rawScheduleId[0]
                : rawScheduleId;

              if (!scheduleId) {
                Alert.alert(
                  'System Error',
                  'Missing trip information. Please go back and select the bus again.',
                );
                return;
              }

              router.push({
                pathname: '/boarding',
                params: {
                  ...params,
                  selectedSeats: selectedSeats.join(','),
                  totalPrice: totalPrice.toString(),
                  scheduleId: scheduleId.toString(),
                },
              });
            }}
          >
            <Text style={styles.btnText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderColor: '#222', alignItems: 'center', marginTop: 35 },
  headerContent: { marginLeft: 16 },
  routeTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subTitle: { color: '#aaa', fontSize: 12 },
  legend: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: '#111' },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  lBox: { width: 14, height: 14, borderRadius: 2, marginRight: 5 },
  lText: { color: '#aaa', fontSize: 10 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  decksWrapper: { flexDirection: 'row', justifyContent: 'space-between' },
  deckContainer: { width: '48%', backgroundColor: '#111', borderWidth: 1, borderColor: '#333', borderRadius: 8, padding: 8 },
  deckHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  deckTitle: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  seatsArea: { flexDirection: 'row', justifyContent: 'center' },
  columnLeft: { alignItems: 'center' },
  columnRight: { flexDirection: 'row' }, 
  subColumn: { alignItems: 'center' },
  aisle: { width: 15 },
  seatBox: { width: 36, height: 70, marginVertical: 4, borderRadius: 4, borderWidth: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 4, position: 'relative' },
  pillow: { width: 20, height: 4, borderRadius: 2, backgroundColor: '#333', position: 'absolute', top: 5 },
  centerIcon: { position: 'absolute', top: 25 },
  seatPrice: { fontSize: 8, color: '#666', fontWeight:'bold' },
  seatAvailable: { borderColor: '#444', backgroundColor: '#1a1a1a' },
  seatBooked: { borderColor: '#222', backgroundColor: '#333', opacity: 0.6 },
  seatSelected: { borderColor: '#FF1E1E', backgroundColor: '#FF1E1E' },
  seatFemale: { borderColor: '#FF007F', backgroundColor: '#FF007F' },
  footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#111', padding: 20, borderTopWidth: 1, borderColor: '#333', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  selectedText: { color: '#aaa', fontSize: 12 },
  totalPrice: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  proceedBtn: { backgroundColor: '#FF1E1E', paddingVertical: 14, paddingHorizontal: 25, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});