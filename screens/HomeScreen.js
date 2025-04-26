import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { bills } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Getting things ready...</Text>
      </View>
    );
  }

  const getEmoji = (paidCount, total) => {
    const ratio = paidCount / total;
    if (ratio === 1) return '🎉';
    if (ratio >= 0.75) return '😊';
    if (ratio >= 0.5) return '🙂';
    if (ratio >= 0.25) return '😐';
    return '😅';
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Bill List</Text>
        <Ionicons name="notifications" size={24} color="#FF6B6B" />
      </View>
      <FlatList
        data={bills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Checklist', { billId: item.id })}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={styles.titleContainer}>
                  <View style={styles.titleLeft}>
                    <Text style={styles.billImage}>{item.image}</Text>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.type}>{item.type}</Text>
                    </View>
                  </View>
                  <Text style={styles.emoji}>{getEmoji(item.paidCount, item.people.length)}</Text>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${(item.paidCount / item.people.length) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {item.paidCount}/{item.people.length} paid
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
      <TouchableOpacity 
        onPress={() => navigation.navigate('History')} 
        style={styles.historyButton}
        activeOpacity={0.7}
      >
        <Ionicons name="time" size={20} color="#fff" style={styles.historyIcon} />
        <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#FF6B6B',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billImage: {
    fontSize: 32,
    marginRight: 12,
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#2D3436',
  },
  type: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 2,
  },
  emoji: {
    fontSize: 24,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
  historyButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  historyIcon: {
    marginRight: 8,
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
