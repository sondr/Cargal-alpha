import { nyGalleryElement } from './../dom/utils';
import { _PLATFORM } from './../platform';
import { _CLASSNAMES, _EVENT_ACTIONS } from '../constants';
import { Thumbnails } from './thumbnails';
import { Find_Element } from '../config';
import { IGallery } from '../interfaces';

export class Carousel {
    public readonly gallery: IGallery;
    private thumbnails?: Thumbnails;
    private running: boolean = false;
    private intervalTimer: any;
    private activeIndex?: number;

    //private outerElement: HTMLDivElement;
    private innerElement: HTMLDivElement;


    private buttons: nyGalleryElement[];

    constructor(gallery: IGallery) {
        this.gallery = gallery;
        //this.outerElement = Find_Element(this.gallery.container, `.${_CLASSNAMES.carouselOuter}`) as HTMLDivElement;
        this.innerElement = Find_Element(this.gallery.container, `.${_CLASSNAMES.carouselInner}`) as HTMLDivElement;

        this.buttons = this.appendButtons();


        this.init();

        if (this.gallery.options!.carousel!.thumbnails)
            this.activateThumbnails();
    }

    public get getActiveIndex(): number {
        return this.activeIndex!;
    }

    public activateThumbnails() {
        if (!this.thumbnails) this.thumbnails = new Thumbnails(this);
    }

    private init() {
        if (this.gallery.media.length <= 0) return;

        let innerElementChilds = Array.from(this.innerElement.children) as HTMLDivElement[];
        this.gallery.media.forEach(item => {
            if (!innerElementChilds.includes(item))
                this.innerElement.appendChild(item);
        });

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
                classes: `${_CLASSNAMES.btnContainer} ${_CLASSNAMES.left}`,
                eventListeners: [{ action: _EVENT_ACTIONS.click, handler: e => { this.cycle(-1); if (this.running) this.stop(); } }],
                children: [{ classes: `${_CLASSNAMES.chevron} ${_CLASSNAMES.left}` }]
            }),
            // RIGHT CLICK
            new nyGalleryElement({
                parentElement: this.innerElement,
                classes: `${_CLASSNAMES.btnContainer} ${_CLASSNAMES.right}`,
                eventListeners: [{ action: _EVENT_ACTIONS.click, handler: e => { this.cycle(1); if (this.running) this.stop(); } }],
                children: [{ classes: `${_CLASSNAMES.chevron} ${_CLASSNAMES.right}` }]
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


        if (this.thumbnails)
            this.thumbnails.setActive(index, this.activeIndex);

        this.activeIndex = index;
    }

    public set_interval(interval: number) {
        this.gallery.options!.carousel!.slideInterval = interval;
        this.restart();
    }

    public dispose() {
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