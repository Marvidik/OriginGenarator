import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import TwoTextFields from '../components/Countryphone'
import BeautifulTextInput from '../components/Textinput'
import BeautifulButton from '../components/Button'
import { MaterialIcons } from '@expo/vector-icons';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.up}></View>
      <Text style={styles.text1}>Enter Country code and Phone Number....</Text>
      <TwoTextFields/>
      <Text style={styles.text2}>Enter Number of cintacts to create</Text>
      <BeautifulTextInput text={"Number of numbers"} style={styles.input}/>
      <BeautifulButton title={"Generate"}/>
      <TouchableOpacity style={styles.deleteButton} onPress={console.log("deleted")}>
        <MaterialIcons name="delete" size={24} color="#C04000" />
        <Text style={styles.delete}>Delete Previous contacts</Text>
      </TouchableOpacity>
      
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    up:{
        height:100,
        width:"100%",
        backgroundColor:"brown",
        borderBottomEndRadius:40,
        borderBottomStartRadius:40
    },
    text1:{
        marginTop:100,
        marginLeft:20,
        fontSize:24,
        color:"grey"
        
    },
    text2:{
        marginLeft:20,
        fontSize:24,
        color:"grey"
    },
    input:{
        alignSelf:"center"
    },
    delete: {
        marginLeft: 5, // Space between the icon and the text
        color: '#C04000', // Match the text color
        fontSize: 20,
    },
    deleteButton: {
        flexDirection: 'row', // Aligns the icon and text horizontally
        alignItems: 'center',
        alignSelf:"center"
    },
})