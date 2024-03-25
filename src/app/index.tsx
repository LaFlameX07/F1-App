import { View, Text } from "react-native";
import React, { useEffect } from "react";
import "../../firebase/firebaseConfig"
import { router } from 'expo-router';

const index = () => {

    useEffect(() => {
        setTimeout(()=>{
          router.replace("/auth");
        } , 1000)
      }, []);

  return (
    <View>
      <Text>Welcome Screen</Text>
    </View>
  );
};

export default index;
