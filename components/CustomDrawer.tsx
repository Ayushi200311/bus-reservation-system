// import { useNavigation } from '@react-navigation/native';
// import { useRouter } from 'expo-router';
// import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { COLORS } from '../constants/theme';


// export default function CustomDrawer() {
//   const router = useRouter();
//   const navigation = useNavigation();

//   const Item = ({ icon, label, route }) => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() => route && router.push(route)}
//     >
//       <Icon name={icon} size={22} color="#fff" />
//       <Text style={styles.label}>{label}</Text>
//     </TouchableOpacity>
//   );

//   const logout = () => {
//     Alert.alert("Logout", "Are you sure you want to logout?", [
//       { text: "Cancel" },
//       { text: "Logout", onPress: () => router.replace('/login') }
//     ]);
//   };

//   return (
//     <View style={styles.container}>
      
//       {/* Profile Header */}
//       <TouchableOpacity style={styles.header} onPress={() => router.push('/profile')}>
//         <Image
//           source={{ uri: 'https://i.pravatar.cc/300' }}
//           style={styles.avatar}
//         />
//         <Text style={styles.name}>Robbus Yaman</Text>
//         <Text style={styles.email}>demo@gmail.com</Text>
//       </TouchableOpacity>

//       {/* Menu */}
//       <Item icon="person" label="My Profile" route="/profile" />
//       <Item icon="payment" label="Payment Methods" route="/payments" />
//       <Item icon="feedback" label="Customer Feedback" route="/feedback" />
//       <Item icon="card-giftcard" label="Gift Card" route="/giftcard" />
//       <Item icon="support-agent" label="Support" route="/support" />
//       <Item icon="lock" label="Change Password" route="/changepassword" />

//       <TouchableOpacity style={styles.item} onPress={logout}>
//         <Icon name="logout" size={22} color="#FF1E1E" />
//         <Text style={[styles.label, { color: '#FF1E1E' }]}>Log Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingTop: 60,
//   },

//   header: {
//     alignItems: 'center',
//     marginBottom: 30,
//     paddingBottom: 20,
//     borderBottomWidth: 1,
//     borderColor: '#222',
//   },

//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//     marginBottom: 10,
//   },

//   name: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//   },

//   email: {
//     color: '#aaa',
//     fontSize: 13,
//   },

//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 22,
//   },

//   label: {
//     color: '#fff',
//     fontSize: 15,
//     marginLeft: 16,
//   },
// });


import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ Import this
import { useRouter } from 'expo-router';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CustomDrawer() {
  const router = useRouter();

  // --- MENU ITEM COMPONENT ---
  const Item = ({ icon, label, route }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        if (route) router.push(route);
      }}
    >
      <Icon name={icon} size={22} color="#fff" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );

  // --- REAL LOGOUT LOGIC ---
  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        style: "destructive",
        onPress: async () => {
          // 1. Clear the stored phone number
          await AsyncStorage.removeItem('userPhone');
          
          // 2. Redirect to Login Screen
          router.replace('/login'); 
        } 
      }
    ]);
  };

  return (
    <View style={styles.container}>
      
      {/* 1. PROFILE HEADER */}
      <TouchableOpacity style={styles.header} onPress={() => router.push('/profile')}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }} // You can fetch real user image later
          style={styles.avatar}
        />
        <Text style={styles.name}>Hello User</Text>
        <Text style={styles.email}>View Profile</Text>
      </TouchableOpacity>

      {/* 2. MENU ITEMS (Matched to your Features) */}
      
      {/* Feature: Profile */}
      <Item icon="person" label="My Profile" route="/profile" />

      {/* Feature: The Booking History we just made */}
      <Item icon="history" label="My Bookings" route="/my-bookings" /> 

      {/* Feature: The Notifications/Offers we just made */}
      <Item icon="notifications" label="Notifications & Offers" route="/notifications" />

      {/* Requested: Keep Feedback */}
      <Item icon="feedback" label="Customer Feedback" route="/feedback" />

      {/* Standard App Features */}
      <Item icon="support-agent" label="Help & Support" route="/support" />
      
      <View style={styles.divider} />

      {/* 3. LOGOUT BUTTON */}
      <TouchableOpacity style={styles.item} onPress={logout}>
        <Icon name="logout" size={22} color="#FF1E1E" />
        <Text style={[styles.label, { color: '#FF1E1E' }]}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // OR COLORS.background
    paddingTop: 60,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#222',
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FF1E1E', // Your Theme Red
    marginBottom: 10,
  },

  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  email: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 22,
  },

  label: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 16,
    fontWeight: '500'
  },

  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 10,
    marginHorizontal: 20
  }
});