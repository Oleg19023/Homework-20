let loanTermMonths = 12;
let loanAmount = 100;
let annualInterestRate = 60;

let telo = Math.round((loanAmount / loanTermMonths) * 100) / 100;
let interest = Math.round((loanAmount * (annualInterestRate / 100)) * 100) / 100;
let totalPayments = 0;

console.log('Начальная сумма кредита:', loanAmount);
console.log('Тело кредита в месяц:', telo);
console.log('Проценты в месяц:', interest);

for (let i = 1; i <= loanTermMonths; i++) {
    let remainingLoanAmount = loanAmount - (i === 1 ? 0 : telo * (i - 1));
    let interestPayment = Math.round((remainingLoanAmount * (annualInterestRate / 100 / 12)) * 100) / 100;
    let principalPayment = Math.round(telo * 100) / 100;
    let totalPayment = Math.round((principalPayment + interestPayment) * 100) / 100;

    if (i === loanTermMonths) {
        telo = Math.round(remainingLoanAmount * 100) / 100;
        totalPayment = Math.round((telo + interestPayment) * 100) / 100;
    }

    totalPayments += totalPayment;

    console.log(`Месяц ${i}: `, Math.round(remainingLoanAmount * 100) / 100, telo, interestPayment, totalPayment);
}

console.log('Общая переплата:', Math.round(totalPayments * 100) / 100);
