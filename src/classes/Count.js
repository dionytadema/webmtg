class Player {
  constructor(val, img, min, soundDec) {
    this.user = user
    this.deck = deck
    // Game state
    this.life = 0
    this.disp = 0
    this.pots = {
      img: require("@/assets/poison.jpg"),

      val: 0
    }// Commander damage list
    this.com = []
    this.tick = setInterval(this.update.bind(this),100)
  }
  update() {
    if (this.life>this.disp) {
      this.heal()
      this.disp++
    }
    if (this.life<this.disp) {
      this.hurt()
      this.disp--
    }
    
  }
  // Sound
  async heal() {
    //TODO: we should load the users sounds
    let audio = new Audio(require("@/assets/Hactivated.mp3"))
    await new Promise((r) => {
      audio.onended = r
      audio.play()
    })
  }
  async hurt() {
    let audio = new Audio(require("@/assets/Dehactivated.mp3"))
    await new Promise((r) => {
      audio.onended = r
      audio.play()
    })
  }
  async kill() {
    let audio = new Audio(require("@/assets/rekt.mp3"))
    await new Promise((r) => {
      audio.onended = r
      audio.play()
    })
  }
}
export default Player