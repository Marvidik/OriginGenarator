import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import BeautifulButton from '../components/Button';

export default function NumberScreen() {
  return (
    <View style={styles.content}>
        <Text style={styles.info}>Copy The Number You Want To Use And Go Back</Text>
      <View style={styles.numbers}>
        <Text style={styles.num}>08132106194</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => console.log("Deleted")}>
        <MaterialIcons name="content-copy" size={28} color="#C04000" />
      </TouchableOpacity>
      </View>
      <View style={styles.numbers}>
        <Text style={styles.num}>08132106194</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => console.log("Deleted")}>
        <MaterialIcons name="content-copy" size={28} color="#C04000" />
      </TouchableOpacity>
      </View>
      <View style={styles.numbers}>
        <Text style={styles.num}>08132106194</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => console.log("Deleted")}>
        <MaterialIcons name="content-copy" size={28} color="#C04000" />
      </TouchableOpacity>
      </View>
      <BeautifulButton style={styles.fill} title={"Regenerate"}  />
    </View>
  )
}


const styles = StyleSheet.create({
    content:{
        paddingTop:100
    },
    numbers:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        paddingBottom:30
    },
    num:{
        fontSize:28,
        color:"grey"
    },
    info:{
        paddingBottom:30,
        fontSize:22,
        color:"#C04000",
        alignSelf:"center"
    },
    fill:{
        top:"100%"
    }
})