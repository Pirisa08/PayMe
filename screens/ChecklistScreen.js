import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput, Alert } from 'react-native';
import { bills } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

const ChecklistScreen = ({ route, navigation }) => {
  const { billId } = route.params;
  const originalBill = bills.find(b => b.id === billId);

  const [scaleAnim] = useState(new Animated.Value(1));
  const [people, setPeople] = useState(originalBill ? [...originalBill.people] : []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const addPerson = () => {
    Alert.prompt(
      "Add Person",
      "Enter name of the person:",
      (name) => {
        if (name && name.trim()) {
          const newPerson = { name: name.trim(), paid: false };
          setPeople([...people, newPerson]);
        }
      }
    );
  };

  if (!originalBill) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Bill not found 😅</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" style={styles.backIcon} />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const paidCount = people.filter(p => p.paid).length;

  const getStatusEmoji = (paid) => paid ? '✅' : '⏳';
  const getStatusColor = (paid) => paid ? '#4CAF50' : '#FF6B6B';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButtonSmall}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.billImage}>{originalBill.image}</Text>
          <View>
            <Text style={styles.title}>{originalBill.title}</Text>
            <Text style={styles.type}>{originalBill.type}</Text>
          </View>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          {paidCount}/{people.length} paid
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${(paidCount / people.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* List */}
      <View style={styles.listContainer}>
        {people.map((person, index) => (
          <Animated.View 
            key={index} 
            style={[styles.row, { transform: [{ scale: scaleAnim }] }]}
          >
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.personItem}
              activeOpacity={0.7}
            >
              <View style={styles.personInfo}>
                <Text style={styles.name}>{person.name}</Text>
                <View style={styles.statusContainer}>
                  <Text style={[styles.status, { color: getStatusColor(person.paid) }]}>
                    {getStatusEmoji(person.paid)} {person.paid ? 'Paid' : 'Pending'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* FAB to add person */}
      <TouchableOpacity style={styles.fab} onPress={addPerson}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8F9FA' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButtonSmall: { marginRight: 12 },
  titleContainer: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  billImage: { fontSize: 32, marginRight: 12 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2D3436' },
  type: { fontSize: 16, color: '#636E72', marginTop: 4 },
  summary: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryText: { fontSize: 18, color: '#2D3436', fontWeight: '600', marginBottom: 8 },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
  },
  listContainer: { flex: 1 },
  row: { marginBottom: 12 },
  personItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  personInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 18, color: '#2D3436', fontWeight: '500' },
  statusContainer: { flexDirection: 'row', alignItems: 'center' },
  status: { fontSize: 16, fontWeight: '500' },
  errorText: {
    fontSize: 24,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backIcon: { marginRight: 8 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#FF6B6B',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ChecklistScreen;
