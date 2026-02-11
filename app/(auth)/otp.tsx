import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function OTP(){
  const router = useRouter();
  const { correctOtp } = useLocalSearchParams();
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
  if (otp === correctOtp.toString()) {
    alert("Welcome Back!");
    router.replace('../(tabs)'); // Use replace so they can't go back to OTP screen
  } else {
    alert("Invalid OTP");
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit OTP sent to your phone
      </Text>

      <TextInput
        style={styles.otpInput}
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <Text style={styles.resend}>Resend OTP</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'center',
    paddingBottom: 200,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: 40,
  },
  otpInput: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: 18,
    color: COLORS.text,
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: 12,
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  resend: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 25,
    fontWeight: '600',
  },
});
