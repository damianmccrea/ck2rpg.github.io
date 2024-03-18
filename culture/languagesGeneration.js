/*
Description:
These JavaScript functions generate language data and localization files for a mod in Crusader Kings 3. 
The 'outputLanguagesLocalization()' function generates a YAML localization file for cultural languages in English, 
while the 'outputLanguages()' function generates language data.

Function: outputLanguagesLocalization()
Description:
This function iterates over the cultures defined in the 'world' object and extracts their language information 
to create entries in the localization file for cultural languages in English.

Output:
The output of this function is a YAML localization file containing entries for each cultural language in English.

Dependencies:
- daBom: A variable used for string interpolation.
- world.cultures: An array of culture objects containing language information.
- capitalize(): A function used to capitalize the language localization.

Function: outputLanguages()
Description:
This function iterates over the cultures defined in the 'world' object and extracts their language information 
to create language data entries.

Output:
The output of this function is a text file containing language data.

Dependencies:
- daBom: A variable used for string interpolation.
- world.cultures: An array of culture objects containing language information.
- getRandomInt(min, max): A function used to generate random integers for color values. [this is given in utilities.js]
*/


// Function to generate language data
function outputLanguages() {
    let t = `${daBom}`; // Start with daBom variable
    // Loop through each culture to generate language data entries
    for (let i = 0; i < world.cultures.length; i++) {
        let lang = world.cultures[i].language;
        // Add language data entry
        t += `${lang.name} = {\n`;
        t += `\ttype = language\n`;
        t += `\tis_shown = {\n`;
        t += `\t\tlanguage_is_shown_trigger = {\n`;
        t += `\t\t\tLANGUAGE = ${lang.name}\n`;
        t += `\t\t}\n`;
        t += `\t}\n`;
        t += `\tai_will_do = {\n`;
        t += `\t\tvalue = 10\n`;
        t += `\t\tif = {\n`;
        t += `\t\t\tlimit = { has_cultural_pillar = ${lang.name} }\n`;
        t += `\t\t\tmultiply = 10\n`;
        t += `\t\t}\n`;
        t += `\t}\n`;
        // Add random color for language
        t += `\tcolor = { 0.${getRandomInt(1, 9)} 0.${getRandomInt(1, 9)} 0.${getRandomInt(1, 9)} }\n`;
        t += `}\n`;
    }
    // Create a blob containing the output data
    var data = new Blob([t], {type: 'text/plain'});
    // Create a URL for the blob
    var url = window.URL.createObjectURL(data);
    // Create a download link for the language data file
    let link = `<a id="languages_link" download="generated_languages.txt" href="">Languages</a><br>`;
    // Append the download link to a specified element
    document.getElementById("download-links").innerHTML += `${link}`;
    // Set the href attribute of the download link to the URL of the blob
    document.getElementById(`languages_link`).href = url;
    // Automatically click the download link to trigger download
    document.getElementById(`languages_link`).click();
}


// Function to generate language localization data
function outputLanguagesLocalization() {
    let output = `${daBom}l_english:\n`; // Start with daBom variable
    // Loop through each culture to generate language localization entries
    for (let i = 0; i < world.cultures.length; i++) {
        let culture = world.cultures[i];
        let language = culture.language;
        // Add language name localization entry, capitalize localization text
        output += `${language.name}_name: "${capitalize(language.loc)}"\n`;
    }
    // Create a blob containing the output data
    var data = new Blob([output], {type: 'text/yaml'});
    // Create a URL for the blob
    var url = window.URL.createObjectURL(data);
    // Create a download link for the language localization file
    let link = `<a id="cultural_languages_loc" download="gen_cultural_languages_l_english.yml" href="">Download Language Localization</a><br>`;
    // Append the download link to a specified element
    document.getElementById("download-links").innerHTML += `${link}`;
    // Set the href attribute of the download link to the URL of the blob
    document.getElementById(`cultural_languages_loc`).href = url;
    // Automatically click the download link to trigger download
    document.getElementById(`cultural_languages_loc`).click();
}

