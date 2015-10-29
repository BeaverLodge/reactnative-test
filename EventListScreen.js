/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  ListView,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  View,
} = React;
// var TimerMixin = require('react-timer-mixin');

var EventCell = require('./EventCell');
var EventScreen = require('./EventScreen');

var MOCKED_EVENTS = [
  {
    id: 1,
    title: "Lunch Time Learning",
    startTime: "2015-10-29T12:00:00+08:00",
    endTime: "2015-10-29T13:00:00+08:00",
    description: "Beating Procrastination and Improving Productivity – Roy Robilliard\nRegister at http://www.eventbrite.com/e/beat-procrastination-and-improve-productivity-tickets-18989689673",
    location: "spacecubed",
    image: "http://spacecubed.com/wp-content/uploads/bfi_thumb/Screen-Shot-2014-12-05-at-1.11.19-pm-m4rkt2x1srbdiw9z0euqai0qxb28voe05g99dsl11e.png"
  },
  {
    id: 2,
    title: "Open House Spacecubed 45",
    startTime: "2015-11-01T08:00:00+08:00",
    endTime: "2015-11-01T12:00:00+08:00",
    description: "for every Friday morning between 8:00 am and 12:00 pm and welcome anyone who is interested in event space, meeting space, co-working space, permanent space or just being part of this growing community in the Perth CBD. It is the perfect time to visit Spacecubed with your laptop and give co-working a go for FREE.\n\nhttp://www.spacecubed.com/community/open-house/",
    location: "spacecubed",
    image: "http://spacecubed.com/wp-content/uploads/2015/06/DS4_3140-1-200x133.jpg"
  },
  {
    id: 3,
    title: "Port80 Meetup",
    startTime: "2015-11-04T18:00:00+08:00",
    endTime: "2015-11-04T19:00:00+08:00",
    description: "Meet geeks. Talk to people whose eyes do not glaze over. Listen to expert talks then ask difficult questions. Do that social thing that you do so well. Port80 is part of the Australian Web Industry Association (AWIA). We are the white hats in the web industry; join us to help educate the market and for your own professional development.",
    location: "synclabs",
    image: "http://spacecubed.com/wp-content/uploads/2015/06/port80.jpeg"
  },
];


var EventListScreen = React.createClass({
  // mixins: [TimerMixin],

  getInitialState: function() {
    return {
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

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
      dataSource: this.getDataSource(MOCKED_EVENTS),
      isLoading: false,
    });
  },

  // TODO Can steal endless scroll from Movies

  getDataSource: function(events) {
    return this.state.dataSource.cloneWithRows(events);
  },

  selectEvent: function(event: Object) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: event.title,
        component: EventScreen,
        passProps: {event},
      });
    } else {
      this.props.navigator.push({
        title: event.title,
        name: 'event',
        event: event,
      });
    }
  },

  renderSeparator: function(sectionID, rowID, adjacentRowHighlighted) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  },

  renderRow: function(event, sectionID, rowID, highlightRowFunc) {
    return (
      <EventCell
        key={event.id}
        onSelect={() => this.selectEvent(event)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        event={event}
      />
    );
  },

  render: function() {
    var content = this.state.dataSource.getRowCount() === 0 ?
      <NoEvents isLoading={this.state.isLoading} /> :
      <ListView
        ref="listview"
        renderSeparator={this.renderSeparator}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />;

    return (
      <View style={styles.container}>
        <View style={styles.separator} />
        {content}
      </View>
    );
  },
});

var NoEvents = React.createClass({
  render: function() {
    var text = '';
    if (!this.props.isLoading) {
      // If we're looking at the latest events, aren't currently loading, and
      // still have no results, show a message
      text = 'No events found';
    }

    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noEventsText}>{text}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
  noEventsText: {
    marginTop: 80,
    color: '#888888',
  },
  separator: {
    marginTop: 64,
    height: 1,
    backgroundColor: '#eeeeee',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 0,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});

module.exports = EventListScreen;
