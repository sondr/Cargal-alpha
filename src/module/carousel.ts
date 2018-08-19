import { nyGalleryElement, InyGalleryElement } from './../dom/utils';
import { _PLATFORM } from './../platform';
import { IGallery, IMedia } from './../gallery';
import { _CLASSNAMES } from '../constants';
import { Thumbnails } from './thumbnails';
import { Find_Element } from '../config';

export class Carousel {
    private readonly gallery: IGallery;
    private readonly thumbnails: Thumbnails;
    private running: boolean = false;
    private intervalTimer: any;
    private activeIndex?: number;

    //private outerElement: HTMLDivElement;
    private innerElement: HTMLDivElement;


    private buttons: nyGalleryElement[];

    constructor(gallery: IGallery) {
        this.gallery = gallery;
        console.log(this.gallery);
        //this.outerElement = Find_Element(this.gallery.container, `.${_CLASSNAMES.carouselOuter}`) as HTMLDivElement;
        console.log("CarouselOuter: ", this.gallery.container)
        this.innerElement = Find_Element(this.gallery.container, `.${_CLASSNAMES.carouselInner}`) as HTMLDivElement;
        console.log(this.innerElement);
        this.buttons = this.appendButtons();
        this.thumbnails = new Thumbnails(this.gallery);

        this.init();
    }

    private init() {
        if (this.gallery.media.length <= 0) return;

        this.activeIndex = this.gallery.media.findIndex(image => image.classList.contains(_CLASSNAMES.active));
        if (this.activeIndex == -1)
            this.set_active(0);

        if (this.gallery.options!.carousel!.autoplay)
            this.play();
    }

    appendButtons() {
        return [
            // LEFT CLICK
            new nyGalleryElement({
                parentElement: this.innerElement,
                classes: 'btn-container left',
                eventListeners: [{ action: 'click', handler: e => { this.cycle(-1); if (this.running) this.stop(); } }],
                children: [{ classes: 'left chevron' }]
            }),
            // RIGHT CLICK
            new nyGalleryElement({
                parentElement: this.innerElement,
                classes: 'btn-container right',
                eventListeners: [{ action: 'click', handler: e => { this.cycle(1); if (this.running) this.stop(); } }],
                children: [{ classes: 'right chevron' }]
            })];
    }

    public togglePlay() {
        if (this.running) this.stop();
        else this.play();
    }

    public play() {
        if (this.running) return;

        _PLATFORM.global.clearInterval(this.intervalTimer);
        this.intervalTimer = global.setInterval(() => {
            if (!this.gallery.options!.carousel!.autoplay_repeat && this.activeIndex! == this.gallery.media.length - 1)
                _PLATFORM.global.clearInterval(this.intervalTimer);

            this.cycle(1);
        }, this.gallery.options!.carousel!.slideInterval!);

        this.running = true;
    }

    public stop() {
        _PLATFORM.global.clearInterval(this.intervalTimer);
        this.running = false;
    }

    public cycle(count: number) {
        if (this.gallery.media.length <= 0) return;

        count = count % this.gallery.media.length;
        let index = this.activeIndex! + count;
        if (index >= this.gallery.media.length) index -= this.gallery.media.length;
        if (index < 0) index += this.gallery.media.length;

        this.set_active(index);
    }

    public set_active(index: number) {
        if (index >= this.gallery.media.length) return;
        if (this.activeIndex != undefined) this.set_inactive(this.activeIndex);
        this.gallery.media[index].classList.add(_CLASSNAMES.active);
        this.activeIndex = index;
    }

    public set_interval(interval: number) {
        this.gallery.options!.carousel!.slideInterval = interval;
        this.restart();
    }

    public dispose(){
        this.buttons.forEach(btnElement => btnElement.dispose());
    }

    private restart() {
        this.stop();
        this.play();
    }

    private set_inactive(index: number) {
        if (index >= this.gallery.media.length || index < 0) return;
        this.gallery.media[index].classList.remove(_CLASSNAMES.active);
    }

    private set_all_inactive() {
        this.gallery.media.forEach(img => img.classList.remove(_CLASSNAMES.active));
    }
}