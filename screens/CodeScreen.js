import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import BeautifulTextInput from '../components/Textinput';
import BeautifulButton from '../components/Button';

export default function CodeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.component}>
      <BeautifulTextInput text={"Enter Confirmation Code"}  styles1={styles.b1}/>
      <BeautifulButton title={"Confirm"} />

      {/* Make Payment Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.payment}>Make Payment</Text>
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
            <Text style={styles.modalText}>Make usdt (TRC20)payment to the address below: Uqdryhewvyfyvfvy_vbhwvwyywevy</Text>
            <BeautifulTextInput text={"Enter Address Used for Transaction"} styles1={styles.b2} />
            <BeautifulTextInput text={"Enter Email To receive code"}  styles1={styles.b2}/> 
            <BeautifulButton
              title="Submit"
              
            />
           <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.paymentclose}>close</Text>
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
    textAlign: 'center', // Centers the text
    marginTop: 20,
  },
  paymentclose: {
    fontSize: 24,
    color: '#C04000',
    textAlign: 'center', // Centers the text
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Adds transparency
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
  b1:{
    width:"70%"
  },
  b2:{
    width:"90%"
  }
});
