import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Student Information</Text>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Student Name</Text>
          <Text style={styles.value}>O'Neal Jean</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Student ID</Text>
          <Text style={styles.value}>101544778</Text>
        </View>
      </View>

      {/* Explicit button to return to the Main screen */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.backButtonText}>Back to Main Screen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBlock: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    paddingBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#718096',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginTop: 4,
  },
  backButton: {
    backgroundColor: '#2B6CB0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});