// Utility functions
function setRandomCultureTraditions() {
    let arr = [];
    for (let i = 0; i < 3; i++) {
        pickUniqFromWithoutDelete(traditionsList, arr)
    }
    return arr;
}


function getRandomEthnicities() {
    //implement
}


function getRandomCOA() {
    let res = pickFrom(coa_gfx_list);
    return res;
} 

function getRandomCultureBuildings() {
    let res = pickFrom(building_gfx_list);
    return res;
}

function getRandomCultureClothing() {
    let res = pickFrom(clothing_gfx_list)
    return res
}

function getRandomCultureUnit() {
    let res = pickFrom(unit_gfx_list);
    return res
}

function outputCulture(t, c) {
    t += `${c.id} = {\n`
    t += `\tcolor = { ${c.color} }\n`
    t += `\tethos = ${c.ethos}\n`
    t += `\tlanguage = ${c.language.name}\n`
    t += `\theritage = ${c.heritage}\n`
    t += `\tmartial_custom = ${c.martial_custom}\n`
    t += `\ttraditions = {\n`
    for (let i = 0; i < c.traditions.length; i++) {
        t += `\t\t${c.traditions[i].n}\n`
    }
    t += `\t}\n`
    t += `\tname_list = ${c.name_list}\n`
    t += `\tcoa_gfx = { ${c.coa_gfx} }\n`
    t += `\tbuilding_gfx = { ${c.buildings_gfx} }\n`
    t += `\tclothing_gfx = { ${c.clothing_gfx} }\n`
    t += `\tunit_gfx = { ${c.unit_gfx} }\n`
    t += `\tethnicities = {\n`
    t += `\t\t10 = ${c.id}_eth\n`
    t += `\t}\n`
    t += `}\n`
    return t;
}

function outputCultures() {
    let t = `${daBom}`
    for (let i = 0; i < world.cultures.length; i++) {
        let culture = world.cultures[i]
        t = outputCulture(t, culture)
    }
    var data = new Blob([t], {type: 'text/plain'})
    var url = window.URL.createObjectURL(data);
    let link = `<a id="cultures_link" download="generated_cultures.txt" href="">Cultures</a><br>`
    document.getElementById("download-links").innerHTML += `${link}`;
    document.getElementById(`cultures_link`).href = url
    document.getElementById(`cultures_link`).click();
}

function assignCultures() {
    for (let i = 0;i < world.empires.length; i++) {
        let empire = world.empires[i]
        empire.localizedTitle = generateWordFromTrigrams(britishPlacesTrigrams, britishPlaces)
        let heritage = empire.titleName
        if (world.heritages) {
            world.heritages.push(heritage)
        } else {
            world.heritages = [];
            world.heritages.push(heritage)
        }
    }
    for (let i = 0; i < world.kingdoms.length; i++) {
        let kingdom = world.kingdoms[i];
        let heritage = world.kingdoms[i].empire.titleName
        let culture = createCulture(heritage)
        kingdom.culture = culture;
        if (world.cultures) {
            world.cultures.push(culture)
        } else {
            world.cultures = [];
            world.cultures.push(culture)
        }
        kingdom.localizedTitle = generateWordFromTrigrams(britishPlacesTrigrams, britishPlaces)
        for (let j = 0; j < kingdom.duchies.length; j++) {
            let duchy = kingdom.duchies[j]
            duchy.localizedTitle = generateWordFromTrigrams(britishPlacesTrigrams, britishPlaces)
            for (let n = 0; n < duchy.counties.length; n++) {
                let county = duchy.counties[n]
                county.localizedTitle = generateWordFromTrigrams(britishPlacesTrigrams, britishPlaces)
                for (let z = 0; z < county.provinces.length; z++) {
                    let province = county.provinces[z]
                    province.localizedTitle = generateWordFromTrigrams(britishPlacesTrigrams, britishPlaces)
                }
            }
        }
    }
}

// Main function
function createCulture(heritage, parent) {
    let culture = {};
    let ethos = pickFrom(cultureEthosList) 
    if (parent) {
        culture.martial_custom = parent.martial
        culture.ethos = parent.ethos
        culture.traditions = parent.traditions
        culture.language = parent.language
        culture.coa_gfx = parent.coa_gfx;
        culture.buildings_gfx = parent.buildings_gfx;
        culture.clothing_gfx = parent.clothing_gfx
        culture.unit_gfx = parent.unit_gfx
        culture.ethnicities = parent.ethnicities
        culture.name = translate(culture.language, "People")
        culture.name = capitalize(romanizeText(culture.name))
        culture.id = rando()
        culture.name_list = parent.name_list
    } else {
        culture.martial_custom = pickFrom(martialCustomRuleList)
        culture.ethos = ethos
        culture.language = createLanguage();
        culture.traditions = getCultureTraditions(heritage, ethos)
        culture.coa_gfx = getRandomCOA()
        culture.buildings_gfx = getRandomCultureBuildings();
        culture.clothing_gfx = getRandomCultureClothing();
        culture.unit_gfx = getRandomCultureUnit();
        culture.ethnicities = getRandomEthnicities();
        culture.name = generateWordFromTrigrams(britishPlacesTrigrams, britishPlaces)
        culture.name = capitalize(romanizeText(culture.name))
        culture.id = rando()
        culture.name_list = `name_list_${culture.id}`
    }
    
    culture.language.name = `language_${rando()}`
    culture.color = `0.${getRandomInt(1, 9)} 0.${getRandomInt(1, 9)} 0.${getRandomInt(1, 9)}`
    if (heritage) {
        culture.heritage = `heritage_${heritage}_seed`
    } else {
        culture.heritage = `heritage_${culture.id}_seed`
    }
    
    seedNames(culture);
    return culture;
}



let clothing_gfx_list = [
    "african_clothing_gfx",
    "dde_abbasid_clothing_gfx mena_clothing_gfx",
    "afr_berber_clothing_gfx mena_clothing_gfx",
    "northern_clothing_gfx",
    "western_clothing_gfx",
    "indian_clothing_gfx",
    "byzantine_clothing_gfx",
    "dde_hre_clothing_gfx western_clothing_gfx",
    "mongol_clothing_gfx",
    "mena_clothing_gfx",
    "iberian_muslim_clothing_gfx dde_abbasid_clothing_gfx mena_clothing_gfx",
    "iranian_clothing_gfx mena_clothing_gfx",
    "turkic_clothing_gfx mongol_clothing_gfx"
]

let building_gfx_list = [
    "african_building_gfx mena_building_gfx",
    "arabic_group_building_gfx mena_building_gfx",
    "western_building_gfx",
    "berber_group_building_gfx mena_building_gfx",
    "indian_building_gfx",
    "mediterranean_building_gfx",
    "iberian_building_gfx",
    "iranian_building_gfx",
    "steppe_building_gfx",

]
 
let unit_gfx_list = [
    "northern_unit_gfx",
    "mena_unit_gfx",
    "western_unit_gfx",
    "sub_sahran_unit_gfx",
    "indian_unit_gfx",
    "eastern_unit_gfx",
    "mongol_unit_gfx",
    "iberian_muslim_unit_gfx",
    "iberian_christian_unit_gfx",
    "iranian_unit_gfx",
    "norse_unit_gfx"
]

let coa_gfx_list = [
    "west_african_group_coa_gfx",
    "arabic_group_coa_gfx",
    "baltic_group_coa_gfx steppe_coa_gfx western_coa_gfx",
    "balto_finnic_group_coa_gfx steppe_coa_gfx western_coa_gfx",
    "berber_group_coa_gfx",
    "scottish_coa_gfx western_coa_gfx",
    "welsh_coa_gfx western_coa_gfx",
    "breton_coa_gfx western_coa_gfx",
    "burman_group_coa_gfx",
    "byzantine_group_coa_gfx western_coa_gfx",
    "central_african_group_coa_gfx",
    "german_group_coa_gfx western_coa_gfx",
    "chinese_group_coa_gfx",
    "dravidian_group_coa_gfx",
    "east_african_coa_gfx",
    "east_slavic_group_coa_gfx western_coa_gfx",
    "french_coa_gfx frankish_group_coa_gfx western_coa_gfx",
    "scottish_coa_gfx western_coa_gfx",
    "arabic_group_coa_gfx",
    "indo_aryan_group_coa_gfx",
    "iranian_group_coa_gfx",
    "israelite_group_coa_gfx",
    "latin_group_coa_gfx western_coa_gfx",
    "magyar_group_coa_gfx ugro_permian_group_coa_gfx steppe_coa_gfx",
    "mongol_coa_gfx steppe_coa_gfx",
    "swedish_coa_gfx western_coa_gfx",
    "norwegian_coa_gfx western_coa_gfx",
    "danish_coa_gfx western_coa_gfx",
    "indian_coa_gfx",
    "west_african_group_coa_gfx",
    "south_slavic_group_coa_gfx western_coa_gfx",
    "tibetan_group_coa_gfx",
    "oghuz_coa_gfx turkic_group_coa_gfx steppe_coa_gfx",
    "turkic_group_coa_gfx steppe_coa_gfx",
    "ugro_permian_group_coa_gfx steppe_coa_gfx",
    "steppe_coa_gfx volga_finnic_group_coa_gfx",
    "anglo_saxon_coa_gfx western_coa_gfx",
    "english_coa_gfx western_coa_gfx",
    "west_slavic_group_coa_gfx western_coa_gfx"
]


let cultureEthosList = [
    "ethos_bellicose",
    "ethos_stoic",
    "ethos_bureaucratic",
    "ethos_spiritual",
    "ethos_courtly",
    "ethos_egalitarian",
    "ethos_communal",   
]

let martialCustomRuleList = [
    "martial_custom_male_only",
    "martial_custom_equal",
    "martial_custom_female_only",
]

let traditionsList = [
    {
        n: "tradition_winter_warriors",
        t: "combat"
    },
    {
        n: "tradition_forest_fighters",
        t: "combat"
    },
    {
        n: "tradition_mountaineers",
        t: "combat"
    },
    {
        n: "tradition_warriors_of_the_dry",
        t: "combat"
    },
    {
        n: "tradition_highland_warriors",
        t: "combat"
    },
    {
        n: "tradition_jungle_warriors",
        t: "combat"
    },
    {
        n: "tradition_only_the_strong",
        t: "combat"
    },
    {
        n: "tradition_warriors_by_merit",
        t: "combat"
    },
    {
        n: "tradition_warrior_monks",
        t: "combat"
    },
    {
        n: "tradition_talent_acquisition",
        t: "combat"
    },
    {
        n: "tradition_strength_in_numbers",
        t: "combat"
    },
    {
        n: "tradition_frugal_armorsmiths",
        t: "combat"
    },
    {
        n: "tradition_malleable_invaders",
        t: "combat"
    },
    {
        n: "tradition_quarrelsome",
        t: "combat"
    },
    {
        n: "tradition_swords_for_hire",
        t: "combat"
    },
    {
        n: "tradition_reverance_for_veterans",
        t: "combat"
    },
    {
        n: "tradition_stalwart_defenders",
        t: "combat"
    },
    {
        n: "tradition_battlefield_looters",
        t: "combat"
    },
    {
        n: "tradition_hit_and_run",
        t: "combat"
    },
    {
        n: "tradition_stand_and_fight",
        t: "combat"
    },
    {
        n: "tradition_adaptive_skirmishing",
        t: "combat"
    },
    {
        n: "tradition_formation_fighting",
        t: "combat"
    },
    {
        n: "tradition_horse_breeder",
        t: "combat"
    },
    {
        n: "tradition_longbow_competitions",
        t: "combat"
    }, // SKIPPED MAA TRADITIONS HERE - ADD lATER?
    {
        n: "tradition_court_eunuchs",
        t: "realm"
    },
    {
        n: "tradition_legalistic",
        t: "realm"
    },
    {
        n: "tradition_republican_legacy",
        t: "realm"
    },
    {
        n: "tradition_hereditary_hierarchy",
        t: "realm"
    },
    {
        n: "tradition_esteemed_hospitality",
        t: "realm"
    },
    {   
        n: "tradition_gardening",
        t: "realm"
    },
    {
        n: "tradition_tribe_unity",
        t: "realm"
    },
    {
        n: "tradition_astute_diplomats",
        t: "realm"
    },
    {
        n: "tradition_collective_lands",
        t: "realm"
    },
    {
        n: "tradition_female_only_inheritance",
        t: "realm"
    },
    {
        n: "tradition_equal_inheritance",
        t: "realm"
    },
    {
        n: "tradition_roman_legacy",
        t: "realm"
    },
    {
        n: "tradition_metal_craftsmanship",
        t: "realm"
    },
    {
        n: "tradition_family_entrepreneurship",
        t: "realm"
    },
    {
        n: "tradition_wedding_ceremonies",
        t: "realm"
    },
    {
        n: "tradition_culture_blending",
        t: "realm"
    },
    {
        n: "tradition_isolationist",
        t: "realm"
    },
    {
        n: "tradition_fervant_temple_builders",
        t: "realm"
    },
    {
        n: "tradition_agrarian",
        t: "realm"
    },
    {
        n: "tradition_pastoralists",
        t: "realm"
    },
    {
        n: "tradition_parochialism",
        t: "realm"
    },
    {
        n: "tradition_ruling_caste",
        t: "realm"
    },
    {
        n: "tradition_staunch_traditionalists",
        t: "realm"
    },
    {
        n: "tradition_hill_dwellers",
        t: "realm"
    },
    {
        n: "tradition_forest_folk",
        t: "realm"
    },
    {
        n: "tradition_mountain_homes",
        t: "realm"
    },
    {
        n: "tradition_dryland_dwellers",
        t: "realm"
    },
    {
        n: "tradition_jungle_dwellers",
        t: "realm"
    },
    {
        n: "tradition_wetlanders",
        t: "realm"
    },
    {
        n: "tradition_hidden_cities",
        t: "realm"
    },
    {
        n: "tradition_ancient_miners",
        t: "realm"
    },
    {
        n: "tradition_castle_keepers",
        t: "realm"
    },
    {
        n: "tradition_city_keepers",
        t: "realm"
    },
    {
        n: "tradition_maritime_mercantilism",
        t: "realm"
    },
    {
        n: "tradition_monastic_communities",
        t: "realm"
    }, // skipped regional here
    {
        n: "tradition_monogamous",
        t: "ritual"
    },
    {
        n: "tradition_polygamous",
        t: "ritual"
    },
    {
        n: "tradition_concubines",
        t: "ritual"
    },
    {
        n: "tradition_sacred_mountains",
        t: "ritual"
    },
    {
        n: "tradition_sacred_groves",
        t: "ritual"
    },
    {
        n: "tradition_culinary_art",
        t: "ritual"
    },
    {
        n: "tradition_festivities",
        t: "ritual"
    },
    {
        n: "tradition_sorcerous_metallurgy",
        t: "ritual"
    },
    {
        n: "tradition_mystical_ancestors",
        t: "ritual"
    },
    {
        n: "tradition_religion_blending",
        t: "ritual"
    },
    {
        n: "tradition_religious_patronage",
        t: "ritual"
    },
    {
        n: "tradition_medicinal_plants",
        t: "ritual"
    },
    {
        n: "tradition_sacred_hunts",
        t: "ritual"
    },
    {
        n: "tradition_faith_bound",
        t: "ritual"
    },
    {
        n: "tradition_by_the_sword",
        t: "ritual"
    },
    {
        n: "tradition_language_scholars",
        t: "ritual"
    },
    {
        n: "tradition_runestones",
        t: "ritual"
    },
    {
        n: "tradition_merciful_blindings",
        t: "ritual"
    },
    {
        n: "tradition_xenophilic",
        t: "societal"
    },
    {
        n: "tradition_chivalry",
        t: "societal"
    },
    {
        n: "tradition_hard_working",
        t: "societal"
    },
    {
        n: "tradition_loyal_soldiers",
        t: "societal"
    },
    {
        n: "tradition_pacifism",
        t: "societal"
    },
    {
        n: "tradition_spartan",
        t: "societal"
    },
    {
        n: "tradition_diasporic",
        t: "societal"
    },
    {
        n: "tradition_hunters",
        t: "societal"
    },
    {
        n: "tradition_vegetarianism",
        t: "societal"
    },
    {
        n: "tradition_seafaring",
        t: "societal"
    },
    {
        n: "tradition_storytellers",
        t: "societal"
    },
    {
        n: "tradition_music_theory",
        t: "societal"
    },
    {
        n: "tradition_poetry",
        t: "societal"   
    },
    {
        n: "tradition_fishermen",
        t: "societal"
    },
    {
        n: "tradition_mendicant_mystics",
        t: "societal"
    },
    {
        n: "tradition_warrior_culture",
        t: "societal",
    },
    {
        n: "tradition_martial_admiration",
        t: "societal"
    },
    {
        n: "tradition_philosopher_culture",
        t: "societal"
    },
    {
        n: "tradition_welcoming",
        t: "societal"
    },
    {
        n: "tradition_eye_for_an_eye",
        t: "societal"
    },
    {
        n: "tradition_zealous_people",
        t: "societal"
    },
    {
        n: "tradition_forbearing",
        t: "societal"
    },
    {
        n: "tradition_equitable",
        t: "societal"
    },
    {
        n: "tradition_charitable",
        t: "societal"
    },
    {
        n: "tradition_modest",
        t: "societal"
    },
    {
        n: "tradition_practiced_pirates",
        t: "societal"
    },
    {
        n: "tradition_life_is_just_a_joke",
        t: "societal"
    },
    {
        n: "tradition_artisans",
        t: "societal"
    },
    {
        n: "tradition_noble_adoption",
        t: "societal"
    }
    //add DLCs?
]
