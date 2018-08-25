import { MenuBar } from './menu-bar';
import { _PLATFORM } from './../platform';
import { _CLASSNAMES, _HTML, _EVENT_ACTIONS } from '../constants';
import { createElement  } from './utils';

export class Overlay {
    private fullScreenElements: HTMLElement[] = [];
    private element: HTMLDivElement;
    private fullscreenContainerElement: HTMLElement;
    public menubar: MenuBar;

    private activeFullscreenElementIndex?: number;

    constructor() {
        this.fullscreenContainerElement = _PLATFORM.DOM.createElement(_HTML.Tags.div);
        this.fullscreenContainerElement.className = _CLASSNAMES.fullscreenContainer;

        this.element = createElement(_HTML.Tags.div, _CLASSNAMES.overlay) as HTMLDivElement;
        this.menubar = new MenuBar(this.element);

        this.append_overlay();
    }

    public initiateFullscreen() {
        let element = createElement(_HTML.Tags.div, _CLASSNAMES.carouselOuter);
        element.appendChild(createElement(_HTML.Tags.div, _CLASSNAMES.carouselInner));

        this.fullScreenElements.push(element);

        return element;
    }

    public show(fullscreenContainer: HTMLElement) {
        if (typeof this.activeFullscreenElementIndex === 'number')
            this.fullscreenContainerElement.removeChild(this.fullScreenElements[this.activeFullscreenElementIndex]);

        const index = this.fullScreenElements.findIndex(e => e === fullscreenContainer);

        this.fullscreenContainerElement.appendChild(fullscreenContainer);
        this.activeFullscreenElementIndex = index;

        fullscreenContainer.classList.remove(_CLASSNAMES.hidden);
        this.element.classList.add(_CLASSNAMES.active);
        this.prevent_scroll();
    }

    public close() {
        this.element.classList.remove(_CLASSNAMES.active);
        this.allow_scroll();
    }

    public add_fullscreen_element(fullscreenElement: HTMLElement) {
        this.element.appendChild(fullscreenElement);
    }

    public remove_fullscreen_element(fullscreenElement: HTMLElement) {
        this.element.removeChild(fullscreenElement);
    }

    public destroy() {
        this.menubar.dispose();

        this.remove_childs();
        this.remove_overlay();
    }

    private remove_childs() {
        while (this.element.firstChild)
            this.element.removeChild(this.element.firstChild);
    }

    private append_overlay() {
        this.element.appendChild(this.fullscreenContainerElement);
        _PLATFORM.container.appendChild(this.element);
    }

    private remove_overlay() {
        _PLATFORM.container.removeChild(this.element);
    }

    private prevent_scroll() {
        _PLATFORM.DOM.body.classList.add(_CLASSNAMES.preventScroll);
        _PLATFORM.global.addEventListener(_EVENT_ACTIONS.touchmove, e => e.preventDefault);
    }

    private allow_scroll() {
        _PLATFORM.DOM.body.classList.remove(_CLASSNAMES.preventScroll);
        _PLATFORM.global.removeEventListener(_EVENT_ACTIONS.touchmove, e => e.preventDefault);
    }

}