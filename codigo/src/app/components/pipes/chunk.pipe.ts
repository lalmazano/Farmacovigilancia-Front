import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(value: any[], chunkSize: number): any[] {
    let resultArray = [];
    for(let i=0; i < value.length; i+=chunkSize){
      resultArray.push(value.slice(i, i+chunkSize));

    }
    return resultArray;
  }

}
