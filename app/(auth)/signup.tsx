// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { COLORS, SIZES } from '../constants/theme';

// // export default function Signup(){
// //   const router = useRouter();
// //   const [name, setName] = useState('');
// //   const [phone, setPhone] = useState('');


// // const handleSignup = async () => {
// //   if (!name || !phone) {
// //     alert("Please fill all fields");
// //     return;
// //   }

// //   try {
// //     const response = await fetch('http://172.24.149.252:3000/signup', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ name, phone }),
// //     });

// //     const data = await response.json(); 

// //     if (response.ok) {
// //       // 1. Alert the user (using template literals)
// //       alert(`Registration Successful!\nYour OTP is: ${data.otp}`); 

// //       // 2. Navigate and pass the OTP
// //       router.push({
// //         pathname: '/otp',
// //         params: { 
// //           correctOtp: data.otp, 
// //           phone: phone // <--- THIS IS THE MISSING PIECE!
// //         } 
// //       });
// //     } else {
// //       // This fixes the "Undefined" error by providing a fallback
// //       alert("Error: " + data.message + "\nDetails: " + data.error);
// //     }
// //   } catch (error) {
// //     alert("Network Error: Could not connect to server");
// //   }
// // };
// //   return (
// //     <View style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => router.back()}>
// //           <Ionicons name="arrow-back" size={26} color={COLORS.text} />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>Create Account</Text>
// //       </View>

// //       {/* Form */}
// //       <View style={styles.form}>
// //         <Text style={styles.label}>Full Name</Text>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Enter your name"
// //           placeholderTextColor={COLORS.muted}
// //           value={name}
// //           onChangeText={setName}
// //         />

// //         <Text style={styles.label}>Phone Number</Text>
// //         <View style={styles.phoneRow}>
// //           <View style={styles.countryBox}>
// //             <Text style={styles.countryText}>+91</Text>
// //           </View>
// //           <TextInput
// //             style={styles.phoneInput}
// //             placeholder="9876543210"
// //             placeholderTextColor={COLORS.muted}
// //             keyboardType="number-pad"
// //             value={phone}
// //             onChangeText={setPhone}
// //           />
// //         </View>

// //         <TouchableOpacity
// //           style={styles.button}
// //           onPress={handleSignup}
// //         >
// //           <Text style={styles.buttonText}>Send OTP</Text>
// //         </TouchableOpacity>

// //         <Text style={styles.footer}>
// //           Already have an account?{' '}
// //           <TouchableOpacity
// //           onPress={() => router.push('/login')}
// //           >
// //             <Text style={styles.link}>Sign In</Text>
// //           </TouchableOpacity>
// //         </Text>
// //       </View>
// //     </View>
// //   );
// // }
// export default function Signup() {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState(''); // 1. Added email state

//   const handleSignup = async () => {
//     // 2. Updated validation
//     if (!name || !phone || !email) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const response = await fetch('http://172.24.149.252:3000/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, phone, email }), // 3. Added email to body
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(`Registration Successful!\nYour OTP is: ${data.otp}`);
//         router.push({
//           pathname: '/otp',
//           params: { correctOtp: data.otp, phone: phone }
//         });
//       } else {
//         alert("Error: " + data.message);
//       }
//     } catch (error) {
//       alert("Network Error: Could not connect to server");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={26} color={COLORS.text} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Create Account</Text>
//       </View>

//       <View style={styles.form}>
//         <Text style={styles.label}>Full Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           placeholderTextColor={COLORS.muted}
//           value={name}
//           onChangeText={setName}
//         />

//         {/* 4. Added Email Input Field */}
//         <Text style={styles.label}>Email Address</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="example@mail.com"
//           placeholderTextColor={COLORS.muted}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={setEmail}
//         />

//         <Text style={styles.label}>Phone Number</Text>
//         <View style={styles.phoneRow}>
//           <View style={styles.countryBox}>
//             <Text style={styles.countryText}>+91</Text>
//           </View>
//           <TextInput
//             style={styles.phoneInput}
//             placeholder="9876543210"
//             placeholderTextColor={COLORS.muted}
//             keyboardType="number-pad"
//             value={phone}
//             onChangeText={setPhone}
//           />
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleSignup}>
//           <Text style={styles.buttonText}>Send OTP</Text>
//         </TouchableOpacity>
        
//         {/* ... rest of your footer code */}
//       </View>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   headerTitle: {
//     color: COLORS.text,
//     fontSize: SIZES.title,
//     fontWeight: '700',
//     marginLeft: 15,
//   },
//   form: {
//     marginTop: 60,
//   },
//   label: {
//     color: COLORS.text,
//     fontSize: 15,
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: COLORS.card,
//     borderRadius: SIZES.radius,
//     padding: SIZES.padding,
//     color: COLORS.text,
//     marginBottom: 20,
//   },
//   phoneRow: {
//     flexDirection: 'row',
//     marginBottom: 25,
//   },
//   countryBox: {
//     backgroundColor: COLORS.card,
//     paddingHorizontal: 16,
//     justifyContent: 'center',
//     borderRadius: SIZES.radius,
//     marginRight: 10,
//   },
//   countryText: {
//     color: COLORS.text,
//     fontSize: 16,
//   },
//   phoneInput: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: SIZES.radius,
//     padding: SIZES.padding,
//     color: COLORS.text,
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 16,
//     borderRadius: SIZES.radius,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: COLORS.text,
//     fontSize: 18,
//     fontWeight: '700',
//     textAlign: 'center',
//   },
//   footer: {
//     color: COLORS.muted,
//     textAlign: 'center',
//     marginTop: 30,
//   },
//   link: {
//     color: COLORS.primary,
//     fontWeight: '600',
//   },
// });



import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Added more icon sets
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    if (!name || !phone || !email) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await fetch('http://172.24.149.252:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Registration Successful!\nYour OTP is: ${data.otp}`);
        router.push({
          pathname: '/otp',
          params: { correctOtp: data.otp, phone: phone }
        });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Network Error: Could not connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>

      <View style={styles.form}>
        {/* Full Name Input */}
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={COLORS.muted}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Input */}
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={20} color={COLORS.primary} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="example@mail.com"
            placeholderTextColor={COLORS.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Phone Number Input */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneRow}>
          <View style={styles.countryBox}>
            <Text style={styles.countryText}>+91</Text>
          </View>
          <View style={[styles.inputContainer, { flex: 1, marginBottom: 0 }]}>
            <Ionicons name="call-outline" size={20} color={COLORS.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="9876543210"
              placeholderTextColor={COLORS.muted}
              keyboardType="number-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
            <Text style={styles.footer}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
        </View>
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
    fontSize: SIZES.title || 24,
    fontWeight: '700',
    marginLeft: 15,
  },
  form: {
    marginTop: 40,
  },
  label: {
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius || 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 55, // Fixed height for consistency
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
  },
  phoneRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  countryBox: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: SIZES.radius || 12,
    marginRight: 10,
    height: 55,
  },
  countryText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius || 12,
    marginTop: 10,
    elevation: 2, // Shadow for Android
    shadowColor: COLORS.primary, // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footer: {
    color: COLORS.muted,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});