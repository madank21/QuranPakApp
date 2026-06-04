import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Image} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

// ── Star Particle Component ──────────────────────────────────────────────────
const StarParticle = ({ style }) => {
  const opacity = new Animated.Value(Math.random());
  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(opacity, { toValue: Math.random() * 0.9 + 0.1, duration: 2000 + Math.random() * 3000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: Math.random() * 0.2,       duration: 2000 + Math.random() * 3000, useNativeDriver: true }),
      ]).start(animate);
    };
    animate();
  }, []);
  return <Animated.View style={[styles.star, style, { opacity }]} />;
};

// ── Animated Badge ────────────────────────────────────────────────────────────
const AnimatedBadge = () => {
  const glow = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const scale = glow.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] });
  return (
    <Animated.View style={[styles.badgeOuter, { transform: [{ scale }] }]}>
      <LinearGradient
        colors={["rgba(200,151,42,0.25)", "rgba(10,191,163,0.08)", "rgba(200,151,42,0.05)"]}
        style={styles.badgeGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.badgeArabic}>القرآن</Text>
      </LinearGradient>
    </Animated.View>
  );
};

// ── Home Button ───────────────────────────────────────────────────────────────
const HomeButton = ({ icon, label, sub, onPress }) => {
  const scale = new Animated.Value(1);
  const press   = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  const release = () => Animated.spring(scale, { toValue: 1,    useNativeDriver: true }).start();
  return (
    <Animated.View style={{ transform: [{ scale }], width: "100%" }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPressIn={press}
        onPressOut={release}
        onPress={onPress}
        style={styles.homeBtn}
      >
        <LinearGradient
          colors={["rgb(241, 241, 241)", "rgba(78, 231, 104, 0.45)"]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {/* Left accent line */}
        <LinearGradient
          colors={["#f1cd2b", "#1de23e"]}
          style={styles.btnAccent}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.btnIconWrap}>
          <Text style={styles.btnIconText}>{icon}</Text>
        </View>
        <View style={styles.btnTextWrap}>
          <Text style={styles.btnLabel}>{label}</Text>
          <Text style={styles.btnSub}>{sub}</Text>
        </View>
        <Text style={styles.btnArrow}>›</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Stars Background ──────────────────────────────────────────────────────────
const stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left:  Math.random() * width,
  top:   Math.random() * height,
  size:  Math.random() * 2 + 0.5,
}));

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.root}>
       
      {/* Deep space background */}
      <LinearGradient
        //colors={["#FFFFFF", "#DFFFE8", "#A8F0C6"]}
        //colors={["#FFFFFF", "#E8FFF1", "#BDF7D0"]}
        //colors={["#FFFFFF", "#CFFFE0", "#7DE3A7"]}
        colors={["#0a920a", "#0a920a", "#0a920a"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />
      <Image
        source={require("../assets/bg.png")}
        style={{
         position: "absolute",
         width,
         height,
         opacity: 0.5,
              }}
          resizeMode="cover"
          />
      {/* Ambient glows */}
      <View style={[styles.ambientGlow, { top: -80,  left: -60,  backgroundColor: "rgba(38, 202, 126, 0.06)" }]} />
      <View style={[styles.ambientGlow, { bottom: -60, right: -40, backgroundColor: "rgba(31, 216, 230, 0.06)" }]} />

      {/* Stars */}
      {stars.map((s) => (
        <StarParticle
          key={s.id}
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
        />
      ))}

      {/* Content */}
      <View style={styles.content}>
        {/* Badge */}
        <AnimatedBadge />

        {/* Titles */}
        <Text style={styles.titleMain}>QURAN PAK</Text>
        <Text style={styles.titleSub}>THE HOLY QURAN</Text>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerDot}>✦</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Buttons */}
        
        <HomeButton
  icon="📖"
  label="Quran Viewer"
  sub="Browse pages by ID (1–604)"
  onPress={() => navigation.navigate("QuranViewer")}
  colors={["#575050", "#a4aca6", "#000000"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
/>
        <HomeButton
          icon="🕌"
          label="Surah Index"
          sub="All 114 Surahs"
          onPress={() => navigation.navigate("SurahIndex")}
        />
        <HomeButton
          icon="📑"
          label="Para Index"
          sub="All 30 Paras (Juz)"
          onPress={() => navigation.navigate("ParaIndex")}
        />
        {/* <HomeButton
          icon="⚙️"
          label="Settings"
          sub="Configure your app preferences"
          onPress={() => navigation.navigate("Settings")}
        /> */}
        

        {/* Footer */}
        <Text style={styles.footer}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
      </View>
    </View>
  );
};

// ── STYLES ────────────────────────────────────────────────────────────────────
const GOLD  = "#c7ebc7";
const GOLD2 = "#e4a21e";
const TEAL  = "#ffffff";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#04080F",
  },
  ambientGlow: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  star: {
    position: "absolute",
    borderRadius: 99,
    backgroundColor: "#fcfcfc",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 30,
  },

  // Badge
  badgeOuter: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1.5,
    borderColor: "#c0e7c5a9",
    marginBottom: 24,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  badgeGradient: {
    flex: 1,
    borderRadius: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeArabic: {
    fontSize: 34,
    color: "#ffffff",
    textShadowColor: "rgba(255, 244, 244, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },

  // Titles
  titleMain: {
    fontFamily: "serif",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 6,
    color: "rgba(255, 218, 137, 0.97)",
    textShadowColor: "rgba(255, 218, 137, 0.97)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    marginBottom: 4,
  },
  titleSub: {
    fontSize: 11,
    color: TEAL,
    letterSpacing: 6,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  // Divider
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    width: "60%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(5, 4, 0, 0.4)",
  },
  dividerDot: {
    color: GOLD,
    fontSize: 12,
    marginHorizontal: 10,
  },

  // Buttons
  homeBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    color: "#edfaf1",
    opacity: 1,
    borderWidth: 1,
    borderColor: "#abf1c0",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    overflow: "hidden",
    gap: 14,
    shadowColor: "#abf1c0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  btnAccent: {
    position: "absolute",
    left: 0, top: 0, bottom: 0,
    width: 3
  },
  btnIconWrap: {
    width: 44, height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(114, 155, 165, 0.33)",
    alignItems: "center",
    justifyContent: "center"
    
  },
  btnIconText: { fontSize: 20 },
  btnTextWrap: { flex: 1 },
  btnLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#251d0d",
    letterSpacing: 0.5,
    fontFamily: "serif",
  },
  btnSub: {
    fontSize: 11,
    color: "#554a35",
    marginTop: 2,
  },
  btnArrow: {
    fontSize: 22,
    color: "black",
    opacity: 0.7,
  },

  // Footer
  footer: {
    marginTop: 28,
    fontSize: 16,
    color: "rgba(255, 218, 137, 0.97)",
    letterSpacing: 2,
  },
});

export default HomeScreen;

