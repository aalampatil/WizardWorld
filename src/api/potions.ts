import axios from "axios";

export type Potion = {
  id: string;
  type: "potion";
  attributes: {
    slug: string;
    characteristics: string | null;
    difficulty: string | null;
    effect: string | null;
    image: string | null;
    inventors: string | null;
    ingredients: string | null;
    manufacturers: string | null;
    name: string;
    side_effects: string | null;
    time: string | null;
    wiki: string;
  };
  links: {
    self: string;
  };
};

export const fetchPotions = async (page = 1) => {
  const response = await axios.get(
    `https://api.potterdb.com/v1/potions?page[number]=${page}`,
  );
  return response.data;
};

console.log(fetchPotions());
