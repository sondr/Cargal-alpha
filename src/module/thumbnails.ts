import { _CLASSNAMES } from './../constants';
import { IGallery } from './../gallery';
import { _PLATFORM } from './../platform';
import { nyGalleryElement } from '../dom/utils';
export class Thumbnails {
    private readonly gallery: IGallery;
    //private readonly container: HTMLDivElement;

    private nyElement: nyGalleryElement;

    constructor(gallery: IGallery) {
        this.gallery = gallery;
        //this.container = container;
        this.nyElement = this.create_thumbnails();
    }

    create_thumbnails() {
        console.log(this.gallery.container);
        return new nyGalleryElement({
            parentElement: this.gallery.container,
            classes: _CLASSNAMES.thumbnailContainer, children: [
                {
                    classes: `${_CLASSNAMES.btnContainer} ${_CLASSNAMES.left}`, children: [
                        { classes: `${_CLASSNAMES.chevron} ${_CLASSNAMES.left}` }
                    ]
                },
                {
                    classes: `${_CLASSNAMES.btnContainer} ${_CLASSNAMES.right}`, children: [
                        { classes: `${_CLASSNAMES.chevron} ${_CLASSNAMES.right}` }
                    ]
                }
            ]
        });
    }

    public dispose() {
        if (this.nyElement) this.nyElement.dispose();
    }
}