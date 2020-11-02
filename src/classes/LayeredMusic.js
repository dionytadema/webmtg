import AudioTrack from '@/classes/AudioTrack';
class LayeredMusic {
  constructor(layers) {
    this.layers = layers
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
  stop() {
    for (let k in this.tracks) {
      this.tracks[k].stop()
    }
  }
  set(states) {
    for (let k in states) {
      let track = this.tracks[k]
      let vol = states[k]?1:0.01
      track.fade(vol,2)
    }
  }
}
export default LayeredMusic