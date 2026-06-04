import { useState, useRef, useCallback } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, Dimensions, StatusBar, Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get("window");

// ── DATA ──────────────────────────────────────────────────────────────────────
const surahList = [
  { n: 1,   en: "Al-Fatiha",       ar: "الفاتحة",       verses: 7   },
  { n: 2,   en: "Al-Baqarah",      ar: "البقرة",        verses: 286 },
  { n: 3,   en: "Aali Imran",      ar: "آل عمران",      verses: 200 },
  { n: 4,   en: "An-Nisa",         ar: "النساء",        verses: 176 },
  { n: 5,   en: "Al-Ma'idah",      ar: "المائدة",       verses: 120 },
  { n: 6,   en: "Al-An'am",        ar: "الأنعام",       verses: 165 },
  { n: 7,   en: "Al-A'raf",        ar: "الأعراف",       verses: 206 },
  { n: 8,   en: "Al-Anfal",        ar: "الأنفال",       verses: 75  },
  { n: 9,   en: "At-Tawbah",       ar: "التوبة",        verses: 129 },
  { n: 10,  en: "Yunus",           ar: "يونس",           verses: 109 },
  { n: 11,  en: "Hud",             ar: "هود",            verses: 123 },
  { n: 12,  en: "Yusuf",           ar: "يوسف",           verses: 111 },
  { n: 13,  en: "Ar-Ra'd",         ar: "الرعد",          verses: 43  },
  { n: 14,  en: "Ibrahim",         ar: "إبراهيم",        verses: 52  },
  { n: 15,  en: "Al-Hijr",         ar: "الحجر",          verses: 99  },
  { n: 16,  en: "An-Nahl",         ar: "النحل",          verses: 128 },
  { n: 17,  en: "Al-Isra",         ar: "الإسراء",        verses: 111 },
  { n: 18,  en: "Al-Kahf",         ar: "الكهف",          verses: 110 },
  { n: 19,  en: "Maryam",          ar: "مريم",           verses: 98  },
  { n: 20,  en: "Ta-Ha",           ar: "طه",             verses: 135 },
  { n: 21,  en: "Al-Anbiya",       ar: "الأنبياء",       verses: 112 },
  { n: 22,  en: "Al-Hajj",         ar: "الحج",           verses: 78  },
  { n: 23,  en: "Al-Mu'minun",     ar: "المؤمنون",       verses: 118 },
  { n: 24,  en: "An-Nur",          ar: "النور",          verses: 64  },
  { n: 25,  en: "Al-Furqan",       ar: "الفرقان",        verses: 77  },
  { n: 26,  en: "Ash-Shu'ara",     ar: "الشعراء",        verses: 227 },
  { n: 27,  en: "An-Naml",         ar: "النمل",          verses: 93  },
  { n: 28,  en: "Al-Qasas",        ar: "القصص",          verses: 88  },
  { n: 29,  en: "Al-Ankabut",      ar: "العنكبوت",       verses: 69  },
  { n: 30,  en: "Ar-Rum",          ar: "الروم",          verses: 60  },
  { n: 31,  en: "Luqman",          ar: "لقمان",          verses: 34  },
  { n: 32,  en: "As-Sajdah",       ar: "السجدة",         verses: 30  },
  { n: 33,  en: "Al-Ahzab",        ar: "الأحزاب",        verses: 73  },
  { n: 34,  en: "Saba",            ar: "سبأ",            verses: 54  },
  { n: 35,  en: "Fatir",           ar: "فاطر",           verses: 45  },
  { n: 36,  en: "Ya-Sin",          ar: "يس",             verses: 83  },
  { n: 37,  en: "As-Saffat",       ar: "الصافات",        verses: 182 },
  { n: 38,  en: "Sad",             ar: "ص",              verses: 88  },
  { n: 39,  en: "Az-Zumar",        ar: "الزمر",          verses: 75  },
  { n: 40,  en: "Ghafir",          ar: "غافر",           verses: 85  },
  { n: 41,  en: "Fussilat",        ar: "فصلت",           verses: 54  },
  { n: 42,  en: "Ash-Shura",       ar: "الشورى",         verses: 53  },
  { n: 43,  en: "Az-Zukhruf",      ar: "الزخرف",         verses: 89  },
  { n: 44,  en: "Ad-Dukhan",       ar: "الدخان",         verses: 59  },
  { n: 45,  en: "Al-Jathiyah",     ar: "الجاثية",        verses: 37  },
  { n: 46,  en: "Al-Ahqaf",        ar: "الأحقاف",        verses: 35  },
  { n: 47,  en: "Muhammad",        ar: "محمد",           verses: 38  },
  { n: 48,  en: "Al-Fath",         ar: "الفتح",          verses: 29  },
  { n: 49,  en: "Al-Hujurat",      ar: "الحجرات",        verses: 18  },
  { n: 50,  en: "Qaf",             ar: "ق",              verses: 45  },
  { n: 51,  en: "Adh-Dhariyat",    ar: "الذاريات",       verses: 60  },
  { n: 52,  en: "At-Tur",          ar: "الطور",          verses: 49  },
  { n: 53,  en: "An-Najm",         ar: "النجم",          verses: 62  },
  { n: 54,  en: "Al-Qamar",        ar: "القمر",          verses: 55  },
  { n: 55,  en: "Ar-Rahman",       ar: "الرحمن",         verses: 78  },
  { n: 56,  en: "Al-Waqi'ah",      ar: "الواقعة",        verses: 96  },
  { n: 57,  en: "Al-Hadid",        ar: "الحديد",         verses: 29  },
  { n: 58,  en: "Al-Mujadila",     ar: "المجادلة",       verses: 22  },
  { n: 59,  en: "Al-Hashr",        ar: "الحشر",          verses: 24  },
  { n: 60,  en: "Al-Mumtahanah",   ar: "الممتحنة",       verses: 13  },
  { n: 61,  en: "As-Saf",          ar: "الصف",           verses: 14  },
  { n: 62,  en: "Al-Jumu'ah",      ar: "الجمعة",         verses: 11  },
  { n: 63,  en: "Al-Munafiqun",    ar: "المنافقون",      verses: 11  },
  { n: 64,  en: "At-Taghabun",     ar: "التغابن",        verses: 18  },
  { n: 65,  en: "At-Talaq",        ar: "الطلاق",         verses: 12  },
  { n: 66,  en: "At-Tahrim",       ar: "التحريم",        verses: 12  },
  { n: 67,  en: "Al-Mulk",         ar: "الملك",          verses: 30  },
  { n: 68,  en: "Al-Qalam",        ar: "القلم",          verses: 52  },
  { n: 69,  en: "Al-Haqqah",       ar: "الحاقة",         verses: 52  },
  { n: 70,  en: "Al-Ma'arij",      ar: "المعارج",        verses: 44  },
  { n: 71,  en: "Nuh",             ar: "نوح",            verses: 28  },
  { n: 72,  en: "Al-Jinn",         ar: "الجن",           verses: 28  },
  { n: 73,  en: "Al-Muzzammil",    ar: "المزمل",         verses: 20  },
  { n: 74,  en: "Al-Muddaththir",  ar: "المدثر",         verses: 56  },
  { n: 75,  en: "Al-Qiyamah",      ar: "القيامة",        verses: 40  },
  { n: 76,  en: "Al-Insan",        ar: "الإنسان",        verses: 31  },
  { n: 77,  en: "Al-Mursalat",     ar: "المرسلات",       verses: 50  },
  { n: 78,  en: "An-Naba",         ar: "النبأ",          verses: 40  },
  { n: 79,  en: "An-Nazi'at",      ar: "النازعات",       verses: 46  },
  { n: 80,  en: "Abasa",           ar: "عبس",            verses: 42  },
  { n: 81,  en: "At-Takwir",       ar: "التكوير",        verses: 29  },
  { n: 82,  en: "Al-Infitar",      ar: "الانفطار",       verses: 19  },
  { n: 83,  en: "Al-Mutaffifin",   ar: "المطففين",       verses: 36  },
  { n: 84,  en: "Al-Inshiqaq",     ar: "الانشقاق",       verses: 25  },
  { n: 85,  en: "Al-Buruj",        ar: "البروج",         verses: 22  },
  { n: 86,  en: "At-Tariq",        ar: "الطارق",         verses: 17  },
  { n: 87,  en: "Al-A'la",         ar: "الأعلى",         verses: 19  },
  { n: 88,  en: "Al-Ghashiyah",    ar: "الغاشية",        verses: 26  },
  { n: 89,  en: "Al-Fajr",         ar: "الفجر",          verses: 30  },
  { n: 90,  en: "Al-Balad",        ar: "البلد",          verses: 20  },
  { n: 91,  en: "Ash-Shams",       ar: "الشمس",          verses: 15  },
  { n: 92,  en: "Al-Layl",         ar: "الليل",          verses: 21  },
  { n: 93,  en: "Ad-Duha",         ar: "الضحى",          verses: 11  },
  { n: 94,  en: "Ash-Sharh",       ar: "الشرح",          verses: 8   },
  { n: 95,  en: "At-Tin",          ar: "التين",          verses: 8   },
  { n: 96,  en: "Al-Alaq",         ar: "العلق",          verses: 19  },
  { n: 97,  en: "Al-Qadr",         ar: "القدر",          verses: 5   },
  { n: 98,  en: "Al-Bayyinah",     ar: "البينة",         verses: 8   },
  { n: 99,  en: "Az-Zalzalah",     ar: "الزلزلة",        verses: 8   },
  { n: 100, en: "Al-Adiyat",       ar: "العاديات",       verses: 11  },
  { n: 101, en: "Al-Qari'ah",      ar: "القارعة",        verses: 11  },
  { n: 102, en: "At-Takathur",     ar: "التكاثر",        verses: 8   },
  { n: 103, en: "Al-Asr",          ar: "العصر",          verses: 3   },
  { n: 104, en: "Al-Humazah",      ar: "الهمزة",         verses: 9   },
  { n: 105, en: "Al-Fil",          ar: "الفيل",          verses: 5   },
  { n: 106, en: "Quraysh",         ar: "قريش",           verses: 4   },
  { n: 107, en: "Al-Ma'un",        ar: "الماعون",        verses: 7   },
  { n: 108, en: "Al-Kawthar",      ar: "الكوثر",         verses: 3   },
  { n: 109, en: "Al-Kafirun",      ar: "الكافرون",       verses: 6   },
  { n: 110, en: "An-Nasr",         ar: "النصر",          verses: 3   },
  { n: 111, en: "Al-Masad",        ar: "المسد",          verses: 5   },
  { n: 112, en: "Al-Ikhlas",       ar: "الإخلاص",        verses: 4   },
  { n: 113, en: "Al-Falaq",        ar: "الفلق",          verses: 5   },
  { n: 114, en: "An-Nas",          ar: "الناس",          verses: 6   },
];

// ── COLORS ─────────────────────────────────────────────────────────────────────
const GOLD  = "#62df62";
const GOLD2 = "#e4a21e";
const TEAL  = "#06b354";
const DEEP  = "#04080F";
const NAVY  = "#070D1A";

// ── BOTTOM NAV COMPONENT ─────────────────────────────────────────────────────
// const BottomNav = ({ active, onNavigate }) => {
//   const items = [
//     { id: "home",   icon: "🏠", label: "Home"   },
//     { id: "viewer", icon: "📖", label: "Viewer" },
//     { id: "surah",  icon: "🕌", label: "Surah"  },
//     { id: "para",   icon: "📑", label: "Para"   },
//   ];

//   return (
//     <BlurView intensity={100} tint="dark" style={styles.bottomNav}>
//       {items.map((item) => (
//         <TouchableOpacity
//           key={item.id}
//           style={styles.navItem}
//           onPress={() => onNavigate(item.id)}
//           activeOpacity={0.7} //this is for the touch feedback when pressing the nav items
//         >
//           <Text style={[
//             styles.navIcon,
//             active === item.id && styles.navIconActive
//           ]}>
//             {item.icon}
//           </Text>
//           <Text style={[
//             styles.navLabel,
//             active === item.id && styles.navLabelActive
//           ]}>
//             {item.label}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </BlurView>
//   );
// };

// ── SURAH CARD ────────────────────────────────────────────────────────────────
const SurahCard = ({ item, index, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const press   = () => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  const release = () => Animated.spring(scaleAnim, { toValue: 1,    useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPressIn={press}
        onPressOut={release}
        onPress={() => onPress(item)}
        style={styles.card}
      >
        <LinearGradient
          colors={["rgba(200,151,42,0.05)", "rgba(10,191,163,0.02)"]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {/* Left accent */}
        <LinearGradient
          colors={[GOLD2, TEAL]}
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
          <Text style={styles.cardMeta}>{item.verses} verses</Text>
        </View>
        {/* Arabic */}
        <Text style={styles.cardAr}>{item.ar}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const SurahIndex = ({ navigation }) => {
  const [query, setQuery] = useState("");

  const filtered = surahList.filter(
    (s) =>
      s.en.toLowerCase().includes(query.toLowerCase()) ||
      s.ar.includes(query) ||
      String(s.n).includes(query)
  );

  const handlePress = useCallback(
    (surah) => {
      if (surah.imageId) {
        navigation.navigate("QuranViewer", { imageId: surah.imageId });
      }
    },
    [navigation]
  );

  // Add the handleNavigate function
  const handleNavigate = useCallback((screen) => {
    switch(screen) {
      case "home":
        navigation.navigate("Home"); // Adjust to your home screen route name
        break;
      case "viewer":
        navigation.navigate("QuranViewer"); // Adjust to your viewer route name
        break;
      case "surah":
        // Already on surah screen, do nothing
        break;
      case "para":
        navigation.navigate("ParaIndex"); // Adjust to your para index route name
        break;
      default:
        break;
    }
  }, [navigation]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <SurahCard item={item} index={index} onPress={handlePress} />
    ),
    [handlePress]
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={DEEP} />

      {/* Background */}
      <LinearGradient
        colors={[DEEP, NAVY, DEEP]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      />
      <View style={[styles.glow, { top: -60, right: -60, backgroundColor: "rgba(200,151,42,0.05)" }]} />
      <View style={[styles.glow, { bottom: 100, left: -60, backgroundColor: "rgba(10,191,163,0.04)" }]} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>SURAH INDEX</Text>
          <Text style={styles.headerCount}>{filtered.length} of 114 Surahs</Text>
        </View>
        <View style={styles.headerDecor}>
          <Text style={styles.headerAr}>السُّوَر</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search surah name or number…"
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

      {/* Bottom Navigation
      <BottomNav active="surah" onNavigate={handleNavigate} /> */}
    </View>
  );
};

// ── STYLES ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#00a00d" },
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
    justifyContent: "space-between",
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
  headerTitles: { flex: 1, marginLeft: 16 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "serif",
    color: TEAL,
    letterSpacing: 3,
    textShadowColor: "rgba(3, 199, 166, 0.3)",
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
    borderColor: "rgba(10, 191, 182, 0.5)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  headerAr: {
    fontSize: 15,
    color: "rgba(5, 5, 4, 0.97)",
  },

  // Search
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "rgba(107, 224, 146, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(3, 10, 8, 0.5)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#2e2d2a",
    fontFamily: "sans-serif",
  },
  clearBtn: { fontSize: 14, color: "rgba(138,138,154,0.7)", padding: 4 },

  headerDivider: {
    height: 1,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "rgba(17, 163, 141, 0.49)",
  },

  // List
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(10,18,35,0.85)",
    borderWidth: 1,
    borderColor: "rgba(46, 190, 169, 0.16)",
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
    fontSize: 16,
    fontWeight: "800",
    color: TEAL,
    fontFamily: "serif",
  },
  cardBody: { flex: 1 },
  cardEn: {
    fontSize: 15,
    fontWeight: "600",
    color: "#251d0dce",
    letterSpacing: 0.3,
  },
  cardMeta: {
    fontSize: 11,
    color: "rgba(154, 152, 138, 0.65)",
    marginTop: 2,
  },
  cardAr: {
    fontSize: 22,
    color: "black",
    textShadowColor: "rgba(248, 253, 250, 0.43)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    flexShrink: 0,
  },

  // // Bottom Navigation
  // bottomNav: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   flexDirection: "row",
  //   paddingVertical: 8,
  //   paddingBottom: 20,
  //   borderTopWidth: 1,
  //   borderTopColor: "rgba(200,151,42,0.3)",
  //  borderTopRightRadius: 70,
  //   borderTopLeftRadius: 70,
  // },
  // navItem: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   gap: 4,
  //   paddingVertical: 6,
  // },
  // navIcon: {
  //   fontSize: 20,
  //   opacity: 0.7,
  // },
  // navIconActive: {
  //   opacity: 100,
  //   textShadowColor: "rgba(200,151,42,0.6)",
  //   textShadowOffset: { width: 5, height: 5 },
  //   textShadowRadius: 10,
  // },
  // navLabel: {
  //   fontSize: 10,
  //   letterSpacing: 0.5,
  //   textTransform: "uppercase",
  //   color: "rgba(138,138,154,0.8)",
  //   fontWeight: "500",
  // },
  // navLabelActive: {
  //   color: GOLD2,
  // },
});

export default SurahIndex;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';

// import styles from '../styles/appStyles';

// const surahList = [
//   { number: 1, label: 'Al-Fatiha', arabic: 'الفاتحة', imageId: 2 },
//   { number: 2, label: 'Al-Baqarah', arabic: 'البقرة', imageId: 3 },
//   { number: 3, label: 'Aali Imran', arabic: 'آل عمران', imageId: 51 },
//   { number: 4, label: 'An-Nisa', arabic: 'النساء', imageId: 78 },
//   { number: 5, label: 'Al-Ma\'idah', arabic: 'المائدة', imageId: 107 },
//   { number: 6, label: 'Al-An\'am', arabic: 'الأنعام', imageId: 129 },
//   { number: 7, label: 'Al-A\'raf', arabic: 'الأعراف', imageId: 152 },
//   { number: 8, label: 'Al-Anfal', arabic: 'الأنفال', imageId: 178 },
//   { number: 9, label: 'At-Tawbah', arabic: 'التوبة', imageId: 188 },
//   { number: 10, label: 'Yunus', arabic: 'يونس', imageId: 209 },
//   { number: 11, label: 'Hud', arabic: 'هود', imageId: 222 },
//   { number: 12, label: 'Yusuf', arabic: 'يوسف', imageId: 236 },
//   { number: 13, label: 'Ar-Ra\'d', arabic: 'الرعد', imageId: 250 },
//   { number: 14, label: 'Ibrahim', arabic: 'إبراهيم', imageId: 256 },
//   { number: 15, label: 'Al-Hijr', arabic: 'الحجر', imageId: 263 },
//   { number: 16, label: 'An-Nahl', arabic: 'النحل', imageId: 268 },
//   { number: 17, label: 'Al-Isra', arabic: 'الإسراء', imageId: 283 },
//   { number: 18, label: 'Al-Kahf', arabic: 'الكهف', imageId: 294 },
//   { number: 19, label: 'Maryam', arabic: 'مريم', imageId: 306 },
//   { number: 20, label: 'Taha', arabic: 'طه', imageId: 313 },
//   { number: 21, label: 'Al-Anbiya', arabic: 'الأنبياء', imageId: 323 },
//   { number: 22, label: 'Al-Hajj', arabic: 'الحج', imageId: 332 },
//   { number: 23, label: 'Al-Mu\'minun', arabic: 'المؤمنون', imageId: 343 },
//   { number: 24, label: 'An-Nur', arabic: 'النور', imageId: 351 },
//   { number: 25, label: 'Al-Furqan', arabic: 'الفرقان', imageId: 360 },
//   { number: 26, label: 'Ash-Shu\'ara', arabic: 'الشعراء', imageId: 367 },
//   { number: 27, label: 'An-Naml', arabic: 'النمل', imageId: 377 },
//   { number: 28, label: 'Al-Qasas', arabic: 'القصص', imageId: 386 },
//   { number: 29, label: 'Al-Ankabut', arabic: 'العنكبوت', imageId: 397 },
//   { number: 30, label: 'Ar-Rum', arabic: 'الروم', imageId: 405 },
//   { number: 31, label: 'Luqman', arabic: 'لقمان', imageId: 412 },
//   { number: 32, label: 'As-Sajda', arabic: 'السجدة', imageId: 416 },
//   { number: 33, label: 'Al-Ahzab', arabic: 'الأحزاب', imageId: 419 },
//   { number: 34, label: 'Saba', arabic: 'سبإ', imageId: 429 },
//   { number: 35, label: 'Fatir', arabic: 'فاطر', imageId: 435 },
//   { number: 36, label: 'Ya-Sin', arabic: 'يٰس٘', imageId: 440 },
//   { number: 37, label: 'As-Saffat', arabic: 'الصافات', imageId: 446 },
//   { number: 38, label: 'Sad', arabic: 'ص٘', imageId: 452 },
//   { number: 39, label: 'Az-Zumar', arabic: 'الزمر', imageId: 459 },
//   { number: 40, label: 'Ghafir', arabic: 'غافر', imageId: 468 },
//   { number: 41, label: 'Fussilat', arabic: 'فصلت', imageId: 478 },
//   { number: 42, label: 'Ash-Shura', arabic: 'الشورى', imageId: 484 },
//   { number: 43, label: 'Az-Zukhruf', arabic: 'الزخرف', imageId: 490 },
//   { number: 44, label: 'Ad-Dukhan', arabic: 'الدخان', imageId: 496 },
//   { number: 45, label: 'Al-Jathiyah', arabic: 'الجاثية', imageId: 499 },
//   { number: 46, label: 'Al-Ahqaf', arabic: 'الأحقاف', imageId: 503 },
//   { number: 47, label: 'Muhammad', arabic: 'محمد', imageId: 507 },
//   { number: 48, label: 'Al-Fath', arabic: 'الفتح', imageId: 512 },
//   { number: 49, label: 'Al-Hujurat', arabic: 'الحجرات', imageId: 516 },
//   { number: 50, label: 'Qaf', arabic: 'ق', imageId: 519 },
//   { number: 51, label: 'Adh-Dhariyat', arabic: 'الذاريات', imageId: 521 },
//   { number: 52, label: 'At-Tur', arabic: 'الطور', imageId: 524 },
//   { number: 53, label: 'An-Najm', arabic: 'النجم', imageId: 527 },
//   { number: 54, label: 'Al-Qamar', arabic: 'القمر', imageId: 529 },
//   { number: 55, label: 'Ar-Rahman', arabic: 'الرحمن', imageId: 532 },
//   { number: 56, label: 'Al-Waqi\'ah', arabic: 'الواقعة', imageId: 535 },
//   { number: 57, label: 'Al-Hadid', arabic: 'الحديد', imageId: 538 },
//   { number: 58, label: 'Al-Mujadila', arabic: 'المجادلة', imageId: 543 },
//   { number: 59, label: 'Al-Hashr', arabic: 'الحشر', imageId: 546 },
//   { number: 60, label: 'Al-Mumtahina', arabic: 'الممتحنة', imageId: 550 },
//   { number: 61, label: 'As-Saff', arabic: 'الصف', imageId: 552 },
//   { number: 62, label: 'Al-Jumu\'ah', arabic: 'الجمعة', imageId: 554 },
//   { number: 63, label: 'Al-Munafiqun', arabic: 'المنافقون', imageId: 555 },
//   { number: 64, label: 'At-Taghabun', arabic: 'التغابن', imageId: 557 },
//   { number: 65, label: 'At-Talaq', arabic: 'الطلاق', imageId: 559 },
//   { number: 66, label: 'At-Tahrim', arabic: 'التحريم', imageId: 561 },
//   { number: 67, label: 'Al-Mulk', arabic: 'الملك', imageId: 563 },
//   { number: 68, label: 'Al-Qalam', arabic: 'القلم', imageId: 565 },
//   { number: 69, label: 'Al-Haqqah', arabic: 'الحاقة', imageId: 568 },
//   { number: 70, label: 'Al-Ma\'arij', arabic: 'المعارج', imageId: 570 },
//   { number: 71, label: 'Nuh', arabic: 'نوح', imageId: 572 },
//   { number: 72, label: 'Al-Jinn', arabic: 'الجن', imageId: 574 },
//   { number: 73, label: 'Al-Muzzammil', arabic: 'المزمل', imageId: 577 },
//   { number: 74, label: 'Al-Muddathir', arabic: 'المدثر', imageId: 579 },
//   { number: 75, label: 'Al-Qiyamah', arabic: 'القيامة', imageId: 581 },
//   { number: 76, label: 'Al-Insan', arabic: 'الإنسان', imageId: 583 },
//   { number: 77, label: 'Al-Mursalat', arabic: 'المرسلات', imageId: 585 },
//   { number: 78, label: 'An-Naba', arabic: 'النبأ', imageId: 587 },
//   { number: 79, label: 'An-Nazi\'at', arabic: 'النازعات', imageId: 588 },
//   { number: 80, label: 'Abasa', arabic: 'عبس', imageId: 590 },
//   { number: 81, label: 'At-Takwir', arabic: 'التكوير', imageId: 591 },
//   { number: 82, label: 'Al-Infitar', arabic: 'الانفطار', imageId: 592 },
//   { number: 83, label: 'Al-Mutaffifin', arabic: 'المطففين', imageId: 593 },
//   { number: 84, label: 'Al-Inshiqaq', arabic: 'الانشقاق', imageId: 595 },
//   { number: 85, label: 'Al-Buruj', arabic: 'البروج', imageId: 596 },
//   { number: 86, label: 'At-Tariq', arabic: 'الطارق', imageId: 597 },
//   { number: 87, label: 'Al-A\'la', arabic: 'الأعلى', imageId: 598 },
//   { number: 88, label: 'Al-Ghashiyah', arabic: 'الغاشية', imageId: 598 },
//   { number: 89, label: 'Al-Fajr', arabic: 'الفجر', imageId: 599 },
//   { number: 90, label: 'Al-Balad', arabic: 'البلد', imageId: 601 },
//   { number: 91, label: 'Ash-Shams', arabic: 'الشمس', imageId: 601 },
//   { number: 92, label: 'Al-Lail', arabic: 'الليل', imageId: 602 },
//   { number: 93, label: 'Ad-Duha', arabic: 'الضحى', imageId: 603 },
//   { number: 94, label: 'Ash-Sharh', arabic: 'الشرح', imageId: 603 },
//   { number: 95, label: 'At-Tin', arabic: 'التين', imageId: 604 },
//   { number: 96, label: 'Al-\'Alaq', arabic: 'العلق', imageId: 604 },
//   { number: 97, label: 'Al-Qadr', arabic: 'القدر', imageId: 605 },
//   { number: 98, label: 'Al-Bayinah', arabic: 'البينة', imageId: 605 },
//   { number: 99, label: 'Az-Zalzalah', arabic: 'الزلزلة', imageId: 606 },
//   { number: 100, label: 'Al-Adiyat', arabic: 'العاديات', imageId: 606 },
//   { number: 101, label: 'Al-Qari\'ah', arabic: 'القارعة', imageId: 607 },
//   { number: 102, label: 'At-Takathur', arabic: 'التكاثر', imageId: 607 },
//   { number: 103, label: 'Al-Asr', arabic: 'العصر', imageId: 608 },
//   { number: 104, label: 'Al-Humazah', arabic: 'الهمزة', imageId: 608 },
//   { number: 105, label: 'Al-Fil', arabic: 'الفيل', imageId: 608 },
//   { number: 106, label: 'Quraish', arabic: 'قريش', imageId: 609 },
//   { number: 107, label: 'Al-Ma\'un', arabic: 'الماعون', imageId: 609 },
//   { number: 108, label: 'Al-Kawthar', arabic: 'الكوثر', imageId: 609 },
//   { number: 109, label: 'Al-Kafiroon', arabic: 'الكافرون', imageId: 609 },
//   { number: 110, label: 'An-Nasr', arabic: 'النصر', imageId: 610 },
//   { number: 111, label: 'Al-Masad', arabic: 'المسد', imageId: 610 },
//   { number: 112, label: 'Al-Ikhlas', arabic: 'الإخلاص', imageId: 610 },
//   { number: 113, label: 'Al-Falaq', arabic: 'الفلق', imageId: 611 },
//   { number: 114, label: 'An-Nas', arabic: 'الناس', imageId: 611 }
// ];

// const SurahIndex = ({ navigation }) => {

//   const handlePress = (surah) => {
//     if (surah.imageId) {
//       navigation.navigate('QuranViewer', { imageId: surah.imageId });
//     } else {
//       Alert.alert(`Surah ${surah.number}`, `${surah.label} (${surah.arabic})`);
//     }
//   };


//   return (
//     <View style={styles.screen}>
//       <View style={styles.screenHeader}>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Text style={styles.headerBack}>‹ Back</Text>
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Surah Index</Text>

//         <Text style={styles.headerCount}>
//           {surahList.length} of 114 Surahs
//         </Text>
//       </View>

//       {/* <View style={styles.searchWrap}>
//         <View style={styles.searchWrapInner}>
//           <Text style={styles.searchIcon}>🔍</Text>

//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search surah name or number…"
//             placeholderTextColor="#8A8A9A"
//           />
//         </View>
//       </View> */}

//       <ScrollView contentContainerStyle={styles.listContainer}>
//         {surahList.map((surah) => (
//           <TouchableOpacity
//             key={surah.number}
//             style={styles.indexCard}
//             onPress={() => handlePress(surah)}
//           >
//             <View style={styles.cardNum}>
//               <Text style={styles.cardNumText}>{surah.number}</Text>
//             </View>

//             <View style={styles.cardBody}>
//               <Text style={styles.cardEn}>{surah.label}</Text>

//               <Text style={styles.cardMeta}>
//                 {surah.verses} verses
//               </Text>
//             </View>

//             <Text style={styles.cardAr}>{surah.arabic}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default SurahIndex;





// old screen without UI
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

// const surahList = [
//   { number: 1, label: 'Al-Fatiha', arabic: 'الفاتحة', imageId: 2 },
//   { number: 2, label: 'Al-Baqarah', arabic: 'البقرة', imageId: 3 },
//   { number: 3, label: 'Aali Imran', arabic: 'آل عمران', imageId: 51 },
//   { number: 4, label: 'An-Nisa', arabic: 'النساء', imageId: 78 },
//   { number: 5, label: 'Al-Ma\'idah', arabic: 'المائدة', imageId: 107 },
//   { number: 6, label: 'Al-An\'am', arabic: 'الأنعام', imageId: 129 },
//   { number: 7, label: 'Al-A\'raf', arabic: 'الأعراف', imageId: 152 },
//   { number: 8, label: 'Al-Anfal', arabic: 'الأنفال', imageId: 178 },
//   { number: 9, label: 'At-Tawbah', arabic: 'التوبة', imageId: 188 },
//   { number: 10, label: 'Yunus', arabic: 'يونس', imageId: 209 },
//   { number: 11, label: 'Hud', arabic: 'هود', imageId: 222 },
//   { number: 12, label: 'Yusuf', arabic: 'يوسف', imageId: 236 },
//   { number: 13, label: 'Ar-Ra\'d', arabic: 'الرعد', imageId: 250 },
//   { number: 14, label: 'Ibrahim', arabic: 'إبراهيم', imageId: 256 },
//   { number: 15, label: 'Al-Hijr', arabic: 'الحجر', imageId: 263 },
//   { number: 16, label: 'An-Nahl', arabic: 'النحل', imageId: 268 },
//   { number: 17, label: 'Al-Isra', arabic: 'الإسراء', imageId: 283 },
//   { number: 18, label: 'Al-Kahf', arabic: 'الكهف', imageId: 294 },
//   { number: 19, label: 'Maryam', arabic: 'مريم', imageId: 306 },
//   { number: 20, label: 'Taha', arabic: 'طه', imageId: 313 },
//   { number: 21, label: 'Al-Anbiya', arabic: 'الأنبياء', imageId: 323 },
//   { number: 22, label: 'Al-Hajj', arabic: 'الحج', imageId: 332 },
//   { number: 23, label: 'Al-Mu\'minun', arabic: 'المؤمنون', imageId: 343 },
//   { number: 24, label: 'An-Nur', arabic: 'النور', imageId: 351 },
//   { number: 25, label: 'Al-Furqan', arabic: 'الفرقان', imageId: 360 },
//   { number: 26, label: 'Ash-Shu\'ara', arabic: 'الشعراء', imageId: 367 },
//   { number: 27, label: 'An-Naml', arabic: 'النمل', imageId: 377 },
//   { number: 28, label: 'Al-Qasas', arabic: 'القصص', imageId: 386 },
//   { number: 29, label: 'Al-Ankabut', arabic: 'العنكبوت', imageId: 397 },
//   { number: 30, label: 'Ar-Rum', arabic: 'الروم', imageId: 405 },
//   { number: 31, label: 'Luqman', arabic: 'لقمان', imageId: 412 },
//   { number: 32, label: 'As-Sajda', arabic: 'السجدة', imageId: 416 },
//   { number: 33, label: 'Al-Ahzab', arabic: 'الأحزاب', imageId: 419 },
//   { number: 34, label: 'Saba', arabic: 'سبإ', imageId: 429 },
//   { number: 35, label: 'Fatir', arabic: 'فاطر', imageId: 435 },
//   { number: 36, label: 'Ya-Sin', arabic: 'يٰس٘', imageId: 440 },
//   { number: 37, label: 'As-Saffat', arabic: 'الصافات', imageId: 446 },
//   { number: 38, label: 'Sad', arabic: 'ص٘', imageId: 452 },
//   { number: 39, label: 'Az-Zumar', arabic: 'الزمر', imageId: 459 },
//   { number: 40, label: 'Ghafir', arabic: 'غافر', imageId: 468 },
//   { number: 41, label: 'Fussilat', arabic: 'فصلت', imageId: 478 },
//   { number: 42, label: 'Ash-Shura', arabic: 'الشورى', imageId: 484 },
//   { number: 43, label: 'Az-Zukhruf', arabic: 'الزخرف', imageId: 490 },
//   { number: 44, label: 'Ad-Dukhan', arabic: 'الدخان', imageId: 496 },
//   { number: 45, label: 'Al-Jathiyah', arabic: 'الجاثية', imageId: 499 },
//   { number: 46, label: 'Al-Ahqaf', arabic: 'الأحقاف', imageId: 503 },
//   { number: 47, label: 'Muhammad', arabic: 'محمد', imageId: 507 },
//   { number: 48, label: 'Al-Fath', arabic: 'الفتح', imageId: 512 },
//   { number: 49, label: 'Al-Hujurat', arabic: 'الحجرات', imageId: 516 },
//   { number: 50, label: 'Qaf', arabic: 'ق', imageId: 519 },
//   { number: 51, label: 'Adh-Dhariyat', arabic: 'الذاريات', imageId: 521 },
//   { number: 52, label: 'At-Tur', arabic: 'الطور', imageId: 524 },
//   { number: 53, label: 'An-Najm', arabic: 'النجم', imageId: 527 },
//   { number: 54, label: 'Al-Qamar', arabic: 'القمر', imageId: 529 },
//   { number: 55, label: 'Ar-Rahman', arabic: 'الرحمن', imageId: 532 },
//   { number: 56, label: 'Al-Waqi\'ah', arabic: 'الواقعة', imageId: 535 },
//   { number: 57, label: 'Al-Hadid', arabic: 'الحديد', imageId: 538 },
//   { number: 58, label: 'Al-Mujadila', arabic: 'المجادلة', imageId: 543 },
//   { number: 59, label: 'Al-Hashr', arabic: 'الحشر', imageId: 546 },
//   { number: 60, label: 'Al-Mumtahina', arabic: 'الممتحنة', imageId: 550 },
//   { number: 61, label: 'As-Saff', arabic: 'الصف', imageId: 552 },
//   { number: 62, label: 'Al-Jumu\'ah', arabic: 'الجمعة', imageId: 554 },
//   { number: 63, label: 'Al-Munafiqun', arabic: 'المنافقون', imageId: 555 },
//   { number: 64, label: 'At-Taghabun', arabic: 'التغابن', imageId: 557 },
//   { number: 65, label: 'At-Talaq', arabic: 'الطلاق', imageId: 559 },
//   { number: 66, label: 'At-Tahrim', arabic: 'التحريم', imageId: 561 },
//   { number: 67, label: 'Al-Mulk', arabic: 'الملك', imageId: 563 },
//   { number: 68, label: 'Al-Qalam', arabic: 'القلم', imageId: 565 },
//   { number: 69, label: 'Al-Haqqah', arabic: 'الحاقة', imageId: 568 },
//   { number: 70, label: 'Al-Ma\'arij', arabic: 'المعارج', imageId: 570 },
//   { number: 71, label: 'Nuh', arabic: 'نوح', imageId: 572 },
//   { number: 72, label: 'Al-Jinn', arabic: 'الجن', imageId: 574 },
//   { number: 73, label: 'Al-Muzzammil', arabic: 'المزمل', imageId: 577 },
//   { number: 74, label: 'Al-Muddathir', arabic: 'المدثر', imageId: 579 },
//   { number: 75, label: 'Al-Qiyamah', arabic: 'القيامة', imageId: 581 },
//   { number: 76, label: 'Al-Insan', arabic: 'الإنسان', imageId: 583 },
//   { number: 77, label: 'Al-Mursalat', arabic: 'المرسلات', imageId: 585 },
//   { number: 78, label: 'An-Naba', arabic: 'النبأ', imageId: 587 },
//   { number: 79, label: 'An-Nazi\'at', arabic: 'النازعات', imageId: 588 },
//   { number: 80, label: 'Abasa', arabic: 'عبس', imageId: 590 },
//   { number: 81, label: 'At-Takwir', arabic: 'التكوير', imageId: 591 },
//   { number: 82, label: 'Al-Infitar', arabic: 'الانفطار', imageId: 592 },
//   { number: 83, label: 'Al-Mutaffifin', arabic: 'المطففين', imageId: 593 },
//   { number: 84, label: 'Al-Inshiqaq', arabic: 'الانشقاق', imageId: 595 },
//   { number: 85, label: 'Al-Buruj', arabic: 'البروج', imageId: 596 },
//   { number: 86, label: 'At-Tariq', arabic: 'الطارق', imageId: 597 },
//   { number: 87, label: 'Al-A\'la', arabic: 'الأعلى', imageId: 598 },
//   { number: 88, label: 'Al-Ghashiyah', arabic: 'الغاشية', imageId: 598 },
//   { number: 89, label: 'Al-Fajr', arabic: 'الفجر', imageId: 599 },
//   { number: 90, label: 'Al-Balad', arabic: 'البلد', imageId: 601 },
//   { number: 91, label: 'Ash-Shams', arabic: 'الشمس', imageId: 601 },
//   { number: 92, label: 'Al-Lail', arabic: 'الليل', imageId: 602 },
//   { number: 93, label: 'Ad-Duha', arabic: 'الضحى', imageId: 603 },
//   { number: 94, label: 'Ash-Sharh', arabic: 'الشرح', imageId: 603 },
//   { number: 95, label: 'At-Tin', arabic: 'التين', imageId: 604 },
//   { number: 96, label: 'Al-\'Alaq', arabic: 'العلق', imageId: 604 },
//   { number: 97, label: 'Al-Qadr', arabic: 'القدر', imageId: 605 },
//   { number: 98, label: 'Al-Bayinah', arabic: 'البينة', imageId: 605 },
//   { number: 99, label: 'Az-Zalzalah', arabic: 'الزلزلة', imageId: 606 },
//   { number: 100, label: 'Al-Adiyat', arabic: 'العاديات', imageId: 606 },
//   { number: 101, label: 'Al-Qari\'ah', arabic: 'القارعة', imageId: 607 },
//   { number: 102, label: 'At-Takathur', arabic: 'التكاثر', imageId: 607 },
//   { number: 103, label: 'Al-Asr', arabic: 'العصر', imageId: 608 },
//   { number: 104, label: 'Al-Humazah', arabic: 'الهمزة', imageId: 608 },
//   { number: 105, label: 'Al-Fil', arabic: 'الفيل', imageId: 608 },
//   { number: 106, label: 'Quraish', arabic: 'قريش', imageId: 609 },
//   { number: 107, label: 'Al-Ma\'un', arabic: 'الماعون', imageId: 609 },
//   { number: 108, label: 'Al-Kawthar', arabic: 'الكوثر', imageId: 609 },
//   { number: 109, label: 'Al-Kafiroon', arabic: 'الكافرون', imageId: 609 },
//   { number: 110, label: 'An-Nasr', arabic: 'النصر', imageId: 610 },
//   { number: 111, label: 'Al-Masad', arabic: 'المسد', imageId: 610 },
//   { number: 112, label: 'Al-Ikhlas', arabic: 'الإخلاص', imageId: 610 },
//   { number: 113, label: 'Al-Falaq', arabic: 'الفلق', imageId: 611 },
//   { number: 114, label: 'An-Nas', arabic: 'الناس', imageId: 611 }
// ];


// const SurahIndex = ({ navigation }) => {
//   const handlePress = (surah) => {
//     if (surah.imageId) {
//       navigation.navigate('QuranViewer', { imageId: surah.imageId });
//     } else {
//       Alert.alert(`Surah ${surah.number}`, `${surah.label} (${surah.arabic})`);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {surahList.map((surah) => (
//         <TouchableOpacity
//           key={surah.number}
//           style={styles.item}
//           onPress={() => handlePress(surah)}
//         >
//           <Text style={styles.surahNumber}>Surah {surah.number}</Text>
//           <Text style={styles.label}>{surah.label}</Text>
//           <Text style={styles.arabic}>{surah.arabic}</Text>
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
//   surahNumber: {
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

// export default SurahIndex;
