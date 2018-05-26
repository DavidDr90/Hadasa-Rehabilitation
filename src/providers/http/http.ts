import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { API_KEYS } from '../../consts/enums';
import { VOICE_OPTIONS } from '../../consts/enums';
import { LoadingController } from 'ionic-angular';

const TTS_URL = "https://ttsapi.almagu.com/Api/Synth?key=" //the URL header of tts service
const TTS_ATTRIBUTES_URL = "&sampling=16000&encoding=mp3&rate=0&voice=" //the attributes of the audio from the ttl


@Injectable()
export class HttpProvider {

  constructor(private http: HTTP,
    public loadingCtrl: LoadingController) { }


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

    //  validate that the voice and text are not undefined or empty.
    if (voice != VOICE_OPTIONS.SIVAN || voice != VOICE_OPTIONS.GILAD) {
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
    console.log(url);
    //send a GET http request to the url.
    // let result = await this.sendGetRequest(url, {}, {})
    let result = await this.httpGetAsync(url);//call the JS function
    //return the result only when the "sendGetRequest" getting the response from the server
    return result;
  }

  //===================================
  /**JavaScript method for sending GET HTTPrequest.
   * this method sends a GET http request.
   * @param url the url to send the request to
   * @returns on success the audio file received by the TTS server, or -1 on failure
   */
  private async httpGetAsync(url) {
    //DELETE IT!!! ONLY FOR DEBUGGING USING EXAMPLE URL
    url="https://ttsapi.almagu.com/Api/Synth?key=998de9b6ffb24a0a95&sampling=16000&encoding=wav&rate=0&voice=Sivan&text=טקסט%20בדיקה%20בעברית";
    console.log("in private func")
    var context = new AudioContext();//decoding the array buffer into audio file
    var audioBuffer = null; //the buffer for the audio
    var request = new XMLHttpRequest(); //the Get HTTP request object
    request.open('GET', url, true);//writing the request
    request.responseType = 'arraybuffer';//the type of the exepted response from the request

    //display loading dialog until the file recived from the server
    let loading = this.loadingCtrl.create({
      content: "מייצר הקלטה מהשרת, אנא המתן..."
    });
    loading.present();

    //this function will be load on case of response.
    request.onload = function () {
      //decoding the response into audio file
      context.decodeAudioData(request.response, function (buffer) {
        audioBuffer = buffer;
        loading.dismiss();//after the file is recived from the server close the loading dialog
        return audioBuffer;//return the audio file
      }, function () { return -1 }); //in case of error, return -1.
    };

    await request.send();//sending the GET request
  }

}




