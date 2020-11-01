class Count {
  constructor(type, img, sound) {
    this.type = type
    this.active = false
    this.val = 0
    this.disp = 0
    this.img = img
    this.sound = sound
    this.load()
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
  load() {
    for (let s in this.sound) {
      let url = this.sound[s]
      window.audiosys.load(url)
    }
  }
  async play(name) {
    let uri = this.sound[name]
    window.audiosys.play(uri)
    /*let i = this.audio[name].i
    let a = this.audio[name].a
    let p = a[i]
    if (!p.currentTime || p.paused || p.ended) {
      p.play()
      this.audio[name].i = ++i%a.length
    } */
  }
}
export default Count