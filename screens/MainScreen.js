import { View, Text, StyleSheet, TouchableOpacity, Alert ,Platform} from 'react-native';
import React, { useState,useEffect } from 'react';
import TwoTextFields from '../components/Countryphone';
import BeautifulTextInput from '../components/Textinput';
import BeautifulButton from '../components/Button';
import * as Contacts from 'expo-contacts';
import { MaterialIcons } from '@expo/vector-icons';

export default function MainScreen({navigation}) {
  const [countryCode, setCountryCode] = useState('');
  const [baseNumber, setBaseNumber] = useState('');
  const [quantity, setQuantity] = useState('');

  


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
  
    // Check if it's Android, request write permission specifically
    if (Platform.OS === 'android') {
      const { status: writeStatus } = await Contacts.requestPermissionsAsync();
      if (writeStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Write permission for contacts is required.');
        return;
      }
    }
  
    try {
      // Generate contacts
      for (let i = 0; i < totalContacts; i++) {
        let phoneNumber = `${countryCode}${parseInt(baseNumber) + i}`;
  
        const contact = {
          [Contacts.Fields.FirstName]: `Contact ${i + 1}`,
          [Contacts.Fields.PhoneNumbers]: [{ number: "08375647474", isPrimary: true, label: 'mobile' }],
        };
  
        // Save the contact
        await Contacts.addContactAsync(contact);
      }
  
      Alert.alert('Success', `${totalContacts} contacts created successfully!`);
    } catch (error) {
      Alert.alert('Error', `Failed to save contact: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.up}></View>
      <Text style={styles.text1}>Enter Country Code and Phone Number...</Text>
      <BeautifulButton style={styles.fill} title={"Get Random"}  />
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
      <TouchableOpacity style={styles.more} onPress={() => navigation.navigate('NumberScreen')}>
        <Text style={styles.moretext}>Get More Samples Numbers</Text>
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
  fill:{
    right:"30%",
    height:50,
    width:150
  },
  more:{
    top:"25%"
  },
  moretext:{
    marginLeft: 15,
    color: '#C04000',
    fontSize: 28,
  }
});
