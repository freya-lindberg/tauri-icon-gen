const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const { constants } = require("node:fs");
const { access, readdir, rm } = require("node:fs/promises");

const sharp = require("sharp");

const rl = readline.createInterface({ input, output });

async function main() {
    try {
        /**
         * #TODO : Input the name of the image file.
         */
        const name = (await rl.question("Input iamge file(source)'s name: ")).trim();

        /**
         * #TODO: Check if the name of the image file is valid.
         */
        if (!name || !name.length) {
            throw new Error("The name of image file you entered is invalid.");
        }

        /**
         * #TODO: Check if the name of image file is exists.
         */
        
        rl.close();
    } catch(e) {
        console.error(e);
    } finally {
        console.log("Done and done!");
    }
}

main();