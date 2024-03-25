import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(); // Get reference to Firestore instance
const auth = getAuth();

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const translateY = useRef<Animated.Value>(new Animated.Value(-300)).current;
    const navigation = useNavigation();

    const handleCheckBoxToggle = () => {
        setIsChecked(!isChecked);
    };

    const handleLogin = async () => {
        if (username === "" || password === "") {
            setError("Invalid Username or Password!!!");
        } else {
            try {
                setLoading(true);
                // Sign in user with email and password
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    username,
                    password
                );
                console.log("User signed in:", userCredential.user);
                router.replace("/home"); 
            } catch (error) {
                setError(error.message);
                console.error("Login error:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 1000, // Adjust duration as needed
            useNativeDriver: true,
        }).start();
    }, []);

    const styles = StyleSheet.create({
        button: {
            padding: 10,
            backgroundColor: "#000000",
            marginVertical: 40,
            borderRadius: 15,
            width: 100,
        },
        buttonText: {
            fontSize: 16,
            color: "#ffffff",
            textAlign: "center",
        },
        inputStyle: {
            height: 50,
            width: "80%",
            borderRadius: 15,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 30,
        },
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
        },
        headingText: {
            fontSize: 32,
            width: "80%",
            marginBottom: 40,
            textAlign: "center",
        },
        subHeadingText: {
            fontSize: 16,
            width: "80%",
            marginBottom: 40,
            textAlign: "center",
        },
        normalText: {
            fontSize: 16,
        },
        highlightedText: {
            fontSize: 16,
            fontWeight: "800",
        },
        errorText: {
            color: "red",
        },
    });

    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize : 18,
                    marginBottom : 40,
                }}
            >Welcome Back</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Username"
                onChangeText={(text) => {
                    setError(null);
                    setUsername(text);
                }}
                value={username}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                onChangeText={(text) => {
                    setError(null);
                    setPassword(text);
                }}
                value={password}
                secureTextEntry={true}
            />
            {loading && (
                <ActivityIndicator
                    style={{ marginTop: 20 }}
                    size="large"
                    color="#0010ff"
                />
            )}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={
                ()=>{
                    router.push("/map");
                }
            }>
                <Text style={styles.buttonText}>Maps</Text>
            </TouchableOpacity>

            <Text style={styles.normalText}>
                Don't have an account?
                <Text
                    style={styles.highlightedText}
                    onPress={() => navigation.navigate("Signup")}
                >
                    {" "}
                    Register
                </Text>
            </Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default Login;
