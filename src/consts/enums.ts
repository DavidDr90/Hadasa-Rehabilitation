/**
 * Enum class to hold all the API's keys for outside providers
 * to use this enums in any class use the following:
 * import * as Enums from '../../consts/enums';
    ...
    constructor() {
        console.log(Enums.APIURL.GOOGLE_URL_...);
    }
 */


<<<<<<< HEAD
export const enum API_KEYS {
=======
export const enum API_KEYS{
>>>>>>> f3fcad9cc261533c786f6b8591d22e2799c61ca3
    /** API key for google URL Shorter, can be use in the image and audio urls
        guide how to use this API:
        https://developers.google.com/url-shortener/v1/getting_started
    */
<<<<<<< HEAD
    // GOOGLE_URL_SHORTER_API_KEY = "AIzaSyDDoX-BYhNnTprzHlTMj9hYwE4qflNHHng", //David's API
    GOOGLE_URL_SHORTER_API_KEY = "AIzaSyA4mcNEnU-m9VPah1N9U7bH9Oki90FTHOE",
    /**
     * To enter the TTS system follow and sgin-in in this link:
=======
    GOOGLE_URL_SHORTER_API_KEY = "AIzaSyDDoX-BYhNnTprzHlTMj9hYwE4qflNHHng",
    
    /**
     * To enter the TTS system follow and sign-in in this link:
>>>>>>> f3fcad9cc261533c786f6b8591d22e2799c61ca3
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
export const NIKUD = [
    { "name": "QAMATZ", "uniCode": "\u05B8" },
    { "name": "SHEVA", "uniCode": "\u05B0" },
    { "name": "DAGESH", "uniCode": "\u05BC" },
    { "name": "PATAH", "uniCode": "\u05B7" },
    { "name": "SEGOL", "uniCode": "\u05B6" },
    { "name": "HATAF_PATAH", "uniCode": "\u05B2" },
    { "name": "SHIN", "uniCode": "\u05C1" },
    { "name": "SIN", "uniCode": "\u05C2" },
    { "name": "TSERE", "uniCode": "\u05B5" },
    { "name": "HOLAM", "uniCode": "\u05B9" },
    { "name": "HIRIQ", "uniCode": "\u05B4" },
    { "name": "QUBUTS", "uniCode": "\u05BB" }
];


/* Enum Defintinon
export const enum NIKUD{
    QAMATZ = "\u05B8",
    SHEVA = "\u05B0",
    DAGESH = "\u05BC",
    PATAH = "\u05B7",
    SEGOL = "\u05B6",
    HATAF_PATAH = "\u05B2",
    SHIN = "\u05C1",
    SIN = "\u05C2",
    TSERE = "\u05B5",
    HOLAM = "\u05B9",
    HIRIQ = "\u05B4",
    QUBUTS = "\u05BB"
}*/
