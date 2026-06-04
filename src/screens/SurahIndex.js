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
  { n: 1,   en: "Al-Fatiha",       ar: "الفاتحة",       verses: 7,   imageId: 2   },
  { n: 2,   en: "Al-Baqarah",      ar: "البقرة",        verses: 286, imageId: 3   },
  { n: 3,   en: "Aali Imran",      ar: "آل عمران",      verses: 200, imageId: 51  },
  { n: 4,   en: "An-Nisa",         ar: "النساء",        verses: 176, imageId: 78  },
  { n: 5,   en: "Al-Ma'idah",      ar: "المائدة",       verses: 120, imageId: 107 },
  { n: 6,   en: "Al-An'am",        ar: "الأنعام",       verses: 165, imageId: 129 },
  { n: 7,   en: "Al-A'raf",        ar: "الأعراف",       verses: 206, imageId: 152 },
  { n: 8,   en: "Al-Anfal",        ar: "الأنفال",       verses: 75,  imageId: 178 },
  { n: 9,   en: "At-Tawbah",       ar: "التوبة",        verses: 129, imageId: 188 },
  { n: 10,  en: "Yunus",           ar: "يونس",           verses: 109, imageId: 209 },
  { n: 11,  en: "Hud",             ar: "هود",            verses: 123, imageId: 222 },
  { n: 12,  en: "Yusuf",           ar: "يوسف",           verses: 111, imageId: 236 },
  { n: 13,  en: "Ar-Ra'd",         ar: "الرعد",          verses: 43,  imageId: 250 },
  { n: 14,  en: "Ibrahim",         ar: "إبراهيم",        verses: 52,  imageId: 256 },
  { n: 15,  en: "Al-Hijr",         ar: "الحجر",          verses: 99,  imageId: 263 },
  { n: 16,  en: "An-Nahl",         ar: "النحل",          verses: 128, imageId: 268 },
  { n: 17,  en: "Al-Isra",         ar: "الإسراء",        verses: 111, imageId: 283 },
  { n: 18,  en: "Al-Kahf",         ar: "الكهف",          verses: 110, imageId: 294 },
  { n: 19,  en: "Maryam",          ar: "مريم",           verses: 98,  imageId: 306 },
  { n: 20,  en: "Ta-Ha",           ar: "طه",             verses: 135, imageId: 313 },
  { n: 21,  en: "Al-Anbiya",       ar: "الأنبياء",       verses: 112, imageId: 323 },
  { n: 22,  en: "Al-Hajj",         ar: "الحج",           verses: 78,  imageId: 332 },
  { n: 23,  en: "Al-Mu'minun",     ar: "المؤمنون",       verses: 118, imageId: 343 },
  { n: 24,  en: "An-Nur",          ar: "النور",          verses: 64,  imageId: 351 },
  { n: 25,  en: "Al-Furqan",       ar: "الفرقان",        verses: 77,  imageId: 360 },
  { n: 26,  en: "Ash-Shu'ara",     ar: "الشعراء",        verses: 227, imageId: 367 },
  { n: 27,  en: "An-Naml",         ar: "النمل",          verses: 93,  imageId: 377 },
  { n: 28,  en: "Al-Qasas",        ar: "القصص",          verses: 88,  imageId: 386 },
  { n: 29,  en: "Al-Ankabut",      ar: "العنكبوت",       verses: 69,  imageId: 397 },
  { n: 30,  en: "Ar-Rum",          ar: "الروم",          verses: 60,  imageId: 405 },
  { n: 31,  en: "Luqman",          ar: "لقمان",          verses: 34,  imageId: 412 },
  { n: 32,  en: "As-Sajdah",       ar: "السجدة",         verses: 30,  imageId: 416 },
  { n: 33,  en: "Al-Ahzab",        ar: "الأحزاب",        verses: 73,  imageId: 419 },
  { n: 34,  en: "Saba",            ar: "سبأ",            verses: 54,  imageId: 429 },
  { n: 35,  en: "Fatir",           ar: "فاطر",           verses: 45,  imageId: 435 },
  { n: 36,  en: "Ya-Sin",          ar: "يس",             verses: 83,  imageId: 440 },
  { n: 37,  en: "As-Saffat",       ar: "الصافات",        verses: 182, imageId: 446 },
  { n: 38,  en: "Sad",             ar: "ص",              verses: 88,  imageId: 452 },
  { n: 39,  en: "Az-Zumar",        ar: "الزمر",          verses: 75,  imageId: 459 },
  { n: 40,  en: "Ghafir",          ar: "غافر",           verses: 85,  imageId: 468 },
  { n: 41,  en: "Fussilat",        ar: "فصلت",           verses: 54,  imageId: 478 },
  { n: 42,  en: "Ash-Shura",       ar: "الشورى",         verses: 53,  imageId: 484 },
  { n: 43,  en: "Az-Zukhruf",      ar: "الزخرف",         verses: 89,  imageId: 490 },
  { n: 44,  en: "Ad-Dukhan",       ar: "الدخان",         verses: 59,  imageId: 496 },
  { n: 45,  en: "Al-Jathiyah",     ar: "الجاثية",        verses: 37,  imageId: 499 },
  { n: 46,  en: "Al-Ahqaf",        ar: "الأحقاف",        verses: 35,  imageId: 503 },
  { n: 47,  en: "Muhammad",        ar: "محمد",           verses: 38,  imageId: 507 },
  { n: 48,  en: "Al-Fath",         ar: "الفتح",          verses: 29,  imageId: 512 },
  { n: 49,  en: "Al-Hujurat",      ar: "الحجرات",        verses: 18,  imageId: 516 },
  { n: 50,  en: "Qaf",             ar: "ق",              verses: 45,  imageId: 519 },
  { n: 51,  en: "Adh-Dhariyat",    ar: "الذاريات",       verses: 60,  imageId: 521 },
  { n: 52,  en: "At-Tur",          ar: "الطور",          verses: 49,  imageId: 524 },
  { n: 53,  en: "An-Najm",         ar: "النجم",          verses: 62,  imageId: 527 },
  { n: 54,  en: "Al-Qamar",        ar: "القمر",          verses: 55,  imageId: 529 },
  { n: 55,  en: "Ar-Rahman",       ar: "الرحمن",         verses: 78,  imageId: 532 },
  { n: 56,  en: "Al-Waqi'ah",      ar: "الواقعة",        verses: 96,  imageId: 535 },
  { n: 57,  en: "Al-Hadid",        ar: "الحديد",         verses: 29,  imageId: 538 },
  { n: 58,  en: "Al-Mujadila",     ar: "المجادلة",       verses: 22,  imageId: 543 },
  { n: 59,  en: "Al-Hashr",        ar: "الحشر",          verses: 24,  imageId: 546 },
  { n: 60,  en: "Al-Mumtahanah",   ar: "الممتحنة",       verses: 13,  imageId: 550 },
  { n: 61,  en: "As-Saf",          ar: "الصف",           verses: 14,  imageId: 552 },
  { n: 62,  en: "Al-Jumu'ah",      ar: "الجمعة",         verses: 11,  imageId: 554 },
  { n: 63,  en: "Al-Munafiqun",    ar: "المنافقون",      verses: 11,  imageId: 555 },
  { n: 64,  en: "At-Taghabun",     ar: "التغابن",        verses: 18,  imageId: 557 },
  { n: 65,  en: "At-Talaq",        ar: "الطلاق",         verses: 12,  imageId: 559 },
  { n: 66,  en: "At-Tahrim",       ar: "التحريم",        verses: 12,  imageId: 561 },
  { n: 67,  en: "Al-Mulk",         ar: "الملك",          verses: 30,  imageId: 563 },
  { n: 68,  en: "Al-Qalam",        ar: "القلم",          verses: 52,  imageId: 565 },
  { n: 69,  en: "Al-Haqqah",       ar: "الحاقة",         verses: 52,  imageId: 568 },
  { n: 70,  en: "Al-Ma'arij",      ar: "المعارج",        verses: 44,  imageId: 570 },
  { n: 71,  en: "Nuh",             ar: "نوح",            verses: 28,  imageId: 572 },
  { n: 72,  en: "Al-Jinn",         ar: "الجن",           verses: 28,  imageId: 574 },
  { n: 73,  en: "Al-Muzzammil",    ar: "المزمل",         verses: 20,  imageId: 577 },
  { n: 74,  en: "Al-Muddaththir",  ar: "المدثر",         verses: 56,  imageId: 579 },
  { n: 75,  en: "Al-Qiyamah",      ar: "القيامة",        verses: 40,  imageId: 581 },
  { n: 76,  en: "Al-Insan",        ar: "الإنسان",        verses: 31,  imageId: 583 },
  { n: 77,  en: "Al-Mursalat",     ar: "المرسلات",       verses: 50,  imageId: 585 },
  { n: 78,  en: "An-Naba",         ar: "النبأ",          verses: 40,  imageId: 587 },
  { n: 79,  en: "An-Nazi'at",      ar: "النازعات",       verses: 46,  imageId: 588 },
  { n: 80,  en: "Abasa",           ar: "عبس",            verses: 42,  imageId: 590 },
  { n: 81,  en: "At-Takwir",       ar: "التكوير",        verses: 29,  imageId: 591 },
  { n: 82,  en: "Al-Infitar",      ar: "الانفطار",       verses: 19,  imageId: 592 },
  { n: 83,  en: "Al-Mutaffifin",   ar: "المطففين",       verses: 36,  imageId: 593 },
  { n: 84,  en: "Al-Inshiqaq",     ar: "الانشقاق",       verses: 25,  imageId: 595 },
  { n: 85,  en: "Al-Buruj",        ar: "البروج",         verses: 22,  imageId: 596 },
  { n: 86,  en: "At-Tariq",        ar: "الطارق",         verses: 17,  imageId: 597 },
  { n: 87,  en: "Al-A'la",         ar: "الأعلى",         verses: 19,  imageId: 598 },
  { n: 88,  en: "Al-Ghashiyah",    ar: "الغاشية",        verses: 26,  imageId: 598 },
  { n: 89,  en: "Al-Fajr",         ar: "الفجر",          verses: 30,  imageId: 599 },
  { n: 90,  en: "Al-Balad",        ar: "البلد",          verses: 20,  imageId: 601 },
  { n: 91,  en: "Ash-Shams",       ar: "الشمس",          verses: 15,  imageId: 601 },
  { n: 92,  en: "Al-Layl",         ar: "الليل",          verses: 21,  imageId: 602 },
  { n: 93,  en: "Ad-Duha",         ar: "الضحى",          verses: 11,  imageId: 603 },
  { n: 94,  en: "Ash-Sharh",       ar: "الشرح",          verses: 8,   imageId: 603 },
  { n: 95,  en: "At-Tin",          ar: "التين",          verses: 8,   imageId: 604 },
  { n: 96,  en: "Al-Alaq",         ar: "العلق",          verses: 19,  imageId: 604 },
  { n: 97,  en: "Al-Qadr",         ar: "القدر",          verses: 5,   imageId: 605 },
  { n: 98,  en: "Al-Bayyinah",     ar: "البينة",         verses: 8,   imageId: 605 },
  { n: 99,  en: "Az-Zalzalah",     ar: "الزلزلة",        verses: 8,   imageId: 606 },
  { n: 100, en: "Al-Adiyat",       ar: "العاديات",       verses: 11,  imageId: 606 },
  { n: 101, en: "Al-Qari'ah",      ar: "القارعة",        verses: 11,  imageId: 607 },
  { n: 102, en: "At-Takathur",     ar: "التكاثر",        verses: 8,   imageId: 607 },
  { n: 103, en: "Al-Asr",          ar: "العصر",          verses: 3,   imageId: 608 },
  { n: 104, en: "Al-Humazah",      ar: "الهمزة",         verses: 9,   imageId: 608 },
  { n: 105, en: "Al-Fil",          ar: "الفيل",          verses: 5,   imageId: 608 },
  { n: 106, en: "Quraysh",         ar: "قريش",           verses: 4,   imageId: 609 },
  { n: 107, en: "Al-Ma'un",        ar: "الماعون",        verses: 7,   imageId: 609 },
  { n: 108, en: "Al-Kawthar",      ar: "الكوثر",         verses: 3,   imageId: 609 },
  { n: 109, en: "Al-Kafirun",      ar: "الكافرون",       verses: 6,   imageId: 609 },
  { n: 110, en: "An-Nasr",         ar: "النصر",          verses: 3,   imageId: 610 },
  { n: 111, en: "Al-Masad",        ar: "المسد",          verses: 5,   imageId: 610 },
  { n: 112, en: "Al-Ikhlas",       ar: "الإخلاص",        verses: 4,   imageId: 610 },
  { n: 113, en: "Al-Falaq",        ar: "الفلق",          verses: 5,   imageId: 611 },
  { n: 114, en: "An-Nas",          ar: "الناس",          verses: 6,   imageId: 611 },
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
          colors={["#FFFFFF", "#EAFBF0", "#B8F3CD"]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {/* Left accent */}
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
  // const handlePress = (surah) => {
  //   if (surah.imageId) {
  //     navigation.navigate('QuranViewer', { imageId: surah.imageId });
  //   } else {
  //     Alert.alert(`Surah ${surah.number}`, `${surah.label} (${surah.arabic})`);
  //   }
  // };

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
      <View style={[styles.glow, { top: -60, right: -60, backgroundColor: "rgba(78, 230, 91, 0.27)" }]} />
      <View style={[styles.glow, { bottom: 100, left: -60, backgroundColor: "rgba(212, 210, 206, 0.47)" }]} />

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
        onPress={() => handlePress(surah)}
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

