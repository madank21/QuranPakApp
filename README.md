# QuranPak — Futuristic Quran Reader

<div align="center">
  <h3>✨ A neon-space reading experience for the Holy Quran</h3>
  <p>
    Navigate by <b>Surah</b> & <b>Para</b>, open any page instantly, and interact with visual
    highlights that stay aligned while you zoom.
  </p>
</div>

---

## Preview Vibe (What you’ll feel)
- **Deep-space UI** with glow gradients and sci‑fi typography.
- **Instant navigation**: jump by ID, Surah, or Para.
- **Gesture-first reader**: pinch zoom powered by Reanimated + Gesture Handler.
- **Interactive overlays**: boxes & highlights are rendered on top of page images.
- **Last-page memory**: remembers where you left off.

---

## Features
- **Home**
  - Entry hub to Quran Viewer / Surah Index / Para Index.
- **Surah Index (114 Surahs)**
  - Search by English name, Arabic name, or number.
  - Tap to open the corresponding page.
- **Para Index (30 Paras / Juz)**
  - Search by number or names.
  - Tap to open the corresponding page.
- **Quran Viewer (Pages 1–604+)**
  - **Jump search**: enter a page ID (numeric).
  - **Pinch zoom**: zoom between 1x and 3x.
  - **Boxes & highlights overlay**
    - Boxes represent tappable elements pointing to target pages.
    - Highlights can activate to guide reading.
  - **Back navigation**
    - Returns to the previous selected page.
  - **Persistence**
    - Stores the last viewed page in `AsyncStorage`.

---

## Tech Stack
- **Expo** (React Native)
- **React Navigation** (native stack)
- **react-native-gesture-handler**
- **react-native-reanimated**
- **expo-linear-gradient** for futuristic glow backgrounds
- **expo-blur** (used in some screens)
- **AsyncStorage** for last page persistence

---

## Key Files
- `App.js`
  - Defines the navigation stack:
    - `Home` → `HomeScreen`
    - `SurahIndex` → `SurahIndex`
    - `ParaIndex` → `ParaIndex`
    - `QuranViewer` → `QuranViewer`

- `src/screens/`
  - `HomeScreen.js`
  - `SurahIndex.js`
  - `ParaIndex.js`
  - `QuranViewer.js`

- `src/assets/`
  - `pageData.json`
    - Drives overlay rendering (boxes + highlights coordinates per page)
  - `images/img_*.png`
    - Quran page images used by the viewer

---

## Project Structure (How it’s organized)
```text
src/
  screens/
    HomeScreen.js
    SurahIndex.js
    ParaIndex.js
    QuranViewer.js
    Settings.js (not currently wired in navigation)
  styles/
    appStyles.js
  assets/
    pageData.json
    bg.png
    images/
      img_1.png ... img_624.png (page images)
```

---

## How Overlay Alignment Works (Important)
The viewer uses `pageData.json` to place:
- **Boxes** (interactive targets to other pages)
- **Highlights** (guided emphasis)

The overlay coordinates are scaled to match the on-device rendered image size.

---

## Getting Started
### 1) Install dependencies
```bash
npm install
```

### 2) Run the app
```bash
npm start
```

Then use:
- `a` for Android
- `i` for iOS
- `w` for Web (Expo)

---

## Developer Notes / Tuning
- **Viewer performance**
  - `FlatList` is optimized using `initialNumToRender`, `maxToRenderPerBatch`, and `windowSize`.
  - Images are rendered as a vertical list for fast page-to-page access.

- **Gesture tuning**
  - Current pinch zoom clamps scale to keep overlays meaningful.

---

## Roadmap (From TODO)
See `TODO.md` for next planned improvements (reader zoom & cleanup items).

---

## License
This project uses the repo’s existing licensing (`0BSD` as indicated in `package.json`).

