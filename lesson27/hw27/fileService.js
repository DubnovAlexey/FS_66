import {readFile} from "node:fs/promises";

export async function readFromJsonFile(filePath) {
    const fileData = await readFile(filePath, "utf-8");
    return JSON.parse(fileData);
}