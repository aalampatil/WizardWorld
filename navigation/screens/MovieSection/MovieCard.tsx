import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

const MovieCard = ({ movie, navigation }: any) => {
  const { width, height } = useWindowDimensions();
  const a = movie.attributes;

  return (
    <Pressable
      style={[styles.card, { width }]}
      onPress={() => navigation.navigate("Movie", { movie })}
    >
      <Image
        source={{ uri: a.poster }}
        style={{ width: "100%", height: height * 0.75 }}
        contentFit="cover"
        transition={400}
      />

      {/* cinematic gradient */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={styles.gradient}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{a.title}</Text>

        <Text style={styles.meta}>
          ⭐ {a.rating || "N/A"} • {a.running_time || "Unknown"}
        </Text>

        <Text numberOfLines={3} style={styles.summary}>
          {a.summary}
        </Text>
      </View>
    </Pressable>
  );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    justifyContent: "flex-end",
    borderTopColor: "yellow"
  },

  gradient: {
    // position: "absolute",
    // bottom: 0,
    width: "100%",
    height: 220,
  },

  info: {
    position: "absolute",
    top: 510,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFD700",
  },

  meta: {
    color: "#fff",
    marginTop: 6,
    fontSize: 14,
  },

  summary: {
    color: "#fff",
    marginTop: 10,
    lineHeight: 20,
  },
});