class Count {
  constructor(type, img, sound) {
    this.type = type
    this.active = false
    this.val = 0
    this.disp = 0
    this.img = img
    this.sound = sound
    this.audio = {
      gain: {
        i: 0,
        a: Array(10).fill(0).map(()=>new Audio(sound.gain))
      },
      lose: {
        i: 0,
        a: Array(10).fill(0).map(()=>new Audio(sound.lose))
      }
    }
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
    let MAX = 10
    let MIND = 50
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
    for (let sound of this.audio) {
      for (let p of sound.a) {
        p.load()
      }
    }
  }
  play(name) {
    let i = this.audio[name].i
    let a = this.audio[name].a
    let p = a[i]
    if (!p.currentTime || p.paused || p.ended) {
      p.play()
      this.audio[name].i = ++i%a.length
    } 
  }
}
export default Count