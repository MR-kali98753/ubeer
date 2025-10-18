import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
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
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  UserPlus,
  User,
  Phone
} from "lucide-react-native";

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const handleSignUp = () => {
    console.log("Sign up pressed");
    // Navigate back to account (simulating successful registration)
    router.push("/(tabs)/account");
  };

  const handleBack = () => {
    router.back();
  };

  const handleSignIn = () => {
    router.push("/(tabs)/signin");
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

      {/* Header */}
      <View
        style={{
          backgroundColor: "#ffffff",
          paddingHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 16,
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
              Create Account
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
              }}
            >
              Join us and start your journey
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 40, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Sign Up Form */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            padding: 24,
            marginBottom: 24,
          }}
        >
          {/* Name Field */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#202226",
                marginBottom: 8,
              }}
            >
              Full Name
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F8F9FA",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E8EC",
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <User size={20} color="#7e8493" />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 12,
                  fontFamily: "Poppins_400Regular",
                  fontSize: 16,
                  color: "#202226",
                }}
                placeholder="Enter your full name"
                placeholderTextColor="#7e8493"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Email Field */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#202226",
                marginBottom: 8,
              }}
            >
              Email Address
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F8F9FA",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E8EC",
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <Mail size={20} color="#7e8493" />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 12,
                  fontFamily: "Poppins_400Regular",
                  fontSize: 16,
                  color: "#202226",
                }}
                placeholder="Enter your email"
                placeholderTextColor="#7e8493"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone Field */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#202226",
                marginBottom: 8,
              }}
            >
              Phone Number
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F8F9FA",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E8EC",
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <Phone size={20} color="#7e8493" />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 12,
                  fontFamily: "Poppins_400Regular",
                  fontSize: 16,
                  color: "#202226",
                }}
                placeholder="Enter your phone number"
                placeholderTextColor="#7e8493"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#202226",
                marginBottom: 8,
              }}
            >
              Password
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F8F9FA",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E8EC",
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <Lock size={20} color="#7e8493" />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 12,
                  fontFamily: "Poppins_400Regular",
                  fontSize: 16,
                  color: "#202226",
                }}
                placeholder="Create a password"
                placeholderTextColor="#7e8493"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ marginLeft: 12 }}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#7e8493" />
                ) : (
                  <Eye size={20} color="#7e8493" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Field */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14,
                color: "#202226",
                marginBottom: 8,
              }}
            >
              Confirm Password
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F8F9FA",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E5E8EC",
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <Lock size={20} color="#7e8493" />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 12,
                  fontFamily: "Poppins_400Regular",
                  fontSize: 16,
                  color: "#202226",
                }}
                placeholder="Confirm your password"
                placeholderTextColor="#7e8493"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ marginLeft: 12 }}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#7e8493" />
                ) : (
                  <Eye size={20} color="#7e8493" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#004a53",
              borderRadius: 8,
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 16,
            }}
            onPress={handleSignUp}
          >
            <UserPlus size={20} color="#ffffff" />
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                color: "#ffffff",
              }}
            >
              Create Account
            </Text>
          </TouchableOpacity>

          {/* Terms & Conditions */}
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 12,
              color: "#7e8493",
              textAlign: "center",
              lineHeight: 18,
            }}
          >
            By creating an account, you agree to our{" "}
            <Text style={{ color: "#004a53", textDecorationLine: "underline" }}>
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text style={{ color: "#004a53", textDecorationLine: "underline" }}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        {/* Sign In Link */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            padding: 24,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              color: "#7e8493",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#E5E8EC",
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}
            onPress={handleSignIn}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                color: "#004a53",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}