import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const surahList = [
  { number: 1, label: 'Al-Fatiha', arabic: 'الفاتحة', imageId: 2 },
  { number: 2, label: 'Al-Baqarah', arabic: 'البقرة', imageId: 3 },
  { number: 3, label: 'Aali Imran', arabic: 'آل عمران', imageId: 51 },
  { number: 4, label: 'An-Nisa', arabic: 'النساء', imageId: 78 },
  { number: 5, label: 'Al-Ma\'idah', arabic: 'المائدة', imageId: 107 },
  { number: 6, label: 'Al-An\'am', arabic: 'الأنعام', imageId: 129 },
  { number: 7, label: 'Al-A\'raf', arabic: 'الأعراف', imageId: 152 },
  { number: 8, label: 'Al-Anfal', arabic: 'الأنفال', imageId: 178 },
  { number: 9, label: 'At-Tawbah', arabic: 'التوبة', imageId: 188 },
  { number: 10, label: 'Yunus', arabic: 'يونس', imageId: 209 },
  { number: 11, label: 'Hud', arabic: 'هود', imageId: 222 },
  { number: 12, label: 'Yusuf', arabic: 'يوسف', imageId: 236 },
  { number: 13, label: 'Ar-Ra\'d', arabic: 'الرعد', imageId: 250 },
  { number: 14, label: 'Ibrahim', arabic: 'إبراهيم', imageId: 256 },
  { number: 15, label: 'Al-Hijr', arabic: 'الحجر', imageId: 263 },
  { number: 16, label: 'An-Nahl', arabic: 'النحل', imageId: 268 },
  { number: 17, label: 'Al-Isra', arabic: 'الإسراء', imageId: 283 },
  { number: 18, label: 'Al-Kahf', arabic: 'الكهف', imageId: 294 },
  { number: 19, label: 'Maryam', arabic: 'مريم', imageId: 306 },
  { number: 20, label: 'Taha', arabic: 'طه', imageId: 313 },
  { number: 21, label: 'Al-Anbiya', arabic: 'الأنبياء', imageId: 323 },
  { number: 22, label: 'Al-Hajj', arabic: 'الحج', imageId: 332 },
  { number: 23, label: 'Al-Mu\'minun', arabic: 'المؤمنون', imageId: 343 },
  { number: 24, label: 'An-Nur', arabic: 'النور', imageId: 351 },
  { number: 25, label: 'Al-Furqan', arabic: 'الفرقان', imageId: 360 },
  { number: 26, label: 'Ash-Shu\'ara', arabic: 'الشعراء', imageId: 367 },
  { number: 27, label: 'An-Naml', arabic: 'النمل', imageId: 377 },
  { number: 28, label: 'Al-Qasas', arabic: 'القصص', imageId: 386 },
  { number: 29, label: 'Al-Ankabut', arabic: 'العنكبوت', imageId: 397 },
  { number: 30, label: 'Ar-Rum', arabic: 'الروم', imageId: 405 },
  { number: 31, label: 'Luqman', arabic: 'لقمان', imageId: 412 },
  { number: 32, label: 'As-Sajda', arabic: 'السجدة', imageId: 416 },
  { number: 33, label: 'Al-Ahzab', arabic: 'الأحزاب', imageId: 419 },
  { number: 34, label: 'Saba', arabic: 'سبإ', imageId: 429 },
  { number: 35, label: 'Fatir', arabic: 'فاطر', imageId: 435 },
  { number: 36, label: 'Ya-Sin', arabic: 'يٰس٘', imageId: 440 },
  { number: 37, label: 'As-Saffat', arabic: 'الصافات', imageId: 446 },
  { number: 38, label: 'Sad', arabic: 'ص٘', imageId: 452 },
  { number: 39, label: 'Az-Zumar', arabic: 'الزمر', imageId: 459 },
  { number: 40, label: 'Ghafir', arabic: 'غافر', imageId: 468 },
  { number: 41, label: 'Fussilat', arabic: 'فصلت', imageId: 478 },
  { number: 42, label: 'Ash-Shura', arabic: 'الشورى', imageId: 484 },
  { number: 43, label: 'Az-Zukhruf', arabic: 'الزخرف', imageId: 490 },
  { number: 44, label: 'Ad-Dukhan', arabic: 'الدخان', imageId: 496 },
  { number: 45, label: 'Al-Jathiyah', arabic: 'الجاثية', imageId: 499 },
  { number: 46, label: 'Al-Ahqaf', arabic: 'الأحقاف', imageId: 503 },
  { number: 47, label: 'Muhammad', arabic: 'محمد', imageId: 507 },
  { number: 48, label: 'Al-Fath', arabic: 'الفتح', imageId: 512 },
  { number: 49, label: 'Al-Hujurat', arabic: 'الحجرات', imageId: 516 },
  { number: 50, label: 'Qaf', arabic: 'ق', imageId: 519 },
  { number: 51, label: 'Adh-Dhariyat', arabic: 'الذاريات', imageId: 521 },
  { number: 52, label: 'At-Tur', arabic: 'الطور', imageId: 524 },
  { number: 53, label: 'An-Najm', arabic: 'النجم', imageId: 527 },
  { number: 54, label: 'Al-Qamar', arabic: 'القمر', imageId: 529 },
  { number: 55, label: 'Ar-Rahman', arabic: 'الرحمن', imageId: 532 },
  { number: 56, label: 'Al-Waqi\'ah', arabic: 'الواقعة', imageId: 535 },
  { number: 57, label: 'Al-Hadid', arabic: 'الحديد', imageId: 538 },
  { number: 58, label: 'Al-Mujadila', arabic: 'المجادلة', imageId: 543 },
  { number: 59, label: 'Al-Hashr', arabic: 'الحشر', imageId: 546 },
  { number: 60, label: 'Al-Mumtahina', arabic: 'الممتحنة', imageId: 550 },
  { number: 61, label: 'As-Saff', arabic: 'الصف', imageId: 552 },
  { number: 62, label: 'Al-Jumu\'ah', arabic: 'الجمعة', imageId: 554 },
  { number: 63, label: 'Al-Munafiqun', arabic: 'المنافقون', imageId: 555 },
  { number: 64, label: 'At-Taghabun', arabic: 'التغابن', imageId: 557 },
  { number: 65, label: 'At-Talaq', arabic: 'الطلاق', imageId: 559 },
  { number: 66, label: 'At-Tahrim', arabic: 'التحريم', imageId: 561 },
  { number: 67, label: 'Al-Mulk', arabic: 'الملك', imageId: 563 },
  { number: 68, label: 'Al-Qalam', arabic: 'القلم', imageId: 565 },
  { number: 69, label: 'Al-Haqqah', arabic: 'الحاقة', imageId: 568 },
  { number: 70, label: 'Al-Ma\'arij', arabic: 'المعارج', imageId: 570 },
  { number: 71, label: 'Nuh', arabic: 'نوح', imageId: 572 },
  { number: 72, label: 'Al-Jinn', arabic: 'الجن', imageId: 574 },
  { number: 73, label: 'Al-Muzzammil', arabic: 'المزمل', imageId: 577 },
  { number: 74, label: 'Al-Muddathir', arabic: 'المدثر', imageId: 579 },
  { number: 75, label: 'Al-Qiyamah', arabic: 'القيامة', imageId: 581 },
  { number: 76, label: 'Al-Insan', arabic: 'الإنسان', imageId: 583 },
  { number: 77, label: 'Al-Mursalat', arabic: 'المرسلات', imageId: 585 },
  { number: 78, label: 'An-Naba', arabic: 'النبأ', imageId: 587 },
  { number: 79, label: 'An-Nazi\'at', arabic: 'النازعات', imageId: 588 },
  { number: 80, label: 'Abasa', arabic: 'عبس', imageId: 590 },
  { number: 81, label: 'At-Takwir', arabic: 'التكوير', imageId: 591 },
  { number: 82, label: 'Al-Infitar', arabic: 'الانفطار', imageId: 592 },
  { number: 83, label: 'Al-Mutaffifin', arabic: 'المطففين', imageId: 593 },
  { number: 84, label: 'Al-Inshiqaq', arabic: 'الانشقاق', imageId: 595 },
  { number: 85, label: 'Al-Buruj', arabic: 'البروج', imageId: 596 },
  { number: 86, label: 'At-Tariq', arabic: 'الطارق', imageId: 597 },
  { number: 87, label: 'Al-A\'la', arabic: 'الأعلى', imageId: 598 },
  { number: 88, label: 'Al-Ghashiyah', arabic: 'الغاشية', imageId: 598 },
  { number: 89, label: 'Al-Fajr', arabic: 'الفجر', imageId: 599 },
  { number: 90, label: 'Al-Balad', arabic: 'البلد', imageId: 601 },
  { number: 91, label: 'Ash-Shams', arabic: 'الشمس', imageId: 601 },
  { number: 92, label: 'Al-Lail', arabic: 'الليل', imageId: 602 },
  { number: 93, label: 'Ad-Duha', arabic: 'الضحى', imageId: 603 },
  { number: 94, label: 'Ash-Sharh', arabic: 'الشرح', imageId: 603 },
  { number: 95, label: 'At-Tin', arabic: 'التين', imageId: 604 },
  { number: 96, label: 'Al-\'Alaq', arabic: 'العلق', imageId: 604 },
  { number: 97, label: 'Al-Qadr', arabic: 'القدر', imageId: 605 },
  { number: 98, label: 'Al-Bayinah', arabic: 'البينة', imageId: 605 },
  { number: 99, label: 'Az-Zalzalah', arabic: 'الزلزلة', imageId: 606 },
  { number: 100, label: 'Al-Adiyat', arabic: 'العاديات', imageId: 606 },
  { number: 101, label: 'Al-Qari\'ah', arabic: 'القارعة', imageId: 607 },
  { number: 102, label: 'At-Takathur', arabic: 'التكاثر', imageId: 607 },
  { number: 103, label: 'Al-Asr', arabic: 'العصر', imageId: 608 },
  { number: 104, label: 'Al-Humazah', arabic: 'الهمزة', imageId: 608 },
  { number: 105, label: 'Al-Fil', arabic: 'الفيل', imageId: 608 },
  { number: 106, label: 'Quraish', arabic: 'قريش', imageId: 609 },
  { number: 107, label: 'Al-Ma\'un', arabic: 'الماعون', imageId: 609 },
  { number: 108, label: 'Al-Kawthar', arabic: 'الكوثر', imageId: 609 },
  { number: 109, label: 'Al-Kafiroon', arabic: 'الكافرون', imageId: 609 },
  { number: 110, label: 'An-Nasr', arabic: 'النصر', imageId: 610 },
  { number: 111, label: 'Al-Masad', arabic: 'المسد', imageId: 610 },
  { number: 112, label: 'Al-Ikhlas', arabic: 'الإخلاص', imageId: 610 },
  { number: 113, label: 'Al-Falaq', arabic: 'الفلق', imageId: 611 },
  { number: 114, label: 'An-Nas', arabic: 'الناس', imageId: 611 }
];


const SurahIndex = ({ navigation }) => {
  const handlePress = (surah) => {
    if (surah.imageId) {
      navigation.navigate('QuranViewer', { imageId: surah.imageId });
    } else {
      Alert.alert(`Surah ${surah.number}`, `${surah.label} (${surah.arabic})`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {surahList.map((surah) => (
        <TouchableOpacity
          key={surah.number}
          style={styles.item}
          onPress={() => handlePress(surah)}
        >
          <Text style={styles.surahNumber}>Surah {surah.number}</Text>
          <Text style={styles.label}>{surah.label}</Text>
          <Text style={styles.arabic}>{surah.arabic}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'stretch',
  },
  item: {
    backgroundColor: '#e6f7f9',
    marginBottom: 12,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
  },
  surahNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#004d40',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    color: '#00796B',
    marginBottom: 2,
  },
  arabic: {
    fontSize: 20,
    color: '#2E7D32',
    fontFamily: 'sans-serif',
  },
});

export default SurahIndex;
