import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  Pressable,
} from "react-native";
import React from "react";

export type Book = {
  id: string;
  type: "book";
  attributes: {
    slug: string;
    author: string;
    cover: string;
    dedication: string;
    pages: number;
    release_date: string;
    summary: string;
    title: string;
    wiki: string;
  };
};

const Book = ({ route }: any) => {
  const { book } = route.params;
  const data = book.attributes;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    >
      <Image source={{ uri: data.cover }} style={styles.cover} />

      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>

        <Text style={styles.author}>by {data.author}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>📄 {data.pages} pages</Text>
          <Text style={styles.meta}>
            📅 {new Date(data.release_date).getFullYear()}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summary}>{data.summary}</Text>

        {data.dedication ? (
          <>
            <Text style={styles.sectionTitle}>Dedication</Text>
            <Text style={styles.summary}>{data.dedication}</Text>
          </>
        ) : null}

        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(data.wiki)}
        >
          <Text style={styles.buttonText}>Open Wiki</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f14",
    paddingBottom: 400,
  },

  cover: {
    width: "100%",
    height: 650,
    marginTop: 20,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 6,
  },

  author: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 14,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  meta: {
    color: "#aaa",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 18,
    color: "#FFD700",
    marginTop: 10,
    marginBottom: 6,
  },

  summary: {
    color: "#ddd",
    lineHeight: 22,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
