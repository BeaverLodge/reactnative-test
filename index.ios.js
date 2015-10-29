/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;
var moment = require('moment');

var MOCKED_EVENTS = [
  {
    title: "Lunch Time Learning",
    startTime: "2015-10-29T12:00:00+08:00",
    endTime: "2015-10-29T13:00:00+08:00",
    description: "Beating Procrastination and Improving Productivity – Roy Robilliard\nRegister at http://www.eventbrite.com/e/beat-procrastination-and-improve-productivity-tickets-18989689673",
    location: "spacecubed",
    image: "http://spacecubed.com/wp-content/uploads/bfi_thumb/Screen-Shot-2014-12-05-at-1.11.19-pm-m4rkt2x1srbdiw9z0euqai0qxb28voe05g99dsl11e.png"
  },
  {
    title: "Open House Spacecubed 45",
    startTime: "2015-11-01T08:00:00+08:00",
    endTime: "2015-11-01T12:00:00+08:00",
    description: "for every Friday morning between 8:00 am and 12:00 pm and welcome anyone who is interested in event space, meeting space, co-working space, permanent space or just being part of this growing community in the Perth CBD. It is the perfect time to visit Spacecubed with your laptop and give co-working a go for FREE.\n\nhttp://www.spacecubed.com/community/open-house/",
    location: "spacecubed",
    image: "http://spacecubed.com/wp-content/uploads/2015/06/DS4_3140-1-200x133.jpg"
  },
  {
    title: "Port80 Meetup",
    startTime: "2015-11-04T18:00:00+08:00",
    endTime: "2015-11-04T19:00:00+08:00",
    description: "Meet geeks. Talk to people whose eyes do not glaze over. Listen to expert talks then ask difficult questions. Do that social thing that you do so well. Port80 is part of the Australian Web Industry Association (AWIA). We are the white hats in the web industry; join us to help educate the market and for your own professional development.",
    location: "synclabs",
    image: "http://spacecubed.com/wp-content/uploads/2015/06/port80.jpeg"
  },
];


var SpacecubedApp = React.createClass({

  fetchData: function() {
    // fetch(REQUEST_URL)
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
    //       loaded: true,
    //     });
    //   })
    //   .done();

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(MOCKED_EVENTS),
      loaded: true,
    });
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading events...
        </Text>
      </View>
    );
  },

  renderEvent: function(event) {
    var when = moment(event.startTime).format("MMM D @ h:mm a") +
          ' – ' +
          moment(event.endTime).format("h:mm a");
    return (
      <View style={styles.container}>
        <Image
          source={{uri: event.image}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.year}>{when}</Text>
        </View>
      </View>
    );
  },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderEvent}
        style={styles.listView}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 63,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('SpacecubedApp', () => SpacecubedApp);
