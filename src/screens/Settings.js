
// SettingsScreen.jsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [translation, setTranslation] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [vibration, setVibration] = useState(false);

  const SettingRow = ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
    iconType = "Ionicons",
  }) => {
    const IconPack =
      iconType === "Feather"
        ? Feather
        : iconType === "Material"
        ? MaterialCommunityIcons
        : Ionicons;

    return (
      <View style={styles.settingRow}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <IconPack name={icon} size={22} color="#ffffff" />
          </View>

          <View>
            <Text style={styles.settingTitle}>{title}</Text>
            {subtitle && (
              <Text style={styles.settingSubtitle}>{subtitle}</Text>
            )}
          </View>
        </View>

        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: "#4f7d5f",
            true: "#6eff9d",
          }}
          thumbColor={value ? "#ffffff" : "#d9d9d9"}
        />
      </View>
    );
  };

  const MenuButton = ({
    icon,
    title,
    subtitle,
    iconType = "Ionicons",
  }) => {
    const IconPack =
      iconType === "Feather"
        ? Feather
        : iconType === "Material"
        ? MaterialCommunityIcons
        : Ionicons;

    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.menuButton}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <IconPack name={icon} size={22} color="#ffffff" />
          </View>

          <View>
            <Text style={styles.settingTitle}>{title}</Text>
            {subtitle && (
              <Text style={styles.settingSubtitle}>{subtitle}</Text>
            )}
          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#b8ffce"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>
          Customize your Islamic experience
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* Appearance */}
        <Text style={styles.sectionTitle}>Appearance</Text>

        <SettingRow
          icon="moon"
          title="Dark Mode"
          subtitle="Enable dark Islamic theme"
          value={darkMode}
          onValueChange={setDarkMode}
        />

        <SettingRow
          icon="sparkles"
          title="Animations"
          subtitle="Enable smooth UI animations"
          value={animations}
          onValueChange={setAnimations}
          iconType="Material"
        />

        {/* Quran Reading */}
        <Text style={styles.sectionTitle}>Quran Reading</Text>

        <SettingRow
          icon="book"
          title="Show Translation"
          subtitle="Display translation with Arabic"
          value={translation}
          onValueChange={setTranslation}
        />

        <MenuButton
          icon="text"
          title="Arabic Font Size"
          subtitle="Adjust Quran font size"
          iconType="Feather"
        />

        <MenuButton
          icon="language"
          title="App Language"
          subtitle="English, Urdu, Arabic"
        />

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>

        <SettingRow
          icon="notifications"
          title="Prayer Notifications"
          subtitle="Receive prayer reminders"
          value={notifications}
          onValueChange={setNotifications}
        />

        <SettingRow
          icon="phone-vibrate"
          title="Vibration"
          subtitle="Enable vibration feedback"
          value={vibration}
          onValueChange={setVibration}
          iconType="Material"
        />

        {/* Audio */}
        <Text style={styles.sectionTitle}>Audio</Text>

        <MenuButton
          icon="play-circle"
          title="Reciter Selection"
          subtitle="Choose your favorite reciter"
          iconType="Feather"
        />

        <MenuButton
          icon="musical-notes"
          title="Audio Settings"
          subtitle="Playback speed and quality"
        />

        {/* Data */}
        <Text style={styles.sectionTitle}>Data & Storage</Text>

        <MenuButton
          icon="bookmark"
          title="Bookmarks"
          subtitle="Manage saved ayahs"
        />

        <MenuButton
          icon="trash-2"
          title="Clear Cache"
          subtitle="Free app storage"
          iconType="Feather"
        />

        {/* About */}
        <Text style={styles.sectionTitle}>About</Text>

        <MenuButton
          icon="information-circle"
          title="About App"
          subtitle="Version and information"
        />

        <MenuButton
          icon="share-social"
          title="Share App"
          subtitle="Invite friends and family"
        />

        <MenuButton
          icon="star"
          title="Rate App"
          subtitle="Support our application"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01963f",
    paddingHorizontal: 18,
    paddingTop: 60,
  },

  header: {
    marginBottom: 28,
  },

  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#ffffff",
  },

  headerSubtitle: {
    fontSize: 15,
    color: "#d9ffe6",
    marginTop: 4,
  },

  sectionTitle: {
    color: "#b8ffce",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 14,
    marginLeft: 4,
  },

  settingRow: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  menuButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  settingTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  settingSubtitle: {
    color: "#caffd9",
    fontSize: 13,
    marginTop: 2,
  },
});

