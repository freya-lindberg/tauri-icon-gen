const sharp = require("sharp");

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

async function main() {
    try {
        const name = await rl.question("Input iamge file's name: ");

        if (!name || !name.length) {
            throw new Error("Wrong name");
        }

        console.log(name);

        rl.close();
    } catch(e) {
        console.error(e);
    }
}

main();