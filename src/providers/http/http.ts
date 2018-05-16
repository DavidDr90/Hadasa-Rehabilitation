import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { API_KEYS } from '../../consts/enums';
import { Media, MediaObject } from '@ionic-native/media';

const GOOGLE_SHORTER_URL = "https://www.googleapis.com/urlshortener/v1/url?key={AIzaSyDDoX-BYhNnTprzHlTMj9hYwE4qflNHHng}";  //url of google shorter url.
const GOOGLE_API = "AIzaSyDIvgXvW1g3LLVQlCHbza43IKIthfYG4SE"; //let's talk application'w google API
const TTS_URL = "https://ttsapi.almagu.com/Api/Synth?key=" //the URL header of tts service
const TTS_ATTRIBUTES_URL = "&sampling=16000&encoding=mp3&rate=0&voice=" //the attributes of the audio from the ttl


@Injectable()
export class HttpProvider {


  constructor(private http: HTTP) { }

  /* this method sends a POST http request. this function gets:
      url=the url to send the request to
      body=the body of the request
      headers=the headers to set for this request
    and return the data received by server on success, and -1 on failure */
  private sendGetRequest(url, body, headers) {
    return new Promise((resolve, reject)=>{
      this.http.get(url, body, headers)
      .then(data => {
            resolve(data.data) ;// data received by server
        })
        .catch(error => {
          resolve(-1) //return -1 in case of failure in the request
        })
    });


  }

  /*return shorter url of a long url by sending post http request to Google URL Shortener.
    in case of error, returns -1.*/
  private getShorterURL(longUrl) {
    var body = '{\"longUrl\": \"';
    body += longUrl + '\"}';
    var headers = "Content-Type: application/json";
    console.log("body = " + body);
    console.log("header = " + headers);

    console.log(this.sendGetRequest(GOOGLE_SHORTER_URL, body, headers))
  }


  /**sent http request to the TTS server and return the audio file
   * @param text the input text from the user
   * @param voice can be choosne from: 'SIVAN' or 'GILAD'
   * @returns on secuss return data.date on failure return error message
   */
    async textToSpeech(text, voice){
    //TODO: add validation for the input voice
    let api = API_KEYS.TTS_ofek_API_KEY;

    //validate that the voice and text are not undefined or empty.
    if (voice == undefined || voice == "") {
      console.log("no voice has been chose to TTS request.")
      return -1;
    }
    if (text == undefined || text == "") {
      console.log("no text has been chose to TTS request.")
      return -1;
    }

    //replace space with "%20"
    var re = / /gi;
    text = text.replace(re, "%20");

    //the url address usage: TTS_URL+<user-api>+TTS_ATTRIBUTES_URL+<voice>+<text>
    let url = TTS_URL;
    url += api;
    url += TTS_ATTRIBUTES_URL;
    url += voice;
    url += "&text=";
    url += text;
    
    //send a GET http request to the url.
   let result= await this.sendGetRequest(url, {}, {})
   //return the result only when the "sendGetRequest" getting the response from the server
    return result;
  }
  


}
