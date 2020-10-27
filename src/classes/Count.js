class Count {
  constructor(type, img, sound) {
    this.type = type
    this.active = false
    this.val = 0
    this.disp = 0
    this.img = img
    this.sound = sound
  }
  add(x=1) {
    this.val+=x
    this.run()
  }
  run() {
    if (this.active)
      return
    this.active = true
    this.upd()
  }
  upd() {
    let MAX = 20
    let MIND = 25
    let MAXD = 250
    switch(true) {
    case this.disp<this.val-MAX:
      this.disp = this.val-MAX
      this.play("gain")
      break;
    case this.disp<this.val:
      this.play("gain")
      this.disp++
      break;
    case this.disp>this.val+MAX:
      this.disp = this.val+MAX
      this.play("lose")
      break;
    case this.disp>this.val:
      this.play("lose")
      this.disp--
      break;
    }
    // Check if done
    if (this.val==this.disp) {
      this.active = false
      return
    }
    let dif = Math.abs(this.val-this.disp)
    let delay = MAXD - (dif/MAX*(MAXD-MIND))
    setTimeout(this.upd.bind(this),delay)
  }
  play(name) {
    let audio = new Audio(this.sound[name])
    audio.play()
  }
}
export default Count