import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { saveProfileData } from '../lib/profileStorage';

const COLORS = {
  background: '#101310',
  card: '#1B201B',
  primary: '#C6FF4D',
  white: '#FFFFFF',
  muted: '#92998F',
  border: '#30372E',
};

const goals = [
  {
    id: 'muscle',
    icon: '💪',
    title: 'Build Muscle',
    description: 'Increase muscle mass and develop strength.',
  },
  {
    id: 'fat',
    icon: '🔥',
    title: 'Lose Fat',
    description: 'Reduce body fat and improve body composition.',
  },
  {
    id: 'maintain',
    icon: '⚖️',
    title: 'Maintain Weight',
    description: 'Maintain your current weight and stay healthy.',
  },
  {
    id: 'fitness',
    icon: '🏃',
    title: 'General Fitness',
    description: 'Improve overall health and physical fitness.',
  },
  {
    id: 'endurance',
    icon: '❤️',
    title: 'Improve Endurance',
    description: 'Build stamina and cardiovascular fitness.',
  },
];

export default function FitnessGoalsScreen() {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (!selectedGoal) {
      Alert.alert(
        'Choose your goal',
        'Please select a fitness goal to continue.',
      );
      return;
    }

    try {
      setSaving(true);

      await saveProfileData({
        goal: selectedGoal,
      });

      router.push('/experience');
    } catch (error) {
      Alert.alert(
        'Saving failed',
        'Your fitness goal could not be saved. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>
          FIT<Text style={styles.logoAccent}>ZY.</Text>
        </Text>

        <View style={styles.progressRow}>
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
        </View>

        <Text style={styles.step}>STEP 03 OF 06</Text>

        <Text style={styles.heading}>
          What do you
          {'\n'}
          <Text style={styles.headingAccent}>want to achieve?</Text>
        </Text>

        <Text style={styles.description}>
          Choose the primary goal you want FITZY
          to help you work towards.
        </Text>

        <View style={styles.goalContainer}>
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal.id;

            return (
              <Pressable
                key={goal.id}
                onPress={() => setSelectedGoal(goal.id)}
                style={[
                  styles.goalCard,
                  isSelected && styles.goalSelected,
                ]}
              >
                <Text style={styles.goalIcon}>
                  {goal.icon}
                </Text>

                <View style={styles.goalContent}>
                  <Text style={styles.goalTitle}>
                    {goal.title}
                  </Text>

                  <Text style={styles.goalDescription}>
                    {goal.description}
                  </Text>
                </View>

                <View
                  style={[
                    styles.radio,
                    isSelected && styles.radioSelected,
                  ]}
                >
                  {isSelected && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>✦</Text>

          <Text style={styles.infoText}>
            Your goal can be changed anytime.
            FITZY will use it to personalize your fitness journey.
          </Text>
        </View>

        <Pressable
          style={[styles.button, saving && styles.disabledButton]}
          onPress={handleContinue}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {saving ? 'SAVING...' : 'CONTINUE →'}
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          YOUR FITNESS. YOUR FUTURE.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 35,
  },

  logo: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: 2,
  },

  logoAccent: {
    color: COLORS.primary,
  },

  progressRow: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 30,
  },

  progressActive: {
    flex: 1,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  step: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 35,
  },

  heading: {
    color: COLORS.white,
    fontSize: 31,
    fontWeight: '900',
    marginTop: 12,
    lineHeight: 40,
  },

  headingAccent: {
    color: COLORS.primary,
  },

  description: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 12,
    marginBottom: 25,
  },

  goalContainer: {
    gap: 12,
  },

  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    gap: 13,
  },

  goalSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#222B1B',
  },

  goalIcon: {
    fontSize: 27,
  },

  goalContent: {
    flex: 1,
  },

  goalTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },

  goalDescription: {
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 16,
    marginTop: 5,
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.muted,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioSelected: {
    borderColor: COLORS.primary,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 13,
    padding: 15,
    marginTop: 25,
    gap: 12,
    alignItems: 'center',
  },

  infoIcon: {
    color: COLORS.primary,
    fontSize: 22,
  },

  infoText: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 18,
    flex: 1,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 28,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  footer: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 25,
  },
});