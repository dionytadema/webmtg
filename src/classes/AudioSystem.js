import AudioTrack from '@/classes/AudioTrack';
class AudioSystem {
  constructor() {
    this.context = new window.AudioContext()
    this.audio = {}
  }
  load(url) {
    if (url in this.audio)
      return
    this.audio[url] = new Promise((r)=>{
      fetch(url).then(data=>{
        data.arrayBuffer().then(mp3=>{
          this.context.decodeAudioData(mp3).then(buf=>{
            r(buf)
          })
        })
      })
    })
  }
  async play(url) {
    if (!(url in this.audio))
      this.load(url)
    let buffer = await this.audio[url]
    /*let source = this.context.createBufferSource()
    source.buffer = buffer
    source.connect(this.context.destination)
    source.start()*/
    let track = new AudioTrack(this.context, buffer)
    track.start()
    return track
  }
}
export default AudioSystem