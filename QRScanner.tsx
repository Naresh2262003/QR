import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

function QRScanner() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [latestScannedData, setLatestScannedData] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    requestPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      const value = codes[0]?.value;
      if (value && !modalVisible) { 
        setLatestScannedData(value);
        setModalVisible(true); 
        console.log(value);
      }
    },
  });

  const copyToClipboard = () => {
    Clipboard.setString(latestScannedData || '');
    setModalVisible(false); 
  };

  const closeModal = () => {
    setModalVisible(false); 
  };

  if (device == null) {
    return (
      <View>
        <Text>Device Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
      />
      <View style={styles.overlay}>
        <View style={styles.scanArea} />
      </View>
      {/* Modal for scanned value */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Scanned Value</Text>
            <Text style={styles.modalValue}>{latestScannedData}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Text style={styles.buttonText}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 10,
    bottom: '15%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  copyButton: {
    backgroundColor: '#00FF00',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    borderRadius: 5,
  }
});

export default QRScanner;
