import '../style.scss';

import { Gallery } from './gallery';
import { Config } from './interfaces';
import { Configure } from './config';

const testConfig: Config = { 
    instances:[{
        container: '#test',
        options:{
            carousel:{
                autoplay: false
            },
            fullscreen: {
                backgroundColor: '#fff'
            }
        }
    }]
 };

export async function init(config?: Config) {
    //new Gallery(await Configure(config));
    new Gallery(await Configure(testConfig));
}