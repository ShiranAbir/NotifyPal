import { useState, useEffect  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet,
  View,
  Button,
  FlatList,
} from 'react-native';
import * as Calendar from 'expo-calendar';

import EventItem from './components/EventItem';
import EventInput from './components/EventInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [events, setEvents] = useState([]);

  function startAddEventHandler() {
    setModalIsVisible(true);
  }

  function endAddEventHandler() {
    setModalIsVisible(false);
  }

  async function addEventHandler(enteredEventText, date) {
    setEvents((currentEvents) => [
      ...currentEvents,
      { text: date.toString() + " " + enteredEventText, id: Math.random().toString() },
    ]);
    await addEventToCalendar(enteredEventText, date);
    endAddEventHandler();
  }

  function deleteEventHandler(id) {
    setEvents((currentEvents) => {
      return currentEvents.filter((event) => event.id !== id);
    });
  }

  async function addEventToCalendar(enteredEventText, date) {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    const convertedDate = Date.parse(date)
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const eventData = {
        title: enteredEventText,
        startDate: convertedDate,
        endDate: convertedDate + 1800*1000,
        alarms: [{
          relativeOffset: -10,
          method: Calendar.AlarmMethod.ALERT,
        }]
      }
      await Calendar.createEventAsync(calendars[0].id, eventData)
    } else {
      console.warn("No calendar permissions granted!")
    }
}

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Event"
          color="#a065ec"
          onPress={startAddEventHandler}
        />
        <EventInput
          visible={modalIsVisible}
          onAddEvent={addEventHandler}
          onCancel={endAddEventHandler}
        />
        <View style={styles.eventsContainer}>
          <FlatList
            data={events}
            renderItem={(itemData) => {
              return <EventItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteEventHandler}
              />
            }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  eventsContainer: {
    flex: 5
  }
});
