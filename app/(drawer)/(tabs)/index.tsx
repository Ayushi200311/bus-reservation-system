import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../../../constants/theme';



export default function Home() {
  const router = useRouter();
  const navigation = useNavigation();
 const [cities, setCities] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  // Removed the ': Date' type annotation which causes errors in standard JS files
  const handleConfirm = (selectedDate: Date) => {
      const formatted = selectedDate.toLocaleDateString();
      setDate(formatted);
      hideDatePicker();
    };
    
   useEffect(() => {
  const fetchCities = async () => {
    try {
      // 1. Fetch data
      const response = await fetch('http://172.24.149.252:3000/cities');
      
      // 2. Check if response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // 3. CRITICAL CHECK: Ensure data is actually an array before setting it
      if (Array.isArray(data)) {
        setCities(data);
      } else {
        console.error("API returned non-array data:", data);
        setCities([]); // Fallback to empty array to prevent crash
      }

    } catch (err) {
      console.error("Error fetching cities:", err);
      setCities([]); // Fallback to empty array on error
    }
  };
  fetchCities();
}, []);
  const handleSearch = () => {
    if (!from || !to || !date) {
      Alert.alert("Selection Missing", "Please select Source, Destination, and Date");
      return;
    }
    
    router.push({
      pathname: '/buslist',
      params: { fromCity: from, toCity: to, travelDate: date }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={28} color="#fff"/>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => router.push('../profile')}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
        </TouchableOpacity> */}
      </View>
      
      <View style={styles.card}>
        
        <Text style={styles.label}>From</Text>
        <View style={styles.inputBox}>
          <Picker
            selectedValue={from}
            onValueChange={(itemValue) => setFrom(itemValue)}
            style={{ flex: 1, color: COLORS.text }}
            dropdownIconColor={COLORS.primary}
          >
            <Picker.Item label="Select Source" value="" color={COLORS.muted} />
            {cities && cities.map((item, index) => (
              <Picker.Item 
                key={item?.id ? String(item.id) : `from-${index}`} 
                label={item?.city_name || "Loading..."} 
                value={item?.city_name || ""} 
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>To</Text>
        <View style={styles.inputBox}>
          <Picker
            selectedValue={to}
            onValueChange={(itemValue) => setTo(itemValue)}
            style={{ flex: 1, color: COLORS.text }}
            dropdownIconColor={COLORS.primary}
          >
            <Picker.Item label="Select Destination" value="" color={COLORS.muted} />
            {cities && cities.map((item, index) => (
              <Picker.Item 
                key={item?.id ? String(item.id) : `to-${index}`} 
                label={item?.city_name || "Loading..."} 
                value={item?.city_name || ""} 
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Date of Journey</Text>
        <TouchableOpacity style={styles.inputBox} onPress={showDatePicker}>
          <Icon name="date-range" size={20} color={COLORS.primary} />
          <Text style={{ marginLeft: 10, color: date ? COLORS.text : COLORS.muted }}>
            {date || "Select Date"}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />

        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchText}>Search Buses</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },


  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '700',
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: 20,
    marginBottom: 30,
  },

  label: {
    color: COLORS.text,
    marginBottom: 6,
    marginTop: 12,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
  },

  searchBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    marginTop: 25,
  },

  searchText: {
    color: COLORS.text,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },

  routeCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 12,
  },

  route: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },

  routeSub: {
    color: COLORS.muted,
    marginTop: 4,
  },
});
