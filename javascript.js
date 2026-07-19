const ui =
{
    mainContent: document.querySelector('.main-content'),
    generateBtn: (function () {
        button = document.querySelector('#generate');
        button.addEventListener('click', () => {
            game.generateShortcut();
            ui.displayShortcut();
        });

    })(),
    h2: document.querySelector('#shortcut'),
    p: document.querySelector('#shortcut-instruction'),

    displayShortcut() {
        this.h2.textContent = `Let's learn shortcut "${game.currentShortcut.action}"`
        this.p.textContent = `Press ${game.currentShortcut.display}`
    },

    listenToInput() {
        let userCombination = {};

        document.addEventListener('keydown', (event) => {
            userCombination.ctrl = event.ctrlKey;
            userCombination.key = event.key;
            if (game.checkShortcut(game.currentShortcut, userCombination)) {
                console.log("Nicely done!")
            }
        }
        )
    },
}

const game = {
    shortcutList: [
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
    ],
    currentShortcut: '',
    generateShortcut() {
        this.currentShortcut = this.shortcutList[(Math.floor(Math.random() * this.shortcutList.length))]
    },
    checkShortcut(shortcut, userCombination) {
        return (
            shortcut.keys.ctrl === userCombination.ctrl &&
            shortcut.keys.key === userCombination.key
        )
    }
}

function play() {
    game.generateShortcut();
    ui.displayShortcut();
    ui.listenToInput();
}

play();