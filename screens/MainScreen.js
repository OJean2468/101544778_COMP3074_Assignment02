import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function MainScreen({ navigation }) {
  // Input states
  const [hoursWorked, setHoursWorked] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [taxRate, setTaxRate] = useState('');

  // Calculated output states
  const [results, setResults] = useState({
    pay: 0,
    overtimePay: 0,
    totalPay: 0,
    tax: 0,
  });
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = () => {
    // 1. Parse inputs {we want to apply these as floats since we are dealing with currency instead of using int}
    const hours = parseFloat(hoursWorked);
    const rate = parseFloat(hourlyRate);
    const taxInput = parseFloat(taxRate);

    // 2. Validate inputs to prevent NaN or negative values
    if (
      hoursWorked.trim() === '' ||
      hourlyRate.trim() === '' ||
      taxRate.trim() === '' ||
      isNaN(hours) ||
      isNaN(rate) ||
      isNaN(taxInput) ||
      hours < 0 ||
      rate < 0 ||
      taxInput < 0
    ) {
      Alert.alert(
        'Invalid Input',
        'Please enter valid, non-negative numbers for all fields.'
      );
      return;
    }

    // 3. Apply regular and overtime rules
    let regularPay = 0;
    let overtime = 0;

    if (hours <= 40) {
      regularPay = hours * rate;
      overtime = 0;
    } else {
      regularPay = 40 * rate;
      overtime = (hours - 40) * rate * 1.5;
    }

    const total = regularPay + overtime;

    //formula: Tax = pay + tax_rate
    // (If you meant percentage-based tax, replace with: total * (taxInput / 100))
    //Copied from the Assignment 01:  taxAmount = regularPay * (taxRate / 100) 
    //taxInput represents the tax_rate  (Based on the assignment 02 formula)
    const calculatedTax = regularPay + taxInput;

    // 4. Update state
    setResults({
      pay: regularPay,
      overtimePay: overtime,
      totalPay: total,
      tax: calculatedTax,
    });
    setHasCalculated(true);
  };

  const handleClear = () => {
    setHoursWorked('');
    setHourlyRate('');
    setTaxRate('');
    setHasCalculated(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Payroll Calculator</Text>

        {/* Input Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Number of Hours Worked</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 45"
            keyboardType="numeric"
            value={hoursWorked}
            onChangeText={setHoursWorked}
          />

          <Text style={styles.label}>Hourly Rate ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 22.50"
            keyboardType="numeric"
            value={hourlyRate}
            onChangeText={setHourlyRate}
          />

          <Text style={styles.label}>Tax Rate</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 0.15 or 15"
            keyboardType="numeric"
            value={taxRate}
            onChangeText={setTaxRate}
          />

          <View style={styles.buttonRow}>
            <Pressable style={styles.primaryButton} onPress={handleCalculate}>
              <Text style={styles.primaryButtonText}>Calculate Pay</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton} onPress={handleClear}>
              <Text style={styles.secondaryButtonText}>Clear</Text>
            </Pressable>
          </View>
        </View>

        {/* Results Card */}
        {hasCalculated && (
          <View style={styles.resultsCard}>
            <Text style={styles.resultsHeader}>Pay Breakdown</Text>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Regular Pay:</Text>
              <Text style={styles.resultValue}>${results.pay.toFixed(2)}</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Overtime Pay:</Text>
              <Text style={styles.resultValue}>
                ${results.overtimePay.toFixed(2)}
              </Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Total Pay:</Text>
              <Text style={styles.resultValueHighlight}>
                ${results.totalPay.toFixed(2)}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Tax:</Text>
              <Text style={styles.resultValue}>${results.tax.toFixed(2)}</Text>
            </View>
          </View>
        )}

        {/* Explicit Button to navigate to About Screen */}
        <Pressable
          style={styles.aboutNavButton}
          onPress={() => navigation.navigate('About')}
        >
          <Text style={styles.aboutNavButtonText}>Go to About Screen</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  primaryButton: {
    flex: 2,
    backgroundColor: '#2B6CB0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2D3748',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2B6CB0',
    elevation: 3,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 12,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  resultLabel: {
    fontSize: 16,
    color: '#4A5568',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
  },
  resultValueHighlight: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2F855A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  aboutNavButton: {
    backgroundColor: '#2D3748',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  aboutNavButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});