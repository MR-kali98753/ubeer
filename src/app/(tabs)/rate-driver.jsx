import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import {
  ArrowLeft,
  Star,
  MessageSquare,
  ThumbsUp,
  Clock,
  Car,
  Shield,
} from "lucide-react-native";

export default function RateDriverScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const feedbackTags = [
    { id: "clean", label: "Clean Vehicle", icon: "🚗" },
    { id: "safe", label: "Safe Driving", icon: "🛡️" },
    { id: "friendly", label: "Friendly", icon: "😊" },
    { id: "ontime", label: "On Time", icon: "⏰" },
    { id: "professional", label: "Professional", icon: "👔" },
    { id: "helpful", label: "Helpful", icon: "🤝" },
    { id: "comfortable", label: "Comfortable", icon: "✨" },
    { id: "navigation", label: "Good Navigation", icon: "🗺️" },
  ];

  const handleStarPress = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleTagPress = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      Alert.alert("Rating Required", "Please select a star rating");
      return;
    }

    try {
      setSubmitting(true);

      const ratingData = {
        rideId: params.rideId || 1, // From route params or default
        userId: 1, // Hardcoded for demo
        driverId: params.driverId || 1, // From route params or default
        userRating: rating,
        userFeedback: feedback.trim() || null,
      };

      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit rating');
      }

      Alert.alert(
        "Thank You!",
        "Your rating has been submitted successfully.",
        [
          {
            text: "Done",
            onPress: () => {
              router.push("/(tabs)/trips");
            },
          },
        ]
      );

    } catch (error) {
      console.error('Error submitting rating:', error);
      Alert.alert(
        "Submission Failed",
        error.message || "Unable to submit rating. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
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
              Rate Your Trip
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
              }}
            >
              How was your ride with James?
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Driver Info Card */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            padding: 20,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#F8F9FA",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 32 }}>👨‍💼</Text>
          </View>
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              color: "#202226",
              marginBottom: 4,
            }}
          >
            James Wilson
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
              color: "#7e8493",
              marginBottom: 8,
            }}
          >
            Toyota Camry • Blue • ABC-123
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Star size={16} color="#FFC107" fill="#FFC107" />
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#7e8493",
                marginLeft: 4,
              }}
            >
              4.9 • 127 trips
            </Text>
          </View>
        </View>

        {/* Rating Section */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            padding: 20,
            marginBottom: 20,
            alignItems: "center",
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
            How would you rate your ride?
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
              color: "#7e8493",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Your feedback helps us improve the service
          </Text>

          {/* Star Rating */}
          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleStarPress(index)}
                style={{ marginHorizontal: 8 }}
              >
                <Star
                  size={40}
                  color={index < rating ? "#FFC107" : "#E5E8EC"}
                  fill={index < rating ? "#FFC107" : "transparent"}
                />
              </TouchableOpacity>
            ))}
          </View>

          {rating > 0 && (
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                color: "#004a53",
              }}
            >
              {rating === 5 ? "Excellent!" : 
               rating === 4 ? "Good!" : 
               rating === 3 ? "Okay" : 
               rating === 2 ? "Poor" : "Very Poor"}
            </Text>
          )}
        </View>

        {/* Quick Feedback Tags */}
        {rating > 0 && (
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
                fontSize: 16,
                color: "#202226",
                marginBottom: 16,
              }}
            >
              What went well?
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {feedbackTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <TouchableOpacity
                    key={tag.id}
                    style={{
                      backgroundColor: isSelected ? "#004a5320" : "#F8F9FA",
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: isSelected ? "#004a53" : "#E5E8EC",
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => handleTagPress(tag.id)}
                  >
                    <Text style={{ fontSize: 14, marginRight: 6 }}>{tag.icon}</Text>
                    <Text
                      style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 14,
                        color: isSelected ? "#004a53" : "#7e8493",
                      }}
                    >
                      {tag.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Written Feedback */}
        {rating > 0 && (
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
                fontSize: 16,
                color: "#202226",
                marginBottom: 8,
              }}
            >
              Additional Comments (Optional)
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                marginBottom: 12,
              }}
            >
              Share any additional feedback about your trip
            </Text>
            <TextInput
              style={{
                backgroundColor: "#F8F9FA",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E8EC",
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
                color: "#202226",
                height: 100,
                textAlignVertical: "top",
              }}
              placeholder="Tell us about your experience..."
              placeholderTextColor="#7e8493"
              multiline
              value={feedback}
              onChangeText={setFeedback}
            />
          </View>
        )}

        {/* Trip Summary */}
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
              fontSize: 16,
              color: "#202226",
              marginBottom: 16,
            }}
          >
            Trip Summary
          </Text>

          <View style={{ flexDirection: "row", marginBottom: 12 }}>
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

          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                flex: 1,
              }}
            >
              Duration
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

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
                flex: 1,
              }}
            >
              Total Fare
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
      </ScrollView>

      {/* Submit Button */}
      {rating > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom + 16,
            left: 20,
            right: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#004a53",
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 8,
              opacity: submitting ? 0.7 : 1,
            }}
            onPress={handleSubmitRating}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <ThumbsUp size={20} color="#ffffff" />
            )}
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 16,
                color: "#ffffff",
              }}
            >
              {submitting ? "Submitting..." : "Submit Rating"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}