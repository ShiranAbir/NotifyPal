import { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Modal,
    Image,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

function EventInput(props) {
    const [enteredEventText, setEnteredEventText] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    function eventInputHandler(enteredText) {
        setEnteredEventText(enteredText);
    }

    function addEventHandler() {
        props.onAddEvent(enteredEventText);
        setEnteredEventText('');
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        //console.warn("Converted date: ", date.toString());
        hideDatePicker();
    };

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image
                    style={styles.image}
                    // source={require('../assets/images/')}
                />
                <View style={styles.buttonDateContainer}>
                    <View style={styles.button}>
                        <Button title="Pick Date" onPress={showDatePicker} />
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Your event!"
                    onChangeText={eventInputHandler}
                    value={enteredEventText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
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
        width: 100,
        height: 100,
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
    }
});