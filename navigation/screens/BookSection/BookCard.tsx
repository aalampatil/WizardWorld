import { View, Text, Image, Pressable } from "react-native"
import React from "react"

const BookCard = ({ book, onPress }: any) => {
  const { attributes } = book

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        backgroundColor: "#1a1a25",
        borderRadius: 14,
        padding: 12,
        marginBottom: 14,
        alignItems: "center"
      }}
    >
      {/* Cover */}
      <Image
        source={{ uri: attributes.cover }}
        style={{
          width: 70,
          height: 100,
          borderRadius: 8,
          marginRight: 14
        }}
        resizeMode="cover"
      />

      {/* Info */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#FFD700",
            marginBottom: 6,

          }}
        >
          {attributes.title}
        </Text>

        <Text style={{ color: "#aaa", fontSize: 14 }}>
          {attributes.author}
        </Text>
      </View>
    </Pressable>
  )
}

export default BookCard