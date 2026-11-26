import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { router } from 'expo-router';
import {
  getProfileData,
  saveProfileData,
  FitnessProfile,
} from '../lib/profileStorage';

import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#101310',
  card: '#1B201B',
  cardLight: '#242B23',
  primary: '#C6FF4D',
  white: '#FFFFFF',
  muted: '#92998F',
  border: '#30382E',
};

const goalLabels: Record<string, string> = {
  muscle: 'Build Muscle',
  fat: 'Lose Fat',
  maintain: 'Maintain Weight',
  fitness: 'General Fitness',
  endurance: 'Improve Endurance',
};

const experienceLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const frequencyLabels: Record<string, string> = {
  '2-3': '2–3 days per week',
  '4-5': '4–5 days per week',
  '6-7': '6–7 days per week',
};

const workoutLabels: Record<string, string> = {
  strength: 'Strength Training',
  cardio: 'Cardio & Running',
  balanced: 'A Mix of Everything',
};

export default function ProfileSummaryScreen() {
  const [profile, setProfile] = useState<FitnessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await getProfileData();
      setProfile(savedProfile);
    } catch (error) {
      Alert.alert(
        'Unable to load profile',
        'Your saved information could not be loaded.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    try {
      setSaving(true);

      await saveProfileData({
        onboardingCompleted: true,
      });

      router.replace('/');
    } catch (error) {
      Alert.alert(
        'Unable to complete',
        'Your profile could not be saved. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  const profileSections = [
    {
      title: 'PERSONAL DETAILS',
      items: [
        { label: 'Name', value: profile?.name || 'Not provided' },
        { label: 'Age', value: profile?.age ? `${profile.age} years` : 'Not provided' },
        { label: 'Gender', value: profile?.gender || 'Not specified' },
      ],
    },
    {
      title: 'BODY METRICS',
      items: [
        { label: 'Height', value: profile?.height ? `${profile.height} cm` : 'Not provided' },
        {
          label: 'Current weight',
          value: profile?.currentWeight
            ? `${profile.currentWeight} kg`
            : 'Not provided',
        },
        {
          label: 'Target weight',
          value: profile?.targetWeight
            ? `${profile.targetWeight} kg`
            : 'Not specified',
        },
      ],
    },
    {
      title: 'FITNESS PROFILE',
      items: [
        {
          label: 'Primary goal',
          value: goalLabels[profile?.goal || ''] || 'Not selected',
        },
        {
          label: 'Experience',
          value: experienceLabels[profile?.experience || ''] || 'Not selected',
        },
        {
          label: 'Training frequency',
          value: frequencyLabels[profile?.frequency || ''] || 'Not selected',
        },
        {
          label: 'Workout preference',
          value: workoutLabels[profile?.workoutType || ''] || 'Not selected',
        },
      ],
    },
  ];

  const handleBack = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/workout-preference');
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>LOADING YOUR PROFILE...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backText}>‹  Back</Text>
          </Pressable>

          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.progressText}>
              STEP 06 OF 06 · FINAL STEP
            </Text>
          </View>

          <Text style={styles.eyebrow}>READY TO BEGIN?</Text>

          <Text style={styles.title}>
            Your fitness{'\n'}
            <Text style={styles.highlight}>journey starts here.</Text>
          </Text>

          <Text style={styles.description}>
            Here's your completed fitness profile. Review your information
            before starting your FITZY journey.
          </Text>

          <View style={styles.successCard}>
            <Text style={styles.successIcon}>✦</Text>

            <View style={styles.successTextContainer}>
              <Text style={styles.successTitle}>
                {profile?.name
                  ? `You're all set, ${profile.name}!`
                  : 'Your profile is ready!'}
              </Text>

              <Text style={styles.successSubtitle}>
                FITZY now has the information needed to personalize your
                fitness experience.
              </Text>
            </View>
          </View>

          {profileSections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>

              <View style={styles.detailsCard}>
                {section.items.map((item, index) => (
                  <View
                    key={item.label}
                    style={[
                      styles.detailRow,
                      index === section.items.length - 1 && styles.lastRow,
                    ]}
                  >
                    <Text style={styles.detailLabel}>{item.label}</Text>

                    <Text style={styles.detailValue}>
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.privacyNote}>
            <Text style={styles.privacyIcon}>🔒</Text>

            <Text style={styles.privacyText}>
              Your fitness profile belongs to you. You stay in control of
              your information and preferences.
            </Text>
          </View>

          <Pressable
            style={[
              styles.finishButton,
              saving && styles.disabledButton,
            ]}
            onPress={handleFinish}
            disabled={saving}
          >
            <Text style={styles.finishText}>
              {saving ? 'SAVING PROFILE...' : 'COMPLETE PROFILE'}
            </Text>

            <Text style={styles.arrow}>→</Text>
          </Pressable>

          <Text style={styles.footerText}>
            WELCOME TO FITZY · YOUR JOURNEY, YOUR RULES
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 15,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 18,
  },
  backText: {
    color: COLORS.muted,
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 28,
  },
  progressTrack: {
    height: 5,
    backgroundColor: COLORS.cardLight,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  progressText: {
    color: COLORS.muted,
    fontSize: 10,
    letterSpacing: 1.8,
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
    fontSize: 33,
    lineHeight: 41,
    fontWeight: '900',
    marginBottom: 12,
  },
  highlight: {
    color: COLORS.primary,
  },
  description: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 22,
  },
  successCard: {
    backgroundColor: '#20291A',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 17,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  successIcon: {
    color: COLORS.primary,
    fontSize: 30,
    marginRight: 14,
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 5,
  },
  successSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.7,
    marginBottom: 10,
  },
  detailsCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    color: COLORS.muted,
    fontSize: 12,
    flex: 1,
  },
  detailValue: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
    flex: 1,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardLight,
    padding: 14,
    borderRadius: 13,
    marginBottom: 22,
  },
  privacyIcon: {
    fontSize: 19,
    marginRight: 11,
  },
  privacyText: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
    flex: 1,
  },
  finishButton: {
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
  finishText: {
    color: '#101310',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.3,
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
    marginTop: 17,
  },
});