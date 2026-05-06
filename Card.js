import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Card({ item, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
            <Text style={styles.text}>
                {item.flipped || item.matched ? item.value : "❓"}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 80,
        height: 80,
        margin: 10,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        fontSize: 24,
    },
});
