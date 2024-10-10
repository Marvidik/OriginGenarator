import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import BeautifulTextInput from '../components/Textinput';
import BeautifulButton from '../components/Button';

export default function CodeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Function to handle the API request
  const handleConfirmCode = async () => {
    try {
      const response = await fetch(`https://geneator.pythonanywhere.com/token/${confirmationCode}`);
      if (response.status === 200) {
        // Navigate to the next screen if the code is correct
        navigation.navigate('MainScreen');
      } else {
        // Show an error message if the code is incorrect
        Alert.alert('Error', 'Wrong confirmation code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.component}>
      <BeautifulTextInput
        text={"Enter Confirmation Code"}
        styles1={styles.b1}
        onChangeText={setConfirmationCode} // Capture the entered confirmation code
      />
      <BeautifulButton
        title={"Confirm"}
        onPress={handleConfirmCode} // Trigger the confirmation process
      />

      {/* Make Payment Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {/* <Text style={styles.payment}>Make Payment</Text> */}
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Handles closing on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Make USDT (TRC20) payment to the address below: Uqdryhewvyfyvfvy_vbhwvwyywevy</Text>
            <BeautifulTextInput text={"Enter Address Used for Transaction"} styles1={styles.b2} />
            <BeautifulTextInput text={"Enter Email To receive code"} styles1={styles.b2} />
            <BeautifulButton
              title="Submit"
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.paymentclose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payment: {
    fontSize: 18,
    color: '#C04000',
    textAlign: 'center',
    marginTop: 20,
  },
  paymentclose: {
    fontSize: 24,
    color: '#C04000',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  b1: {
    width: '70%',
  },
  b2: {
    width: '90%',
  },
});
