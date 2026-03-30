import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import React from "react";

const CharacterCard = ({ character, navigation }: any) => {
  const a = character.attributes;

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("Character", { character })
      }
    >

      <Image
        source={{
          uri: a.image ||
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        }}
        style={styles.image}
      />


      <View style={styles.content}>
        <Text style={styles.name}>{a.name}</Text>

        <Text style={styles.info}>
          House: {a.house || "Unknown"}
        </Text>

        <Text style={styles.info}>
          Species: {a.species || "Unknown"}
        </Text>
      </View>
    </Pressable>
  );
};

export default React.memo(CharacterCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1a1a25",
    borderRadius: 16,
    marginBottom: 14,
    overflow: "hidden",
  },

  image: {
    width: 110,
    height: 140,
  },

  content: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 6,
  },

  info: {
    color: "#ccc",
    marginBottom: 2,
  },
});