import '../style.scss';

import { Gallery } from './gallery';
import { Config } from './interfaces';
import { Configure } from './config';

const testConfig: Config = {
    instances: [{
        container: '#test',
        options: {
            carousel: {
                autoplay: false,
                btns: {
                    color: '#ed1c24'
                }
            },
            fullscreen: {
                backgroundColor: '#fff',
                color: '#000'
            }
        }
    }, {
        container: '#test2',
        options: {
            carousel: {
                autoplay: false
            },
            fullscreen: {
                backgroundColor: '#fff',
                color: '#000'
            }
        }
    }]
};

// export async function init(config?: Config) {
//     return new Gallery(await Configure(config));
// }

export function init(config?: Config) {
    return new Gallery(Configure(config));
}

//export default Gallery;