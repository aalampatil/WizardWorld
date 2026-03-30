import { Pressable, View, Text } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

export default function SpellCard({ spell }: any) {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => navigation.navigate("SpellDetail", { spell })}
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
          uri:
            spell.attributes.image ||
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
        }}
        style={{ width: "100%", height: 120 }}
        contentFit="cover"
        transition={300}
      />

      <View style={{ padding: 10 }}>
        <Text
          numberOfLines={1}
          style={{
            color: "#FFD700",
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          {spell.attributes.name}
        </Text>

        {spell.attributes.incantation && (
          <Text
            numberOfLines={1}
            style={{
              color: "#aaa",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {spell.attributes.incantation}
          </Text>
        )}
      </View>
    </Pressable>
  );
}