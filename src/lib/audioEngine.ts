// Procedural Web Audio Engine for "The Chaos We Call Home"
// Synthesizes atmospheric soundscapes without needing external audio file dependencies.

export interface AudioMixerState {
  masterVolume: number; // 0 to 1
  isMuted: boolean;
  hearthFire: number; // 0 to 1
  stormRain: number; // 0 to 1
  cosmicDrone: number; // 0 to 1
  urbanEcho: number; // 0 to 1
  zenChimes: number; // 0 to 1
  forestWind: number; // 0 to 1
}

class ProceduralAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  public analyser: AnalyserNode | null = null;

  // Individual Channel Gain Nodes
  private gains: {
    hearthFire?: GainNode;
    stormRain?: GainNode;
    cosmicDrone?: GainNode;
    urbanEcho?: GainNode;
    zenChimes?: GainNode;
    forestWind?: GainNode;
  } = {};

  private isRunning: boolean = false;
  private chimeInterval: number | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 128;
    this.analyser.smoothingTimeConstant = 0.85;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.setupCosmicDrone();
    this.setupStormRain();
    this.setupHearthFire();
    this.setupForestWind();
    this.setupUrbanEcho();
    this.setupZenChimes();

    this.isRunning = true;
  }

  public async resume() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  // 1. Cosmic Drone (Low sine waves + binaural beating)
  private setupCosmicDrone() {
    if (!this.ctx || !this.masterGain) return;
    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    droneGain.connect(this.masterGain);
    this.gains.cosmicDrone = droneGain;

    const freqs = [55, 110, 164.81, 220];
    freqs.forEach((f, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f + (i * 0.5), this.ctx.currentTime);

      // Slow LFO
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + (i * 0.03), this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);

      oscGain.gain.setValueAtTime(0.2 / freqs.length, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(droneGain);

      osc.start();
      lfo.start();
    });
  }

  // 2. Storm Rain (Filtered noise generator)
  private setupStormRain() {
    if (!this.ctx || !this.masterGain) return;
    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    rainGain.connect(this.masterGain);
    this.gains.stormRain = rainGain;

    // Buffer noise
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, this.ctx.currentTime);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(250, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(highpass);
    highpass.connect(rainGain);
    whiteNoise.start();
  }

  // 3. Hearth Fire (Crackling warm noise)
  private setupHearthFire() {
    if (!this.ctx || !this.masterGain) return;
    const fireGain = this.ctx.createGain();
    fireGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    fireGain.connect(this.masterGain);
    this.gains.hearthFire = fireGain;

    // Warm base rumble
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const brownNoise = this.ctx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    brownNoise.connect(filter);
    filter.connect(fireGain);
    brownNoise.start();
  }

  // 4. Forest Wind (Sweeping modulated bandpass noise)
  private setupForestWind() {
    if (!this.ctx || !this.masterGain) return;
    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    windGain.connect(this.masterGain);
    this.gains.forestWind = windGain;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(400, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(3.0, this.ctx.currentTime);

    // Wind LFO
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(bandpass.frequency);

    noise.connect(bandpass);
    bandpass.connect(windGain);
    noise.start();
    lfo.start();
  }

  // 5. Urban Echo (Reverberant low cityscape vibration)
  private setupUrbanEcho() {
    if (!this.ctx || !this.masterGain) return;
    const urbanGain = this.ctx.createGain();
    urbanGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    urbanGain.connect(this.masterGain);
    this.gains.urbanEcho = urbanGain;

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(73.42, this.ctx.currentTime); // D2

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, this.ctx.currentTime);

    osc1.connect(filter);
    filter.connect(urbanGain);
    osc1.start();
  }

  // 6. Zen Chimes (Pentatonic bell triggers)
  private setupZenChimes() {
    if (!this.ctx || !this.masterGain) return;
    const chimesGain = this.ctx.createGain();
    chimesGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    chimesGain.connect(this.masterGain);
    this.gains.zenChimes = chimesGain;

    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C, D, E, G, A, C

    this.chimeInterval = window.setInterval(() => {
      if (!this.ctx || !this.gains.zenChimes || this.gains.zenChimes.gain.value < 0.05) return;
      const note = notes[Math.floor(Math.random() * notes.length)];
      this.playChimeNote(note);
    }, 2800);
  }

  public playChimeNote(frequency: number = 659.25) {
    if (!this.ctx || !this.gains.zenChimes) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

    osc.connect(gain);
    gain.connect(this.gains.zenChimes);

    osc.start(now);
    osc.stop(now + 3.2);
  }

  public updateMixer(state: AudioMixerState) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const targetMaster = state.isMuted ? 0 : state.masterVolume;
    this.masterGain.gain.setTargetAtTime(targetMaster, now, 0.1);

    if (this.gains.hearthFire) this.gains.hearthFire.gain.setTargetAtTime(state.hearthFire, now, 0.1);
    if (this.gains.stormRain) this.gains.stormRain.gain.setTargetAtTime(state.stormRain, now, 0.1);
    if (this.gains.cosmicDrone) this.gains.cosmicDrone.gain.setTargetAtTime(state.cosmicDrone, now, 0.1);
    if (this.gains.urbanEcho) this.gains.urbanEcho.gain.setTargetAtTime(state.urbanEcho, now, 0.1);
    if (this.gains.zenChimes) this.gains.zenChimes.gain.setTargetAtTime(state.zenChimes, now, 0.1);
    if (this.gains.forestWind) this.gains.forestWind.gain.setTargetAtTime(state.forestWind, now, 0.1);
  }

  public getVisualizerData(array: Uint8Array) {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(array as unknown as Uint8Array<ArrayBuffer>);
    }
  }

  public cleanup() {
    if (this.chimeInterval) {
      clearInterval(this.chimeInterval);
    }
  }
}

export const audioEngine = new ProceduralAudioEngine();
