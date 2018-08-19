import { _CLASSNAMES } from './../constants';
import { _PLATFORM } from './../platform';
import { nyGalleryElement } from './utils';

export class MenuBar {
    private readonly container: HTMLElement;
    private readonly nyGalleryElementContainer: nyGalleryElement;

    static create(container: HTMLElement) {
        return new MenuBar(container);
    }

    constructor(container: HTMLElement) {
        this.container = container;
        this.nyGalleryElementContainer = this.create_element(this.container);
    }

    public set_fixed(value: boolean) {
        if (value)
            this.nyGalleryElementContainer.element.classList.add(_CLASSNAMES.fixed);
        else
            this.nyGalleryElementContainer.element.classList.remove(_CLASSNAMES.fixed);
    }

    public dispose() {
        this.nyGalleryElementContainer.dispose();
    }

    private create_element(parent: HTMLElement) {
        return new nyGalleryElement({
            parentElement: parent, classes: _CLASSNAMES.fullscreenMenuBar, children: [
                { classes: _CLASSNAMES.fullscreenMenuBarTitle, textContent: 'Tittel' },
                {
                    classes: _CLASSNAMES.fullscreenMenuBarBtnGroup, children: [
                        // BUTTONS:
                        {
                            classes: `${_CLASSNAMES.fullscreenMenuBarBtn} ${_CLASSNAMES.iconClose}`, eventListeners: [{
                                action: 'click', handler: (event) => { _PLATFORM.overlay.close() }
                            }]
                        }
                    ]
                }
            ]
        });
    }
}