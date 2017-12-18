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

function calculateRRSPFutureTaxPaid(taxRate, futureValue) {
	// tax rate at retirement * future value of deposit
	const taxPaid = taxRate * futureValue;

	return taxPaid;
}

function calculateAfterTaxFutureValue(futureValue, taxPaid) {
	const afterTaxFutureValue = futureValue - taxPaid;

	return afterTaxFutureValue;
}

function getInputValue(data_type) {
	const value = document.querySelectorAll("input[data-type=" + data_type + "]")[0].value
	if (value) {
		return value;
	} else {
		return false;
	}
}

let values = {
	taxRate: Number(getInputValue('taxRate')),
	retirementTaxRate: Number(getInputValue('retirementTaxRate')),
	depositAmount: Number(getInputValue('depositAmount')),
	yearsInvested: Number(getInputValue('yearsInvested')),
	roi: Number(getInputValue('roi')),
	inflationRate: Number(getInputValue('inflationRate'))
}

function calculateAll(investmentType) {
	let deposit;
	if (investmentType == 'rrsp') {
		deposit = calculateRRSPBeforeTaxDeposit(values.depositAmount, values.taxRate);
	} else {
		deposit = values.depositAmount;

	}

	const rateOfReturn = calculateRateOfReturn(values.roi, values.inflationRate);
	const futureValue = calculateFutureValue(deposit, rateOfReturn, values.yearsInvested);

	let taxPaid = 0;
	if (investmentType == 'rrsp') {
		taxPaid = calculateRRSPFutureTaxPaid(values.retirementTaxRate, futureValue);
	}

	const afterTaxFutureValue = calculateAfterTaxFutureValue(futureValue, taxPaid);

	return afterTaxFutureValue;
}

function writeResults() {
	const tfsaResults = calculateAll('tfsa');
	const rrspResults = calculateAll('rrsp');

	document.querySelectorAll('.js-tfsa-result')[0].innerHTML = tfsaResults;
	document.querySelectorAll('.js-rrsp-result')[0].innerHTML = rrspResults;
}
$('.js-input').keyup(function(){
	// Only change the input that has been modified
	const modifiedDataType = this.getAttribute('data-type');
	values[modifiedDataType] = this.value;

	writeResults();
});

writeResults();