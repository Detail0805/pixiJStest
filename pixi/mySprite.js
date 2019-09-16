function how() {

    console.log("   142536145646556")

}

// var width = 1000,
//     height = 800;
// //Create a Pixi Application
// let app = new PIXI.Application({
//     width: width,
//     height: height,
//     antialiasing: true,
//     transparent: false,
//     resolution: 1,
//     backgroundColor: 0x1099bb,
// });


// //Add the canvas that Pixi automatically created for you to the HTML document
// document.body.appendChild(app.view);

// //load an image and run the `setup` function when it's done
// PIXI.loader
//     .add("images/seven.png")
//     .load(setup);

// // Seven.prototype = Object.create(PIXI.Sprite.prototype); // 讓mycat.prototype繼承PIXI.Sprite.prototype
// // Seven.prototype.constructor = Seven;

// var seven = {
//         width,
//         height,
//         name,
//         sprite: '',
//         makeSeven: function(width, height, name, sprite) {
//             // PIXI.Sprite.call(this);
//             var this_container = this; //這段有一點謎,不加也可以
//             // var width = width;
//             // var height = height;
//             this.name = name;
//             this.sprite = sprite;
//             this.sprite.width = width;
//             this.sprite.height = height;
//             return this;
//         }

//     }
//     //創造不童的圖形
// function makeSeven(width, height, name, icon) {
//     var value = Object.create(seven);
//     return value.makeSeven(width, height, name, new PIXI.Sprite(PIXI.loader.resources[icon].texture));
// }

// //This `setup` function will run when the image has loaded
// function setup() {

//     //Create the cat sprite
//     // let cat = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);
//     var tl = new TimelineMax();
//     let slot1 = makeSeven(200, 200, "seven", "images/seven.png"),
//         slot2 = makeSeven(200, 200, "seven", "images/seven.png"),
//         slot3 = makeSeven(200, 200, "seven", "images/seven.png"),
//         slot4 = makeSeven(200, 200, "seven", "images/seven.png"),
//         slot5 = makeSeven(200, 200, "seven", "images/seven.png");


//     var myhub = [slot1, slot2, slot3, slot4, slot5];
//     myhub.forEach(function(item, index) { //function(item, index, array)
//         item.sprite.width = 200;
//         item.sprite.height = 200;
//         item.sprite.x = 3 + (width / myhub.length) * index
//     });
//     app.stage.addChild(slot1.sprite);
//     app.stage.addChild(slot2.sprite);
//     app.stage.addChild(slot3.sprite);
//     app.stage.addChild(slot4.sprite);
//     app.stage.addChild(slot5.sprite);


// }

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

app.loader
    .add('images/Symbol_01.png', 'images/Symbol_01.png')
    .add('images/Symbol_02.png', 'images/Symbol_02.png')
    .add('images/Symbol_03.png', 'images/Symbol_03.png')
    .add('images/Symbol_04.png', 'images/Symbol_04.png')
    .add('images/Symbol_05.png', 'images/Symbol_05.png')
    .add('images/Symbol_06.png', 'images/Symbol_06.png')
    .add('images/Symbol_07.png', 'images/Symbol_07.png')
    .load(onAssetsLoaded);

const REEL_WIDTH = 160;
const SYMBOL_SIZE = 150;

// onAssetsLoaded handler builds the example.
function onAssetsLoaded() {
    // Create different slot symbols.
    const slotTextures = [
        PIXI.Texture.from('images/Symbol_01.png'),
        PIXI.Texture.from('images/Symbol_02.png'),
        PIXI.Texture.from('images/Symbol_03.png'),
        PIXI.Texture.from('images/Symbol_04.png'),
        PIXI.Texture.from('images/Symbol_05.png'),
        PIXI.Texture.from('images/Symbol_06.png'),
        PIXI.Texture.from('images/Symbol_07.png'),
    ];

    // Build the reels
    const reels = [];
    const reelContainer = new PIXI.Container();
    for (let i = 0; i < 5; i++) {
        const rc = new PIXI.Container();
        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        const reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter(),
        };
        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        // Build the symbols
        for (let j = 0; j < 8; j++) {
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            // Scale the symbol to fit symbol area.
            symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
            reel.symbols.push(symbol);
            rc.addChild(symbol);
        }
        reels.push(reel);
    }
    app.stage.addChild(reelContainer);

    // Build top & bottom covers and position reelContainer
    const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;
    reelContainer.y = margin;
    reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5);
    const top = new PIXI.Graphics();
    top.beginFill(0, 1);
    top.drawRect(0, 0, app.screen.width, margin);
    const bottom = new PIXI.Graphics();
    bottom.beginFill(0, 1);
    bottom.drawRect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin);

    // Add play text
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });

    const playText = new PIXI.Text('Spin the wheels!', style);
    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2);
    bottom.addChild(playText);

    // Add header text
    const headerText = new PIXI.Text('PIXI MONSTER SLOTS!', style);
    headerText.x = Math.round((top.width - headerText.width) / 2);
    headerText.y = Math.round((margin - headerText.height) / 2);
    top.addChild(headerText);

    app.stage.addChild(top);
    app.stage.addChild(bottom);

    // Set the interactivity.
    bottom.interactive = true;
    bottom.buttonMode = true;
    bottom.addListener('pointerdown', () => {
        startPlay();
    });

    let running = false;

    // Function to start playing.
    function startPlay() {
        if (running) return;
        running = true;

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;
            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    // Reels done handler.
    function reelsComplete() {
        running = false;
    }

    // Listen for animate update.
    app.ticker.add((delta) => {
        // Update the slots.
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            // Update blur filter y amount based on speed.
            // This would be better if calculated with time in mind also. Now blur depends on frame rate.
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            // Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.y;
                s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                if (s.y < 0 && prevy > SYMBOL_SIZE) {
                    // Detect going over and swap a texture.
                    // This should in proper product be determined from some logical reel.
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }
    });
}

// Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
const tweening = [];

function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
    };

    tweening.push(tween);
    return tween;
}
// Listen for animate update.
app.ticker.add((delta) => {
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < tweening.length; i++) {
        const t = tweening[i];
        const phase = Math.min(1, (now - t.start) / t.time);

        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change) t.change(t);
        if (phase === 1) {
            t.object[t.property] = t.target;
            if (t.complete) t.complete(t);
            remove.push(t);
        }
    }
    for (let i = 0; i < remove.length; i++) {
        tweening.splice(tweening.indexOf(remove[i]), 1);
    }
});

// Basic lerp funtion.
function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount) {
    return t => (--t * t * ((amount + 1) * t + amount) + 1);
}