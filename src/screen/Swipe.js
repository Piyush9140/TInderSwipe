import {View, Animated, PanResponder} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Card from '../components/Card';
const Swipe = () => {
  const [data, setData] = useState([
    {image: require('../Images/Color-Blue.png'), key: 1},
    {image: require('../Images/Color-Green.jpg'), key: 2},
    {image: require('../Images/color-Cream.jpg'), key: 3},
    {image: require('../Images/Color-Orange.jpg'), key: 4},
    {image: require('../Images/Color-Red.png'), key: 5},
  ]);
  useEffect(() => {
    if (!data.length) {
      setData([
        {image: require('../Images/Color-Blue.png'), key: 1},
        {image: require('../Images/Color-Green.jpg'), key: 2},
        {image: require('../Images/color-Cream.jpg'), key: 3},
        {image: require('../Images/Color-Orange.jpg'), key: 4},
        {image: require('../Images/Color-Red.png'), key: 5},
      ]);
    }
  }, [data]);
  const Move = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      Move.setValue({x: dx, y: dy});
    },

    onPanResponderRelease: (_, {dx, dy}) => {
      let direction = Math.sign(dx);
      let Action = Math.abs(dx) > 200;
      if (Action) {
        Animated.timing(Move, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(Move, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });
  const removeCard = useCallback(() => {
    setData(prepState => prepState.slice(1));
    Move.setValue({x: 0, y: 0});
  }, [Move]);

  return (
    <View style={{flex: 1}}>
      {data
        .map((item, index) => {
          let Top = index === 0;
          let Handler = Top ? panResponser.panHandlers : {};
          const zIndex = data.length -index;
          const translateY = Move.y.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: [20, 20, -20],
          });
          const animatedStyle = {
            transform: [{ translateY: Top ? Move.y : translateY }],
            zIndex,
          };
          return (
            <Animated.View
            key={item.key}
            style={[ Top ? Move.getTranslateTransform() : animatedStyle]}
            {...(Top ? panResponser.panHandlers : {})}
          >
              <Card
                item={item}
                rotate={rotate}
                Top={Top}
                Move={Move}
                {...Handler}
              />
            </Animated.View>
          );
        })
        .reverse()}
    </View>
  );
};

export default Swipe;
