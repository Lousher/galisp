(use-modules (ffi pixi)
	     (hoot ffi))

(define-syntax assets
  (syntax-rules ()
    [(_ (al . src) ...)
     (begin
       (addAsset al src)
       ...)]))

(define-syntax sounds
  (syntax-rules ()
    [(_ (al . src) ...)
     (begin
       (addSound al src)
       ...)]))

(assets
    ("bg-a" . "assets/bg/a.jpg")
    ("bg-b" . "assets/bg/b.jpg")
    ("bg-c" . "assets/bg/c.jpg")
    ("ch-a" . "assets/character/0940.png")
    ("ch-b" . "assets/character/0941.png")
    ("ch-c" . "assets/character/0939.png")
    ("di-a" . "assets/dialog/a.jpg")
    ("Circle" . "assets/font/Circle.otf"))

(sounds
    ("trip" . "assets/bgm/midnight-trip.mp3")
    ("va-4" . "assets/va/4.ogg")
    ("va-5" . "assets/va/5.ogg")
    ("va-6" . "assets/va/6.ogg"))

#|(frame start
       (next second)
       (bg "bg-a")
       (ch "ch-a")
       (di "di-a")
       (bgm "trip")
       (text "今天辛苦你啦，做了这么多工作一定累坏了吧！")
       (voice "va-4"))

(frame second
       (next end)
       (bg "bg-b")
       (ch "ch-b")
       (voice "va-5")
       (text "已经做到可以休息一会儿的地步了，好好休息也是为了更好的去探索有趣的事情哦！")) |#
       
(define entry
  (lambda ()
    (changeBg "bg-a")
    (changeCh "ch-a")
    (changeDialog "di-a")
    (playBgm "trip")
    (changeText "看上去真的很好诶？用Scheme真是用对了！")
    (playVoice "va-4")
    (next (procedure->external second))
    ))

(define second
  (lambda ()
    (changeBg "bg-b")
    (changeCh "ch-b")
    (playVoice "va-5")
    (changeText "你真是太厉害啦～这已经是第二个场景了！")
    (next (procedure->external third))))

(define third
  (lambda ()
    (changeCh "ch-c")
    (changeBg "bg-c")
    (playVoice "va-6")
    (changeText "诶！你是在一周内写完这些的吗？这算不算很厉害的事情啊？")))

(%thenSuccess
 (%thenSuccess (setup)
	       (procedure->external loadAssets))
 (procedure->external entry))

