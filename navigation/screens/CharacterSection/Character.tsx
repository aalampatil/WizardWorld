import { StyleSheet, Text, View, Image, ScrollView, Linking } from "react-native";
import React from "react";

const Character = ({ route }: any) => {
  const { character } = route.params;

  const a = character.attributes;

  const renderList = (title: string, items: string[]) => {
    if (!items || items.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {items.map((item: string, index: number) => (
          <Text key={index} style={styles.text}>
            • {item}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Character Image */}
      {a.image && (
        <Image
          source={{ uri: a.image }}
          style={styles.image}
        />
      )}

      {/* Name */}
      <Text style={styles.name}>{a.name}</Text>

      {/* Basic Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Info</Text>

        <Text style={styles.text}>Gender: {a.gender || "Unknown"}</Text>
        <Text style={styles.text}>House: {a.house || "Unknown"}</Text>
        <Text style={styles.text}>Species: {a.species || "Unknown"}</Text>
        <Text style={styles.text}>Nationality: {a.nationality || "Unknown"}</Text>
        <Text style={styles.text}>Born: {a.born || "Unknown"}</Text>
        <Text style={styles.text}>Died: {a.died || "Unknown"}</Text>
      </View>

      {/* Physical */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>

        <Text style={styles.text}>Eye Color: {a.eye_color || "Unknown"}</Text>
        <Text style={styles.text}>Hair Color: {a.hair_color || "Unknown"}</Text>
        <Text style={styles.text}>Skin Color: {a.skin_color || "Unknown"}</Text>
        <Text style={styles.text}>Height: {a.height || "Unknown"}</Text>
        <Text style={styles.text}>Weight: {a.weight || "Unknown"}</Text>
      </View>

      {/* Magic */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Magic</Text>

        <Text style={styles.text}>Animagus: {a.animagus || "None"}</Text>
        <Text style={styles.text}>Patronus: {a.patronus || "Unknown"}</Text>
        <Text style={styles.text}>Boggart: {a.boggart || "Unknown"}</Text>
        <Text style={styles.text}>Blood Status: {a.blood_status || "Unknown"}</Text>
      </View>

      {renderList("Alias Names", a.alias_names)}
      {renderList("Family Members", a.family_members)}
      {renderList("Jobs", a.jobs)}
      {renderList("Titles", a.titles)}
      {renderList("Wands", a.wands)}
      {renderList("Romances", a.romances)}

      {/* Wiki Link */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More Info</Text>

        <Text
          style={styles.link}
          onPress={() => Linking.openURL(a.wiki)}
        >
          Open Wiki Page
        </Text>
      </View>

    </ScrollView>
  );
};

export default Character;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f0f14",
    padding: 16
  },

  image: {
    width: "100%",
    height: 320,
    borderRadius: 20,
    marginBottom: 20
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20
  },

  section: {
    marginBottom: 20,
    backgroundColor: "#1a1a25",
    padding: 16,
    borderRadius: 12
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 8
  },

  text: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 4
  },

  link: {
    color: "#FFD700",
    textDecorationLine: "underline"
  }

});