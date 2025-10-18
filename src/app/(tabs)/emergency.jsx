import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
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
  ArrowLeft,
  Shield,
  Phone,
  AlertTriangle,
  MapPin,
  Share,
  MessageSquare,
  Users,
  Car,
  Heart,
} from "lucide-react-native";

export default function EmergencyScreen() {
  const insets = useSafeAreaInsets();
  const [emergencyContacts] = useState([
    { name: "Emergency Services", number: "911", type: "emergency" },
    { name: "Mom", number: "+1 (555) 123-4567", type: "family" },
    { name: "John (Brother)", number: "+1 (555) 234-5678", type: "family" },
  ]);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const handleEmergencyCall = (number) => {
    Alert.alert(
      "Emergency Call",
      `Call ${number}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          style: "destructive",
          onPress: () => {
            Linking.openURL(`tel:${number}`);
          },
        },
      ]
    );
  };

  const handleShareLocation = () => {
    Alert.alert(
      "Share Location",
      "Your current location will be shared with your emergency contacts",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Share",
          onPress: () => {
            // In a real app, this would share the location via SMS/app
            Alert.alert("Location Shared", "Your location has been sent to emergency contacts");
          },
        },
      ]
    );
  };

  const handleReportIssue = () => {
    Alert.alert(
      "Report Safety Issue",
      "What type of issue would you like to report?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Driver Behavior", onPress: () => reportIssue("driver") },
        { text: "Vehicle Issue", onPress: () => reportIssue("vehicle") },
        { text: "Route Safety", onPress: () => reportIssue("route") },
        { text: "Other", onPress: () => reportIssue("other") },
      ]
    );
  };

  const reportIssue = (type) => {
    // In a real app, this would open a detailed reporting form
    Alert.alert("Issue Reported", "Thank you for reporting. Our safety team has been notified.");
  };

  const handleTripSharing = () => {
    Alert.alert(
      "Trip Sharing",
      "Share your trip details with trusted contacts",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Share Trip",
          onPress: () => {
            Alert.alert("Trip Shared", "Your trip details have been shared with emergency contacts");
          },
        },
      ]
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F6F8F9",
        paddingTop: insets.top,
      }}
    >
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#ffffff",
          paddingHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E8EC",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#202226" />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 20,
                color: "#202226",
              }}
            >
              Safety & Emergency
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
              }}
            >
              Your safety is our priority
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Emergency Actions */}
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
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              color: "#202226",
              marginBottom: 16,
            }}
          >
            Emergency Actions
          </Text>

          {/* Emergency Call Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FF4444",
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
              shadowColor: "#FF4444",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => handleEmergencyCall("911")}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#ffffff",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <Phone size={20} color="#FF4444" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                  color: "#ffffff",
                }}
              >
                Emergency Call
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#ffffff",
                  opacity: 0.9,
                }}
              >
                Call 911 immediately
              </Text>
            </View>
          </TouchableOpacity>

          {/* Share Location */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FFA500",
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
            onPress={handleShareLocation}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#ffffff",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <MapPin size={20} color="#FFA500" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                  color: "#ffffff",
                }}
              >
                Share My Location
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#ffffff",
                  opacity: 0.9,
                }}
              >
                Send location to emergency contacts
              </Text>
            </View>
          </TouchableOpacity>

          {/* Report Issue */}
          <TouchableOpacity
            style={{
              backgroundColor: "#004a53",
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={handleReportIssue}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#ffffff",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <AlertTriangle size={20} color="#004a53" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                  color: "#ffffff",
                }}
              >
                Report Safety Issue
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#ffffff",
                  opacity: 0.9,
                }}
              >
                Report driver or vehicle concerns
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Safety Features */}
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
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              color: "#202226",
              marginBottom: 16,
            }}
          >
            Safety Features
          </Text>

          {/* Trip Sharing */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#F8F9FA",
            }}
            onPress={handleTripSharing}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#F8F9FA",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <Share size={20} color="#004a53" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: "#202226",
                }}
              >
                Share Trip
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#7e8493",
                }}
              >
                Let others track your journey
              </Text>
            </View>
          </TouchableOpacity>

          {/* Real-time Monitoring */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#F8F9FA",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#F8F9FA",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <Shield size={20} color="#10B981" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: "#202226",
                }}
              >
                Real-time Monitoring
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#10B981",
                }}
              >
                Active • Your trip is being monitored
              </Text>
            </View>
          </View>

          {/* Driver Verification */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#F8F9FA",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <Users size={20} color="#10B981" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: "#202226",
                }}
              >
                Driver Verification
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#10B981",
                }}
              >
                All drivers are background checked
              </Text>
            </View>
          </View>
        </View>

        {/* Emergency Contacts */}
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 18,
                color: "#202226",
              }}
            >
              Emergency Contacts
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 14,
                  color: "#004a53",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          {emergencyContacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: index < emergencyContacts.length - 1 ? 1 : 0,
                borderBottomColor: "#F8F9FA",
              }}
              onPress={() => handleEmergencyCall(contact.number)}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: contact.type === "emergency" ? "#FF444420" : "#F8F9FA",
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Phone 
                  size={20} 
                  color={contact.type === "emergency" ? "#FF4444" : "#004a53"} 
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 16,
                    color: "#202226",
                  }}
                >
                  {contact.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    color: "#7e8493",
                  }}
                >
                  {contact.number}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Safety Tips */}
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
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              color: "#202226",
              marginBottom: 16,
            }}
          >
            Safety Tips
          </Text>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#004a53",
                marginBottom: 4,
              }}
            >
              • Verify your driver and vehicle
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                marginLeft: 12,
              }}
            >
              Check license plate, driver photo, and vehicle details
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#004a53",
                marginBottom: 4,
              }}
            >
              • Share your trip
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                marginLeft: 12,
              }}
            >
              Let trusted contacts know your travel plans
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#004a53",
                marginBottom: 4,
              }}
            >
              • Trust your instincts
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                marginLeft: 12,
              }}
            >
              If something doesn't feel right, speak up or end the trip
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#004a53",
                marginBottom: 4,
              }}
            >
              • Keep your phone charged
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                marginLeft: 12,
              }}
            >
              Ensure you can contact help if needed
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}