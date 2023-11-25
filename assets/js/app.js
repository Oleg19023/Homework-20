function calculateLoanPayments(loanAmount, annualInterestRate, loanTermMonths, upfrontFee, monthlyFee) {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    
    let remainingLoanAmount = loanAmount;
    let totalPayment = 0;

    const monthlyPayments = [];

    for (let month = 1; month <= loanTermMonths; month++) {
        const interestPayment = remainingLoanAmount * monthlyInterestRate;
        const principalPayment = loanAmount / loanTermMonths;
        remainingLoanAmount -= principalPayment;

        const roundedPrincipalPayment = Math.ceil(principalPayment * 100) / 100;
        const roundedInterestPayment = Math.ceil(interestPayment * 100) / 100;
        const roundedRemainingLoanAmount = Math.round(remainingLoanAmount * 100) / 100;
        const roundedUpfrontFee = Math.round(upfrontFee * loanAmount) / 100;

        totalPayment += principalPayment + interestPayment + monthlyFee;

        monthlyPayments.push({
            month,
            remainingLoanAmount: roundedRemainingLoanAmount,
            principalPayment: roundedPrincipalPayment,
            interestPayment: roundedInterestPayment,
            upfrontFee: roundedUpfrontFee,
            monthlyFee: monthlyFee,
            totalPayment: (principalPayment + interestPayment + monthlyFee).toFixed(2),
        });
    }

    const roundedUpfrontFeeAmount = Math.round(upfrontFee * loanAmount) / 100;
    totalPayment += roundedUpfrontFeeAmount;

    totalPayment = Math.floor(totalPayment * 100) / 100;

    const monthlyFeeAmount = monthlyFee * loanTermMonths;

    return { monthlyPayments, totalPayment, roundedUpfrontFeeAmount, monthlyFeeAmount };
}


// Функция видимости полей
function UpdateInput() {
    const selectedValue = document.getElementById('question').value;
    const additionalInputs3 = document.getElementById('additionalInputs3');
    additionalInputs3.style.display = (selectedValue === '3') ? 'block' : 'none';
}

// Функция расчета и результатов
function calculate() {
    const selectedValue = document.getElementById('question').value;

    switch (selectedValue) {
        case '3':
            // Рассчет выплаты кредита
            const loanAmount = parseFloat(document.getElementById('Input5').value);
            const annualInterestRate = parseFloat(document.getElementById('Input6').value);
            const loanTermMonths = parseFloat(document.getElementById('Input4').value);
            const upfrontFee = parseFloat(document.getElementById('Input7').value);
            const monthlyFee = parseFloat(document.getElementById('Input8').value);

            if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(loanTermMonths) || loanAmount <= 0 || annualInterestRate <= 0 || loanTermMonths <= 0) {
                alert('Введите корректные значения для суммы кредита, процентной ставки и срока кредита.');
                return;
            }

            const { monthlyPayments, totalPayment, roundedUpfrontFeeAmount, monthlyFeeAmount } = calculateLoanPayments(loanAmount, annualInterestRate, loanTermMonths, upfrontFee, monthlyFee);

            // Вывод информации
            const resultElement = document.getElementById('result');
            let outputHTML = `
                <h5 class="mb-3">Схема выплат по кредиту:</h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Месяц</th>
                            <th scope="col">Задолженность по кредиту</th>
                            <th scope="col">Погашение кредита</th>
                            <th scope="col">Проценты по кредиту</th>
                            <th scope="col">Единоразовая комиссия</th>
                            <th scope="col">Ежемесячная комиссия</th>
                            <th scope="col">Выплаты в месяц</th>
                        </tr>
                    </thead>
                    <tbody>`;

            monthlyPayments.forEach(payment => {
                outputHTML += `
                    <tr>
                        <th scope="row">${payment.month}</th>
                        <td>${payment.remainingLoanAmount.toFixed(2)}</td>
                        <td>${payment.principalPayment.toFixed(2)}</td>
                        <td>${payment.interestPayment.toFixed(2)}</td>
                        <td>${payment.upfrontFee.toFixed(2)}</td>
                        <td>${payment.monthlyFee.toFixed(2)}</td>
                        <td>${payment.totalPayment}</td>
                    </tr>`;
            });

            const totalRemainingLoanAmount = monthlyPayments[monthlyPayments.length - 1].remainingLoanAmount;
            const totalPrincipalPayment = monthlyPayments.reduce((sum, payment) => sum + payment.principalPayment, 0);
            const totalInterestPayment = monthlyPayments.reduce((sum, payment) => sum + payment.interestPayment, 0);
            const totalUpfrontFee = roundedUpfrontFeeAmount;
            const totalMonthlyFee = monthlyFeeAmount;
            const roundedTotalPayment = totalPrincipalPayment + totalInterestPayment + totalUpfrontFee + totalMonthlyFee;

        outputHTML += `
            <tfoot>
                <tr>
                    <th scope="row">Итого</th>
                    <td>${totalRemainingLoanAmount.toFixed(2)}</td>
                    <td>${totalPrincipalPayment.toFixed(0)}</td>
                    <td>${totalInterestPayment.toFixed(2)}</td>
                    <td>${totalUpfrontFee.toFixed(2)}</td>
                    <td>${totalMonthlyFee.toFixed(2)}</td>
                    <td>${roundedTotalPayment.toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>`;
            outputHTML += `</tbody></table>`;
            outputHTML += `<h5 class="mt-4">Единоразовая комиссия: ${roundedUpfrontFeeAmount.toFixed(2)}</h5>`;
            outputHTML += `<h5>Ежемесячная комиссия: ${monthlyFeeAmount.toFixed(2)}</h5>`;
            outputHTML += `<h5 class="mt-4">Общая переплата по кредиту: ${totalPayment.toFixed(2)}</h5>`;

            resultElement.innerHTML = outputHTML;
            break;

        default:
            alert('Выберите вариант для вычисления.');
    }
}
