// import { Injectable } from '@nestjs/common';
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
//
// @Injectable()
// export class ConfigService {
//   private readonly env: string = 'local';
//   private readonly config: { key: string };
//
//   constructor() {
//     if (process.env.NODE_ENV) this.env = process.env.NODE_ENV;
//     this.config = dotenv.parse(
//       fs.readFileSync(`${process.cwd()}/src/environments/${this.env}.env`),
//     );
//   }
//
//   public get(key: string): string {
//     console.log(this.config);
//     return this.config[key];
//   }
// }
