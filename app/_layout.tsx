// // import { Stack } from 'expo-router';

// // export default function RootLayout() {
// //   return (
// //     <Stack screenOptions={{ headerShown: false }}>
// //       <Stack.Screen name="onboarding" />
// //       <Stack.Screen name="(tabs)" />
// //     </Stack>
// //   );
// // }




// import { Stack } from 'expo-router';

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="(auth)" />
//       <Stack.Screen name="(tabs)" />
//       {/* <Stack.Screen name="modal" presentation="modal" /> */}
//     </Stack>
//   );
// }


import { AlertProvider } from '../hooks/useAlert';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const isLoggedIn = false; // Replace with your real Auth Logic later

  return (
    <AlertProvider>
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // Go to the Drawer (which contains Tabs)
        <Stack.Screen name="(drawer)" />
      ) : (
        // Go to Auth
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
    </AlertProvider>
  );
}