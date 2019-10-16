import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  FlatList,
  PanResponder,
  Image
} from 'react-native';
import { TextInput } from '../../../../../components';
import SongItem from './SongItem';

import { ScaledSheet } from '../../../../../utils';
import scale, { heightPercentage } from '../../../../../utils/scaleUtil';
import { colors } from '../../../../../styles';
import { localization, images } from '../../../../../constants';
import {
  getBottomSpace,
  getStatusBarHeight
} from 'react-native-iphone-x-helper';
import songSelectionStyles from '../styles';

const styles = ScaledSheet.create({
  draggable: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    backgroundColor: colors.white
  },

  headerContainer: {
    width: '100%',
    height: scale(57),
    backgroundColor: colors.gray,
    justifyContent: 'center',
    padding: scale(10)
  },

  dragHandle: {},

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '10@s',
    borderRadius: 5,
    backgroundColor: colors.white
  },

  searchIcon: {
    width: '22@s',
    height: undefined,
    aspectRatio: 1
  },

  input: {
    flex: 1,
    backgroundColor: colors.white,
    fontFamily: 'AkzidenzGroteskBE-Cn',
    fontSize: scale(22),
    color: colors.darkGray,
    borderBottomWidth: 0,
    paddingVertical: 0,
    paddingLeft: '5@s'
  },

  list: {
    flex: 1,
    width: '100%'
  }
});

const bottomSpace = getBottomSpace();
const statusBarHeight =
  bottomSpace !== 0 ? getStatusBarHeight() + scale(10) : 0;

const roundHeaderHeight = scale(83);

const height =
  heightPercentage(100) - songSelectionStyles.playerQueueContainer.height - roundHeaderHeight - bottomSpace - statusBarHeight;

const basePosition = {
  x: 0,
  y: height - styles.headerContainer.height
};

class SongSearchBar extends React.Component {
  constructor(props) {
    super(props);

    const { initialPositionOffset } = props;
    this.initialPosition = {
      x: basePosition.x - initialPositionOffset.x,
      y: basePosition.y - initialPositionOffset.y
    };

    const position = new Animated.ValueXY(this.initialPosition);

    const parentResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        this.snapToTop();
        return true
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        const { toTop } = this.state;

        if (toTop) {
          return gestureState.dy > 6;
        }

        return gestureState.dy < -6;
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (evt, gestureState) => {
        const { toTop } = this.state;
        const newy = gestureState.dy;

        if (toTop && newy < 0) {
          return;
        }

        if (toTop) {
          position.setValue({ x: 0, y: newy });
        } else {
          position.setValue({
            x: 0,
            y: this.initialPosition.y + newy
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { toTop } = this.state;

        if (toTop) {
          if (gestureState.dy > 50) {
            this.snapToBottom();
          } else {
            this.snapToTop();
          }
        } else if (gestureState.dy < -90) {
          this.snapToTop();
        } else {
          this.snapToBottom();
        }
      }
    });

    this.parentResponder = parentResponder;
    this.state = { position, toTop: false, editable: true, };
  }

  componentDidUpdate({ initialPositionOffset: prevInitialOffset }) {
    const { initialPositionOffset } = this.props;
    if (
      initialPositionOffset.x !== prevInitialOffset.x ||
      initialPositionOffset.y !== prevInitialOffset.y
    ) {
      this.initialPosition = {
        x: basePosition.x - initialPositionOffset.x,
        y: basePosition.y - initialPositionOffset.y
      };
    }
  }

  snapToTop = () => {
    const { position } = this.state;

    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 300
    }).start(() => {});

    if (this.searchInput) {
      this.searchInput.focus();
    }

    this.setState({ toTop: true });
  };

  snapToBottom = () => {
    const { position } = this.state;

    Animated.timing(position, {
      toValue: this.initialPosition,
      duration: 150
    }).start(() => {});

    this.setState({ toTop: false, editable: false });
    setTimeout(() => {
      this.setState({ editable: true })
    }, 300);
  };

  renderItem = ({ item }) => {
    const { onSongPress } = this.props;
    return <SongItem song={item} onPress={() => { 
      onSongPress(item)
      this.setState({ editable: false })
    }} />;
  };
  
  render() {
    const { position } = this.state;
    const { initialPositionOffset, onSearchTextChange, songs } = this.props;

    const draggableViewSizeStyle = {
      height: height - initialPositionOffset.y
    };

    return (
      <Animated.View
        style={[styles.draggable, draggableViewSizeStyle, position.getLayout()]}
      >
        <View style={styles.headerContainer} {...this.parentResponder.panHandlers}>
            <View style={styles.inputContainer}>
                <Image source={images.search} style={styles.searchIcon} />
                <TextInput
                    containerStyle={{flex: 1}}
                    inputStyle={styles.input}
                    placeholder={localization.searchSpotify}
                    placeholderTextColor={colors.mediumGray}
                    onChangeText={onSearchTextChange}
                    editable={this.state.editable}
                    setRef={ref => {
                      this.searchInput = ref
                    }}
                />
            </View>
        </View>
        <FlatList
          bounces
          style={styles.list}
          data={songs}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps
        />
      </Animated.View>
    );
  }
}

SongSearchBar.propTypes = {
  initialPositionOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onSongPress: PropTypes.func,
  onSearchTextChange: PropTypes.func,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      singer: PropTypes.string,
      albumCover: PropTypes.string
    })
  )
};

SongSearchBar.defaultProps = {
  initialPositionOffset: {
    x: 0,
    y: 0
  },
  onSongPress: () => null,
  onSearchTextChange: () => null,
  songs: []
};

export default SongSearchBar;
