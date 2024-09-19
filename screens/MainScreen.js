import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import TwoTextFields from '../components/Countryphone';
import BeautifulTextInput from '../components/Textinput';
import BeautifulButton from '../components/Button';
import * as Contacts from 'expo-contacts';
import { MaterialIcons } from '@expo/vector-icons';

export default function MainScreen() {
  const [countryCode, setCountryCode] = useState('');
  const [baseNumber, setBaseNumber] = useState('');
  const [quantity, setQuantity] = useState('');

  const isNumeric = (value) => {
    return /^\d+$/.test(value); // Regular expression to check if a string contains only numbers
  };

  const handleGenerateContacts = async () => {
    const totalContacts = parseInt(quantity);
    if (!isNumeric(countryCode) || !isNumeric(baseNumber) || isNaN(totalContacts) || totalContacts < 1) {
      Alert.alert('Error', 'Please enter valid numeric inputs.');
      console.log('Country Code:', countryCode);
      console.log('Base Number:', baseNumber);
      console.log('Quantity:', quantity);
      return;
    }
  
    // Request permission to access contacts
    const { status: readStatus } = await Contacts.requestPermissionsAsync();
    const { status: writeStatus } = await Contacts.requestPermissionsAsync();
    
    if (readStatus !== 'granted' || writeStatus !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant contact access.');
      return;
    }
  
    // Generate contacts
    for (let i = 0; i < totalContacts; i++) {
      let phoneNumber = `${countryCode}${parseInt(baseNumber) + i}`;
      const contact = {
        [Contacts.Fields.FirstName]: `Contact ${i + 1}`,
        [Contacts.Fields.PhoneNumbers]: [{ number: phoneNumber, isPrimary: true, label: 'mobile' }],
      };
  
      try {
        await Contacts.addContactAsync(contact);
      } catch (error) {
        Alert.alert('Error', `Failed to save contact ${i + 1}: ${error.message}`);
        break;
      }
    }
  
    Alert.alert('Success', `${quantity} contacts created successfully!`);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.up}></View>
      <Text style={styles.text1}>Enter Country Code and Phone Number...</Text>
      <TwoTextFields 
        onCountryCodeChange={(text) => setCountryCode(text)} 
        onPhoneNumberChange={(text) => setBaseNumber(text)} 
      />
      <Text style={styles.text2}>Enter Number of Contacts to Create</Text>
      <BeautifulTextInput 
        text={"Number of contacts"} 
        onChangeText={(text) => setQuantity(text)} // Update quantity state
      />
      <BeautifulButton title={"Generate"} onPress={handleGenerateContacts} />
      <TouchableOpacity style={styles.deleteButton} onPress={() => console.log("Deleted")}>
        <MaterialIcons name="delete" size={24} color="#C04000" />
        <Text style={styles.delete}>Delete Previous Contacts</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  up: {
    height: 100,
    width: "100%",
    backgroundColor: "brown",
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40
  },
  text1: {
    marginTop: 100,
    marginLeft: 20,
    fontSize: 24,
    color: "grey"
  },
  text2: {
    marginLeft: 20,
    fontSize: 24,
    color: "grey"
  },
  delete: {
    marginLeft: 5,
    color: '#C04000',
    fontSize: 20,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: "center"
  },
});
