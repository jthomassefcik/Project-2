var calc1 = function () {

    var db = require("../models");

    db.Loan.findAll({}).then(function (data) {
        var length = data.length;

        var snowBallArray = [];
        for (var i = 0; i < length; i++) {
            snowBallArray.push(data[i]);
        }

        var avalancheArray = [];
        for (var i = 0; i < length; i++) {
            avalancheArray.push(data[i]);
        }

        for (var count = 0; count < length; count++) {
            for (var i = 0; i < length - 1; i++) {
                if (parseFloat(snowBallArray[i].principal) > parseFloat(snowBallArray[i + 1].principal)) {
                    var placeholder = snowBallArray[i];
                    snowBallArray[i] = snowBallArray[i + 1];
                    snowBallArray[i + 1] = placeholder;
                }
            }
        }

        for (var count = 0; count < length; count++) {
            for (var i = 0; i < length - 1; i++) {
                if (parseFloat(avalancheArray[i].interest_rate) < parseFloat(avalancheArray[i + 1].interest_rate)) {
                    var placeholder = avalancheArray[i];
                    avalancheArray[i] = avalancheArray[i + 1];
                    avalancheArray[i + 1] = placeholder;
                }
            }
        }
        var snowBallResult = test(snowBallArray);
        var avalancheResult = test(avalancheArray);
        console.log(snowBallResult, avalancheResult);
    });
}

function test(cards) {

    var rates = [];
    var minimumPayments = [];
    var principals = [];
    var minpaymentSum = 0;
    var length = cards.length;
    var max = 1100; //edit
    var N = 0;

    for (var index = 0; index < length; index++) {
        rates.push(Math.pow(1 + ((parseFloat(cards[index].interest_rate) / 100) / 360), 30) - 1);
        principals.push(parseFloat(cards[index].principal));
        minimumPayments.push(parseFloat(cards[index].minimum_Payment));
        minpaymentSum += minimumPayments[index];
        if (minpaymentSum > max) {
            throw console.log("Error: minimum payments exceed alotted monthly amount!");
        }
        if (minimumPayments[index] < rates[index] * principals[index]) {
            throw console.log("Error: minimum payments is less than interest accrued!");
        }
    }

    for (var i = 0; i < length; i++) {
        if (i < length - 1) {
            var minPaymentSum = 0;
            for (var minIndex = i + 1; minIndex < length; minIndex++) {
                minPaymentSum += minimumPayments[minIndex];
            }
            var payment = max - minPaymentSum;
            var n = ((-1) * Math.log(1 - rates[i] * principals[i] / payment)) / Math.log(1 + rates[i]);
            N += n;
            for (var balanceIndex = i + 1; balanceIndex < length; balanceIndex++) {
                principals[balanceIndex] = principals[balanceIndex] * Math.pow(1 + rates[balanceIndex], n) -
                    (minimumPayments[balanceIndex] / rates[balanceIndex]) * (Math.pow(1 + rates[balanceIndex], n) - 1);
            }
        } else {
            var n = ((-1) * Math.log(1 - rates[i] * principals[i] / max)) / Math.log(1 + rates[i]);
            N += n;
        }
    }
    return N;
}

/*var data = [{
    interest_rate: 22.5,
    principal: 6000,
    minimum_Payment: 150
},{
    interest_rate: 21.5,
    principal: 4000,
    minimum_Payment: 150
}, {
    interest_rate: 4.18,
    principal: 24000,
    minimum_Payment: 200
}, {
    interest_rate: 8.18,
    principal: 10000,
    minimum_Payment: 150
}, {
    interest_rate: 11.9,
    principal: 12000,
    minimum_Payment: 150
}]*/