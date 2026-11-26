import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const COLORS = {
  background: '#101310',
  card: '#1B201B',
  primary: '#C6FF4D',
  white: '#FFFFFF',
  muted: '#92998F',
  border: '#30372E',
};

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>

        {/* BRAND */}
        <View style={styles.brand}>
          <Text style={styles.logo}>
            FIT<Text style={styles.logoAccent}>ZY.</Text>
          </Text>
          <Text style={styles.tagline}>
            YOUR FITNESS. YOUR FUTURE.
          </Text>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroCircle}>
            <Text style={styles.heroIcon}>⚡</Text>
          </View>

          <Text style={styles.eyebrow}>
            YOUR JOURNEY STARTS HERE
          </Text>

          <Text style={styles.heading}>
            BUILD YOUR
            {'\n'}
            <Text style={styles.headingAccent}>STRONGER</Text>
            {'\n'}
            SELF.
          </Text>

          <Text style={styles.description}>
            A smarter approach to fitness.
            Personalized workouts, nutrition insights
            and progress tracking — all in one place.
          </Text>
        </View>

        {/* FEATURES */}
        <View style={styles.features}>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🏋️</Text>
            <Text style={styles.featureText}>SMART WORKOUTS</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🥗</Text>
            <Text style={styles.featureText}>SMART NUTRITION</Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📈</Text>
            <Text style={styles.featureText}>TRACK PROGRESS</Text>
          </View>

        </View>

        {/* BOTTOM */}
        <View style={styles.bottom}>

          <View style={styles.progressRow}>
            <View style={styles.progressActive} />
            <View style={styles.progressInactive} />
            <View style={styles.progressInactive} />
          </View>

          <Pressable
            style={styles.button}
            onPress={() => router.push('/profile-setup')}
          >
            <Text style={styles.buttonText}>
              GET STARTED  →
            </Text>
          </Pressable>

          <Text style={styles.footer}>
            BUILT FOR A STRONGER YOU.
          </Text>

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    paddingVertical: 25,
  },

  brand: {
    alignItems: 'flex-start',
  },

  logo: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 3,
  },

  logoAccent: {
    color: COLORS.primary,
  },

  tagline: {
    color: COLORS.muted,
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 4,
  },

  hero: {
    alignItems: 'center',
  },

  heroCircle: {
    width: 105,
    height: 105,
    borderRadius: 35,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  heroIcon: {
    fontSize: 48,
    color: COLORS.primary,
  },

  eyebrow: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 15,
  },

  heading: {
    color: COLORS.white,
    fontSize: 39,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 47,
    letterSpacing: -1,
  },

  headingAccent: {
    color: COLORS.primary,
  },

  description: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 20,
    maxWidth: 310,
  },

  features: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 15,
  },

  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },

  featureIcon: {
    fontSize: 19,
  },

  featureText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },

  bottom: {
    alignItems: 'center',
    gap: 18,
  },

  progressRow: {
    flexDirection: 'row',
    gap: 7,
  },

  progressActive: {
    width: 30,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  progressInactive: {
    width: 12,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.border,
  },

  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  footer: {
    color: COLORS.muted,
    fontSize: 9,
    letterSpacing: 2,
  },
});