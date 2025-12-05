import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#4d5661ff',
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
