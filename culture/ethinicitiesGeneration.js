/*
Description:
This JavaScript file generates ethnicities data for a mod in Crusader Kings 3. It defines functions to create random ethnicity data based on cultural traits and genetic properties. The main function, outputEthnicities(), generates ethnicity data for each culture in the world object and outputs it to a text file named "01_ethnicities_placeholder.txt" for download.

Output:
The output of this script is a text file containing ethnicity data in a specific format, suitable for use in a mod for Crusader Kings 3.

Variables:
- world: An object containing information about different cultures.
- geneticProperties: An array containing objects representing genetic properties and traits.
- headShapes: An array containing different types of beast head shapes.

Functions:
- outputEthnicities(): Main function to generate and output ethnicity data.
- createRandomEthnicity(culture): Function to create random ethnicity data based on a culture.
- getRandomColorPair(): Function to generate a random color pair for skin, eye, and hair colors.
*/


// Main function to output ethnicities data
function outputEthnicities() {
    let output = `${daBom}`; // Not sure what daBom is, assuming it's defined elsewhere
    for (let i = 0; i < world.cultures.length; i++) {
        let culture = world.cultures[i];
        output += createRandomEthnicity(culture);
    }
    // Create a blob containing the output data
    var data = new Blob([output], {type: 'text/plain'});
    // Create a URL for the blob
    var url = window.URL.createObjectURL(data);
    // Create a download link for the file
    let link = `<a id="ethnicities_link" download="01_ethnicities_placeholder.txt" href="">Download History</a><br>`;
    // Append the download link to a specified element
    document.getElementById("download-links").innerHTML += `${link}`;
    // Set the href attribute of the download link to the URL of the blob
    document.getElementById(`ethnicities_link`).href = url;
    // Automatically click the download link to trigger download
    document.getElementById(`ethnicities_link`).click();
}

// Function to generate random ethnicity data based on a culture
function createRandomEthnicity(culture) {
    let t = `${culture.id}_eth = {\n`;
    t += `\tskin_color = {\n`;
    t += `\t\t10 = ${getRandomColorPair()}\n`;
    t += `\t}\n`;
    t += `\teye_color = {\n`;
    t += `\t\t10 = ${getRandomColorPair()}\n`;
    t += `\t}\n`;
    t += `\thair_color = {\n`;
    t += `\t\t10 = ${getRandomColorPair()}\n`;
    t += `\t}\n`;
    // Loop through genetic properties and generate data for each
    for (let i = 0; i < geneticProperties.length; i++) {
        let low = getRandomInt(0, 8);
        let upped = low + 1;
        let high = getRandomInt(upped, 9);
        let g = geneticProperties[i];
        let str;
        if (g.o.length === 0) { // Check if options array is empty
            let posNeg = ["pos", "neg"][getRandomInt(0, 1)];
            str = g.n.includes("_bs_") ? g.n.replace("gene_bs_", "") : g.n.replace("gene_", "");
            t += `\t${g.n} = {\n`;
            t += `\t\t10 = { name = ${str}_${posNeg}\trange = { 0.${low} 0.${high} } }\n`;
            t += `\t}\n`;
        } else {
            str = g.n;
            let p = pickFrom(g.o);
            t += `\t${g.n} = {\n`;
            t += `\t\t10 = { name = ${p}\trange = { 0.${low} 0.${high} } }\n`;
            t += `\t}\n`;
        }
    }
    // Add beast head data randomly
    let rand = getRandomInt(1, 10);
    if (rand === 5) {
        let low = getRandomInt(0, 8);
        let upped = low + 1;
        let high = getRandomInt(upped, 9);
        let hs = pickFrom(headShapes);
        t += `\tbeast_head = {\n`;
        t += `\t\t10 = { name = ${hs} range = { 0.${low} 0.${high} } }\n`;
        t += `\t}\n`;
    }

    t += `}\n`;
    return t;
}

// Function to generate a random color pair
function getRandomColorPair() {
    let lowX1 = getRandomInt(0, 8);
    let uppedX = lowX1 + 1;
    let lowX2 = getRandomInt(0, 9);
    let lowY1 = getRandomInt(0, 8);
    let lowY2 = getRandomInt(0, 9);
    let uppedY = lowY1 + 1;
    let highX1 = getRandomInt(uppedX, 9);
    let highY1 = getRandomInt(uppedY, 9);
    let highX2 = getRandomInt(0, 9);
    let highY2 = getRandomInt(0, 9);
    return `{ 0.${lowX1}${lowX2} 0.${lowY1}${lowY2} 0.${highX1}${highX2} 0.${highY1}${highY2} }`;
}


const geneticProperties = [
    // Traits from the previous snippet
    {
 		n: "gene_chin_forward",
        o: []
 	},
    {
 		n: "gene_eye_angle",
        o: []
 	},
    {
 		n: "gene_eye_height",
        o: []
 	},
    {
 		n: "gene_forehead_brow_height",
 		o: []
 	},
    {
 		n: "gene_forehead_roundness",
 		o: []
 	},
    {
 		n: "gene_head_profile",
 		o: []
 	},
    {
 		n: "gene_head_width",
 		o: []
 	},
    {
 		n: "gene_jaw_width",
 		o: []
 	},
    {
 		n: "gene_mouth_height",
 		o: []
 	},
    {
 		n: "gene_mouth_width",
 		o: []
 	},
    {
 		n: "gene_bs_bust",
 		o: ["bust_shape_1_half", "bust_shape_1_full", "bust_shape_2_half", "bust_shape_2_full", "bust_shape_3_half", "bust_shape_3_full", "bust_shape_4_half", "bust_shape_4_full"]
 	},
    {
 		n: "gene_bs_eye_corner_depth",
 		o: []
 	},
    {
 		n: "gene_bs_eye_fold_shape",
 		o: []
 	},
    {
 		n: "gene_bs_eye_upper_lid_size",
 		o: []
 	},
    {
 		n: "gene_bs_jaw_def",
 		o: []
 	},
    {
 		n: "gene_bs_mouth_upper_lip_profile",
 		o: []
 	},
    {
 		n: "gene_bs_mouth_lower_lip_pad",
 		o: []
 	},
    {
 		n: "gene_bs_nose_length",
 		o: []
 	},
    {
 		n: "gene_bs_nose_nostril_height",
 		o: []
 	},
    {
 		n: "gene_bs_nose_nostril_width",
 		o: []
 	},
    {
 		n: "gene_bs_nose_profile",
 		o: []
 	},
    {
 		n: "gene_bs_nose_tip_angle",
 		o: []
 	},
    {
 		n: "gene_bs_nose_tip_forward",
 		o: []
 	},
    {
 		n: "face_detail_cheek_fat",
 		o: ["cheek_fat_01_pos", "cheek_fat_02_pos", "cheek_fat_03_pos", "cheek_fat_04_pos"]
 	},
    {
 		n: "face_detail_nose_ridge_def",
 		o: []
 	},
    {
 		n: "face_detail_nose_tip_def",
 		o: ["nose_tip_def"]
 	},
    {
 		n: "expression_brow_wrinkles",
 		o: ["brow_wrinkles_01", "brow_wrinkles_02", "brow_wrinkles_03", "brow_wrinkles_04"]
 	},
    {
        n: "complexion",
        o: ["complexion_1", "complexion_2", "complexion_3", "complexion_4", "complexion_5", "complexion_6", "complexion_7"],
    },
    {
 		n: "gene_height",
 		o: ["normal_height"]
 	},
    {
 		n: "gene_bs_body_shape",
 		o: ["body_shape_average", "body_shape_apple_half", "body_shape_apple_full", "body_shape_hourglass_half", "body_shape_hourglass_full", "body_shape_pear_half", "body_shape_pear_full", "body_shape_rectangle_half", "body_shape_rectangle_full", "body_shape_triangle_half", "body_shape_triangle_full" ]
 	},
    {
 		n: "gene_eyebrows_shape",
 		o: ["avg_spacing_avg_thickness", "avg_spacing_high_thickness", "avg_spacing_low_thickness", "avg_spacing_lower_thickness", "far_spacing_avg_thickness", "far_spacing_high_thickness", "far_spacing_low_thickness", "far_spacing_lower_thickness", "close_spacing_avg_thickness", "close_spacing_high_thickness", "close_spacing_low_thickness", "close_spacing_lower_thickness"]
 	},
    {
 		n: "gene_eyebrows_fullness",
 		o: ["layer_2_avg_thickness", "layer_2_high_thickness", "layer_2_lower_thickness", "layer_2_low_thickness"]
 	},
    {
 		n: "face_detail_cheek_def",
 		o: ["cheek_def_01", "cheek_def_02"]
 	},
    {
 		n: "face_detail_chin_cleft",
 		o: ["chin_cleft", "chin_dimple"]
 	},
    {
 		n: "face_detail_chin_def",
 		o: ["chin_def", "chin_def_neg"]
 	},
    {
 		n: "face_detail_eye_lower_lid_def",
 		o: ["eye_lower_lid_def"]
 	},
    {
 		n: "face_detail_eye_socket",
 		o: ["eye_socket_01", "eye_socket_02", "eye_socket_03", "eye_socket_color_01", "eye_socket_color_02", "eye_socket_color_03"]
 	},
    {
 		n: "face_detail_temple_def",
 		o: ["temple_def"]
 	},
    {
 		n: "gene_body_hair",
 		o: ["body_hair_sparse", "body_hair_avg", "body_hair_dense"]
 	},
    {
 		n: "gene_hair_type",
 		o: ["hair_straight", "hair_wavy", "hair_curly", "hair_afro", "hair_straight_thin_beard"]
 	},
    {
 		n: "gene_chin_height",
 		o: []
 	},
    {
 		n: "gene_chin_width",
 		o: []
 	},
    {
 		n: "gene_eye_depth",
 		o: []
 	},
    {
 		n: "gene_eye_distance",
 		o: []
 	},
    {
 		n: "gene_eye_shut",
 		o: []
 	},
    {
 		n: "gene_forehead_angle",
 		o: []
 	},
    {
 		n: "gene_forehead_height",
 		o: []
 	},
    {
 		n: "gene_head_height",
 		o: []
 	},
    {
 		n: "gene_jaw_angle",
 		o: []
 	},
    {
 		n: "gene_jaw_forward",
 		o: []
 	},
    {
 		n: "gene_jaw_height",
 		o: []
 	},
    {
 		n: "gene_mouth_corner_depth",
 		o: []
 	},
    {
 		n: "gene_mouth_corner_height",
 		o: []
 	},
    {
 		n: "gene_mouth_forward",
 		o: []
 	},
    {
 		n: "gene_neck_length",
 		o: []
 	},
    {
 		n: "gene_neck_width",
 		o: []
 	},
    {
 		n: "gene_bs_cheek_forward",
 		o: []
 	},
    {
 		n: "gene_bs_cheek_height",
 		o: []
 	},
    {
 		n: "gene_bs_cheek_width",
 		o: []
 	},
    {
 		n: "gene_bs_ear_angle",
 		o: []
 	},
    {
 		n: "gene_bs_ear_inner_shape",
 		o: ["ear_inner_shape_pos"]
 	},
    {
 		n: "gene_bs_ear_bend",
 		o: ["ear_lower_bend_pos", "ear_upper_bend_pos", "ear_both_bend_pos"]
 	},
    {
 		n: "gene_bs_ear_outward",
 		o: []
 	},
    {
 		n: "gene_bs_ear_size",
 		o: []
 	},
    {
 		n: "gene_bs_eye_size",
 		o: []
 	},
    {
 		n: "gene_bs_forehead_brow_curve",
 		o: []
 	},
    {
 		n: "gene_bs_forehead_brow_forward",
 		o: []
 	},
    {
 		n: "gene_bs_forehead_brow_inner_height",
 		o: []
 	},
    {
 		n: "gene_bs_forehead_brow_outer_height",
 		o: []
 	},
    {
 		n: "gene_bs_forehead_brow_width",
 		o: []
 	},
    {
 		n: "gene_bs_jaw_def",
 		o: []
 	},
    {
 		n: "gene_bs_mouth_lower_lip_def",
 		o: ["mouth_lower_lip_def_pos"]
 	},
    {
 		n: "gene_bs_mouth_lower_lip_full",
 		o: []
 	},
    {
 		n: "gene_bs_mouth_lower_lip_pad",
 		o: []
 	},
    {
 		n: "gene_bs_mouth_lower_lip_width",
 		o: []
 	},
    {
 		n: "gene_bs_mouth_philtrum_def",
 		o: ["mouth_philtrum_def_pos"]
 	},
    {
 		n: "gene_bs_mouth_philtrum_shape",
 		o: []
 	},
    {
 		n: "gene_bs_mouth_philtrum_width",
 		o: []
 	},
    {
 		n: "gene_bs_mouth_upper_lip_def",
 		o: ["mouth_upper_lip_def_pos"]
 	},
    {
 		n: "gene_bs_mouth_upper_lip_full",
 		o: []
 	},
    {
 		n: "gene_bs_mouth_upper_lip_profile",
 		o: []
 	},
    {
 		n: "gene_bs_mouth_upper_lip_width",
 		o: []
 	},
    {
 		n: "gene_bs_nose_forward",
 		o: []
 	},
    {
 		n: "gene_bs_nose_height",
 		o: []
 	},
    {
 		n: "gene_bs_nose_length",
 		o: []
 	},
    {
 		n: "gene_bs_nose_nostril_height",
 		o: []
 	},
    {
 		n: "gene_bs_nose_nostril_width",
 		o: []
 	},
    {
 		n: "gene_bs_nose_profile",
 		o: []
 	},
    {
 		n: "gene_bs_nose_ridge_angle",
 		o: []
 	},
    {
 		n: "gene_bs_nose_ridge_width",
 		o: []
 	},
    {
 		n: "gene_bs_nose_size",
 		o: []
 	},
    {
 		n: "gene_bs_nose_tip_angle",
 		o: []
 	},
    {
 		n: "gene_bs_nose_tip_forward",
 		o: []
 	},
    {
 		n: "gene_bs_nose_tip_width",
 		o: []
 	},
    {
 		n: "face_detail_nasolabial",
 		o: ["nasolabial_01", "nasolabial_02", "nasolabial_03"]
 	},
    {
 		n: "expression_eye_wrinkles",
 		o: ["eye_wrinkles_01", "eye_wrinkles_02", "eye_wrinkles_03"]
 	},
    {
 		n: "expression_forehead_wrinkles",
 		o: ["forehead_wrinkles_01", "forehead_wrinkles_02", "forehead_wrinkles_03"]
 	},
    {
 		n: "expression_other",
 		o: ["cheek_wrinkles_both_01"]
 	},
    {
 		n: "gene_age",
 		o: ["old_1", "old_2", "old_3", "old_4"]
 	},
    {
 		n: "eyelashes_accessory",
 		o: ["normal_eyelashes"]
 	},
    {
 		n: "eye_accessory",
 		o: ["normal_eyes"]
 	}
]


let headShapes = [
    "bumpy_head",
    "star_head",
    "meltface_head",
    "warthog_head"
]