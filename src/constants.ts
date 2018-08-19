export interface IClassNames {
    active: string;
    hidden: string;
    fixed: string;

    btnContainer: string;


    carouselContainer: string; //'ny-gallery-container'
    carouselOuter: string;
    carouselInner: string;

    thumbnailContainer: string;
    thumbnailItem: string;

    overlay: string;

    fullscreenContainer: string;
    fullscreenGallery: string;

    fullscreenMenuBar: string;
    fullscreenMenuBarTitle: string;
    fullscreenMenuBarBtnGroup: string;
    fullscreenMenuBarBtn: string;

    externalIncludeImage: string;


    preventScroll: string;

    iconClose: string;
    chevron: string;

    left: string;
    right: string;
    up: string;
    down: string;

    [key: string]: string | undefined;
}

function Prepare_Classnames(): IClassNames {
    const classPrepender: string = 'nyg-';


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
        down: 'down'
    };

    const keyExcludePrepend: string[] = [classnames.active, classnames.hidden, classnames.fixed, classnames.chevron, classnames.left, classnames.right, classnames.up, classnames.down];

    Object.keys(classnames!).forEach((key, index) => {
        if (keyExcludePrepend.includes(key)) return;
        classnames![key] = `${classPrepender}${classnames![key]}`;
    });
    console.log("prepared classnames", classnames);
    return classnames;
}

export const _CLASSNAMES: IClassNames = Prepare_Classnames();