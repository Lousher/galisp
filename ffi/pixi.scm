(define-module (ffi pixi)
  #:use-module (hoot ffi)
  #:export (setup %thenSuccess addAsset loadAssets changeBg changeCh changeDialog changeText addSound playVoice console-log playBgm next))

(define-foreign next
  "pixi" "next"
  (ref extern) -> none)

(define-foreign playBgm
  "pixi" "playBgm"
 (ref string) -> none)

(define-foreign console-log
  "console" "log"
 (ref string) -> none)

(define-foreign setup
  "pixi" "setup"
  -> (ref extern))

(define-foreign addSound
  "pixi" "addSound"
  (ref string) (ref string) -> none)

(define-foreign %playVoice
  "pixi" "playVoice"
  (ref string) -> none)

(define playVoice
  (lambda (audio)
    (%playVoice audio)))

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

(define thenSuccess
  (lambda (pro succ)
    (%thenSuccess (pro) (procedure->external (succ)))))
