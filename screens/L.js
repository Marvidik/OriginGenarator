import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        // if (data.length > 0) {
        //   setContacts(data);
        //   data.forEach((contact) => {
        //     if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
        //       console.log(`Name: ${contact.name}, Phone: ${contact.phoneNumbers[0].number}`);
        //     }
        //   });
        // }
      }
    })();
  }, []);

  const addContact = async () => {
    const newContact = {
      [Contacts.Fields.FirstName]: 'New Contact',
      [Contacts.Fields.PhoneNumbers]: [{ number: '1234567890', isPrimary: true, label: 'mobile' }],
    };
    try {
      await Contacts.addContactAsync(newContact);
      alert('Contact added!');
    } catch (error) {
      alert(`Failed to add contact: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Contacts Module Example</Text>
      <Button title="Add Contact" onPress={addContact} />
      <ScrollView>
        {contacts.map((contact, index) => (
          <View key={index} style={styles.contactItem}>
            <Text>{`Name: ${contact.name}`}</Text>
            {contact.phoneNumbers && contact.phoneNumbers.map((phone, i) => (
              <Text key={i}>{`Phone: ${phone.number}`}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contactItem: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    width: '100%',
  },
});
