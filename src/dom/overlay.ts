import { MenuBar } from './menu-bar';
import { _PLATFORM } from './../platform';
import { _CLASSNAMES, _HTML, _EVENT_ACTIONS } from '../constants';
import { nyGalleryElement } from './utils';

export class Overlay {
    private element: nyGalleryElement;
    private lastActiveElement?: HTMLElement;

    constructor() {
        this.element = new nyGalleryElement({ classes: _CLASSNAMES.overlay });
        this.append_overlay();
    }

    public get Container(){
        return this.element;
    }

    public show(fullscreenElement: HTMLElement) {
        console.log("fullscreenElement: ", fullscreenElement);
        if (this.lastActiveElement)
            this.element.Element!.removeChild(this.lastActiveElement);

        this.element.Element.appendChild(fullscreenElement);
        this.lastActiveElement = fullscreenElement;

        this.element.Element!.classList.add(_CLASSNAMES.active);
        this.prevent_scroll();
    }

    public close() {
        this.element.Element!.classList.remove(_CLASSNAMES.active);
        this.allow_scroll();
    }

    public remove_fullscreen_element(fullscreenElement: HTMLElement) {
        this.element.Element!.removeChild(fullscreenElement);
    }

    public dispose() {
        this.allow_scroll();
        this.remove_childs();
        this.remove_overlay();
    }

    private remove_childs() {
        while (this.element.Element!.firstChild)
            this.element.Element!.removeChild(this.element.Element!.firstChild!);
    }

    private append_overlay() {
        _PLATFORM.container.appendChild(this.element.Element!);
    }

    private remove_overlay() {
        _PLATFORM.container.removeChild(this.element.Element!);
    }

    private prevent_scroll() {
        _PLATFORM.DOM.body.classList.add(_CLASSNAMES.preventScroll);
        _PLATFORM.global.addEventListener(_EVENT_ACTIONS.touchMove, e => e.preventDefault);
    }

    private allow_scroll() {
        _PLATFORM.DOM.body.classList.remove(_CLASSNAMES.preventScroll);
        _PLATFORM.global.removeEventListener(_EVENT_ACTIONS.touchMove, e => e.preventDefault);
    }

}