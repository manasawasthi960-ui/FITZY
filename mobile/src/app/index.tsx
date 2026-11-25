import React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#101310',
  card: '#1B201B',
  cardLight: '#242B23',
  primary: '#C6FF4D',
  white: '#FFFFFF',
  muted: '#92998F',
  border: '#30372E',
};

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && <Text style={styles.sectionAction}>{action}</Text>}
    </View>
  );
}

function MetricCard({
  icon,
  title,
  value,
  unit,
  progress,
}: {
  icon: string;
  title: string;
  value: string;
  unit: string;
  progress: number;
}) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricTop}>
        <Text style={styles.metricIcon}>{icon}</Text>
        <Text style={styles.metricTitle}>{title}</Text>
      </View>

      <View style={styles.metricValueRow}>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricUnit}>{unit}</Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(progress, 100)}%` },
          ]}
        />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>
              FIT<Text style={styles.logoAccent}>ZY.</Text>
            </Text>
            <Text style={styles.tagline}>YOUR FITNESS. YOUR FUTURE.</Text>
          </View>

          <Pressable
            style={styles.profileButton}
            onPress={() => Alert.alert('Profile', 'Your profile module is coming soon.')}
          >
            <Text style={styles.profileIcon}>P</Text>
          </Pressable>
        </View>

        {/* GREETING */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>GOOD DAY 👋</Text>
          <Text style={styles.heading}>
            Let's get <Text style={styles.headingAccent}>stronger.</Text>
          </Text>
          <Text style={styles.subheading}>
            Every small step counts towards your goals.
          </Text>
        </View>

        {/* DAILY CALORIE CARD */}
        <View style={styles.calorieCard}>
          <View style={styles.calorieHeader}>
            <View>
              <Text style={styles.cardEyebrow}>DAILY NUTRITION</Text>
              <Text style={styles.calorieHeading}>Calorie intake</Text>
            </View>
            <Text style={styles.calorieIcon}>◉</Text>
          </View>

          <View style={styles.calorieNumbers}>
            <Text style={styles.calorieValue}>1,250</Text>
            <Text style={styles.calorieTarget}> / 2,000 kcal</Text>
          </View>

          <View style={styles.calorieProgressBackground}>
            <View style={styles.calorieProgressFill} />
          </View>

          <View style={styles.calorieFooter}>
            <Text style={styles.calorieRemaining}>750 kcal remaining</Text>
            <Text style={styles.caloriePercentage}>62.5%</Text>
          </View>

          <Pressable
            style={styles.scanButton}
            onPress={() => Alert.alert('Food Scanner', 'AI food recognition will be developed in our Nutrition module.')}
          >
            <Text style={styles.scanButtonText}>+  LOG YOUR FOOD</Text>
          </Pressable>
        </View>

        {/* ACTIVITY */}
        <SectionTitle title="Daily activity" action="VIEW ALL  ›" />

        <View style={styles.metricsGrid}>
          <MetricCard
            icon="👟"
            title="Steps"
            value="6,420"
            unit="/ 10k"
            progress={64.2}
          />

          <MetricCard
            icon="🔥"
            title="Burned"
            value="320"
            unit="kcal"
            progress={53}
          />

          <MetricCard
            icon="⏱"
            title="Active time"
            value="35"
            unit="min"
            progress={58}
          />

          <MetricCard
            icon="💧"
            title="Water"
            value="1.5"
            unit="/ 2.5 L"
            progress={60}
          />
        </View>

        {/* WORKOUT */}
        <SectionTitle title="Today's workout" action="EXPLORE  ›" />

        <View style={styles.workoutCard}>
          <View style={styles.workoutTop}>
            <View style={styles.workoutBadge}>
              <Text style={styles.workoutBadgeText}>RECOMMENDED</Text>
            </View>
            <Text style={styles.workoutIcon}>🏋️</Text>
          </View>

          <Text style={styles.workoutTitle}>Upper Body Strength</Text>
          <Text style={styles.workoutDescription}>
            Build strength. Improve endurance. Stay consistent.
          </Text>

          <View style={styles.workoutDetails}>
            <Text style={styles.workoutDetail}>◷  45 MIN</Text>
            <Text style={styles.workoutDetail}>⚡  MODERATE</Text>
            <Text style={styles.workoutDetail}>6 EXERCISES</Text>
          </View>

          <Pressable
            style={styles.workoutButton}
            onPress={() => Alert.alert('Workout Planner', 'Your interactive workout planner is coming soon.')}
          >
            <Text style={styles.workoutButtonText}>VIEW WORKOUT  →</Text>
          </Pressable>
        </View>

        {/* FITNESS INSIGHT */}
        <SectionTitle title="Your fitness journey" />

        <View style={styles.insightCard}>
          <View style={styles.insightIconContainer}>
            <Text style={styles.insightIcon}>✦</Text>
          </View>

          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Consistency is everything.</Text>
            <Text style={styles.insightDescription}>
              Track your activity regularly to understand your progress and
              build healthier habits.
            </Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>FITZY.</Text>
          <Text style={styles.footerText}>BUILT FOR A STRONGER YOU.</Text>
          <Text style={styles.demoLabel}>
            PREVIEW DATA · NOT LIVE FITNESS MEASUREMENTS
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 32,
  },

  logo: {
    fontSize: 29,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 2,
  },

  logoAccent: {
    color: COLORS.primary,
  },

  tagline: {
    color: COLORS.muted,
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 3,
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.cardLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  profileIcon: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 18,
  },

  greetingSection: {
    marginBottom: 25,
  },

  greeting: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 9,
  },

  heading: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -1,
  },

  headingAccent: {
    color: COLORS.primary,
  },

  subheading: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 9,
  },

  calorieCard: {
    backgroundColor: COLORS.cardLight,
    borderRadius: 24,
    padding: 21,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  calorieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardEyebrow: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  calorieHeading: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 7,
  },

  calorieIcon: {
    color: COLORS.primary,
    fontSize: 32,
  },

  calorieNumbers: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 22,
    marginBottom: 16,
  },

  calorieValue: {
    color: COLORS.white,
    fontSize: 37,
    fontWeight: '900',
  },

  calorieTarget: {
    color: COLORS.muted,
    fontSize: 13,
    marginLeft: 5,
  },

  calorieProgressBackground: {
    height: 9,
    borderRadius: 10,
    backgroundColor: '#41483D',
    overflow: 'hidden',
  },

  calorieProgressFill: {
    width: '62.5%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },

  calorieFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  calorieRemaining: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },

  caloriePercentage: {
    color: COLORS.muted,
    fontSize: 12,
  },

  scanButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 22,
  },

  scanButtonText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: '800',
  },

  sectionAction: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  metricCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  metricTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  metricIcon: {
    fontSize: 18,
  },

  metricTitle: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '600',
  },

  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 17,
    marginBottom: 15,
  },

  metricValue: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: '800',
  },

  metricUnit: {
    color: COLORS.muted,
    fontSize: 10,
    marginLeft: 4,
  },

  progressBackground: {
    height: 5,
    backgroundColor: '#343B32',
    borderRadius: 5,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },

  workoutCard: {
    backgroundColor: COLORS.card,
    borderRadius: 21,
    padding: 19,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  workoutTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  workoutBadge: {
    backgroundColor: '#344226',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 8,
  },

  workoutBadgeText: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  workoutIcon: {
    fontSize: 28,
  },

  workoutTitle: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '800',
    marginTop: 15,
  },

  workoutDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },

  workoutDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 19,
    marginBottom: 20,
  },

  workoutDetail: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
  },

  workoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },

  workoutButtonText: {
    color: COLORS.background,
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1,
  },

  insightCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    padding: 17,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 13,
    marginBottom: 30,
  },

  insightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#344226',
    justifyContent: 'center',
    alignItems: 'center',
  },

  insightIcon: {
    color: COLORS.primary,
    fontSize: 22,
  },

  insightContent: {
    flex: 1,
  },

  insightTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },

  insightDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
  },

  footer: {
    alignItems: 'center',
    paddingTop: 12,
  },

  footerLogo: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 3,
  },

  footerText: {
    color: COLORS.muted,
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 6,
  },

  demoLabel: {
    color: COLORS.muted,
    fontSize: 8,
    letterSpacing: 1,
    marginTop: 14,
    textAlign: 'center',
  },
});