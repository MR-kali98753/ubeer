import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
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
  Search as SearchIcon,
  MapPin,
  Clock,
  Home,
  Briefcase,
  Star,
  Navigation,
  X,
} from "lucide-react-native";

const recentSearches = [
  { id: 1, name: "Airport Terminal 1", address: "International Airport, Terminal 1", type: "recent" },
  { id: 2, name: "Downtown Mall", address: "123 Shopping Center, Downtown", type: "recent" },
  { id: 3, name: "Central Station", address: "456 Railway St, City Center", type: "recent" },
];

const savedPlaces = [
  { id: 1, name: "Home", address: "123 Main St, Residential Area", icon: Home },
  { id: 2, name: "Work", address: "456 Business Plaza, Downtown", icon: Briefcase },
];

const popularDestinations = [
  { id: 1, name: "Airport", address: "International Airport", rating: 4.8 },
  { id: 2, name: "Shopping Mall", address: "Central Shopping District", rating: 4.6 },
  { id: 3, name: "Hospital", address: "City General Hospital", rating: 4.7 },
  { id: 4, name: "University", address: "State University Campus", rating: 4.5 },
  { id: 5, name: "Train Station", address: "Central Railway Station", rating: 4.4 },
];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const handleSearch = (text) => {
    setSearchText(text);
    setIsSearching(text.length > 0);
  };

  const handleDestinationPress = (destination) => {
    console.log("Selected destination:", destination);
    // Navigate to booking with pre-filled destination
    router.push("/(tabs)/booking");
  };

  const clearSearch = () => {
    setSearchText("");
    setIsSearching(false);
  };

  const filteredResults = popularDestinations.filter(destination =>
    destination.name.toLowerCase().includes(searchText.toLowerCase()) ||
    destination.address.toLowerCase().includes(searchText.toLowerCase())
  );

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

      {/* Fixed Header with Search */}
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
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 24,
            color: "#202226",
            marginBottom: 4,
          }}
        >
          Where to?
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 14,
            color: "#7e8493",
            marginBottom: 16,
          }}
        >
          Search for your destination
        </Text>

        {/* Search Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F8F9FA",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E8EC",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <SearchIcon size={20} color="#7e8493" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 12,
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              color: "#202226",
            }}
            placeholder="Search destinations..."
            placeholderTextColor="#7e8493"
            value={searchText}
            onChangeText={handleSearch}
            autoFocus={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color="#7e8493" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {!isSearching ? (
          // Default view when not searching
          <>
            {/* Set Destination on Map */}
            <TouchableOpacity
              style={{
                backgroundColor: "#004a53",
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
              onPress={() => router.push("/(tabs)/home")}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Navigation size={20} color="#ffffff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 16,
                    color: "#ffffff",
                  }}
                >
                  Set destination on map
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    color: "#ffffff",
                    opacity: 0.9,
                  }}
                >
                  Choose your destination visually
                </Text>
              </View>
            </TouchableOpacity>

            {/* Saved Places */}
            {savedPlaces.length > 0 && (
              <>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 18,
                    color: "#202226",
                    marginBottom: 16,
                  }}
                >
                  Saved Places
                </Text>

                <View
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#E5E8EC",
                    marginBottom: 24,
                  }}
                >
                  {savedPlaces.map((place, index) => (
                    <TouchableOpacity
                      key={place.id}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 16,
                        borderBottomWidth: index < savedPlaces.length - 1 ? 1 : 0,
                        borderBottomColor: "#F2F4F5",
                      }}
                      onPress={() => handleDestinationPress(place)}
                    >
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
                        <place.icon size={20} color="#004a53" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontFamily: "Poppins_500Medium",
                            fontSize: 16,
                            color: "#202226",
                          }}
                        >
                          {place.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: 14,
                            color: "#7e8493",
                          }}
                        >
                          {place.address}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 18,
                    color: "#202226",
                    marginBottom: 16,
                  }}
                >
                  Recent Searches
                </Text>

                <View
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#E5E8EC",
                    marginBottom: 24,
                  }}
                >
                  {recentSearches.map((search, index) => (
                    <TouchableOpacity
                      key={search.id}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 16,
                        borderBottomWidth: index < recentSearches.length - 1 ? 1 : 0,
                        borderBottomColor: "#F2F4F5",
                      }}
                      onPress={() => handleDestinationPress(search)}
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
                        <Clock size={20} color="#7e8493" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontFamily: "Poppins_500Medium",
                            fontSize: 16,
                            color: "#202226",
                          }}
                        >
                          {search.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: 14,
                            color: "#7e8493",
                          }}
                        >
                          {search.address}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {/* Popular Destinations */}
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 18,
                color: "#202226",
                marginBottom: 16,
              }}
            >
              Popular Destinations
            </Text>

            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#E5E8EC",
              }}
            >
              {popularDestinations.map((destination, index) => (
                <TouchableOpacity
                  key={destination.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 16,
                    borderBottomWidth: index < popularDestinations.length - 1 ? 1 : 0,
                    borderBottomColor: "#F2F4F5",
                  }}
                  onPress={() => handleDestinationPress(destination)}
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
                      {destination.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        color: "#7e8493",
                      }}
                    >
                      {destination.address}
                    </Text>
                  </View>
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
                      {destination.rating}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          // Search results view
          <>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 18,
                color: "#202226",
                marginBottom: 16,
              }}
            >
              Search Results
            </Text>

            {filteredResults.length > 0 ? (
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#E5E8EC",
                }}
              >
                {filteredResults.map((result, index) => (
                  <TouchableOpacity
                    key={result.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 16,
                      borderBottomWidth: index < filteredResults.length - 1 ? 1 : 0,
                      borderBottomColor: "#F2F4F5",
                    }}
                    onPress={() => handleDestinationPress(result)}
                  >
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
                        {result.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          fontSize: 14,
                          color: "#7e8493",
                        }}
                      >
                        {result.address}
                      </Text>
                    </View>
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
                        {result.rating}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#E5E8EC",
                  padding: 40,
                  alignItems: "center",
                }}
              >
                <SearchIcon size={48} color="#7e8493" />
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 18,
                    color: "#202226",
                    marginTop: 16,
                    marginBottom: 8,
                  }}
                >
                  No results found
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    color: "#7e8493",
                    textAlign: "center",
                  }}
                >
                  Try searching for a different location
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}