function calculateLoanPayments(loanAmount, annualInterestRate, loanTermMonths) {
    const monthlyInterestRate = annualInterestRate / 100 / 12;

    let remainingLoanAmount = loanAmount;
    let totalPayment = 0;

    const monthlyPayments = [];

    for (let month = 1; month <= loanTermMonths; month++) {
        const interestPayment = remainingLoanAmount * monthlyInterestRate;
        const principalPayment = loanAmount / loanTermMonths;
        remainingLoanAmount -= principalPayment;

        totalPayment += principalPayment + interestPayment;

        monthlyPayments.push({
            month,
            remainingLoanAmount: Math.round(remainingLoanAmount * 100) / 100,
            principalPayment: Math.round(principalPayment * 100) / 100,
            interestPayment: Math.round(interestPayment * 100) / 100,
            totalPayment: (principalPayment + interestPayment).toFixed(2),
        });
    }

    totalPayment = Math.round(totalPayment * 100) / 100;

    return { monthlyPayments, totalPayment };
}

const loanAmount = 100; // Сумма кредита
const annualInterestRate = 60; // Годовая процентная ставка
const loanTermMonths = 12; // Срок кредитования в месяцах

const { monthlyPayments, totalPayment } = calculateLoanPayments(loanAmount, annualInterestRate, loanTermMonths);

console.log(monthlyPayments);
console.log('Общая переплата:', totalPayment);
