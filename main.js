function calculateRRSPBeforeTaxDeposit(deposit, marginalTaxRate) {
    const afterTaxRate = 1 - marginalTaxRate;
    const beforeTaxDeposit = deposit / afterTaxRate;

    return beforeTaxDeposit;
}

function calculateRateOfReturn(nominalRate, inflationRate) {
    const rateOfReturn = ((1 + nominalRate) / (1 + inflationRate)) - 1;

    return rateOfReturn;
}

function calculateFutureValue(deposit, rateOfReturn, periods) {
    const futureValue = deposit * Math.pow(1 + rateOfReturn, periods);

    return futureValue;
}

function calculateRRSPFutureTaxPaid (taxRate, futureValue) {
    // tax rate at retirement * future value of deposit
    const taxPaid = taxRate * futureValue;

    return taxPaid;
}

function calculateAfterTaxFutureValue(futureValue, taxPaid) {
    const afterTaxFutureValue = futureValue - taxPaid;

    return afterTaxFutureValue;
}

const rrspDeposit = calculateRRSPBeforeTaxDeposit(1000, 0.3829);
const rateOfReturn = calculateRateOfReturn(0.065, 0.025);
const rrspFutureValue = calculateFutureValue(rrspDeposit, rateOfReturn, 30);
const taxPaid = calculateRRSPFutureTaxPaid(0.2117, rrspFutureValue);
const afterTaxFutureValue = calculateAfterTaxFutureValue(rrspFutureValue, taxPaid);

console.log(afterTaxFutureValue);