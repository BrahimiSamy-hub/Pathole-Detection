import { useState } from 'react'
import { StatusBar, Alert } from 'expo-status-bar'
import realtime from '../assets/djo/realtime.png'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Dimensions,
  Pressable,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Video } from 'expo-av'

const Index = () => {
  const [media, setMedia] = useState(null)

  const handleActionPress = async (index) => {
    if (index === 0) {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

      if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this app to access your camera!")
        return
      }

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setMedia(result.assets[0].uri)
      }
    } else if (index === 1) {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this app to access your photos!")
        return
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setMedia(result.assets[0].uri)
      }
    }
  }

  return (
    <>
      <Text className='text-3xl font-bold text-center pt-10 mb-36'>
        Pothole Detection
      </Text>
      <View className='p-4 h-full'>
        <View className='bg-white'>
          {!media && (
            <>
              <View className='flex flex-row gap-10 justify-center items-center'>
                <TouchableOpacity
                  className='w-28 h-28 border-2 border-cyan-500 justify-center rounded p-4'
                  onPress={() => handleActionPress(1)}
                >
                  <Image
                    source={realtime}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                  <Text className='text-center'>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className='w-28 h-28 border-2 border-cyan-500 justify-center rounded p-4'
                  onPress={() => handleActionPress(0)} // Open Camera
                >
                  <Image
                    source={realtime}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                  <Text className='text-center'>Camera</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {media && (
            <View className='h-96'>
              <Video
                source={{ uri: media }}
                rate={1.0}
                volume={1.0}
                isMuted={true}
                resizeMode='contain'
                shouldPlay
                style={{ height: '100%' }}
                className=''
              />

              <Pressable
                className='bg-cyan-500 rounded-2xl p-2 mt-4 '
                onPress={() => setMedia(null)}
              >
                <Text className='text-white font-bold text-center '>
                  Select Another Video
                </Text>
              </Pressable>
            </View>
          )}
          <StatusBar style='auto' />
        </View>
      </View>
    </>
  )
}

export default Index
