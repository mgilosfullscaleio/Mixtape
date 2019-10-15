import React, { Component } from 'react';
import { View, Animated, Easing, ImageBackground } from 'react-native';
import Text from '../Text';
import * as R from 'ramda';
import { images } from '../../constants';
import styles from './styles';

export default class SlotMachine extends Component {
  static get defaultProps() {
    return {
      text: ['Song 1'],
      width: 300,
      height: 100,
      duration: 6000,
      delay: 0,
      times: 20,
      range: ['Song 1', 'Song 2'],
      initialAnimation: true,
      styles: {},
      renderTextContent: currentChar => currentChar,
      useNativeDriver: false
    };
  }

  constructor(props) {
    super(props);
    this.renderSlot = this.renderSlot.bind(this);
    this.startInitialAnimation = this.startInitialAnimation.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.text = props.text;
    let values;
    if (props.initialAnimation) {
      values = this.getInitialSlotsValues(props);
    } else {
      values = this.getAlignedValues(props).map(val => new Animated.Value(val));
    }
    this.state = { values, initialAnimation: false };
  }

  componentDidMount() {
    const { delay, initialAnimation } = this.props;
    if (!initialAnimation) {
      return;
    }
    setTimeout(this.startInitialAnimation, delay);
  }

  getPosition(index, props = this.props) {
    const position = -1 * index * props.height;
    return position;
  }

  getRepeatedObjs(props) {
    const { range, times } = props;

    const repeatedObjs = R.repeat(range, times);
    repeatedObjs[0] === repeatedObjs[1];
    const newRepeatedObjs = [].concat.apply([], repeatedObjs);

    return newRepeatedObjs;
  }

  getAlignedValues(props) {
    const repeatedObjs = this.getRepeatedObjs(props);

    const values = repeatedObjs.map(() => {
      // const index = repeatedObjs.indexOf(props.text);
      const animationValue = this.getPosition(0, props);
      return animationValue;
    });

    return values;
  }

  getInitialSlotsValues(props) {
    const values = [];
    const repeatedObjs = this.getRepeatedObjs(props);

    let repeatedObjsLength = repeatedObjs.length;

    const animationValue = this.getPosition(repeatedObjsLength - 1, props);

    while (repeatedObjsLength--) {
      values.push(new Animated.Value(animationValue));
    }

    return values;
  }

  generateSlots(props) {
    const textStr = props.text;
    const elements = textStr.map(this.renderSlot);
    return elements;
  }

  startInitialAnimation() {
    const { values } = this.state;
    const { duration, useNativeDriver } = this.props;
    const easing = Easing.inOut(Easing.ease);

    const animations = values.map((value, i) => {
      const animationDuration = duration - (values.length - 1 - i);
      return Animated.timing(value, {
        toValue: 0,
        duration: animationDuration,
        easing,
        useNativeDriver
      });
    });

    Animated.parallel(animations).start(() => {
      const newValues = this.getAlignedValues(this.props);
      newValues.forEach((value, i) => values[i].setValue(value));
      this.setState({ initialAnimation: false });
    });

    this.setState({ initialAnimation: true });
  }

  renderContent(currentChar, currentSinger, i, range) {
    const { styles: overrideStyles, renderTextContent } = this.props;
    const textContent = renderTextContent(currentChar, currentSinger, i, range);
    return (
      <>
        <Text style={[styles.text, overrideStyles.text]}>{textContent}</Text>
      </>
    );
  }

  renderSlot(charToShow, position) {
    const {
      range,
      styles: overrideStyles,
      height,
      width,
      renderContent = this.renderContent
    } = this.props;
    const { initialAnimation, values } = this.state;
    const charToShowIndex = range.indexOf(charToShow);

    const repeatedObjs = this.getRepeatedObjs(this.props);

    const slots = repeatedObjs.map((num, i) => {
      let currentChar = num;

      if (initialAnimation) {
        const currentIndex = (i + charToShowIndex) % range.length;
        currentChar = range[currentIndex];
      }

      const content = renderContent(currentChar, i, range);
      return (
        <Animated.View
          key={i}
          style={[
            styles.slotInner,
            { height },
            overrideStyles.slotInner,
            { transform: [{ translateY: values[position] }] }
          ]}
        >
          <ImageBackground
            style={styles.bg}
            defaultSource={images.highlightedSongBar}
            source={images.highlightedSongBar}
            resizeMode="cover"
          >
            {content}
          </ImageBackground>
        </Animated.View>
      );
    });

    return (
      <View
        key={position}
        style={[
          styles.slotWrapper,
          { height, width },
          overrideStyles.slotWrapper
        ]}
      >
        {slots}
        <View style={[styles.innerBorder, overrideStyles.innerBorder]} />
        <View style={[styles.outerBorder, overrideStyles.outerBorder]} />
        <View
          style={[
            styles.overlay,
            { bottom: height / 1.6 },
            overrideStyles.overlay
          ]}
        />
      </View>
    );
  }

  render() {
    const slots = this.generateSlots(this.props);
    return (
      <View style={[styles.container, this.props.styles.container]}>
        {slots}
      </View>
    );
  }
}
