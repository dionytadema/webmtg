class Team {
  constructor() {
    this.players = []
    // Game state
    this.life = {
      val: 0,
      disp: 0,
    }
    this.pots = {
      val: 0,
      disp: 0,
      min: 0,
      img: require("@/assets/image/poison.jpg"),
      sound_gain: require("@/assets/sound/poison.mp3"),
      sound_lose: require("@/assets/sound/gain.mp3")
    }// Commander damage list
    this.coms = []
  }
  reset(mode) {
    let life = {
      casual: 20,
      commander: 40,
      headedgiant: 30,
    }[mode]
    this.life.val = life
    this.life.disp = life
    this.pots.val = 0
    this.pots.disp = 0
    this.coms = []
    return mode
  }
  getComms() {
    let comms = []
    for (let p of this.players) {
      comms.push(p.deck)
    }
    return comms
  }
  addComms(list) {
    for (let c of list) {
      this.coms.push({
        val: 0,
        disp: 0,
        img: c.img,
        sound_gain: require("@/assets/sound/lose.mp3"),
        sound_lose: require("@/assets/sound/gain.mp3")
      })
    }
  }
}
export default Team