/*
Description:
This script generates cultural name lists and their corresponding localizations for use in a mod for Crusader Kings 3. It defines functions to create name lists based on historical male and female names, ensuring uniqueness, and outputs the generated data to text files for download.

Output:
The output of this script consists of two text files:
1. "cultural_name_lists.txt": Contains cultural name lists in a specific format.
2. "cultural_names_l_english.yml": Contains localization data for the name lists in YAML format.

Variables:
- world: An object containing information about different cultures.
- maleNameTrigrams: An array containing trigrams for generating male names.
- femaleNameTrigrams: An array containing trigrams for generating female names.
- maleNames: An array containing historical male names.
- femaleNames: An array containing historical female names.
- dgCount: A counter for generating unique dynasty name placeholders.

Functions:
- outputNameLists(): Main function to generate and output cultural name lists and their localizations.
- seedNames(culture): Function to seed male and female names for a given culture.
*/


function outputNameLists() {
    let onlyUniques = new Set();
    let t = `${daBom}`
    let loc = `${daBom}l_english:\n`
    for (let i = 0; i < world.cultures.length; i++) {
        let culture = world.cultures[i];
        t += `${culture.name_list} = {\n`
        //placeholder for cadet and dynasty names
        t += `\tcadet_dynasty_names = {\n`
        for (let z = 0; z < 100; z++) {
            t += `\t\t"dg${dgCount}"`
            dgCount += 1;
        }
        
        t += `\t}\n`
        t += `\tdynasty_names = {\n`
        for (let z = 0; z < 100; z++) {
            t += `\t\t"dg${dgCount}"`
            dgCount += 1;
        }
        
        t += `\t}\n`
        t += `\tmale_names = {\n`
        for (let n = 0; n < culture.maleNames.length; n++) {
            //let name = culture.maleNames[n]
            let name = generateWordFromTrigrams(maleNameTrigrams, maleNames)
            t += `${name} `
            onlyUniques.add(name)
        }
        t += `\n`
        t += `\t}\n`
        t += `\tfemale_names = {\n`
        for (let n = 0; n < culture.femaleNames.length; n++) {
            //let name = culture.femaleNames[n]
            let name = generateWordFromTrigrams(femaleNameTrigrams, femaleNames)
            t += `${name} `
            onlyUniques.add(name)
        }
        t += `\n`
        t += `\t}\n`
        t += `\tfounder_named_dynasties = yes\n`
        t += `}\n`
    }
    

    onlyUniques = [...onlyUniques]
    for (let i = 0; i < onlyUniques.length; i++) {
        let name = onlyUniques[i]
        loc += `\t${name}:0 "${name}"\n`
    }
    var data = new Blob([t], {type: 'text/plain'})
    var url = window.URL.createObjectURL(data);
    let link = `<a id="culture_name_list_link" download="cultural_name_lists.txt" href="">Download History</a><br>`
    document.getElementById("download-links").innerHTML += `${link}`;
    document.getElementById(`culture_name_list_link`).href = url
    document.getElementById(`culture_name_list_link`).click();

    var data2 = new Blob([loc], {type: 'text/yaml'})
    var url2 = window.URL.createObjectURL(data2);
    let link2 = `<a id="name_lists_loc" download="cultural_names_l_english.yml" href="">Download Localization for Name Lists</a><br>`
    document.getElementById("download-links").innerHTML += `${link2}`;
    document.getElementById(`name_lists_loc`).href = url2
    document.getElementById(`name_lists_loc`).click();
    
}


function seedNames(culture) {
    culture.maleNames = [];
    culture.femaleNames = [];
    for (let i = 0; i < worldHistory.maleNames.length; i++) {
        let name = worldHistory.maleNames[i]
        let translated = translate(culture.language, name)
        translated = capitalize(romanizeText(translated))
        culture.maleNames.push(translated);
    }
    for (let i = 0; i < worldHistory.femaleNames.length; i++) {
        let name = worldHistory.femaleNames[i]
        let translated = translate(culture.language, name)
        translated = capitalize(romanizeText(translated))
        culture.femaleNames.push(translated);
    }
}

worldHistory.maleNames = ["John", "William", "James", "Charles", "George", "Frank", "Joseph", "Thomas", "Henry", "Robert", "Edward", "Harry", "Walter", "Arthur", "Fred", "Albert", "Samuel", "David", "Louis", "Joe", "Charlie", "Clarence", "Richard", "Andrew", "Daniel", "Ernest", "Will", "Jesse", "Oscar", "Lewis", "Peter", "Benjamin", "Frederick", "Willie", "Alfred", "Sam", "Roy", "Herbert", "Jacob", "Tom", "Elmer", "Carl", "Lee", "Howard", "Martin", "Michael", "Bert", "Herman", "Jim", "Francis", "Harvey", "Earl", "Eugene", "Ralph", "Ed", "Claude", "Edwin", "Ben", "Charley", "Paul", "Edgar", "Isaac", "Otto", "Luther", "Lawrence", "Ira", "Patrick", "Guy", "Oliver", "Theodore", "Hugh", "Clyde", "Alexander", "August", "Floyd", "Homer", "Jack", "Leonard", "Horace", "Marion", "Philip", "Allen", "Archie", "Stephen", "Chester", "Willis", "Raymond", "Rufus", "Warren", "Jessie", "Milton", "Alex", "Leo", "Julius", "Ray", "Sidney", "Bernard", "Dan", "Jerry", "Calvin", "Perry", "Dave", "Anthony", "Eddie", "Amos", "Dennis", "Clifford", "Leroy", "Wesley", "Alonzo", "Garfield", "Franklin", "Emil", "Leon", "Nathan", "Harold", "Matthew", "Levi", "Moses", "Everett", "Lester", "Winfield", "Adam", "Lloyd", "Mack", "Fredrick", "Jay", "Jess", "Melvin", "Noah", "Aaron", "Alvin", "Norman", "Gilbert", "Elijah", "Victor", "Gus", "Nelson", "Jasper", "Silas", "Christopher", "Jake", "Mike", "Percy", "Adolph", "Maurice", "Cornelius", "Felix", "Reuben", "Wallace", "Claud", "Roscoe", "Sylvester", "Earnest", "Hiram", "Otis", "Simon", "Willard", "Irvin", "Mark", "Jose", "Wilbur", "Abraham", "Virgil", "Clinton", "Elbert", "Leslie", "Marshall", "Owen", "Wiley", "Anton", "Morris", "Manuel", "Phillip", "Augustus", "Emmett", "Eli", "Nicholas", "Wilson", "Alva", "Harley", "Newton", "Timothy", "Marvin", "Ross", "Curtis", "Edmund", "Jeff", "Elias", "Harrison", "Stanley", "Columbus", "Lon", "Ora", "Ollie", "Russell", "Pearl", "Solomon", "Arch", "Asa", "Clayton", "Enoch", "Irving", "Mathew", "Nathaniel", "Scott", "Hubert", "Lemuel", "Andy", "Ellis", "Emanuel", "Joshua", "Millard", "Vernon", "Wade", "Cyrus", "Miles", "Rudolph", "Sherman", "Austin", "Bill", "Chas", "Lonnie", "Monroe", "Byron", "Edd", "Emery", "Grant", "Jerome", "Max", "Mose", "Steve", "Gordon", "Abe", "Pete", "Chris", "Clark", "Gustave", "Orville", "Lorenzo", "Bruce", "Marcus", "Preston", "Bob", "Dock", "Donald", "Jackson", "Cecil", "Barney", "Delbert", "Edmond", "Anderson", "Christian", "Glenn", "Jefferson", "Luke", "Neal", "Burt", "Ike", "Myron", "Tony", "Conrad", "Joel", "Matt", "Riley", "Vincent", "Emory", "Isaiah", "Nick", "Ezra", "Green", "Juan", "Clifton", "Lucius", "Porter", "Arnold", "Bud", "Jeremiah", "Taylor", "Forrest", "Roland", "Spencer", "Burton", "Don", "Emmet", "Gustav", "Louie", "Morgan", "Ned", "Van", "Ambrose", "Chauncey", "Elisha", "Ferdinand", "General", "Julian", "Kenneth", "Mitchell", "Allie", "Josh", "Judson", "Lyman", "Napoleon", "Pedro", "Berry", "Dewitt", "Ervin", "Forest", "Lynn", "Pink", "Ruben", "Sanford", "Ward", "Douglas", "Ole", "Omer", "Ulysses", "Walker", "Wilbert", "Adelbert", "Benjiman", "Ivan", "Jonas", "Major", "Abner", "Archibald", "Caleb", "Clint", "Dudley", "Granville", "King", "Mary", "Merton", "Antonio", "Bennie", "Carroll", "Freeman", "Josiah", "Milo", "Royal", "Earle", "Elza", "Emerson", "Fletcher", "Judge", "Laurence", "Neil", "Roger", "Seth", "Glen", "Hugo", "Jimmie", "Johnnie", "Washington", "Elwood", "Gust", "Harmon", "Jordan", "Simeon", "Wayne", "Wilber", "Clem", "Evan", "Frederic", "Irwin", "Junius", "Lafayette", "Loren", "Madison", "Mason", "Orval", "Abram", "Aubrey", "Elliott", "Hans", "Karl", "Minor", "Wash", "Wilfred", "Allan", "Alphonse", "Dallas", "Dee", "Isiah", "Jason", "Johnny", "Lawson", "Lew", "Micheal", "Orin", "Addison", "Cal", "Erastus", "Francisco", "Hardy", "Lucien", "Randolph", "Stewart", "Vern", "Wilmer", "Zack", "Adrian", "Alvah", "Bertram", "Clay", "Ephraim", "Fritz", "Giles", "Grover", "Harris", "Isom", "Jesus", "Johnie", "Jonathan", "Lucian", "Malcolm", "Merritt", "Otho", "Perley", "Rolla", "Sandy", "Tomas", "Wilford", "Adolphus", "Angus", "Arther", "Carlos", "Cary", "Cassius", "Davis", "Hamilton", "Harve", "Israel", "Leander", "Melville", "Merle", "Murray", "Pleasant", "Sterling", "Steven", "Axel", "Boyd", "Bryant", "Clement", "Erwin", "Ezekiel", "Foster", "Frances", "Geo", "Houston", "Issac", "Jules", "Larkin", "Mat", "Morton", "Orlando", "Pierce", "Prince", "Rollie", "Rollin", "Sim", "Stuart", "Wilburn", "Bennett", "Casper", "Christ", "Dell", "Egbert", "Elmo", "Fay", "Gabriel", "Hector", "Horatio", "Lige", "Saul", "Smith", "Squire", "Tobe"]

worldHistory.femaleNames = ["Mary", "Anna", "Emma", "Elizabeth", "Minnie", "Margaret", "Ida", "Alice", "Bertha", "Sarah", "Annie", "Clara", "Ella", "Florence", "Cora", "Martha", "Laura", "Nellie", "Grace", "Carrie", "Maude", "Mabel", "Bessie", "Jennie", "Gertrude", "Julia", "Hattie", "Edith", "Mattie", "Rose", "Catherine", "Lillian", "Ada", "Lillie", "Helen", "Jessie", "Louise", "Ethel", "Lula", "Myrtle", "Eva", "Frances", "Lena", "Lucy", "Edna", "Maggie", "Pearl", "Daisy", "Fannie", "Josephine", "Dora", "Rosa", "Katherine", "Agnes", "Marie", "Nora", "May", "Mamie", "Blanche", "Stella", "Ellen", "Nancy", "Effie", "Sallie", "Nettie", "Della", "Lizzie", "Flora", "Susie", "Maud", "Mae", "Etta", "Harriet", "Sadie", "Caroline", "Katie", "Lydia", "Elsie", "Kate", "Susan", "Mollie", "Alma", "Addie", "Georgia", "Eliza", "Lulu", "Nannie", "Lottie", "Amanda", "Belle", "Charlotte", "Rebecca", "Ruth", "Viola", "Olive", "Amelia", "Hannah", "Jane", "Virginia", "Emily", "Matilda", "Irene", "Kathryn", "Esther", "Willie", "Henrietta", "Ollie", "Amy", "Rachel", "Sara", "Estella", "Theresa", "Augusta", "Ora", "Pauline", "Josie", "Lola", "Sophia", "Leona", "Anne", "Mildred", "Ann", "Beulah", "Callie", "Lou", "Delia", "Eleanor", "Barbara", "Iva", "Louisa", "Maria", "Mayme", "Evelyn", "Estelle", "Nina", "Betty", "Marion", "Bettie", "Dorothy", "Luella", "Inez", "Lela", "Rosie", "Allie", "Millie", "Janie", "Cornelia", "Victoria", "Ruby", "Winifred", "Alta", "Celia", "Christine", "Beatrice", "Birdie", "Harriett", "Mable", "Myra", "Sophie", "Tillie", "Isabel", "Sylvia", "Carolyn", "Isabelle", "Leila", "Sally", "Ina", "Essie", "Bertie", "Nell", "Alberta", "Katharine", "Lora", "Rena", "Mina", "Rhoda", "Mathilda", "Abbie", "Eula", "Dollie", "Hettie", "Eunice", "Fanny", "Ola", "Lenora", "Adelaide", "Christina", "Lelia", "Nelle", "Sue", "Johanna", "Lilly", "Lucinda", "Minerva", "Lettie", "Roxie", "Cynthia", "Helena", "Hilda", "Hulda", "Bernice", "Genevieve", "Jean", "Cordelia", "Marian", "Francis", "Jeanette", "Adeline", "Gussie", "Leah", "Lois", "Lura", "Mittie", "Hallie", "Isabella", "Olga", "Phoebe", "Teresa", "Hester", "Lida", "Lina", "Marguerite", "Winnie", "Claudia", "Vera", "Cecelia", "Bess", "Emilie", "John", "Rosetta", "Verna", "Myrtie", "Cecilia", "Elva", "Olivia", "Ophelia", "Georgie", "Elnora", "Violet", "Adele", "Lily", "Linnie", "Loretta", "Madge", "Polly", "Virgie", "Eugenia", "Lucile", "Lucille", "Mabelle",
"Rosalie", "Kittie", "Meta", "Angie", "Dessie", "Georgiana", "Lila", "Regina", "Selma", "Wilhelmina", "Bridget", "Lilla", "Malinda", "Vina", "Freda", "Gertie", "Jeannette", "Louella", "Mandy", "Roberta", "Cassie", "Corinne", "Ivy", "Melissa", "Lyda", "Naomi", "Norma", "Bell", "Margie", "Nona", "Zella", "Dovie", "Elvira", "Erma", "Irma", "Leota", "William", "Artie", "Blanch", "Charity", "Janet", "Lorena", "Lucretia", "Orpha", "Alvina", "Annette", "Catharine", "Elma", "Geneva", "Lee", "Leora", "Lona", "Miriam", "Zora", "Linda", "Octavia", "Sudie", "Zula", "Adella", "Alpha", "Frieda", "George", "Joanna", "Leonora", "Priscilla", "Tennie", "Angeline", "Docia", "Ettie", "Flossie", "Hanna", "Letha", "Minta", "Retta", "Rosella", "Adah", "Berta", "Elisabeth", "Elise", "Goldie", "Leola", "Margret", "Adaline", "Floy", "Idella", "Juanita", "Lenna", "Lucie", "Missouri", "Nola", "Zoe", "Eda", "Isabell", "James", "Julie", "Letitia", "Madeline", "Malissa", "Mariah", "Pattie", "Vivian", "Almeda", "Aurelia", "Claire", "Dolly", "Hazel", "Jannie", "Kathleen", "Kathrine", "Lavinia", "Marietta", "Melvina", "Ona", "Pinkie", "Samantha", "Susanna", "Chloe", "Donnie", "Elsa", "Gladys", "Matie", "Pearle", "Vesta", "Vinnie", "Antoinette", "Clementine", "Edythe", "Harriette", "Libbie", "Lilian", "Lue", "Lutie", "Magdalena", "Meda", "Rita", "Tena", "Zelma", "Adelia", "Annetta", "Antonia", "Dona", "Elizebeth", "Georgianna", "Gracie", "Iona", "Lessie", "Leta", "Liza", "Mertie", "Molly", "Neva", "Oma", "Alida", "Alva", "Cecile", "Cleo", "Donna", "Ellie"]


let dgCount = 0;