import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>Verifique sua conexão</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {
  render() {
    return <MiniOfflineSign />;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 20
  },
  offlineText: {
    color: '#fff'
  }
});
export default OfflineNotice;
