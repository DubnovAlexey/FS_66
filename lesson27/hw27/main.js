import {getAuthenticatedUser} from "./authService.js";
import {FRIDGE_FILE} from "./config.js";
import path from "node:path";
import {createBasePromptByRole, createPrompt} from "./promptService.js";
import {readFromJsonFile} from "./fileService.js";
import {askAi} from "./aiService.js";

try{const authenticatedUser = getAuthenticatedUser();
    const filePath = path.resolve(FRIDGE_FILE);
    const products = await readFromJsonFile(filePath);
    const basePrompt = createBasePromptByRole(authenticatedUser);
    const prompt = createPrompt(basePrompt, "картофельное пюре" ,products);
    const answer = await askAi(prompt);
    console.log(answer);
}catch(e){
    console.log(e.message);
}
//Создать файл index.html который бы:
//1 По имени пользователя определял бы является ли он существующим и если нет, то давал бы ему новую роль Guest
//2 C клавиатуры надо ввести название блюда
//3 По кнопке искать
//4 Вывести ответ на экран  В случае если возникнет ERROR  - вывести модальное окно