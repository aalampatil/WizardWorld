import { View, FlatList } from "react-native";
import { useEffect } from "react";
import SpellCard from "./SpellCard";
import { useSpellStore } from "../../../src/store/potterStore";

export default function SpellScreen() {
  const spells = useSpellStore((s) => s.spells);
  const fetchSpells = useSpellStore((s) => s.fetchSpells);

  useEffect(() => {
    fetchSpells();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0B0B0B", padding: 10 }}>
      <FlatList
        data={spells}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SpellCard spell={item} />}
        onEndReached={fetchSpells}
        onEndReachedThreshold={0.4}
      />
    </View>
  );
}