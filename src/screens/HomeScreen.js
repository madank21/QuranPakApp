import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

import styles from '../styles/appStyles';

const ViewerScreen = ({ navigation }) => {
  const [inputVal, setInputVal] = useState('');
  const [pageId, setPageId] = useState(null);

  const handleGo = () => {
    const v = parseInt(inputVal);

    if (v > 0 && v <= 604) {
      setPageId(v);
    }
  };

  const prev = () => {
    if (pageId > 1) {
      setPageId((p) => p - 1);
    }
  };

  const next = () => {
    if (pageId < 604) {
      setPageId((p) => p + 1);
    }
  };

  const imgSrc = pageId
    ? `https://www.searchtruth.com/quran/images2/${String(pageId).padStart(
        3,
        '0'
      )}.jpg`
    : null;

  return (
    <View style={styles.screen}>
      <View style={styles.viewerHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.headerBack}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Quran Viewer</Text>

        <View style={styles.viewerInputRow}>
          <TextInput
            style={styles.viewerInput}
            placeholder="Enter page ID (1–604)…"
            placeholderTextColor="#8A8A9A"
            keyboardType="numeric"
            value={inputVal}
            onChangeText={setInputVal}
          />

          <TouchableOpacity
            style={styles.goBtn}
            onPress={handleGo}
          >
            <Text style={styles.goBtnText}>GO</Text>
          </TouchableOpacity>
        </View>
      </View>

      {pageId && (
        <View style={styles.pageNav}>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={prev}
          >
            <Text style={styles.navBtnText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.pageIndicator}>
            PAGE {pageId} / 604
          </Text>

          <TouchableOpacity
            style={styles.navBtn}
            onPress={next}
          >
            <Text style={styles.navBtnText}>›</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.quranPageWrap}>
        {imgSrc ? (
          <Image
            source={{ uri: imgSrc }}
            style={styles.quranPageImg}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.pagePlaceholder}>
            <Text style={styles.placeholderIcon}>📖</Text>

            <Text style={styles.placeholderText}>
              Enter a page ID above to view
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewerScreen;





import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const LAST_PAGE_KEY = 'quran_last_page';

const HomeScreen = ({ navigation }) => {
    const [checkedBookmark, setCheckedBookmark] = useState(false);

    useEffect(() => {
        if (checkedBookmark) return;
        const checkBookmark = async () => {
            try {
                const raw = await AsyncStorage.getItem(LAST_PAGE_KEY);
                if (raw) {
                    const { id } = JSON.parse(raw);
                    if (id != null) {
                        Alert.alert(
                            'Resume reading?',
                            `Do you want to continue from previous session?`,
                            [
                                { text: 'No', style: 'cancel', onPress: () => setCheckedBookmark(true) },
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        setCheckedBookmark(true);
                                        navigation.navigate('QuranViewer', { imageId: id });
                                    },
                                },
                            ]
                        );
                    } else {
                        setCheckedBookmark(true);
                    }
                } else {
                    setCheckedBookmark(true);
                }
            } catch (e) {
                setCheckedBookmark(true);
            }
        };
        setTimeout(checkBookmark, 300);
    }, [checkedBookmark, navigation]);

    return (
        <LinearGradient
          colors={["#c4b9aa", "#a7a07d", "#a59747", "#978f1e", "#b1b36f"]}
          
          locations={[0, 0.25, 0.5, 0.75, 1]}
          style={{ width: "100%", height: "100%" }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.heading}>Quran Pak</Text>
            </View>

            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('QuranViewer')}
                >
                    <Text style={styles.buttonText}>QuranViewer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SurahIndex')}
                >
                    <Text style={styles.buttonText}>Surah Index</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('ParaIndex')}
                >
                    <Text style={styles.buttonText}>Para Index</Text>
                </TouchableOpacity>
            </View>
        </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        width: '70%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 50,
    },
});

export default HomeScreen;
