let music = [
  {name: "LBP Gardens",
    type: "layered",
    img: "music/lbp/islands/img.jpg",
    layers: {
      main: "music/lbp/islands/main.wav",
      gain: "music/lbp/islands/gain.wav",
      lose: "music/lbp/islands/lose.wav",
      idle: "music/lbp/islands/low.wav",
    },
  },
  {name: "LBP Savanna",
    type: "layered",
    img: "music/lbp/savanna/img.jpg",
    layers: {
      main: "music/lbp/savanna/melody.mp3",
      gain: "music/lbp/savanna/flute.mp3",
      lose: "music/lbp/savanna/drums.mp3",
      high: "music/lbp/savanna/sax.mp3",
      mid: "music/lbp/savanna/synth.mp3",
      low: "music/lbp/savanna/percussion.mp3",
    },
    states: {
      gain: 30,
    }
  },
]
export default music