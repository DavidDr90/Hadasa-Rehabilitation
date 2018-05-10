import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { API_KEYS } from '../../consts/enums';

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
    this.http.get(url, body, headers)
      .then(data => {
        return data.data;// data received by server
      })
      .catch(error => {
        return -1
      });
    ;
  }

  /*return shorter url of a long url by sending post http request to Google URL Shortener.
    in case of error, returns -1.*/
  getShorterURL(longUrl) {
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
   * @returns on secuss return data.date on failure return -1
   */
  textToSpeech(text, voice): any {
    //TODO: add validation for the input voice
    let api = API_KEYS.TTS_ofek_API_KEY;
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
    let data =  this.sendGetRequest(url, {}, {})
    return data;
  }


    

}
