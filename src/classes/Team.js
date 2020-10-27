import Count from '@/classes/Count';
class Team {
  constructor() {
    this.players = []
    // Game state
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
    let life = {
      casual: 20,
      teams: 30,
      commander: 40,
      enemy: 40,
      hydra: 3,
      gods: 3
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