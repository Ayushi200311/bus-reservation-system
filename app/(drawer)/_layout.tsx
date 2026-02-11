import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../../components/CustomDrawer';
import { COLORS } from '../../constants/theme';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={() => <CustomDrawer />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.primary,
          width: 280,
        },
      }}
    >
      {/* This loads your tabs inside drawer */}
      <Drawer.Screen
        name="index"
        options={{ title: 'Home' }}
      />
    </Drawer>
  );
}


// import { Drawer } from 'expo-router/drawer';

// export default function DrawerLayout() {
//   return (
//     <Drawer>
      
//       <Drawer.Screen 
//         name="settings" 
//         options={{ drawerLabel: 'Settings' }} 
//       />
//     </Drawer>
//   );
// }