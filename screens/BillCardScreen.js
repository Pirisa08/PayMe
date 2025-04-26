// src/screens/BillCardScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const dummyBills = [
  { id: 1, name: 'Pete', amount: 100, date: '2025-04-20', note: 'Food Bill', status: 'paid' },
  { id: 2, name: 'Pond', amount: 80, date: '2025-04-21', note: 'Water Bill', status: 'unpaid' },
];

const BillCardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {dummyBills.map((bill) => (
        <View key={bill.id} style={[styles.card, bill.status === 'paid' ? styles.paid : styles.unpaid]}>
          <Text style={styles.name}>{bill.name}</Text>
          <Text>💰 Amount: {bill.amount} Baht</Text>
          <Text>📅 Date: {bill.date}</Text>
          <Text>📝 Note: {bill.note}</Text>
          <Text style={styles.status}>
            {bill.status === 'paid' ? '✅ Paid' : '❌ Unpaid'}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  status: { marginTop: 8, fontWeight: 'bold' },
  paid: { borderLeftWidth: 6, borderLeftColor: 'green' },
  unpaid: { borderLeftWidth: 6, borderLeftColor: 'red' },
});

export default BillCardScreen;
