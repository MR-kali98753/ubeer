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
  LogIn
} from "lucide-react-native";

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const handleSignIn = () => {
    console.log("Sign in pressed");
    // Navigate back to account (simulating successful login)
    router.push("/(tabs)/account");
  };

  const handleBack = () => {
    router.back();
  };

  const handleSignUp = () => {
    router.push("/(tabs)/signup");
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
              Sign In
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#7e8493",
              }}
            >
              Welcome back! Please sign in to continue
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
        {/* Sign In Form */}
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

          {/* Password Field */}
          <View style={{ marginBottom: 24 }}>
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
                placeholder="Enter your password"
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

          {/* Sign In Button */}
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
            onPress={handleSignIn}
          >
            <LogIn size={20} color="#ffffff" />
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                color: "#ffffff",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity
            style={{
              alignItems: "center",
              paddingVertical: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: "#004a53",
                textDecorationLine: "underline",
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
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
            Don't have an account?
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
            onPress={handleSignUp}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                color: "#004a53",
              }}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}