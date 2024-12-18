import chalk from "chalk";
import { add } from "@paper/back";
import { subtract } from "@paper/lib";

console.log("1 + 2 =", chalk.green(add(1, 2)));
console.log("2 - 4 =", chalk.red(subtract(2, 4)));
