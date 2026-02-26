// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { COLORS, SIZES } from '../constants/theme';

// export default function OTP() {
//   const router = useRouter();
//   const { correctOtp, phone } = useLocalSearchParams();
//   const [otp, setOtp] = useState('');

//   const handleVerify = async () => {
//     if (otp === correctOtp?.toString()) {
//       try {
//         if (phone) {
//           await AsyncStorage.setItem('userPhone', phone.toString());
//         }
//         alert("Welcome Back!");
//         router.replace('../(tabs)'); 
//       } catch (error) {
//         alert("Error saving profile");
//       }
//     } else {
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Verify OTP</Text>
//       <Text style={styles.subtitle}>Enter the code sent to your phone</Text>

//       {/* 1. INPUT FIELD WITH AUTOFILL PROPS */}
//       <TextInput
//         style={styles.otpInput}
//         keyboardType="number-pad"
//         maxLength={6}
//         value={otp}
//         onChangeText={setOtp}
//         autoComplete="sms-otp"        
//         textContentType="oneTimeCode" 
//       />

//       {/* 2. THE AUTOFILL BUTTON (SOLUTION FOR NO-SMS) */}
//       {otp.length === 0 && (
//         <TouchableOpacity 
//           style={styles.autofillBanner} 
//           onPress={() => setOtp(correctOtp.toString())}
//         >
//           <Text style={styles.autofillText}>
//             🪄 Tap to autofill: {correctOtp}
//           </Text>
//         </TouchableOpacity>
//       )}

//       <TouchableOpacity style={styles.button} onPress={handleVerify}>
//         <Text style={styles.buttonText}>Verify</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => alert("Your OTP is: " + correctOtp)}>
//         <Text style={styles.resend}>Resend OTP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     padding: 20,
//     justifyContent: 'center',
//     paddingBottom: 200,
//   },
//   title: {
//     color: COLORS.text,
//     fontSize: 28,
//     fontWeight: '700',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     color: COLORS.muted,
//     textAlign: 'center',
//     marginBottom: 40,
//   },
//   otpInput: {
//     backgroundColor: COLORS.card,
//     borderRadius: SIZES.radius,
//     padding: 18,
//     color: COLORS.text,
//     fontSize: 22,
//     textAlign: 'center',
//     letterSpacing: 12,
//     marginBottom: 20,
//   },
//   autofillBanner: {
//     backgroundColor: COLORS.card,
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     alignItems: 'center',
//   },
//   autofillText: {
//     color: COLORS.primary,
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 16,
//     borderRadius: SIZES.radius,
//   },
//   buttonText: {
//     color: COLORS.text,
//     fontSize: 18,
//     fontWeight: '700',
//     textAlign: 'center',
//   },
//   resend: {
//     color: COLORS.primary,
//     textAlign: 'center',
//     marginTop: 25,
//     fontWeight: '600',
//   },
// });


import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function OTP() {
  const router = useRouter();
  const { correctOtp, phone } = useLocalSearchParams();
  const [otp, setOtp] = useState('');
  const textInputRef = useRef(null); // Ref to focus the hidden input

  const handleVerify = async () => {
    if (otp === correctOtp?.toString()) {
      try {
        if (phone) {
          await AsyncStorage.setItem('userPhone', phone.toString());
        }
        alert("Welcome Back!");
        router.replace('../(tabs)'); 
      } catch (error) {
        alert("Error saving profile");
      }
    } else {
      alert("Invalid OTP");
    }
  };

  // Helper to render the 6 boxes
  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 6; i++) {
      inputs.push(
        <View key={i} style={[
          styles.box, 
          otp.length === i && styles.activeBox // Highlight the current box
        ]}>
          <Text style={styles.boxText}>{otp[i] || ""}</Text>
        </View>
      );
    }
    return inputs;
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="shield-checkmark-outline" size={50} color={COLORS.primary} />
      </View>

      <Text style={styles.title}>Verify Account</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to {'\n'} +91 {phone}</Text>

      {/* 🚀 THE 6 BOXES DISPLAY */}
      <TouchableOpacity 
        style={styles.otpContainer} 
        activeOpacity={1} 
        onPress={() => textInputRef.current.focus()}
      >
        {renderInputs()}
      </TouchableOpacity>

      {/* 🕵️ HIDDEN TEXTINPUT FOR BACKEND LOGIC */}
      <TextInput
        ref={textInputRef}
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
        keyboardType="number-pad"
        style={styles.hiddenInput}
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
      />

      {otp.length === 0 && (
        <TouchableOpacity 
          style={styles.autofillBanner} 
          onPress={() => setOtp(correctOtp.toString())}
        >
          <Text style={styles.autofillText}>🪄 Tap to autofill: {correctOtp}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify & Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert("OTP is: " + correctOtp)} style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive code? </Text>
        <Text style={styles.resendLink}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { color: COLORS.text, fontSize: 28, fontWeight: '700', marginBottom: 10 },
  subtitle: { color: COLORS.muted, textAlign: 'center', marginBottom: 40, lineHeight: 22 },
  
  // 📦 BOX STYLING
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  box: {
    width: 48,
    height: 55,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  activeBox: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  boxText: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  
  autofillBanner: {
    backgroundColor: 'rgba(255, 30, 30, 0.1)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: '100%',
    alignItems: 'center',
  },
  autofillText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 12,
    width: '100%',
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  resendContainer: { flexDirection: 'row', marginTop: 30 },
  resendText: { color: COLORS.muted },
  resendLink: { color: COLORS.primary, fontWeight: '700' },
});