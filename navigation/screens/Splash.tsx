import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Individual star particle 
const Star = ({
  x,
  y,
  size,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.1,
          duration: 1200,
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
        top: y,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#FFD700",
        opacity,
      }}
    />
  );
};

// ─── Rising spark ─────────────────────────────────────────────────────────────
const Spark = ({ x, delay }: { x: number; delay: number }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.delay(Math.random() * 1000),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: x,
        bottom: 0,
        width: 2,
        height: 2,
        borderRadius: 1,
        backgroundColor: "#FFD700",
        opacity: anim.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [0, 0.8, 0.6, 0],
        }),
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -height * 0.75],
            }),
          },
          {
            translateX: anim.interpolate({
              inputRange: [0, 0.3, 0.6, 1],
              outputRange: [0, 8, -6, 4],
            }),
          },
        ],
      }}
    />
  );
};

// ─── Splash Screen ────────────────────────────────────────────────────────────
type SplashScreenProps = {
  onFinish: () => void;
};

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  // Animation refs
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const orbScale = useRef(new Animated.Value(0.3)).current;
  const orbOpacity = useRef(new Animated.Value(0)).current;
  const glyphOpacity = useRef(new Animated.Value(0)).current;
  const glyphScale = useRef(new Animated.Value(0.4)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(24)).current;
  const subOpacity = useRef(new Animated.Value(0)).current;
  const dividerScale = useRef(new Animated.Value(0)).current;
  const exitOpacity = useRef(new Animated.Value(1)).current;

  // Ring pulse refs
  const ring1 = useRef(new Animated.Value(1)).current;
  const ring2 = useRef(new Animated.Value(1)).current;
  const ring3 = useRef(new Animated.Value(1)).current;
  const ring1Op = useRef(new Animated.Value(0.5)).current;
  const ring2Op = useRef(new Animated.Value(0.35)).current;
  const ring3Op = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    // Pulsing rings loop
    const pulseRing = (scale: Animated.Value, opacity: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(scale, { toValue: 2.2, duration: 2000, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: 2000, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.timing(scale, { toValue: 1, duration: 0, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0.4, duration: 0, useNativeDriver: true }),
          ]),
        ])
      );

    pulseRing(ring1, ring1Op, 0).start();
    pulseRing(ring2, ring2Op, 600).start();
    pulseRing(ring3, ring3Op, 1200).start();

    // Main entrance sequence
    Animated.sequence([
      // 1. Background fades in
      Animated.timing(bgOpacity, {
        toValue: 1, duration: 400, useNativeDriver: true,
      }),
      // 2. Orb blooms
      Animated.parallel([
        Animated.spring(orbScale, {
          toValue: 1, friction: 6, tension: 40, useNativeDriver: true,
        }),
        Animated.timing(orbOpacity, {
          toValue: 1, duration: 600, useNativeDriver: true,
        }),
      ]),
      // 3. Lightning bolt appears
      Animated.parallel([
        Animated.spring(glyphScale, {
          toValue: 1, friction: 5, tension: 60, useNativeDriver: true,
        }),
        Animated.timing(glyphOpacity, {
          toValue: 1, duration: 400, useNativeDriver: true,
        }),
      ]),
      // 4. Title rises
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1, duration: 500, useNativeDriver: true,
        }),
        Animated.timing(titleY, {
          toValue: 0, duration: 500, useNativeDriver: true,
        }),
      ]),
      // 5. Divider + subtitle
      Animated.parallel([
        Animated.timing(dividerScale, {
          toValue: 1, duration: 500, useNativeDriver: true,
        }),
        Animated.timing(subOpacity, {
          toValue: 1, duration: 500, useNativeDriver: true,
        }),
      ]),
      // 6. Hold
      Animated.delay(1200),
      // 7. Fade out everything
      Animated.timing(exitOpacity, {
        toValue: 0, duration: 600, useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  const stars = Array.from({ length: 30 }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1,
    delay: i * 150,
  }));

  const sparks = [30, 80, 140, 200, 260, 310, 360];

  return (
    <Animated.View style={[styles.root, { opacity: exitOpacity }]}>
      <StatusBar barStyle="light-content" backgroundColor="#05050d" />

      {/* Starfield */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: bgOpacity }]}>
        {stars.map((s, i) => (
          <Star key={i} x={s.x} y={s.y} size={s.size} delay={s.delay} />
        ))}
      </Animated.View>

      {/* Rising sparks */}
      {sparks.map((x, i) => (
        <Spark key={i} x={x} delay={i * 400} />
      ))}

      {/* Center composition */}
      <View style={styles.center}>

        {/* Pulsing rings behind orb */}
        <Animated.View style={[styles.ring, {
          transform: [{ scale: ring1 }],
          opacity: ring1Op,
        }]} />
        <Animated.View style={[styles.ring, styles.ring2, {
          transform: [{ scale: ring2 }],
          opacity: ring2Op,
        }]} />
        <Animated.View style={[styles.ring, styles.ring3, {
          transform: [{ scale: ring3 }],
          opacity: ring3Op,
        }]} />

        {/* Glow orb */}
        <Animated.View
          style={[
            styles.orb,
            {
              opacity: orbOpacity,
              transform: [{ scale: orbScale }],
            },
          ]}
        />

        {/* Lightning bolt */}
        <Animated.Text
          style={[
            styles.glyph,
            {
              opacity: glyphOpacity,
              transform: [{ scale: glyphScale }],
            },
          ]}
        >
          ⚡
        </Animated.Text>

        {/* Title */}
        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleY }],
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <Text style={styles.titleSmall}>✦  WELCOME TO  ✦</Text>
          <Text style={styles.title}>Wizard</Text>
          <Text style={styles.titleAccent}>World</Text>
        </Animated.View>

        {/* Divider */}
        <Animated.View
          style={[
            styles.divider,
            { transform: [{ scaleX: dividerScale }] },
          ]}
        />

        {/* Subtitle */}
        <Animated.Text style={[styles.subtitle, { opacity: subOpacity }]}>
          The complete Potterverse encyclopedia
        </Animated.Text>
      </View>

      {/* Bottom vignette */}
      <View style={styles.bottomFade} />
    </Animated.View>
  );
};

export default SplashScreen;

const ORB_SIZE = 160;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#05050d",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Rings
  ring: {
    position: "absolute",
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    borderWidth: 1.5,
    borderColor: "#FFD700",
  },
  ring2: {
    borderColor: "#FFD70099",
    borderWidth: 1,
  },
  ring3: {
    borderColor: "#FFD70055",
    borderWidth: 0.5,
  },

  // ── Orb glow
  orb: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: "#FFD70008",
    borderWidth: 1,
    borderColor: "#FFD70044",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 30,
    position: "absolute",
  },

  // ── Lightning bolt
  glyph: {
    fontSize: 64,
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },

  // ── Text
  titleSmall: {
    color: "#FFD70099",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 5,
    marginBottom: 6,
  },
  title: {
    fontSize: 58,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: -1,
    lineHeight: 58,
  },
  titleAccent: {
    fontSize: 58,
    fontWeight: "900",
    color: "#FFD700",
    letterSpacing: -1,
    lineHeight: 60,
    textShadowColor: "#FFD70066",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  divider: {
    width: 180,
    height: 1,
    backgroundColor: "#FFD70044",
    marginVertical: 16,
  },
  subtitle: {
    color: "#555",
    fontSize: 13,
    letterSpacing: 0.5,
  },

  // ── Bottom gradient fade
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "#05050d",
    opacity: 0.6,
  },
});