import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { API_KEYS } from '../../consts/enums';
import {VOICE_OPTIONS } from '../../consts/enums';
import { Media, MediaObject } from '@ionic-native/media';

const GOOGLE_SHORTER_URL = "https://www.googleapis.com/urlshortener/v1/url?key={AIzaSyDDoX-BYhNnTprzHlTMj9hYwE4qflNHHng}";  //url of google shorter url.
const GOOGLE_API = "AIzaSyDIvgXvW1g3LLVQlCHbza43IKIthfYG4SE"; //let's talk application'w google API
const TTS_URL = "https://ttsapi.almagu.com/Api/Synth?key=" //the URL header of tts service
const TTS_ATTRIBUTES_URL = "&sampling=16000&encoding=mp3&rate=0&voice=" //the attributes of the audio from the ttl


@Injectable()
export class HttpProvider {
  
  constructor(private http: HTTP) { }


  //===================================
  /**this method sends a GET http request.
   * @param url, the url to send the request to
   * @param body, the body of the request
   * @param headers, the headers to set for this request
   * @returns on success the data received by server, or -1 on failure
   */
  private sendGetRequest(url, body, headers) {
    return new Promise((resolve, reject) => {
      this.http.get(url, body, headers)
        .then(data => {
          resolve(data.data);// data received by server
        })
        .catch(error => {
          resolve(-1) //return -1 in case of failure in the request
        })
    });
  }

  //===================================
  /**sent http request to the TTS server and return the audio file
   * @param text the input text from the user
   * @param voice can be choosne from: 'SIVAN' or 'GILAD'
   * @returns on secuss return data.date on failure return error message
   */
  async textToSpeech(text, voice) {
    let api = API_KEYS.TTS_ofek_API_KEY;//the TTS api of the user

     //validate that the voice and text are not undefined or empty.
    if(voice!=VOICE_OPTIONS.SIVAN||voice!=VOICE_OPTIONS.GILAD){
      console.log("ERROR not a valid voice entered")
      return -1;
    }
    if (text == undefined || text == "") {
      console.log("no text has been chose to the TTS request.")
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
    let result = await this.sendGetRequest(url, {}, {})
    //return the result only when the "sendGetRequest" getting the response from the server
    return result;
  }

  //===================================
  /**JavaScript method for sending GET HTTPrequest.
   * this method sends a GET http request.
   * @param url, the url to send the request to
   * @returns on success the audio file received by the TTS server, or -1 on failure
   */
  private async httpGetAsync(url)
  {
    console.log("in private func")
    var context = new AudioContext();//decoding the array buffer into audio file
    var audioBuffer = null; //the buffer for the audio
    var request = new XMLHttpRequest(); //the Get HTTP request object
    request.open('GET', url, true);//writing the request
    request.responseType = 'arraybuffer';//the type of the exepted response from the request
    
    //this function will be load on case of response.
    request.onload = function() {
      //decoding the response into audio file
        context.decodeAudioData(request.response, function(buffer) {
          audioBuffer = buffer;
          return audioBuffer;//return the audio file
        }, function(){return -1}); //in case of error, return -1.
    }; 
    
    await request.send();//sending the GET request
  
  }


}




