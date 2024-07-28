const formatEnchantName = (name) => {
    let formattedEnchantName = name.split(":");

    if (formattedEnchantName.length > 1) {
        if (formattedEnchantName[2] && formattedEnchantName[2].includes("Incandescent Essence")) {
            formattedEnchantName = "Incandescent Essence";
        } else {
            const parts = formattedEnchantName[1].split("|");
            formattedEnchantName = parts[0];
        };
    };

    const excludedEnchants = [
        "Flexweave Underlay",
        "Personal Space Amplifier",
        "Hissing Rune",
        "Howling Rune",
        "Chirping Rune",
        "Buzzing Rune"
    ];

    if (excludedEnchants.includes(formattedEnchantName[0])) {
        return;
    };

    return formattedEnchantName;
};

export { formatEnchantName };