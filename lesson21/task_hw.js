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
console.log(manualProduct1);
console.log(manualProduct1.info());

// 1b.
function Product(name, description, price) {
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

console.log(prod1);
console.log(prod2);
console.log(prod3);

// 1c.
const warehouse = [prod1, prod2, prod3];

function printCatalog(productsArray) {
    console.log("=== ЗАПУСК СКАНЕРА КАТАЛОГА ===");

    for (let i = 0; i < productsArray.length; i++) {
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


//====================================================================
//====================================================================
// 2a. Конструктор банковского счета
function Account(iban, owner, initialBalance) {
    this.iban = iban;
    this.owner = owner;
    this.balance = initialBalance;

    // Метод пополнения
    this.deposit = function (amount) {
        if (amount > 0) {
            this.balance += amount;
            return true; // Сигнализируем об успехе
        }
        return false;
    };

    // Метод снятия
    this.withdraw = function (amount) {
        // Проверяем: сумма должна быть > 0 и должно хватать средств
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            return true; // Транзакция разрешена и выполнена
        }
        return false; // Транзакция отклонена
    };

    // Метод проверки сканером
    this.getBalance = function () {
        return this.balance;
    };
}

// Создаем "узлы" счетов
const acc1 = new Account("UE-8472-91", "James Holden", 1000);
const acc2 = new Account("UE-1138-00", "Naomi Nagata", 500);
const acc3 = new Account("UE-9999-55", "Amos Burton", 0);

// Массив счетов
const bankNetwork = [acc1, acc2, acc3];

console.log("=== БАЛАНСЫ ДО ПЕРЕВОДОВ ===");
bankNetwork.forEach(acc => console.log(`${acc.owner}: ${acc.getBalance()} кредитов`));


// 2b & 2c. Функция перевода с формированием отчета
function transfer(accountFrom, accountTo, amount) {
    // 1. Создаем пустой "бланк отчета" о транзакции
    const receipt = {
        account1: accountFrom.iban,
        account2: accountTo.iban,
        amount: amount
    };

    // 2. Пытаемся снять деньги (вызываем метод).
    // Если withdraw вернет true, значит деньги списались, идем дальше.
    let isWithdrawSuccess = accountFrom.withdraw(amount);

    if (isWithdrawSuccess) {
        // Деньги списаны успешно. Зачисляем их на второй счет.
        accountTo.deposit(amount);

        // Встраиваем метод в бланк отчета (транзакция успешна)
        receipt.transactionInfo = function () {
            return `[SUCCESS] Перевод ${this.amount} кр. | С ${this.account1} на ${this.account2}`;
        };
    } else {
        // Денег не хватило. Добавляем в бланк "штамп об ошибке".
        receipt.error = "INSUFFICIENT_FUNDS (Недостаточно средств или неверная сумма)";

        // Встраиваем метод в бланк отчета (транзакция провалена)
        receipt.transactionInfo = function () {
            return `[FAILED] Ошибка: ${this.error} | Попытка перевода ${this.amount} кр. с ${this.account1}`;
        };
    }

    // 3. Возвращаем готовый бланк отчета (объект)
    return receipt;
}

// ==========================================
// ТЕСТИРОВАНИЕ СИСТЕМЫ
// ==========================================
console.log("\n=== ИНИЦИАЛИЗАЦИЯ ТРАНЗАКЦИЙ ===");

// Транзакция 1: Успешная (Холден переводит Наоми 300)
const tx1 = transfer(acc1, acc2, 300);
console.log(tx1.transactionInfo());

// Транзакция 2: Провальная (Амос пытается перевести 5000, которых у него нет)
const tx2 = transfer(acc3, acc1, 5000);
console.log(tx2.transactionInfo());

// Посмотрим на сам объект с ошибкой, чтобы убедиться, что поле error создалось:
console.log("\nОбъект неудачной транзакции под капотом:", tx2);

console.log("\n=== БАЛАНСЫ ПОСЛЕ ПЕРЕВОДОВ ===");
bankNetwork.forEach(acc => console.log(`${acc.owner}: ${acc.getBalance()} кредитов`));


/*==Дальше второй вариант решения второй задачи ==

                                =====Вариант2=====

Служба Транзакций.
Создается отдельный объект-менеджер TransactionService, который ведет лог всех переводов в базу данных (Ledger) с возможностью отмены (Rollback).
 */
// 1. Сущность "Счет" (Контейнер с деньгами)
// Мы убрали из него сложную логику. Теперь он просто хранит данные
// и предоставляет "шлюзы" для ввода/вывода.
function LedgerAccount(iban, owner, initialBalance) {
    this.iban = iban;
    this.owner = owner;
    this.balance = initialBalance;

    // Шлюз пополнения
    this.deposit = function (amount) {
        this.balance += amount;
    };

    // Шлюз снятия
    this.withdraw = function (amount) {
        this.balance -= amount;
    };

    this.getBalance = function () {
        return this.balance;
    };
}

// 2. Сущность "Чек/Запись в журнале" (Transaction Record)
// Это неизменяемый слепок того, что произошло.
function TransactionRecord(id, type, fromIban, toIban, amount, status, errorMsg = null) {
    this.id = id;             // Уникальный номер операции
    this.timestamp = new Date().toISOString(); // Точное время по серверу
    this.type = type;         // Тип: 'TRANSFER', 'ROLLBACK' и т.д.
    this.from = fromIban;
    this.to = toIban;
    this.amount = amount;
    this.status = status;     // 'SUCCESS' или 'FAILED'
    this.error = errorMsg;

    // Форматированный вывод чека
    this.printInfo = function () {
        const sign = this.status === 'SUCCESS' ? '[✓]' : '[✗]';
        let msg = `${sign} ID: ${this.id} | ${this.timestamp} | ${this.type} | Сумма: ${this.amount}`;
        if (this.error) msg += ` | ОШИБКА: ${this.error}`;
        return msg;
    };
}

// 3. Сущность "Служба Транзакций" (Центральный Банк / Менеджер)
// Этот объект управляет ВСЕМИ переводами и хранит историю.
function TransactionService() {
    // Ledger - Главная книга (массив всех чеков).
    // Это архив, куда складируются все документы.
    this.ledger = [];

    // Внутренний счетчик для генерации уникальных ID транзакций
    this.txCounter = 1000;

    // Главный метод перевода
    this.processTransfer = function (accountFrom, accountTo, amount) {
        this.txCounter++; // Увеличиваем счетчик для нового ID
        const txId = `TX-${this.txCounter}`;

        // Валидация (Проверка перед отправкой)
        if (amount <= 0) {
            const record = new TransactionRecord(txId, 'TRANSFER', accountFrom.iban, accountTo.iban, amount, 'FAILED', 'Сумма должна быть больше нуля');
            this.ledger.push(record); // push() - команда "положить в конец массива (архива)"
            return record;
        }

        if (accountFrom.getBalance() < amount) {
            const record = new TransactionRecord(txId, 'TRANSFER', accountFrom.iban, accountTo.iban, amount, 'FAILED', 'Недостаточно средств');
            this.ledger.push(record);
            return record;
        }

        // Выполнение перевода
        accountFrom.withdraw(amount);
        accountTo.deposit(amount);

        // Фиксация успеха
        const successRecord = new TransactionRecord(txId, 'TRANSFER', accountFrom.iban, accountTo.iban, amount, 'SUCCESS');
        this.ledger.push(successRecord); // Сохраняем успешный чек в историю

        return successRecord;
    };

    // Метод отмены транзакции (Экстренный возврат)
    this.rollback = function (transactionId, accountsNetwork) {
        // Ищем транзакцию в архиве по ID
        // find() - перебирает все чеки (tx)
        // и возвращает тот, где tx.id совпадает с нужным transactionId.
        const originalTx = this.ledger.find(tx => tx.id === transactionId);

        if (!originalTx) {
            console.log(`[СИСТЕМА] Транзакция ${transactionId} не найдена в базе!`);
            return false;
        }

        if (originalTx.status !== 'SUCCESS' || originalTx.type === 'ROLLBACK') {
            console.log(`[СИСТЕМА] Невозможно отменить транзакцию ${transactionId} (уже отменена или была ошибочной).`);
            return false;
        }

        console.log(`[СИСТЕМА] Инициирован откат транзакции ${transactionId}...`);

        // Ищем сами объекты счетов в глобальной сети по их IBAN
        const accountFrom = accountsNetwork.find(acc => acc.iban === originalTx.from);
        const accountTo = accountsNetwork.find(acc => acc.iban === originalTx.to);

        // Делаем обратный перевод (изымаем у получателя, возвращаем отправителю)
        accountTo.withdraw(originalTx.amount);
        accountFrom.deposit(originalTx.amount);

        // Записываем операцию отката в журнал
        this.txCounter++;
        const rollbackRecord = new TransactionRecord(`TX-${this.txCounter}`, 'ROLLBACK', accountTo.iban, accountFrom.iban, originalTx.amount, 'SUCCESS');
        this.ledger.push(rollbackRecord);

        // Помечаем старую транзакцию как отмененную (мутируем данные)
        originalTx.status = 'ROLLED_BACK';

        return true;
    };

    // Вывод всей истории
    this.printLedger = function () {
        console.log("\n=== ГЛАВНАЯ КНИГА ТРАНЗАКЦИЙ (LEDGER) ===");
        // forEach - команда "Сделай это действие для каждого элемента массива"
        this.ledger.forEach(record => console.log(record.printInfo()));
        console.log("=========================================\n");
    };
}

// ==========================================
// ИНИЦИАЛИЗАЦИЯ И ТЕСТИРОВАНИЕ
// ==========================================

// 1. Создаем сеть счетов
const ledgerAcc1 = new LedgerAccount("UE-8472-91", "James Holden", 1000);
const ledgerAcc2 = new LedgerAccount("UE-1138-00", "Naomi Nagata", 500);
const globalNetwork = [ledgerAcc1, ledgerAcc2]; // Глобальная база счетов

// 2. Создаем Центральную Службу Транзакций
const bankService = new TransactionService();

console.log("=== БАЛАНСЫ ДО ОПЕРАЦИЙ (СЕРВИС) ===");
globalNetwork.forEach(acc => console.log(`${acc.owner}: ${acc.getBalance()} кр.`));

// 3. Делаем переводы
console.log("\n=== ВЫПОЛНЕНИЕ ПЕРЕВОДОВ (СЕРВИС) ===");
const result1 = bankService.processTransfer(ledgerAcc1, ledgerAcc2, 300); // Успешно
const result2 = bankService.processTransfer(ledgerAcc1, ledgerAcc2, 9000); // Ошибка (нет денег)
const result3 = bankService.processTransfer(ledgerAcc2, ledgerAcc1, 100); // Успешно

// 4. Смотрим журнал
bankService.printLedger();

console.log("=== БАЛАНСЫ ПОСЛЕ ПЕРЕВОДОВ (СЕРВИС) ===");
globalNetwork.forEach(acc => console.log(`${acc.owner}: ${acc.getBalance()} кр.`));

// 5. Имитируем жалобу клиента и делаем ОТКАТ первой операции (TX-1001)
console.log("\n=== ЭКСТРЕННАЯ ОТМЕНА ТРАНЗАКЦИИ TX-1001 ===");
bankService.rollback("TX-1001", globalNetwork);

// 6. Смотрим итоговый журнал и балансы
bankService.printLedger();
console.log("=== ИТОГОВЫЕ БАЛАНСЫ (СЕРВИС) ===");
globalNetwork.forEach(acc => console.log(`${acc.owner}: ${acc.getBalance()} кр.`));