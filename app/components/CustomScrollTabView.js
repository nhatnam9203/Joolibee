import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const ACTIVE_BG_COLOR = '#E31837';
const INACTIVE_BG_COLOR = 'transparent';

const ACTIVE_TEXT_COLOR = '#E31837';
const INACTIVE_TEXT_COLOR = '#1B1B1B';

const SCROLL_PAGE_DEFAULT = 0;
const FONT_TEXT_SIZE = 15;
const TAB_DEFAULT_HEIGHT = 60;

const CustomScrollTabView = ({
  children,
  showHeader = true,
  tabIcons,
  onHeaderTabChanged,
}) => {
  /**process */
  const [tabCurrent, changeTabCurrent] = React.useState(SCROLL_PAGE_DEFAULT);

  const onChangeTab = ({ i, ref }) => {
    changeTabCurrent(i);
    if (onHeaderTabChanged) {
      onHeaderTabChanged(i);
    }
  };

  const renderHeaderTab = (args) => {
    return showHeader ? (
      <CustomTabBar {...args} tabIcons={tabIcons} />
    ) : (
      <View />
    );
  };

  return (
    <ScrollableTabView
      style={styles.scrollTab}
      initialPage={SCROLL_PAGE_DEFAULT}
      locked={true}
      scrollWithoutAnimation
      renderTabBar={renderHeaderTab}
      onChangeTab={onChangeTab}>
      {children}
    </ScrollableTabView>
  );
};

//================================
//Custom TabBar
//================================
const CustomTabBar = ({ tabs, goToPage, activeTab, tabIcons }) => {
  const onPressHandle = (page) => {
    if (goToPage) {
      goToPage(page);
    }
  };

  const renderTabItem = (name = '', page) => {
    const activeTextColor =
      activeTab === page ? ACTIVE_TEXT_COLOR : INACTIVE_TEXT_COLOR;
    const activeBackgroundColor =
      activeTab === page ? ACTIVE_BG_COLOR : INACTIVE_BG_COLOR;

    return (
      <TouchableOpacity
        key={name}
        onPress={() => onPressHandle(page)}
        style={styles.tabContainer}>
        <View style={[styles.tab, { borderColor: activeBackgroundColor }]}>
          <Text style={[styles.text, { color: activeTextColor }]}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.tabs, styles.shadow]}>
      {tabs.map((name, page) => renderTabItem(name, page))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#D6D6D6',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 0,
    height: '100%',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
  },
  tabs: {
    height: TAB_DEFAULT_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: FONT_TEXT_SIZE,
    fontFamily: 'Roboto-Bold',
  },
  scrollTab: { flex: 1 },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
export default CustomScrollTabView;
