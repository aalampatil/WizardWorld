import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  StatusBar,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useBookStore } from "../../src/store/potterStore";
import { useMovieStore } from "../../src/store/potterStore";
import { useSpellStore } from "../../src/store/potterStore";
import { usePotionStore } from "../../src/store/potterStore";
import { useCharacterStore } from "../../src/store/potterStore";
import type { Book } from "../../src/api/books";
import type { Movie } from "../../src/api/movies";
const { width, height } = Dimensions.get("window");

// ─── Floating Particle ───────────────────────────────────────────────────────
const Particle = ({ delay, x }: { delay: number; x: number }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: x,
        bottom: -10,
        width: 3,
        height: 3,
        borderRadius: 2,
        backgroundColor: "#FFD700",
        opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.6, 0] }),
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -height * 0.6],
            }),
          },
        ],
      }}
    />
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll: () => void;
}) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionTitleRow}>
      <View style={styles.sectionAccent} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <Pressable onPress={onSeeAll}>
      <Text style={styles.seeAll}>See all →</Text>
    </Pressable>
  </View>
);

// ─── Book Card ────────────────────────────────────────────────────────────────
const BookCard = ({ book, onPress }: { book: Book; onPress: () => void }) => (
  <Pressable onPress={onPress} style={styles.bookCard}>
    <Image source={{ uri: book.attributes.cover }} style={styles.bookCover} />
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.95)"]}
      style={styles.bookGradient}
    />
    <View style={styles.bookInfo}>
      <Text style={styles.bookTitle} numberOfLines={2}>
        {book.attributes.title}
      </Text>
      <Text style={styles.bookMeta}>
        {new Date(book.attributes.release_date).getFullYear()} ·{" "}
        {book.attributes.pages}p
      </Text>
    </View>
  </Pressable>
);

// ─── Movie Card ───────────────────────────────────────────────────────────────
const MovieCard = ({ movie, onPress }: { movie: Movie; onPress: () => void }) => (
  <Pressable onPress={onPress} style={styles.movieCard}>
    {movie.attributes.poster ? (
      <Image
        source={{ uri: movie.attributes.poster }}
        style={styles.moviePoster}
        resizeMode="cover"
      />
    ) : (
      <View style={styles.moviePosterFallback}>
        <Text style={styles.moviePosterFallbackText}>🎬</Text>
      </View>
    )}
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.95)"]}
      style={styles.movieGradient}
    />
    <View style={styles.movieInfo}>
      <Text style={styles.movieTitle} numberOfLines={2}>
        {movie.attributes.title}
      </Text>
      {movie.attributes.rating && (
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{movie.attributes.rating}</Text>
        </View>
      )}
    </View>
  </Pressable>
);

// ─── Stat Pill ────────────────────────────────────────────────────────────────
const StatPill = ({
  icon,
  label,
  count,
  onPress,
}: {
  icon: string;
  label: string;
  count: number;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress} style={styles.statPill}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </Pressable>
);

// ─── Home Screen ──────────────────────────────────────────────────────────────
const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const { books, fetchBooks } = useBookStore();
  const { movies, fetchMovies } = useMovieStore();
  const { spells } = useSpellStore();
  const { potions } = usePotionStore();
  const { characters } = useCharacterStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    fetchBooks();
    fetchMovies();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const particles = [40, 90, 150, 210, 270, 320];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Background particles */}
      {particles.map((x, i) => (
        <Particle key={i} x={x} delay={i * 700} />
      ))}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Hero ─────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.hero,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.heroEyebrow}>✦ Welcome to</Text>
          <Text style={styles.heroTitle}>Wizard{"\n"}World</Text>
          <Text style={styles.heroSubtitle}>
            The complete Potterverse encyclopedia
          </Text>

          {/* Decorative gold line */}
          <View style={styles.heroDivider}>
            <View style={styles.heroDividerLine} />
            <Text style={styles.heroDividerGlyph}>⚡</Text>
            <View style={styles.heroDividerLine} />
          </View>
        </Animated.View>

        {/* ── Stats Row ────────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsRow}
        >
          <StatPill icon="🧙" label="Characters" count={5246} onPress={() => navigation.navigate("Characters")} />
          <StatPill icon="📖" label="Books" count={7} onPress={() => navigation.navigate("Books")} />
          <StatPill icon="🎬" label="Movies" count={11} onPress={() => navigation.navigate("Movies")} />
          <StatPill icon="✨" label="Spells" count={333} onPress={() => navigation.navigate("Spells")} />
          <StatPill icon="🧪" label="Potions" count={168} onPress={() => navigation.navigate("Potions")} />

        </ScrollView>

        {/* ── Books ────────────────────────────────────────── */}
        {books.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="The Books"
              onSeeAll={() => navigation.navigate("Books")}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {books.slice(0, 7).map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onPress={() => navigation.navigate("Book", { book })}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* ── Movies ───────────────────────────────────────── */}
        {movies.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="The Films"
              onSeeAll={() => navigation.navigate("Movies")}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {movies.slice(0, 8).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPress={() => navigation.navigate("Movie", { movie })}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* ── Quick Nav Grid ───────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader title="Explore" onSeeAll={() => { }} />
          <View style={styles.navGrid}>
            {[
              { icon: "🧙‍♂️", label: "Characters", screen: "Characters", color: "#3d1a1a" },
              { icon: "✨", label: "Spells", screen: "Spells", color: "#1a1a3d" },
              { icon: "🧪", label: "Potions", screen: "Potions", color: "#1a3d1a" },
              { icon: "🎬", label: "Movies", screen: "Movies", color: "#3d2a1a" },
            ].map((item) => (
              <Pressable
                key={item.screen}
                style={[styles.navTile, { backgroundColor: item.color }]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Text style={styles.navIcon}>{item.icon}</Text>
                <Text style={styles.navLabel}>{item.label}</Text>
                <Text style={styles.navArrow}>→</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#080810",
  },
  scroll: {
    paddingBottom: 20,
  },

  // ── Hero
  hero: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  heroEyebrow: {
    color: "#FFD700",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 64,
    fontWeight: "900",
    color: "#fff",
    lineHeight: 64,
    letterSpacing: -2,
    marginBottom: 12,
  },
  heroSubtitle: {
    color: "#666",
    fontSize: 15,
    letterSpacing: 0.3,
    marginBottom: 24,
  },
  heroDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  heroDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#FFD70033",
  },
  heroDividerGlyph: {
    fontSize: 14,
    color: "#FFD700",
  },

  // ── Stats
  statsRow: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    gap: 10,
  },
  statPill: {
    backgroundColor: "#12121e",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
    minWidth: 80,
    borderWidth: 1,
    borderColor: "#FFD70022",
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  statCount: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "800",
  },
  statLabel: {
    color: "#555",
    fontSize: 11,
    marginTop: 2,
    fontWeight: "500",
  },

  // ── Sections
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionAccent: {
    width: 3,
    height: 18,
    backgroundColor: "#FFD700",
    borderRadius: 2,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  seeAll: {
    color: "#FFD700",
    fontSize: 13,
    fontWeight: "600",
  },
  horizontalList: {
    paddingHorizontal: 20,
    gap: 12,
  },

  // ── Book Card
  bookCard: {
    width: 130,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1a1a25",
  },
  bookCover: {
    width: "100%",
    height: "100%",
  },
  bookGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bookInfo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  bookTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
    marginBottom: 3,
  },
  bookMeta: {
    color: "#FFD700",
    fontSize: 10,
    fontWeight: "600",
  },

  // ── Movie Card
  movieCard: {
    width: 140,
    height: 210,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1a1a25",
  },
  moviePoster: {
    width: "100%",
    height: "100%",
  },
  moviePosterFallback: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a25",
  },
  moviePosterFallbackText: {
    fontSize: 40,
  },
  movieGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 110,
  },
  movieInfo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
    marginBottom: 4,
  },
  ratingBadge: {
    backgroundColor: "#FFD70022",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#FFD70055",
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 10,
    fontWeight: "700",
  },

  // ── Nav Grid
  navGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  navTile: {
    width: (width - 52) / 2,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#ffffff0a",
  },
  navIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  navLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  navArrow: {
    color: "#FFD700",
    fontSize: 16,
    marginTop: 12,
  },
});