import { Fullscreen } from './fullscreen';
import { CgElement, Find_Element } from './../dom/utils';
import { _PLATFORM } from './../platform';
import { _CLASSNAMES, _EVENT_ACTIONS, _HTML } from './../constants';
import { Thumbnails } from './thumbnails';
import { IGallery, ICgElement, IcGElementStyleObject } from '../interfaces';

interface IStyleDict {
    color: IStyleDictValues;
    hover: IStyleDictValues;
    background: IStyleDictValues;
    backgroundHover: IStyleDictValues;
    [key: string]: IStyleDictValues;
}

interface IStyleDictValues {
    key: string;
    type: string;
    sel?: string;
}

const styleDict: IStyleDict = {
    color: { key: 'color', type: 'color', sel: ':before' },
    hover: { key: 'hover', type: 'color', sel: ':hover>i:before' },
    background: { key: 'background', type: 'background', sel: undefined },
    backgroundHover: { key: 'backgroundHover', type: 'background', sel: ':hover' }
};

export class Carousel {
    public readonly fullScreen: Fullscreen;
    public readonly gallery: IGallery;
    private thumbnails?: Thumbnails;
    private running: boolean = false;
    private intervalTimer: any;
    private activeIndex?: number;
    private element?: CgElement;

    private buttonContainer?: ICgElement;
    private btnsEntries: [string, any][];

    constructor(gallery: IGallery, fullScreen?: Fullscreen) {
        this.fullScreen = fullScreen!;
        this.gallery = gallery;
        this.btnsEntries = Object.entries(this.gallery.options!.Carousel!.btns!).filter(e => e[1]);
        console.log("btnkeys: ", this.btnsEntries);
        this.init();

        if (this.gallery.options!.Carousel!.thumbnails)
            this.activateThumbnails();
    }

    public get Element() {
        return this.element;
    }

    public get Thumbnails() {
        this.activateThumbnails();
        return this.thumbnails;
    }

    public get getActiveIndex(): number {
        return this.activeIndex!;
    }

    private activateThumbnails() {
        if (!this.thumbnails) this.thumbnails = new Thumbnails(this);
    }

    private init() {
        let carouselElement = this.gallery.container.classList.contains(_CLASSNAMES.carousel) ?
            this.gallery.container : Find_Element(this.gallery.container, `.${_CLASSNAMES.carousel}`); // or create one

        let listelement = carouselElement ? Find_Element(carouselElement, _HTML.Tags.ul) : undefined;

        let lastTouchStartEvent: TouchEvent | null;

        let container: ICgElement = {
            element: carouselElement!,
            styles: this.gallery.options!.Carousel!.padding ? { values: [['padding', this.gallery.options!.Carousel!.padding!]] } : undefined,
            children: [
                {
                    element: listelement!, tagName: _HTML.Tags.ul,
                    children: this.gallery.media.map(el => <ICgElement>{
                        element: el.element
                    })
                },
                this.createButtons()
            ],
            eventListeners: [
                {
                    action: _EVENT_ACTIONS.touchStart, handler: event => { lastTouchStartEvent = <TouchEvent>event; }
                },
                {
                    action: _EVENT_ACTIONS.touchEnd, handler: event => {
                        console.log(lastTouchStartEvent!.touches, (<TouchEvent>event).touches)
                        if (lastTouchStartEvent!.touches.length == 1) {
                            const distance = lastTouchStartEvent!.changedTouches[0].pageX - (<TouchEvent>event).changedTouches[0].pageX;
                            if (Math.abs(distance) > 75) this.cycle(distance > 0 ? 1 : -1);
                        }
                        lastTouchStartEvent = null;
                    }
                }
            ]
        };

        if (!this.fullScreen) {
            container.eventListeners = container.eventListeners!.concat([{
                action: _EVENT_ACTIONS.mouseEnter, handler: event => {
                    event.stopPropagation();
                    this.buttonContainer!.element!.classList.remove(_CLASSNAMES.hidden);
                }
            },
            {
                action: _EVENT_ACTIONS.mouseLeave, handler: event => {
                    event.stopPropagation();
                    this.buttonContainer!.element!.classList.add(_CLASSNAMES.hidden);
                }
            }]);
        }

        container = {
            element: this.gallery.container, children: [container]
        };

        this.element = new CgElement(container);

        if (this.gallery.media.length <= 0) return;


        this.activeIndex = this.gallery.media.findIndex(image => image.element.classList.contains(_CLASSNAMES.active));
        //if (this.activeIndex == -1)
        this.set_active(this.activeIndex == -1 ? 0 : this.activeIndex);

        if (this.gallery.options!.Carousel!.autoplay)
            this.play();
    }

    createButtons() {
        let chevronColorStyles = this.MakeStylesObject({ entries: this.btnsEntries, childs: [styleDict.color.key] });
        let btnStyles = this.MakeStylesObject({ entries: this.btnsEntries, container: [styleDict.background.key], childs: [styleDict.backgroundHover.key, styleDict.hover.key] });
        console.log("buttonStyles:", btnStyles);

        this.buttonContainer = {
            //classes: `${_CLASSNAMES.btnContainer} ${_CLASSNAMES.hidden}`,
            classes: `${_CLASSNAMES.btnContainer}`,
            children: [
                // LEFT CLICK
                {
                    classes: `${_CLASSNAMES.btn} ${_CLASSNAMES.left}`,
                    eventListeners: [{ action: _EVENT_ACTIONS.click, handler: e => { this.cycle(-1); } }],
                    styles: btnStyles,
                    children: [{
                        tagName: _HTML.Tags.i, classes: `${_CLASSNAMES.chevron} ${_CLASSNAMES.left}`,
                        styles: chevronColorStyles
                    }]
                },
                // RIGHT CLICK
                {
                    classes: `${_CLASSNAMES.btn} ${_CLASSNAMES.right}`,
                    eventListeners: [{ action: _EVENT_ACTIONS.click, handler: e => { this.cycle(1); } }],
                    styles: btnStyles,
                    children: [{
                        tagName: _HTML.Tags.i, classes: `${_CLASSNAMES.chevron} ${_CLASSNAMES.right}`,
                        styles: chevronColorStyles
                    }]
                }]
        }

        return this.buttonContainer;
    }

    public MakeStylesObject(values: { entries: [string, any][], container?: string[], childs?: string[] }): IcGElementStyleObject | undefined {
        if (!values) return undefined;
        console.log(values.container);
        values.container = values.container || [];
        values.childs = values.childs || [];
        if (values.container.length == 0 && values.childs.length == 0) return undefined;

        //let values = values.entries.filter(e => values)
        const converter = (entry: [string, any]): IcGElementStyleObject => {
            const val = styleDict[entry[0]]; return <IcGElementStyleObject>{
                id: val.sel,
                values: [[val.type, entry[1]]]
            };
        };

        let t = values.entries.filter(e => values.container!.includes(e[0])).map(converter)
            .map(e => e.values);

        return <IcGElementStyleObject>{
            values: values.container && values.container.length > 0 ? values.entries.filter(e => values.container!.includes(e[0])).map(converter)
                .map(e => e.values)[0] : undefined,
            childValues: values.childs && values.childs.length > 0 ? values.entries.filter(e => values.childs!.includes(e[0])).map(converter) : undefined
        };
    }

    public togglePlay() {
        if (this.running) this.stop();
        else this.play();
    }

    public play() {
        if (this.running) return;

        _PLATFORM.global.clearInterval(this.intervalTimer);
        this.intervalTimer = global.setInterval(() => {
            if (!this.gallery.options!.Carousel!.autoplay_repeat && this.activeIndex! == this.gallery.media.length - 1)
                _PLATFORM.global.clearInterval(this.intervalTimer);

            this.cycle(1, true);
        }, this.gallery.options!.Carousel!.slideInterval!);

        this.running = true;
    }

    public stop() {
        _PLATFORM.global.clearInterval(this.intervalTimer);
        this.running = false;
    }

    public cycle(count: number, continuePlay?: boolean) {
        if (this.gallery.media.length <= 0) return;

        count = count % this.gallery.media.length;
        let index = this.activeIndex! + count;
        if (index >= this.gallery.media.length) index -= this.gallery.media.length;
        if (index < 0) index += this.gallery.media.length;

        this.set_active(index, continuePlay);
    }

    public set_active(index: number, continuePlay?: boolean) {
        if (!continuePlay && this.running) this.stop(); // stopping loop

        if (index >= this.gallery.media.length) return;
        if (this.activeIndex != undefined) this.set_inactive(this.activeIndex);
        this.gallery.media[index].element.classList.add(_CLASSNAMES.active);

        if (this.fullScreen)
            this.fullScreen.setMediaInfo(this.gallery.media[index], index + 1, this.gallery.media.length);

        if (this.thumbnails)
            this.thumbnails.setActive(index, this.activeIndex);

        this.activeIndex = index;
    }

    public set_interval(interval: number) {
        this.gallery.options!.Carousel!.slideInterval = interval;
        this.restart();
    }

    public dispose() {
        //this.buttons.forEach(btnElement => btnElement.dispose());
        this.stop();
        if(this.thumbnails)
            this.thumbnails!.dispose();
        if (this.element)
            this.element.dispose();
    }

    private restart() {
        this.stop();
        this.play();
    }

    private set_inactive(index: number) {
        if (index >= this.gallery.media.length || index < 0) return;
        this.gallery.media[index].element.classList.remove(_CLASSNAMES.active);
    }

    private set_all_inactive() {
        this.gallery.media.forEach(img => img.element.classList.remove(_CLASSNAMES.active));
    }
}