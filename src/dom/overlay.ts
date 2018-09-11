import { _PLATFORM } from './../platform';
import { _CLASSNAMES, _HTML, _EVENT_ACTIONS } from '../constants';
import { CgElement } from './utils';

export class Overlay {
    private element: CgElement;
    private initialClasses: string;
    private lastActiveElement?: HTMLElement;

    constructor() {
        this.element = new CgElement({ classes: _CLASSNAMES.overlay });
        this.initialClasses = this.element.Element.className.substr(0);
        console.log("initalClasses: ", this.initialClasses);
        this.append_overlay();
    }

    public get Container() {
        return this.element;
    }

    public show(fullscreenElement: HTMLElement, overlayClass?: string) {
        this.element.Element.className = this.initialClasses + (overlayClass ? ` ${overlayClass}` : '');

        if (this.lastActiveElement)
            this.element.Element!.removeChild(this.lastActiveElement);

        this.element.Element.appendChild(fullscreenElement);
        this.lastActiveElement = fullscreenElement;

        this.element.Element!.classList.add(_CLASSNAMES.active);
        this.prevent_scroll();
    }

    public close() {
        this.element.Element!.classList.remove(_CLASSNAMES.active);
        this.element.Element.style.background = '';
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