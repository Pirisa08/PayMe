// src/screens/BillCardScreen.js
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BillCard from '../components/BillCard';

const dummyBills = [
  { id: 1, name: 'Pete', amount: 100, date: '2025-04-20', note: 'Food Bill', status: 'paid' },
  { id: 2, name: 'Pond', amount: 80, date: '2025-04-21', note: 'Water Bill', status: 'unpaid' },
  { id: 3, name: 'Gift', amount: 150, date: '2025-04-22', note: 'Trip', status: 'paid' },
];

const BillCardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {dummyBills.map((bill) => (
        <BillCard
          key={bill.id}
          name={bill.name}
          amount={bill.amount}
          date={bill.date}
          note={bill.note}
          status={bill.status}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f2f2f2' },
});

export default BillCardScreen;
