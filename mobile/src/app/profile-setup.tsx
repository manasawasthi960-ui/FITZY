import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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

export default function ProfileSetupScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert('Missing information', 'Please enter your name.');
      return;
    }

    const userAge = Number(age);

    if (!Number.isInteger(userAge) || userAge < 13 || userAge > 100) {
      Alert.alert(
        'Invalid age',
        'Please enter a valid age between 13 and 100.',
      );
      return;
    }

    try {
      setSaving(true);

      await saveProfileData({
        name: name.trim(),
        age,
        gender,
      });

      router.push('/body-metrics');
    } catch (error) {
      Alert.alert(
        'Saving failed',
        'Your details could not be saved. Please try again.',
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
          <View style={styles.activeProgress} />
          <View style={styles.inactiveProgress} />
          <View style={styles.inactiveProgress} />
        </View>

        <Text style={styles.step}>STEP 01 OF 06</Text>

        <Text style={styles.heading}>
          Let's get to
          {'\n'}
          <Text style={styles.headingAccent}>know you.</Text>
        </Text>

        <Text style={styles.description}>
          Every fitness journey is different.
          Tell us a little about yourself so we
          can personalize your experience.
        </Text>

        <Text style={styles.label}>FULL NAME</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.muted}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          maxLength={60}
        />

        <Text style={styles.label}>YOUR AGE</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          placeholderTextColor={COLORS.muted}
          value={age}
          onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ''))}
          keyboardType="number-pad"
          maxLength={3}
        />

        <Text style={styles.label}>GENDER (OPTIONAL)</Text>

        <View style={styles.genderContainer}>
          {['Male', 'Female', 'Other'].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.genderButton,
                gender === item && styles.genderSelected,
              ]}
              onPress={() => setGender(gender === item ? '' : item)}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === item && styles.genderTextSelected,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>✦</Text>
          <Text style={styles.infoText}>
            Your information helps FITZY personalize
            your fitness experience.
          </Text>
        </View>

        <Pressable
          style={[
            styles.continueButton,
            saving && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={saving}
        >
          <Text style={styles.continueText}>
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

  activeProgress: {
    flex: 1,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  inactiveProgress: {
    flex: 1,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.border,
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
    fontSize: 35,
    fontWeight: '900',
    marginTop: 12,
    lineHeight: 43,
  },

  headingAccent: {
    color: COLORS.primary,
  },

  description: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 12,
    marginBottom: 30,
  },

  label: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 11,
    marginTop: 20,
  },

  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: COLORS.white,
    fontSize: 14,
  },

  genderContainer: {
    flexDirection: 'row',
    gap: 9,
  },

  genderButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },

  genderSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#344226',
  },

  genderText: {
    color: COLORS.muted,
    fontWeight: '700',
    fontSize: 12,
  },

  genderTextSelected: {
    color: COLORS.primary,
  },

  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 13,
    padding: 15,
    marginTop: 28,
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

  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 28,
  },

  disabledButton: {
    opacity: 0.6,
  },

  continueText: {
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