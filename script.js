document.addEventListener("DOMContentLoaded", function () {
  const carTypeEl = document.getElementById("carType");
  const carValueEl = document.getElementById("carValue");
  const carValueRangeEl = document.getElementById("carValueRange");
  const leasePeriodEl = document.getElementById("leasePeriod");
  const downPaymentEl = document.getElementById("downPayment");
  const downPaymentRangeEl = document.getElementById("downPaymentRange");

  const leasingCostEl = document.getElementById("leasingCost");
  const monthlyInstallmentEl = document.getElementById("monthlyInstallment");
  const downPaymentAmountEl = document.getElementById("downPaymentAmount");
  const interestRateEl = document.getElementById("interestRate");

  function syncInputs(rangeElement, numberElement) {
    rangeElement.addEventListener("input", () => {
      numberElement.value = rangeElement.value;
      calculateLeasing();
    });
    numberElement.addEventListener("input", () => {
      rangeElement.value = numberElement.value;
      calculateLeasing();
    });
  }

  syncInputs(carValueRangeEl, carValueEl);
  syncInputs(downPaymentRangeEl, downPaymentEl);

  function calculateLeasing() {
    const carType = carTypeEl.value;
    const carValue = parseFloat(carValueEl.value);
    const leasePeriod = parseInt(leasePeriodEl.value);
    const downPaymentPercent = parseFloat(downPaymentEl.value);

    if (isNaN(carValue) || isNaN(leasePeriod) || isNaN(downPaymentPercent)) return;

    const interestRate = carType === "brandNew" ? 2.99 : 3.7;
    const downPayment = carValue * (downPaymentPercent / 100);
    const financedAmount = carValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = leasePeriod;

    const monthlyInstallment = (financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalLeasingCost = monthlyInstallment * numberOfPayments + downPayment;

    leasingCostEl.textContent = `€${totalLeasingCost.toFixed(2)}`;
    downPaymentAmountEl.textContent = `€${downPayment.toFixed(2)}`;
    monthlyInstallmentEl.textContent = `€${monthlyInstallment.toFixed(2)}`;
    interestRateEl.textContent = `${interestRate}%`;
  }

  calculateLeasing();
});
