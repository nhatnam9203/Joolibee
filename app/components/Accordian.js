import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import { images } from '@theme';

export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  renderExpand = () => {
    return this.state.expanded
      ? this.props.renderContent()
      : this.props.renderHeader();
  };

  render() {
    const { title, styleTitle } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={styles.row}
          ref={this.accordian}
          onPress={() => this.toggleExpand()}>
          <Text style={styleTitle}>{title}</Text>
          <Image
            source={
              this.state.expanded
                ? images.icons.ic_arrow_up
                : images.icons.ic_arrow_down
            }
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.renderExpand()}
      </View>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded }, () =>
      this.props.callBack(),
    );
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    alignItems: 'center',
  },
  parentHr: {
    height: 1,
    color: 'white',
    width: '100%',
  },
  child: {
    // backgroundColor: 'grey',
  },
});
