import { _CLASSNAMES, _EVENT_ACTIONS, _HTML } from './../constants';
import { _PLATFORM } from './../platform';
import { nyGalleryElement } from '../dom/utils';
import { Find_Element } from '../config';
import { Carousel } from './carousel';
import { InyGalleryElement } from '../interfaces';

export class Thumbnails {
    private carousel: Carousel;

    private model: nyGalleryElement;
    private thumbnailList?: nyGalleryElement;

    constructor(carousel: Carousel) {
        this.carousel = carousel;
        this.model = this.init();
    }

    public show() {
        this.model.element.classList.add(_CLASSNAMES.active);
    }

    public hide() {
        this.model.element.classList.remove(_CLASSNAMES.active);
    }

    public toggle() {
        this.model.element.classList.toggle(_CLASSNAMES.active);
    }

    init() {
        return new nyGalleryElement({
            parentElement: this.carousel.gallery.container,
            classes: `${_CLASSNAMES.thumbnailContainer} ${this.carousel.gallery.options!.carousel!.thumbnails ? _CLASSNAMES.active : ''}`, children: [
                {
                    classes: `${_CLASSNAMES.btnContainer} ${_CLASSNAMES.left}`, children: [
                        { classes: `${_CLASSNAMES.chevron} ${_CLASSNAMES.left}` }
                    ]
                },
                this.create_thumbnails(),
                {
                    classes: `${_CLASSNAMES.btnContainer} ${_CLASSNAMES.right}`, children: [
                        { classes: `${_CLASSNAMES.chevron} ${_CLASSNAMES.right}` }
                    ]
                }
            ]
        });
    }

    setActive(index: number, lastActiveIndex?: number) {
        if (typeof lastActiveIndex === 'number')
            this.thumbnailList!.children![lastActiveIndex].element.classList.remove(_CLASSNAMES.active);
        if (typeof index === 'number')
            this.thumbnailList!.children![index].element.classList.add(_CLASSNAMES.active);
    }

    create_thumbnails(): nyGalleryElement {
        let thumbnailList: InyGalleryElement = { tagName: 'ul', children: [] };

        this.carousel.gallery.media.forEach((item, index) => {
            let imgEl = Find_Element(item, _HTML.Tags.img) as HTMLImageElement;
            if (!imgEl) return;

            thumbnailList.children!.push({
                tagName: 'li',
                classes: _CLASSNAMES.item, children: [{
                    tagName: _HTML.Tags.img, attr: [
                        [_HTML.Attr.src, imgEl.src],
                        [_HTML.Attr.srcSet, imgEl.srcset]
                    ],
                    eventListeners: [{ action: _EVENT_ACTIONS.click, handler: e => { this.carousel.set_active(index); } }]
                }]
            });
        });
        
        this.thumbnailList = new nyGalleryElement(thumbnailList);
        return this.thumbnailList;
    }

    public dispose() {
        if (this.model) this.model.dispose();
    }
}