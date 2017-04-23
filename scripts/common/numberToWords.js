function numberToWords(number) {

    const digitWords = ['', 'един', 'два', 'три', 'четири', 'пет', 'шест', 'седем', 'осем', 'девет'];
    const teensWords = ['десет', 'единадесет', 'надесет'];
    const hundredWords = ['сто', 'двеста', 'триста', 'стотин'];
    const thousandWords = ['хиляда', 'хиляди'];
    const millionWord = 'милион';
    const billionWord = 'милиард';
    const space = ' ';
    const article = ' и ';
    const plural = 'а ';

    const integerPart = Math.trunc(number);
    const cents = Math.round((number - integerPart) * 100);

    let digitsRemaining = integerPart > 0;

    let result = '';
    let remainder = integerPart;

    if (digitsRemaining) {
        const firstDigit = remainder % 10;      //digits are counted backwards
        remainder = Math.trunc(remainder / 10);
        digitsRemaining = remainder > 0;

        if (!digitsRemaining) {         //after first digit
            result = digitWords[firstDigit];
        }
        else {
            const secondDigit = remainder % 10;
            if (secondDigit === 0) {
                result = digitWords[firstDigit];
            }
            else if (secondDigit === 1) {
                if (firstDigit === 0 || firstDigit === 1) {
                    result = teensWords[secondDigit] + result;
                }
                else {
                    result = digitWords[firstDigit] + teensWords[2];
                }
            }
            else {
                result = digitWords[secondDigit] + teensWords[0] +
                    (firstDigit === 0 ? space : article) +
                    digitWords[firstDigit] +
                    result;
            }

            remainder = Math.trunc(remainder / 10);
            digitsRemaining = remainder > 0;

            if (digitsRemaining) {
                const thirdDigit = remainder % 10;
                if (thirdDigit === 1 || thirdDigit === 2 || thirdDigit === 3) {
                    result = hundredWords[thirdDigit - 1] +
                        (firstDigit === 0 || secondDigit === 1 ? article : space) +
                        result;
                }
                else {
                    result = digitWords[thirdDigit] + hundredWords[3] +
                        (firstDigit === 0  || secondDigit === 1  ? article : space ) +
                        result;
                }
                remainder = Math.trunc(remainder / 10);
                digitsRemaining = remainder > 0;

                if (digitsRemaining) {
                    let nextThreeDigits = remainder % 1000;
                    result = numberToWords(nextThreeDigits) + space +
                        thousandWords[nextThreeDigits ? 1 : 0] + space + result;

                    remainder = Math.trunc(remainder / 1000);
                    digitsRemaining = remainder > 0;
                    if (digitsRemaining) {
                        let nextThreeDigits = remainder % 1000;
                        result = numberToWords(nextThreeDigits) + space +
                            millionWord + (nextThreeDigits ? plural : space) + result;

                        remainder = Math.trunc(remainder / 1000);
                        digitsRemaining = remainder > 0;
                        if (digitsRemaining) {
                            let nextThreeDigits = remainder % 1000;
                            result = numberToWords(nextThreeDigits) + space +
                                billionWord + (nextThreeDigits ? plural : space) + result;

                            remainder = Math.trunc(remainder / 1000);
                            digitsRemaining = remainder > 0;
                            if (digitsRemaining) {
                                throw new Error('Out of range - number too big');
                            }
                        }

                    }
                }

            }
        }
    }
    else {
        result = 'нула';
    }

    return result;
}

//document.getElementById('root').innerHTML = numberToWords(212456419125) + 212456419125;