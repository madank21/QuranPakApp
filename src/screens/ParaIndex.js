import { useState, useRef, useCallback } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, Animated, StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ── DATA ──────────────────────────────────────────────────────────────────────
const paraList = [
  { n: 1,  en: "Alif Lam Meem",         ar: "الم",                  startSurah: "Al-Baqarah" },
  { n: 2,  en: "Sayaqool",              ar: "سَيَقُولُ",              startSurah: "Al-Baqarah" },
  { n: 3,  en: "Tilkal Rusul",          ar: "تِلْكَ الرُّسُلُ",       startSurah: "Al-Baqarah" },
  { n: 4,  en: "Lantanalu",             ar: "لَن تَنَالُوا",          startSurah: "Aali Imran" },
  { n: 5,  en: "Wal Mohsanat",          ar: "وَالمُحصَنَاتُ",         startSurah: "An-Nisa"   },
  { n: 6,  en: "La Yuhibbullah",        ar: "لا يُحِبُّ اللهُ",       startSurah: "An-Nisa"   },
  { n: 7,  en: "Wa Iza Sami'u",         ar: "وَإِذَا سَمِعُوا",       startSurah: "Al-Ma'idah"},
  { n: 8,  en: "Wa Lau Annana",         ar: "وَلَوْ أَنَّنَا",         startSurah: "Al-An'am" },
  { n: 9,  en: "Qalal Mala'u",          ar: "قَالَ الْمَلَأُ",        startSurah: "Al-A'raf" },
  { n: 10, en: "Wa A'lamu",             ar: "وَاعْلَمُوا",            startSurah: "Al-Anfal" },
  { n: 11, en: "Ya'taziruna",           ar: "يَعْتَذِرُونَ",          startSurah: "At-Tawbah"},
  { n: 12, en: "Wa Ma Min Dabbah",      ar: "وَمَا مِن دَابَّةٍ",     startSurah: "Hud"      },
  { n: 13, en: "Wa Ma Ubari'u",         ar: "وَمَا أُبَرِّئُ",        startSurah: "Yusuf"    },
  { n: 14, en: "Rubama",                ar: "رُّبَمَا",               startSurah: "Al-Hijr"  },
  { n: 15, en: "Subhanallazi",          ar: "سُبْحَانَ الَّذِي",      startSurah: "Al-Isra"  },
  { n: 16, en: "Qal Alam",              ar: "قَالَ أَلَمْ",           startSurah: "Al-Kahf"  },
  { n: 17, en: "Iqtaraba",              ar: "اقْتَرَبَ",              startSurah: "Al-Anbiya"},
  { n: 18, en: "Qadd Aflaha",           ar: "قَدْ أَفْلَحَ",          startSurah: "Al-Mu'minun"},
  { n: 19, en: "Wa Qalallazina",        ar: "وَقَالَ الَّذِينَ",      startSurah: "Al-Furqan"},
  { n: 20, en: "A'man Khalaqa",         ar: "أَمَّنْ خَلَقَ",         startSurah: "An-Naml"  },
  { n: 21, en: "Utlu Ma Oohi'a",        ar: "اتْلُ مَا أُوحِيَ",     startSurah: "Al-Ankabut"},
  { n: 22, en: "Wa Man Yaqnut",         ar: "وَمَن يَقْنُتْ",         startSurah: "Al-Ahzab" },
  { n: 23, en: "Wa Mali",               ar: "وَمَالِيَ",              startSurah: "Ya-Sin"   },
  { n: 24, en: "Faman Azlamu",          ar: "فَمَنْ أَظْلَمُ",        startSurah: "Az-Zumar" },
  { n: 25, en: "Ilahe Yuruddu",         ar: "إِلَيْهِ يُرَدُّ",       startSurah: "Fussilat" },
  { n: 26, en: "Ha'a Meem",             ar: "حم",                    startSurah: "Al-Ahqaf" },
  { n: 27, en: "Qala Fama Khatbukum",   ar: "قَالَ فَمَا خَطْبُكُمْ", startSurah: "Adh-Dhariyat"},
  { n: 28, en: "Qadd Sami'allah",       ar: "قَدْ سَمِعَ اللَّهُ",   startSurah: "Al-Mujadila"},
  { n: 29, en: "Tabarakallazi",         ar: "تَبَارَكَ الَّذِي",      startSurah: "Al-Mulk"  },
  { n: 30, en: "Amma Yatasa'aloon",     ar: "عَمَّ يَتَسَاءَلُونَ",   startSurah: "An-Naba"  },
];

// ── COLORS ─────────────────────────────────────────────────────────────────────
const GOLD  = "#C8972A";
const GOLD2 = "#F0C060";
const TEAL  = "#0ABFA3";
const DEEP  = "#04080F";
const NAVY  = "#070D1A";

// ── PARA CARD ─────────────────────────────────────────────────────────────────
const ParaCard = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const press   = () => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  const release = () => Animated.spring(scaleAnim, { toValue: 1,    useNativeDriver: true }).start();

  // BottomNav Component - Add this before SurahIndex component
const BottomNav = ({ active, onNavigate }) => {
  const items = [
    { id: "home",   icon: "🏠", label: "Home"   },
    { id: "viewer", icon: "📖", label: "Viewer" },
    { id: "surah",  icon: "🕌", label: "Surah"  },
    { id: "para",   icon: "📑", label: "Para"   },
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.navItem}
          onPress={() => onNavigate(item.id)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.navIcon,
            active === item.id && styles.navIconActive
          ]}>
            {item.icon}
          </Text>
          <Text style={[
            styles.navLabel,
            active === item.id && styles.navLabelActive
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPressIn={press}
        onPressOut={release}
        onPress={() => onPress && onPress(item)}
        style={styles.card}
      >
        <LinearGradient
          colors={["rgba(10,191,163,0.05)", "rgba(200,151,42,0.03)"]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {/* Left accent — teal for para (distinct from surah's gold→teal) */}
        <LinearGradient
          colors={[TEAL, GOLD]}
          style={styles.cardAccent}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        {/* Number badge */}
        <View style={styles.numBadge}>
          <Text style={styles.numText}>{item.n}</Text>
        </View>
        {/* Text body */}
        <View style={styles.cardBody}>
          <Text style={styles.cardEn}>{item.en}</Text>
          <Text style={styles.cardMeta}>Starts in: {item.startSurah}</Text>
        </View>
        {/* Arabic */}
        <Text style={styles.cardAr}>{item.ar}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const ParaIndex = ({ navigation }) => {
  const [query, setQuery] = useState("");

  const filtered = paraList.filter(
    (p) =>
      p.en.toLowerCase().includes(query.toLowerCase()) ||
      p.ar.includes(query) ||
      String(p.n).includes(query)
  );

  const handlePress = useCallback(
    (para) => {
      if (para.imageId) {
        navigation.navigate("QuranViewer", { imageId: para.imageId });
      }
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => <ParaCard item={item} onPress={handlePress} />,
    [handlePress]
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={DEEP} />

      {/* Background */}
      <LinearGradient
        colors={[DEEP, NAVY, "#05101F"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      />
      {/* Teal glow top-right */}
      <View style={[styles.glow, { top: -80, right: -40, backgroundColor: "rgba(10,191,163,0.06)" }]} />
      {/* Gold glow bottom-left */}
      <View style={[styles.glow, { bottom: 80, left: -60, backgroundColor: "rgba(200,151,42,0.05)" }]} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>PARA INDEX</Text>
          <Text style={styles.headerCount}>{filtered.length} of 30 Paras</Text>
        </View>
        {/* Teal badge to differentiate from Surah */}
        <View style={styles.headerDecor}>
          <Text style={styles.headerAr}>الأَجزاء</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search para name or number…"
          placeholderTextColor="rgba(138,138,154,0.7)"
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Divider */}
      <View style={styles.headerDivider} />

      {/* Progress pills */}
      <View style={styles.pillsRow}>
        {[1, 7, 13, 19, 25].map((n) => (
          <View key={n} style={styles.pill}>
            <Text style={styles.pillText}>Para {n}–{Math.min(n + 5, 30)}</Text>
          </View>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.n)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
      />

      {/* Bottom Navigation */}
      <BottomNav active="surah" onNavigate={handleNavigate} />
    </View>
  );
};

// ── STYLES ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DEEP },
  glow: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
  },

  // Header
  header: {
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backArrow: {
    fontSize: 24,
    color: TEAL,
    lineHeight: 28,
  },
  backText: {
    fontSize: 11,
    color: TEAL,
    letterSpacing: 2,
    fontWeight: "600",
  },
  headerTitles: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "serif",
    color: TEAL,
    letterSpacing: 3,
    textShadowColor: "rgba(10,191,163,0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  headerCount: {
    fontSize: 11,
    color: "rgba(138,138,154,0.8)",
    marginTop: 2,
    letterSpacing: 1,
  },
  headerDecor: {
    backgroundColor: "rgba(10,191,163,0.1)",
    borderWidth: 1,
    borderColor: "rgba(10,191,163,0.3)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  headerAr: {
    fontSize: 15,
    color: TEAL,
  },

  // Search
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "rgba(10,18,35,0.9)",
    borderWidth: 1,
    borderColor: "rgba(10,191,163,0.25)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#E8E0D0",
    fontFamily: "sans-serif",
  },
  clearBtn: { fontSize: 14, color: "rgba(138,138,154,0.7)", padding: 4 },

  headerDivider: {
    height: 1,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "rgba(10,191,163,0.2)",
  },

  // Quick pills
  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 18,
    gap: 6,
    marginBottom: 10,
  },
  pill: {
    backgroundColor: "rgba(10,191,163,0.08)",
    borderWidth: 1,
    borderColor: "rgba(10,191,163,0.2)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillText: {
    fontSize: 10,
    color: TEAL,
    letterSpacing: 0.5,
  },

  // List
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(10,18,35,0.85)",
    borderWidth: 1,
    borderColor: "rgba(10,191,163,0.18)",
    borderRadius: 14,
    marginBottom: 10,
    padding: 14,
    overflow: "hidden",
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  cardAccent: {
    position: "absolute",
    left: 0, top: 0, bottom: 0,
    width: 3,
    borderRadius: 3,
  },
  numBadge: {
    width: 40, height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(10,191,163,0.1)",
    borderWidth: 1,
    borderColor: "rgba(10,191,163,0.25)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  numText: {
    fontSize: 13,
    fontWeight: "800",
    color: TEAL,
    fontFamily: "serif",
  },
  cardBody: { flex: 1 },
  cardEn: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E8E0D0",
    letterSpacing: 0.3,
  },
  cardMeta: {
    fontSize: 11,
    color: "rgba(138,138,154,0.7)",
    marginTop: 2,
  },
  cardAr: {
    fontSize: 22,
    color: TEAL,
    textShadowColor: "rgba(10,191,163,0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    flexShrink: 0,
  },
  // Bottom Navigation
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "rgba(7,13,26,0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(200,151,42,0.3)",
    backdropFilter: "blur(20px)", // Note: blur effect might need extra setup in React Native
    paddingVertical: 8,
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 6,
  },
  navIcon: {
    fontSize: 20,
    opacity: 0.7,
  },
  navIconActive: {
    opacity: 1,
    textShadowColor: "rgba(200,151,42,0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  navLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: "rgba(138,138,154,0.8)",
    fontWeight: "500",
  },
  navLabelActive: {
    color: GOLD2,
  },

  // Update listContent to add bottom padding
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Increased to avoid content being hidden behind bottom nav
  },
});

export default ParaIndex;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';

// import styles from '../styles/appStyles';



//   const paraList = [
//     { number: 1, label: 'Alif Lam Meem', arabic: 'الم' , imageId: 2 },
//     { number: 2, label: 'Sayaqool', arabic: 'سَيَقُولُ' , imageId: 23 },
//     { number: 3, label: 'Tilkal Rusul', arabic: 'تِلْكَ الرُّسُلُ' , imageId: 43 },
//     { number: 4, label: 'Lantanalu', arabic: 'لَن تَنَالُوا' , imageId: 63 },
//     { number: 5, label: 'Wal Mohsanat', arabic: 'والمُحْصَنَاتُ' , imageId: 83 },
//     { number: 6, label: 'La Yuhibbullah', arabic: 'لا يُحِبُّ اللهُ' , imageId: 103 },
//     { number: 7, label: 'Wa Iza Sami‘u', arabic: 'وَإِذَا سَمِعُوا' , imageId: 123 },
//     { number: 8, label: 'Wa Lau Annana', arabic: 'ولو أننا' , imageId: 143 },
//     { number: 9, label: 'Qalal Malao', arabic: 'قال الملأ' , imageId: 163 },
//     { number: 10, label: 'Wa A‘lamu', arabic: 'واعلموا' , imageId: 183 },
//     { number: 11, label: 'Ya‘tadhiruna', arabic: 'يعتذرون' , imageId: 203 },
//     { number: 12, label: 'Wa Mamin Da‘abba', arabic: 'وما من دابة' , imageId: 223 },
//     { number: 13, label: 'Wa Ma Ubrioo', arabic: 'وما أبرئ' , imageId: 243 },
//     { number: 14, label: 'Rubama', arabic: 'ربما' , imageId: 263 },
//     { number: 15, label: 'Subhanallazi', arabic: 'سبحان الذي' , imageId: 283 },
//     { number: 16, label: 'Qala Alam', arabic: 'قال ألم' , imageId: 303 },
//     { number: 17, label: 'Aqtarabat', arabic: ' اقترب للناس' , imageId: 323 },
//     { number: 18, label: 'Qadd Aflaha', arabic: 'قد أفلح' , imageId: 343 },
//     { number: 19, label: 'Wa Qalallazina', arabic: 'وقال الذين' , imageId: 363 },
//     { number: 20, label: 'Aman Khalaq', arabic: 'أمن خلق' , imageId: 383 },
//     { number: 21, label: 'Utlu Ma Oohiya', arabic: 'اتل ما أوحي' , imageId: 403 },
//     { number: 22, label: 'Wa Manyaqnut', arabic: 'ومن يقنت' , imageId: 423 },
//     { number: 23, label: 'Wa Mali', arabic: 'وما لي' , imageId: 443 },
//     { number: 24, label: 'Faman Azlam', arabic: 'فمن أظلم' , imageId: 463 },
//     { number: 25, label: 'Ilayhi Yuraddu', arabic: 'إليه يرد' , imageId: 483 },
//     { number: 26, label: 'Ha Meem', arabic: 'حم' , imageId: 503 },
//     { number: 27, label: 'Qala Fama Khatbukum', arabic: 'قال فما خطبكم' , imageId: 523 },
//     { number: 28, label: 'Qadd Sami‘a', arabic: 'قد سمع' , imageId: 543 },
//     { number: 29, label: 'Tabarakallazi', arabic: 'تبارك الذي' , imageId: 563 },
//     { number: 30, label: 'Amma Yatasa’aloon', arabic: 'عمّ' , imageId: 587 },
// ];


// const ParaIndex = ({ navigation }) => {
//   const handlePress = (para) => {
//     if (para.imageId) {
//       navigation.navigate('QuranViewer', { imageId: para.imageId });
//     } else {
//       Alert.alert(`Para ${para.number}`, `${para.label} (${para.arabic})`);
//     }
//   };

  
//   return (
//     <View style={styles.screen}>
//       <View style={styles.screenHeader}>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Text style={styles.headerBack}>‹ Back</Text>
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Para Index</Text>

//         <Text style={styles.headerCount}>
//           {paraList.length} of 30 Paras
//         </Text>
//       </View>

//       <View style={styles.searchWrap}>
//         <View style={styles.searchWrapInner}>
//           <Text style={styles.searchIcon}>🔍</Text>

//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search para name or number…"
//             placeholderTextColor="#8A8A9A"
//           />
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.listContainer}>
//         {paraList.map((para) => (
//           <TouchableOpacity
//             key={para.number}
//             style={styles.indexCard}
//           >
//             <View style={styles.cardNum}>
//               <Text style={styles.cardNumText}>{para.number}</Text>
//             </View>

//             <View style={styles.cardBody}>
//               <Text style={styles.cardEn}>{para.label}</Text>

//               <Text style={styles.cardMeta}>
//                 Para {para.number} of 30
//               </Text>
//             </View>

//             <Text style={styles.cardAr}>{para.arabic}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default ParaIndex;




// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

// const paraList = [
//     { number: 1, label: 'Alif Lam Meem', arabic: 'الم' , imageId: 2 },
//     { number: 2, label: 'Sayaqool', arabic: 'سَيَقُولُ' , imageId: 23 },
//     { number: 3, label: 'Tilkal Rusul', arabic: 'تِلْكَ الرُّسُلُ' , imageId: 43 },
//     { number: 4, label: 'Lantanalu', arabic: 'لَن تَنَالُوا' , imageId: 63 },
//     { number: 5, label: 'Wal Mohsanat', arabic: 'والمُحْصَنَاتُ' , imageId: 83 },
//     { number: 6, label: 'La Yuhibbullah', arabic: 'لا يُحِبُّ اللهُ' , imageId: 103 },
//     { number: 7, label: 'Wa Iza Sami‘u', arabic: 'وَإِذَا سَمِعُوا' , imageId: 123 },
//     { number: 8, label: 'Wa Lau Annana', arabic: 'ولو أننا' , imageId: 143 },
//     { number: 9, label: 'Qalal Malao', arabic: 'قال الملأ' , imageId: 163 },
//     { number: 10, label: 'Wa A‘lamu', arabic: 'واعلموا' , imageId: 183 },
//     { number: 11, label: 'Ya‘tadhiruna', arabic: 'يعتذرون' , imageId: 203 },
//     { number: 12, label: 'Wa Mamin Da‘abba', arabic: 'وما من دابة' , imageId: 223 },
//     { number: 13, label: 'Wa Ma Ubrioo', arabic: 'وما أبرئ' , imageId: 243 },
//     { number: 14, label: 'Rubama', arabic: 'ربما' , imageId: 263 },
//     { number: 15, label: 'Subhanallazi', arabic: 'سبحان الذي' , imageId: 283 },
//     { number: 16, label: 'Qala Alam', arabic: 'قال ألم' , imageId: 303 },
//     { number: 17, label: 'Aqtarabat', arabic: ' اقترب للناس' , imageId: 323 },
//     { number: 18, label: 'Qadd Aflaha', arabic: 'قد أفلح' , imageId: 343 },
//     { number: 19, label: 'Wa Qalallazina', arabic: 'وقال الذين' , imageId: 363 },
//     { number: 20, label: 'Aman Khalaq', arabic: 'أمن خلق' , imageId: 383 },
//     { number: 21, label: 'Utlu Ma Oohiya', arabic: 'اتل ما أوحي' , imageId: 403 },
//     { number: 22, label: 'Wa Manyaqnut', arabic: 'ومن يقنت' , imageId: 423 },
//     { number: 23, label: 'Wa Mali', arabic: 'وما لي' , imageId: 443 },
//     { number: 24, label: 'Faman Azlam', arabic: 'فمن أظلم' , imageId: 463 },
//     { number: 25, label: 'Ilayhi Yuraddu', arabic: 'إليه يرد' , imageId: 483 },
//     { number: 26, label: 'Ha Meem', arabic: 'حم' , imageId: 503 },
//     { number: 27, label: 'Qala Fama Khatbukum', arabic: 'قال فما خطبكم' , imageId: 523 },
//     { number: 28, label: 'Qadd Sami‘a', arabic: 'قد سمع' , imageId: 543 },
//     { number: 29, label: 'Tabarakallazi', arabic: 'تبارك الذي' , imageId: 563 },
//     { number: 30, label: 'Amma Yatasa’aloon', arabic: 'عمّ' , imageId: 587 },
// ];


// const ParaIndex = ({ navigation }) => {
//   const handlePress = (para) => {
//     if (para.imageId) {
//       navigation.navigate('QuranViewer', { imageId: para.imageId });
//     } else {
//       Alert.alert(`Para ${para.number}`, `${para.label} (${para.arabic})`);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {paraList.map((para) => (
//         <TouchableOpacity
//           key={para.number}
//           style={styles.item}
//           onPress={() => handlePress(para)}
//         >
//           <Text style={styles.surahNumber}>Para {para.number}</Text>
//           <Text style={styles.label}>{para.label}</Text>
//           <Text style={styles.arabic}>{para.arabic}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//     alignItems: 'stretch',
//   },
//   item: {
//     backgroundColor: '#e6f7f9',
//     marginBottom: 12,
//     borderRadius: 10,
//     padding: 16,
//     alignItems: 'center',
//     elevation: 3,
//   },
//   paraNumber: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#004d40',
//     marginBottom: 4,
//   },
//   label: {
//     fontSize: 16,
//     color: '#00796B',
//     marginBottom: 2,
//   },
//   arabic: {
//     fontSize: 20,
//     color: '#2E7D32',
//     fontFamily: 'sans-serif',
//   },
// });

// export default ParaIndex;


