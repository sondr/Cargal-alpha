import { IClassNames } from "./interfaces";

function Prepare_Classnames(): IClassNames {
    const classPrepender: string = 'cg-';


    let classnames: IClassNames = {
        active: 'active',
        hidden: 'hidden',
        fixed: 'fixed',

        btnContainer: 'btn-container',

        carouselContainer: 'container',
        carouselOuter: 'carousel-outer',
        carouselInner: 'carousel-inner',

        thumbnailContainer: 'thumb-container',
        thumbnailItem: 'thumb-item',

        overlay: 'overlay',

        fullscreenContainer: 'fs-container',
        fullscreenGallery: 'fs-gallery',
        fullscreenMenuBar: 'fs-menubar',
        fullscreenMenuBarTitle: 'fs-menubar-title',
        fullscreenMenuBarBtnGroup: 'fs-menubar-btn-group',
        fullscreenMenuBarBtn: 'fs-menubar-btn',

        externalIncludeImage: 'external-include',

        preventScroll: 'prevent-scroll',

        iconClose: 'close',
        chevron: 'chevron',

        left: 'left',
        right: 'right',
        up: 'up',
        down: 'down',

        item: 'item'
    };

    const keyExcludePrepend: string[] = [classnames.active, classnames.hidden, classnames.fixed, classnames.chevron, 
        classnames.left, classnames.right, classnames.up, classnames.down, classnames.item];

    Object.keys(classnames!).forEach((key, index) => {
        if (keyExcludePrepend.includes(key)) return;
        classnames![key] = `${classPrepender}${classnames![key]}`;
    });
    console.log("prepared classnames", classnames);
    return classnames;
}

export const _CLASSNAMES: IClassNames = Prepare_Classnames();

export const _HTML = {
    Tags:{
        div: 'div',
        img: 'img'
    },
    Attr:{
        src: 'src',
        srcSet: 'srcset'
    }
};

export const _EVENT_ACTIONS = {
    click: 'click',
    touchmove: 'touchmove',
    DOMContentLoaded: 'DOMContentLoaded'
};