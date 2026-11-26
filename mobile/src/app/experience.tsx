import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { saveProfileData } from '../lib/profileStorage';


const COLORS = {
  background: '#101310',
  card: '#1B201B',
  cardLight: '#242B23',
  primary: '#C6FF4D',
  white: '#FFFFFF',
  muted: '#92998F',
  border: '#30382E',
};

const levels = [
  {
    id: 'beginner',
    title: 'Beginner',
    subtitle: 'I am new to fitness or getting back into it.',
    duration: '0–6 months',
    icon: '🌱',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    subtitle: 'I exercise regularly and understand the basics.',
    duration: '6 months–2 years',
    icon: '💪',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    subtitle: 'I have years of consistent training experience.',
    duration: '2+ years',
    icon: '🔥',
  },
];

export default function ExperienceScreen() {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (!selectedLevel) {
      Alert.alert(
        'Select your level',
        'Please choose your fitness experience.',
      );
      return;
    }

    try {
      setSaving(true);

      await saveProfileData({
        experience: selectedLevel,
      });

      router.push('/workout-preference');
    } catch (error) {
      Alert.alert(
        'Saving failed',
        'Your experience level could not be saved. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/fitness-goals');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backText}>‹  Back</Text>
        </Pressable>

        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>STEP 04 OF 06</Text>
        </View>

        <Text style={styles.eyebrow}>YOUR FITNESS JOURNEY</Text>

        <Text style={styles.title}>
          What's your{'\n'}
          <Text style={styles.highlight}>experience level?</Text>
        </Text>

        <Text style={styles.description}>
          We'll adjust your workouts and recommendations according to your
          experience.
        </Text>

        <View style={styles.optionsContainer}>
          {levels.map((level) => {
            const isSelected = selectedLevel === level.id;

            return (
              <Pressable
                key={level.id}
                onPress={() => setSelectedLevel(level.id)}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedCard,
                ]}
              >
                <View style={styles.optionTop}>
                  <Text style={styles.icon}>{level.icon}</Text>

                  <View
                    style={[
                      styles.radio,
                      isSelected && styles.selectedRadio,
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </View>

                <Text style={styles.optionTitle}>{level.title}</Text>
                <Text style={styles.optionSubtitle}>
                  {level.subtitle}
                </Text>
                <Text style={styles.duration}>{level.duration}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.bottomSection}>
          <Pressable
            style={[
              styles.continueButton,
              saving && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={saving}
          >
            <Text style={styles.continueText}>
              {saving ? 'SAVING...' : 'CONTINUE'}
            </Text>
            <Text style={styles.arrow}>→</Text>
          </Pressable>

          <Text style={styles.footerText}>
            YOUR PLAN WILL ADAPT AS YOU PROGRESS
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 20,
  },
  backText: {
    color: COLORS.muted,
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressTrack: {
    height: 5,
    backgroundColor: COLORS.cardLight,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    width: '66%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  progressText: {
    color: COLORS.muted,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '700',
    marginTop: 10,
  },
  eyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '900',
    marginBottom: 12,
  },
  highlight: {
    color: COLORS.primary,
  },
  description: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 25,
  },
  optionsContainer: {
    gap: 13,
  },
  optionCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 17,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: '#20291A',
  },
  optionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 25,
  },
  radio: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  optionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 5,
  },
  optionSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  duration: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 10,
  },
  bottomSection: {
    marginTop: 'auto',
    paddingTop: 25,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 17,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabledButton: {
    opacity: 0.6,
  },
  continueText: {
    color: '#101310',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  arrow: {
    color: '#101310',
    fontSize: 22,
    fontWeight: '800',
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 9,
    letterSpacing: 1.3,
    textAlign: 'center',
    marginTop: 15,
  },
});