import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import BottomDrawer from 'rn-bottom-drawer';

import scale, { heightPercentage } from '../../../../../utils/scaleUtil';
import { colors } from '../../../../../styles';
import { FlatList } from 'react-native-gesture-handler';

const SongSearchBar = () => {
  const [isFocused, setFocused] = useState(false);
  const drawerRef = useRef();
  const inputRef = useRef();

  return (
    <BottomDrawer
      ref={drawerRef}
      containerHeight={heightPercentage(60)}
      offset={scale(195)}
      downDisplay={scale(376)}
      startUp={false}
      backgroundColor="green"
      onExpanded={() => {
        console.log('expanded');
      }}
      onCollapsed={() => {
        console.log('collapsed');
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <View
          style={{
            height: scale(57),
            backgroundColor: colors.gray,
            justifyContent: 'center',
            padding: scale(10)
          }}
        >
          <TextInput
            style={{
              flex: 1,
              backgroundColor: 'white',
              fontFamily: 'AkzidenzGroteskBE-Cn',
              fontSize: scale(22),
              paddingVertical: 0,
              borderRadius: 5
            }}
            ref={inputRef}
            placeholder="SEARCH SPOTIFY"
            placeholderTextColor="#3c3f44"
            onFocus={() => {
              const newPos =
                drawerRef.current.state.currentPosition ===
                drawerRef.current.UP_POSITION
                  ? drawerRef.current.DOWN_POSITION
                  : drawerRef.current.UP_POSITION;
              drawerRef.current.setCurrentPosition(newPos);
              // inputRef.current.focus();
            }}
          />
        </View>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          renderItem={() => (
            <View
              style={{ height: 30, backgroundColor: 'yellow', marginTop: 5 }}
            />
          )}
        />
      </View>
    </BottomDrawer>
  );
};

export default SongSearchBar;
