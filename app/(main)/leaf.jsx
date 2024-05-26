import { useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import Collapsible from 'react-native-collapsible'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { diseases } from '../../constants/constant'
const Leaf = () => {
  const [activeSections, setActiveSections] = useState([])

  const toggleSection = (section) => {
    setActiveSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s !== section)
        : [section]
    )
  }

  return (
    <View className='p-4 flex-1 bg-white'>
      <Text className='text-3xl text-center mb-4 font-semibold'>
        Disease that can be detected
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {diseases.map((disease, index) => (
          <View key={index} className='w-full my-2'>
            <TouchableOpacity
              onPress={() => toggleSection(index)}
              className='bg-gray-200 p-2 rounded flex-row justify-between items-center'
            >
              <Text className='text-lg'>{disease.name}</Text>
              <Icon
                name={
                  activeSections.includes(index) ? 'expand-less' : 'expand-more'
                }
                size={24}
                color='green'
              />
            </TouchableOpacity>
            <Collapsible
              collapsed={!activeSections.includes(index)}
              className='bg-white p-4 border border-gray-200 rounded'
            >
              {disease.classes.map((classe, subIndex) => (
                <View key={subIndex} className='my-2'>
                  <Text className='text-base font-semibold'>
                    {classe.name}:
                  </Text>
                  <Text className='text-sm text-gray-600'>
                    {classe.description}
                  </Text>
                  <Image
                    source={{ uri: classe.image }}
                    className=' h-36 w-full mt-2 '
                    resizeMode='contain'
                  />
                </View>
              ))}
            </Collapsible>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default Leaf