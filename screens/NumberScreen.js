import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import BeautifulButton from '../components/Button';
import * as Clipboard from 'expo-clipboard';
import { Picker } from '@react-native-picker/picker';

export default function NumberScreen() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState('');

  const US_STATES = [
    { label: 'Alabama', value: 'Alabama' },
    { label: 'Alaska', value: 'Alaska' },
    { label: 'Arizona', value: 'Arizona' },
    { label: 'Arkansas', value: 'Arkansas' },
    { label: 'California', value: 'California' },
    { label: 'Colorado', value: 'Colorado' },
    { label: 'Connecticut', value: 'Connecticut' },
    { label: 'Delaware', value: 'Delaware' },
    { label: 'Florida', value: 'Florida' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Hawaii', value: 'Hawaii' },
    { label: 'Idaho', value: 'Idaho' },
    { label: 'Illinois', value: 'Illinois' },
    { label: 'Indiana', value: 'Indiana' },
    { label: 'Iowa', value: 'Iowa' },
    { label: 'Kansas', value: 'Kansas' },
    { label: 'Kentucky', value: 'Kentucky' },
    { label: 'Louisiana', value: 'Louisiana' },
    { label: 'Maine', value: 'Maine' },
    { label: 'Maryland', value: 'Maryland' },
    { label: 'Massachusetts', value: 'Massachusetts' },
    { label: 'Michigan', value: 'Michigan' },
    { label: 'Minnesota', value: 'Minnesota' },
    { label: 'Mississippi', value: 'Mississippi' },
    { label: 'Missouri', value: 'Missouri' },
    { label: 'Montana', value: 'Montana' },
    { label: 'Nebraska', value: 'Nebraska' },
    { label: 'Nevada', value: 'Nevada' },
    { label: 'New Hampshire', value: 'New Hampshire' },
    { label: 'New Jersey', value: 'New Jersey' },
    { label: 'New Mexico', value: 'New Mexico' },
    { label: 'New York', value: 'New York' },
    { label: 'North Carolina', value: 'North Carolina' },
    { label: 'North Dakota', value: 'North Dakota' },
    { label: 'Ohio', value: 'Ohio' },
    { label: 'Oklahoma', value: 'Oklahoma' },
    { label: 'Oregon', value: 'Oregon' },
    { label: 'Pennsylvania', value: 'Pennsylvania' },
    { label: 'Rhode Island', value: 'Rhode Island' },
    { label: 'South Carolina', value: 'South Carolina' },
    { label: 'South Dakota', value: 'South Dakota' },
    { label: 'Tennessee', value: 'Tennessee' },
    { label: 'Texas', value: 'Texas' },
    { label: 'Utah', value: 'Utah' },
    { label: 'Vermont', value: 'Vermont' },
    { label: 'Virginia', value: 'Virginia' },
    { label: 'Washington', value: 'Washington' },
    { label: 'West Virginia', value: 'West Virginia' },
    { label: 'Wisconsin', value: 'Wisconsin' },
    { label: 'Wyoming', value: 'Wyoming' }
  ];

  const fetchNumbers = async () => {
    if (!selectedState) {
      Alert.alert('Error', 'Please select a state first.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://geneator.pythonanywhere.com/numbers/${selectedState}`);
      
      // Log the response status and content for debugging
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Fetched data:', data);  // Log the data received

      if (data.phone_numbers && Array.isArray(data.phone_numbers)) {
        setNumbers(data.phone_numbers);
      } else {
        console.log('No valid phone numbers found');
        setNumbers([]); // Set to empty array if no phone numbers are found
        Alert.alert('Error', 'No numbers found for this state.');
      }
    } catch (error) {
      console.error('Error fetching numbers:', error);  // Log the error if any
      Alert.alert('Error', 'Failed to load numbers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (number) => {
    await Clipboard.setStringAsync(number);
    Alert.alert('Copied', `Number ${number} copied to clipboard.`);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.info}>Select a State and Generate Numbers</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedState}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedState(itemValue)}
        >
          <Picker.Item label="Select a State" value="" />
          {US_STATES.map((state, index) => (
            <Picker.Item label={state.label} value={state.value} key={index} />
          ))}
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#C04000" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {numbers.length > 0 ? (
            numbers.map((number, index) => (
              <View style={styles.numbers} key={index}>
                <Text style={styles.num}>{number}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard(number)}>
                  <MaterialIcons name="content-copy" size={28} color="#C04000" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.info}>No numbers available. Try generating again.</Text>
          )}
        </ScrollView>
      )}

      <BeautifulButton style={styles.fill} title={"Generate"} onPress={fetchNumbers} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  numbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  num: {
    fontSize: 24,
    color: "grey",
  },
  info: {
    paddingBottom: 20,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#C04000',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
