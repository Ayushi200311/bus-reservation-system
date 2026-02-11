import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function Signup(){
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');


  // Inside your Signup function in Signup.js
// const handleSignup = async () => {
//   if (!name || !phone) {
//     alert("Please enter Name and Phone");
//     return;
//   }

//   try {
//     // Replace 192.168.1.XX with YOUR actual IP address
//     const response = await fetch('http://192.168.1.14:3000/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: name,
//         phone: phone
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       // console.log("Success:", data.message);
//       alert("Success: " + data.message);
//       router.push('/otp'); // Move to OTP screen only if DB save works
//     } else {
//       alert("Registration failed: " + data.message);
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Cannot connect to server. Check if Node.js is running.");
//   }
// };

const handleSignup = async () => {
  if (!name || !phone) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch('http://172.24.149.252:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone }),
    });

    const data = await response.json(); 

    if (response.ok) {
      // 1. Alert the user (using template literals)
      alert(`Registration Successful!\nYour OTP is: ${data.otp}`); 

      // 2. Navigate and pass the OTP
      router.push({
        pathname: '/otp',
        params: { correctOtp: data.otp } 
      });
    } else {
      // This fixes the "Undefined" error by providing a fallback
      alert("Error: " + (data.message || "Something went wrong"));
    }
  } catch (error) {
    alert("Network Error: Could not connect to server");
  }
};
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.muted}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneRow}>
          <View style={styles.countryBox}>
            <Text style={styles.countryText}>+91</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="9876543210"
            placeholderTextColor={COLORS.muted}
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Already have an account?{' '}
          <TouchableOpacity
          onPress={() => router.push('/login')}
          >
            <Text style={styles.link}>Sign In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: SIZES.title,
    fontWeight: '700',
    marginLeft: 15,
  },
  form: {
    marginTop: 60,
  },
  label: {
    color: COLORS.text,
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    color: COLORS.text,
    marginBottom: 20,
  },
  phoneRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  countryBox: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    marginRight: 10,
  },
  countryText: {
    color: COLORS.text,
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  footer: {
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 30,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
