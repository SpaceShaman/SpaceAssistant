export default class AudioRecorder {
  audioChunks: Blob[] = []
  mediaRecorder: MediaRecorder
  audio: File | null = null

  constructor() {
    this.mediaRecorder = {} as MediaRecorder
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream)
    })
  }

  startRecording(): void {
    this.audioChunks = []
    this.mediaRecorder.start()
    this.mediaRecorder.addEventListener('dataavailable', (event) => {
      this.audioChunks.push(event.data)
    })
  }

  async stopRecording(): Promise<File> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('MediaRecorder is not initialized'))
        return
      }
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
