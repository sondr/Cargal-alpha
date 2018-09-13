import { Media, ICgElement } from './../interfaces';
import { _CLASSNAMES, _EVENT_ACTIONS, _TYPES, _HTML } from './../constants';
import { CgElement, convertToMediaObjects, deepObjectAssign } from './../dom/utils';
//import { MenuBar } from './../dom/menu-bar';
import { Carousel } from './carousel';
import { _PLATFORM } from './../platform';
import { IGallery, Options, IMedia } from '../interfaces';

export class Fullscreen {
    private readonly gallery: IGallery;
    private readonly images: IMedia[];
    private readonly carousel: Carousel;
    private readonly menubar: CgElement;
    private element?: CgElement;
    private carouselContainer?: CgElement;
    private options: Options;

    private titleElement?: CgElement;
    private indicator?: CgElement;

    private overlayStyleClass?: string;

    constructor(gallery: IGallery) {
        this.gallery = gallery;

        let opts = JSON.parse(JSON.stringify(this.gallery.options!)) as Options;
        opts.Carousel = deepObjectAssign({}, opts.Fullscreen!.Carousel!);

        this.options = opts;
        this.menubar = this.createMenuBar();
        this.createContainerElements();

        this.images = this.gallery.media.concat(this.gallery.externalMedia).map(media => {
            return <IMedia>{
                element: media.element.cloneNode(true),
                type: media.type,
                title: media.title,
                description: media.description
            };
        });
        
        this.carousel = new Carousel(<IGallery>{
            media: this.images,
            container: this.element!.Element,
            options: opts
        }, this);

        if (this.options.Fullscreen!.background)
            this.overlayStyleClass = _PLATFORM.styleSheet.appendStyle({ values: [['background', this.options.Fullscreen!.background!]] });
        console.log("overlayclass", this.overlayStyleClass, this.options.Fullscreen!.background);
    }

    createContainerElements() {
        this.carouselContainer = new CgElement({ classes: _CLASSNAMES.carousel });
        this.element = new CgElement({ classes: `${_CLASSNAMES.fullscreenContainer} ${this.options.Carousel!.thumbnails ? _CLASSNAMES.thumbsActive : ''}` });
        this.element.appendChild(this.menubar);
        this.element.appendChild(this.carouselContainer);
    }

    show(index: number) {
        this.setMenubarFixed(this.gallery.options!.Fullscreen!.Menubar!.fixed!);
        if (index) this.carousel.set_active(index);

        _PLATFORM.overlay.show(this.element!.Element, this.overlayStyleClass);
    }

    dispose() {
        this.carousel.dispose();
        this.menubar.dispose();
        this.element!.dispose();
    }

    setThumbnailsActiveState(value?: boolean) {
        let thumbnails = this.carousel.Thumbnails!;
        // if(typeof value === _TYPES.boolean)
        thumbnails.toggle();
        if (thumbnails.isActive)
            this.element!.Element.classList.add(_CLASSNAMES.thumbsActive);
        else
            this.element!.Element.classList.remove(_CLASSNAMES.thumbsActive);
    }

    createMenuBar() {
        this.titleElement = new CgElement({
            tagName: _HTML.Tags.p,
            classes: _CLASSNAMES.fullscreenMenuBarTitle, textContent: '',
            styles: this.options.Fullscreen!.color ? { values: [['color', this.options.Fullscreen!.color!]] } : undefined
        });
        this.indicator = new CgElement({
            tagName: _HTML.Tags.div,
            classes: _CLASSNAMES.fullscreenMenuBarIndicator, textContent: '',
            styles: this.options.Fullscreen!.color ? { values: [['color', this.options.Fullscreen!.color!]] } : undefined
        });
        return new CgElement({
            classes: _CLASSNAMES.fullscreenMenuBar, 
            styles: this.options.Fullscreen!.Menubar!.background ? { values:[['background', this.options.Fullscreen!.Menubar!.background!]] } : undefined,
            children: [
                this.indicator,
                this.titleElement,
                {
                    tagName: _HTML.Tags.ul, classes: _CLASSNAMES.fullscreenMenuBarBtnGroup, children: [
                        // BUTTONS:
                        // {
                        //     tagName: _HTML.Tags.li, classes: _CLASSNAMES.fullscreenMenuBarBtn, eventListeners: [{
                        //         action: _EVENT_ACTIONS.click, handler: (event) => { this.setThumbnailsActiveState(); }
                        //     }], children: [{ tagName: _HTML.Tags.i, classes: _CLASSNAMES.iconTiles }]
                        // },
                        {
                            tagName: _HTML.Tags.li, classes: _CLASSNAMES.fullscreenMenuBarBtn, eventListeners: [{
                                action: _EVENT_ACTIONS.click, handler: (event) => { this.setThumbnailsActiveState(); }
                            }], styles: this.options.Fullscreen!.btns!.background ? { values: [['color', this.options.Fullscreen!.btns!.background!]] } : undefined,
                            children: [{
                                tagName: _HTML.Tags.i, classes: _CLASSNAMES.iconThumbnails,
                                styles: this.options.Fullscreen!.color ? {
                                    values: [['border-color', this.options.Fullscreen!.color]]
                                } : undefined
                            }]
                        },
                        {
                            tagName: _HTML.Tags.li, classes: _CLASSNAMES.fullscreenMenuBarBtn, eventListeners: [{
                                action: _EVENT_ACTIONS.click, handler: (event) => { _PLATFORM.overlay.close(); }
                            }], children: [{
                                tagName: _HTML.Tags.i, classes: _CLASSNAMES.iconClose,
                                styles: this.options.Fullscreen!.color ? {
                                    //values: [['background-color', this.options.fullscreen!.color!]],
                                    childValues: [{
                                        id: [':before', ':after'],
                                        values: [['background-color', this.options.Fullscreen!.color!]]
                                    }]
                                } : undefined
                            }]
                        }
                    ]
                }
            ]
        });
    }

    setMenubarFixed(value: boolean) {
        if (value) {

            this.menubar.Element.classList.add(_CLASSNAMES.fixed);
        }
        else {
            this.menubar.Element.classList.remove(_CLASSNAMES.fixed);
        }
    }

    public setMediaInfo(media: IMedia, index: number, length: number) {
        console.log(`${index}/${length}`, media);
        this.indicator!.Element.innerText = `${index} / ${length}`;
        this.titleElement!.Element.innerText = media.title == undefined ? '' : media.title;
    }

}