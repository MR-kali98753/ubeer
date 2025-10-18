import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import {
  Calendar,
  MapPin,
  Star,
  Clock,
  Filter,
} from "lucide-react-native";

const tripData = [
  {
    id: 1,
    date: "Today, 2:30 PM",
    pickup: "123 Main St, Downtown",
    destination: "456 Oak Ave, Uptown",
    driver: "James Wilson",
    rating: 5,
    fare: "$24.50",
    status: "completed",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    date: "Yesterday, 9:15 AM",
    pickup: "Airport Terminal 1",
    destination: "456 Main St, Downtown",
    driver: "Sarah Johnson",
    rating: 5,
    fare: "$45.75",
    status: "completed",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e8?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    date: "Oct 14, 6:45 PM",
    pickup: "123 Business Plaza",
    destination: "789 Residential St",
    driver: "Michael Chen",
    rating: 4,
    fare: "$18.25",
    status: "completed",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    date: "Oct 12, 1:20 PM",
    pickup: "Shopping Mall",
    destination: "Home - 456 Main St",
    driver: "Emily Davis",
    rating: 5,
    fare: "$31.90",
    status: "completed",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollY > 10);
  };

  const handleTripPress = (trip) => {
    router.push("/(tabs)/ride-summary");
  };

  const handleBookNewRide = () => {
    router.push("/(tabs)/booking");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F2F4F5",
        paddingTop: insets.top,
      }}
    >
      <StatusBar style="dark" />

      {/* Fixed Header */}
      <View
        style={{
          position: "absolute",
          top: insets.top,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "#ffffff",
          paddingHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 16,
          borderBottomWidth: isScrolled ? 1 : 0,
          borderBottomColor: "#E5E8EC",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 24,
                color: "#202226",
                marginBottom: 4,
              }}
            >
              Your Trips
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
              }}
            >
              View your ride history
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "#F8F9FA",
              borderWidth: 1,
              borderColor: "#E5E8EC",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Filter size={20} color="#004a53" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={{
              backgroundColor: selectedFilter === "all" ? "#004a53" : "#F8F9FA",
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: selectedFilter === "all" ? 0 : 1,
              borderColor: "#E5E8EC",
            }}
            onPress={() => setSelectedFilter("all")}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: selectedFilter === "all" ? "#ffffff" : "#7e8493",
              }}
            >
              All Trips
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: selectedFilter === "completed" ? "#004a53" : "#F8F9FA",
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: selectedFilter === "completed" ? 0 : 1,
              borderColor: "#E5E8EC",
            }}
            onPress={() => setSelectedFilter("completed")}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: selectedFilter === "completed" ? "#ffffff" : "#7e8493",
              }}
            >
              Completed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: selectedFilter === "cancelled" ? "#004a53" : "#F8F9FA",
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: selectedFilter === "cancelled" ? 0 : 1,
              borderColor: "#E5E8EC",
            }}
            onPress={() => setSelectedFilter("cancelled")}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: selectedFilter === "cancelled" ? "#ffffff" : "#7e8493",
              }}
            >
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1, marginTop: 140 }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Book New Ride Card */}
        <TouchableOpacity
          style={{
            backgroundColor: "#004a53",
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
          onPress={handleBookNewRide}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 18,
                  color: "#ffffff",
                  marginBottom: 4,
                }}
              >
                Need a ride?
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#ffffff",
                  opacity: 0.9,
                }}
              >
                Book your next trip in seconds
              </Text>
            </View>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapPin size={24} color="#ffffff" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Trip History */}
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            color: "#202226",
            marginBottom: 16,
          }}
        >
          Recent Trips
        </Text>

        {tripData.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E8EC",
              padding: 16,
              marginBottom: 12,
            }}
            onPress={() => handleTripPress(trip)}
          >
            {/* Trip Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Clock size={16} color="#7e8493" />
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 12,
                  color: "#7e8493",
                  marginLeft: 6,
                  flex: 1,
                }}
              >
                {trip.date}
              </Text>
              <View
                style={{
                  backgroundColor: "#E8F4EC",
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 12,
                    color: "#006A2F",
                  }}
                >
                  Completed
                </Text>
              </View>
            </View>

            {/* Trip Route */}
            <View style={{ marginBottom: 12 }}>
              {/* Pickup */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#004a53",
                    marginRight: 12,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 14,
                    color: "#202226",
                    flex: 1,
                  }}
                >
                  {trip.pickup}
                </Text>
              </View>

              {/* Destination */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#7e8493",
                    marginRight: 12,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 14,
                    color: "#202226",
                    flex: 1,
                  }}
                >
                  {trip.destination}
                </Text>
              </View>
            </View>

            {/* Trip Footer */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: "#F2F4F5",
              }}
            >
              {/* Driver Info */}
              <Image
                source={{ uri: trip.image }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginRight: 8,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 14,
                    color: "#202226",
                  }}
                >
                  {trip.driver}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {[...Array(trip.rating)].map((_, i) => (
                    <Star key={i} size={12} color="#FFC107" fill="#FFC107" />
                  ))}
                </View>
              </View>

              {/* Fare */}
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                  color: "#004a53",
                }}
              >
                {trip.fare}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Load More */}
        <TouchableOpacity
          style={{
            backgroundColor: "#F8F9FA",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            padding: 16,
            alignItems: "center",
            marginTop: 12,
            marginBottom: insets.bottom + 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 16,
              color: "#004a53",
            }}
          >
            Load More Trips
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}