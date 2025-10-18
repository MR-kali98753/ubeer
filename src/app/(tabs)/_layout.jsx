import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { Home, Search, Clock, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#ffffff',
          borderRadius: 24,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={80}
              tint="light"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 24,
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
            />
          ) : null
        ),
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#7e8493',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: 50,
          borderRadius: 16,
          marginHorizontal: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#004a53' : 'transparent',
                borderRadius: 16,
                width: 60,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                ...(!focused && { paddingTop: 2 }),
              }}
            >
              <Home size={focused ? 26 : 24} color={focused ? '#ffffff' : color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#004a53' : 'transparent',
                borderRadius: 16,
                width: 60,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                ...(!focused && { paddingTop: 2 }),
              }}
            >
              <Search size={focused ? 26 : 24} color={focused ? '#ffffff' : color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#004a53' : 'transparent',
                borderRadius: 16,
                width: 60,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                ...(!focused && { paddingTop: 2 }),
              }}
            >
              <Clock size={focused ? 26 : 24} color={focused ? '#ffffff' : color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#004a53' : 'transparent',
                borderRadius: 16,
                width: 60,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                ...(!focused && { paddingTop: 2 }),
              }}
            >
              <User size={focused ? 26 : 24} color={focused ? '#ffffff' : color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="trip-summary"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="ride-summary"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="rate-driver"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}