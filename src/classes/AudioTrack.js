class AudioTrack {
  constructor(ctx, buf) {
    this.ctx = ctx
    this.source = ctx.createBufferSource()
    this.source.buffer = buf
    this.gain = ctx.createGain();
    this.gain.gain.setValueAtTime(1, ctx.currentTime);
    this.source.connect(this.gain)
    this.gain.connect(ctx.destination)
  }
  start() {
    this.source.start()
  }
  stop() {
    this.source.stop()
  }
  onEnd(f) {
    this.source.onended = f
  }
  fade(vol, duration) {

    this.gain.gain.linearRampToValueAtTime(
      vol,
      this.ctx.currentTime + duration);
  }
}
export default AudioTrack