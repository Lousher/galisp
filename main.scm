(use-modules (ffi pixi)
	     (hoot ffi))

(define assets
  `(("bg-a" . "assets/bg/a.jpg")
    ("bg-b" . "assets/bg/b.jpg")
    ("ch-a" . "assets/character/0940.png")
    ("ch-b" . "assets/character/0941.png")    
    ("di-a" . "assets/dialog/a.jpg")
    ("Circle" . "assets/font/Circle.otf")))

(define sounds
  `(("trip" . "assets/bgm/midnight-trip.mp3")
    ("va-4" . "assets/va/4.ogg")
    ("va-5" . "assets/va/5.ogg")))

(for-each (lambda (ap) (addAsset (car ap) (cdr ap))) assets)
(for-each (lambda (ap) (addSound (car ap) (cdr ap))) sounds)

(define entry
  (lambda ()
    (changeBg "bg-a")
    (changeCh "ch-a")
    (changeDialog "di-a")
    (playSound "trip" (procedure->external (lambda () (console-log "Finished"))))
    (changeText "看上去真的很好诶？用Scheme真是用对了！")
    (playSound "va-4" (procedure->external (lambda ()
				 (changeCh "ch-b")
				 (changeBg "bg-b")
				 (playSound "va-5" (procedure->external (lambda () (console-log "va finished"))))
				 (changeText "第二个场景也很好的样子？"))))
    ))

(%thenSuccess
 (%thenSuccess (setup)
	       (procedure->external loadAssets))
 (procedure->external entry))

