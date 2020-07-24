const moneyFormat = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

function formatMoney(value){
    return moneyFormat.format(value)
}

function formatTime(time) {
    if (time.length === 1) {
        return `0${time}`
    } else {
        return time
    }
}

export {
    formatTime,
    formatMoney
}