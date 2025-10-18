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
import { ArrowDown, MapPin, Star, Map, ArrowLeft } from "lucide-react-native";

export default function RideSummaryScreen() {
  const insets = useSafeAreaInsets();
  const [isScrolled, setIsScrolled] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleReorder = () => {
    console.log("Re-order ride pressed");
    // Navigate to booking flow
    router.push("/(tabs)/booking");
  };

  const handleMapPress = () => {
    console.log("Map pressed");
    // Navigate to trip summary to show map
    router.push("/(tabs)/trip-summary");
  };

  const handleDriverPress = () => {
    console.log("Driver pressed");
    // Open driver profile
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setIsScrolled(scrollY > 10);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F6F8F9",
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
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: "#F6F8F9",
          borderBottomWidth: isScrolled ? 1 : 0,
          borderBottomColor: "#E5E8EC",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1B212B" />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 18,
            color: "#1B212B",
            marginLeft: 16,
          }}
        >
          Ride Summary
        </Text>
      </View>

      {/* Scrollable Content with top margin for fixed header */}
      <ScrollView
        style={{ flex: 1, marginTop: 56 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Main Card */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            padding: 24,
            marginBottom: 20,
          }}
        >
          {/* Route Summary */}
          <View style={{ marginBottom: 24 }}>
            {/* Pickup Row */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <View style={{ alignItems: "center", marginRight: 16 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#E5E8EC",
                    backgroundColor: "#004a53",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowDown size={20} color="#ffffff" />
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 16,
                    color: "#1B212B",
                    marginBottom: 4,
                  }}
                >
                  456 Elm Street, New York, NY 10001
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    color: "#7D8698",
                  }}
                >
                  Pickup point
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    color: "#7D8698",
                    marginBottom: 4,
                  }}
                >
                  Distance
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 16,
                    color: "#1B212B",
                  }}
                >
                  3.2 km
                </Text>
              </View>
            </View>

            {/* Dashed Line */}
            <View
              style={{
                position: "absolute",
                left: 20,
                top: 40,
                width: 2,
                height: 16,
                backgroundColor: "#C5CCD8",
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#C5CCD8",
              }}
            />

            {/* Destination Row */}
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <View style={{ alignItems: "center", marginRight: 16 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#E5E8EC",
                    backgroundColor: "#ffffff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin size={20} color="#1B212B" />
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 16,
                    color: "#1B212B",
                    marginBottom: 4,
                  }}
                >
                  789 Oak Avenue, Brooklyn, NY 11201
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    color: "#7D8698",
                  }}
                >
                  Destination
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 13,
                    color: "#7D8698",
                    marginBottom: 4,
                  }}
                >
                  Payment
                </Text>
                <View
                  style={{
                    backgroundColor: "#E8F4EC",
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#CBE0C8",
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 16,
                      color: "#006A2F",
                    }}
                  >
                    $24.50
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Separator */}
          <View
            style={{
              height: 1,
              backgroundColor: "#E5E8EC",
              marginBottom: 24,
            }}
          />

          {/* Section Eyebrow */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "#E5E8EC" }} />
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 13,
                color: "#7D8698",
                letterSpacing: 1,
                marginHorizontal: 16,
              }}
            >
              DETAILS
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#E5E8EC" }} />
          </View>

          {/* Driver Strip */}
          <TouchableOpacity
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#E5E8EC",
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
            onPress={handleDriverPress}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
              }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                marginRight: 16,
              }}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: "#1B212B",
                  marginBottom: 2,
                }}
              >
                James Wilson
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#7D8698",
                }}
              >
                Driver
              </Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: "#1B212B",
                  marginBottom: 2,
                }}
              >
                Toyota Camry Blue
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "#7D8698",
                }}
              >
                ABC-123
              </Text>
            </View>
          </TouchableOpacity>

          {/* Ride Stats Grid */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            {/* Rating */}
            <View style={{ width: "33.33%", marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 13,
                  color: "#7D8698",
                  marginBottom: 4,
                }}
              >
                RATING
              </Text>
              <View style={{ flexDirection: "row" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} color="#FFC700" fill="#FFC700" />
                ))}
              </View>
            </View>

            {/* Payment Method */}
            <View style={{ width: "33.33%", marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 13,
                  color: "#7D8698",
                  marginBottom: 4,
                }}
              >
                PAYMENT METHOD
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 15,
                  color: "#1B212B",
                }}
              >
                e-Wallet
              </Text>
            </View>

            {/* Travel Duration */}
            <View style={{ width: "33.33%", marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 13,
                  color: "#7D8698",
                  marginBottom: 4,
                }}
              >
                TRAVEL DURATION
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 15,
                  color: "#1B212B",
                }}
              >
                30 Minutes
              </Text>
            </View>

            {/* Ride Fare */}
            <View style={{ width: "33.33%", marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 13,
                  color: "#7D8698",
                  marginBottom: 4,
                }}
              >
                RIDE FARE
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 15,
                  color: "#1B212B",
                }}
              >
                $14.00
              </Text>
            </View>

            {/* Discount */}
            <View style={{ width: "33.33%", marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 13,
                  color: "#7D8698",
                  marginBottom: 4,
                }}
              >
                DISCOUNT
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 15,
                  color: "#1B212B",
                }}
              >
                – –
              </Text>
            </View>

            {/* Total Fare */}
            <View style={{ width: "33.33%", marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 13,
                  color: "#7D8698",
                  marginBottom: 4,
                }}
              >
                TOTAL FARE
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 15,
                  color: "#1B212B",
                }}
              >
                $4.00
              </Text>
            </View>
          </View>

          {/* Feedback */}
          <View>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 13,
                color: "#7D8698",
                marginBottom: 8,
              }}
            >
              FEEDBACK
            </Text>
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#E5E8EC",
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 15,
                  color: "#1B212B",
                  lineHeight: 22,
                }}
              >
                Great ride! The driver was professional and arrived on time. The
                vehicle was clean and comfortable. Would definitely recommend
                this service to others.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA Bar */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 16,
          left: 20,
          right: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#054152",
            borderRadius: 999,
            paddingVertical: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleReorder}
        >
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 16,
              color: "#ffffff",
            }}
          >
            Re-order Ride
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 56,
            height: 56,
            backgroundColor: "#ffffff",
            borderRadius: 28,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
          onPress={handleMapPress}
        >
          <Map size={24} color="#404655" />
        </TouchableOpacity>
      </View>
    </View>
  );
}