const commands = {
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
            '<white>Used libraries:</white>',
            '* <a href="https://terminal.jcubic.pl">[ jQuery Terminal ]</a>',
            '* <a href="https://github.com/patorjk/figlet.js/">[ Figlet.js ]</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat">[ Isomorphic Lolcat ]</a>',
            '* <a href="https://jokeapi.dev/">[ Joke API ]</a>',
            ''
        ].join('\n');
    }
};

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
            '<white>Used libraries:</white>',
            '* <a href="https://terminal.jcubic.pl">[ jQuery Terminal ]</a>',
            '* <a href="https://github.com/patorjk/figlet.js/">[ Figlet.js ]</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat">[ Isomorphic Lolcat ]</a>',
            '* <a href="https://jokeapi.dev/">[ Joke API ]</a>',
            ''
        ].join('\n');;
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