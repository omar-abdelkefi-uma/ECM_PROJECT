import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

    //local
    public static server = 'http://localhost:8080/';

    //server
   //  public static server = 'http://192.168.153.2:49280/';

// range(2,8,2 ) returns [2,4,6,8]  
    static range(from: number, to: number, step: number): number[] {

        return Array.from(Array(~~((to - from) / step) + 1)).map((v, k) => from + k * step);

    }
}
