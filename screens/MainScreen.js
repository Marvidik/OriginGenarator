import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import TwoTextFields from '../components/Countryphone';
import BeautifulTextInput from '../components/Textinput';
import BeautifulButton from '../components/Button';
import * as Contacts from 'expo-contacts';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen({ navigation }) {
  const [countryCode, setCountryCode] = useState('');
  const [baseNumber, setBaseNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [savedContactIds, setSavedContactIds] = useState([]); // Store generated contact IDs here

  async function fetchRandomUser() {
    try {
      const response = await fetch('https://randomuser.me/api', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const fetchedUserName = data.results[0].name.first;
      return fetchedUserName;
    } catch (error) {
      console.error('Error fetching random user:', error);
      return null;
    }
  }

  const isNumeric = (value) => {
    return /^\d+$/.test(value); // Regular expression to check if a string contains only numbers
  };

  const handleGenerateContacts = async () => {
    const totalContacts = parseInt(quantity);

    // Validate input
    if (!isNumeric(countryCode) || !isNumeric(baseNumber) || isNaN(totalContacts) || totalContacts < 1) {
      Alert.alert('Error', 'Please enter valid numeric inputs.');
      return;
    }

    // Request permission for contacts
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant contacts access.');
      return;
    }

    if (Platform.OS === 'android') {
      const { status: writeStatus } = await Contacts.requestPermissionsAsync();
      if (writeStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Write permission for contacts is required.');
        return;
      }
    }

    try {
      const generatedContactIds = [];

      // Function to reshuffle the phone number
      function reshuffleNumber(baseNumber, countryCode) {
        let baseNumberStr = baseNumber.toString();

        const fixedPart = baseNumberStr.slice(0, 4);
        const remainingPart = baseNumberStr.slice(4);

        const remainingDigits = remainingPart.split('');

        for (let i = remainingDigits.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [remainingDigits[i], remainingDigits[j]] = [remainingDigits[j], remainingDigits[i]];
        }

        return `+${countryCode}${fixedPart}${remainingDigits.join('')}`;
      }

      for (let i = 0; i < totalContacts; i++) {
        let phoneNumber = reshuffleNumber(baseNumber, countryCode);

        // Fetch a new username for each contact
        const userName = await fetchRandomUser();

        // Log phone number and userName to verify
        console.log(`Contact ${i + 1}:`, { userName, phoneNumber });

        const contact = {
          [Contacts.Fields.FirstName]: `${userName}`,
          [Contacts.Fields.PhoneNumbers]: [{ number: phoneNumber, isPrimary: true, label: 'mobile' }],
        };

        // Save the contact and store its ID
        const newContactId = await Contacts.addContactAsync(contact);
        generatedContactIds.push(newContactId);
      }

      // Update the state to track saved contacts
      setSavedContactIds(generatedContactIds);

      // Save generated contact IDs to AsyncStorage
      await AsyncStorage.setItem('savedContactIds', JSON.stringify(generatedContactIds));

      Alert.alert('Success', `${totalContacts} contacts created successfully!`);
    } catch (error) {
      Alert.alert('Error', `Failed to save contact: ${error.message}`);
    }
  };

  const handleDeletePreviousContacts = async () => {
    try {
      // Loop through saved contact IDs and delete each contact
      for (let contactId of savedContactIds) {
        await Contacts.removeContactAsync(contactId);
      }

      // Clear saved contact IDs
      setSavedContactIds([]);

      // Remove saved contact IDs from AsyncStorage
      await AsyncStorage.removeItem('savedContactIds');

      Alert.alert('Success', 'Previous contacts deleted successfully!');
    } catch (error) {
      Alert.alert('Error', `Failed to delete contacts: ${error.message}`);
    }
  };

  useEffect(() => {
    const loadSavedContactIds = async () => {
      const savedIds = await AsyncStorage.getItem('savedContactIds');
      if (savedIds) {
        setSavedContactIds(JSON.parse(savedIds));
      }
    };

    loadSavedContactIds();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.up}></View>
      <Text style={styles.text1}>Enter Country Code and Phone Number...</Text>
      <BeautifulButton style={styles.fill} title={"Get Random"} onPress={() => navigation.navigate('NumberScreen')} />
      <TwoTextFields 
        onCountryCodeChange={(text) => setCountryCode(text)} 
        onPhoneNumberChange={(text) => setBaseNumber(text)} 
      />
      <Text style={styles.text2}>Enter Number of Contacts to Create</Text>
      <BeautifulTextInput 
        text={"Number of contacts"} 
        onChangeText={(text) => setQuantity(text)} 
      />
      <BeautifulButton title={"Generate"} onPress={handleGenerateContacts} />
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePreviousContacts}>
        <MaterialIcons name="delete" size={24} color="#C04000" />
        <Text style={styles.delete}>Delete Previous Contacts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  up: {
    height: 100,
    width: "100%",
    backgroundColor: "brown",
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  text1: {
    marginTop: 100,
    marginLeft: 20,
    fontSize: 24,
    color: "grey",
  },
  text2: {
    marginLeft: 20,
    fontSize: 24,
    color: "grey",
  },
  delete: {
    marginLeft: 5,
    color: '#C04000',
    fontSize: 20,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: "center",
  },
  fill: {
    right: "30%",
    height: 50,
    width: 150,
  },
});
