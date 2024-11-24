import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrGenerator = () => {
  const [msg, setMsg] = useState('');
  const [qrValue, setQrValue] = useState('');

  const handleGenerateQR = () => {
    const trimmedMsg = msg.trim();
    setQrValue(trimmedMsg);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Type any message Generator "
        value={msg}
        onChangeText={(txt) => setMsg(txt)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleGenerateQR}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>

      <View style={styles.qrContainer}>
        {qrValue === '' ? (
          <Text>Enter a value</Text>
        ) : (
          <QRCode value={qrValue} size={200} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: { 
    width: '90%', 
    marginTop: 50, 
    height: 50, 
    borderRadius: 20,
    alignSelf: 'center',
    paddingLeft: 30,
    borderWidth: 0.5
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: 'purple',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    marginTop: 50,
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QrGenerator;