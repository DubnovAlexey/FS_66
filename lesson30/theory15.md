## 📘 Урок 15. Error Handling — JavaScript

В этом конспекте ты познакомишься с обработкой ошибок — механизмом, который позволяет программе **не ломаться**, а корректно реагировать на проблемы.

---

# 🧠 1. Что такое ошибка

**Ошибка (error)** — это ситуация, когда программа не может выполнить действие.

---

## 📦 Примеры:

```javascript
JSON.parse("text");        // ошибка парсинга
let x = undefined.value;   // ошибка доступа
```

---

👉 Без обработки программа может остановиться

---

---

# 🎯 2. Зачем нужна обработка ошибок

Обработка ошибок позволяет:

* избежать падения программы
* контролировать поведение
* показывать понятные сообщения

---

👉 Это делает программу **надёжной**

---

---

# ⚠️ 3. Проблемы без обработки ошибок

---

## ❌ Пример:

```javascript
JSON.parse("invalid json");
```

---

👉 программа завершится с ошибкой

---

---

## ❌ Пример с API:

```javascript
axios.get("wrong-url");
```

---

👉 ошибка запроса → программа ломается

---

---

# 🧱 4. Конструкция try-catch

---

## 📌 Синтаксис:

```javascript
try {
  // код
} catch (error) {
  // обработка ошибки
}
```

---

---

## 📦 Пример:

```javascript
try {
  let data = JSON.parse("invalid");
} catch (error) {
  console.log("Error:", error.message);
}
```

---

👉 программа не падает

---

---

# 🔄 5. Как это работает

1. выполняется код в `try`
2. если ошибка → переход в `catch`
3. программа продолжает работу

---

---

# 🌐 6. Обработка ошибок с axios

---

## 📦 Пример:

```javascript
const axios = require("axios");

axios.get("https://wrong-url.com")
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log("Request failed");
  });
```

---

👉 ошибки обрабатываются через `.catch()`

---

---

# 🔗 7. try-catch + API

---

## 📦 Пример:

```javascript
async function loadData() {
  try {
    let response = await axios.get("https://api.example.com/data");
    console.log(response.data);
  } catch (error) {
    console.log("Error loading data");
  }
}
```

---

👉 универсальный подход

---

---

# ⚠️ 8. Выброс собственных ошибок

Иногда нужно **самому создать ошибку**

---

## 📌 Синтаксис:

```javascript
throw new Error("Message");
```

---

---

## 📦 Пример:

```javascript
function validatePrice(price) {
  if (typeof price !== "number") {
    throw new Error("Price must be a number");
  }
}
```

---

👉 контролируем поведение программы

---

---

# 🧠 9. Зачем выбрасывать ошибки

* остановить выполнение
* указать на проблему
* контролировать логику

---

---

# 🔍 10. Пример с валидацией

```javascript
function processProduct(product) {
  if (!product.name) {
    throw new Error("Invalid product name");
  }

  return product.name;
}
```

---

---

# 🔗 11. Связь с предыдущими темами

---

## 📌 API

→ ошибки запросов

---

## 📌 Data Validation

→ проверка данных

---

## 📌 Custom Logic

→ контроль поведения

---

---

# 🧪 12. Практический пример

```javascript
const axios = require("axios");

function validateProducts(products) {
  return products.filter(function(product) {
    if (typeof product.price !== "number") {
      throw new Error("Invalid price");
    }
    return true;
  });
}

axios.get("https://api.example.com/products")
  .then(function(response) {
    try {
      let validProducts = validateProducts(response.data);
      console.log(validProducts);
    } catch (error) {
      console.log("Validation error:", error.message);
    }
  })
  .catch(function(error) {
    console.log("API error");
  });
```

---

---

# ⚠️ 13. Частые ошибки

## ❌ Не обрабатывать ошибки

→ программа падает

---

---

## ❌ Пустой catch

```javascript
catch (e) {}
```

---

👉 теряется информация

---

---

## ❌ Не использовать throw

→ сложно контролировать

---

---

## ❌ Смешивать логику и обработку

---

---

# 🧠 Важные выводы

* ошибка — это проблема выполнения
* обработка ошибок делает программу устойчивой
* используется:

  * try-catch
  * .catch()
* можно создавать ошибки через `throw new Error()`
* важно:

  * не игнорировать ошибки
  * обрабатывать их правильно

---
