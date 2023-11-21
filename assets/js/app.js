function calculateLoanPayments(loanAmount, annualInterestRate, loanTermMonths, upfrontFee, monthlyFee) {

    const monthlyInterestRate = annualInterestRate / 100 / 12; // Преобразование годовой процентной ставки в месячную
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths)); // Расчет ежемесячного аннуитетного платежа

    let remainingLoanAmount = loanAmount;
    let totalPayment = 0;

    const monthlyPayments = [];

    // Расчет выплат
    for (let month = 1; month <= loanTermMonths; month++) {

        const interestPayment = remainingLoanAmount * monthlyInterestRate; // Расчет процентной части платежа
        const principalPayment = monthlyPayment - interestPayment; // Расчет части платежа, погашающей тело кредита
        remainingLoanAmount -= principalPayment; // Обновление оставшейся суммы долга
        totalPayment += monthlyPayment; // Суммирование общей выплаченной суммы

        // Округление
        const roundedPrincipalPayment = Math.round(principalPayment * 100) / 100;
        const roundedInterestPayment = Math.round(interestPayment * 100) / 100;
        const roundedRemainingLoanAmount = Math.round(remainingLoanAmount * 100) / 100;

        // Добавление инфо о месяце в массив
        monthlyPayments.push({
            month,
            principalPayment: roundedPrincipalPayment,
            interestPayment: roundedInterestPayment,
            totalPayment: monthlyPayment,
            remainingLoanAmount: roundedRemainingLoanAmount,
        });
    }

    
    const upfrontFeeAmount = loanAmount * (upfrontFee / 100); // Расчет комиссии

    totalPayment += upfrontFeeAmount; // Расчет общей выплаты

    const monthlyFeeAmount = monthlyFee * loanTermMonths; // Расчет ежемесячной комиссии

    totalPayment = Math.round(totalPayment * 100) / 100; // Округление общей выплаты
    return { monthlyPayments, totalPayment, upfrontFeeAmount, monthlyFeeAmount };
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

            const { monthlyPayments, totalPayment, upfrontFeeAmount, monthlyFeeAmount } = calculateLoanPayments(loanAmount, annualInterestRate, loanTermMonths, upfrontFee, monthlyFee);

    // Вывод информации
    const resultElement = document.getElementById('result');
    let outputHTML = `<h5 class="mb-3">Ежемесячные выплаты:</h5>`;
            
    monthlyPayments.forEach(payment => {
        outputHTML += `
            <div class="mb-3">
                <h6>Месяц ${payment.month}</h6>
                <ul>
                    <li><strong>Основной долг:</strong> ${payment.principalPayment.toFixed(2)}</li>
                     <li><strong>Проценты:</strong> ${payment.interestPayment.toFixed(2)}</li>
                     <li><strong>Итого:</strong> ${payment.totalPayment.toFixed(2)}</li>
                     <li><strong>Остаток:</strong> ${payment.remainingLoanAmount.toFixed(2)}</li>
                </ul>
        </div>`;
});

// Вывод информации
outputHTML += `<h5 class="mt-4">Единоразовая комиссия: ${upfrontFeeAmount.toFixed(2)}</h5>`;
outputHTML += `<h5>Ежемесячная комиссия: ${monthlyFeeAmount.toFixed(2)}</h5>`;
outputHTML += `<h5 class="mt-4">Общая переплата по кредиту: ${totalPayment.toFixed(2)}</h5>`;

resultElement.innerHTML = outputHTML;
break;

        default:
            alert('Выберите вариант для вычисления.');
    }
}
