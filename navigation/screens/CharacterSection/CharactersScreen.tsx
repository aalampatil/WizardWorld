import { View, FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useCharacterStore } from "../../../src/store/potterStore";
import CharacterCard from "./CharacterCard";

const CharactersScreen = ({ navigation }: any) => {
  const { characters, fetchCharacters } = useCharacterStore();

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            navigation={navigation}
          />
        )}
        showsVerticalScrollIndicator={true}
        onEndReached={fetchCharacters}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

export default CharactersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f14",
    padding: 16,
  },
});