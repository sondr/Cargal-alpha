import '../style.scss';

import { Gallery } from './gallery';
import { Config } from './interfaces';
import { Configure } from './config';

export async function init(config?: Config) {
    let start = new Date().getMilliseconds();
    let conf = await Configure(config);
    console.log("doc rdy - configured", new Date().getMilliseconds() - start);
    start = new Date().getMilliseconds();
    new Gallery(await Configure(config));
    console.log("TimeAfterDocrdy: ", (new Date().getMilliseconds() - start) / 1000);
}