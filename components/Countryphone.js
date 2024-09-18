import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TwoTextFields = () => {
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      {/* Country Code Container */}
      <View style={styles.countryCodeContainer}>
        <Text style={styles.plusSign}>+</Text>
        <TextInput
          style={styles.countryCodeInput}
          placeholder="1"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={countryCode}
          onChangeText={text => setCountryCode(text.replace(/\D/, ''))} // Allows only numbers
          maxLength={3} // Limits input to 3 digits (e.g., +1, +44, etc.)
        />
      </View>

      {/* Phone Number Input */}
      <TextInput
        style={styles.phoneNumberInput}
        placeholder="Phone Number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text.replace(/\D/, ''))} // Allows only numbers
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Aligns the two text inputs horizontally
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom:20
  },
  countryCodeContainer: {
    flexDirection: 'row', // Aligns the plus sign and country code input horizontally
    alignItems: 'center',
    width: '25%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  plusSign: {
    fontSize: 18,
    color: '#333',
    paddingRight: 5, // Adds spacing between the plus sign and the input field
  },
  countryCodeInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
  },
  phoneNumberInput: {
    width: '65%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default TwoTextFields;
