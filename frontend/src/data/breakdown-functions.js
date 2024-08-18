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

const sortBuffsBreakdown = (buffsBreakdown) => {
    let array = Object.entries(buffsBreakdown);
    array.sort((a, b) => b[1].uptime - a[1].uptime);

    return Object.fromEntries(array);
};

const sortManaBreakdown = (manaBreakdown) => {
    let array = Object.entries(manaBreakdown);
    array.sort((a, b) => b[1].mana_spent - a[1].mana_spent);
    
    return Object.fromEntries(array);
};

const sortHolyPowerBreakdown = (holyPowerBreakdown) => {
    let array = Object.entries(holyPowerBreakdown);
    array.sort((a, b) => {
        const aGained = a[1].holy_power_gained || 0;
        const aSpent = a[1].holy_power_spent || 0;
        const bGained = b[1].holy_power_gained || 0;
        const bSpent = b[1].holy_power_spent || 0;
        
        if (aGained !== bGained) {
            return bGained - aGained;
        };

        if (aSpent !== bSpent) {
            return aSpent - bSpent;
        };

        return 0;
    });

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
        case "Mana Gained":
            sortFunction = (a, b) => a[1].mana_gained - b[1].mana_gained;
            break;
        case "Holy Power":
            console.log("a")
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
        case "Holy Power Gained":
            sortFunction = (a, b) => a[1].holy_power_gained - b[1].holy_power_gained;
            break;
        case "Holy Power Wasted":
            sortFunction = (a, b) => a[1].holy_power_wasted - b[1].holy_power_wasted;
            break;
        case "Holy Power Spent":
            sortFunction = (a, b) => a[1].holy_power_spent - b[1].holy_power_spent;
            break;
        case "OH %":
            sortFunction = (a, b) => a[1].overhealing - b[1].overhealing;
            break;
        case "Uptime":
            sortFunction = (a, b) => a[1].uptime - b[1].uptime;
            break;
        case "Count":
            sortFunction = (a, b) => a[1].count - b[1].count;
            break;
        case "Average Duration":
            sortFunction = (a, b) => a[1].average_duration - b[1].average_duration;
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
        manaGained: 0,
        holyPowerGained: 0,
        holyPowerSpent: 0,
        holyPowerWasted: 0,
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
        overallData.manaGained += spellData.mana_gained || 0;
        overallData.holyPowerGained += spellData.holy_power_gained || 0;
        overallData.holyPowerSpent += spellData.holy_power_spent || 0;
        overallData.holyPowerWasted += spellData.holy_power_wasted || 0;
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

    if (!casts) {
        average = formatThousands(totalHealing / hits);
    } else if (excludedSpellsAverage.includes(spellName)) {
        average = "";
    } else if (excludedSpellsCasts.includes(spellName) || excludedSpellsCastsAverageHits.includes(spellName)) {
        average =  formatThousands(totalHealing / hits);
    } else if (excludedSpellsOnlyResourcesAndCasts.includes(spellName)) {
        average =  "";
    } else {
        average =  formatThousands(totalHealing / casts);
    };

    if (average === "Infinity") {
        average = "";
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

const formatManaGained = (manaGained) => {
    if (manaGained <= 0) {
        return "";
    } else {
        return formatThousands(manaGained);
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

const formatHolyPowerGained = (holyPowerGained) => {
    if (holyPowerGained > 0) {
        return "+" + formatFixedNumber(holyPowerGained, 1);
    } else {
        return "";
    };
};

const formatHolyPowerWasted = (holyPowerWasted) => {
    if (holyPowerWasted > 0) {
        return "-" + formatFixedNumber(holyPowerWasted, 1);
    } else {
        return "";
    };
};

const formatHolyPowerSpent = (holyPowerSpent) => {
    if (holyPowerSpent > 0) {
        return "-" + formatFixedNumber(holyPowerSpent, 1);
    } else {
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

const handleOverlappingBuffs = (buffName, breakdown) => {
    let buffActive = false;
    let buffsToConsolidate = [];
    let newBreakdown = { ...breakdown };

    for (let buff in newBreakdown) {
        if (buff.includes(buffName)) {
            buffActive = true;
            buffsToConsolidate.push(buff);
        };
    };

    if (buffActive) {
        let uptime = 0;
        let averageDuration = 0;
        let totalDuration = 0;
        let count = 0;

        buffsToConsolidate.forEach(buff => {
            const buffData = newBreakdown[buff];
            uptime = buffData.uptime;
            averageDuration += buffData.average_duration;
            totalDuration += buffData.total_duration;
            count += buffData.count;
        });

        averageDuration = averageDuration / buffsToConsolidate.length;

        buffsToConsolidate.forEach(buff => {
            delete newBreakdown[buff];
        });

        newBreakdown[buffName] = {
            uptime: uptime,
            average_duration: averageDuration,
            total_duration: totalDuration,
            count: count
        };
    };

    return newBreakdown;
};

export {
    formatFixedNumber,
    formatThousands,
    formatThousandsWithoutRounding,
    formatPercentage,
    sortAbilityBreakdown,
    sortBuffsBreakdown,
    sortManaBreakdown,
    sortHolyPowerBreakdown,
    sortBreakdownByHeader,
    aggregateOverallHealingData,
    formatHealingPercent,
    formatHealing,
    formatHPS,
    formatCasts,
    formatAverage,
    formatCritPercent,
    formatManaSpent,
    formatManaGained,
    formatHolyPower,
    formatHolyPowerGained,
    formatHolyPowerSpent,
    formatHolyPowerWasted,
    formatCPM,
    formatOverhealing,
    handleOverlappingBuffs
};