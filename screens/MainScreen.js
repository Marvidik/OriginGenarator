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
  const[userName,setUser]=useState();

  async function fetchRandomUser() {
    try {
      const response = await fetch('https://randomuser.me//api', {
        method: 'GET',
        headers: {
          'X-Api-Key': 'YOUR_API_KEY', // Replace with your actual API key
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const user = await response.json(); // Parse the JSON response
      uss=user.results[0].name.first;
      
      setUser(uss);
      
    } catch (error) {
      console.error('Error fetching random user:', error);
    }
  }
  
 
  


  const isNumeric = (value) => {
    return /^\d+$/.test(value); // Regular expression to check if a string contains only numbers
  };

  const handleGenerateContacts = async () => {
    // Call the function to fetch and log the username
    fetchRandomUser();
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
      function reshuffleNumber(baseNumber, countryCode) {
        // Ensure baseNumber is a string in case it's passed as a number
        let baseNumberStr = baseNumber.toString();
      
        // Split the base number into two parts
        const fixedPart = baseNumberStr.slice(0, 4); // Fixed first part (after country code)
        const remainingPart = baseNumberStr.slice(4); // Remaining part to reshuffle
      
        // Convert remaining digits to an array
        const remainingDigits = remainingPart.split('');
        
        // Shuffle the remaining digits
        for (let i = remainingDigits.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [remainingDigits[i], remainingDigits[j]] = [remainingDigits[j], remainingDigits[i]];
        }
      
        // Join the reshuffled digits and return the new phone number
        return `${countryCode}${fixedPart}${remainingDigits.join('')}`;
      }
      
      for (let i = 0; i < totalContacts; i++) {
         
        
        // Generate a reshuffled phone number
        let phoneNumber = reshuffleNumber(baseNumber, countryCode);
        // console.log(phoneNumber);
        console.log(userName);
      
        // const contact = {
        //   [Contacts.Fields.FirstName]: `{userName} ${i + 1}`,
        //   [Contacts.Fields.PhoneNumbers]: [{ number: phoneNumber, isPrimary: true, label: 'mobile' }],
        // };
      
        // // Save the contact
        // await Contacts.addContactAsync(contact);
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
      <BeautifulButton style={styles.fill} title={"Get Random"} onPress={() => navigation.navigate('NumberScreen')} />
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
      {/* <TouchableOpacity style={styles.more} onPress={() => navigation.navigate('NumberScreen')}>
        <Text style={styles.moretext}>Get More Samples Numbers</Text>
      </TouchableOpacity> */}
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
