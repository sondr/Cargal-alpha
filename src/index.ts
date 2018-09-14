import '../style.scss';

import { CarGal } from './car-gal';
import { Config } from './interfaces';
import { Configure } from './config';

const testConfig: Config = {
    instances: [{
        container: '#test',
        options: {
            Carousel: {
                autoplay: false,
                btns: {
                    //color: '#ed1c24',
                    hover: '#ed1c24',
                    background: '#ed1c24',
                    backgroundHover: '#fff'
                }
            },
            Fullscreen: {
                background: '#eee',
                color: '#000',
                Menubar:{
                    background: 'rgba(255,255,255,0.5)'
                },
                Carousel: {
                    btns: {
                        color: '#ed1c24',
                        hover: '#fff',
                        background: '#fff',
                        backgroundHover: '#ed1c24'
                    }
                }
            }
        }
    }, {
        container: '#test2',
        options: {
            Carousel: {
                autoplay: false
            },
            Fullscreen: {
                background: '#fff',
                //color: '#000'
            }
        }
    }]
};

// export async function init(config?: Config) {
//     return new Gallery(await Configure(config));
// }

export function init(config?: Config) {
    return new CarGal(Configure(config));
}

//export default Gallery;