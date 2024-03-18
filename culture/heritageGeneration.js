/*
Description:
These JavaScript functions are part of a script to generate heritage data and localization files for a mod in Crusader Kings 3. The script is responsible for generating cultural heritage data and corresponding localization entries.

Function: outputHeritageLocalization()
Description:
This function generates a localization file for cultural heritages in the English language. It iterates over the cultures defined in the 'world' object and extracts their heritage information to create entries in the localization file.

Output:
The output of this function is a YAML localization file containing entries for each cultural heritage in the English language.

Function: outputHeritages()
Description:
This function generates a file containing cultural heritage data. It iterates over the cultures defined in the 'world' object and extracts their heritage information to create entries in the heritage data file.

Output:
The output of this function is a text file containing cultural heritage data.

Dependencies:
- world.cultures: An array of culture objects containing heritage information. [therefore must run after culture]

Overall Dependencies:
Both functions rely on the 'daBom' variable and the 'world.cultures' array.
*/


function outputHeritageLocalization() {
    let output = `${daBom}l_english:\n`
    for (let i = 0; i < world.cultures.length; i++) {
        let culture = world.cultures[i]
        let heritage = culture.heritage
        output += `${heritage}_name: "${culture.name}"\n`
    }
    var data = new Blob([output], {type: 'text/yaml'})
    var url = window.URL.createObjectURL(data);
    let link = `<a id="cultural_heritages_loc" download="gen_cultural_heritages_l_english.yml" href="">Download Cultural Heritages</a><br>`
    document.getElementById("download-links").innerHTML += `${link}`;
    document.getElementById(`cultural_heritages_loc`).href = url
    document.getElementById(`cultural_heritages_loc`).click();
}


function outputHeritages() {
    let t = `${daBom}`
    for (let i = 0; i < world.heritages.length; i++) {
        let heritage = world.heritages[i]
        t += `heritage_${heritage}_seed = {\n`
        t += `\ttype = heritage\n`
        t += `}`
    }
    var data = new Blob([t], {type: 'text/plain'})
    var url = window.URL.createObjectURL(data);
    let link = `<a id="heritages_link" download="generated_heritages.txt" href="">Heritages</a><br>`
    document.getElementById("download-links").innerHTML += `${link}`;
    document.getElementById(`heritages_link`).href = url
    document.getElementById(`heritages_link`).click();
}



