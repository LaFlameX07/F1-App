import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../../../firebase/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { encode } from 'base64-arraybuffer';


const db = getFirestore(); // Get reference to Firestore instance
const auth = getAuth();
const storage = getStorage();

const Signup: React.FC = () => {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const navigation = useNavigation();

  
const handleSignup = async () => {
  setLoading(true);
  if (email === "" || password === "" || fullname === "") {
    setError("Please fill in all fields.");
    setLoading(false);
  } else {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let downloadURL = "";
      if (imageUri) {
        const imageFileName = `profile_${Date.now()}.jpg`;

        // Convert imageUri to Base64-encoded data URL
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = async () => {
          const dataUrl = reader.result?.toString() || '';
          const base64DataUrl = dataUrl.split(',')[1]; // Extract Base64 data from the data URL
          
          // Upload the Base64-encoded data URL to Firebase Storage
          const storageRef = ref(storage, imageFileName);
          await uploadString(storageRef, base64DataUrl, "data_url");
          
          // Get the download URL of the uploaded image
          downloadURL = await getDownloadURL(storageRef);
        };
        reader.readAsDataURL(blob);
      }

      await addDoc(collection(db, "users"), {
        fullname: fullname,
        email: email,
        profileImage: downloadURL,
      });

      console.log("User signed up:", user);
      navigation.navigate("Login");
    } catch (error) {
      setError(error.message);
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  }
};

  // Function to handle image selection
  const selectImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    // Check if assets array exists and is not empty
    if (pickerResult.assets && pickerResult.assets.length > 0) {
      // Get the first asset from the assets array
      const firstAsset = pickerResult.assets[0];
      // Access the URI from the first asset
      setImageUri(firstAsset.uri);
    }
  };

  // Render selected image if available
  const renderImage = () => {
    if (imageUri) {
      return <Image source={{ uri: imageUri }} style={styles.image} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>F1 App</Text>
      <Text style={styles.subHeadingText}>We are happy to have you here</Text>

      <TextInput
        style={styles.input}
        placeholder="Fullname"
        onChangeText={(text) => {
          setError(null);
          setFullname(text);
        }}
        value={fullname}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => {
          setError(null);
          setEmail(text);
        }}
        value={email}
      />

      <TextInput
        style={styles.input}
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
          color="#0000ff"
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Profile Image</Text>
      </TouchableOpacity>
      {renderImage()}

      <Text style={{ marginTop: 10 }}>
        Already have an account?
        <Text
          style={{ color: "black", fontWeight: 800 }}
          onPress={() => navigation.navigate("Login")}
        >
          {" "}
          Log In
        </Text>
      </Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontSize: 32,
    width: "80%",
    marginBottom: 35,
    textAlign: "center",
  },
  subHeadingText: {
    fontSize: 16,
    width: "80%",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    height: 50,
    width: "80%",
    borderRadius: 15,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 30,
  },
  button: {
    padding: 10,
    backgroundColor: "#000000",
    borderRadius: 10,
    width: 150,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
  errorText: {
    color: "red",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default Signup;
