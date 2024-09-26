import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const BeautifulButton = ({ title, onPress,style }) => {
  return (
    <View style={[styles.container,style]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
    width: '85%',
    alignSelf:"center"
  },
  button: {
    width: '90%',
    paddingVertical: 15,
    backgroundColor: 'brown',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BeautifulButton;
