import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import updates from "@/assets/data/updates.json";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const UpdatesPage = () => {
  const renderUpdateItem = ({ item }: { item: any }) => (
    <View style={styles.updateItem}>
      <Image source={{ uri: item.img }} style={styles.profilePic} />
      <View style={styles.updateInfo}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* My Status Section */}
      <View style={styles.myStatusSection}>
        <Image
          source={require("@/assets/images/PassportPhoto.jpg")}
          style={styles.profilePic}
        />
        <View style={styles.myStatusInfo}>
          <Text style={styles.userName}>My Status</Text>
          <Text style={styles.time}>Add to my status</Text>
        </View>
        
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Ionicons name="camera-outline" color={Colors.primary} size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Ionicons name="create-outline" color={Colors.primary} size={25} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Updates Section */}
      <Text style={styles.sectionTitle}>Recent Updates</Text>
      <FlatList
        data={updates}
        renderItem={renderUpdateItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.updatesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  myStatusSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 70,
  },

  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },

  myStatusInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  time: {
    fontSize: 14,
    color: "#888",
  },

  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  updateItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  updateInfo: {
    marginLeft: 16,
  },

  updatesList: {
    paddingBottom: 16,
  },
});

export default UpdatesPage;
