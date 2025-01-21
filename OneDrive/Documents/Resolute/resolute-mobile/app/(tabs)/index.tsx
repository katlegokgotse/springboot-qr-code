import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');
  const [facing, setFacing] = useState<CameraType>('back');
  const [showWebView, setShowWebView] = useState(false);

  if (!permission) {
    return <Text>Checking camera permissions...</Text>;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to use the camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setData(data);
    Alert.alert('QR Code Scanned!', `Type: ${type}\nData: ${data}`);

    // If the scanned data is a valid Unity WebGL AR URL, display the WebView
    if (data.startsWith("http://") || data.startsWith("https://")) {
      setShowWebView(true); // Show the WebView
    } else {
      Alert.alert("Invalid QR Code", "The QR code does not contain a valid URL.");
    }
  };

  const toggleCameraPosition = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const renderCamera = () => (
    <View style={styles.cameraWrapper}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        active
        style={styles.camera}
        autofocus="on"
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />
    </View>
  );

  const renderWebView = () => (
    <WebView
      source={{ uri: data }} // data holds the scanned URL
      style={styles.webview}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      allowsInlineMediaPlayback={true}
      originWhitelist={['*']} // Ensure it allows any source
    />
  );

  return (
    <View style={styles.container}>
      {showWebView ? (
        renderWebView()
      ) : (
        renderCamera()
      )}
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={toggleCameraPosition}>
        <Text style={styles.buttonText}>Switch Camera</Text>
      </TouchableOpacity>
      <Text style={styles.dataText}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  cameraWrapper: {
    width: 300,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#ff6f61',
    backgroundColor: '#f1e6e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#ff6f61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataText: {
    fontSize: 16,
    marginTop: 20,
    color: '#333',
    textAlign: 'center',
  },
  webview: {
    width: '100%',
    height: '100%',
    marginTop: 20,

  },
});
