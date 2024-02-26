import fs from 'fs';
import { args } from './config/plugins/args.plugins';

const message: string = 'Hello World!';

console.log(message);

function multiplicationTable(base: number, limit: number) {
  let data: string = '';
  data += `========================================\n        Multiplication table of ${base}\n========================================\n`;
  for (let i = 1; i <= limit; i++) {
    data += `${base} x ${i} = ${base * i}\n`;
    }
    const outputPath = `outputs/`;

    fs.mkdir(outputPath, { recursive: true }, (err: any) => {
        if (err) throw err;
        });
    fs.writeFile(`${ outputPath }table-${ base }.txt`, data, (err: any) => {
      if (err) throw err;
      console.log(`table-${base}.txt has been saved!`);
    });
}

multiplicationTable(args.base, args.limit);