function calculateLoanPayments(loanAmount, annualInterestRate, loanTermMonths) {
    const monthlyInterestRate = Math.round((annualInterestRate / 100 / 12) * 100) / 100;

    let remainingLoanAmount = loanAmount;
    let totalPayment = 0;

    const monthlyPayments = [];

    const firstMonth = {
        month: 1,
        remainingLoanAmount: remainingLoanAmount,
        principalPayment: Math.round((loanAmount / loanTermMonths) * 100) / 100,
        interestPayment: Math.round(remainingLoanAmount * monthlyInterestRate * 100) / 100,
        totalPayment: (
            Math.round((loanAmount / loanTermMonths + remainingLoanAmount * monthlyInterestRate) * 100) / 100
        ).toFixed(2),
    };

    monthlyPayments.push(firstMonth);
    totalPayment += parseFloat(firstMonth.totalPayment);

    for (let month = 2; month <= loanTermMonths; month++) {
        const interestPayment = Math.round(remainingLoanAmount * monthlyInterestRate * 100) / 100;
        let principalPayment = Math.round((loanAmount / loanTermMonths) * 100) / 100;
        remainingLoanAmount -= principalPayment;
        totalPayment += principalPayment + interestPayment;
        totalPayment=Math.round((principalPayment + interestPayment) * 100) / 100
        if(month==loanTermMonths){
            principalPayment=remainingLoanAmount;
            totalPayment=Math.round((principalPayment + interestPayment) * 100) / 100
        }

        monthlyPayments.push({
            month,
            remainingLoanAmount: Math.round(remainingLoanAmount * 100) / 100,
            principalPayment: Math.round(principalPayment * 100) / 100,
            interestPayment: Math.round(interestPayment * 100) / 100,
            totalPayment: totalPayment
        });
    }

    totalPayment = Math.round(totalPayment * 100) / 100;

    const lastMonth = monthlyPayments[monthlyPayments.length - 1];
    const diff = totalPayment - lastMonth.totalPayment;
    return { monthlyPayments, totalPayment };
}

const loanAmount = 100; // Сумма кредита
const annualInterestRate = 60; // Годовая процентная ставка
const loanTermMonths = 12; // Срок кредитования в месяцах

const { monthlyPayments, totalPayment } = calculateLoanPayments(loanAmount, annualInterestRate, loanTermMonths);

console.log(monthlyPayments);
console.log('Общая переплата:', Math.round(monthlyPayments.reduce((a, cv) => a + cv.interestPayment, 0)*100)/100 );
