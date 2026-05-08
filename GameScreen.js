import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import Card from '../components/Card';

export default function GameScreen({ navigation }) {
    const initialCards = [
        { id: 1, value: "🍎", flipped: false, matched: false },
        { id: 2, value: "🍎", flipped: false, matched: false },
        { id: 3, value: "🍌", flipped: false, matched: false },
        { id: 4, value: "🍌", flipped: false, matched: false },
        { id: 5, value: "🍇", flipped: false, matched: false },
        { id: 6, value: "🍇", flipped: false, matched: false },
    ];

    const [cards, setCards] = useState(initialCards);
    const [selected, setSelected] = useState([]);
    const [score, setScore] = useState(0);

    const flipCard = (card) => {
        if (card.flipped || card.matched) return;

        const updatedCards = cards.map(c =>
            c.id === card.id ? { ...c, flipped: true } : c
        );
        setCards(updatedCards);

        const newSelected = [...selected, card];
        setSelected(newSelected);

        if (newSelected.length === 2) {
            if (newSelected[0].value === newSelected[1].value) {
                // Match found
                setCards(prev =>
                    prev.map(c =>
                        c.value === card.value ? { ...c, matched: true } : c
                    )
                );
                setScore(score + 10);
            } else {
                // Reset after short delay
                setTimeout(() => {
                    setCards(prev =>
                        prev.map(c =>
                            c.flipped && !c.matched ? { ...c, flipped: false } : c
                        )
                    );
                }, 1000);
            }
            setSelected([]);
        }
    };

    const submitScore = async () => {
        await fetch('http://localhost:5000/api/game/addScore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: "Player1", score })
        });
        navigation.navigate("Leaderboard");
    };

    return (
        <View>
            <Text>🎮 Memory Puzzle Game</Text>
            <Text>Score: {score}</Text>
            <FlatList
                data={cards}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card item={item} onPress={flipCard} />
                )}
            />
            <Button title="Submit Score" onPress={submitScore} />
        </View>
    );
}
