import { ScrollView, View, Text, Linking } from "react-native";
import { Image } from "expo-image";

export default function Potion({ route }: any) {
  const { potion } = route.params;
  const data = potion.attributes;

  const Section = ({ title, value }: any) => {
    if (!value) return null;

    return (
      <View style={{ marginTop: 18 }}>
        <Text
          style={{
            color: "#FFD700",
            fontSize: 14,
            fontWeight: "700",
            marginBottom: 4,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: "#DDD",
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          {value}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B0B0B" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Image Header */}
      <View>
        <Image
          source={{
            uri:
              data?.image ||
              "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
          }}
          style={{ width: "100%", height: 300 }}
          contentFit="cover"
        />

        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: "800",
            }}
          >
            {data.name}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={{ padding: 20 }}>

        <Section title="Slug" value={data.slug} />

        <Section title="Effect" value={data.effect} />

        <Section title="Characteristics" value={data.characteristics} />

        <Section title="Difficulty" value={data.difficulty} />

        <Section title="Ingredients" value={data.ingredients} />

        <Section title="Side Effects" value={data.side_effects} />

        <Section title="Brewing Time" value={data.time} />

        <Section title="Inventors" value={data.inventors} />

        <Section title="Manufacturers" value={data.manufacturers} />

        {/* Wiki */}
        {data.wiki && (
          <Text
            style={{
              marginTop: 20,
              color: "#4DA6FF",
              fontSize: 15,
              textDecorationLine: "underline",
            }}
            onPress={() => Linking.openURL(data.wiki)}
          >
            View on Wiki
          </Text>
        )}
      </View>
    </ScrollView>
  );
}