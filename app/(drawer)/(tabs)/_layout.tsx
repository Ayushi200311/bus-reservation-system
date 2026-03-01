// import { Ionicons } from '@expo/vector-icons';
// import { Tabs } from 'expo-router';

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#FF1E1E',
//         tabBarInactiveTintColor: '#888',
//         tabBarStyle: {
//           backgroundColor: '#000',
//           borderTopWidth: 0,
//           height: 60,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           marginBottom: 6,
//         },
//       }}
//     >
//       {/* HOME (index) */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />

//       {/* MY TICKET */}
//       <Tabs.Screen
//         name="ticket"
//         options={{
//           title: 'My Ticket',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="ticket-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       {/* NOTIFICATIONS */}
//       <Tabs.Screen
//         name="notifications"
//         options={{
//           title: 'Notifications',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="notifications-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }


import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // 1. HIDE THE WHITE "BUS APP" HEADER
        headerShown: false,

        // 2. DARK THEME FOOTER
        tabBarStyle: {
          backgroundColor: '#000', 
          borderTopColor: '#222',
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#FF1E1E', 
        tabBarInactiveTintColor: '#666',
      }}
    >
      {/* --- TAB 1: HOME (Mapped to 'index' file) --- */}
      {/* If your home file is named 'home.tsx', change name="index" to name="home" */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      {/* --- TAB 2: MY TICKETS (Bookings) --- */}
      <Tabs.Screen
        name="ticket"
        options={{
          title: 'My Bookings',
          tabBarLabel: 'Tickets',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ticket" size={24} color={color} />
          ),
        }}
      />

      {/* --- TAB 3: CANCELLATIONS --- */}
      <Tabs.Screen
        name="cancellation"
        options={{
          title: 'Cancellations',
          tabBarLabel: 'Cancellation',
          tabBarIcon: ({ color }) => (
            <Ionicons name="close-circle" size={24} color={color} />
          ),
        }}
      />

      {/* --- HIDE EVERYTHING ELSE --- */}
      {/* If a file exists in this folder, you MUST hide it here using href: null */}
      
      <Tabs.Screen name="home" options={{ href: null }} /> 
      <Tabs.Screen name="buslist" options={{ href: null }} />
      <Tabs.Screen name="boarding" options={{ href: null }} />
      <Tabs.Screen name="seat-selection" options={{ href: null }} />
      <Tabs.Screen name="passenger-details" options={{ href: null }} />
      <Tabs.Screen name="payment" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      
    </Tabs>
  );
}