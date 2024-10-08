import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const BeautifulTextInput = ({ text, onChangeText }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
    if (onChangeText) {
      onChangeText(text); // Call the passed function to update the parent state
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={text}
        placeholderTextColor="#999"
        value={inputValue}
        onChangeText={handleInputChange}
        keyboardType="default"
        returnKeyType="done"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: "85%",
    alignSelf: "center"
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default BeautifulTextInput;
