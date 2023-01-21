import {StyleSheet, View, Text, Pressable} from 'react-native';

function EventItem(props) {
    return (
        <View style={styles.eventItem}>
            <Pressable
                android_ripple={{ color: '#210644' }}
                onPress={props.onDeleteItem.bind(this, props.id)}
                style={({ pressed }) => pressed && styles.pressedItem}
            >
                <Text style={styles.eventText}>{props.text}</Text>
            </Pressable>
        </View>
    );
}

export default EventItem;

const styles = StyleSheet.create({
    eventItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
    },
    pressedItem: {
        opacity: 0.5,
    },
    eventText: {
        color: 'white',
        padding: 8,
    },
});