import Count from '@/classes/Count';
class Team {
  constructor() {
    this.players = []
    // Game state
    this.alive = true
    this.life = new Count(
      "life",
      null,
      {// Sound
        gain: require("@/assets/sound/gain.mp3"),
        lose: require("@/assets/sound/lose.mp3"),
      })
    this.pots = new Count(
      "potion",
      require("@/assets/image/poison.jpg"),
      {// Sound
        gain: require("@/assets/sound/poison.mp3"),
        lose: require("@/assets/sound/gain.mp3"),
      })
    this.coms = []
  }
  reset(mode) {
    this.alive = true
    this.startlife = {
      casual: 20,
      teams: 30,
      commander: 40,
      archenemy: 40,
      event: 3
    }[mode]
    this.life.val = this.startlife
    this.life.disp = this.startlife
    this.pots.val = 0
    this.pots.disp = 0
    this.coms = []
    return mode
  }
  toggleAlive() {
    this.alive = !this.alive
  }
  health() {
    return this.life.val/this.startlife
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
      this.coms.push(
        new Count(
          "commander",
          c.img,
          {
            gain: require("@/assets/sound/lose.mp3"),
            lose: require("@/assets/sound/gain.mp3"),
          }))
    }
  }
}
export default Team