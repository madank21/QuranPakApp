import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
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
          colors={["rgba(200,151,42,0.07)", "rgba(10,191,163,0.03)"]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {/* Left accent line */}
        <LinearGradient
          colors={["#C8972A", "#0ABFA3"]}
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
        colors={["#04080F", "#070D1A", "#04080F"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />
      {/* Ambient glows */}
      <View style={[styles.ambientGlow, { top: -80,  left: -60,  backgroundColor: "rgba(10,191,163,0.06)" }]} />
      <View style={[styles.ambientGlow, { bottom: -60, right: -40, backgroundColor: "rgba(200,151,42,0.06)" }]} />

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

        {/* Footer */}
        <Text style={styles.footer}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
      </View>
    </View>
  );
};

// ── STYLES ────────────────────────────────────────────────────────────────────
const GOLD  = "#C8972A";
const GOLD2 = "#F0C060";
const TEAL  = "#0ABFA3";

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
    backgroundColor: "#FFFFFF",
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
    borderColor: GOLD,
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
    color: GOLD2,
    textShadowColor: "rgba(200,151,42,0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },

  // Titles
  titleMain: {
    fontFamily: "serif",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 6,
    color: GOLD2,
    textShadowColor: "rgba(200,151,42,0.4)",
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
    backgroundColor: "rgba(200,151,42,0.4)",
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
    backgroundColor: "rgba(10,18,35,0.85)",
    borderWidth: 1,
    borderColor: "rgba(200,151,42,0.3)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    overflow: "hidden",
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  btnAccent: {
    position: "absolute",
    left: 0, top: 0, bottom: 0,
    width: 3,
    borderRadius: 3,
  },
  btnIconWrap: {
    width: 44, height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(200,151,42,0.12)",
    borderWidth: 1,
    borderColor: "rgba(200,151,42,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  btnIconText: { fontSize: 20 },
  btnTextWrap: { flex: 1 },
  btnLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#E8E0D0",
    letterSpacing: 0.5,
    fontFamily: "serif",
  },
  btnSub: {
    fontSize: 11,
    color: "#8A8A9A",
    marginTop: 2,
  },
  btnArrow: {
    fontSize: 22,
    color: GOLD,
    opacity: 0.7,
  },

  // Footer
  footer: {
    marginTop: 28,
    fontSize: 16,
    color: "rgba(200,151,42,0.4)",
    letterSpacing: 2,
  },
});

export default HomeScreen;





//     import React, { useEffect, useState } from 'react';
//     import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
//     import AsyncStorage from '@react-native-async-storage/async-storage';
//     import { LinearGradient } from 'expo-linear-gradient';

// const LAST_PAGE_KEY = 'quran_last_page';

// const HomeScreen = ({ navigation }) => {
//     const [checkedBookmark, setCheckedBookmark] = useState(false);

//     useEffect(() => {
//         if (checkedBookmark) return;
//         const checkBookmark = async () => {
//             try {
//                 const raw = await AsyncStorage.getItem(LAST_PAGE_KEY);
//                 if (raw) {
//                     const { id } = JSON.parse(raw);
//                     if (id != null) {
//                         Alert.alert(
//                             'Resume reading?',
//                             `Do you want to continue from previous session?`,
//                             [
//                                 { text: 'No', style: 'cancel', onPress: () => setCheckedBookmark(true) },
//                                 {
//                                     text: 'Yes',
//                                     onPress: () => {
//                                         setCheckedBookmark(true);
//                                         navigation.navigate('QuranViewer', { imageId: id });
//                                     },
//                                 },
//                             ]
//                         );
//                     } else {
//                         setCheckedBookmark(true);
//                     }
//                 } else {
//                     setCheckedBookmark(true);
//                 }
//             } catch (e) {
//                 setCheckedBookmark(true);
//             }
//         };
//         setTimeout(checkBookmark, 300);
//     }, [checkedBookmark, navigation]);

//     return (
//         <LinearGradient
//           colors={["#c4b9aa", "#a7a07d", "#a59747", "#978f1e", "#b1b36f"]}
          
//           locations={[0, 0.25, 0.5, 0.75, 1]}
//           style={{ width: "100%", height: "100%" }}
//           start={{ x: 0.5, y: 0 }}
//           end={{ x: 0.5, y: 1 }}
//         >
//         <View style={styles.mainContainer}>
//             <View style={styles.header}>
//                 <Text style={styles.heading}>Quran Pak</Text>
//             </View>

//             <View style={styles.container}>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.navigate('QuranViewer')}
//                 >
//                     <Text style={styles.buttonText}>QuranViewer</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.navigate('SurahIndex')}
//                 >
//                     <Text style={styles.buttonText}>Surah Index</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.navigate('ParaIndex')}
//                 >
//                     <Text style={styles.buttonText}>Para Index</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//     },
//     header: {
//         paddingTop: 50,
//         alignItems: 'center',
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     button: {
//         backgroundColor: '#fff',
//         padding: 15,
//         marginVertical: 10,
//         borderRadius: 10,
//         width: '70%',
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#000',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     heading: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginBottom: 50,
//     },
// });

// export default HomeScreen;

