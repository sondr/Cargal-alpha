import { _PLATFORM } from './../platform';

const prependText: string = "cg-dyn";

export class DynamicStyle {
    public counter: number = 1;
    public styleSheet?: HTMLStyleElement;
    public variables: { id: string, value: string }[] = [];
    private attached: boolean = false;

    constructor() {
        this.styleSheet = _PLATFORM.DOM.createElement('style') as HTMLStyleElement;
        this.styleSheet.type = 'text/css';
        this.styleSheet.setAttribute('rel', 'stylesheet');
    }

    public appendStyle(styles: string[][]): string | undefined {
        const name = prependText + this.counter++;
        this.variables.push({
            id: name,
            value: styles.filter(s => s.length === 2).map(s => `${s[0]}:${s[1].replace(';','') + '!important;'}`).join(' ')
        });

        return name;
    }

    public findStyle(classString: string) {

    }

    public buildSheet() {
        let sheetText = this.variables.map(v => `.${v.id}{${v.value}}`).join(' ');
        this.styleSheet!.innerText = sheetText;

        if (!this.attached)
            this.attachStylesheet();
    }


    attachStylesheet() {
        if (_PLATFORM.DOM && _PLATFORM.DOM.head && this.styleSheet)
            _PLATFORM.DOM.head.appendChild(this.styleSheet);
    }

    dispose() {
        if (this.styleSheet)
            _PLATFORM.DOM.head.removeChild(this.styleSheet);
        this.styleSheet = undefined;
    }
}