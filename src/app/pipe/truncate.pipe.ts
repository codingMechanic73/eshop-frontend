import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const limit = args.length > 0 ? parseInt(args[0]) : 20;
    if (value.length > limit) {
      return value.substring(0, limit) + "..."
    } else {
      return value;
    }
  }

}
