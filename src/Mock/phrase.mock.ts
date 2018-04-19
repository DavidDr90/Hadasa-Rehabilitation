export class Phrase {
    text: string;//the phrase
    categoryID: number;//the associated category
    imagePath: string;//the path to the pharse's image
    audioFile: string;//the path to the phrase's audio file
}

export class Category {
    id = '';//the category ID
    name = '';//category name
    imagePath = '';//the category image
    phares: Phrase[];//array of pharess in a given category
}

export const holidays: Phrase[] = [
    {
        text: "ראש השנה",
        categoryID: 1,
        imagePath: 'assets/imgs/Holidays/rosh.jpg',
        audioFile: 'assets/audio/Holidays/rosh.mp3',
    },
    {
        text: "יום כיפור",
        categoryID: 1,
        imagePath: 'assets/imgs/Holidays/kipor.jpg',
        audioFile: 'assets/audio/Holidays/kipor.mp3 ',
    },
    {
        text: "סוכות",
        categoryID: 1,
        imagePath: 'assets/imgs/Holidays/sokot.png',
        audioFile: '',
    },
    {
        text: "שמחת תורה",
        categoryID: 1,
        imagePath: 'assets/imgs/Holidays/tora.png',
        audioFile: '',
    },
    {
        text: "חנוכה",
        categoryID: 1,
        imagePath: 'assets/imgs/Holidays/hnoka.jpg',
        audioFile: '',
    },
    {
        text: 'ט"ו בשבט',
        categoryID: 1,
        imagePath: 'assets/imgs/Holidays/shvat.jpg',
        audioFile: '',
    },
    {
        text: "פורים",
        categoryID: 1,
        imagePath: 'assets/imgs/Holidays/porim.jpg',
        audioFile: '',
    },
    {
        text: "שבועות",
        categoryID: 1,
        imagePath: 'assets/imgs/Holidays/shavout.jpg',
        audioFile: '',
    },
    {
        text: 'ל"ג בעומר',
        categoryID: 1,
        imagePath: 'assets/imgs/Holidays/omer.jpg',
        audioFile: '',
    },
    {
        text: "תשעה באב",
        categoryID: 1,
        imagePath: 'assets/imgs/Holidays/av.jpg',
        audioFile: '',
    },

];



export const categorys = [
    {
        id: 2,
        name: "בית",
        imagePath: "",
        phrase: ["בוקר טוב", "להתראות", "ברוכים הבאים",]
    },
    {
        id: 1,
        name: "חגים",
        imagePath: "",
        phrase: holidays,
    }
]