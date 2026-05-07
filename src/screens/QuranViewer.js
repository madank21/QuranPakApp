import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  PanResponder,
} from 'react-native';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import pageData from '../assets/pageData.json';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.9;
const IMAGE_HEIGHT = 500;
const ITEM_HEIGHT = IMAGE_HEIGHT + 5;

const LAST_PAGE_KEY = 'quran_last_page';


const images = [
  {
    id: 1,
    source: require('../assets/images/img_1.png'),
  },
  {
    id: 2, 
    source: require('../assets/images/img_2.png'),
  },
  {
    id: 3,
    source: require('../assets/images/img_3.png'),
  },
  {
    id: 4,
    source: require('../assets/images/img_4.png'),
  },
  {
    id: 5,
    source: require('../assets/images/img_5.png'),
  },
  {
    id: 6,
    source: require('../assets/images/img_6.png'),
  },
  {
    id: 7,
    source: require('../assets/images/img_7.png'),
  },
  {
    id: 8,
    source: require('../assets/images/img_8.png'),
  },
  {
    id: 9,
    source: require('../assets/images/img_9.png'),
  },
  {
    id: 10,
    source: require('../assets/images/img_10.png'),
  },
  {
    id: 11,
    source: require('../assets/images/img_11.png'),
  },
  {
    id: 12,
    source: require('../assets/images/img_12.png'),
  },
  {
    id: 13,
    source: require('../assets/images/img_13.png'),
  },
  {
    id: 14,
    source: require('../assets/images/img_14.png'),
  },
  {
    id: 15,
    source: require('../assets/images/img_15.png'),
  },
  {
    id: 16,
    source: require('../assets/images/img_16.png'),
  },
  {
    id: 17,
    source: require('../assets/images/img_17.png'),
  },
  {
    id: 18,
    source: require('../assets/images/img_18.png'),
  },
  {
    id: 19,
    source: require('../assets/images/img_19.png'),
  },
  {
    id: 20,
    source: require('../assets/images/img_20.png'),
  },
  {
    id: 21,
    source: require('../assets/images/img_21.png'),
  },
  {
    id: 22,
    source: require('../assets/images/img_22.png'),
  },
  {
    id: 23,
    source: require('../assets/images/img_23.png'),
  },
  {
    id: 24,
    source: require('../assets/images/img_24.png'),
  },
  {
    id: 25,
    source: require('../assets/images/img_25.png'),
  },
  {
    id: 26,
    source: require('../assets/images/img_26.png'),
  },
  {
    id: 27,
    source: require('../assets/images/img_27.png'),
  },
  {
    id: 28,
    source: require('../assets/images/img_28.png'),
  },
  {
    id: 29,
    source: require('../assets/images/img_29.png'),
  },
  {
    id: 30,
    source: require('../assets/images/img_30.png'),
  },
  {
    id: 31,
    source: require('../assets/images/img_31.png'),
  },
  {
    id: 32,
    source: require('../assets/images/img_32.png'),
  },
  {
    id: 33,
    source: require('../assets/images/img_33.png'),
  },
  {
    id: 34,
    source: require('../assets/images/img_34.png'),
  },
  {
    id: 35,
    source: require('../assets/images/img_35.png'),
  },
  {
    id: 36,
    source: require('../assets/images/img_36.png'),
  },
  {
    id: 37,
    source: require('../assets/images/img_37.png'),
  },
  {
    id: 38,
    source: require('../assets/images/img_38.png'),
  },
  {
    id: 39,
    source: require('../assets/images/img_39.png'),
  },
  {
    id: 40,
    source: require('../assets/images/img_40.png'),
  },
  {
    id: 41,
    source: require('../assets/images/img_41.png'),
  },
  {
    id: 42,
    source: require('../assets/images/img_42.png'),
  },
  {
    id: 43,
    source: require('../assets/images/img_43.png'),
  },
  {
    id: 44,
    source: require('../assets/images/img_44.png'),
  },
  {
    id: 45,
    source: require('../assets/images/img_45.png'),
  },
  {
    id: 46,
    source: require('../assets/images/img_46.png'),
  },
  {
    id: 47,
    source: require('../assets/images/img_47.png'),
  },
  {
    id: 48,
    source: require('../assets/images/img_48.png'),
  },
  {
    id: 49,
    source: require('../assets/images/img_49.png'),
  },
  {
    id: 50,
    source: require('../assets/images/img_50.png'),
  },
  {
    id: 51,
    source: require('../assets/images/img_51.png'),
  },
  {
    id: 52,
    source: require('../assets/images/img_52.png'),
  },
  {
    id: 53,
    source: require('../assets/images/img_53.png'),
  },
  {
    id: 54,
    source: require('../assets/images/img_54.png'),
  },
  {
    id: 55,
    source: require('../assets/images/img_55.png'),
  },
  {
    id: 56,
    source: require('../assets/images/img_56.png'),
  },
  {
    id: 57,
    source: require('../assets/images/img_57.png'),
  },
  {
    id: 58,
    source: require('../assets/images/img_58.png'),
  },
  {
    id: 59,
    source: require('../assets/images/img_59.png'),
  },
  {
    id: 60,
    source: require('../assets/images/img_60.png'),
  },
  {
    id: 61,
    source: require('../assets/images/img_61.png'),
  },
  {
    id: 62,
    source: require('../assets/images/img_62.png'),
  },
  {
    id: 63,
    source: require('../assets/images/img_63.png'),
  },
  {
    id: 64,
    source: require('../assets/images/img_64.png'),
  },
  {
    id: 65,
    source: require('../assets/images/img_65.png'),
  },
  {
    id: 66,
    source: require('../assets/images/img_66.png'),
  },
  {
    id: 67,
    source: require('../assets/images/img_67.png'),
  },
  {
    id: 68,
    source: require('../assets/images/img_68.png'),
  },
  {
    id: 69,
    source: require('../assets/images/img_69.png'),
  },
  {
    id: 70,
    source: require('../assets/images/img_70.png'),
  },
  {
    id: 71,
    source: require('../assets/images/img_71.png'),
  },
  {
    id: 72,
    source: require('../assets/images/img_72.png'),
  },
  {
    id: 73,
    source: require('../assets/images/img_73.png'),
  },
  {
    id: 74,
    source: require('../assets/images/img_74.png'),
  },
  {
    id: 75,
    source: require('../assets/images/img_75.png'),
  },
  {
    id: 76,
    source: require('../assets/images/img_76.png'),
  },
  {
    id: 77,
    source: require('../assets/images/img_77.png'),
  },
  {
    id: 78,
    source: require('../assets/images/img_78.png'),
  },
  {
    id: 79,
    source: require('../assets/images/img_79.png'),
  },
  {
    id: 80,
    source: require('../assets/images/img_80.png'),
  },
  {
    id: 81,
    source: require('../assets/images/img_81.png'),
  },
  {
    id: 82,
    source: require('../assets/images/img_82.png'),
  },
  {
    id: 83,
    source: require('../assets/images/img_83.png'),
  },
  {
    id: 84,
    source: require('../assets/images/img_84.png'),
  },
  {
    id: 85,
    source: require('../assets/images/img_85.png'),
  },
  {
    id: 86,
    source: require('../assets/images/img_86.png'),
    },
    {
    id: 87,
    source: require('../assets/images/img_87.png'),
    },
    {
    id: 88,
    source: require('../assets/images/img_88.png'),
    },
    {
    id: 89,
    source: require('../assets/images/img_89.png'),
    },
    {
    id: 90,
    source: require('../assets/images/img_90.png'),
    },
    {
    id: 91,
    source: require('../assets/images/img_91.png'),
    },
    {
    id: 92,
    source: require('../assets/images/img_92.png'),
    },
    {
    id: 93,
    source: require('../assets/images/img_93.png'),
    },
    {
    id: 94,
    source: require('../assets/images/img_94.png'),
    },
    {
    id: 95,
    source: require('../assets/images/img_95.png'),
    },
    {
    id: 96,
    source: require('../assets/images/img_96.png'),
    },
    {
    id: 97,
    source: require('../assets/images/img_97.png'),
    },
    {
    id: 98,
    source: require('../assets/images/img_98.png'),
    },
    {
    id: 99,
    source: require('../assets/images/img_99.png'),
    },
    {
    id: 100,
    source: require('../assets/images/img_100.png'),
    },
    {
    id: 101,
    source: require('../assets/images/img_101.png'),
    },
    {
    id: 102,
    source: require('../assets/images/img_102.png'),
    },
    {
    id: 103,
    source: require('../assets/images/img_103.png'),
    },
    {
    id: 104,
    source: require('../assets/images/img_104.png'),
    },
    {
    id: 105,
    source: require('../assets/images/img_105.png'),
    },
    {
    id: 106,
    source: require('../assets/images/img_106.png'),
    },
    {
    id: 107,
    source: require('../assets/images/img_107.png'),
    },
    {
    id: 108,
    source: require('../assets/images/img_108.png'),
    },
    {
    id: 109,
    source: require('../assets/images/img_109.png'),
    },
    {
    id: 110,
    source: require('../assets/images/img_110.png'),
    },
    {
    id: 111,
    source: require('../assets/images/img_111.png'),
    },
    {
    id: 112,
    source: require('../assets/images/img_112.png'),
    },
    {
    id: 113,
    source: require('../assets/images/img_113.png'),
    },
    {
    id: 114,
    source: require('../assets/images/img_114.png'),
    },
    {
    id: 115,
    source: require('../assets/images/img_115.png'),
    },
    {
    id: 116,
    source: require('../assets/images/img_116.png'),
    },
    {
    id: 117,
    source: require('../assets/images/img_117.png'),
    },
    {
    id: 118,
    source: require('../assets/images/img_118.png'),
    },
    {
    id: 119,
    source: require('../assets/images/img_119.png'),
    },
    {
    id: 120,
    source: require('../assets/images/img_120.png'),
    },
    {
    id: 121,
    source: require('../assets/images/img_121.png'),
    },
    {
    id: 122,
    source: require('../assets/images/img_122.png'),
    },
    {
    id: 123,
    source: require('../assets/images/img_123.png'),
    },
    {
    id: 124,
    source: require('../assets/images/img_124.png'),
    },
    {
    id: 125,
    source: require('../assets/images/img_125.png'),
    },
    {
    id: 126,
    source: require('../assets/images/img_126.png'),
    },
    {
    id: 127,
    source: require('../assets/images/img_127.png'),
    },
    {
    id: 128,
    source: require('../assets/images/img_128.png'),
    },
    {
    id: 129,
    source: require('../assets/images/img_129.png'),
    },
    {
    id: 130,
    source: require('../assets/images/img_130.png'),
    },
    {
    id: 131,
    source: require('../assets/images/img_131.png'),
    },
    {
    id: 132,
    source: require('../assets/images/img_132.png'),
    },
    {
    id: 133,
    source: require('../assets/images/img_133.png'),
    },
    {
    id: 134,
    source: require('../assets/images/img_134.png'),
    },
    {
    id: 135,
    source: require('../assets/images/img_135.png'),
    },
    {
    id: 136,
    source: require('../assets/images/img_136.png'),
    },
    {
    id: 137,
    source: require('../assets/images/img_137.png'),
    },
    {
    id: 138,
    source: require('../assets/images/img_138.png'),
    },
    {
    id: 139,
    source: require('../assets/images/img_139.png'),
    },
    {
    id: 140,
    source: require('../assets/images/img_140.png'),
    },
    {
    id: 141,
    source: require('../assets/images/img_141.png'),
    },
    {
    id: 142,
    source: require('../assets/images/img_142.png'),
    },
    {
    id: 143,
    source: require('../assets/images/img_143.png'),
    },
    {
    id: 144,
    source: require('../assets/images/img_144.png'),
    },
    {
    id: 145,
    source: require('../assets/images/img_145.png'),
    },
    {
    id: 146,
    source: require('../assets/images/img_146.png'),
    },
    {
    id: 147,
    source: require('../assets/images/img_147.png'),
    },
    {
    id: 148,
    source: require('../assets/images/img_148.png'),
    },
    {
    id: 149,
    source: require('../assets/images/img_149.png'),
    },
    {
    id: 150,
    source: require('../assets/images/img_150.png'),
    },
    {
    id: 151,
    source: require('../assets/images/img_151.png'),
    },
    {
    id: 152,
    source: require('../assets/images/img_152.png'),
    },
    {
    id: 153,
    source: require('../assets/images/img_153.png'),
    },
    {
    id: 154,
    source: require('../assets/images/img_154.png'),
    },
    {
    id: 155,
    source: require('../assets/images/img_155.png'),
    },
    {
    id: 156,
    source: require('../assets/images/img_156.png'),
    },
    {
    id: 157,
    source: require('../assets/images/img_157.png'),
    },
    {
    id: 158,
    source: require('../assets/images/img_158.png'),
    },
    {
    id: 159,
    source: require('../assets/images/img_159.png'),
    },
    {
    id: 160,
    source: require('../assets/images/img_160.png'),
    },
    {
    id: 161,
    source: require('../assets/images/img_161.png'),
    },
    {
    id: 162,
    source: require('../assets/images/img_162.png'),
    },
    {
    id: 163,
    source: require('../assets/images/img_163.png'),
    },
    {
    id: 164,
    source: require('../assets/images/img_164.png'),
    },
    {
    id: 165,
    source: require('../assets/images/img_165.png'),
    },
    {
    id: 166,
    source: require('../assets/images/img_166.png'),
    },
    {
    id: 167,
    source: require('../assets/images/img_167.png'),
    },
    {
    id: 168,
    source: require('../assets/images/img_168.png'),
    },
    {
    id: 169,
    source: require('../assets/images/img_169.png'),
    },
    {
    id: 170,
    source: require('../assets/images/img_170.png'),
    },
    {
    id: 171,
    source: require('../assets/images/img_171.png'),
    },
    {
    id: 172,
    source: require('../assets/images/img_172.png'),
    },
    {
    id: 173,
    source: require('../assets/images/img_173.png'),
    },
    {
    id: 174,
    source: require('../assets/images/img_174.png'),
    },
    {
    id: 175,
    source: require('../assets/images/img_175.png'),
    },
    {
    id: 176,
    source: require('../assets/images/img_176.png'),
    },
    {
    id: 177,
    source: require('../assets/images/img_177.png'),
    },
    {
    id: 178,
    source: require('../assets/images/img_178.png'),
    },
    {
    id: 179,
    source: require('../assets/images/img_179.png'),
    },
    {
    id: 180,
    source: require('../assets/images/img_180.png'),
    },
    {
    id: 181,
    source: require('../assets/images/img_181.png'),
    },
    {
    id: 182,
    source: require('../assets/images/img_182.png'),
    },
    {
    id: 183,
    source: require('../assets/images/img_183.png'),
    },
    {
    id: 184,
    source: require('../assets/images/img_184.png'),
    },
    {
    id: 185,
    source: require('../assets/images/img_185.png'),
    },
    {
    id: 186,
    source: require('../assets/images/img_186.png'),
    },
    {
    id: 187,
    source: require('../assets/images/img_187.png'),
    },
    {
    id: 188,
    source: require('../assets/images/img_188.png'),
    },
    {
    id: 189,
    source: require('../assets/images/img_189.png'),
    },
    {
    id: 190,
    source: require('../assets/images/img_190.png'),
    },
    {
    id: 191,
    source: require('../assets/images/img_191.png'),
    },
    {
    id: 192,
    source: require('../assets/images/img_192.png'),
    },
    {
    id: 193,
    source: require('../assets/images/img_193.png'),
    },
    {
    id: 194,
    source: require('../assets/images/img_194.png'),
    },
    {
    id: 195,
    source: require('../assets/images/img_195.png'),
    },
    {
    id: 196,
    source: require('../assets/images/img_196.png'),
    },
    {
    id: 197,
    source: require('../assets/images/img_197.png'),
    },
    {
    id: 198,
    source: require('../assets/images/img_198.png'),
    },
    {
    id: 199,
    source: require('../assets/images/img_199.png'),
    },
    {
    id: 200,
    source: require('../assets/images/img_200.png'),
    },
    {
    id: 201,
    source: require('../assets/images/img_201.png'),
    },
    {
    id: 202,
    source: require('../assets/images/img_202.png'),
    },
    {
    id: 203,
    source: require('../assets/images/img_203.png'),
    },
    {
    id: 204,
    source: require('../assets/images/img_204.png'),
    },
    {
    id: 205,
    source: require('../assets/images/img_205.png'),
    },
    {
    id: 206,
    source: require('../assets/images/img_206.png'),
    },
    {
    id: 207,
    source: require('../assets/images/img_207.png'),
    },
    {
    id: 208,
    source: require('../assets/images/img_208.png'),
    },
    {
    id: 209,
    source: require('../assets/images/img_209.png'),
    },
    {
    id: 210,
    source: require('../assets/images/img_210.png'),
    },
    {
    id: 211,
    source: require('../assets/images/img_211.png'),
    },
    {
    id: 212,
    source: require('../assets/images/img_212.png'),
    },
    {
    id: 213,
    source: require('../assets/images/img_213.png'),
    },
    {
    id: 214,
    source: require('../assets/images/img_214.png'),
    },
    {
    id: 215,
    source: require('../assets/images/img_215.png'),
    },
    {
    id: 216,
    source: require('../assets/images/img_216.png'),
    },
    {
    id: 217,
    source: require('../assets/images/img_217.png'),
    },
    {
    id: 218,
    source: require('../assets/images/img_218.png'),
    },
    {
    id: 219,
    source: require('../assets/images/img_219.png'),
    },
    {
    id: 220,
    source: require('../assets/images/img_220.png'),
    },
    {
    id: 221,
    source: require('../assets/images/img_221.png'),
    },
    {
    id: 222,
    source: require('../assets/images/img_222.png'),
    },
    {
    id: 223,
    source: require('../assets/images/img_223.png'),
    },
    {
    id: 224,
    source: require('../assets/images/img_224.png'),
    },
    {
    id: 225,
    source: require('../assets/images/img_225.png'),
    },
    {
    id: 226,
    source: require('../assets/images/img_226.png'),
    },
    {
    id: 227,
    source: require('../assets/images/img_227.png'),
    },
    {
    id: 228,
    source: require('../assets/images/img_228.png'),
    },
    {
    id: 229,
    source: require('../assets/images/img_229.png'),
    },
    {
    id: 230,
    source: require('../assets/images/img_230.png'),
    },
    {
    id: 231,
    source: require('../assets/images/img_231.png'),
    },
    {
    id: 232,
    source: require('../assets/images/img_232.png'),
    },
    {
    id: 233,
    source: require('../assets/images/img_233.png'),
    },
    {
    id: 234,
    source: require('../assets/images/img_234.png'),
    },
    {
    id: 235,
    source: require('../assets/images/img_235.png'),
    },
    {
    id: 236,
    source: require('../assets/images/img_236.png'),
    },
    {
    id: 237,
    source: require('../assets/images/img_237.png'),
    },
    {
    id: 238,
    source: require('../assets/images/img_238.png'),
    },
    {
    id: 239,
    source: require('../assets/images/img_239.png'),
    },
    {
    id: 240,
    source: require('../assets/images/img_240.png'),
    },
    {
    id: 241,
    source: require('../assets/images/img_241.png'),
    },
    {
    id: 242,
    source: require('../assets/images/img_242.png'),
    },
    {
    id: 243,
    source: require('../assets/images/img_243.png'),
    },
    {
    id: 244,
    source: require('../assets/images/img_244.png'),
    },
    {
    id: 245,
    source: require('../assets/images/img_245.png'),
    },
    {
    id: 246,
    source: require('../assets/images/img_246.png'),
    },
    {
    id: 247,
    source: require('../assets/images/img_247.png'),
    },
    {
    id: 248,
    source: require('../assets/images/img_248.png'),
    },
    {
    id: 249,
    source: require('../assets/images/img_249.png'),
    },
    {
    id: 250,
    source: require('../assets/images/img_250.png'),
    },
    {
    id: 251,
    source: require('../assets/images/img_251.png'),
    },
    {
    id: 252,
    source: require('../assets/images/img_252.png'),
    },
    {
    id: 253,
    source: require('../assets/images/img_253.png'),
    },
    {
    id: 254,
    source: require('../assets/images/img_254.png'),
    },
    {
    id: 255,
    source: require('../assets/images/img_255.png'),
    },
    {
    id: 256,
    source: require('../assets/images/img_256.png'),
    },
    {
    id: 257,
    source: require('../assets/images/img_257.png'),
    },
    {
    id: 258,
    source: require('../assets/images/img_258.png'),
    },
    {
    id: 259,
    source: require('../assets/images/img_259.png'),
    },
    {
    id: 260,
    source: require('../assets/images/img_260.png'),
    },
    {
    id: 261,
    source: require('../assets/images/img_261.png'),
    },
    {
    id: 262,
    source: require('../assets/images/img_262.png'),
    },
    {
    id: 263,
    source: require('../assets/images/img_263.png'),
    },
    {
    id: 264,
    source: require('../assets/images/img_264.png'),
    },
    {
    id: 265,
    source: require('../assets/images/img_265.png'),
    },
    {
    id: 266,
    source: require('../assets/images/img_266.png'),
    },
    {
    id: 267,
    source: require('../assets/images/img_267.png'),
    },
    {
    id: 268,
    source: require('../assets/images/img_268.png'),
    },
    {
    id: 269,
    source: require('../assets/images/img_269.png'),
    },
    {
    id: 270,
    source: require('../assets/images/img_270.png'),
    },
    {
    id: 271,
    source: require('../assets/images/img_271.png'),
    },
    {
    id: 272,
    source: require('../assets/images/img_272.png'),
    },
    {
    id: 273,
    source: require('../assets/images/img_273.png'),
    },
    {
    id: 274,
    source: require('../assets/images/img_274.png'),
    },
    {
    id: 275,
    source: require('../assets/images/img_275.png'),
    },
    {
    id: 276,
    source: require('../assets/images/img_276.png'),
    },
    {
    id: 277,
    source: require('../assets/images/img_277.png'),
    },
    {
    id: 278,
    source: require('../assets/images/img_278.png'),
    },
    {
    id: 279,
    source: require('../assets/images/img_279.png'),
    },
    {
    id: 280,
    source: require('../assets/images/img_280.png'),
    },
    {
    id: 281,
    source: require('../assets/images/img_281.png'),
    },
    {
    id: 282,
    source: require('../assets/images/img_282.png'),
    },
    {
    id: 283,
    source: require('../assets/images/img_283.png'),
    },
    {
    id: 284,
    source: require('../assets/images/img_284.png'),
    },
    {
    id: 285,
    source: require('../assets/images/img_285.png'),
    },
    {
    id: 286,
    source: require('../assets/images/img_286.png'),
    },
    {
    id: 287,
    source: require('../assets/images/img_287.png'),
    },
    {
    id: 288,
    source: require('../assets/images/img_288.png'),
    },
    {
    id: 289,
    source: require('../assets/images/img_289.png'),
    },
    {
    id: 290,
    source: require('../assets/images/img_290.png'),
    },
    {
    id: 291,
    source: require('../assets/images/img_291.png'),
    },
    {
    id: 292,
    source: require('../assets/images/img_292.png'),
    },
    {
    id: 293,
    source: require('../assets/images/img_293.png'),
    },
    {
    id: 294,
    source: require('../assets/images/img_294.png'),
    },
    {
    id: 295,
    source: require('../assets/images/img_295.png'),
    },
    {
    id: 296,
    source: require('../assets/images/img_296.png'),
    },
    {
    id: 297,
    source: require('../assets/images/img_297.png'),
    },
    {
    id: 298,
    source: require('../assets/images/img_298.png'),
    },
    {
    id: 299,
    source: require('../assets/images/img_299.png'),
    },
    {
    id: 300,
    source: require('../assets/images/img_300.png'),
    },
    {
    id: 301,
    source: require('../assets/images/img_301.png'),
    },
    {
    id: 302,
    source: require('../assets/images/img_302.png'),
    },
    {
    id: 303,
    source: require('../assets/images/img_303.png'),
    },
    {
    id: 304,
    source: require('../assets/images/img_304.png'),
    },
    {
    id: 305,
    source: require('../assets/images/img_305.png'),
    },
    {
    id: 306,
    source: require('../assets/images/img_306.png'),
    },
    {
    id: 307,
    source: require('../assets/images/img_307.png'),
    },
    {
    id: 308,
    source: require('../assets/images/img_308.png'),
    },
    {
    id: 309,
    source: require('../assets/images/img_309.png'),
    },
    {
    id: 310,
    source: require('../assets/images/img_310.png'),
    },
    {
    id: 311,
    source: require('../assets/images/img_311.png'),
    },
    {
    id: 312,
    source: require('../assets/images/img_312.png'),
    },
    {
    id: 313,
    source: require('../assets/images/img_313.png'),
    },
    {
    id: 314,
    source: require('../assets/images/img_314.png'),
    },
    {
    id: 315,
    source: require('../assets/images/img_315.png'),
    },
    {
    id: 316,
    source: require('../assets/images/img_316.png'),
    },
    {
    id: 317,
    source: require('../assets/images/img_317.png'),
    },
    {
    id: 318,
    source: require('../assets/images/img_318.png'),
    },
    {
    id: 319,
    source: require('../assets/images/img_319.png'),
    },
    {
    id: 320,
    source: require('../assets/images/img_320.png'),
    },
    {
    id: 321,
    source: require('../assets/images/img_321.png'),
    },
    {
    id: 322,
    source: require('../assets/images/img_322.png'),
    },
    {
    id: 323,
    source: require('../assets/images/img_323.png'),
    },
    {
    id: 324,
    source: require('../assets/images/img_324.png'),
    },
    {
    id: 325,
    source: require('../assets/images/img_325.png'),
    },
    {
    id: 326,
    source: require('../assets/images/img_326.png'),
    },
    {
    id: 327,
    source: require('../assets/images/img_327.png'),
    },
    {
    id: 328,
    source: require('../assets/images/img_328.png'),
    },
    {
    id: 329,
    source: require('../assets/images/img_329.png'),
    },
    {
    id: 330,
    source: require('../assets/images/img_330.png'),
    },
    {
    id: 331,
    source: require('../assets/images/img_331.png'),
    },
    {
    id: 332,
    source: require('../assets/images/img_332.png'),
    },
    {
    id: 333,
    source: require('../assets/images/img_333.png'),
    },
    {
    id: 334,
    source: require('../assets/images/img_334.png'),
    },
    {
    id: 335,
    source: require('../assets/images/img_335.png'),
    },
    {
    id: 336,
    source: require('../assets/images/img_336.png'),
    },
    {
    id: 337,
    source: require('../assets/images/img_337.png'),
    },
    {
    id: 338,
    source: require('../assets/images/img_338.png'),
    },
    {
    id: 339,
    source: require('../assets/images/img_339.png'),
    },
    {
    id: 340,
    source: require('../assets/images/img_340.png'),
    },
    {
    id: 341,
    source: require('../assets/images/img_341.png'),
    },
    {
    id: 342,
    source: require('../assets/images/img_342.png'),
    },
    {
    id: 343,
    source: require('../assets/images/img_343.png'),
    },
    {
    id: 344,
    source: require('../assets/images/img_344.png'),
    },
    {
    id: 345,
    source: require('../assets/images/img_345.png'),
    },
    {
    id: 346,
    source: require('../assets/images/img_346.png'),
    },
    {
    id: 347,
    source: require('../assets/images/img_347.png'),
    },
    {
    id: 348,
    source: require('../assets/images/img_348.png'),
    },
    {
    id: 349,
    source: require('../assets/images/img_349.png'),
    },
    {
    id: 350,
    source: require('../assets/images/img_350.png'),
    },
    {
    id: 351,
    source: require('../assets/images/img_351.png'),
    },
    {
    id: 352,
    source: require('../assets/images/img_352.png'),
    },
    {
    id: 353,
    source: require('../assets/images/img_353.png'),
    },
    {
    id: 354,
    source: require('../assets/images/img_354.png'),
    },
    {
    id: 355,
    source: require('../assets/images/img_355.png'),
    },
    {
    id: 356,
    source: require('../assets/images/img_356.png'),
    },
    {
    id: 357,
    source: require('../assets/images/img_357.png'),
    },
    {
    id: 358,
    source: require('../assets/images/img_358.png'),
    },
    {
    id: 359,
    source: require('../assets/images/img_359.png'),
    },
    {
    id: 360,
    source: require('../assets/images/img_360.png'),
    },
    {
    id: 361,
    source: require('../assets/images/img_361.png'),
    },
    {
    id: 362,
    source: require('../assets/images/img_362.png'),
    },
    {
    id: 363,
    source: require('../assets/images/img_363.png'),
    },
    {
    id: 364,
    source: require('../assets/images/img_364.png'),
    },
    {
    id: 365,
    source: require('../assets/images/img_365.png'),
    },
    {
    id: 366,
    source: require('../assets/images/img_366.png'),
    },
    {
    id: 367,
    source: require('../assets/images/img_367.png'),
    },
    {
    id: 368,
    source: require('../assets/images/img_368.png'),
    },
    {
    id: 369,
    source: require('../assets/images/img_369.png'),
    },
    {
    id: 370,
    source: require('../assets/images/img_370.png'),
    },
    {
    id: 371,
    source: require('../assets/images/img_371.png'),
    },
    {
    id: 372,
    source: require('../assets/images/img_372.png'),
    },
    {
    id: 373,
    source: require('../assets/images/img_373.png'),
    },
    {
    id: 374,
    source: require('../assets/images/img_374.png'),
    },
    {
    id: 375,
    source: require('../assets/images/img_375.png'),
    },
    {
    id: 376,
    source: require('../assets/images/img_376.png'),
    },
    {
    id: 377,
    source: require('../assets/images/img_377.png'),
    },
    {
    id: 378,
    source: require('../assets/images/img_378.png'),
    },
    {
    id: 379,
    source: require('../assets/images/img_379.png'),
    },
    {
    id: 380,
    source: require('../assets/images/img_380.png'),
    },
    {
    id: 381,
    source: require('../assets/images/img_381.png'),
    },
    {
    id: 382,
    source: require('../assets/images/img_382.png'),
    },
    {
    id: 383,
    source: require('../assets/images/img_383.png'),
    },
    {
    id: 384,
    source: require('../assets/images/img_384.png'),
    },
    {
    id: 385,
    source: require('../assets/images/img_385.png'),
    },
    {
    id: 386,
    source: require('../assets/images/img_386.png'),
    },
    {
    id: 387,
    source: require('../assets/images/img_387.png'),
    },
    {
    id: 388,
    source: require('../assets/images/img_388.png'),
    },
    {
    id: 389,
    source: require('../assets/images/img_389.png'),
    },
    {
    id: 390,
    source: require('../assets/images/img_390.png'),
    },
    {
    id: 391,
    source: require('../assets/images/img_391.png'),
    },
    {
    id: 392,
    source: require('../assets/images/img_392.png'),
    },
    {
    id: 393,
    source: require('../assets/images/img_393.png'),
    },
    {
    id: 394,
    source: require('../assets/images/img_394.png'),
    },
    {
    id: 395,
    source: require('../assets/images/img_395.png'),
    },
    {
    id: 396,
    source: require('../assets/images/img_396.png'),
    },
    {
    id: 397,
    source: require('../assets/images/img_397.png'),
    },
    {
    id: 398,
    source: require('../assets/images/img_398.png'),
    },
    {
    id: 399,
    source: require('../assets/images/img_399.png'),
    },
    {
    id: 400,
    source: require('../assets/images/img_400.png'),
    },
    {
    id: 401,
    source: require('../assets/images/img_401.png'),
    },
    {
    id: 402,
    source: require('../assets/images/img_402.png'),
    },
    {
    id: 403,
    source: require('../assets/images/img_403.png'),
    },
    {
    id: 404,
    source: require('../assets/images/img_404.png'),
    },
    {
    id: 405,
    source: require('../assets/images/img_405.png'),
    },
    {
    id: 406,
    source: require('../assets/images/img_406.png'),
    },
    {
    id: 407,
    source: require('../assets/images/img_407.png'),
    },
    {
    id: 408,
    source: require('../assets/images/img_408.png'),
    },
    {
    id: 409,
    source: require('../assets/images/img_409.png'),
    },
    {
    id: 410,
    source: require('../assets/images/img_410.png'),
    },
    {
    id: 411,
    source: require('../assets/images/img_411.png'),
    },
    {
    id: 412,
    source: require('../assets/images/img_412.png'),
    },
    {
    id: 413,
    source: require('../assets/images/img_413.png'),
    },
    {
    id: 414,
    source: require('../assets/images/img_414.png'),
    },
    {
    id: 415,
    source: require('../assets/images/img_415.png'),
    },
    {
    id: 416,
    source: require('../assets/images/img_416.png'),
    },
    {
    id: 417,
    source: require('../assets/images/img_417.png'),
    },
    {
    id: 418,
    source: require('../assets/images/img_418.png'),
    },
    {
    id: 419,
    source: require('../assets/images/img_419.png'),
    },
    {
    id: 420,
    source: require('../assets/images/img_420.png'),
    },
    {
    id: 421,
    source: require('../assets/images/img_421.png'),
    },
    {
    id: 422,
    source: require('../assets/images/img_422.png'),
    },
    {
    id: 423,
    source: require('../assets/images/img_423.png'),
    },
    {
    id: 424,
    source: require('../assets/images/img_424.png'),
    },
    {
    id: 425,
    source: require('../assets/images/img_425.png'),
    },
    {
    id: 426,
    source: require('../assets/images/img_426.png'),
    },
    {
    id: 427,
    source: require('../assets/images/img_427.png'),
    },
    {
    id: 428,
    source: require('../assets/images/img_428.png'),
    },
    {
    id: 429,
    source: require('../assets/images/img_429.png'),
    },
    {
    id: 430,
    source: require('../assets/images/img_430.png'),
    },
    {
    id: 431,
    source: require('../assets/images/img_431.png'),
    },
    {
    id: 432,
    source: require('../assets/images/img_432.png'),
    },
    {
    id: 433,
    source: require('../assets/images/img_433.png'),
    },
    {
    id: 434,
    source: require('../assets/images/img_434.png'),
    },
    {
    id: 435,
    source: require('../assets/images/img_435.png'),
    },
    {
    id: 436,
    source: require('../assets/images/img_436.png'),
    },
    {
    id: 437,
    source: require('../assets/images/img_437.png'),
    },
    {
    id: 438,
    source: require('../assets/images/img_438.png'),
    },
    {
    id: 439,
    source: require('../assets/images/img_439.png'),
    },
    {
    id: 440,
    source: require('../assets/images/img_440.png'),
    },
    {
    id: 441,
    source: require('../assets/images/img_441.png'),
    },
    {
    id: 442,
    source: require('../assets/images/img_442.png'),
    },
    {
    id: 443,
    source: require('../assets/images/img_443.png'),
    },
    {
    id: 444,
    source: require('../assets/images/img_444.png'),
    },
    {
    id: 445,
    source: require('../assets/images/img_445.png'),
    },
    {
    id: 446,
    source: require('../assets/images/img_446.png'),
    },
    {
    id: 447,
    source: require('../assets/images/img_447.png'),
    },
    {
    id: 448,
    source: require('../assets/images/img_448.png'),
    },
    {
    id: 449,
    source: require('../assets/images/img_449.png'),
    },
    {
    id: 450,
    source: require('../assets/images/img_450.png'),
    },
    {
    id: 451,
    source: require('../assets/images/img_451.png'),
    },
    {
    id: 452,
    source: require('../assets/images/img_452.png'),
    },
    {
    id: 453,
    source: require('../assets/images/img_453.png'),
    },
    {
    id: 454,
    source: require('../assets/images/img_454.png'),
    },
    {
    id: 455,
    source: require('../assets/images/img_455.png'),
    },
    {
    id: 456,
    source: require('../assets/images/img_456.png'),
    },
    {
    id: 457,
    source: require('../assets/images/img_457.png'),
    },
    {
    id: 458,
    source: require('../assets/images/img_458.png'),
    },
    {
    id: 459,
    source: require('../assets/images/img_459.png'),
    },
    {
    id: 460,
    source: require('../assets/images/img_460.png'),
    },
    {
    id: 461,
    source: require('../assets/images/img_461.png'),
    },
    {
    id: 462,
    source: require('../assets/images/img_462.png'),
    },
    {
    id: 463,
    source: require('../assets/images/img_463.png'),
    },
    {
    id: 464,
    source: require('../assets/images/img_464.png'),
    },
    {
    id: 465,
    source: require('../assets/images/img_465.png'),
    },
    {
    id: 466,
    source: require('../assets/images/img_466.png'),
    },
    {
    id: 467,
    source: require('../assets/images/img_467.png'),
    },
    {
    id: 468,
    source: require('../assets/images/img_468.png'),
    },
    {
    id: 469,
    source: require('../assets/images/img_469.png'),
    },
    {
    id: 470,
    source: require('../assets/images/img_470.png'),
    },
    {
    id: 471,
    source: require('../assets/images/img_471.png'),
    },
    {
    id: 472,
    source: require('../assets/images/img_472.png'),
    },
    {
    id: 473,
    source: require('../assets/images/img_473.png'),
    },
    {
    id: 474,
    source: require('../assets/images/img_474.png'),
    },
    {
    id: 475,
    source: require('../assets/images/img_475.png'),
    },
    {
    id: 476,
    source: require('../assets/images/img_476.png'),
    },
    {
    id: 477,
    source: require('../assets/images/img_477.png'),
    },
    {
    id: 478,
    source: require('../assets/images/img_478.png'),
    },
    {
    id: 479,
    source: require('../assets/images/img_479.png'),
    },
    {
    id: 480,
    source: require('../assets/images/img_480.png'),
    },
    {
    id: 481,
    source: require('../assets/images/img_481.png'),
    },
    {
    id: 482,
    source: require('../assets/images/img_482.png'),
    },
    {
    id: 483,
    source: require('../assets/images/img_483.png'),
    },
    {
    id: 484,
    source: require('../assets/images/img_484.png'),
    },
    {
    id: 485,
    source: require('../assets/images/img_485.png'),
    },
    {
    id: 486,
    source: require('../assets/images/img_486.png'),
    },
    {
    id: 487,
    source: require('../assets/images/img_487.png'),
    },
    {
    id: 488,
    source: require('../assets/images/img_488.png'),
    },
    {
    id: 489,
    source: require('../assets/images/img_489.png'),
    },
    {
    id: 490,
    source: require('../assets/images/img_490.png'),
    },
    {
    id: 491,
    source: require('../assets/images/img_491.png'),
    },
    {
    id: 492,
    source: require('../assets/images/img_492.png'),
    },
    {
    id: 493,
    source: require('../assets/images/img_493.png'),
    },
    {
    id: 494,
    source: require('../assets/images/img_494.png'),
    },
    {
    id: 495,
    source: require('../assets/images/img_495.png'),
    },
    {
    id: 496,
    source: require('../assets/images/img_496.png'),
    },
    {
    id: 497,
    source: require('../assets/images/img_497.png'),
    },
    {
    id: 498,
    source: require('../assets/images/img_498.png'),
    },
    {
    id: 499,
    source: require('../assets/images/img_499.png'),
    },
    {
    id: 500,
    source: require('../assets/images/img_500.png'),
    },
    {
    id: 501,
    source: require('../assets/images/img_501.png'),
    },
    {
    id: 502,
    source: require('../assets/images/img_502.png'),
    },
    {
    id: 503,
    source: require('../assets/images/img_503.png'),
    },
    {
    id: 504,
    source: require('../assets/images/img_504.png'),
    },
    {
    id: 505,
    source: require('../assets/images/img_505.png'),
    },
    {
    id: 506,
    source: require('../assets/images/img_506.png'),
    },
    {
    id: 507,
    source: require('../assets/images/img_507.png'),
    },
    {
    id: 508,
    source: require('../assets/images/img_508.png'),
    },
    {
    id: 509,
    source: require('../assets/images/img_509.png'),
    },
    {
    id: 510,
    source: require('../assets/images/img_510.png'),
    },
    {
    id: 511,
    source: require('../assets/images/img_511.png'),
    },
    {
    id: 512,
    source: require('../assets/images/img_512.png'),
    },
    {
    id: 513,
    source: require('../assets/images/img_513.png'),
    },
    {
    id: 514,
    source: require('../assets/images/img_514.png'),
    },
    {
    id: 515,
    source: require('../assets/images/img_515.png'),
    },
    {
    id: 516,
    source: require('../assets/images/img_516.png'),
    },
    {
    id: 517,
    source: require('../assets/images/img_517.png'),
    },
    {
    id: 518,
    source: require('../assets/images/img_518.png'),
    },
    {
    id: 519,
    source: require('../assets/images/img_519.png'),
    },
    {
    id: 520,
    source: require('../assets/images/img_520.png'),
    },
    {
    id: 521,
    source: require('../assets/images/img_521.png'),
    },
    {
    id: 522,
    source: require('../assets/images/img_522.png'),
    },
    {
    id: 523,
    source: require('../assets/images/img_523.png'),
    },
    {
    id: 524,
    source: require('../assets/images/img_524.png'),
    },
    {
    id: 525,
    source: require('../assets/images/img_525.png'),
    },
    {
    id: 526,
    source: require('../assets/images/img_526.png'),
    },
    {
    id: 527,
    source: require('../assets/images/img_527.png'),
    },
    {
    id: 528,
    source: require('../assets/images/img_528.png'),
    },
    {
    id: 529,
    source: require('../assets/images/img_529.png'),
    },
    {
    id: 530,
    source: require('../assets/images/img_530.png'),
    },
    {
    id: 531,
    source: require('../assets/images/img_531.png'),
    },
    {
    id: 532,
    source: require('../assets/images/img_532.png'),
    },
    {
    id: 533,
    source: require('../assets/images/img_533.png'),
    },
    {
    id: 534,
    source: require('../assets/images/img_534.png'),
    },
    {
    id: 535,
    source: require('../assets/images/img_535.png'),
    },
    {
    id: 536,
    source: require('../assets/images/img_536.png'),
    },
    {
    id: 537,
    source: require('../assets/images/img_537.png'),
    },
    {
    id: 538,
    source: require('../assets/images/img_538.png'),
    },
    {
    id: 539,
    source: require('../assets/images/img_539.png'),
    },
    {
    id: 540,
    source: require('../assets/images/img_540.png'),
    },
    {
    id: 541,
    source: require('../assets/images/img_541.png'),
    },
    {
    id: 542,
    source: require('../assets/images/img_542.png'),
    },
    {
    id: 543,
    source: require('../assets/images/img_543.png'),
    },
    {
    id: 544,
    source: require('../assets/images/img_544.png'),
    },
    {
    id: 545,
    source: require('../assets/images/img_545.png'),
    },
    {
    id: 546,
    source: require('../assets/images/img_546.png'),
    },
    {
    id: 547,
    source: require('../assets/images/img_547.png'),
    },
    {
    id: 548,
    source: require('../assets/images/img_548.png'),
    },
    {
    id: 549,
    source: require('../assets/images/img_549.png'),
    },
    {
    id: 550,
    source: require('../assets/images/img_550.png'),
    },
    {
    id: 551,
    source: require('../assets/images/img_551.png'),
    },
    {
    id: 552,
    source: require('../assets/images/img_552.png'),
    },
    {
    id: 553,
    source: require('../assets/images/img_553.png'),
    },
    {
    id: 554,
    source: require('../assets/images/img_554.png'),
    },
    {
    id: 555,
    source: require('../assets/images/img_555.png'),
    },
    {
    id: 556,
    source: require('../assets/images/img_556.png'),
    },
    {
    id: 557,
    source: require('../assets/images/img_557.png'),
    },
    {
    id: 558,
    source: require('../assets/images/img_558.png'),
    },
    {
    id: 559,
    source: require('../assets/images/img_559.png'),
    },
    {
    id: 560,
    source: require('../assets/images/img_560.png'),
    },
    {
    id: 561,
    source: require('../assets/images/img_561.png'),
    },
    {
    id: 562,
    source: require('../assets/images/img_562.png'),
    },
    {
    id: 563,
    source: require('../assets/images/img_563.png'),
    },
    {
    id: 564,
    source: require('../assets/images/img_564.png'),
    },
    {
    id: 565,
    source: require('../assets/images/img_565.png'),
    },
    {
    id: 566,
    source: require('../assets/images/img_566.png'),
    },
    {
    id: 567,
    source: require('../assets/images/img_567.png'),
    },
    {
    id: 568,
    source: require('../assets/images/img_568.png'),
    },
    {
    id: 569,
    source: require('../assets/images/img_569.png'),
    },
    {
    id: 570,
    source: require('../assets/images/img_570.png'),
    },
    {
    id: 571,
    source: require('../assets/images/img_571.png'),
    },
    {
    id: 572,
    source: require('../assets/images/img_572.png'),
    },
    {
    id: 573,
    source: require('../assets/images/img_573.png'),
    },
    {
    id: 574,
    source: require('../assets/images/img_574.png'),
    },
    {
    id: 575,
    source: require('../assets/images/img_575.png'),
    },
    {
    id: 576,
    source: require('../assets/images/img_576.png'),
    },
    {
    id: 577,
    source: require('../assets/images/img_577.png'),
    },
    {
    id: 578,
    source: require('../assets/images/img_578.png'),
    },
    {
    id: 579,
    source: require('../assets/images/img_579.png'),
    },
    {
    id: 580,
    source: require('../assets/images/img_580.png'),
    },
    {
    id: 581,
    source: require('../assets/images/img_581.png'),
    },
    {
    id: 582,
    source: require('../assets/images/img_582.png'),
    },
    {
    id: 583,
    source: require('../assets/images/img_583.png'),
    },
    {
    id: 584,
    source: require('../assets/images/img_584.png'),
    },
    {
    id: 585,
    source: require('../assets/images/img_585.png'),
    },
    {
    id: 586,
    source: require('../assets/images/img_586.png'),
    },
    {
    id: 587,
    source: require('../assets/images/img_587.png'),
    },
    {
    id: 588,
    source: require('../assets/images/img_588.png'),
    },
    {
    id: 589,
    source: require('../assets/images/img_589.png'),
    },
    {
    id: 590,
    source: require('../assets/images/img_590.png'),
    },
    {
    id: 591,
    source: require('../assets/images/img_591.png'),
    },
    {
    id: 592,
    source: require('../assets/images/img_592.png'),
    },
    {
    id: 593,
    source: require('../assets/images/img_593.png'),
    },
    {
    id: 594,
    source: require('../assets/images/img_594.png'),
    },
    {
    id: 595,
    source: require('../assets/images/img_595.png'),
    },
    {
    id: 596,
    source: require('../assets/images/img_596.png'),
    },
    {
    id: 597,
    source: require('../assets/images/img_597.png'),
    },
    {
    id: 598,
    source: require('../assets/images/img_598.png'),
    },
    {
    id: 599,
    source: require('../assets/images/img_599.png'),
    },
    {
    id: 600,
    source: require('../assets/images/img_600.png'),
    },
    {
    id: 601,
    source: require('../assets/images/img_601.png'),
    },
    {
    id: 602,
    source: require('../assets/images/img_602.png'),
    },
    {
    id: 603,
    source: require('../assets/images/img_603.png'),
    },
    {
    id: 604,
    source: require('../assets/images/img_604.png'),
    },
    {
    id: 605,
    source: require('../assets/images/img_605.png'),
    },
    {
    id: 606,
    source: require('../assets/images/img_606.png'),
    },
    {
    id: 607,
    source: require('../assets/images/img_607.png'),
    },
    {
    id: 608,
    source: require('../assets/images/img_608.png'),
    },
    {
    id: 609,
    source: require('../assets/images/img_609.png'),
    },
    {
    id: 610,
    source: require('../assets/images/img_610.png'),
    },
    {
    id: 611,
    source: require('../assets/images/img_611.png'),
    },
    {
    id: 612,
    source: require('../assets/images/img_612.png'),
    },
    {
    id: 613,
    source: require('../assets/images/img_613.png'),
    },
    {
    id: 614,
    source: require('../assets/images/img_614.png'),
    },
    {
    id: 615,
    source: require('../assets/images/img_615.png'),
    },
    {
    id: 616,
    source: require('../assets/images/img_616.png'),
    },
    {
    id: 617,
    source: require('../assets/images/img_617.png'),
    },
    {
    id: 618,
    source: require('../assets/images/img_618.png'),
    },
    {
    id: 619,
    source: require('../assets/images/img_619.png'),
    },
    {
    id: 620,
    source: require('../assets/images/img_620.png'),
    },
    {
    id: 621,
    source: require('../assets/images/img_621.png'),
    },
    {
    id: 622,
    source: require('../assets/images/img_622.png'),
    },
    {
    id: 623,
    source: require('../assets/images/img_623.png'),
    },
    {
    id: 624,
    source: require('../assets/images/img_624.png'),
    },
    {
    id: 625,
    source: require('../assets/images/img_625.png'),
    },
    {
    id: 626,
    source: require('../assets/images/img_626.png'),
    },
    {
    id: 627,
    source: require('../assets/images/img_627.png'),
    },
    {
    id: 628,
    source: require('../assets/images/img_628.png'),
    },
    {
    id: 629,
    source: require('../assets/images/img_629.png'),
    },
    {
    id: 630,
    source: require('../assets/images/img_630.png'),
    },
    {
    id: 631,
    source: require('../assets/images/img_631.png'),
    },
    {
    id: 632,
    source: require('../assets/images/img_632.png'),
    },



]












const QuranViewer = () => {
  const route = useRoute();
  const { imageId = null, juzId = null } = route.params || {};
  const [searchInput, setSearchInput] = useState('');
  const flatListRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // --- State for boxes / highlights ---
  const [boxPositions, setBoxPositions] = useState({});
  const [highlightPositions, setHighlightPositions] = useState({});
  const [isEditingBox, setIsEditingBox] = useState(false);
  const [isEditingHighlight, setIsEditingHighlight] = useState(false);
  const [prevPageId, setPrevPageId] = useState(null);

  // Active highlights (set when box is pressed)
  const [activeHighlights, setActiveHighlights] = useState({
    pageId: null,
    highlightIds: [],
  });

  // --- Save last visible page ---
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      const vi = viewableItems[0];
      AsyncStorage.setItem(LAST_PAGE_KEY, JSON.stringify({ id: vi.item.id }));
    }
  }, []);

  const handleScrollEnd = async (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (images[index]) {
      await AsyncStorage.setItem(LAST_PAGE_KEY, JSON.stringify({ id: images[index].id }));
    }
  };

  const getIndexById = useCallback(
    (pageId) => images.findIndex((img) => img.id === pageId),
    []
  );

  const scrollToPage = (pageId, highlightIds = []) => {
    const index = getIndexById(pageId);
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: ITEM_HEIGHT * index, animated: true });
      setActiveHighlights({ pageId, highlightIds });
      setTimeout(() => {
        setActiveHighlights({ pageId: null, highlightIds: [] });
      }, 8000);
    }
  };

  useEffect(() => {
    const targetId = imageId ?? juzId;
    if (targetId !== null && flatListRef.current) {
      const index = images.findIndex((img) => img.id === targetId);
      if (index !== -1) {
        setTimeout(() => flatListRef.current.scrollToIndex({ index, animated: true }), 500);
      }
    }
  }, [imageId, juzId]);

  useEffect(() => {
    const boxPos = {};
    const highlightPos = {};
    pageData.forEach((page) => {
      (page.boxes || []).forEach((box) => {
        boxPos[box.id] = { x: box.x, y: box.y };
      });
      (page.highlights || []).forEach((hl) => {
        highlightPos[hl.id] = { x: hl.x, y: hl.y };
      });
    });
    setBoxPositions(boxPos);
    setHighlightPositions(highlightPos);
  }, []);

  const handleSearch = () => {
    const targetId = parseInt(searchInput);
    if (isNaN(targetId)) {
      Alert.alert('Invalid Input', 'Please enter a valid page ID');
      return;
    }
    const index = images.findIndex((img) => img.id === targetId);
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setPrevPageId(null);
      
    } else {
      Alert.alert('Not Found', `No page found with ID ${targetId}`);
    }
  };

  // --- Renderers ---
  const renderDraggableBox = (pageId, box) => {
    const boxKey = box.id;
    const position = boxPositions?.[boxKey] || { x: 100, y: 100 };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => isEditingBox,
      onPanResponderMove: (_, gesture) => {
        if (!isEditingBox) return;
        setBoxPositions((prev) => ({
          ...prev,
          [boxKey]: { x: position.x + gesture.dx, y: position.y + gesture.dy },
        }));
      },
    });

    return (
      <View
        key={`box-${boxKey}`}
        style={[
          styles.box,
          { left: position.x, top: position.y, borderColor: isEditingBox ? 'blue' : 'black' },
        ]}
        {...(isEditingBox ? panResponder.panHandlers : {})}
      >
        {isEditingBox ? (
          <Text style={styles.boxText}>{box.targetPage}</Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setPrevPageId(pageId);
              scrollToPage(box.targetPage, box.highlightIds || []);
            }}
            style={styles.touchable}
          />
        )}  
      </View>
    );
  };

  const renderHighlightLine = (pageId, hl) => {
    const hlKey = hl.id;
    const position = highlightPositions[hlKey] || { x: 30, y: 150 };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => isEditingHighlight,
      onPanResponderMove: (_, gesture) => {
        setHighlightPositions((prev) => ({
          ...prev,
          [hlKey]: { x: position.x + gesture.dx, y: position.y + gesture.dy },
        }));
      },
    });

    const isActive =
      activeHighlights.pageId === pageId && activeHighlights.highlightIds.includes(hl.id);

    if (!isEditingHighlight && !isActive) return null;

    return (
      <View
        key={`hl-${hlKey}`}
        style={[
          styles.highlight,
          {
            left: position.x,
            top: position.y,
            borderColor: isEditingHighlight ? 'red' : 'yellow',
            backgroundColor: isActive ? 'yellow' : 'transparent',
            opacity: isActive ? 0.4 : 0.2,
           
          },
        ]}
        {...(isEditingHighlight ? panResponder.panHandlers : {})}
      />
    );
  };

  const renderBackButton = (currentPageId) =>
    prevPageId && currentPageId !== prevPageId ? (
      <TouchableOpacity
        onPress={() => {
          scrollToPage(prevPageId);
          setPrevPageId(null);
        }}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    ) : null;


  const renderItem = ({ item }) => {
  const pageId = item.id;
  const pageDataEntry = pageData.find((p) => p.id === item.id) || {};
  const boxList = pageDataEntry.boxes || [];
  const highlightList = pageDataEntry.highlights || [];

  return (
    <View style={{ height: ITEM_HEIGHT, alignItems: 'center' }}>
      <View style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}>
        <Image source={item.source} style={styles.image} resizeMode="contain" />
        {boxList.map((box) => renderDraggableBox(pageId, box))}
        {highlightList.map((hl) => renderHighlightLine(pageId, hl))}
        {renderBackButton(pageId)}
      </View>
    </View>
  );
};

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter page ID"
            value={searchInput}
            onChangeText={setSearchInput}
            keyboardType="numeric"
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} activeOpacity={0.7}>
            <Text style={styles.searchButtonText}>Go</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={7}
        scrollEventThrottle={16}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        onViewableItemsChanged={onViewableItemsChanged}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEnabled={!isZoomed}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginTop: 15,
  },
  searchLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchable: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#7e857eff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  box: {
    position: 'absolute',
    width: 28,
    height: 12,
    fontSize: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
  },
  highlight: { 
    position: 'absolute',
    width: 235,
    height: 27,
    borderWidth: 2,
    opacity: 0.3,
    backgroundColor: 'yellow',
  },
  boxText: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 12,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 6,
    opacity: 0.8,
  },
  backText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default QuranViewer;