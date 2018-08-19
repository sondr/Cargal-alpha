import '../style.scss';

import { Gallery } from './gallery';
import { Configure, Config } from './config';

export async function init(config?: Config) {
    let start = new Date().getMilliseconds();
    new Gallery(await Configure(config));
    console.log("Time: ", (new Date().getMilliseconds() - start) / 1000);
}