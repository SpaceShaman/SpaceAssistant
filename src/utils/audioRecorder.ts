export default class {
  constructor() {
    this.audioChunks = []
    this.mediaRecorder = null
    this.audio = null
  }

  startRecording() {
    this.audioChunks = []
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream)
      this.mediaRecorder.start()
      this.mediaRecorder.addEventListener('dataavailable', (event) => {
        this.audioChunks.push(event.data)
      })
    })
  }

  async stopRecording() {
    return new Promise((resolve, reject) => {
      this.mediaRecorder.addEventListener('stop', async () => {
        try {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' })
          this.audio = new File([audioBlob], 'audio.wav', { type: 'audio/wav' })
          resolve(this.audio)
        } catch (error) {
          reject(error)
        }
      })
      this.mediaRecorder.stop()
    })
  }
}
