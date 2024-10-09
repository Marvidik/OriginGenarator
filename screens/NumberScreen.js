import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import BeautifulButton from '../components/Button';
import * as Clipboard from 'expo-clipboard';

export default function NumberScreen() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const response = await fetch('https://geneator.pythonanywhere.com/numbers/');
      const data = await response.json();
      if (data.phone_numbers && Array.isArray(data.phone_numbers)) {
        setNumbers(data.phone_numbers);
      } else {
        setNumbers([]);
      }
    } catch (error) {
      console.error('Error fetching numbers:', error);
      Alert.alert('Error', 'Failed to load numbers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (number) => {
    await Clipboard.setStringAsync(number);
    Alert.alert('Copied', `Number ${number} copied to clipboard.`);
  };

  if (loading) {
    return (
      <View style={styles.content}>
        <Text style={styles.info}>Loading numbers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <Text style={styles.info}>Copy The Number You Want To Use And Go Back</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {numbers.map((number, index) => (
          <View style={styles.numbers} key={index}>
            <Text style={styles.num}>{number}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard(number)}>
              <MaterialIcons name="content-copy" size={28} color="#C04000" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <BeautifulButton style={styles.fill} title={"Regenerate"} onPress={fetchNumbers} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  numbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 30,
  },
  num: {
    fontSize: 24,
    color: "grey",
  },
  info: {
    paddingBottom: 30,
    fontSize: 22,
    color: "#C04000",
    textAlign: "center",
  },
  copyButton: {
    paddingHorizontal: 10,
  },
  fill: {
    alignSelf: "center",
    marginTop: 20,
  },
});
