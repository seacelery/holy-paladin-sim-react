const presets = [
    {
        name: "Standard Beacon of Faith",
        priorityList: `Algari Mana Potion | Timers = [30]
Blessing of the Seasons | Avenging Wrath (Awakening) not active | or | Avenging Wrath not active
Tyr's Deliverance | Avenging Wrath (Awakening) not active
Avenging Wrath | Divine Toll cooldown = 0 | and | Holy Power >= 3
Judgment | Awakening Ready active | and | Holy Power < 5
Holy Shock | Holy Shock charges = 2 | and | Rising Sunlight not active
Holy Shock | Holy Power <= 2 | and | Holy Shock charges = 2 | and | Rising Sunlight active
Holy Prism
Eternal Flame | Dawnlight active
Eternal Flame | Holy Power = 5 | and | Unending Light stacks = 9
Light of Dawn | Holy Power = 5
Eternal Flame | Holy Power >= 3 | and | Avenging Wrath active | and | Divine Toll cooldown = 0 | and | Unending Light stacks = 9
Eternal Flame | Holy Power >= 3 | and | Avenging Wrath (Awakening) active | and | Divine Toll cooldown = 0 | and | Unending Light stacks = 9
Light of Dawn | Holy Power >= 3 | and | Avenging Wrath active | and | Divine Toll cooldown = 0
Light of Dawn | Holy Power >= 3 | and | Avenging Wrath (Awakening) active | and | Divine Toll cooldown = 0
Divine Toll | Avenging Wrath active | or | Avenging Wrath (Awakening) active
Holy Shock | Holy Power <= 2 | and | Rising Sunlight active
Holy Shock | Holy Power < 5 | and | Rising Sunlight not active
Crusader Strike | Holy Power <= 3
Holy Light | Divine Favor active | and | Infusion of Light active
Holy Light | Infusion of Light active | and | Liberation active
Flash of Light | Infusion of Light active
Judgment | Awakening Ready not active | and | Awakening stacks < 8
Eternal Flame | Unending Light stacks = 9 | and
Light of Dawn
Hammer of Wrath
Arcane Torrent
Crusader Strike
Consecration`,
    },
];

const convertStringToPriorityList = (string) => {
    return string.split("\n").map((priorityListItem) => priorityListItem.trim());
};

const convertPriorityListToString = (priorityList) => {
    if (Array.isArray(priorityList) && priorityList.length === 1 && priorityList[0] === " | ") {
        return "";
    };
    
    return priorityList.join("\n");
};

const infoModalHTML = `
    Conditions<div id="info-modal-divider"></div>
    Time<br>
    Timers<br>
    Fight length<br>
    Mana<br>
    Holy Power<br>
    Ability name cooldown<br>
    Ability name charges<br>
    Buff name active/not active<br>
    Buff name duration<br>
    Buff name stacks<br>
    Talent name talented/not talented<br>
    Previous Ability<br>
    Overhealing<br>
    <br>
    Operations<div id="info-modal-divider"></div>
    Condition = or <span class="aligned">!=</span> Value<br>
    Condition &gt; or <span class="aligned">&gt;=</span> Value<br>
    Condition &lt; or <span class="aligned">&lt;=</span> Value<br>
    Value &lt; or <span class="aligned">&lt;=</span> Condition &lt; or <span class="aligned">&lt;=</span> Value<br>
    Timers = [Values]<br>
    Timers = [Values]+<br>
    <br>
    Examples<br>
    <div id="info-modal-divider"></div>
    Infusion of Light stacks = 2<br>
    Mana &lt;= 50%<br>
    30 < Time <= 40<br>
    Beacon of Virtue cooldown <= 3 * GCD<br>
    Timers = [0, 150, 300]<br>
    Timers = [30]+<br>
    Previous Ability = Daybreak<br>
    Light of Dawn overhealing > 70%<br>
    Holy Infusion talented
`;

const infoModalContent = [
    {
        header: "Conditions",
        items: [
            "Time",
            "Timers",
            "Fight length",
            "Mana",
            "Holy Power",
            "Ability name cooldown",
            "Ability name charges",
            "Buff name active/not active",
            "Buff name duration",
            "Buff name stacks",
            "Talent name talented/not talented",
            "Previous Ability",
            "Overhealing",
        ],
    },
    {
        header: "Operations",
        items: [
            "Condition = or != Value",
            "Condition > or >= Value",
            "Condition < or <= Value",
            "Value < or <= Condition < or <= Value",
            "Timers = [Values]",
            "Timers = [Values]+",
        ],
    },
    {
        header: "Examples",
        items: [
            "Infusion of Light stacks = 2",
            "Mana <= 50%",
            "30 < Time <= 40",
            "Beacon of Virtue cooldown <= 3 * GCD",
            "Timers = [0, 150, 300]",
            "Timers = [30]+",
            "Previous Ability = Daybreak",
            "Light of Dawn overhealing > 70%",
            "Holy Infusion talented",
        ],
    },
]

export { presets, convertStringToPriorityList, convertPriorityListToString, infoModalContent };