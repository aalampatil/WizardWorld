import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

export default function PotionCard({ potion }: any) {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => navigation.navigate("Potion", { potion })}
      style={{
        flex: 1,
        margin: 8,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#1A1A1A",
      }}
    >
      <Image
        source={{
          uri: potion.attributes.image ||
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        }}
        style={{
          width: "100%",
          height: 120,
        }}
        contentFit="cover"
        transition={300}
      />

      <View style={{ padding: 10 }}>
        <Text
          numberOfLines={2}
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {potion.attributes.name}
        </Text>
      </View>
    </Pressable>
  );
}