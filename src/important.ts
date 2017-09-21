class Important {

    public element: HTMLElement;
    public bgColor: string;
    public showCloseBtn: boolean;
    public value: string;
    public textIndent: string;
    public init: void;

    constructor(element: HTMLElement, value = "Hello World", bgColor = "#FEFB64", showCloseBtn = true, textIndent = "0") {

        this.element = element;
        this.value = value;
        this.bgColor = bgColor;
        this.showCloseBtn = showCloseBtn;
        this.textIndent = textIndent;
        this.init = this.initialize();
    }

    public initialize = (): void => {

        //prep work
        let elClasslist: CSSStyleDeclaration = window.getComputedStyle(this.element);
        let bodyClasslist: CSSStyleDeclaration = window.getComputedStyle(document.body);
        let doesBgImgExist: boolean = elClasslist.backgroundImage === "none";
        let currentBgImgPos: string | null = bodyClasslist.backgroundPosition;
        let height: number = this.element.offsetHeight;

        //create close btn
        let closeBtn: HTMLElement = document.createElement("span");
        let closeBtnText: Text = document.createTextNode("<span class='imp-close'>✖</span>");
        closeBtn.appendChild(closeBtnText);
        closeBtn.id = "impCloseBtn";

        //build/append wrapper
        this.element.classList.add("imp");
        this.element.innerHTML = this.value;
        this.element.style.cssText = "background-color: " + this.bgColor + "; text-indent: " + this.textIndent + "; min-height: 40px; max-height: 40px;";
        document.body.appendChild(this.element);
        document.body.insertBefore(this.element, document.body.firstChild);

        if (this.showCloseBtn) {
            this.element.insertAdjacentHTML('beforeend', closeBtn.outerHTML);
        }

        if (doesBgImgExist) {
            document.body.classList.add("imp-adjust");
        }

        //attach destroy
        closeBtn.addEventListener("click", this.destroy);

        //dynamically create css and append to head
        let styles: string = '.imp { padding: 8px 30px; font: 14px Arial; position: relative; ' +
            '-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; }' +
            '.imp a { color: #6A9BC1; text-decoration: underline; }' +
            '.imp a:hover { text-decoration: none; }' +
            '.imp-close { position: absolute; right: 20px; top: 5px; cursor: pointer; }' +
            '.imp-adjust { background-position: center ' + height + 'px !important; }';

        //check if styles exist
        //if not, append styles
        if (!document.getElementById("imp-styles")) {

            let styleTag: HTMLStyleElement = document.createElement("style");
            styleTag.id = "imp-styles";
            styleTag.innerHTML = styles;

            document.head.appendChild(styleTag);
        }
    }

    public destroy = (): void => {
        document.body.removeChild(this.element);
        document.body.classList.remove("imp-adjust");
    }

}
