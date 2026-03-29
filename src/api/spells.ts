import axios from "axios";

export type Spell = {
  id: string;
  type: "spell";
  attributes: {
    slug: string;
    category: string | null;
    creator: string | null;
    effect: string | null;
    hand: string | null;
    image: string | null;
    incantation: string | null;
    light: string | null;
    name: string;
    wiki: string;
  };
  links: {
    self: string;
  };
};

export const fetchSpells = async () => {
  const response = await axios.get("https://api.potterdb.com/v1/spells");
  return response.data.data;
};
