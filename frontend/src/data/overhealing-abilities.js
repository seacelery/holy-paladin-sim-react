const abilities = [
    "Afterimage",
    "Avenging Crusader (Crusader Strike)",
    "Avenging Crusader (Judgment)",
    "Barrier of Faith",
    "Barrier of Faith (Flash of Light)",
    "Barrier of Faith (Holy Light)",
    "Barrier of Faith (Holy Shock)",
    "Beacon of Light",
    "Crusader's Reprieve",
    "Dawnlight (AoE)",
    "Dawnlight (HoT)",
    "Divine Guidance", 
    "Eternal Flame",
    "Eternal Flame (HoT)",
    "Flash of Light",
    "Gift of the Naaru",
    "Glimmer of Light", 
    "Glimmer of Light (Daybreak)",
    "Golden Path",
    "Greater Judgment",
    "Hammer and Anvil",
    "Holy Bulwark",
    "Holy Light",
    "Holy Prism",
    "Holy Reverberation",
    "Holy Shock",
    "Holy Shock (Divine Resonance)",
    "Holy Shock (Divine Toll)",
    "Holy Shock (Rising Sunlight)",
    "Judgment of Light",
    "Lay on Hands",
    "Light of Dawn",
    "Light of the Martyr",
    "Light's Hammer",
    "Merciful Auras",
    "Overflowing Light",
    "Resplendent Light",
    "Sacred Weapon",
    "Saved by the Light",
    "Seal of Mercy",
    "Sun's Avatar",
    "Sun Sear",
    "Touch of Light",
    "Tyr's Deliverance",
    "Veneration",
    "Word of Glory"
];
const trinkets = [
    "Blossom of Amirdrassil Absorb",
    "Blossom of Amirdrassil Large HoT",
    "Blossom of Amirdrassil Small HoT",
    "Broodkeeper's Promise",
    "Echoing Tyrstone",
    "Miniature Singing Stone",
    "Rashok's Molten Heart",
    "Restorative Sands",
    "Smoldering Seedling",
    "Scrapsinger's Symphony",
    "Gruesome Syringe",
    "Creeping Coagulum",
    "Viscous Coaglam"
];
const miscellaneous = [
    "Dreaming Devotion",
    "Larodar's Fiery Reverie",
    "Leech"
];

const convertAbilitiesToString = (overhealingData) => {
    let string = "";

    for (const ability in overhealingData) {
        string += `${ability} ${overhealingData[ability]}%\n`;
    };

    return string;
};
const convertStringToAbilities = (string) => {
    const abilities = string.split("\n");
    const abilitiesObject = {};

    abilities.forEach((ability) => {
        const lastSpaceIndex = ability.lastIndexOf(" ");
        const abilityName = ability.substring(0, lastSpaceIndex);
        const abilityValue = ability.substring(lastSpaceIndex + 1).replace("%", "");
        abilitiesObject[abilityName] = Number(abilityValue);
    });

    return abilitiesObject;
};

export { abilities, trinkets, miscellaneous, convertAbilitiesToString, convertStringToAbilities };