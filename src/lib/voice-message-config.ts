export const voiceMessageConfig = {
  maxDurationSeconds: 60,
  maxBase64Length: 1_000_000,
  outputMimeType: 'audio/mpeg',
  mp3BitRateKbps: 64,
  recorderMimeTypes: [
    'audio/webm',
    'audio/webm;codecs=opus',
    'audio/mp4',
    'audio/ogg',
    'audio/ogg;codecs=opus',
  ],
  allowedMimeTypes: [
    'audio/mpeg',
    'audio/mp3',
    'audio/webm',
    'audio/webm;codecs=opus',
    'audio/mp4',
    'audio/ogg',
    'audio/ogg;codecs=opus',
  ],
}
