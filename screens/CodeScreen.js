import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import BeautifulTextInput from '../components/Textinput';
import BeautifulButton from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CodeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if the confirmation code is already saved
    const checkStoredCode = async () => {
      const savedCode = await AsyncStorage.getItem('confirmationCode');
      if (savedCode) {
        navigation.navigate('MainScreen');
      }
    };
    checkStoredCode();
  }, []);

  const handleConfirmCode = async () => {
    setLoading(true); // Show loading indicator
    try {
      const response = await fetch(`https://geneator.pythonanywhere.com/token/${confirmationCode}`);
      if (response.status === 200) {
        // Store the confirmation code locally
        await AsyncStorage.setItem('confirmationCode', confirmationCode);
        // Navigate to the next screen if the code is correct
        navigation.navigate('MainScreen');
      } else {
        Alert.alert('Error', 'Wrong confirmation code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.component}>
      {loading ? (
        <ActivityIndicator size="large" color="#C04000" />
      ) : (
        <>
          <BeautifulTextInput
            text={"Enter Confirmation Code"}
            styles1={styles.b1}
            onChangeText={setConfirmationCode}
          />
          <BeautifulButton title={"Confirm"} onPress={handleConfirmCode} />

          <TouchableOpacity onPress={() => setModalVisible(true)}></TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Make USDT (TRC20) payment to the address below: Uqdryhewvyfyvfvy_vbhwvwyywevy
                </Text>
                <BeautifulTextInput text={"Enter Address Used for Transaction"} styles1={styles.b2} />
                <BeautifulTextInput text={"Enter Email To receive code"} styles1={styles.b2} />
                <BeautifulButton title="Submit" />
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.paymentclose}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
