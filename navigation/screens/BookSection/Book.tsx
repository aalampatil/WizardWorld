import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchChapters, type Chapter } from "../../../src/api/books";

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

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chaptersLoading, setChaptersLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchChapters(book.id);
        const sorted = res.sort(
          (a, b) => a.attributes.order - b.attributes.order
        );
        setChapters(sorted);
      } catch (e) {
        console.log("Chapter fetch error:", e);
      } finally {
        setChaptersLoading(false);
      }
    };
    load();
  }, [book.id]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
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
        <Text style={styles.body}>{data.summary}</Text>

        {data.dedication ? (
          <>
            <Text style={styles.sectionTitle}>Dedication</Text>
            <Text style={styles.body}>{data.dedication}</Text>
          </>
        ) : null}

        {/* Chapters */}
        <Text style={styles.sectionTitle}>Chapters</Text>

        {chaptersLoading ? (
          <ActivityIndicator
            color="#FFD700"
            size="small"
            style={{ marginVertical: 16 }}
          />
        ) : chapters.length === 0 ? (
          <Text style={styles.emptyText}>No chapters available.</Text>
        ) : (
          chapters.map((chapter) => {
            const isOpen = expanded === chapter.id;
            const attrs = chapter.attributes;
            return (
              <Pressable
                key={chapter.id}
                style={styles.chapterCard}
                onPress={() => setExpanded(isOpen ? null : chapter.id)}
              >
                <View style={styles.chapterHeader}>
                  <View style={styles.chapterNumberBadge}>
                    <Text style={styles.chapterNumber}>{attrs.order}</Text>
                  </View>
                  <Text style={styles.chapterTitle} numberOfLines={1}>
                    {attrs.title}
                  </Text>
                  <Text style={styles.chevron}>{isOpen ? "▲" : "▼"}</Text>
                </View>

                {isOpen && attrs.summary ? (
                  <Text style={styles.chapterSummary}>{attrs.summary}</Text>
                ) : isOpen ? (
                  <Text style={styles.emptyText}>No summary available.</Text>
                ) : null}
              </Pressable>
            );
          })
        )}

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
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "700",
  },
  body: {
    color: "#ddd",
    lineHeight: 22,
  },

  // ── Chapter cards
  chapterCard: {
    backgroundColor: "#1a1a25",
    borderRadius: 10,
    marginBottom: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#2a2a35",
  },
  chapterHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  chapterNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFD70022",
    borderWidth: 1,
    borderColor: "#FFD70055",
    alignItems: "center",
    justifyContent: "center",
  },
  chapterNumber: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "700",
  },
  chapterTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  chevron: {
    color: "#FFD700",
    fontSize: 11,
  },
  chapterSummary: {
    color: "#aaa",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#2a2a35",
  },
  emptyText: {
    color: "#555",
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 8,
  },

  // ── Wiki button
  button: {
    marginTop: 24,
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