const healingHeaders = ["Spell Name", "%", "Healing", "HPS", "Casts", "Average", "Hits", "Crit %", "Mana Spent", "Holy Power", "CPM", "OH %"];

const selfBuffHeaders = ["Buff Name", "Count", "Uptime", "Average Duration"];

const targetBuffHeaders = ["Buff Name", "Count", "Uptime"];

const manaHeaders = ["Spell Name", "Mana Gained", "Mana Spent"];
const holyPowerHeaders = ["Spell Name", "Holy Power Gained", "Holy Power Wasted", "Holy Power Spent"];

const excludedSpells = [
    "Reclamation (Holy Shock)", "Reclamation (Crusader Strike)", "Divine Revelations (Holy Light)", "Divine Revelations (Judgment)", 
    "Aerated Mana Potion", "Tirion's Devotion", "Source of Magic", "Mana Spring Totem", "Symbol of Hope", "Mana Tide Totem",
    "Algari Mana Potion", "Sureki Zealot's Insignia"
];

// displays only casts and resource gains
const excludedSpellsOnlyResourcesAndCasts = [
    "Beacon of Virtue", "Beacon of Faith", "Blessing of the Seasons", "Blessing of Summer", "Blessing of Autumn", "Blessing of Winter", "Blessing of Spring", 
    "Divine Favor", "Avenging Wrath", "Arcane Torrent", "Aerated Mana Potion"
];

// displays casts with average as healing divided by casts
const excludedSpellsCasts = [
    "Beacon of Light", "Overflowing Light", "Resplendent Light", "Crusader's Reprieve", "Judgment of Light", "Greater Judgment", 
    "Touch of Light", "Afterimage", "Glimmer of Light", "Glimmer of Light (Glistening Radiance (Light of Dawn))",
    "Glimmer of Light (Glistening Radiance (Word of Glory))", "Glimmer of Light (Daybreak)", "Embrace of Akunda", "Holy Reverberation", 
    "Restorative Sands", "Echoing Tyrstone", "Smoldering Seedling", "Blossom of Amirdrassil Large HoT", "Blossom of Amirdrassil Small HoT", 
    "Blossom of Amirdrassil Absorb", "Blossom of Amirdrassil", "Barrier of Faith (Holy Shock)", "Barrier of Faith (Flash of Light)", 
    "Barrier of Faith (Holy Light)", "Leech", "Dreaming Devotion", "Veneration", "Merciful Auras", "Light of the Martyr ", "Saved by the Light",
    "Chirping Rune", "Larodar's Fiery Reverie", "Rashok's Molten Heart", "Magazine of Healing Darts", "Bronzed Grip Wrappings",
    "Dawnlight", "Dawnlight (HoT)", "Dawnlight (AoE)", "Afterimage (Word of Glory)", "Afterimage (Eternal Flame)", "Eternal Flame (HoT)",
    "Broodkeeper's Promise", "Sun Sear", "Sacred Weapon 1", "Sacred Weapon 2", "Authority of Fiery Resolve", "Rite of Adjuration",
    "Avenging Crusader (Judgment)", "Avenging Crusader (Crusader Strike)", "Sun's Avatar", "Divine Guidance", "Hammer and Anvil", "Scrapsinger's Symphony",
    "Siphoning Phylactery Shard", "Creeping Coagulum ", "Gruesome Syringe", "Truth Prevails", "Saved by the Light (Word of Glory)", 
    "Saved by the Light (Eternal Flame)", "Saved by the Light (Light of Dawn)", "Radiant Aura", "Sacred Word", "Fading Light"
];

// displays casts with average as healing divided by hits
const excludedSpellsCastsAverageHits = [
    "Gift of the Naaru"
];

const excludedSpellsCrit = [
    "Beacon of Light", "Overflowing Light", "Resplendent Light", "Crusader's Reprieve", "Crusader Strike", "Judgment", "Daybreak", 
    "Divine Toll", "Smoldering Seedling", "Blossom of Amirdrassil Absorb", "Blossom of Amirdrassil", "Lay on Hands", "Leech", "Veneration",
    "Light of the Martyr ", "Saved by the Light", "Dawnlight", "Broodkeeper's Promise", "Sacred Weapon", "Holy Bulwark",
    "Avenging Crusader", "Siphoning Phylactery Shard", "Fading Light"
];

const excludedSpellsAverage = [
    "Dawnlight"
];

const selfBuffsMap = {
    "Tyr's Deliverance (self)": "Tyr's Deliverance",
};

const targetBuffsMap = {
    "Eternal Flame (HoT)": "Eternal Flame",
    "Tyr's Deliverance (target)": "Tyr's Deliverance",
    "Dawnlight (HoT)": "Dawnlight",
};

const manaMap = {
    "Divine Revelations (Judgment)": "Divine Revelations",
    "Divine Revelations (Holy Light)": "Divine Revelations",
    "Reclamation (Holy Shock)": "Reclamation",
    "Reclamation (Crusader Strike)": "Reclamation",
};

const overlappingBuffs = ["Sureki Zealot's Insignia", "Solar Grace", "Ara-Kara Sacbrood"];
const overlappingBuffsData = {
    "Sureki Zealot's Insignia": {
        "applied_duration": 12
    },
    "Solar Grace": {
        "applied_duration": 12
    },
    "Ara-Kara Sacbrood": {
        "applied_duration": 60
    }
};

const generatorCooldownsRow = ["Holy Shock", "Judgment", "Crusader Strike", "Hammer of Wrath", "Consecration", "Beacon of Virtue"];
const majorCooldownsRow = [
    "Avenging Wrath", "Daybreak", "Divine Toll", "Tyr's Deliverance",
    "Light's Hammer", "Holy Prism", "Barrier of Faith", "Blessing of the Seasons", 
    "Divine Favor", "Lay on Hands", "Arcane Torrent", "Fireblood", "Gift of the Naaru"
];

export { healingHeaders, selfBuffHeaders, targetBuffHeaders, manaHeaders, holyPowerHeaders, excludedSpells, excludedSpellsOnlyResourcesAndCasts, excludedSpellsCasts, excludedSpellsCastsAverageHits, excludedSpellsCrit, excludedSpellsAverage, selfBuffsMap, targetBuffsMap, overlappingBuffs,overlappingBuffsData, manaMap, generatorCooldownsRow, majorCooldownsRow };