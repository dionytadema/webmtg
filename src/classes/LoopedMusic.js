import AudioTrack from '@/classes/AudioTrack';
class LoopedMusic {
  constructor(loops) {
    /*this.music = {
      intro: "music/dream/1.mp3",
      gain: "music/dream/5.mp3",
      start: "music/dream/2.mp3",
      mid: "music/dream/5.mp3",
      late: "music/dream/4.mp3",
    }
    this.track = "intro"
    let url = this.music[this.track]
    this.source = await window.audiosys.play(url)
    this.source.onEnd(this.loopMusic.bind(this))*/
    this.tracks = {}
    this.states = {}
  }
  async load() {
    console.log("loading tracks")
    for (let k in this.layers) {
      window.audiosys.load(this.layers[k])
    }
    console.log("creating source nodes")
    for (let k in this.layers) {
      let ctx = window.audiosys.context
      let buf = await window.audiosys.audio[this.layers[k]]
      console.log(`${k} buffer: ${buf.length}`)
      this.tracks[k] = new AudioTrack(ctx, buf)
    }
  }
  start() {
    console.log("starting fade nodes")
    for (let k in this.layers) {
      let track = this.tracks[k]
      track.fade(0.01,0)
      track.start()
    }
    this.tracks.main.fade(1,0)
  }
  loop() {
    /*
    console.log("to "+this.musicState)
    this.track = this.musicState
    let url = this.music[this.track]
    this.source = await window.audiosys.play(url)
    this.source.loop = true
    this.source.onEnd(this.loopMusic.bind(this))
    */
  }
  stop() {
    /*
    this.source.onEnd(null)
    this.source.fade(0.01,2)
    await window.sleep(2)
    this.source.stop()
    this.source = null
    */
  }
  event(name) {
    if (name=="gain") {
      this.states.gain = true
    }
    if (name=="lose") {
      this.states.lose = true
    }
  }
}
export default LayeredMusic