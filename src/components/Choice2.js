import {View, Text, Image} from 'react-native';
import React from 'react';

const Choice2 = ({type}) => {
  return (
    <View>
      <Image
        source={require('../Images/GreenTick.png')}
        style={{
          height: 80,
          width: 80,
          borderRadius: 50,
          overflow: 'hidden',
        }}></Image>
    </View>
  );
};

export default Choice2;
