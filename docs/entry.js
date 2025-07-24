window.addEventListener('load', function () {
  const app = new PIXI.Application();
  const BG_INDEX = 0;
  const CH_INDEX = 1;
  const DI_INDEX = 2;
  
  let curDialogContainer = null;
  let chContainer = new PIXI.Container();

  let curCh = null;
  let curBg = null;
  let curText = null;
  let assets = [];

  Scheme.load_main("main.wasm", {
    user_imports: {
      console: {
	log: (e) => { console.log(e);},
      },
      promise: {
	thenSuccess(pro, succ) {
	  return pro.then(() => succ());
	}
      },
      pixi: {
	next: (f) => {
	  curBg.eventMode = 'static';
	  curBg.on('pointerdown', (e) => { f() });
	},
	setup() {
	  return app.init({ resizeTo: window }).then(() => document.body.appendChild(app.canvas));
	},
	addAsset(ai, src) {
	  assets.push({ "alias":ai, "src":src });
	  return assets;
	},
	loadAssets() {
	  return PIXI.Assets.load(assets);
	},
	changeBg(bg) {
	  app.stage.removeChild(curBg);
	  const bgSp = PIXI.Sprite.from(bg);
	  bgSp.anchor.set(0.5);

	  if (app.screen.width > app.screen.height) {
	    bgSp.width = app.screen.width * 1.2;
	    bgSp.scale.y = bgSp.scale.x;
	  } else {
	    bgSp.height = app.screen.height * 1.2;
	    bgSp.scale.x = bgSp.scale.y;
	  }

	  bgSp.x = app.screen.width / 2;
	  bgSp.y = app.screen.height / 2;

	  app.stage.addChildAt(bgSp, BG_INDEX);

	  curBg = bgSp;
	},
	changeCh(ch) {
	  chContainer.removeChild(curCh);

	  app.stage.addChildAt(chContainer, CH_INDEX);
	  const chSp = PIXI.Sprite.from(ch);
	  chSp.zIndex = 1;
	  chSp.anchor.set(0.5, 1);
	  chSp.y = app.screen.height;
	  chSp.x = app.screen.width / 2;
	  chContainer.addChild(chSp);
	  curCh = chSp;
	},
	changeDialog(di) {
	  const diContainer = new PIXI.Container();

	  const diHeight = app.screen.height / 3;
	  diContainer.width = app.screen.width;
	  diContainer.height = diHeight;
	  diContainer.y = app.screen.height - diHeight;
	  
	  app.stage.addChildAt(diContainer, DI_INDEX);
	  const diSp = PIXI.Sprite.from(di);
	  diSp.zIndex = 2;
	  //diSp.anchor.set(0, 1);
	  //diSp.y = app.screen.height;
	  diSp.width = app.screen.width;
	  diSp.height = diHeight;
	  diSp.alpha = 0.8;
	  diContainer.addChild(diSp);

	  curDialogContainer = diContainer;
	},
	addSound(a, src) {
	  PIXI.sound.add(a, src);
	},
	playVoice(a) {
	  PIXI.sound.play(a);
	},
	playBgm(bgm) {
	  PIXI.sound.play(bgm, { loop: true });
	},
	changeText(str) {
	  curDialogContainer.removeChild(curText);
	  
	  let currentText = "";
	  const bitmapText = new PIXI.BitmapText({
	    text: currentText,
	    style: {
	      fontFamily: "Circle",
	      fontSize: 40,
	      align: 'left',
	    },
	  });
	  bitmapText.zIndex = 5;
	  
	  let passed = 0;
	  const delayed = 100;
	  let charIndex = 0;

	  const ticker = new PIXI.Ticker();
	  ticker.add((delta) => {
	    passed += ticker.deltaMS;

	    while (passed >= delayed && charIndex < str.length) {
	      currentText += str.charAt(charIndex);
	      charIndex++;
	      passed -= delayed;
	    }
	    bitmapText.text = currentText;
	    bitmapText.tint = 0x000000;

	    if (charIndex >= str.length) {
	      ticker.remove();
	    }
	  })
	  ticker.start();
	  curDialogContainer.addChild(bitmapText)
	  bitmapText.position.set(60, 65);	  
	  curText = bitmapText;
	}
      }
    }
  })
  
})
