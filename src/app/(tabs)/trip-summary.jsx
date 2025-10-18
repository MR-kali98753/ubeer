import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { ArrowDown, MapPin, Star, Phone, MessageSquare } from "lucide-react-native";

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

export default function TripSummaryScreen() {
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  // Trip coordinates
  const pickupCoordinate = {
    latitude: 37.7749,
    longitude: -122.4194,
  };

  const destinationCoordinate = {
    latitude: 37.7849,
    longitude: -122.4094,
  };

  const driverCoordinate = {
    latitude: 37.7799,
    longitude: -122.4144,
  };

  const routeCoordinates = [
    pickupCoordinate,
    { latitude: 37.777, longitude: -122.417 },
    { latitude: 37.780, longitude: -122.414 },
    destinationCoordinate,
  ];

  const initialRegion = {
    latitude: (pickupCoordinate.latitude + destinationCoordinate.latitude) / 2,
    longitude: (pickupCoordinate.longitude + destinationCoordinate.longitude) / 2,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const handleCallDriver = () => {
    console.log("Calling driver");
  };

  const handleMessageDriver = () => {
    console.log("Messaging driver");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />

      {/* Background Map */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapCustomStyle}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
      >
        {/* Route Polyline */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#004a53"
          strokeWidth={4}
          lineDashPattern={[0]}
        />

        {/* Pickup Marker */}
        <Marker coordinate={pickupCoordinate} anchor={{ x: 0.5, y: 0.5 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "#004a53",
              borderWidth: 1,
              borderColor: "#E0E4EB",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowDown size={20} color="#ffffff" />
          </View>
        </Marker>

        {/* Destination Marker */}
        <Marker coordinate={destinationCoordinate} anchor={{ x: 0.5, y: 0.5 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "#ffffff",
              borderWidth: 1,
              borderColor: "#E0E4EB",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MapPin size={20} color="#4A5568" />
          </View>
        </Marker>

        {/* Driver/Vehicle Marker */}
        <Marker coordinate={driverCoordinate} anchor={{ x: 0.5, y: 0.5 }}>
          <View
            style={{
              width: 48,
              height: 48,
              backgroundColor: "#004a53",
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: "#ffffff",
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 20 }}>🚗</Text>
          </View>
        </Marker>
      </MapView>

      {/* Trip Status Card Overlay */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 30,
          left: 20,
          right: 20,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            color: "#202226",
            marginBottom: 8,
          }}
        >
          Driver En Route
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 14,
            color: "#7e8493",
            marginBottom: 12,
          }}
        >
          Your driver is 3 minutes away
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: "#F2F4F5",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 14,
              color: "#004a53",
              flex: 1,
            }}
          >
            Pickup: Current Location
          </Text>
          <View
            style={{
              backgroundColor: "#E8F4EC",
              borderRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 12,
                color: "#006A2F",
              }}
            >
              ETA: 3 min
            </Text>
          </View>
        </View>
      </View>

      {/* Driver Details Bottom Sheet */}
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
          paddingTop: 24,
          paddingBottom: insets.bottom + 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
          maxHeight: "50%",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Driver Header Card */}
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E0E4EB",
              padding: 16,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Avatar */}
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                }}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  marginRight: 16,
                }}
              />

              {/* Driver Info */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 18,
                    color: "#202226",
                    marginBottom: 2,
                  }}
                >
                  James Wilson
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} color="#FFC107" fill="#FFC107" />
                  ))}
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 12,
                      color: "#7e8493",
                      marginLeft: 6,
                    }}
                  >
                    4.9 (127 trips)
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    color: "#7e8493",
                  }}
                >
                  Toyota Camry • Blue • ABC-123
                </Text>
              </View>
            </View>
          </View>

          {/* Contact Actions */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#004a53",
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onPress={handleCallDriver}
            >
              <Phone size={20} color="#ffffff" />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: "#ffffff",
                }}
              >
                Call
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F8F9FA",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#E5E8EC",
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onPress={handleMessageDriver}
            >
              <MessageSquare size={20} color="#004a53" />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: "#004a53",
                }}
              >
                Message
              </Text>
            </TouchableOpacity>
          </View>

          {/* Trip Details */}
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E0E4EB",
              padding: 16,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 16,
                color: "#202226",
                marginBottom: 12,
              }}
            >
              Trip Details
            </Text>

            <View style={{ flexDirection: "row", marginBottom: 8 }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#7e8493",
                  flex: 1,
                }}
              >
                Ride Type
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 14,
                  color: "#202226",
                }}
              >
                Standard Ride
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 8 }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#7e8493",
                  flex: 1,
                }}
              >
                Estimated Duration
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 14,
                  color: "#202226",
                }}
              >
                15 minutes
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 8 }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#7e8493",
                  flex: 1,
                }}
              >
                Distance
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 14,
                  color: "#202226",
                }}
              >
                3.2 km
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#7e8493",
                  flex: 1,
                }}
              >
                Fare
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                  color: "#004a53",
                }}
              >
                $24.50
              </Text>
            </View>
          </View>

          {/* Cancel Trip Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FFF2F2",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#FFCDD2",
              padding: 16,
              alignItems: "center",
              marginBottom: 20,
            }}
            onPress={() => {
              // Handle trip cancellation
              router.push("/(tabs)/home");
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                color: "#D32F2F",
              }}
            >
              Cancel Trip
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}