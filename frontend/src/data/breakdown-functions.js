import { excludedSpellsCasts, excludedSpellsAverage, excludedSpellsCastsAverageHits, excludedSpellsCrit, excludedSpellsOnlyResourcesAndCasts } from "./breakdown-objects";

const formatFixedNumber = (number, decimalPlaces) => {
    return number.toFixed(decimalPlaces);
};

const formatThousands = (number) => {
    return Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatThousandsWithoutRounding = (number) => {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};

const formatPercentage = (number) => {
    return (number * 100).toFixed(1) + "%";
};

const sortAbilityBreakdown = (abilityBreakdown) => {
    let array = Object.entries(abilityBreakdown);
    array.sort((a, b) => b[1].total_healing - a[1].total_healing);

    return Object.fromEntries(array);
};

const sortBreakdownByHeader = (breakdown, header, sortDirection) => {
    let sortFunction;
    
    switch (header) {
        case "Spell Name":
            sortFunction = (a, b) => b[0].localeCompare(a[0]);
            break;
        case "%":
            sortFunction = (a, b) => a[1].total_healing - b[1].total_healing;
            break;
        case "Healing":
            sortFunction = (a, b) => a[1].total_healing - b[1].total_healing;
            break;
        case "HPS":
            sortFunction = (a, b) => a[1].total_healing - b[1].total_healing;
            break;
        case "Casts":
            sortFunction = (a, b) => a[1].casts - b[1].casts;
            break;
        case "CPM":
            sortFunction = (a, b) => a[1].casts - b[1].casts;
            break;
        case "Average":
            sortFunction = (a, b) => a[1].total_healing - b[1].total_healing;
            break;
        case "Hits":
            sortFunction = (a, b) => a[1].hits - b[1].hits;
            break;
        case "Crit %":
            sortFunction = (a, b) => a[1].crit_percent - b[1].crit_percent;
            break;
        case "Mana Spent":
            sortFunction = (a, b) => a[1].mana_spent - b[1].mana_spent;
            break;
        case "Holy Power":
            sortFunction = (a, b) => {
                const aGained = a[1].holy_power_gained || 0;
                const aSpent = a[1].holy_power_spent || 0;
                const bGained = b[1].holy_power_gained || 0;
                const bSpent = b[1].holy_power_spent || 0;

                if (aGained !== bGained) {
                    return aGained - bGained;
                };

                if (aSpent !== bSpent) {
                    return aSpent - bSpent;
                };

                return 0;
            };
            break;
        case "OH %":
            sortFunction = (a, b) => a[1].overhealing - b[1].overhealing;
            break;
        default:
            sortFunction = (a, b) => 0;
    };

    return Object.fromEntries(
        Object.entries(breakdown).sort((a, b) => {
            const result = sortFunction(a, b);
            return sortDirection === "ascending" ? result : -result;
        })
    );
};

const aggregateOverallHealingData = (abilityBreakdown, encounterLength) => {
    const overallData = {
        healing: 0,
        HPS: 0,
        casts: 0,
        manaSpent: 0,
        CPM: 0
    };

    for (const spellName in abilityBreakdown) {
        const spellData = abilityBreakdown[spellName];
        
        if (spellData.total_healing > 0) {
            overallData.healing += spellData.total_healing;
        } else {
            overallData.healing -= spellData.total_healing;
        };

        overallData.HPS += spellData.total_healing / encounterLength;
        overallData.casts += spellData.casts;
        overallData.manaSpent += spellData.mana_spent;
        overallData.CPM += spellData.casts / (encounterLength / 60);
    };

    return overallData;
};

const formatHealingPercent = (spellName, healing, overallHealing) => {
    if (excludedSpellsOnlyResourcesAndCasts.includes(spellName)) {
        return "";
    } else {
        return formatPercentage(healing / overallHealing)
    };
};

const formatHealing = (spellName, healing) => {
    if (excludedSpellsOnlyResourcesAndCasts.includes(spellName)) {
        return "";
    } else {
        return formatThousands(healing);
    };
};

const formatHPS = (spellName, healing, encounterLength) => {
    if (excludedSpellsOnlyResourcesAndCasts.includes(spellName)) {
        return "";
    } else {
        return formatThousands(healing / encounterLength);
    };
};

const formatCasts = (spellName, casts) => {
    if (excludedSpellsCasts.includes(spellName)) {
        return "";
    } else {
        return formatFixedNumber(casts, 1);
    };
};

const formatAverage = (spellName, totalHealing, hits, casts) => {
    let average = "";

    if (excludedSpellsAverage.includes(spellName)) {
        average = "";
    } else if (excludedSpellsCasts.includes(spellName) || excludedSpellsCastsAverageHits.includes(spellName)) {
        average =  formatThousands(totalHealing / hits);
    } else if (excludedSpellsOnlyResourcesAndCasts.includes(spellName)) {
        average =  "";
    } else {
        average =  formatThousands(totalHealing / casts);
    };

    if (average === "Infinity") {
        average = 0;
    };

    return average;
};

const formatCritPercent = (spellname, critPercent) => {
    if (excludedSpellsCrit.includes(spellname) || excludedSpellsOnlyResourcesAndCasts.includes(spellname)) {
        return "";
    } else {
        return formatPercentage(critPercent / 100);
    };
};

const formatManaSpent = (manaSpent) => {
    if (manaSpent <= 0) {
        return "";
    } else {
        return formatThousands(manaSpent);
    };
};

const formatHolyPower = (holyPowerGained, holyPowerSpent) => {
    if (holyPowerGained > 0) {
        return "+" + formatFixedNumber(holyPowerGained, 1);
    } else if (holyPowerSpent > 0) {
        return "-" + formatFixedNumber(holyPowerSpent, 1);
    } else if (holyPowerGained === holyPowerSpent) {
        return "";
    };
};

const formatCPM = (casts, encounterLength) => {
    if (casts > 0) {
        return formatFixedNumber(casts / (encounterLength / 60), 1);
    };
};

const formatOverhealing = (overhealing) => {
    if (overhealing) {
        return formatPercentage(overhealing);
    };
};

export {
    formatFixedNumber,
    formatThousands,
    formatThousandsWithoutRounding,
    formatPercentage,
    sortAbilityBreakdown,
    sortBreakdownByHeader,
    aggregateOverallHealingData,
    formatHealingPercent,
    formatHealing,
    formatHPS,
    formatCasts,
    formatAverage,
    formatCritPercent,
    formatManaSpent,
    formatHolyPower,
    formatCPM,
    formatOverhealing,
};