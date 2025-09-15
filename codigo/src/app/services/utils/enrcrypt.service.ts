import { Injectable } from '@angular/core';
import * as  crypto from 'crypto-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EnrcryptService {
  private keySize = 256;
  private ivSize = 128;
  private saltSize = 256;
  private iterations = 1000;
  public password = environment.cryptPassword;

  constructor() { }

  public encriptarTexto(text:string){
    return this.encrypt(text, this.password);
  }

  public desencriptarTexto(text:string){
    return this.decrypt(text, this.password);
  }

  private encrypt(msg:string, pass:string){
    let salt = crypto.lib.WordArray.random(this.saltSize/8);
    let key = crypto.PBKDF2(pass,salt,{
      keySize : this.keySize/32,
      iterations : this.iterations
    });
    let iv = crypto.lib.WordArray.random(this.ivSize/8);

    let encrypted = crypto.AES.encrypt(msg, key, {
      iv: iv,
      padding: crypto.pad.Pkcs7,
      mode: crypto.mode.CBC
    });

    let encryptedHex = this.base64ToHex(encrypted.toString());
    let base64Result = this.hexToBase64(salt.toString() + iv + encryptedHex);

    return base64Result
  }

  private decrypt (transitmessage:any, pass:string) {

    var hexResult = this.base64ToHex(transitmessage)
  
    var salt = crypto.enc.Hex.parse(hexResult.substr(0, 64));
    var iv = crypto.enc.Hex.parse(hexResult.substr(64, 32));
    var encrypted = this.hexToBase64(hexResult.substring(96));
  
    var key = crypto.PBKDF2(pass, salt, {
        keySize: this.keySize/32,
        iterations: this.iterations
      });
  
    var decrypted = crypto.AES.decrypt(encrypted, key, { 
      iv: iv, 
      padding: crypto.pad.Pkcs7,
      mode: crypto.mode.CBC
  
    })
  
    return decrypted.toString(crypto.enc.Utf8); 
  }

  private hexToBase64(str:any){
    return window.btoa(String.fromCharCode.apply(null,
      str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
  }

  private base64ToHex(str:string) {
    for (var i = 0, bin = window.atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
      var tmp = bin.charCodeAt(i).toString(16);
      if (tmp.length === 1) tmp = "0" + tmp;
      hex[hex.length] = tmp;
    }
    return hex.join("");
  }
}
