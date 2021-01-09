const validateIbanNumber = (number) => {
    if (number.length > 34) {
        return { valid: false, message: 'IBAN number is to long' }
    }
    let ibanRegex = new RegExp(
        '^([A-Z]{2}[ -]?[0-9]{2})(?=(?:[ -]?[A-Z0-9]){9,30}$)((?:[ -]?[A-Z0-9]{3,5}){2,7})([ -]?[A-Z0-9]{1,3})?$'
    )
    if (ibanRegex.test(number)) return { valid: true }
    else
        return {
            valid: false,
            message: `This IBAN number ${number} does not match correct format`,
        }
}

const dependsToSEB = (number) => {
    let bankCode = number.slice(4, 9)
    if (bankCode == 70440) {
        if (number.length == 20) return true
        else return false
    }
}
const cardDependency = (bankCode) => {
    switch (bankCode) {
        case 70440:
            return 'SEB'
        case 40100:
            return 'Luminor'
        case 73000:
            return 'Swedbank'
        default:
            return null
    }
}

exports.validateIbanNumber = validateIbanNumber
exports.dependsToSEB = dependsToSEB
exports.cardDependency = cardDependency
