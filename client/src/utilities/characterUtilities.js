export const characterClasses = [
  "Death Knight",
  "Demon Hunter",
  "Druid",
  "Evoker",
  "Hunter",
  "Mage",
  "Monk",
  "Paladin",
  "Priest",
  "Rogue",
  "Shaman",
  "Warlock",
  "Warrior",
];

export const characterRace = [
  "Human",
  "Dwarf",
  "Night Elf",
  "Gnome",
  "Draenei",
  "Worgen",
  "Pandaren",
  "Dracthyr",
  "Orc",
  "Undead",
  "Tauren",
  "Troll",
  "Blood Elf",
  "Goblin",
];

export const characterRegion = ["us", "eu", "cn", "tw", "kr"];

//convert character class: replacing space to "_" for css:
export const characterClassCSS = (characterClass) => {
  const characterClassForCSS = characterClass.split(" ").join("_");
  return characterClassForCSS;
};
