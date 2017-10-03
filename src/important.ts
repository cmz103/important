class Important {

    public element: HTMLElement;
    public bgColor: string;
    public showCloseBtn: boolean;
    public value: string;
    public textIndent: string;
    public init: void;

    constructor(
        element: HTMLElement,
        value = "Hello World",
        bgColor = "#FEFB64",
        showCloseBtn = true,
        textIndent = "0") {
        this.element = element;
        this.value = value;
        this.bgColor = bgColor;
        this.showCloseBtn = showCloseBtn;
        this.textIndent = textIndent;
        this.init = this.initialize();
    }

    public initialize = (): void => {

        // prep work
        const elClasslist: CSSStyleDeclaration = window.getComputedStyle(this.element);
        const bodyClasslist: CSSStyleDeclaration = window.getComputedStyle(document.body);
        const doesBgImgExist: boolean = elClasslist.backgroundImage === "none";
        const currentBgImgPos: string | null = bodyClasslist.backgroundPosition;
        const height: number = this.element.offsetHeight;

        // create close btn
        const closeBtn: HTMLElement = document.createElement("span");
        const closeBtnText: Text = document.createTextNode("✖");
        closeBtn.appendChild(closeBtnText);
        closeBtn.classList.add("imp-close");
        closeBtn.id = "impCloseBtn";

        // build/append wrapper
        this.element.id = "impWrapper";
        this.element.classList.add("imp");
        this.element.innerHTML = this.value;
        this.element.style.cssText = "background-color: " + this.bgColor;
        this.element.style.cssText += "text-indent: " + this.textIndent;
        this.element.style.cssText += "min-height: 40px; max-height: 200px; overflow: auto;";

        document.body.appendChild(this.element);
        document.body.insertBefore(this.element, document.body.firstChild);

        // insert close button
        if (this.showCloseBtn) {
            this.element.appendChild(closeBtn);
        }

        // check for background images/apply adjust class
        if (doesBgImgExist) {
            document.body.classList.add("imp-adjust");
        }

        // attach destroy
        closeBtn.addEventListener("click", this.destroy);

        // dynamically create css and append to head
        const styles: string = ".imp { padding: 8px 35px; font: 14px Arial; position: relative; " +
            "-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; }" +
            ".imp a { color: #6A9BC1; text-decoration: underline; }" +
            ".imp a:hover { text-decoration: none; }" +
            ".imp-close { position: absolute; right: 20px; top: 5px; cursor: pointer; }" +
            ".imp-adjust { background-position: center ' + height + 'px !important; }";

        // check if styles exist
        // if not, append styles
        if (!document.getElementById("imp-styles")) {

            const styleTag: HTMLStyleElement = document.createElement("style");
            styleTag.id = "imp-styles";
            styleTag.innerHTML = styles;

            document.head.appendChild(styleTag);
        }
    }

    // remove notification from DOM
    public destroy = (): void => {
        document.body.removeChild(this.element);
        document.body.classList.remove("imp-adjust");
    }

}
