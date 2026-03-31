import { ScrollView, View, Text, Linking } from "react-native";
import { Image } from "expo-image";

export default function Spell({ route }: any) {
  const { spell } = route.params;
  const data = spell.attributes;

  const Section = ({ title, value }: any) => {
    if (!value) return null;

    return (
      <View style={{ marginTop: 18 }}>
        <Text
          style={{
            color: "#FFD700",
            fontWeight: "700",
            marginBottom: 4,
          }}
        >
          {title}
        </Text>

        <Text style={{ color: "#ddd", lineHeight: 22 }}>{value}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0B0B0B" }}>
      {/* Header */}
      <View>
        <Image
          source={{
            uri:
              data.image ||
              "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
          }}
          style={{ width: "100%", height: 280 }}
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
              color: "#FFD700",
              fontSize: 30,
              fontWeight: "800",
            }}
          >
            {data.name}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={{ padding: 20 }}>

        <Section title="Incantation" value={data.incantation} />

        <Section title="Effect" value={data.effect} />

        <Section title="Category" value={data.category} />

        <Section title="Creator" value={data.creator} />

        <Section title="Hand Movement" value={data.hand} />

        <Section title="Light" value={data.light} />

        <Section title="Slug" value={data.slug} />

        {data.wiki && (
          <Text
            style={{
              marginTop: 20,
              color: "#4DA6FF",
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