class Output {
    constructor() {
        this.font = "";
        this.text = "";
    }

    set(n) {
        this.text = n;
        this.updateText();
    }

    add(n) {
        this.text += n;
        this.updateText();
    }

    clear() {
        this.text = "";
        this.updateText();
    }

    newLine(numberOfLines) {
        if (typeof numberOfLines === 'undefined') numberOfLines = 1;
        for (let i = 1; i <= numberOfLines; i++) {
            this.text += "\n";
        }
        this.updateText();
    }

    updateText() {
        messages.textContent = this.text;
        scrollDown();
    }
}

class Input {
    constructor() {
        this.item = document.querySelector('#textbox');
        this.text;
        this.number = 0;
        this.addInputToText = true;
    }

    exec() {
        this.number++;
        this.text = this.item.value;

        if (this.addInputToText) {
            output.newLine(1);
            output.add("	" + this.text);
            output.newLine(1);
            scrollDown();
        }
        this.clear();
        buttonPress();
    }

    clear() {
        this.item.value = "";
    }

    waitTilNext(fct) {
        let oldVal = this.number;
        let self = this;

        function wait() {
            if (input.number == oldVal) {
                setTimeout(wait, 50); //wait 50 millisecnds then
                return;
            } else fct();
        }
        wait();
    }
}

let input = new Input();
let messages;
let output = new Output();
let boxUnderMsg;
let fontSizeSelector = document.querySelector('#fontSizeSelector');

function scrollDown() {
    boxUnderMsg.scrollIntoView()
}

function adjustFontSize(val) {
    messages.style.fontSize = val;
}

window.onload = function() {
    messages = document.querySelector('#messages');
    
    input.item = document.querySelector('#textbox');
    input.item.addEventListener('keypress', function(e) { if (e.key === "Enter") input.exec(); });
    boxUnderMsg = document.getElementById( 'underMsg' );
    main();
};