class Output {
    constructor() {
        this.textSize = "13pt";
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
        this.adjustFontSize(this.textSize);
    }
    
    adjustFontSize(val) {
        this.textSize = val;
        messages.style.fontSize = val;
        fontSizeSelector.value = val;
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
        
        if (typeof fct === 'undefined') console.log("Error! waitTilNext wurde keine Funktion mitgegeben.")

        function wait() {
            if (input.number == oldVal) {
                setTimeout(wait, 50); //wait 50 millisecnds then
                return;
            } else fct();
        }
        wait();
    }
}

var input = new Input();
var messages;
var output = new Output();
var boxUnderMsg;
var fontSizeSelector;
var darkModeButton;
var body;

function scrollDown() {
    boxUnderMsg.scrollIntoView()
}

function changeDarkMode(val) {
    if(val == "🌑") {
        darkModeButton.textContent = "🔆";
        body.style.backgroundColor = "black";
        body.style.color = "white";
    }
    if(val == "🔆") {
        darkModeButton.textContent = "🌑";
        body.style.backgroundColor = "#F3F3F3";
        body.style.color = "black";    
    }
}

window.onload = function() {
    fontSizeSelector = document.querySelector('#fontSizeSelector');
    messages = document.querySelector('#messages');
    darkModeButton = document.querySelector('#darkMode');
    body = document.querySelector('body');
    input.item = document.querySelector('#textbox');
    input.item.addEventListener('keypress', function(e) { if (e.key === "Enter") input.exec(); });
    boxUnderMsg = document.getElementById( 'underMsg' );
    main();
};