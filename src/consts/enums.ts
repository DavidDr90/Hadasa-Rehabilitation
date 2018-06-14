import { Color, Nikud } from "../models/SmallClass";

/**
 * Enum class to hold all the API's keys for outside providers
 * to use this enums in any class use the following:
 * import * as Enums from '../../consts/enums';
    ...
    constructor() {
        console.log(Enums.APIURL.GOOGLE_URL_...);
    }
 */


export const enum API_KEYS {
    /** API key for google URL Shorter, can be use in the image and audio urls
        guide how to use this API:
        https://developers.google.com/url-shortener/v1/getting_started
    */
    GOOGLE_URL_SHORTER_API_KEY = "",

    /**
     * To enter the TTS system follow and sign-in in this link:
     * https://ttsapi.almagu.com/Account/Login?ReturnUrl=%2F
     * 
     * To use the service send HTTP GET messages with text and some parameters.
        Usage Example:
        "https://ttsapi.almagu.com/Api/Synth?key=998de9b6ffb24a0a95&sampling=16000&encoding=wav&rate=0&voice=Sivan&text=טקסט%20בדיקה%20בעברית"
        Options:
            Voice: Osnat , Sivan, Sivan-legacy, Gilad-legacy (case insensitive)
            rate: speech rate: from -10 to 10. integers.
            sampling: default – 16000(Hz).
            encoding: WAV, mp3, u-law and a-law.
            text: utf-8, URL encoded.
     */
    TTS_API_KEY = "998de9b6ffb24a0a95", //David's API
    TTS_ofek_API_KEY = "20199999a6ef42b8ba" //ofek's API

}



/**
 * We will use the Hebrew Nikud (ניקוד) in the app
 * To get the right Unicode or ASCII number us the following link:
 * http://www.fileformat.info/info/unicode/char/05b8/index.htm
 * and this pdf file:
 * https://www.unicode.org/charts/PDF/U0590.pdf
 */
export const NIKUD: Nikud[] = [
    {
        "name": "QAMATZ",
        "uniCode": "\u05B8",
        'hebrewName': "קמץ"
    },
    {
        "name": "SHEVA",
        "uniCode": "\u05B0",
        'hebrewName': "שווא"
    },
    {
        "name": "DAGESH",
        "uniCode": "\u05BC",
        'hebrewName': "דגש"
    },
    {
        "name": "PATAH",
        "uniCode": "\u05B7",
        'hebrewName': "פתח"
    },
    {
        "name": "SEGOL",
        "uniCode": "\u05B6",
        'hebrewName': "סגול"
    },
    // { "name": "HATAF_PATAH", "uniCode": "\u05B2", 'hebrewName': "חטף פתח" },
    {
        "name": "SHIN",
        "uniCode": "\u05C1",
        'hebrewName': "ש\u05C1ין"
    },
    {
        "name": "SIN",
        "uniCode": "\u05C2",
        'hebrewName': "ש\u05C2ין"
    },
    {
        "name": "TSERE",
        "uniCode": "\u05B5",
        'hebrewName': "צירי"
    },
    {
        "name": "HOLAM",
        "uniCode": "\u05B9",
        'hebrewName': "חולם"
    },
    {
        "name": "HIRIQ",
        "uniCode": "\u05B4",
        'hebrewName': "חיריק"
    },
    {
        "name": "QUBUTS",
        "uniCode": "\u05BB",
        'hebrewName': "קובוץ"
    }
];

// TODO: add some colors from the client
// please notice! if you add new color to this array make sure to updage the color section in cariables.scss
export const COLOR_LIST: Color[] = [
    /*{
        "hebrewName": "לבן",
        "englishName": "white",
        "hexNumber": "#ffffff"
    },
    {
        "hebrewName": "שחור",
        "englishName": "black",
        "hexNumber": "#000000"
    },
    {
        "hebrewName": "אדום",
        "englishName": "red",
        "hexNumber": "#ff0000"
    },
    {
        "hebrewName": "ירוק",
        "englishName": "green",
        "hexNumber": "#008000"
    },
    {
        "hebrewName": "כחול",
        "englishName": "blue",
        "hexNumber": "#0000ff"
    },
    {
        "hebrewName": "צהוב",
        "englishName": "yellow",
        "hexNumber": "#ffff00"
    },
    {
        "hebrewName": "כתום",
        "englishName": "orange",
        "hexNumber": "#ffa500"
    },*/
    {
        "hebrewName": "לבן",
        "englishName": "white",
        "hexNumber": "#ffffff"
    },
    {
        "hebrewName": "על עצמי",
        "englishName": "aboutMe",
        "hexNumber": "#0080c0"
    },
    {
        "hebrewName": "כוכב",
        "englishName": "star",
        "hexNumber": "#ffce00"
    },
    {
        "hebrewName": "זמן",
        "englishName": "time",
        "hexNumber": "#0080c0"
    },
    {
        "hebrewName": "אירועים",
        "englishName": "events",
        "hexNumber": "#ff15ff"
    },
    {
        "hebrewName": "מקומות",
        "englishName": "places",
        "hexNumber": "#c993ff"
    },
    {
        "hebrewName": "אוכל",
        "englishName": "food",
        "hexNumber": "#e30000"
    },
    {
        "hebrewName": "אנשים",
        "englishName": "people",
        "hexNumber": "#ff8000"
    },
    {
        "hebrewName": "בילויים",
        "englishName": "biluim",
        "hexNumber": "#d20069"
    },
    {
        "hebrewName": "מקומות שאני הולך אליהם",
        "englishName": "placesIGo",
        "hexNumber": "#bf00bf"
    },
    {
        "hebrewName": "בנק",
        "englishName": "bank",
        "hexNumber": "#a4a4a4"
    },
    {
        "hebrewName": "קניות",
        "englishName": "shopping",
        "hexNumber": "#04ffff"
    },
    {
        "hebrewName": "מסעדות ובתי קפה",
        "englishName": "restaurant",
        "hexNumber": "#bf6000"
    },
    {
        "hebrewName": "רפואה",
        "englishName": "doctor",
        "hexNumber": "#6ccfff"
    },
    {
        "hebrewName": "נסיעות",
        "englishName": "travels",
        "hexNumber": "#00ac2c"
    },
    {
        "hebrewName": "אישי",
        "englishName": "personal",
        "hexNumber": "#ff80c0"
    },
    {
        "hebrewName": "רגשות",
        "englishName": "feelings",
        "hexNumber": "#fc1b37"
    },
    {
        "hebrewName": "חלקי גוף",
        "englishName": "body",
        "hexNumber": "#ffbdbd"
    },
    {
        "hebrewName": "חפצים אישיים",
        "englishName": "personalStuff",
        "hexNumber": "#5f00bd"
    },
    {
        "hebrewName": "חגים",
        "englishName": "holidays",
        "hexNumber": "#006200"
    },
    {
        "hebrewName": "חדרים בבית",
        "englishName": "rooms",
        "hexNumber": "#005bb7"
    },
]

//option for the addPhrasePage
export const enum ADD_OPTIONS {
    CATEGORY,
    PHRASE,
    NO_CATEGORY
}

//option for the TTS server
export const enum VOICE_OPTIONS {
    SIVAN = "Sivan",
    GILAD = "Gilad-legacy",
}


//const value for number of favorite categories & phrases
export const NUM_FAVORITES_CAT = 5
export const NUM_FAVORITES_PHRASES = 10

export const SENTENCES = "משפטים";
export const NOUN = "שם עצם";

export const ABOUT_ME_STRING = 'aboutMe';//TODO: before relese need to change to hebrew form

export const DEFUALT_CATEGORY_COLOR: Color = {
    "hebrewName": "לבן",
    "englishName": "white",
    "hexNumber": "#ffffff"
};

