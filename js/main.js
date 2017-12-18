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
	const value = document.querySelectorAll('input[data-type=' + data_type + ']')[0].value;
	if (value) {
		return value;
	} else {
		return false;
	}
}

function formatNumberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

let values = {
	// values from input
	taxRate: Number(getInputValue('taxRate')),
	retirementTaxRate: Number(getInputValue('retirementTaxRate')),
	depositAmount: Number(getInputValue('depositAmount')),
	yearsInvested: Number(getInputValue('yearsInvested')),
	roi: Number(getInputValue('roi')),
	inflationRate: Number(getInputValue('inflationRate')),
	// calculated values
	get rrspDeposit() {
		return calculateRRSPBeforeTaxDeposit(this.depositAmount, this.taxRate);
	},
	get rateOfReturn() {
		return calculateRateOfReturn(this.roi, this.inflationRate);
	},
	get tfsaFutureValue() {
		return calculateFutureValue(this.depositAmount, this.rateOfReturn, this.yearsInvested);
	},
	get rrspFutureValue() {
		return calculateFutureValue(this.rrspDeposit, this.rateOfReturn, values.yearsInvested);
	},
	tfsaTaxPaid: 0,
	get rrspTaxPaid() {
		return calculateRRSPFutureTaxPaid(this.retirementTaxRate, this.rrspFutureValue);
	},
	get tfsaAfterTaxFV() {
		return calculateAfterTaxFutureValue(this.tfsaFutureValue, this.tfsaTaxPaid);
	},
	get rrspAfterTaxFV() {
		return calculateAfterTaxFutureValue(this.rrspFutureValue, this.rrspTaxPaid);
	}
};

function writeToElement(element, innerHTML) {
	const nodeList = document.querySelectorAll(element);
	for (let element of nodeList) {
		element.innerHTML = innerHTML;
	}
}

function writeResults() {
	writeToElement('.js-tfsa-deposit', '$' + formatNumberWithCommas(values.depositAmount));
	writeToElement('.js-rrsp-deposit', '$' + formatNumberWithCommas(values.rrspDeposit.toFixed(2)));
	writeToElement('.js-tfsa-fv', '$' + formatNumberWithCommas(values.tfsaFutureValue.toFixed(2)));
	writeToElement('.js-rrsp-fv', '$' + formatNumberWithCommas(values.rrspFutureValue.toFixed(2)));
	writeToElement('.js-rrsp-tax-paid', '- $' + formatNumberWithCommas(values.rrspTaxPaid.toFixed(2)));

	writeToElement('.js-tfsa-after-tax-fv', '$' + formatNumberWithCommas(values.tfsaAfterTaxFV.toFixed(2)));
	writeToElement('.js-rrsp-after-tax-fv', '$' + formatNumberWithCommas(values.rrspAfterTaxFV.toFixed(2)));

	writeToElement('.js-tfsa-result', '$' + formatNumberWithCommas(values.tfsaAfterTaxFV.toFixed(2)));
	writeToElement('.js-rrsp-result', '$' + formatNumberWithCommas(values.rrspAfterTaxFV.toFixed(2)));
	writeToElement('.js-investment-period', formatNumberWithCommas(values.yearsInvested));

}

$('.js-input').keyup(function(){
	// Only change the input that has been modified
	const modifiedDataType = this.getAttribute('data-type');
	values[modifiedDataType] = Number(this.value);

	writeResults();
});

writeResults();