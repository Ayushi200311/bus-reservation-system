import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  // const handleLogin = async () => {
  //   if (!phone) {
  //     alert("Please enter your phone number");
  //     return;
  //   }

  //   try {
  //     const response = await fetch('http://192.168.104.252:3000/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ phone }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert("Your Login OTP is: " + data.otp);
  //       router.push({
  //         pathname: '/otp',
  //         params: { correctOtp: data.otp } // Passing OTP to verify
  //       });
  //     } else {
  //       alert(data.message); // Will show "Phone number not registered"
  //     }
  //   } catch (error) {
  //     alert("Connection Error");
  //   }
  // };
  const handleLogin = async () => {
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    try {
      const response = await fetch('http://172.24.149.252
        :3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ SAVE PHONE NUMBER HERE
        await AsyncStorage.setItem('userPhone', phone); 

        alert("Your Login OTP is: " + data.otp);
        router.push({
          pathname: '/otp',
          params: { correctOtp: data.otp } 
        });
      } else {
        alert(data.message); 
      }
    } catch (error) {
      alert("Connection Error");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor={COLORS.muted}
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => router.push('./signup')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20, justifyContent: 'center' },
  title: { color: COLORS.text, fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: 16, color: COLORS.text, marginBottom: 20 },
  button: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: SIZES.radius },
  buttonText: { color: COLORS.text, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  footer: { color: COLORS.muted, textAlign: 'center', marginTop: 30 },
  link: { color: COLORS.primary, fontWeight: '600' },
});





// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView, // 1. Import ScrollView
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// export default function LoginScreen() {
//   const router = useRouter();
//   const [isAdminMode, setIsAdminMode] = useState(false); 
//   const [phone, setPhone] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   // --- 1. HANDLE USER LOGIN (Phone) ---
//   const handleUserLogin = async () => {
//     if (phone.length !== 10) {
//       Alert.alert("Invalid", "Enter 10-digit phone number");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch('http://172.24.149.252:3000/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         await AsyncStorage.setItem('userPhone', phone);
//         router.push({ pathname: '/otp', params: { otp: data.otp, phone: phone } });
//       } else {
//         Alert.alert("Error", data.message);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Network connection failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- 2. HANDLE ADMIN LOGIN (Username/Pass) ---
//   const handleAdminLogin = async () => {
//     if (!username || !password) {
//         Alert.alert("Invalid", "Fill all fields");
//         return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch('http://172.24.149.252:3000/admin-login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         router.replace('../admin/dashboard'); 
//       } else {
//         Alert.alert("Failed", "Invalid Username or Password");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Network connection failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* 2. KeyboardAvoidingView wraps everything */}
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{ flex: 1 }}
//       >
//         {/* 3. ScrollView ensures content can move up */}
//         <ScrollView 
//           contentContainerStyle={styles.scrollContent} 
//           keyboardShouldPersistTaps="handled"
//         >
          
//           <Text style={styles.title}>
//               {isAdminMode ? "Admin Portal" : "Welcome Back"}
//           </Text>
//           <Text style={styles.subtitle}>
//               {isAdminMode ? "Manage your bus empire" : "Login to book tickets"}
//           </Text>

//           {isAdminMode ? (
//               <>
//                   <TextInput 
//                       style={styles.input} 
//                       placeholder="Admin Username" 
//                       placeholderTextColor="#666"
//                       value={username} onChangeText={setUsername}
//                       autoCapitalize="none"
//                   />
//                   <TextInput 
//                       style={[styles.input, {marginTop: 15}]} 
//                       placeholder="Password" 
//                       placeholderTextColor="#666"
//                       secureTextEntry
//                       value={password} onChangeText={setPassword}
//                   />
//               </>
//           ) : (
//               <TextInput 
//                   style={styles.input} 
//                   placeholder="Mobile Number" 
//                   placeholderTextColor="#666"
//                   keyboardType="phone-pad"
//                   maxLength={10}
//                   value={phone} onChangeText={setPhone}
//               />
//           )}

//           <TouchableOpacity 
//               style={styles.button} 
//               onPress={isAdminMode ? handleAdminLogin : handleUserLogin}
//               disabled={loading}
//           >
//               {loading ? <ActivityIndicator color="#fff" /> : 
//                <Text style={styles.buttonText}>{isAdminMode ? "Enter Dashboard" : "Get OTP"}</Text>
//               }
//           </TouchableOpacity>

//           <TouchableOpacity 
//               style={{marginTop: 20}} 
//               onPress={() => {
//                   setIsAdminMode(!isAdminMode);
//                   setUsername(''); setPassword(''); setPhone('');
//               }}
//           >
//               <Text style={styles.linkText}>
//                   {isAdminMode ? "Go back to " : "Are you an admin? "}
//                   <Text style={{color: '#FF1E1E', fontWeight:'bold'}}>
//                       {isAdminMode ? "User Login" : "Login Here"}
//                   </Text>
//               </Text>
//           </TouchableOpacity>

//           {!isAdminMode && (
//               <TouchableOpacity onPress={() => router.push('/signup')} style={{marginTop: 10}}>
//                   <Text style={styles.linkText}>New User? <Text style={{color: '#FF1E1E', fontWeight:'bold'}}>Sign Up</Text></Text>
//               </TouchableOpacity>
//           )}

//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   // 4. Center content inside ScrollView using contentContainerStyle
//   scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  
//   title: { fontSize: 32, color: '#fff', fontWeight: 'bold', marginBottom: 10 },
//   subtitle: { fontSize: 16, color: '#aaa', marginBottom: 40 },
//   input: { backgroundColor: '#111', color: '#fff', fontSize: 16, padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
//   button: { backgroundColor: '#FF1E1E', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
//   buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
//   linkText: { color: '#aaa', textAlign: 'center' }
// });