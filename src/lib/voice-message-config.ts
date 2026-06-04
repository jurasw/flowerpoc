export const voiceMessageConfig = {
  maxDurationSeconds: 60,
  maxBase64Length: 700_000,
  allowedMimeTypes: [
    'audio/webm',
    'audio/webm;codecs=opus',
    'audio/mp4',
    'audio/ogg',
    'audio/ogg;codecs=opus',
  ],
}
