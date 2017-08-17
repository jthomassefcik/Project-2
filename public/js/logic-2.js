var calc2 = function () {

    var db = require("../models");

    db.Loan.findAll({}).then(function (data) {

        var max = 800; //edit
        var length = data.length;

        var rates = [];
        var minimumPayments = [];
        var principals = [];
        var minpaymentSum = 0;

        for (var index = 0; index < length; index++) {
            rates.push(Math.pow(1 + ((parseFloat(data[index].interest_rate) / 100) / 360), 30) - 1);
            principals.push(parseFloat(data[index].principal));
            minimumPayments.push(parseFloat(data[index].minimum_Payment));
            minpaymentSum += minimumPayments[index];
            if (minpaymentSum > max) {
                throw console.log("Error: minimum payments exceed alotted monthly amount!");
            }
            if (minimumPayments[index] < rates[index] * principals[index]) {
                throw console.log("Error: minimum payments is less than interest accrued!");
            }
        }

        switch (length) {
            case 2:
                formula2(rates, minimumPayments, principals);
                break;

            case 3:
                formula3(rates, minimumPayments, principals);
                break;

            case 4:
                formula4(rates, minimumPayments, principals);
                break;

            case 5:
                formula5(rates, minimumPayments, principals);
                break;

            default:
                if (length < 2) console.log("Error, you must enter atleast two loans.");
                else console.log("Error: maximum limit exceded. Up to 5 loans can be entered.");
                break;
        }

        function formula2(rates, minimumPayments, principals) {

            var card1 = minimumPayments[0];
            var card2 = minimumPayments[1];
            var result = 0;

            for (; card1 <= max - card2; card1 += .01) {
                for (; card2 <= max - card1; card2 += .01) {
                    var n1 = Math.ceil(((-1) * Math.log(1 - rates[0] * principals[0] / card1)) / Math.log(1 + rates[0]));
                    var n2 = Math.ceil(((-1) * Math.log(1 - rates[1] * principals[1] / card2)) / Math.log(1 + rates[1]));
                    var N = n1 + n2;

                    if (result === 0) {
                        result = {
                            N: N,
                            n1: n1,
                            n2: n2,
                            card1: card1,
                            card2: card2
                        };
                    }
                    else if (N < result.N) {
                        result = {
                            N: N,
                            n1: n1,
                            n2: n2,
                            card1: card1,
                            card2: card2
                        };
                    }
                }
            }
            console.log("Payments Total " + N);
            console.log("Card 1: " + result.n1 + " at " + result.card1 + " Card 2: " + result.n2 + " at " + result.card2);
        }

        function formula3(rates, minimumPayments, principals) {

            var card1 = minimumPayments[0];
            var card2 = minimumPayments[1];
            var card3 = minimumPayments[2];
            var result = 0;

            for (; card1 <= max - card2 - card3; card1 += .25) {
                for (; card2 <= max - card1 - card3; card2 += .25) {
                    for (; card3 <= max - card1 - card2; card3 += .25) {
                        var n1 = Math.ceil(((-1) * Math.log(1 - rates[0] * principals[0] / card1)) / Math.log(1 + rates[0]));
                        var n2 = Math.ceil(((-1) * Math.log(1 - rates[1] * principals[1] / card2)) / Math.log(1 + rates[1]));
                        var n3 = Math.ceil(((-1) * Math.log(1 - rates[2] * principals[2] / card3)) / Math.log(1 + rates[2]));
                        var N = n1 + n2 + n3;

                        if (result === 0) {
                            result = {
                                N: N,
                                n1: n1,
                                n2: n2,
                                n3: n3,
                                card1: card1,
                                card2: card2,
                                card3: card3
                            };
                        }
                        else if (N < result.N) {
                            result = {
                                N: N,
                                n1: n1,
                                n2: n2,
                                n3: n3,
                                card1: card1,
                                card2: card2,
                                card3: card3
                            };
                        }
                    }
                }
            }
            console.log("Payments Total " + N);
            console.log("Card 1: " + result.n1 + " at " + result.card1 + " Card 2: " + result.n2 + " at " +
                result.card2 + " Card 3: " + result.n3 + " at " + result.card3);

        }

        function formula4(rates, minimumPayments, principals) {
            var card1 = minimumPayments[0];
            var card2 = minimumPayments[1];
            var card3 = minimumPayments[2];
            var card4 = minimumPayments[3];
            var result = 0;

            for (; card1 <= max - card2 - card3 - card4; card1 += .5) {
                for (; card2 <= max - card1 - card3 - card4; card2 += .5) {
                    for (; card3 <= max - card1 - card2 - card4; card3 += .5) {
                        for (; card4 <= max - card1 - card2 - card3; card4 += .5) {
                            var n1 = Math.ceil(((-1) * Math.log(1 - rates[0] * principals[0] / card1)) / Math.log(1 + rates[0]));
                            var n2 = Math.ceil(((-1) * Math.log(1 - rates[1] * principals[1] / card2)) / Math.log(1 + rates[1]));
                            var n3 = Math.ceil(((-1) * Math.log(1 - rates[2] * principals[2] / card3)) / Math.log(1 + rates[2]));
                            var n4 = Math.ceil(((-1) * Math.log(1 - rates[3] * principals[3] / card4)) / Math.log(1 + rates[3]));
                            var N = n1 + n2 + n3 + n4;

                            if (result === 0) {
                                result = {
                                    N: N,
                                    n1: n1,
                                    n2: n2,
                                    n3: n3,
                                    n4: n4,
                                    card1: card1,
                                    card2: card2,
                                    card3: card3,
                                    card4: card4
                                };
                            }
                            else if (N < result.N) {
                                result = {
                                    N: N,
                                    n1: n1,
                                    n2: n2,
                                    n3: n3,
                                    n4: n4,
                                    card1: card1,
                                    card2: card2,
                                    card3: card3,
                                    card4: card4
                                };
                            }
                        }
                    }
                }
            }
            console.log("Payments Total " + N);
            console.log("Card 1: " + result.n1 + " at " + result.card1 + " Card 2: " + result.n2 + " at " +
                result.card2 + " Card 3: " + result.n3 + " at " + result.card3 + " Card 4: " + result.n4 + " at " + result.card4);

        }

        function formula5(rates, minimumPayments, principals) {
            var card1 = minimumPayments[0];
            var card2 = minimumPayments[1];
            var card3 = minimumPayments[2];
            var card4 = minimumPayments[3];
            var card5 = minimumPayments[4];
            var result = 0;

            for (card1 = minimumPayments[0]; card1 <= max - minimumPayments[1] - minimumPayments[2] - minimumPayments[3] - minimumPayments[4]; card1 += 1) {
                for (card2 = minimumPayments[1]; card2 <= max - card1 - minimumPayments[2] - minimumPayments[3] - minimumPayments[4]; card2 += 1) {
                    for (card3 = minimumPayments[2]; card3 <= max - card1 - card2 - minimumPayments[3] - minimumPayments[4]; card3 += 1) {
                        for (card4 = minimumPayments[3]; card4 <= max - card1 - card2 - card3 - minimumPayments[4]; card4 += 10) {
                            for (card5 = minimumPayments[4]; card5 <= max - card1 - card2 - card3 - card4; card5 += 10) {
                                var n1 = Math.ceil(((-1) * Math.log(1 - rates[0] * principals[0] / card1)) / Math.log(1 + rates[0]));
                                var n2 = Math.ceil(((-1) * Math.log(1 - rates[1] * principals[1] / card2)) / Math.log(1 + rates[1]));
                                var n3 = Math.ceil(((-1) * Math.log(1 - rates[2] * principals[2] / card3)) / Math.log(1 + rates[2]));
                                var n4 = Math.ceil(((-1) * Math.log(1 - rates[3] * principals[3] / card4)) / Math.log(1 + rates[3]));
                                var n5 = Math.ceil(((-1) * Math.log(1 - rates[4] * principals[4] / card5)) / Math.log(1 + rates[4]));
                                var N = n1 + n2 + n3 + n4 + n5;

                                if (result === 0) {
                                    result = {
                                        N: N,
                                        n1: n1,
                                        n2: n2,
                                        n3: n3,
                                        n4: n4,
                                        n5: n5,
                                        card1: card1,
                                        card2: card2,
                                        card3: card3,
                                        card4: card4,
                                        card5: card5
                                    };
                                }
                                else if (N < result.N) {
                                    result = {
                                        N: N,
                                        n1: n1,
                                        n2: n2,
                                        n3: n3,
                                        n4: n4,
                                        n5: n5,
                                        card1: card1,
                                        card2: card2,
                                        card3: card3,
                                        card4: card4,
                                        card5: card5
                                    };
                                }
                            }
                        }
                    }
                }
            }
            console.log("Payments Total " + N);
            console.log("Card 1: " + result.n1 + " at " + result.card1 + " Card 2: " + result.n2 + " at " +
                result.card2 + " Card 3: " + result.n3 + " at " + result.card3 + " Card 4: " + result.n4 + " at "
                + result.card4 + " Card 5: " + result.n5 + " at " + result.card5);
        }

    });
}