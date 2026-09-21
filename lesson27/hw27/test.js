import {getAuthenticatedUser} from "./authService.js";
import {createBasePromptByRole, formatProductsForPrompt, createPrompt} from "./promptService.js";

const user = getAuthenticatedUser();

const basePrompt = createBasePromptByRole(user);

const prompt = createPrompt(basePrompt, "борщ" ,products);


const answer = await askAi("The capital of France");
console.log(answer);