import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import BeautifulButton from '../components/Button';
import * as Clipboard from 'expo-clipboard';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

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
      const data = await response.json();
      if (data.phone_numbers && Array.isArray(data.phone_numbers)) {
        setNumbers(data.phone_numbers);
      } else {
        setNumbers([]);
        Alert.alert('Error', 'No numbers found for this state.');
      }
    } catch (error) {
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
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    paddingBottom: height * 0.05,
  },
  numbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: height * 0.03,
  },
  num: {
    fontSize: width * 0.06,
    color: "grey",
  },
  info: {
    paddingBottom: height * 0.02,
    fontSize: width * 0.055,
    color: "#C04000",
    textAlign: "center",
  },
  copyButton: {
    paddingHorizontal: width * 0.02,
  },
  fill: {
    alignSelf: "center",
    marginTop: height * 0.03,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#C04000',
    borderRadius: 5,
    marginBottom: height * 0.02,
    backgroundColor: '#fff',
  },
  picker: {
    height: height * 0.07,
    width: '100%',
  },
});
