const commands = {
    help() {
        term.echo(`List of available commands: ${help}`);
    },
    echo(a){
        this.echo(a);
    },
    restart(){
        this.clear();
        ready();
    },
    credits() {
        return [
            '',
            '<white>Libraries Used:</white>',
            '* [ <a href="https://terminal.jcubic.pl" style="text-decoration:none">jQuery Terminal</a> ]',
            '* [ <a href="https://github.com/patorjk/figlet.js/" style="text-decoration:none">Figlet.js</a> ]',
            '* [ <a href="https://github.com/jcubic/isomorphic-lolcat" style="text-decoration:none">Isomorphic Lolcat</a> ]',
            ''
        ].join('\n');
    }
};

const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
});

const command_list = Object.keys(commands);
const help = formatter.format(command_list);

const fonts = ['Slant', 'Star Wars', 'ANSI Shadow', 'Standard', 'Rounded', 'Roman', 'Red Phoenix',
    'Puffy', 'Modular', 'Merlin1', 'Larry 3D 2', 'Georgia11', 'Fraktur', 'DOS Rebel', 'Def Leppard', 'Cosmike']
const fselector = Math.floor(Math.random() * fonts.length);
const font = fonts[fselector];

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);

const term = $('body').terminal(commands, {
    greetings: false
});

term.pause();

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}

function ready() {
    const seed = Math.floor(Math.random() * 257);
    term.echo(() => {
        const ascii = rainbow(render('Termilite'), seed);
        return [
            `${ascii}`,
            '',
            'Welcome to the free and open source web terminal - <white>Termilite</white>',
            '<white>Termilite</white> is built using lightweight and secure JavaScript libraries,\nfocusing on responsiveness and speed.',
            'Use <yellow>help</yellow> to check the available list of commands.',
            '',
            '<red>May not work as intended on mobile devices as of yet.</red>',
            '',
            commands.credits(),
            ''
        ].join('\n');
      }, {ansi: true}).resume();
}

function render(text) {
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    }));
}

function trim(str) {
    return str.replace(/[\n\s]+$/, '');
}