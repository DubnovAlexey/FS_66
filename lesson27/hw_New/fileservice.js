

export async function readFromJsonFile(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Не удалось загрузить файл: ' + url);
    }

    return response.json();
}