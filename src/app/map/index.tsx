import { View, StyleSheet } from 'react-native';
import React from 'react';
import MapScreen from '../../components/MapsComponent';

const MapPage = () => {
  return (
    <View style={styles.container}>
      <MapScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container fills the available space
  },
});

export default MapPage;
