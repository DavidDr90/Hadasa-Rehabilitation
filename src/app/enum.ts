/**
 * Enum class to hold all the API's keys for outside providers
 * to use this enums in any class use the following:
 * import * as Enums from './somedirectory/enums/enums';
    ...
    constructor() {
        console.log(Enums.APIURL.GOOGLE_URL_...);
    }
 */


export enum APIURL{
    /** API key for google URL Shorter, can be use in the image and audio urls
        guide how to use this API:
        https://developers.google.com/url-shortener/v1/getting_started
    */
    GOOGLE_URL_SHORTER_API_KEY = "AIzaSyDDoX-BYhNnTprzHlTMj9hYwE4qflNHHng"
}
