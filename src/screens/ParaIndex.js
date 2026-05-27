import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import styles from '../styles/appStyles';



  const paraList = [
    { number: 1, label: 'Alif Lam Meem', arabic: 'الم' , imageId: 2 },
    { number: 2, label: 'Sayaqool', arabic: 'سَيَقُولُ' , imageId: 23 },
    { number: 3, label: 'Tilkal Rusul', arabic: 'تِلْكَ الرُّسُلُ' , imageId: 43 },
    { number: 4, label: 'Lantanalu', arabic: 'لَن تَنَالُوا' , imageId: 63 },
    { number: 5, label: 'Wal Mohsanat', arabic: 'والمُحْصَنَاتُ' , imageId: 83 },
    { number: 6, label: 'La Yuhibbullah', arabic: 'لا يُحِبُّ اللهُ' , imageId: 103 },
    { number: 7, label: 'Wa Iza Sami‘u', arabic: 'وَإِذَا سَمِعُوا' , imageId: 123 },
    { number: 8, label: 'Wa Lau Annana', arabic: 'ولو أننا' , imageId: 143 },
    { number: 9, label: 'Qalal Malao', arabic: 'قال الملأ' , imageId: 163 },
    { number: 10, label: 'Wa A‘lamu', arabic: 'واعلموا' , imageId: 183 },
    { number: 11, label: 'Ya‘tadhiruna', arabic: 'يعتذرون' , imageId: 203 },
    { number: 12, label: 'Wa Mamin Da‘abba', arabic: 'وما من دابة' , imageId: 223 },
    { number: 13, label: 'Wa Ma Ubrioo', arabic: 'وما أبرئ' , imageId: 243 },
    { number: 14, label: 'Rubama', arabic: 'ربما' , imageId: 263 },
    { number: 15, label: 'Subhanallazi', arabic: 'سبحان الذي' , imageId: 283 },
    { number: 16, label: 'Qala Alam', arabic: 'قال ألم' , imageId: 303 },
    { number: 17, label: 'Aqtarabat', arabic: ' اقترب للناس' , imageId: 323 },
    { number: 18, label: 'Qadd Aflaha', arabic: 'قد أفلح' , imageId: 343 },
    { number: 19, label: 'Wa Qalallazina', arabic: 'وقال الذين' , imageId: 363 },
    { number: 20, label: 'Aman Khalaq', arabic: 'أمن خلق' , imageId: 383 },
    { number: 21, label: 'Utlu Ma Oohiya', arabic: 'اتل ما أوحي' , imageId: 403 },
    { number: 22, label: 'Wa Manyaqnut', arabic: 'ومن يقنت' , imageId: 423 },
    { number: 23, label: 'Wa Mali', arabic: 'وما لي' , imageId: 443 },
    { number: 24, label: 'Faman Azlam', arabic: 'فمن أظلم' , imageId: 463 },
    { number: 25, label: 'Ilayhi Yuraddu', arabic: 'إليه يرد' , imageId: 483 },
    { number: 26, label: 'Ha Meem', arabic: 'حم' , imageId: 503 },
    { number: 27, label: 'Qala Fama Khatbukum', arabic: 'قال فما خطبكم' , imageId: 523 },
    { number: 28, label: 'Qadd Sami‘a', arabic: 'قد سمع' , imageId: 543 },
    { number: 29, label: 'Tabarakallazi', arabic: 'تبارك الذي' , imageId: 563 },
    { number: 30, label: 'Amma Yatasa’aloon', arabic: 'عمّ' , imageId: 587 },
];


const ParaIndex = ({ navigation }) => {
  const handlePress = (para) => {
    if (para.imageId) {
      navigation.navigate('QuranViewer', { imageId: para.imageId });
    } else {
      Alert.alert(`Para ${para.number}`, `${para.label} (${para.arabic})`);
    }
  };

  
  return (
    <View style={styles.screen}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.headerBack}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Para Index</Text>

        <Text style={styles.headerCount}>
          {paraList.length} of 30 Paras
        </Text>
      </View>

      <View style={styles.searchWrap}>
        <View style={styles.searchWrapInner}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search para name or number…"
            placeholderTextColor="#8A8A9A"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {paraList.map((para) => (
          <TouchableOpacity
            key={para.number}
            style={styles.indexCard}
          >
            <View style={styles.cardNum}>
              <Text style={styles.cardNumText}>{para.number}</Text>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.cardEn}>{para.label}</Text>

              <Text style={styles.cardMeta}>
                Para {para.number} of 30
              </Text>
            </View>

            <Text style={styles.cardAr}>{para.arabic}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ParaIndex;




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


