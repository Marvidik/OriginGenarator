import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TwoTextFields = ({ onCountryCodeChange, onPhoneNumberChange }) => {
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Update country code and pass it to parent component as a number
  const handleCountryCodeChange = (text) => {
    const cleanedCode = text.replace(/\D/, ''); // Allows only numbers
    setCountryCode(cleanedCode);
    onCountryCodeChange(Number(cleanedCode) || 0); // Convert to number and pass to parent
  };

  // Update phone number and pass it to parent component as a number
  const handlePhoneNumberChange = (text) => {
    const cleanedNumber = text.replace(/\D/, ''); // Allows only numbers
    setPhoneNumber(cleanedNumber);
    onPhoneNumberChange(Number(cleanedNumber) || 0); // Convert to number and pass to parent
  };

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
          onChangeText={handleCountryCodeChange}
          maxLength={3} // Limits input to 3 digits
        />
      </View>

      {/* Phone Number Input */}
      <TextInput
        style={styles.phoneNumberInput}
        placeholder="Phone Number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  countryCodeContainer: {
    flexDirection: 'row',
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
    paddingRight: 5,
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
