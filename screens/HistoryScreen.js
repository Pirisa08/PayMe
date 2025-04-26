import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Animated,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { bills } from '../data/sampleData';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HistoryScreen = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scaleAnim] = useState(new Animated.Value(1));
  const [isLoading, setIsLoading] = useState(true);
  const [headerAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      Animated.spring(headerAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
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

  const filteredBills = bills.filter(bill => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'completed' && bill.paidCount === bill.people.length) ||
      (filter === 'pending' && bill.paidCount < bill.people.length);
    
    const matchesSearch = 
      bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatistics = () => {
    const totalBills = bills.length;
    const completedBills = bills.filter(b => b.paidCount === b.people.length).length;
    const pendingBills = totalBills - completedBills;
    const completionRate = ((completedBills / totalBills) * 100).toFixed(1);

    return {
      totalBills,
      completedBills,
      pendingBills,
      completionRate
    };
  };

  const formatDate = (date, time) => {
    return `${date} at ${time}`;
  };

  const getStatusColor = (paidCount, total) => {
    if (paidCount === total) return '#4CAF50';
    if (paidCount === 0) return '#FF6B6B';
    return '#FFC107';
  };

  const getStatusText = (paidCount, total) => {
    if (paidCount === total) return 'Completed';
    if (paidCount === 0) return 'Not Started';
    return 'In Progress';
  };

  const getStatusIcon = (paidCount, total) => {
    if (paidCount === total) return 'checkmark-circle';
    if (paidCount === 0) return 'alert-circle';
    return 'time';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderPaymentDetails = (people) => {
    return (
      <View style={styles.paymentDetailsContainer}>
        {people.map((person, index) => (
          <View key={index} style={styles.paymentDetailRow}>
            <View style={styles.paymentDetailLeft}>
              <Text style={styles.paymentDetailName}>{person.name}</Text>
              {person.paid && (
                <Text style={styles.paymentDetailDate}>
                  Paid on {person.paidDate}
                </Text>
              )}
            </View>
            <View style={styles.paymentDetailRight}>
              <Text style={[
                styles.paymentDetailAmount,
                person.paid ? styles.paidAmount : styles.pendingAmount
              ]}>
                {formatCurrency(person.amount)}
              </Text>
              {person.paid ? (
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              ) : (
                <Ionicons name="alert-circle" size={16} color="#FF6B6B" />
              )}
            </View>
          </View>
        ))}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading history...</Text>
      </View>
    );
  }

  const stats = getStatistics();

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.header,
          {
            transform: [{
              translateY: headerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0]
              })
            }]
          }
        ]}
      >
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Payment History</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="calendar" size={24} color="#FF6B6B" style={styles.headerIcon} />
            <Ionicons name="stats-chart" size={24} color="#FF6B6B" style={styles.headerIcon} />
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statCircle}>
              <Text style={styles.statValue}>{stats.completionRate}%</Text>
            </View>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statCircle, { backgroundColor: '#4CAF50' }]}>
              <Text style={styles.statValue}>{stats.completedBills}</Text>
            </View>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statCircle, { backgroundColor: '#FFC107' }]}>
              <Text style={styles.statValue}>{stats.pendingBills}</Text>
            </View>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#636E72" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search bills..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="options" size={20} color="#636E72" style={styles.searchIcon} />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Ionicons name="apps" size={16} color={filter === 'all' ? '#fff' : '#636E72'} />
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
          onPress={() => setFilter('completed')}
        >
          <Ionicons name="checkmark-done" size={16} color={filter === 'completed' ? '#fff' : '#636E72'} />
          <Text style={[styles.filterText, filter === 'completed' && styles.activeFilterText]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
          onPress={() => setFilter('pending')}
        >
          <Ionicons name="time" size={16} color={filter === 'pending' ? '#fff' : '#636E72'} />
          <Text style={[styles.filterText, filter === 'pending' && styles.activeFilterText]}>Pending</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBills}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View 
            style={[
              styles.card,
              { 
                transform: [{ scale: scaleAnim }],
                opacity: headerAnim,
                marginTop: index === 0 ? 16 : 0
              }
              ]}
          >
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <View style={styles.billImageContainer}>
                  <Text style={styles.billImage}>{item.image}</Text>
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.type}>{item.type}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.paidCount, item.people.length) }
                ]}>
                  <Ionicons 
                    name={getStatusIcon(item.paidCount, item.people.length)} 
                    size={16} 
                    color="#fff" 
                    style={styles.statusIcon}
                  />
                  <Text style={styles.statusText}>
                    {getStatusText(item.paidCount, item.people.length)}
                  </Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.dateContainer}>
                  <Ionicons name="calendar" size={16} color="#636E72" />
                  <Text style={styles.dateText}>
                    {formatDate(item.date, item.time)}
                  </Text>
                </View>
                <View style={styles.totalAmountContainer}>
                  <Text style={styles.totalAmountLabel}>Total Amount:</Text>
                  <Text style={styles.totalAmount}>{formatCurrency(item.totalAmount)}</Text>
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
                {renderPaymentDetails(item.people)}
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text" size={48} color="#636E72" />
            <Text style={styles.emptyText}>No bills found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statCircle: {
    width: 80,
    height: 80,
    borderRadius: 35,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#E0E0E0',
  },
  activeFilter: {
    backgroundColor: '#FF6B6B',
  },
  filterText: {
    color: '#636E72',
    fontWeight: '500',
    marginLeft: 4,
  },
  activeFilterText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  billImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  billImage: {
    fontSize: 24,
  },
  cardTitleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  type: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    padding: 16,
    paddingBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 8,
  },
  progressContainer: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#636E72',
    marginTop: 16,
  },
  totalAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  totalAmountLabel: {
    fontSize: 16,
    color: '#636E72',
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  paymentDetailsContainer: {
    marginTop: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
  },
  paymentDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  paymentDetailLeft: {
    flex: 1,
  },
  paymentDetailName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3436',
  },
  paymentDetailDate: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 2,
  },
  paymentDetailRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentDetailAmount: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  paidAmount: {
    color: '#4CAF50',
  },
  pendingAmount: {
    color: '#FF6B6B',
  },
});

export default HistoryScreen;
