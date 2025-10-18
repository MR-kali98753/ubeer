import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import {
  Menu,
  Search,
  Bell,
  MapPin,
  Car,
  Clock,
  ArrowUp,
  Navigation,
} from "lucide-react-native";

const mapCustomStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [nearbyDrivers, setNearbyDrivers] = useState([]);
  const [bottomSheetExpanded, setBottomSheetExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyDrivers();
      // Set up periodic driver updates
      const interval = setInterval(fetchNearbyDrivers, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [location]);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setLocationError(null);

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationError("Location permission denied");
        Alert.alert(
          "Permission Required",
          "Location access is needed to show nearby drivers and provide ride services.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Enable", onPress: getCurrentLocation },
          ],
        );
        setLoading(false);
        return;
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const locationData = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setLocation(locationData);

      // Center map on current location
      if (mapRef.current) {
        mapRef.current.animateToRegion(locationData, 1000);
      }
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationError("Failed to get location");
      Alert.alert(
        "Location Error",
        "Unable to get your current location. Please check your GPS settings.",
        [{ text: "Retry", onPress: getCurrentLocation }],
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyDrivers = async () => {
    if (!location) return;

    try {
      const response = await fetch(
        `/api/drivers/nearby?latitude=${location.latitude}&longitude=${location.longitude}&radius=5`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNearbyDrivers(data.drivers || []);
    } catch (error) {
      console.error("Error fetching nearby drivers:", error);
      // Don't show alert for driver fetching errors, just log them
    }
  };

  const handleWhereToPress = () => {
    router.push("/(tabs)/search");
  };

  const handleQuickBooking = (type) => {
    if (type === "ride") {
      router.push("/(tabs)/search");
    } else if (type === "schedule") {
      router.push("/(tabs)/booking");
    } else {
      router.push("/(tabs)/booking");
    }
  };

  const handleMenuPress = () => {
    router.push("/(tabs)/account");
  };

  const handleRecenterPress = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(location, 1000);
    }
  };

  const initialRegion = location || {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F6F8F9",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: insets.top,
        }}
      >
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#004a53" />
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 16,
            color: "#7e8493",
            marginTop: 16,
          }}
        >
          Getting your location...
        </Text>
      </View>
    );
  }

  if (locationError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F6F8F9",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 40,
          paddingTop: insets.top,
        }}
      >
        <StatusBar style="dark" />
        <MapPin size={64} color="#7e8493" />
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 20,
            color: "#202226",
            textAlign: "center",
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          Location Required
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 16,
            color: "#7e8493",
            textAlign: "center",
            lineHeight: 24,
            marginBottom: 32,
          }}
        >
          We need access to your location to show nearby drivers and provide the
          best ride experience.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#004a53",
            borderRadius: 12,
            paddingHorizontal: 32,
            paddingVertical: 16,
          }}
          onPress={getCurrentLocation}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 16,
              color: "#ffffff",
            }}
          >
            Enable Location
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />

      {/* Map Background */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapCustomStyle}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
        onRegionChangeComplete={(region) => {
          // Update location when user moves map significantly
          const distance =
            Math.abs(region.latitude - location.latitude) +
            Math.abs(region.longitude - location.longitude);
          if (distance > 0.005) {
            // If moved more than ~500m
            setLocation(region);
          }
        }}
      >
        {/* Nearby Driver Markers */}
        {nearbyDrivers.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={{
              latitude: driver.latitude,
              longitude: driver.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#004a53",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#ffffff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Car size={20} color="#ffffff" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Top Header */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 16,
          left: 20,
          right: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
          onPress={handleMenuPress}
        >
          <Menu size={24} color="#202226" />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={handleRecenterPress}
          >
            <Navigation size={24} color="#202226" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Bell size={24} color="#202226" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Driver Count Badge */}
      {nearbyDrivers.length > 0 && (
        <View
          style={{
            position: "absolute",
            top: insets.top + 80,
            left: 20,
            backgroundColor: "#004a53",
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Car size={16} color="#ffffff" />
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 14,
              color: "#ffffff",
              marginLeft: 6,
            }}
          >
            {nearbyDrivers.length} nearby
          </Text>
        </View>
      )}

      {/* Floating "Where to?" Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: nearbyDrivers.length > 0 ? insets.top + 120 : insets.top + 80,
          left: 20,
          right: 20,
          backgroundColor: "#ffffff",
          borderRadius: 12,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
        onPress={handleWhereToPress}
      >
        <Search size={20} color="#7e8493" />
        <Text
          style={{
            flex: 1,
            marginLeft: 12,
            fontFamily: "Poppins_400Regular",
            fontSize: 16,
            color: "#7e8493",
          }}
        >
          Where to?
        </Text>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#F2F4F5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Clock size={16} color="#004a53" />
        </View>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#ffffff",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: insets.bottom + 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
          minHeight: bottomSheetExpanded ? 400 : 200,
        }}
      >
        {/* Handle */}
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginBottom: 20,
          }}
          onPress={() => setBottomSheetExpanded(!bottomSheetExpanded)}
        >
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#E5E8EC",
            }}
          />
        </TouchableOpacity>

        {/* Quick Actions */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 24,
            gap: 12,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#F8F9FA",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#E5E8EC",
            }}
            onPress={() => handleQuickBooking("ride")}
          >
            <Car size={24} color="#004a53" />
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#004a53",
                marginTop: 8,
              }}
            >
              Ride
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#F8F9FA",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#E5E8EC",
            }}
            onPress={() => handleQuickBooking("package")}
          >
            <MapPin size={24} color="#004a53" />
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#004a53",
                marginTop: 8,
              }}
            >
              Package
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#F8F9FA",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#E5E8EC",
            }}
            onPress={() => handleQuickBooking("schedule")}
          >
            <Clock size={24} color="#004a53" />
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#004a53",
                marginTop: 8,
              }}
            >
              Schedule
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Trips */}
        {bottomSheetExpanded && (
          <View>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 18,
                color: "#202226",
                marginBottom: 16,
              }}
            >
              Recent Destinations
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#F2F4F5",
              }}
              onPress={() => router.push("/(tabs)/search")}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#F8F9FA",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <MapPin size={20} color="#004a53" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 16,
                    color: "#202226",
                  }}
                >
                  Work
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    color: "#7e8493",
                  }}
                >
                  123 Business St, Downtown
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
              }}
              onPress={() => router.push("/(tabs)/search")}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#F8F9FA",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <MapPin size={20} color="#004a53" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 16,
                    color: "#202226",
                  }}
                >
                  Airport
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    color: "#7e8493",
                  }}
                >
                  International Airport Terminal 1
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
