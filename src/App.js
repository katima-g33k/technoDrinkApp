import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import Article from './Article';
import { events } from './data.json';

const IMAGE_RATIO = 2.5;
const TOTAL_CARD_MARGIN = 30;
const styles = StyleSheet.create({
  cardContent: {
    padding: 15,
  },
  container: {
    backgroundColor: '#C5C5C5',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
    marginLeft: TOTAL_CARD_MARGIN / 2,
    marginRight: TOTAL_CARD_MARGIN / 2,
    marginTop: 10,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);

    const imageWidth = Dimensions.get('screen').width - TOTAL_CARD_MARGIN;
    this.state = {
      imageHeight: imageWidth / IMAGE_RATIO,
      imageWidth,
    }
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.setImageWidth);
  }

  componentDidUpdate(prevProps, prevState) {
    const diff = Math.abs(this.state.imageWidth - prevState.imageWidth);

    ToastAndroid.showWithGravity(
      `Image width has change by ${diff}px`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.setImageWidth);
  }

  setImageWidth = (event) => {
    const imageWidth = event.screen.width - TOTAL_CARD_MARGIN;
    this.setState({
      imageHeight: imageWidth / IMAGE_RATIO,
      imageWidth,
    })
  }

  renderEvent = event => (
    <View
      key={event}
      style={styles.eventCard}
    >
      <View>
        <Image
          style={{
            height: this.state.imageHeight,
            width: this.state.imageWidth,
          }}
          source={{ uri: event.imageUrl }}
        />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          <Text>{event.date}</Text>
        </View>
        <Article>{event.description}</Article>
      </View>
    </View>
  )

  renderEvents = () => events.map(this.renderEvent)

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderEvents()}
      </ScrollView>
    );
  }
}
