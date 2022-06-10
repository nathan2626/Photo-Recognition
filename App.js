import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  NativeModules,
  Button,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const [label, setLabel] = useState();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function getLabel(uri){
      const detectedLabel = await NativeModules.Detector.detect(uri);
      setLabel(detectedLabel);
    }
    if(response){
      try{
        //const imageCapturee = response.assets[0].uri.replace('image: file://')
        const imageCapturee = response.assets[0].uri
        console.log('image:', imageCapturee)
        getLabel(imageCapturee)
      }catch(err){
        console.log('err:', err)
      }
      
    }
  }, [response]); 

  const handleOnPress = React.useCallback((type) => {
    const options = {
      title: 'Select Image',
      type: 'library',
      options: {
        maxHeight: 299,
        maxWidth: 299,
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: true,
      },
    }

    launchImageLibrary(options, setResponse); 
  }, [])
  


  const handleOnPress1 = async () => {
    /*launchImageLibrary({}, async response => {
      if (!response.didCancel) {
        const detectedLabel = await NativeModules.Detector.detect(response.uri);
        setLabel(detectedLabel);
      }
    });*/
    //launchImageLibrary(options?, callback)

    // You can also use as a promise without 'callback':
    //const result = await launchImageLibrary(options?);
  };

  return (
    <SafeAreaView>
      <ScrollView style={{padding: 20}}>
        <Button title="Pick" onPress={handleOnPress} />
        <Text>{label}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
