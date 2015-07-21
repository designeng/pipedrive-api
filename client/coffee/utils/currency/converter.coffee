# thanks https://github.com/bengourley/currency-symbol-map
define ->
    map = { "ALL": "L"
    , "AFN": "؋"
    , "ARS": "$"
    , "AWG": "ƒ"
    , "AUD": "$"
    , "AZN": "₼"
    , "BSD": "$"
    , "BBD": "$"
    , "BYR": "p."
    , "BZD": "BZ$"
    , "BMD": "$"
    , "BOB": "Bs."
    , "BAM": "KM"
    , "BWP": "P"
    , "BGN": "лв"
    , "BRL": "R$"
    , "BND": "$"
    , "KHR": "៛"
    , "CAD": "$"
    , "KYD": "$"
    , "CLP": "$"
    , "CNY": "¥"
    , "COP": "$"
    , "CRC": "₡"
    , "HRK": "kn"
    , "CUP": "₱"
    , "CZK": "Kč"
    , "DKK": "kr"
    , "DOP": "RD$"
    , "XCD": "$"
    , "EGP": "£"
    , "SVC": "$"
    , "EEK": "kr"
    , "EUR": "€"
    , "FKP": "£"
    , "FJD": "$"
    , "GHC": "¢"
    , "GIP": "£"
    , "GTQ": "Q"
    , "GGP": "£"
    , "GYD": "$"
    , "HNL": "L"
    , "HKD": "$"
    , "HUF": "Ft"
    , "ISK": "kr"
    , "INR": "₹"
    , "IDR": "Rp"
    , "IRR": "﷼"
    , "IMP": "£"
    , "ILS": "₪"
    , "JMD": "J$"
    , "JPY": "¥"
    , "JEP": "£"
    , "KES": "KSh"
    , "KZT": "лв"
    , "KPW": "₩"
    , "KRW": "₩"
    , "KGS": "лв"
    , "LAK": "₭"
    , "LVL": "Ls"
    , "LBP": "£"
    , "LRD": "$"
    , "LTL": "Lt"
    , "MKD": "ден"
    , "MYR": "RM"
    , "MUR": "₨"
    , "MXN": "$"
    , "MNT": "₮"
    , "MZN": "MT"
    , "NAD": "$"
    , "NPR": "₨"
    , "ANG": "ƒ"
    , "NZD": "$"
    , "NIO": "C$"
    , "NGN": "₦"
    , "NOK": "kr"
    , "OMR": "﷼"
    , "PKR": "₨"
    , "PAB": "B/."
    , "PYG": "Gs"
    , "PEN": "S/."
    , "PHP": "₱"
    , "PLN": "zł"
    , "QAR": "﷼"
    , "RON": "lei"
    , "RUB": "₽"
    , "SHP": "£"
    , "SAR": "﷼"
    , "RSD": "Дин."
    , "SCR": "₨"
    , "SGD": "$"
    , "SBD": "$"
    , "SOS": "S"
    , "ZAR": "R"
    , "LKR": "₨"
    , "SEK": "kr"
    , "CHF": "Fr."
    , "SRD": "$"
    , "SYP": "£"
    , "TZS": "TSh"
    , "TWD": "NT$"
    , "THB": "฿"
    , "TTD": "TT$"
    , "TRY": ""
    , "TRL": "₤"
    , "TVD": "$"
    , "UGX": "USh"
    , "UAH": "₴"
    , "GBP": "£"
    , "USD": "$"
    , "UYU": "$U"
    , "UZS": "лв"
    , "VEF": "Bs"
    , "VND": "₫"
    , "YER": "﷼"
    , "ZWD": "Z$"
    }

    getSign = (currencyCode) ->
        if map.hasOwnProperty(currencyCode)
            map[currencyCode]
        else
            currencyCode

    convertCurrency = (formattedValue) ->
        value   = formattedValue.replace(/[A-Z]/g,'')
        sign    = getSign formattedValue.replace(/[0-9,.]/g,'')
        return "#{value} #{sign}"