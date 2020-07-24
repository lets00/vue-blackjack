const VALUES = ['A', 2, 3, 4, 5, 6, 7, 8, 9, '0', 'J', 'Q', 'K']
const SUIT = ['D', 'H', 'S', 'C']

function generateDeck(numberOfDecks = 1) {
    let decks = []
    for (let x = 0; x < numberOfDecks; x++) {
        const deck = VALUES.reduce((acc, value) => {
            const cards = SUIT.map((suit) => value + suit)
            return [...acc, ...cards]
        }, [])
        decks = [...decks, ...deck]
    }
    return decks
}

function getDefaultValue(card) {
    if (isNaN(card[0])) {
        if (card[0] === 'A') {
            return 11
        }
        return 10
    }
    if(card[0] === '0'){
        return 10
    }
    return +card[0]
}

export {
    generateDeck,
    getDefaultValue
}