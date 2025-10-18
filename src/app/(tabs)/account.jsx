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
  User,
  Settings,
  CreditCard,
  MapPin,
  Bell,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
  Star,
  Car,
} from "lucide-react-native";

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const [isScrolled, setIsScrolled] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollY > 10);
  };

  const handleSignIn = () => {
    router.push("/(tabs)/signin");
  };

  const handleSignUp = () => {
    router.push("/(tabs)/signup");
  };

  const handleMenuPress = (item) => {
    console.log(`${item} pressed`);
    if (item === "Payment Methods") {
      // Handle payment methods
    } else if (item === "Address Book") {
      // Handle address book
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  // For this demo, we'll show the non-authenticated state
  const isAuthenticated = false;

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
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 24,
            color: "#202226",
            marginBottom: 4,
          }}
        >
          Account
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 14,
            color: "#7e8493",
          }}
        >
          Manage your profile and settings
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1, marginTop: 90 }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {!isAuthenticated ? (
          // Non-authenticated state
          <>
            {/* Welcome Card */}
            <View
              style={{
                backgroundColor: "#004a53",
                borderRadius: 16,
                padding: 24,
                marginBottom: 24,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <User size={40} color="#ffffff" />
              </View>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 24,
                  color: "#ffffff",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                Welcome to RideApp
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 16,
                  color: "#ffffff",
                  opacity: 0.9,
                  textAlign: "center",
                  marginBottom: 24,
                }}
              >
                Sign in to access your trips, payment methods, and more
              </Text>

              {/* Sign In Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 999,
                  paddingVertical: 12,
                  paddingHorizontal: 32,
                  marginBottom: 12,
                  width: "100%",
                }}
                onPress={handleSignIn}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: "#004a53",
                    textAlign: "center",
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "#ffffff",
                  borderRadius: 999,
                  paddingVertical: 12,
                  paddingHorizontal: 32,
                  width: "100%",
                }}
                onPress={handleSignUp}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 16,
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>

            {/* Features Preview */}
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
                Why join RideApp?
              </Text>

              <View style={{ gap: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#F0F9FA",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Car size={20} color="#004a53" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 16,
                        color: "#202226",
                      }}
                    >
                      Reliable rides
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        color: "#7e8493",
                      }}
                    >
                      Get where you need to go
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#F0F9FA",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Star size={20} color="#004a53" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 16,
                        color: "#202226",
                      }}
                    >
                      Top-rated drivers
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        color: "#7e8493",
                      }}
                    >
                      Professional and friendly service
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#F0F9FA",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Shield size={20} color="#004a53" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 16,
                        color: "#202226",
                      }}
                    >
                      Safe and secure
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
            </View>
          </>
        ) : (
          // Authenticated state
          <>
            {/* Profile Card */}
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginRight: 16,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 20,
                      color: "#202226",
                      marginBottom: 4,
                    }}
                  >
                    John Doe
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 14,
                      color: "#7e8493",
                    }}
                  >
                    john.doe@email.com
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#F8F9FA",
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#E5E8EC",
                    padding: 8,
                  }}
                >
                  <Settings size={20} color="#004a53" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Stats Card */}
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
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 24,
                      color: "#004a53",
                    }}
                  >
                    47
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#7e8493",
                    }}
                  >
                    Total Trips
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontFamily: "Poppins_600SemiBold",
                        fontSize: 24,
                        color: "#004a53",
                      }}
                    >
                      4.9
                    </Text>
                    <Star size={16} color="#FFC107" fill="#FFC107" style={{ marginLeft: 4 }} />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#7e8493",
                    }}
                  >
                    Rating
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 24,
                      color: "#004a53",
                    }}
                  >
                    $247
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#7e8493",
                    }}
                  >
                    Total Spent
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Menu Options */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            marginBottom: 20,
          }}
        >
          {[
            { icon: CreditCard, title: "Payment Methods", subtitle: "Manage your cards and wallets" },
            { icon: MapPin, title: "Address Book", subtitle: "Saved addresses" },
            { icon: Bell, title: "Notifications", subtitle: "Manage your preferences" },
            { icon: HelpCircle, title: "Help & Support", subtitle: "Get help when you need it" },
            { icon: Shield, title: "Privacy & Safety", subtitle: "Your data and safety settings" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderBottomWidth: index < 4 ? 1 : 0,
                borderBottomColor: "#F2F4F5",
              }}
              onPress={() => handleMenuPress(item.title)}
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
                <item.icon size={20} color="#004a53" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 16,
                    color: "#202226",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    color: "#7e8493",
                  }}
                >
                  {item.subtitle}
                </Text>
              </View>
              <ChevronRight size={20} color="#7e8493" />
            </TouchableOpacity>
          ))}
        </View>

        {isAuthenticated && (
          /* Sign Out Button */
          <TouchableOpacity
            style={{
              backgroundColor: "#FFF2F2",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#FFCDD2",
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: insets.bottom + 16,
            }}
          >
            <LogOut size={20} color="#D32F2F" />
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                color: "#D32F2F",
                marginLeft: 8,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        )}

        {/* App Info */}
        <View
          style={{
            alignItems: "center",
            paddingVertical: 20,
            marginBottom: insets.bottom + 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 12,
              color: "#7e8493",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            RideApp Version 1.0.0
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 12,
              color: "#7e8493",
              textAlign: "center",
            }}
          >
            © 2024 RideApp. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}