/*
HW_21-22_TEXT
1.

a) Создайте несколько объектов-продуктов. В каждом объекте
должно быть поле name (название), description(описание), price(цена),
info (функция, которая формирует строку вида:
`товар: notebook lenovo thinkpad; цена: 1283 описание: cpu intel core7, ram:16gb ...`

b) создайте конструктор для создания объектов-товаров.
Создайте несколько товаров

с) Создайте массив из товаров. Напишите функцию, которая
выводит в консоль информацию о всех товарах в виде:
```
Tовар 1
    name: notebook lenovo thinkpad
    price: 1283
    description: .....
    info: ....
```
т.е. `поле: значение` При этом: поля, которые являются
функциями, нужно выводить результат работы функции
(не текст функции)

2.ADV****  Как обязательная на понедельник 31.08.2026

### 2
a)
Создай функцию-конструктор объектов Account(iban,owner, balance),
которая возвращает объект с:
- номер счета (iban)
- именем владельца (owner)
- балансом (balance)
методами:
- **deposit**(amount) — пополнение счёта
- **withdraw**(amount) — снятие денег (если хватает баланса)
- **getBalance**() — вывод текущего баланса

Создайте несколько объектов счетов. Создайте массив из
счетов. Выведите информацию о всех счетах в консоль

b) напишите функцию, transfer, которая получает два счета,
и выполняет перевод между счетами вызывая методы deposit и
withdraw соответственно.

с) (чуть сложнее****************)
 В качестве результата функции transaer, в случае успешной
операции, должен cформироваться объект:
- account1 (счет списания),
- account2 (счет зачисления),
- amount (сумма)
- transactionInfo() (функция, которая выводит информацию о транзакции)

Если транзакция прошла неуспешно, объект должен содержать
еще и поле error c информацией об ошибке. Естественно,
transactionInfo() должна в этом случае выводить информацию
о неуспешной транзакции. В случае, если транзакция успешна,
поля error не должно быть.


*/

// 1a.
const manualProduct1 = {
    name: "Quantum Processor X1", // String
    description: "128-core CPU for orbital stations",
    price: 4500, // Number
    info: function () {
        return `Товар: ${this.name}; Цена: ${this.price}; Описание: ${this.description}`;
    }
};

// 1b.
function Product(name, description, price ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.info = function () {
        return `Товар: ${this.name}; Цена: ${this.price}; Описание: ${this.description}`;

    };
}

const prod1 = new Product("Nav Computer", "Calculates jump routes", 12000);
const prod2 = new Product("Plasma Cell", "Standard energy unit", 150);
const prod3 = new Product("Asteroid Miner Drone", "Automated mining unit", 3400);


// 1c.
const warehouse = [prod1, prod2, prod3];

function printCatalog(productsArray) {
    console.log("=== ЗАПУСК СКАНЕРА КАТАЛОГА ===");

    for (let i =0; i<productsArray.length; i++) {
        let currentItem = productsArray[i];
        console.log(`\nТовар ${i + 1}`);

        for (let key in currentItem) {
            if (typeof currentItem[key] == "function") {
                console.log(`  ${key}: ${currentItem[key]()}`);
            } else {
                console.log(`  ${key}: ${currentItem[key]}`);
            }
        }
    }
}

printCatalog(warehouse);