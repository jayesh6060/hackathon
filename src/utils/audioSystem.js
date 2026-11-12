// Web Audio API procedural Anime Fantasy Adventure Audio System
let audioCtx = null;
let isPlaying = false;
let masterGain = null;
let intervalId = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playUiClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle crystal harp chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // A5

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {}
}

export function playFantasyHarpChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    // Pentatonic chord: D5, F#5, A5, D6 (Fantasy ascent)
    const notes = [587.33, 739.99, 880.00, 1174.66];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.5);
    });
  } catch (e) {}
}

export function toggleBgmSoundtrack(onStateChange) {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isPlaying) {
    if (intervalId) clearInterval(intervalId);
    if (masterGain) {
      masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    }
    isPlaying = false;
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    isPlaying = true;
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 1.2);

    // Fantasy Anime Chord Progression: Dmaj9 -> Gmaj7 -> Bm7 -> Asus4
    const chords = [
      [293.66, 369.99, 440.00, 554.37], // Dmaj9
      [196.00, 246.94, 293.66, 369.99], // Gmaj7
      [246.94, 293.66, 369.99, 440.00], // Bm7
      [220.00, 293.66, 329.63, 440.00]  // Asus4
    ];

    let step = 0;
    const playFantasyChord = () => {
      if (!isPlaying) return;
      const currentChord = chords[step % chords.length];
      step++;

      // Warm low-pass filtered magical pad
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(550, ctx.currentTime);
      filter.connect(masterGain);

      currentChord.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        g.gain.setValueAtTime(0.001, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.2);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.2);

        osc.connect(g);
        g.connect(filter);
        osc.start();
        osc.stop(ctx.currentTime + 4.5);
      });
    };

    playFantasyChord();
    intervalId = setInterval(playFantasyChord, 4500);

    if (onStateChange) onStateChange(true);
    return true;
  }
}
