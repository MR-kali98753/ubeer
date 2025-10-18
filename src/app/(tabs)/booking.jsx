import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Calendar,
  Clock,
  CreditCard,
  Plus,
} from "lucide-react-native";

export default function BookingScreen() {
  const insets = useSafeAreaInsets();
  const [isScrolled, setIsScrolled] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRide, setSelectedRide] = useState("standard");
  const [scheduleType, setScheduleType] = useState("now");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollY > 10);
  };

  const handleBookRide = () => {
    console.log("Booking ride...");
    // Navigate to trip summary
    router.push("/(tabs)/trip-summary");
  };

  const handleBack = () => {
    router.back();
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

      {/* Fixed Header with conditional border */}
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
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleBack}>
            <ArrowLeft size={24} color="#202226" />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 24,
                color: "#202226",
                marginBottom: 4,
              }}
            >
              Book a Ride
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
              }}
            >
              Where would you like to go?
            </Text>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1, marginTop: 90 }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Location Selection Card */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            padding: 20,
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 18,
              color: "#202226",
              marginBottom: 20,
            }}
          >
            Trip Details
          </Text>

          {/* Pickup Location */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                marginBottom: 8,
              }}
            >
              Pickup Location
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F8F9FA",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E8EC",
                paddingHorizontal: 12,
                paddingVertical: 12,
              }}
            >
              <Navigation size={20} color="#7e8493" />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 12,
                  fontFamily: "Poppins_400Regular",
                  fontSize: 16,
                  color: "#202226",
                }}
                placeholder="Your current location"
                placeholderTextColor="#7e8493"
                value={pickup}
                onChangeText={setPickup}
              />
            </View>
          </View>

          {/* Destination */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                marginBottom: 8,
              }}
            >
              Destination
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F8F9FA",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E8EC",
                paddingHorizontal: 12,
                paddingVertical: 12,
              }}
            >
              <MapPin size={20} color="#7e8493" />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 12,
                  fontFamily: "Poppins_400Regular",
                  fontSize: 16,
                  color: "#202226",
                }}
                placeholder="Where to?"
                placeholderTextColor="#7e8493"
                value={destination}
                onChangeText={setDestination}
              />
            </View>
          </View>
        </View>

        {/* Ride Options Card */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 18,
              color: "#202226",
              marginBottom: 20,
            }}
          >
            Ride Options
          </Text>

          {/* Standard Ride Option */}
          <TouchableOpacity
            style={{
              backgroundColor: selectedRide === "standard" ? "#F0F9FA" : "#F8F9FA",
              borderRadius: 8,
              borderWidth: selectedRide === "standard" ? 2 : 1,
              borderColor: selectedRide === "standard" ? "#004a53" : "#E5E8EC",
              padding: 16,
              marginBottom: 12,
            }}
            onPress={() => setSelectedRide("standard")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: "#202226",
                  flex: 1,
                }}
              >
                Standard Ride
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: 16,
                  color: "#004a53",
                }}
              >
                $24.50
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                marginTop: 4,
              }}
            >
              Comfortable ride for 1-4 passengers
            </Text>
          </TouchableOpacity>

          {/* Premium Ride Option */}
          <TouchableOpacity
            style={{
              backgroundColor: selectedRide === "premium" ? "#F0F9FA" : "#F8F9FA",
              borderRadius: 8,
              borderWidth: selectedRide === "premium" ? 2 : 1,
              borderColor: selectedRide === "premium" ? "#004a53" : "#E5E8EC",
              padding: 16,
              marginBottom: 12,
            }}
            onPress={() => setSelectedRide("premium")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: "#202226",
                  flex: 1,
                }}
              >
                Premium Ride
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: 16,
                  color: "#202226",
                }}
              >
                $34.50
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                marginTop: 4,
              }}
            >
              Luxury vehicles with extra comfort
            </Text>
          </TouchableOpacity>

          {/* Shared Ride Option */}
          <TouchableOpacity
            style={{
              backgroundColor: selectedRide === "shared" ? "#F0F9FA" : "#F8F9FA",
              borderRadius: 8,
              borderWidth: selectedRide === "shared" ? 2 : 1,
              borderColor: selectedRide === "shared" ? "#004a53" : "#E5E8EC",
              padding: 16,
            }}
            onPress={() => setSelectedRide("shared")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: "#202226",
                  flex: 1,
                }}
              >
                Shared Ride
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: 16,
                  color: "#202226",
                }}
              >
                $18.50
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                marginTop: 4,
              }}
            >
              Share your ride and save money
            </Text>
          </TouchableOpacity>
        </View>

        {/* Schedule Card */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 18,
              color: "#202226",
              marginBottom: 20,
            }}
          >
            Schedule
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: scheduleType === "now" ? "#004a53" : "#F8F9FA",
                borderRadius: 8,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                borderWidth: scheduleType === "now" ? 0 : 1,
                borderColor: "#E5E8EC",
              }}
              onPress={() => setScheduleType("now")}
            >
              <Calendar size={16} color={scheduleType === "now" ? "#ffffff" : "#7e8493"} />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 14,
                  color: scheduleType === "now" ? "#ffffff" : "#7e8493",
                }}
              >
                Now
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: scheduleType === "later" ? "#004a53" : "#F8F9FA",
                borderRadius: 8,
                borderWidth: scheduleType === "later" ? 0 : 1,
                borderColor: "#E5E8EC",
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onPress={() => setScheduleType("later")}
            >
              <Clock size={16} color={scheduleType === "later" ? "#ffffff" : "#7e8493"} />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 14,
                  color: scheduleType === "later" ? "#ffffff" : "#7e8493",
                }}
              >
                Later
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method Card */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            padding: 20,
            marginBottom: 40,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 18,
              color: "#202226",
              marginBottom: 16,
            }}
          >
            Payment Method
          </Text>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F8F9FA",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#E5E8EC",
              padding: 16,
            }}
          >
            <CreditCard size={20} color="#004a53" />
            <Text
              style={{
                flex: 1,
                marginLeft: 12,
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                color: "#202226",
              }}
            >
              •••• •••• •••• 1234
            </Text>
            <Plus size={20} color="#7e8493" />
          </TouchableOpacity>
        </View>

        {/* Book Ride Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#004a53",
            borderRadius: 999,
            paddingVertical: 16,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: insets.bottom + 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
          onPress={handleBookRide}
        >
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 16,
              color: "#ffffff",
            }}
          >
            Book Ride
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}