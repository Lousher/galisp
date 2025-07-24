const app = new PIXI.Application();

function setup() {
  return app.init({resizeTo: window}).then(() => document.body.appendChild(app.canvas));
}

function preload() {
  const assets = [
    { alias: 'a', src: 'assets/bg/a.jpg'},
    { alias: 'b', src: 'assets/bg/b.jpg'},
    { alias: 'c', src: 'assets/bg/c.jpg'},
    { alias: 'dialog-a', src: 'assets/dialog/a.jpg' },
    { alias: 'character-a', src: 'assets/character/0941.png' },
    { alias: 'Circle', src: 'assets/font/Circle.otf'}
  ];

  return PIXI.Assets.load(assets);
}

function playMusic() {
  const bgm = PIXI.sound.Sound.from({url: 'assets/bgm/midnight-trip.mp3',autoPlay: true, complete: function () { console.log("sound finished"); }});
}

function addCharacter(app) {
  const characterContainer = new PIXI.Container();

  app.stage.addChild(characterContainer);

  const character = PIXI.Sprite.from('character-a');
  character.anchor.set(0.5, 1);
  character.y = app.screen.height;
  character.x = app.screen.width / 2;
  characterContainer.addChild(character);
}
function addDialog(app) {
  const dialogContainer = new PIXI.Container();

  app.stage.addChild(dialogContainer);

  const dialog = PIXI.Sprite.from('dialog-a');
  dialog.anchor.set(0, 1);
  dialog.y = app.screen.height;
  dialog.width = app.screen.width;
  dialog.alpha = 0.5;
  dialogContainer.addChild(dialog);
}

function changeBackground(app, bg) {
  const background = PIXI.Sprite.from(bg);
  background.anchor.set(0.5);

  if (app.screen.width > app.screen.height) {
    background.width = app.screen.width * 1.2;
    background.scale.y = background.scale.x;
  } else {
    background.height = app.screen.height * 1.2;
    background.scale.x = background.scale.y;
  }
  
  background.x = app.screen.width / 2;
  background.y = app.screen.height / 2;

  app.stage.addChild(background);
}

function addText(app) {
  let currentText = '';
  
  const bitmapFontText = new PIXI.BitmapText({
    text: currentText,
    style: {
      fontFamily: 'Circle',
      fontsize: 56,
      align: 'left',
      tint: 0X000000,
    },
  });

  bitmapFontText.x = 100;
  bitmapFontText.y = 200;

  let passed = 0;
  const delayed = 100;

  const fullText = "点阵图字体真的有用吗？看上去很厉害的样子？";
  let charIndex = 0;

  const ticker = new PIXI.Ticker();
  ticker.stop();
  ticker.add((delta) => {
    passed += ticker.deltaMS;

    while (passed >= delayed && charIndex < fullText.length) {
      currentText += fullText.charAt(charIndex);
      charIndex++;
      passed -= delayed;
    }
    
    bitmapFontText.text = currentText;
    bitmapFontText.style.fontSize = 56;
    bitmapFontText.tint = 0x7FFFD4;

    if (charIndex >= fullText.length) {
      ticker.remove();
    }
  })
  ticker.start();
  app.stage.addChild(bitmapFontText);
}

/*
(async () => {
  await setup();
  await preload();
  
  changeBackground(app, "a");
  addCharacter(app);
  addDialog(app);
  playMusic();
  addText(app);
  })() */

setup().then(() => preload()).then(() => changeBackground(app, 'a'));
