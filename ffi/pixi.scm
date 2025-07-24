(define-module (ffi pixi)
  #:use-module (hoot ffi)
  #:export (setup %thenSuccess addAsset loadAssets changeBg changeCh changeDialog changeText changeBgm addSound playSound wait console-log))

(define-foreign console-log
  "console" "log"
 (ref string) -> none)

(define-foreign wait
  "pixi" "wait"
 (ref extern) -> none)

(define-foreign setup
  "pixi" "setup"
  -> (ref extern))

(define-foreign addSound
  "pixi" "addSound"
  (ref string) (ref string) -> none)

(define-foreign playSound
  "pixi" "playSound"
 (ref string) (ref extern) -> none)

(define-foreign %thenSuccess
  "promise" "thenSuccess"
  (ref extern) (ref extern) -> (ref extern))

(define-foreign addAsset
  "pixi" "addAsset"
  (ref string) (ref string) -> (ref extern))

(define-foreign loadAssets
  "pixi" "loadAssets"
  -> (ref extern))

(define-foreign changeBg
  "pixi" "changeBg"
  (ref string) -> none)

(define-foreign changeCh
  "pixi" "changeCh"
  (ref string) -> none)

(define-foreign changeDialog
  "pixi" "changeDialog"
  (ref string) -> none)

(define-foreign changeText
  "pixi" "changeText"
  (ref string) -> none)

(define-foreign changeBgm
  "pixi" "changeBgm"
  (ref string) -> none)

(define thenSuccess
  (lambda (pro succ)
    (%thenSuccess (pro) (procedure->external (succ)))))

