import { Options } from './../config';
import { Carousel } from './carousel';
import { _PLATFORM } from './../platform';
import { IGallery } from "../gallery";

export class Fullscreen {
    private readonly containerElement: HTMLElement;
    private readonly gallery: IGallery;
    private readonly images: HTMLDivElement[];
    private readonly carousel: Carousel;

    constructor(gallery: IGallery) {
        this.gallery = gallery;

        this.images = this.gallery.media.concat(this.gallery.externalMedia).map(node => node.cloneNode(true) as HTMLDivElement);
        this.containerElement = _PLATFORM.overlay.initiateFullscreen();

        this.images.forEach(img => this.containerElement.appendChild(img))

        let opts = JSON.parse(JSON.stringify(this.gallery.options!)) as Options;
        opts.carousel = opts.fullscreen;
        // opts.carousel!.Events = {};
        // opts.fullscreen!.Events = {};
        this.carousel = new Carousel(<IGallery>{
            media: this.images,
            container: this.containerElement,
            options: opts
        });

    }

    show(index: number){
        _PLATFORM.overlay.menubar.set_fixed(this.gallery.options!.fullscreen!.menuBarFixed!);
        if(index) this.carousel.set_active(index);
        //if(this.carousel.)
        _PLATFORM.overlay.show(this.containerElement);
    }

}