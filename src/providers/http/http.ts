import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { API_KEYS } from '../../consts/enums';

const GOOGLE_SHORTER_URL="https://www.googleapis.com/urlshortener/v1/url?key={AIzaSyDDoX-BYhNnTprzHlTMj9hYwE4qflNHHng}";
const GOOGLE_API="AIzaSyDIvgXvW1g3LLVQlCHbza43IKIthfYG4SE";
const TTS_URL="https://ttsapi.almagu.com/Api/Synth?key="



@Injectable()
export class HttpProvider {
  

  constructor(private http: HTTP) {}

  /* this method sends a POST http request. this function gets:
      url=the url to send the request to
      body=the body of the request
      headers=the headers to set for this request
    and return the data received by server on success, and -1 on failure */
  sendGetRequest(url, body, headers){
      this.http.get(url, body, headers)
      .then(data => {
        console.log("success status="+data.status);
        console.log("success data="+data.data); // data received by server
        console.log("success headers="+data.headers);
        return data.data;
      })
      .catch(error => {
        console.log("error status="+error.status);
        console.log("error="+error.error); // error message as string
        console.log("error headers="+error.headers);
        return -1
      });
  ;}

  /*return shorter url of a long url by sending post http request to Google URL Shortener.
    in case of error, returns -1.*/
  getShorterURL(longUrl){
    var body='{\"longUrl\": \"';
    body+=longUrl+'\"}';
    var headers="Content-Type: application/json";
    console.log("body = " + body);
    console.log("header = " + headers);

    console.log(this.sendGetRequest(GOOGLE_SHORTER_URL, body, headers)) 
  }


  textToSpeech(text, api, voice){
    var re = / /gi; 
    text = text.replace(re, "%20");
    console.log("text="+text)
    let url=TTS_URL;
    url+=api;
    url +="&sampling=16000&encoding=mp3&rate=0&voice=";
    url+=voice;
    url+="&text=";
    url+=text;
    this.sendGetRequest(url,{},{})

  }

}
