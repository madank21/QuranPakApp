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
        //colors={["#FFFFFF", "#DFFFE8", "#A8F0C6"]}
        //colors={["#FFFFFF", "#E8FFF1", "#BDF7D0"]}
        //colors={["#FFFFFF", "#CFFFE0", "#7DE3A7"]}
        colors={["#FFFFFF", "#EAFBF0", "#B8F3CD"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
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
           colors={["#15e626", "#73eca2", "#d2e4d8"]}
          style={StyleSheet.absoluteFill}
           start={{ x: 0.2, y: 0 }}
           end={{ x: 0.8, y: 1 }}
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
const GOLD  = "#62df62";
const GOLD2 = "#e4a21e";
const TEAL  = "#06b354";

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
    backgroundColor: "#8cc0df",
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
   // backgroundColor: "rgba(38, 233, 113, 0.93)",
    borderWidth: 1,
    borderColor: "rgba(170, 236, 108, 0.3)",
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







 // HomeScreen.jsx

// import React, { useEffect, useRef } from "react";
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   Easing,
// } from "react-native";
// import Svg, {
//   Defs,
//   LinearGradient,
//   Stop,
//   Path,
//   Circle,
//   Rect,
// } from "react-native-svg";

// const { width, height } = Dimensions.get("window");

// const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// export default function HomeScreen() {
//   const glowAnim = useRef(new Animated.Value(0)).current;
//   const floatAnim = useRef(new Animated.Value(0)).current;
//   const rotateAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(glowAnim, {
//           toValue: 1,
//           duration: 3500,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }),
//         Animated.timing(glowAnim, {
//           toValue: 0,
//           duration: 3500,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();

//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(floatAnim, {
//           toValue: -12,
//           duration: 3000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(floatAnim, {
//           toValue: 0,
//           duration: 3000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();

//     Animated.loop(
//       Animated.timing(rotateAnim, {
//         toValue: 1,
//         duration: 18000,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, []);

//   const glowOpacity = glowAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.3, 0.9],
//   });

//   const rotate = rotateAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   return (
//     <View style={styles.container}>
//       {/* Soft rotating background glow */}
//       <Animated.View
//         style={[
//           styles.rotatingGlow,
//           {
//             transform: [{ rotate }],
//             opacity: glowOpacity,
//           },
//         ]}
//       />

//       {/* Mosque Art */}
//       <Animated.View
//         style={{
//           transform: [{ translateY: floatAnim }],
//         }}
//       >
//         <AnimatedSvg
//           width={width}
//           height={height * 0.65}
//           viewBox="0 0 400 500"
//         >
//           <Defs>
//             <LinearGradient id="domeGrad" x1="0" y1="0" x2="1" y2="1">
//               <Stop offset="0%" stopColor="#1fd16d" />
//               <Stop offset="100%" stopColor="#087f3e" />
//             </LinearGradient>

//             <LinearGradient id="towerGrad" x1="0" y1="0" x2="0" y2="1">
//               <Stop offset="0%" stopColor="#ffffff" />
//               <Stop offset="100%" stopColor="#d8d8d8" />
//             </LinearGradient>
//           </Defs>

//           {/* Dome */}
//           <Path
//             d="
//               M110 280
//               C120 180, 280 180, 290 280
//               L290 310
//               L110 310
//               Z
//             "
//             fill="url(#domeGrad)"
//             stroke="#145c32"
//             strokeWidth="4"
//           />

//           {/* Dome lines */}
//           {[130, 150, 170, 190, 210, 230, 250, 270].map((x, i) => (
//             <Path
//               key={i}
//               d={`M200 190 Q${x} 240 ${x} 300`}
//               stroke="#0f5e31"
//               strokeWidth="1.7"
//               fill="none"
//               opacity={0.45}
//             />
//           ))}

//           {/* Dome base */}
//           <Rect
//             x="105"
//             y="305"
//             width="190"
//             height="42"
//             fill="#0d8d47"
//             stroke="#145c32"
//             strokeWidth="3"
//           />

//           {/* Main building */}
//           <Path
//             d="
//               M90 345
//               L300 345
//               L300 435
//               L90 425
//               Z
//             "
//             fill="#f8f8f8"
//             stroke="#222"
//             strokeWidth="3"
//           />

//           {/* Building crack style */}
//           <Path
//             d="M120 345 L120 420"
//             stroke="#222"
//             strokeWidth="2"
//           />
//           <Path
//             d="M120 365 L135 385 L125 400"
//             stroke="#222"
//             strokeWidth="2"
//           />

//           {/* Decorative circles */}
//           {[0, 1, 2].map((row) =>
//             [0, 1, 2].map((col) => (
//               <Circle
//                 key={`${row}-${col}`}
//                 cx={230 + col * 18 - row * 9}
//                 cy={395 - row * 20}
//                 r="8"
//                 fill="#0d9b4f"
//                 stroke="#145c32"
//                 strokeWidth="2"
//               />
//             ))
//           )}

//           {/* Minaret */}
//           <Path
//             d="
//               M300 110
//               L340 110
//               L350 430
//               L290 430
//               Z
//             "
//             fill="url(#towerGrad)"
//             stroke="#c9a86a"
//             strokeWidth="3"
//           />

//           {/* Minaret Details */}
//           <Rect
//             x="292"
//             y="180"
//             width="56"
//             height="16"
//             fill="#ffffff"
//             stroke="#c9a86a"
//             strokeWidth="2"
//           />

//           <Rect
//             x="288"
//             y="245"
//             width="64"
//             height="16"
//             fill="#ffffff"
//             stroke="#c9a86a"
//             strokeWidth="2"
//           />

//           {/* Zigzag pattern */}
//           {[0, 1, 2, 3, 4].map((i) => (
//             <Path
//               key={i}
//               d={`M300 ${205 + i * 8} L310 ${210 + i * 8} L320 ${
//                 205 + i * 8
//               } L330 ${210 + i * 8} L340 ${205 + i * 8}`}
//               stroke="#c9a86a"
//               strokeWidth="2"
//               fill="none"
//             />
//           ))}

//           {/* Top section */}
//           <Rect
//             x="305"
//             y="70"
//             width="30"
//             height="45"
//             fill="#ffffff"
//             stroke="#c9a86a"
//             strokeWidth="2"
//           />

//           {/* Moon */}
//           <Path
//             d="
//               M320 40
//               A10 10 0 1 1 321 40
//             "
//             stroke="#c9a86a"
//             strokeWidth="4"
//             fill="none"
//           />

//           {/* Floating glow behind dome */}
//           <Circle
//             cx="200"
//             cy="220"
//             r="90"
//             fill="#8fffba"
//             opacity="0.18"
//           />
//         </AnimatedSvg>
//       </Animated.View>

//       {/* Bottom fade */}
//       <View style={styles.bottomFade} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#01963f",
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//   },

//   rotatingGlow: {
//     position: "absolute",
//     width: 420,
//     height: 420,
//     borderRadius: 999,
//     backgroundColor: "#7dffb2",
//     opacity: 0.2,
//     transform: [{ scale: 1.2 }],
//     shadowColor: "#9dffbf",
//     shadowOpacity: 0.9,
//     shadowRadius: 80,
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//   },

//   bottomFade: {
//     position: "absolute",
//     bottom: -120,
//     width: width * 1.4,
//     height: 240,
//     backgroundColor: "#027531",
//     borderRadius: 300,
//     opacity: 0.5,
//   },
// });






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

