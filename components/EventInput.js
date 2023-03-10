import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Modal,
    Image,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

function EventInput(props) {
    const [enteredEventText, setEnteredEventText] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(false);

    function eventInputHandler(enteredText) {
        setEnteredEventText(enteredText);
    }

    async function addEventHandler() {
        await props.onAddEvent(enteredEventText, date);
        setEnteredEventText('');
    }

    function closeModal() {
        // Clean user input on close
        setEnteredEventText('')
        setDate(false)

        props.onCancel()
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };

    const dateView = (date) ? moment(date).format('LLL') : 'Please select date'

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/alarm.png')}
                />
                <View style={styles.buttonDateContainer}>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Text style={styles.dateContainer}>
                        {dateView}
                    </Text>
                    <View style={styles.button}>
                        <Button title='Select alarm' color="#f32230" onPress={showDatePicker}></Button>
                    </View>               
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Your event!"
                    onChangeText={eventInputHandler}
                    value={enteredEventText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={closeModal} color="#f31282" />
                    </View>
                    <View style={styles.button}>
                        <Button title="Add Event" onPress={addEventHandler} color="#b180f0" />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default EventInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b'
    },
    image: {
        width: 64,
        height: 64,
        margin: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        color: '#120438',
        borderRadius: 6,
        width: '100%',
        height: 50,
        padding: 16,
    },
    dateContainer: {
        backgroundColor: '#e4d0ff',
        color: '#120438',
        borderRadius: 6,
        height: 50,
        padding: 16,
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row',
    },
    buttonDateContainer: {
        marginBottom: 16,
        flexDirection: 'row',
    },
    button: {
        width: 100,
        marginHorizontal: 8,
        flex: 1,
        justifyContent: 'center',
    }
});