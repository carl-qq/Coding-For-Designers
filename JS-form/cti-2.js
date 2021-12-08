let blank;

window.onload = function() {
    blank = document.getElementById("blank-class-card");
    main();
}

function getAllMethodNames(obj) {
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
        let keys = Reflect.ownKeys(obj)
        keys.forEach((k) => methods.add(k));
    }
    return methods;
}

function drawObjects(arr) {

    function getAllEntries(obj) {
        let string = "";
        let entries = Object.entries(obj);

        string += "# Eigenschaften:" + "\n";
        for (i = 0; i < entries.length; i++) {
            string += entries[i][0] + ": " + entries[i][1] + "\n";
        }

        let functions = Array.from(getAllMethodNames(obj));

        string += "\n" + "# Methoden:" + "\n";
        for (i = 1; i <= functions.length - 12; i++) {
            string += functions[i] + "\n";
        }

        return string;
    }
    for (let clones = 0; clones < arr.length; clones++) {
        let obj = arr[clones];

        let blankClone = blank.cloneNode(true);
        document.getElementById("messages").appendChild(blankClone);
        blankClone.id = "card" + clones;

        let elmnts = document.getElementById("card" + clones).querySelectorAll(".changeable");

        let pic = elmnts[0];
        let name = elmnts[1];
        let txt = elmnts[2];

        pic.src = obj.bild;
        name.textContent = (clones + " " + obj.modell);
        txt.textContent = getAllEntries(obj);
    }
}