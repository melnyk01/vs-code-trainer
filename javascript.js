// {
//     id: ,
//     action: ,
//     shortcut: ,
//     keys: {},
const shortcutList = [
    {
        id: 1,
        action: "Copy current line",
        display: "Ctrl+C",
        keys: {
            ctrl: true,
            key: "c",
        }
    },
    {
        id: 2,
        action: "Paste copied line",
        display: "Ctrl+V",
        keys: {
            ctrl: true,
            key: "v",
        }
    },
    {
        id: 3,
        action: "Select variable",
        display: "Ctrl+D",
        keys: {
            ctrl: true,
            key: "d"
        }
    },
    {
        id: 4,
        action: "Save file",
        display: "Ctrl+S",
        keys: {
            ctrl: true,
            key: "s",
        }
    },
]

let ui =
{
    mainContent: document.querySelector('.main-content'),
    h2: document.querySelector('#shortcut'),
    p: document.querySelector('#shortcut-instruction'),

    displayShortcut(shortcut) {
        this.h2.textContent = `Let's learn shortcut "${shortcut.action}"`
        this.p.textContent = `Press ${shortcut.display}`
    },

    listenToInput(shortcut) {
        let userCombination = {};

        document.addEventListener('keydown', (event) => {
            userCombination.ctrl = event.ctrlKey;
            userCombination.key = event.key;
            if (checkShortcut(shortcut, userCombination)) {
                console.log("Nicely done!")
            }
        }
        )
    },
}

function game() {
    const shortcut = shortcutList[(Math.floor(Math.random() * shortcutList.length))];
    ui.displayShortcut(shortcut);
    ui.listenToInput(shortcut);
}

function checkShortcut(shortcut, userCombination) {
    return (
        shortcut.keys.ctrl === userCombination.ctrl &&
        shortcut.keys.key === userCombination.key
    )
}

game();




