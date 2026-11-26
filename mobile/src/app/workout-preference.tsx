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

const frequencies = [
  { id: '2-3', title: '2–3 days', subtitle: 'A relaxed routine' },
  { id: '4-5', title: '4–5 days', subtitle: 'A balanced routine' },
  { id: '6-7', title: '6–7 days', subtitle: 'A highly active routine' },
];

const workoutTypes = [
  { id: 'strength', title: 'Strength Training', icon: '🏋️' },
  { id: 'cardio', title: 'Cardio & Running', icon: '🏃' },
  { id: 'balanced', title: 'A Mix of Everything', icon: '⚡' },
];

export default function WorkoutPreferencesScreen() {
  const [frequency, setFrequency] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [saving, setSaving] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/experience');
    }
  };

  const handleContinue = async () => {
    if (!frequency || !workoutType) {
      Alert.alert(
        'Almost there!',
        'Please select your training frequency and workout preference.',
      );
      return;
    }

    try {
      setSaving(true);

      await saveProfileData({
        frequency,
        workoutType,
      });

      router.push('/profile-summary');
    } catch (error) {
      Alert.alert(
        'Saving failed',
        'Your workout preferences could not be saved. Please try again.',
      );
    } finally {
      setSaving(false);
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
          <Text style={styles.progressText}>STEP 05 OF 06</Text>
        </View>

        <Text style={styles.eyebrow}>BUILD YOUR ROUTINE</Text>

        <Text style={styles.title}>
          Make fitness{'\n'}
          <Text style={styles.highlight}>fit your lifestyle.</Text>
        </Text>

        <Text style={styles.description}>
          Tell us about your preferred training routine. FITZY will use this
          to personalise your fitness plan.
        </Text>

        <Text style={styles.sectionTitle}>HOW OFTEN CAN YOU TRAIN?</Text>

        <View style={styles.frequencyContainer}>
          {frequencies.map((item) => {
            const selected = frequency === item.id;

            return (
              <Pressable
                key={item.id}
                onPress={() => setFrequency(item.id)}
                style={[
                  styles.frequencyCard,
                  selected && styles.selectedCard,
                ]}
              >
                <View style={styles.frequencyTop}>
                  <Text style={styles.frequencyTitle}>{item.title}</Text>

                  <View style={[styles.radio, selected && styles.selectedRadio]}>
                    {selected && <View style={styles.radioInner} />}
                  </View>
                </View>

                <Text style={styles.frequencySubtitle}>
                  {item.subtitle}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>WHAT DO YOU ENJOY?</Text>

        <View style={styles.typeContainer}>
          {workoutTypes.map((item) => {
            const selected = workoutType === item.id;

            return (
              <Pressable
                key={item.id}
                onPress={() => setWorkoutType(item.id)}
                style={[
                  styles.typeCard,
                  selected && styles.selectedCard,
                ]}
              >
                <Text style={styles.typeIcon}>{item.icon}</Text>
                <Text style={styles.typeTitle}>{item.title}</Text>

                <View style={[styles.radio, selected && styles.selectedRadio]}>
                  {selected && <View style={styles.radioInner} />}
                </View>
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
            YOUR ROUTINE. YOUR PACE. YOUR PROGRESS.
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
    marginBottom: 15,
  },
  backText: {
    color: COLORS.muted,
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 25,
  },
  progressTrack: {
    height: 5,
    backgroundColor: COLORS.cardLight,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    width: '83%',
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
    marginBottom: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '900',
    marginBottom: 10,
  },
  highlight: {
    color: COLORS.primary,
  },
  description: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 22,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.3,
    marginBottom: 11,
    marginTop: 5,
  },
  frequencyContainer: {
    gap: 9,
    marginBottom: 20,
  },
  frequencyCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 13,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: '#20291A',
  },
  frequencyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frequencyTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  frequencySubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },
  radio: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  typeContainer: {
    gap: 9,
  },
  typeCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    fontSize: 21,
    marginRight: 13,
  },
  typeTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  bottomSection: {
    marginTop: 'auto',
    paddingTop: 20,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
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
    letterSpacing: 1.1,
    textAlign: 'center',
    marginTop: 13,
  },
});