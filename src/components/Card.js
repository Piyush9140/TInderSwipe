import { Image, Dimensions, Animated} from 'react-native';
import React, {useCallback, useRef} from 'react';
import Choice from './Choice';
import Choice2 from './Choice2';
const {height, width} = Dimensions.get('window');
const Card = ({item, Top, Move, ...rest}) => {
  const rotate = Move.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });
  const likeOpacity = Move.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = Move.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const Select = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            opacity: nopeOpacity,
          }}>
          <Choice />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            opacity: likeOpacity,
          }}>
          <Choice2/>
        </Animated.View>
      </>
    );
  }, []);
  return (
    <Animated.View
      style={[
        {
          width: width - 20,
          height: height -150,
          alignSelf: 'center',
          position: 'absolute',
          top: 40,
          borderRadius: 10,
          
          
        },
        Top && {
          transform: [...Move.getTranslateTransform(), {rotate: rotate}],
        },
      ]}
      {...rest}>
      <Image
        source={item.image}
        style={{width: '100%', height: '100%', borderRadius: 10}}
      />
      {Top && Select()}
    </Animated.View>
  );
};

export default Card;