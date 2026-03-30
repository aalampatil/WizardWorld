import { FlatList, View } from "react-native";
import { useEffect } from "react";
import PotionCard from "./PotionCard";
import { usePotionStore } from "../../../src/store/potterStore";

const PotionScreen = () => {
  const { potions, fetchPotions } = usePotionStore()

  useEffect(() => {
    fetchPotions();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0B0B0B", padding: 10 }}>
      <FlatList
        data={potions}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PotionCard potion={item} />}
        onEndReached={fetchPotions}
        onEndReachedThreshold={0.4}
      />
    </View>
  );
};

export default PotionScreen;