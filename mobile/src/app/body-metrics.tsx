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

export default function BodyMetricsScreen() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    const h = Number(height);
    const w = Number(weight);
    const target = Number(targetWeight);

    if (!height || !weight) {
      Alert.alert(
        'Missing information',
        'Please enter your height and weight.',
      );
      return;
    }

    if (!Number.isFinite(h) || h < 100 || h > 250) {
      Alert.alert(
        'Invalid height',
        'Enter a height between 100 and 250 cm.',
      );
      return;
    }

    if (!Number.isFinite(w) || w < 25 || w > 300) {
      Alert.alert(
        'Invalid weight',
        'Enter a weight between 25 and 300 kg.',
      );
      return;
    }

    if (
      targetWeight &&
      (!Number.isFinite(target) || target < 25 || target > 300)
    ) {
      Alert.alert(
        'Invalid target weight',
        'Enter a target between 25 and 300 kg.',
      );
      return;
    }

    try {
      setSaving(true);

      await saveProfileData({
        height,
        currentWeight: weight,
        targetWeight,
      });

      router.push('/fitness-goals');
    } catch (error) {
      Alert.alert(
        'Saving failed',
        'Your measurements could not be saved. Please try again.',
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
          <View style={styles.progressInactive} />
        </View>

        <Text style={styles.step}>STEP 02 OF 06</Text>

        <Text style={styles.heading}>
          Understand your
          {'\n'}
          <Text style={styles.headingAccent}>starting point.</Text>
        </Text>

        <Text style={styles.description}>
          Your measurements help us build a fitness
          experience around your body and goals.
        </Text>

        <Text style={styles.label}>HEIGHT</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter height"
            placeholderTextColor={COLORS.muted}
            value={height}
            onChangeText={setHeight}
            keyboardType="decimal-pad"
          />
          <Text style={styles.unit}>CM</Text>
        </View>

        <Text style={styles.label}>CURRENT WEIGHT</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter weight"
            placeholderTextColor={COLORS.muted}
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
          />
          <Text style={styles.unit}>KG</Text>
        </View>

        <Text style={styles.label}>TARGET WEIGHT (OPTIONAL)</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter target weight"
            placeholderTextColor={COLORS.muted}
            value={targetWeight}
            onChangeText={setTargetWeight}
            keyboardType="decimal-pad"
          />
          <Text style={styles.unit}>KG</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>✦</Text>
          <Text style={styles.infoText}>
            Your measurements remain editable.
            You can update them as your fitness journey progresses.
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

  progressInactive: {
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

  label: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 11,
    marginTop: 21,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    color: COLORS.white,
    paddingVertical: 16,
    fontSize: 15,
  },

  unit: {
    color: COLORS.primary,
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1,
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