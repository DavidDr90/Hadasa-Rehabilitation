export class Phrase {
    text: string;//the phrase
    category: Category;//the associated category
    imagePath: string;//the path to the pharse's image
    audioFile: string;//the path to the phrase's audio file
}

export class Category{
    name = '';//category name
    imagePath = '';//the category image
    phares: Phrase[];//array of pharess in a given category
}

export const phrases: Phrase[] = [
    {
    text: "שלום",
    category: {name: "", imagePath: "", phares: null},
    imagePath: '',
    audioFile: '',
    }
];  

phrases

export const categorys = [
    {
        name: "בית",
        imagePath: "",
        phrase: ["בוקר טוב", "להתראות", "ברוכים הבאים",]
    }
]