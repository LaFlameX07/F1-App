import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(); // Get reference to Firestore instance
const auth = getAuth();

const Signup: React.FC = () => {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    if (email === "" || password === "" || fullname === "") {
        setError("Please fill in all fields.");
    }
    else {
        try {
            // Sign up the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Add user details to Firestore database
            await addDoc(collection(db, 'users'), {
                fullname: fullname,
                email: email
            });

            // User successfully signed up
            console.log("User signed up:", user);

            // Redirect or perform any action upon successful signup
            navigation.navigate('Login'); // Navigate to login page
        } catch (error) {
            setError(error.message);
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }
    }
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headingText: {
      fontSize: 32,
      width: "80%",
      marginBottom: 35,
      textAlign: "center"
    },
    input: {
      height: 50,
      width: '80%',
      borderRadius: 15,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 30,
    },
    button: {
      padding: 10,
      backgroundColor: '#272A2B',
      borderRadius: 10,
      width: 100,
      marginTop: 10,
    },
    buttonText: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
    },
    subHeadingText: {
      fontSize: 16,
      width: '80%',
      marginBottom: 40,
      textAlign: "center"
    },
    errorText: {
      color: 'red',
    }
  });

  return (
    <View style={styles.container}>

      <Text style={styles.headingText}>Alumni Tracking System </Text>
      <Text style={styles.subHeadingText}>We are happy to have you here</Text>

      <TextInput
        style={styles.input}
        placeholder="Fullname"
        onChangeText={(text) => {
          setError(null);
          setFullname(text)
        }}
        value={fullname}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => {
          setError(null);
          setEmail(text)
        }}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => {
          setError(null);
          setPassword(text)
        }
        }
        value={password}
        secureTextEntry={true}
      />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>Already have an account?
        <Text style={{ color: 'black', fontWeight: 800 }} onPress={() => navigation.navigate('Login')}>
          {' '}Log In
        </Text>
      </Text>
      {
        error &&
        <Text
          style={styles.errorText}
        >{error}</Text>
      }
    </View>
  );
};

export default Signup;
