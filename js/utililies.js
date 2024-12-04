export function cardMapper(card) {
    let filename = '';

    const suites = [
        { suit: "diamonds", abbr: "D" },
        { suit: "spades", abbr: "S" },
        { suit: "clubs", abbr: "C" },
        { suit: "hearts", abbr: "H" },
    ];

    const cards = [
        { card: "Ace", number: "1" },
        { card: "Jack", number: "11" },
        { card: "Queen", number: "12" },
        { card: "King", number: "13" },
    ];

    const suitMatch = suites.find(s => s.suit === card.suit);
    if (suitMatch) filename += suitMatch.abbr;

    const cardMatch = cards.find(c => c.card === card.card);
    if (cardMatch) {
        filename += cardMatch.number;
    } else {
        filename += card.card;
    }

    return filename;
}