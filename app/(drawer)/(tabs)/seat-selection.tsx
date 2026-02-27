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