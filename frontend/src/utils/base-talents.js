const classTalentsLive = [
    "", "Lay on Hands", "", "Auras of the Resolute", "", "Hammer of Wrath", "", // 1
    "Improved Cleanse", "Empyreal Ward", "Fist of Justice", "", "Repentance/Blinding Light", "", "Turn Evil", // 2
    "A Just Reward", "Afterimage", "", "Divine Steed", "Light's Countenance", "Greater Judgment", "Wrench Evil/Stand Against Evil", // 3
    "Holy Reprieve", "", "Cavalier", "Divine Spurs", "Steed of Liberty/Blessing of Freedom", "", "Rebuke", // 4
    "", "Obduracy", "", "Divine Toll", "Echoing Blessings", "Sanctified Plates", "Punishment", // 5
    "Divine Reach", "", "Blessing of Sacrifice", "Divine Resonance/Quickened Invocation", "Blessing of Protection", "", "Consecrated Ground", // 6
    "", "Holy Aegis", "Sacrifice of the Just/Recompense", "Sacred Strength/Divine Purpose", "Improved Blessing of Protection", "Unbreakable Spirit", "", // 7
    "Lightforged Blessing", "Lead the Charge", "Worthy Sacrifice/Righteous Protection", "Holy Ritual", "Blessed Calling", "Inspired Guard", "Judgment of Light", // 8
    "Faith's Armor", "Stoicism", "Seal of Might", "Seal of the Crusader", "Vengeful Wrath", "Eye for an Eye", "Golden Path/Selfless Healer", // 9
    "", "Of Dusk and Dawn", "", "Lightbearer", "", "Light's Revocation", "" // 10
];

const classTalentsPTR = [
    "", "Lay on Hands", "", "Auras of the Resolute", "", "Hammer of Wrath", "", // 1
    "Improved Cleanse", "Empyreal Ward", "Fist of Justice", "", "Repentance/Blinding Light", "", "Turn Evil", // 2
    "A Just Reward", "Afterimage", "", "Divine Steed", "Light's Countenance", "Greater Judgment", "Wrench Evil/Stand Against Evil", // 3
    "Holy Reprieve", "", "Cavalier", "Divine Spurs", "Steed of Liberty/Blessing of Freedom", "", "Rebuke", // 4
    "", "Obduracy", "", "Divine Toll", "Echoing Blessings", "Sanctified Plates", "Punishment", // 5
    "Divine Reach", "", "Blessing of Sacrifice", "Divine Resonance/Quickened Invocation", "Blessing of Protection", "", "Consecrated Ground", // 6
    "", "Holy Aegis", "Sacrifice of the Just/Recompense", "Sacred Strength/Divine Purpose", "Improved Blessing of Protection", "Unbreakable Spirit", "", // 7
    "Lightforged Blessing", "Lead the Charge", "Worthy Sacrifice/Righteous Protection", "Holy Ritual", "Blessed Calling", "Inspired Guard", "Judgment of Light", // 8
    "Faith's Armor", "Stoicism", "Seal of Might", "Seal of the Crusader", "Vengeful Wrath", "Eye for an Eye", "Golden Path/Selfless Healer", // 9
    "", "Of Dusk and Dawn", "", "Lightbearer", "", "Light's Revocation", "" // 10
];

const specTalentsLive = [
    "", "", "", "", "Holy Shock", "", "", "", "",
    "", "", "", "Extrication", "", "Light of Dawn", "", "", "", 
    "", "", "Light's Conviction", "", "Aura Mastery", "", "Beacon of the Lightbringer", "", "", 
    "", "Tower of Radiance", "", "Tirion's Devotion", "", "Unending Light", "", "Awestruck", "", 
    "Moment of Compassion/Resplendent Light", "", "Holy Prism/Barrier of Faith", "", "Unwavering Spirit/Protection of Tyr", "", "Imbued Infusions", "", "Light of the Martyr", 
    "", "Righteous Judgment", "Divine Favor/Hand of Divinity", "Saved by the Light", "", "Light's Protection", "Overflowing Light", "Shining Righteousness", "", 
    "Liberation", "", "Commanding Light", "Glistening Radiance", "Breaking Dawn", "Divine Revelations", "Divine Glimpse", "", "Bestow Light", 
    "", "Beacon of Faith/Beacon of Virtue", "Empyrean Legacy", "Veneration", "", "Avenging Wrath: Might/Avenging Crusader", "Power of the Silver Hand", "Tyr's Deliverance", "", 
    "Truth Prevails", "", "Crusader's Might", "", "Sanctified Wrath/Awakening", "", "Reclamation", "", "Relentless Inquisitor", 
    "", "Rising Sunlight", "", "Glorious Dawn", "Merciful Auras/Blessing of Summer", "Inflorescence of the Sunwell", "", "Boundless Salvation", "", 
];

const specTalentsPTR = [
    "", "", "", "", "Holy Shock", "", "", "", "",
    "", "", "", "Extrication", "", "Light of Dawn", "", "", "", 
    "", "", "Light's Conviction", "", "Aura Mastery", "", "Beacon of the Lightbringer", "", "", 
    "", "Tower of Radiance", "", "Tirion's Devotion", "", "Unending Light", "", "Awestruck", "", 
    "Moment of Compassion/Resplendent Light", "", "Holy Prism/Barrier of Faith", "", "Unwavering Spirit/Protection of Tyr", "", "Imbued Infusions", "", "Light of the Martyr", 
    "", "Righteous Judgment", "Divine Favor/Hand of Divinity", "Saved by the Light", "", "Light's Protection", "Overflowing Light", "Shining Righteousness", "", 
    "Liberation", "", "Commanding Light", "Glistening Radiance", "Breaking Dawn", "Divine Revelations", "Divine Glimpse", "", "Bestow Light", 
    "", "Beacon of Faith/Beacon of Virtue", "Empyrean Legacy", "Veneration", "", "Avenging Wrath: Might/Avenging Crusader", "Power of the Silver Hand", "Tyr's Deliverance", "", 
    "Truth Prevails", "", "Crusader's Might", "", "Sanctified Wrath/Awakening", "", "Reclamation", "", "Relentless Inquisitor", 
    "", "Rising Sunlight", "", "Glorious Dawn", "Merciful Auras/Blessing of Summer", "Inflorescence of the Sunwell", "", "Boundless Salvation", "", 
];

let baseClassTalentsLive = {
    "row1": {
        "Lay on Hands": {"ranks": {"current rank": 0, "max rank": 1}},
        "Auras of the Resolute": {"ranks": {"current rank": 0, "max rank": 1}},
        "Hammer of Wrath": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row2": {
        "Improved Cleanse": {"ranks": {"current rank": 0, "max rank": 1}},
        "Empyreal Ward": {"ranks": {"current rank": 0, "max rank": 1}},
        "Fist of Justice": {"ranks": {"current rank": 0, "max rank": 1}},
        "Repentance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Blinding Light": {"ranks": {"current rank": 0, "max rank": 1}},
        "Turn Evil": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row3": {
        "A Just Reward": {"ranks": {"current rank": 0, "max rank": 1}},
        "Afterimage": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Steed": {"ranks": {"current rank": 0, "max rank": 1}},
        "Light's Countenance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Greater Judgment": {"ranks": {"current rank": 0, "max rank": 1}},
        "Wrench Evil": {"ranks": {"current rank": 0, "max rank": 1}},
        "Stand Against Evil": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row4": {
        "Holy Reprieve": {"ranks": {"current rank": 0, "max rank": 1}},
        "Cavalier": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Spurs": {"ranks": {"current rank": 0, "max rank": 1}},
        "Steed of Liberty": {"ranks": {"current rank": 0, "max rank": 1}},
        "Blessing of Freedom": {"ranks": {"current rank": 0, "max rank": 1}},
        "Rebuke": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row5": {
        "Obduracy": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Toll": {"ranks": {"current rank": 0, "max rank": 1}},
        "Echoing Blessings": {"ranks": {"current rank": 0, "max rank": 1}},
        "Sanctified Plates": {"ranks": {"current rank": 0, "max rank": 2}},
        "Punishment": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row6": {
        "Divine Reach": {"ranks": {"current rank": 0, "max rank": 1}},
        "Blessing of Sacrifice": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Resonance": {"ranks": {"current rank": 0,"max rank": 1}},
        "Quickened Invocation": {"ranks": {"current rank": 0,"max rank": 1}},
        "Blessing of Protection": {"ranks": {"current rank": 0, "max rank": 1}},
        "Consecrated Ground": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row7": {
        "Holy Aegis": {"ranks": {"current rank": 0, "max rank": 1}},
        "Sacrifice of the Just": {"ranks": {"current rank": 0, "max rank": 1}},
        "Recompense": {"ranks": {"current rank": 0, "max rank": 1}},
        "Sacred Strength": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Purpose": {"ranks": {"current rank": 0, "max rank": 1}},
        "Improved Blessing of Protection": {"ranks": {"current rank": 0, "max rank": 1}},
        "Unbreakable Spirit": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row8": {
        "Lightforged Blessing": {"ranks": {"current rank": 0, "max rank": 1}},
        "Lead the Charge": {"ranks": {"current rank": 0,"max rank": 2}},
        "Worthy Sacrifice": {"ranks": {"current rank": 0,"max rank": 1}},
        "Righteous Protection": {"ranks": {"current rank": 0,"max rank": 1}},
        "Holy Ritual": {"ranks": {"current rank": 0,"max rank": 1}},
        "Blessed Calling": {"ranks": {"current rank": 0,"max rank": 1}},
        "Inspired Guard": {"ranks": {"current rank": 0,"max rank": 1}},
        "Judgment of Light": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row9": {
        "Faith's Armor": {"ranks": {"current rank": 0,"max rank": 1}},
        "Stoicism": {"ranks": {"current rank": 0,"max rank": 1}},
        "Seal of Might": {"ranks": {"current rank": 0, "max rank": 2}},
        "Seal of the Crusader": {"ranks": {"current rank": 0,"max rank": 1}},
        "Vengeful Wrath": {"ranks": {"current rank": 0, "max rank": 2}},
        "Eye for an Eye": {"ranks": {"current rank": 0,"max rank": 1}},
        "Golden Path": {"ranks": {"current rank": 0,"max rank": 1}},
        "Selfless Healer": {"ranks": {"current rank": 0,"max rank": 1}},
    },
    "row10": {
        "Of Dusk and Dawn": {"ranks": {"current rank": 0,"max rank": 1}},
        "Lightbearer": {"ranks": {"current rank": 0,"max rank": 1}},
        "Light's Revocation": {"ranks": {"current rank": 0,"max rank": 1}}
    }
};

let baseClassTalentsPTR = {
    "row1": {
        "Lay on Hands": {"ranks": {"current rank": 0, "max rank": 1}},
        "Auras of the Resolute": {"ranks": {"current rank": 0, "max rank": 1}},
        "Hammer of Wrath": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row2": {
        "Improved Cleanse": {"ranks": {"current rank": 0, "max rank": 1}},
        "Empyreal Ward": {"ranks": {"current rank": 0, "max rank": 1}},
        "Fist of Justice": {"ranks": {"current rank": 0, "max rank": 1}},
        "Repentance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Blinding Light": {"ranks": {"current rank": 0, "max rank": 1}},
        "Turn Evil": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row3": {
        "A Just Reward": {"ranks": {"current rank": 0, "max rank": 1}},
        "Afterimage": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Steed": {"ranks": {"current rank": 0, "max rank": 1}},
        "Light's Countenance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Greater Judgment": {"ranks": {"current rank": 0, "max rank": 1}},
        "Wrench Evil": {"ranks": {"current rank": 0, "max rank": 1}},
        "Stand Against Evil": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row4": {
        "Holy Reprieve": {"ranks": {"current rank": 0, "max rank": 1}},
        "Cavalier": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Spurs": {"ranks": {"current rank": 0, "max rank": 1}},
        "Steed of Liberty": {"ranks": {"current rank": 0, "max rank": 1}},
        "Blessing of Freedom": {"ranks": {"current rank": 0, "max rank": 1}},
        "Rebuke": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row5": {
        "Obduracy": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Toll": {"ranks": {"current rank": 0, "max rank": 1}},
        "Echoing Blessings": {"ranks": {"current rank": 0, "max rank": 1}},
        "Sanctified Plates": {"ranks": {"current rank": 0, "max rank": 2}},
        "Punishment": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row6": {
        "Divine Reach": {"ranks": {"current rank": 0, "max rank": 1}},
        "Blessing of Sacrifice": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Resonance": {"ranks": {"current rank": 0,"max rank": 1}},
        "Quickened Invocation": {"ranks": {"current rank": 0,"max rank": 1}},
        "Blessing of Protection": {"ranks": {"current rank": 0, "max rank": 1}},
        "Consecrated Ground": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row7": {
        "Holy Aegis": {"ranks": {"current rank": 0, "max rank": 1}},
        "Sacrifice of the Just": {"ranks": {"current rank": 0, "max rank": 1}},
        "Recompense": {"ranks": {"current rank": 0, "max rank": 1}},
        "Sacred Strength": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Purpose": {"ranks": {"current rank": 0, "max rank": 1}},
        "Improved Blessing of Protection": {"ranks": {"current rank": 0, "max rank": 1}},
        "Unbreakable Spirit": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row8": {
        "Lightforged Blessing": {"ranks": {"current rank": 0, "max rank": 1}},
        "Lead the Charge": {"ranks": {"current rank": 0,"max rank": 2}},
        "Worthy Sacrifice": {"ranks": {"current rank": 0,"max rank": 1}},
        "Righteous Protection": {"ranks": {"current rank": 0,"max rank": 1}},
        "Holy Ritual": {"ranks": {"current rank": 0,"max rank": 1}},
        "Blessed Calling": {"ranks": {"current rank": 0,"max rank": 1}},
        "Inspired Guard": {"ranks": {"current rank": 0,"max rank": 1}},
        "Judgment of Light": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row9": {
        "Faith's Armor": {"ranks": {"current rank": 0,"max rank": 1}},
        "Stoicism": {"ranks": {"current rank": 0,"max rank": 1}},
        "Seal of Might": {"ranks": {"current rank": 0, "max rank": 2}},
        "Seal of the Crusader": {"ranks": {"current rank": 0,"max rank": 1}},
        "Vengeful Wrath": {"ranks": {"current rank": 0, "max rank": 2}},
        "Eye for an Eye": {"ranks": {"current rank": 0,"max rank": 1}},
        "Golden Path": {"ranks": {"current rank": 0,"max rank": 1}},
        "Selfless Healer": {"ranks": {"current rank": 0,"max rank": 1}},
    },
    "row10": {
        "Of Dusk and Dawn": {"ranks": {"current rank": 0,"max rank": 1}},
        "Lightbearer": {"ranks": {"current rank": 0,"max rank": 1}},
        "Light's Revocation": {"ranks": {"current rank": 0,"max rank": 1}}
    }
};
        
let baseSpecTalentsLive = {
    "row1": {
        "Holy Shock": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row2": {
        "Extrication": {"ranks": {"current rank": 0, "max rank": 1}},
        "Light of Dawn": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row3": {
        "Light's Conviction": {"ranks": {"current rank": 0, "max rank": 1}},
        "Aura Mastery": {"ranks": {"current rank": 0, "max rank": 1}},
        "Beacon of the Lightbringer": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row4": {
        "Tower of Radiance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Tirion's Devotion": {"ranks": {"current rank": 0, "max rank": 1}},
        "Unending Light": {"ranks": {"current rank": 0, "max rank": 1}},
        "Awestruck": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row5": {
        "Moment of Compassion": {"ranks": {"current rank": 0, "max rank": 1}},
        "Resplendent Light": {"ranks": {"current rank": 0, "max rank": 1}},
        "Holy Prism": {"ranks": {"current rank": 0, "max rank": 1}},
        "Barrier of Faith": {"ranks": {"current rank": 0, "max rank": 1}},
        "Unwavering Spirit": {"ranks": {"current rank": 0, "max rank": 1}},
        "Protection of Tyr": {"ranks": {"current rank": 0, "max rank": 1}},
        "Imbued Infusions": {"ranks": {"current rank": 0, "max rank": 1}},
        "Light of the Martyr": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row6": {
        "Righteous Judgment": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Favor": {"ranks": {"current rank": 0, "max rank": 1}},
        "Hand of Divinity": {"ranks": {"current rank": 0, "max rank": 1}},
        "Saved by the Light": {"ranks": {"current rank": 0, "max rank": 1}},   
        "Light's Protection": {"ranks": {"current rank": 0, "max rank": 1}},
        "Overflowing Light": {"ranks": {"current rank": 0, "max rank": 1}},
        "Shining Righteousness": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row7": {
        "Liberation": {"ranks": {"current rank": 0, "max rank": 1}},
        "Commanding Light": {"ranks": {"current rank": 0, "max rank": 1}},
        "Glistening Radiance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Breaking Dawn": {"ranks": {"current rank": 0, "max rank": 2}},
        "Divine Revelations": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Glimpse": {"ranks": {"current rank": 0, "max rank": 1}},
        "Bestow Light": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row8": {
        "Beacon of Faith": {"ranks": {"current rank": 0, "max rank": 1}},
        "Beacon of Virtue": {"ranks": {"current rank": 0, "max rank": 1}},
        "Empyrean Legacy": {"ranks": {"current rank": 0, "max rank": 1}},
        "Veneration": {"ranks": {"current rank": 0, "max rank": 1}},
        "Avenging Wrath: Might": {"ranks": {"current rank": 0, "max rank": 1}},
        "Avenging Crusader": {"ranks": {"current rank": 0, "max rank": 1}},
        "Power of the Silver Hand": {"ranks": {"current rank": 0, "max rank": 1}},
        "Tyr's Deliverance": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row9": {
        "Truth Prevails": {"ranks": {"current rank": 0, "max rank": 1}},
        "Crusader's Might": {"ranks": {"current rank": 0, "max rank": 1}},
        "Awakening": {"ranks": {"current rank": 0, "max rank": 1}},
        "Sanctified Wrath": {"ranks": {"current rank": 0, "max rank": 1}},
        "Relentless Inquisitor": {"ranks": {"current rank": 0, "max rank": 1}},
        "Reclamation": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row10": {
        "Rising Sunlight": {"ranks": {"current rank": 0, "max rank": 1}},
        "Glorious Dawn": {"ranks": {"current rank": 0, "max rank": 1}},
        "Merciful Auras": {"ranks": {"current rank": 0, "max rank": 1}},
        "Blessing of Summer": {"ranks": {"current rank": 0, "max rank": 1}},
        "Inflorescence of the Sunwell": {"ranks": {"current rank": 0, "max rank": 1}},
        "Boundless Salvation": {"ranks": {"current rank": 0, "max rank": 1}}
    }
};

let baseSpecTalentsPTR = {
    "row1": {
        "Holy Shock": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row2": {
        "Extrication": {"ranks": {"current rank": 0, "max rank": 1}},
        "Light of Dawn": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row3": {
        "Light's Conviction": {"ranks": {"current rank": 0, "max rank": 1}},
        "Aura Mastery": {"ranks": {"current rank": 0, "max rank": 1}},
        "Beacon of the Lightbringer": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row4": {
        "Tower of Radiance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Tirion's Devotion": {"ranks": {"current rank": 0, "max rank": 1}},
        "Unending Light": {"ranks": {"current rank": 0, "max rank": 1}},
        "Awestruck": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row5": {
        "Moment of Compassion": {"ranks": {"current rank": 0, "max rank": 1}},
        "Resplendent Light": {"ranks": {"current rank": 0, "max rank": 1}},
        "Holy Prism": {"ranks": {"current rank": 0, "max rank": 1}},
        "Barrier of Faith": {"ranks": {"current rank": 0, "max rank": 1}},
        "Unwavering Spirit": {"ranks": {"current rank": 0, "max rank": 1}},
        "Protection of Tyr": {"ranks": {"current rank": 0, "max rank": 1}},
        "Imbued Infusions": {"ranks": {"current rank": 0, "max rank": 1}},
        "Light of the Martyr": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row6": {
        "Righteous Judgment": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Favor": {"ranks": {"current rank": 0, "max rank": 1}},
        "Hand of Divinity": {"ranks": {"current rank": 0, "max rank": 1}},
        "Saved by the Light": {"ranks": {"current rank": 0, "max rank": 1}},   
        "Light's Protection": {"ranks": {"current rank": 0, "max rank": 1}},
        "Overflowing Light": {"ranks": {"current rank": 0, "max rank": 1}},
        "Shining Righteousness": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row7": {
        "Liberation": {"ranks": {"current rank": 0, "max rank": 1}},
        "Commanding Light": {"ranks": {"current rank": 0, "max rank": 1}},
        "Glistening Radiance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Breaking Dawn": {"ranks": {"current rank": 0, "max rank": 2}},
        "Divine Revelations": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Glimpse": {"ranks": {"current rank": 0, "max rank": 1}},
        "Bestow Light": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row8": {
        "Beacon of Faith": {"ranks": {"current rank": 0, "max rank": 1}},
        "Beacon of Virtue": {"ranks": {"current rank": 0, "max rank": 1}},
        "Empyrean Legacy": {"ranks": {"current rank": 0, "max rank": 1}},
        "Veneration": {"ranks": {"current rank": 0, "max rank": 1}},
        "Avenging Wrath: Might": {"ranks": {"current rank": 0, "max rank": 1}},
        "Avenging Crusader": {"ranks": {"current rank": 0, "max rank": 1}},
        "Power of the Silver Hand": {"ranks": {"current rank": 0, "max rank": 1}},
        "Tyr's Deliverance": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row9": {
        "Truth Prevails": {"ranks": {"current rank": 0, "max rank": 1}},
        "Crusader's Might": {"ranks": {"current rank": 0, "max rank": 1}},
        "Awakening": {"ranks": {"current rank": 0, "max rank": 1}},
        "Sanctified Wrath": {"ranks": {"current rank": 0, "max rank": 1}},
        "Relentless Inquisitor": {"ranks": {"current rank": 0, "max rank": 1}},
        "Reclamation": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row10": {
        "Rising Sunlight": {"ranks": {"current rank": 0, "max rank": 1}},
        "Glorious Dawn": {"ranks": {"current rank": 0, "max rank": 1}},
        "Merciful Auras": {"ranks": {"current rank": 0, "max rank": 1}},
        "Blessing of Summer": {"ranks": {"current rank": 0, "max rank": 1}},
        "Inflorescence of the Sunwell": {"ranks": {"current rank": 0, "max rank": 1}},
        "Boundless Salvation": {"ranks": {"current rank": 0, "max rank": 1}}
    }
};

const classTalentsArrowsLive = {
    "down": [
        "Lay on Hands", "Improved Cleanse", "Empyreal Ward", "Repentance/Blinding Light", "Turn Evil", "A Just Reward",
        "Divine Steed", "Wrench Evil/Stand Against Evil", "Steed of Liberty/Blessing of Freedom", "Rebuke", "Divine Toll", 
        "Echoing Blessings", "Punishment", "Blessing of Sacrifice", "Blessing of Protection", "Holy Aegis", 
        "Sacrifice of the Just/Recompense", "Sacred Strength/Divine Purpose", "Improved Blessing of Protection", 
        "Unbreakable Spirit", "Lightforged Blessing", "Lead the Charge", "Worthy Sacrifice/Righteous Protection",
        "Holy Ritual", "Blessed Calling", "Inspired Guard", "Judgment of Light", "Stoicism", "Seal of the Crusader",
        "Eye for an Eye"
    ],
    "downLong": [
        "Auras of the Resolute", "Hammer of Wrath", "Afterimage", "Greater Judgment", "Holy Reprieve", "Cavalier", "Obduracy",
        "Sanctified Plates", "Divine Reach", "Consecrated Ground", 
    ],
    "left": [
        "Lay on Hands", "Auras of the Resolute", "Hammer of Wrath", "Fist of Justice", "Repentance/Blinding Light", "Afterimage",
        "Divine Steed", "Cavalier", "Steed of Liberty/Blessing of Freedom", "Rebuke", "Obduracy", "Divine Toll", "Sanctified Plates", 
        "Blessing of Sacrifice", "Blessing of Protection", "Consecrated Ground", "Holy Aegis", "Sacrifice of the Just/Recompense", 
        "Lead the Charge", "Holy Ritual", "Inspired Guard", "Seal of Might", "Vengeful Wrath", "Golden Path/Selfless Healer"
    ],
    "right": [
        "Lay on Hands", "Auras of the Resolute", "Hammer of Wrath", "Improved Cleanse", "Fist of Justice", "Repentance/Blinding Light", 
        "Divine Steed", "Greater Judgment", "Holy Reprieve", "Cavalier", "Steed of Liberty/Blessing of Freedom", "Obduracy",
        "Divine Toll", "Sanctified Plates", "Divine Reach", "Blessing of Sacrifice", "Blessing of Protection", "Sacrifice of the Just/Recompense", 
        "Sacred Strength/Divine Purpose", "Improved Blessing of Protection", "Unbreakable Spirit", "Lead the Charge", "Holy Ritual", 
        "Inspired Guard", "Faith's Armor", "Seal of Might", "Vengeful Wrath"
    ]
};

const classTalentsArrowsPTR = {
    "down": [
        "Lay on Hands", "Improved Cleanse", "Empyreal Ward", "Repentance/Blinding Light", "Turn Evil", "A Just Reward",
        "Divine Steed", "Wrench Evil/Stand Against Evil", "Steed of Liberty/Blessing of Freedom", "Rebuke", "Divine Toll", 
        "Echoing Blessings", "Punishment", "Blessing of Sacrifice", "Blessing of Protection", "Holy Aegis", 
        "Sacrifice of the Just/Recompense", "Sacred Strength/Divine Purpose", "Improved Blessing of Protection", 
        "Unbreakable Spirit", "Lightforged Blessing", "Lead the Charge", "Worthy Sacrifice/Righteous Protection",
        "Holy Ritual", "Blessed Calling", "Inspired Guard", "Judgment of Light", "Stoicism", "Seal of the Crusader",
        "Eye for an Eye"
    ],
    "downLong": [
        "Auras of the Resolute", "Hammer of Wrath", "Afterimage", "Greater Judgment", "Holy Reprieve", "Cavalier", "Obduracy",
        "Sanctified Plates", "Divine Reach", "Consecrated Ground", 
    ],
    "left": [
        "Lay on Hands", "Auras of the Resolute", "Hammer of Wrath", "Fist of Justice", "Repentance/Blinding Light", "Afterimage",
        "Divine Steed", "Cavalier", "Steed of Liberty/Blessing of Freedom", "Rebuke", "Obduracy", "Divine Toll", "Sanctified Plates", 
        "Blessing of Sacrifice", "Blessing of Protection", "Consecrated Ground", "Holy Aegis", "Sacrifice of the Just/Recompense", 
        "Lead the Charge", "Holy Ritual", "Inspired Guard", "Seal of Might", "Vengeful Wrath", "Golden Path/Selfless Healer"
    ],
    "right": [
        "Lay on Hands", "Auras of the Resolute", "Hammer of Wrath", "Improved Cleanse", "Fist of Justice", "Repentance/Blinding Light", 
        "Divine Steed", "Greater Judgment", "Holy Reprieve", "Cavalier", "Steed of Liberty/Blessing of Freedom", "Obduracy",
        "Divine Toll", "Sanctified Plates", "Divine Reach", "Blessing of Sacrifice", "Blessing of Protection", "Sacrifice of the Just/Recompense", 
        "Sacred Strength/Divine Purpose", "Improved Blessing of Protection", "Unbreakable Spirit", "Lead the Charge", "Holy Ritual", 
        "Inspired Guard", "Faith's Armor", "Seal of Might", "Vengeful Wrath"
    ]
};

const specTalentsArrowsLive = {
    "down": [
        "Glistening Radiance", "Imbued Infusions", "Saved by the Light", "Holy Prism/Barrier of Faith",
        "Power of the Silver Hand", "Light's Protection", "Overflowing Light", "Divine Favor/Hand of Divinity", "Divine Revelations",
        "Reclamation/Barrier of Faith", "Daybreak", "Sanctified Wrath/Awakening", "Commanding Light", "Empyrean Legacy", "Divine Glimpse"
    ],
    "downLong": [
        "Light's Conviction", "Aura Mastery", "Beacon of the Lightbringer", "Tower of Radiance", "Tirion's Devotion",
        "Unending Light", "Awestruck", "Moment of Compassion/Resplendent Light", "Light of the Martyr", "Shining Righteousness",
        "Tyr's Deliverance", "Beacon of Faith/Beacon of Virtue",
    ],
    "left": [
        "Holy Shock", "Extrication", "Light of Dawn", "Light's Conviction", "Beacon of the Lightbringer", "Tower of Radiance",
        "Unwavering Spirit/Protection of Tyr", "Imbued Infusions", "Righteous Judgment","Light's Hammer/Holy Prism",
        "Light's Protection", "Shining Righteousness", "Commanding Light", "Breaking Dawn", "Divine Glimpse", "Bestow Light",
        "Veneration", "Avenging Wrath: Might/Avenging Crusader", "Reclamation/Barrier of Faith", "Maraad's Dying Breath", 
        "Sanctified Wrath/Awakening", "Tyr's Deliverance", "Saved by the Light", "Beacon of Faith/Beacon of Virtue",
        "Reclamation"
    ],
    "right": [
        "Holy Shock", "Extrication", "Light of Dawn", "Light's Conviction", "Beacon of the Lightbringer", "Awestruck",
        "Unwavering Spirit/Protection of Tyr", "Imbued Infusions", "Liberation", "Light's Hammer/Holy Prism",
        "Light's Protection", "Righteous Judgment", "Commanding Light", "Breaking Dawn", "Divine Glimpse", "Beacon of Faith/Beacon of Virtue",
        "Veneration", "Avenging Wrath: Might/Avenging Crusader", "Crusader's Might", "Sanctified Wrath/Awakening", "Tyr's Deliverance",
        "Saved by the Light"
    ]
};

const specTalentsArrowsPTR = {
    "down": [
        "Glistening Radiance", "Imbued Infusions", "Saved by the Light", "Holy Prism/Barrier of Faith",
        "Power of the Silver Hand", "Light's Protection", "Overflowing Light", "Divine Favor/Hand of Divinity", "Divine Revelations",
        "Reclamation/Barrier of Faith", "Daybreak", "Sanctified Wrath/Awakening", "Commanding Light", "Empyrean Legacy", "Divine Glimpse"
    ],
    "downLong": [
        "Light's Conviction", "Aura Mastery", "Beacon of the Lightbringer", "Tower of Radiance", "Tirion's Devotion",
        "Unending Light", "Awestruck", "Moment of Compassion/Resplendent Light", "Light of the Martyr", "Shining Righteousness",
        "Tyr's Deliverance", "Beacon of Faith/Beacon of Virtue",
    ],
    "left": [
        "Holy Shock", "Extrication", "Light of Dawn", "Light's Conviction", "Beacon of the Lightbringer", "Tower of Radiance",
        "Unwavering Spirit/Protection of Tyr", "Imbued Infusions", "Righteous Judgment","Light's Hammer/Holy Prism",
        "Light's Protection", "Shining Righteousness", "Commanding Light", "Breaking Dawn", "Divine Glimpse", "Bestow Light",
        "Veneration", "Avenging Wrath: Might/Avenging Crusader", "Reclamation/Barrier of Faith", "Maraad's Dying Breath", 
        "Sanctified Wrath/Awakening", "Tyr's Deliverance", "Saved by the Light", "Beacon of Faith/Beacon of Virtue",
        "Reclamation"
    ],
    "right": [
        "Holy Shock", "Extrication", "Light of Dawn", "Light's Conviction", "Beacon of the Lightbringer", "Awestruck",
        "Unwavering Spirit/Protection of Tyr", "Imbued Infusions", "Liberation", "Light's Hammer/Holy Prism",
        "Light's Protection", "Righteous Judgment", "Commanding Light", "Breaking Dawn", "Divine Glimpse", "Beacon of Faith/Beacon of Virtue",
        "Veneration", "Avenging Wrath: Might/Avenging Crusader", "Crusader's Might", "Sanctified Wrath/Awakening", "Tyr's Deliverance",
        "Saved by the Light"
    ]
};

const heroTalentsLightsmithLive = [
    "", "Holy Armaments", "",
    "Rite of Sanctification/Rite of Adjuration", "Solidarity", "Divine Guidance/Blessed Assurance",
    "Laying Down Arms", "Divine Inspiration/Forewarning", "Authoritative Rebuke/Tempered in Battle",
    "Shared Resolve", "Valiance", "Hammer and Anvil",
    "", "Blessing of the Forge", ""
];

const heroTalentsLightsmithPTR = [
    "", "Holy Armaments", "",
    "Rite of Sanctification/Rite of Adjuration", "Solidarity", "Divine Guidance/Blessed Assurance",
    "Laying Down Arms", "Divine Inspiration/Forewarning", "Authoritative Rebuke/Tempered in Battle",
    "Shared Resolve", "Valiance", "Hammer and Anvil",
    "", "Blessing of the Forge", ""
];

const heroTalentsHeraldOfTheSunLive = [
    "", "Dawnlight", "",
    "Morning Star/Gleaming Rays", "Eternal Flame", "Luminosity",
    "Illumine/Will of the Dawn", "Blessing of An'she/Lingering Radiance", "Sun Sear",
    "Aurora", "Solar Grace", "Second Sunrise",
    "", "Sun's Avatar", ""
];

const heroTalentsHeraldOfTheSunPTR = [
    "", "Dawnlight", "",
    "Morning Star/Gleaming Rays", "Eternal Flame", "Luminosity",
    "Illumine/Will of the Dawn", "Blessing of An'she/Lingering Radiance", "Sun Sear",
    "Aurora", "Solar Grace", "Second Sunrise",
    "", "Sun's Avatar", ""
];

let baseLightsmithTalents = {
    "row1": {
        "Holy Armaments": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row2": {
        "Rite of Sanctification": {"ranks": {"current rank": 0, "max rank": 1}},
        "Rite of Adjuration": {"ranks": {"current rank": 0, "max rank": 1}},
        "Solidarity": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Guidance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Blessed Assurance": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row3": {
        "Laying Down Arms": {"ranks": {"current rank": 0, "max rank": 1}},
        "Divine Inspiration": {"ranks": {"current rank": 0, "max rank": 1}},
        "Forewarning": {"ranks": {"current rank": 0, "max rank": 1}},
        "Authoritative Rebuke": {"ranks": {"current rank": 0, "max rank": 1}},
        "Tempered in Battle": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row4": {
        "Shared Resolve": {"ranks": {"current rank": 0, "max rank": 1}},
        "Valiance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Hammer and Anvil": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row5": {
        "Blessing of the Forge": {"ranks": {"current rank": 0, "max rank": 1}},
    },
};

const lightsmithTalentsArrowsLive = {
    "down": [
        "Holy Armaments", "Rite of Sanctification/Rite of Adjuration", "Solidarity", "Divine Guidance/Blessed Assurance",
        "Laying Down Arms", "Divine Inspiration/Forewarning", "Authoritative Rebuke/Tempered in Battle", "Valiance"
    ],
    "left": [
        "Holy Armaments", "Hammer and Anvil"
    ],
    "right": [
        "Holy Armaments", "Shared Resolve"
    ]
};

const lightsmithTalentsArrowsPTR = {
    "down": [
        "Holy Armaments", "Rite of Sanctification/Rite of Adjuration", "Solidarity", "Divine Guidance/Blessed Assurance",
        "Laying Down Arms", "Divine Inspiration/Forewarning", "Authoritative Rebuke/Tempered in Battle", "Valiance"
    ],
    "left": [
        "Holy Armaments", "Hammer and Anvil"
    ],
    "right": [
        "Holy Armaments", "Shared Resolve"
    ]
};

let baseHeraldOfTheSunTalents = {
    "row1": {
        "Dawnlight": {"ranks": {"current rank": 0, "max rank": 1}},
    },
    "row2": {
        "Morning Star": {"ranks": {"current rank": 0, "max rank": 1}},
        "Gleaming Rays": {"ranks": {"current rank": 0, "max rank": 1}},
        "Eternal Flame": {"ranks": {"current rank": 0, "max rank": 1}},
        "Luminosity": {"ranks": {"current rank": 0, "max rank": 1}},      
    },
    "row3": {
        "Illumine": {"ranks": {"current rank": 0, "max rank": 1}},
        "Will of the Dawn": {"ranks": {"current rank": 0, "max rank": 1}},
        "Blessing of An'she": {"ranks": {"current rank": 0, "max rank": 1}},
        "Lingering Radiance": {"ranks": {"current rank": 0, "max rank": 1}},
        "Sun Sear": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row4": {
        "Aurora": {"ranks": {"current rank": 0, "max rank": 1}},
        "Solar Grace": {"ranks": {"current rank": 0, "max rank": 1}},
        "Second Sunrise": {"ranks": {"current rank": 0, "max rank": 1}}
    },
    "row5": {
        "Sun's Avatar": {"ranks": {"current rank": 0, "max rank": 1}}
    },
};

const heraldOfTheSunTalentsArrowsLive = {
    "down": [
        "Dawnlight", "Morning Star/Gleaming Rays", "Eternal Flame", "Luminosity", "Illumine/Will of the Dawn",
        "Blessing of An'she/Lingering Radiance", "Sun Sear", "Solar Grace"
    ],
    "left": [
        "Dawnlight", "Second Sunrise"
    ],
    "right": [
        "Dawnlight", "Aurora"
    ]
};

const heraldOfTheSunTalentsArrowsPTR = {
    "down": [
        "Dawnlight", "Morning Star/Gleaming Rays", "Eternal Flame", "Luminosity", "Illumine/Will of the Dawn",
        "Blessing of An'she/Lingering Radiance", "Sun Sear", "Solar Grace"
    ],
    "left": [
        "Dawnlight", "Second Sunrise"
    ],
    "right": [
        "Dawnlight", "Aurora"
    ]
};
        
export { classTalentsLive, classTalentsPTR, specTalentsLive, specTalentsPTR, baseClassTalentsLive, baseClassTalentsPTR, baseSpecTalentsLive, baseSpecTalentsPTR, classTalentsArrowsLive, classTalentsArrowsPTR, specTalentsArrowsLive, specTalentsArrowsPTR, heroTalentsLightsmithLive, heroTalentsHeraldOfTheSunLive, heroTalentsLightsmithPTR, heroTalentsHeraldOfTheSunPTR, baseLightsmithTalents, baseHeraldOfTheSunTalents, lightsmithTalentsArrowsLive, heraldOfTheSunTalentsArrowsLive, lightsmithTalentsArrowsPTR, heraldOfTheSunTalentsArrowsPTR };