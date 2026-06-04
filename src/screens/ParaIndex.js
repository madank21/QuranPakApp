import { useState, useRef, useCallback } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, Animated, StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ── DATA ──────────────────────────────────────────────────────────────────────

const paraList = [
  { n: 1,  en: "Alif Lam Meem",         ar: "الم",                  startSurah: "Al-Baqarah", imageId: 2   },
  { n: 2,  en: "Sayaqool",              ar: "سَيَقُولُ",              startSurah: "Al-Baqarah", imageId: 23  },
  { n: 3,  en: "Tilkal Rusul",          ar: "تِلْكَ الرُّسُلُ",       startSurah: "Al-Baqarah", imageId: 43  },
  { n: 4,  en: "Lantanalu",             ar: "لَن تَنَالُوا",          startSurah: "Aali Imran",  imageId: 63  },
  { n: 5,  en: "Wal Mohsanat",          ar: "وَالمُحصَنَاتُ",         startSurah: "An-Nisa",     imageId: 83  },
  { n: 6,  en: "La Yuhibbullah",        ar: "لا يُحِبُّ اللهُ",       startSurah: "An-Nisa",     imageId: 103 },
  { n: 7,  en: "Wa Iza Sami'u",         ar: "وَإِذَا سَمِعُوا",       startSurah: "Al-Ma'idah",  imageId: 123 },
  { n: 8,  en: "Wa Lau Annana",         ar: "وَلَوْ أَنَّنَا",         startSurah: "Al-An'am",    imageId: 143 },
  { n: 9,  en: "Qalal Mala'u",          ar: "قَالَ الْمَلَأُ",        startSurah: "Al-A'raf",    imageId: 163 },
  { n: 10, en: "Wa A'lamu",             ar: "وَاعْلَمُوا",            startSurah: "Al-Anfal",    imageId: 183 },
  { n: 11, en: "Ya'taziruna",           ar: "يَعْتَذِرُونَ",          startSurah: "At-Tawbah",   imageId: 203 },
  { n: 12, en: "Wa Ma Min Dabbah",      ar: "وَمَا مِن دَابَّةٍ",     startSurah: "Hud",         imageId: 223 },
  { n: 13, en: "Wa Ma Ubari'u",         ar: "وَمَا أُبَرِّئُ",        startSurah: "Yusuf",       imageId: 243 },
  { n: 14, en: "Rubama",                ar: "رُّبَمَا",               startSurah: "Al-Hijr",     imageId: 263 },
  { n: 15, en: "Subhanallazi",          ar: "سُبْحَانَ الَّذِي",      startSurah: "Al-Isra",     imageId: 283 },
  { n: 16, en: "Qal Alam",              ar: "قَالَ أَلَمْ",           startSurah: "Al-Kahf",     imageId: 303 },
  { n: 17, en: "Iqtaraba",              ar: "اقْتَرَبَ",              startSurah: "Al-Anbiya",   imageId: 323 },
  { n: 18, en: "Qadd Aflaha",           ar: "قَدْ أَفْلَحَ",          startSurah: "Al-Mu'minun", imageId: 343 },
  { n: 19, en: "Wa Qalallazina",        ar: "وَقَالَ الَّذِينَ",      startSurah: "Al-Furqan",   imageId: 363 },
  { n: 20, en: "A'man Khalaqa",         ar: "أَمَّنْ خَلَقَ",         startSurah: "An-Naml",     imageId: 383 },
  { n: 21, en: "Utlu Ma Oohi'a",        ar: "اتْلُ مَا أُوحِيَ",     startSurah: "Al-Ankabut",  imageId: 403 },
  { n: 22, en: "Wa Man Yaqnut",         ar: "وَمَن يَقْنُتْ",         startSurah: "Al-Ahzab",    imageId: 423 },
  { n: 23, en: "Wa Mali",               ar: "وَمَالِيَ",              startSurah: "Ya-Sin",      imageId: 443 },
  { n: 24, en: "Faman Azlamu",          ar: "فَمَنْ أَظْلَمُ",        startSurah: "Az-Zumar",    imageId: 463 },
  { n: 25, en: "Ilahe Yuruddu",         ar: "إِلَيْهِ يُرَدُّ",       startSurah: "Fussilat",    imageId: 483 },
  { n: 26, en: "Ha'a Meem",             ar: "حم",                    startSurah: "Al-Ahqaf",    imageId: 503 },
  { n: 27, en: "Qala Fama Khatbukum",   ar: "قَالَ فَمَا خَطْبُكُمْ", startSurah: "Adh-Dhariyat", imageId: 523 },
  { n: 28, en: "Qadd Sami'allah",       ar: "قَدْ سَمِعَ اللَّهُ",   startSurah: "Al-Mujadila", imageId: 543 },
  { n: 29, en: "Tabarakallazi",         ar: "تَبَارَكَ الَّذِي",      startSurah: "Al-Mulk",     imageId: 563 },
  { n: 30, en: "Amma Yatasa'aloon",     ar: "عَمَّ يَتَسَاءَلُونَ",   startSurah: "An-Naba",     imageId: 587 },
];


// ── COLORS ─────────────────────────────────────────────────────────────────────
const GOLD  = "#62df62";
const GOLD2 = "#e4a21e";
const TEAL  = "#06b354";
const DEEP  = "#04080F";
const NAVY  = "#070D1A";

// ── PARA CARD ─────────────────────────────────────────────────────────────────
const ParaCard = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const press   = () => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  const release = () => Animated.spring(scaleAnim, { toValue: 1,    useNativeDriver: true }).start();

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
          colors={["#FFFFFF", "#EAFBF0", "#B8F3CD"]}
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
        colors={["#ffffff", "#15cc1e", "#B8F3CD"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      />
      {/* Teal glow top-right */}
      <View style={[styles.glow, { top: -80, right: -40, backgroundColor: "rgba(78, 230, 91, 0.27)" }]} />
      {/* Gold glow bottom-left */}
      <View style={[styles.glow, { bottom: 80, left: -60, backgroundColor: "rgba(212, 210, 206, 0.47)" }]} />

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
    textShadowColor: "rgba(3, 199, 166, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  headerCount: {
    fontSize: 11,
    color: "rgb(110, 108, 106)",
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

  // Quick pills
  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 18,
    gap: 6,
    marginBottom: 10,
  },
  pill: {
    backgroundColor: "rgba(204, 240, 213, 0.86)",
    borderWidth: 1,
    borderColor: "rgba(244, 248, 246, 0.49)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillText: {
    fontSize: 10,
    color: "#000000",
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
});

export default ParaIndex;
