const ui =
{
    mainContent: document.querySelector('.main-content'),
    randomShortcutBtn: document.querySelector('#random-shortcut'),
    feedback: document.querySelector('#feedback'),
    shortcut: document.querySelector('#shortcut'),
    p: document.querySelector('#shortcut-instruction'),
    displayShortcut() {
        this.shortcut.textContent = `Let's learn shortcut "${game.currentShortcut.action}"`;
        this.p.textContent = `Press ${game.currentShortcut.display}`;

    },

    eventListeners() {
        document.addEventListener('keydown', (event) => {
            game.userCombination.ctrl = event.ctrlKey;
            game.userCombination.key = event.key;
            game.isMatch = game.checkShortcut();
            if (game.isMatch) {
                event.preventDefault()
                this.feedback.style.color = "green";
            } else this.feedback.style.color = "black"
            this.feedback.textContent = game.feedback()
        }
        );
        this.randomShortcutBtn.addEventListener('click', () => {
            game.generateShortcut();
            this.displayShortcut();
        })
    },

    init() {
        this.displayShortcut();
        this.eventListeners();
    }
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
    userCombination: {},
    isMatch: false,
    generateShortcut() {
        this.currentShortcut = this.shortcutList[(Math.floor(Math.random() * this.shortcutList.length))]
    },

    checkShortcut() {
        return (
            this.currentShortcut.keys.ctrl === this.userCombination.ctrl &&
            this.currentShortcut.keys.key === this.userCombination.key)
    },
    feedback() {
        if (game.isMatch) {
            return "Nicely done!"
        } else return game.userCombination.key + " was pressed";
    }
}

function play() {
    game.generateShortcut();
    ui.init();
}

play();