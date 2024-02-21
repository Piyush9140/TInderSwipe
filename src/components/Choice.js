import {View, Image} from 'react-native';
import React from 'react';

const Choice = () => {
  return (
    <View>
      <Image
        source={require('../Images/RedCross1.png')}
        style={{
          height: 80,
          width: 80,
          borderRadius: 50,
          overflow: 'hidden',
        }}></Image>
    </View>
  );
};

export default Choice;
