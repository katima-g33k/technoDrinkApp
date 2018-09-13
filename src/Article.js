import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 5,
  },
});

export default class Article extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
  }

  renderParagraph = paragraph => (
    <Text key={paragraph} style={styles.paragraph}>
      {paragraph}
    </Text>
  )

  renderParagraphs = () => this.props.children.split('\n').map(this.renderParagraph)

  render() {
    return (
      <View>
        {this.renderParagraphs()}
      </View>
    );
  }
}
