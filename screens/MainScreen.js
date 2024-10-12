import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native';
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
  const [savedContactIds, setSavedContactIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

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
    return /^\d+$/.test(value);
  };

  const handleGenerateContacts = async () => {
    const totalContacts = parseInt(quantity);

    if (!isNumeric(countryCode) || !isNumeric(baseNumber) || isNaN(totalContacts) || totalContacts < 1) {
      Alert.alert('Error', 'Please enter valid numeric inputs.');
      return;
    }

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

    setIsLoading(true); // Start loading

    try {
      const generatedContactIds = [];

      function incrementNumber(baseNumber, increment) {
        let baseNumberStr = baseNumber.toString();
        const staticPart = baseNumberStr.slice(0, 6); // First six digits remain static
        let dynamicPart = parseInt(baseNumberStr.slice(6)); // Convert remaining part to number for increment

        // Increment the dynamic part by the provided increment value
        let newNumber = dynamicPart + increment;
        let newNumberStr = newNumber.toString().padStart(baseNumberStr.length - 6, '0'); // Ensure leading zeros

        return `+${countryCode}${staticPart}${newNumberStr}`;
      }

      for (let i = 0; i < totalContacts; i++) {
        let phoneNumber = incrementNumber(baseNumber, i);
        const userName = await fetchRandomUser();

        const contact = {
          [Contacts.Fields.FirstName]: `${userName}`,
          [Contacts.Fields.PhoneNumbers]: [{ number: phoneNumber, isPrimary: true, label: 'mobile' }],
        };

        const newContactId = await Contacts.addContactAsync(contact);
        generatedContactIds.push(newContactId);
      }

      setSavedContactIds(generatedContactIds);
      await AsyncStorage.setItem('savedContactIds', JSON.stringify(generatedContactIds));

      Alert.alert('Success', `${totalContacts} contacts created successfully!`);
    } catch (error) {
      Alert.alert('Error', `Failed to save contact: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleDeletePreviousContacts = async () => {
    setIsLoading(true); // Start loading when deleting starts
    try {
      for (let contactId of savedContactIds) {
        await Contacts.removeContactAsync(contactId);
      }

      setSavedContactIds([]);
      await AsyncStorage.removeItem('savedContactIds');
      Alert.alert('Success', 'Previous contacts deleted successfully!');
    } catch (error) {
      Alert.alert('Error', `Failed to delete contacts: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading after deletion is done
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

      {/* Loading indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="brown" />
          <Text style={styles.loadingText}>
            {savedContactIds.length > 0 ? 'Deleting contacts...' : 'Generating contacts...'}
          </Text>
        </View>
      )}

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
  loadingContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: 'brown',
  },
});
