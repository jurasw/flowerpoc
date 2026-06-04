export const en = {
  meta: {
    rootTitle: 'Digital Rose',
    homeTitle: (productName: string): string =>
      `${productName} — Send a rose that lasts`,
    homeDescription:
      'Send a personalized digital rose with a private message. One payment, one link, yours forever.',
  },
  header: {
    nav: {
      howItWorks: 'How it works',
      features: 'Features',
      pricing: 'Pricing',
    },
    cta: 'Send a rose',
  },
  hero: {
    titleLineOne: 'Send a rose',
    titleLineTwo: 'that lasts.',
    description:
      'A hand-rendered digital rose paired with a message meant only for them. Compose, pay once, and share a private link they will never forget.',
    primaryCta: 'Create your rose',
    secondaryCta: 'See how it works',
    examples: {
      eyebrow: 'Preview',
      title: 'What they receive',
      demoVoiceHint: 'Sample',
      items: [
        {
          id: 'anniversary',
          tabLabel: 'Anniversary',
          recipientName: 'Emma',
          senderName: 'James',
          quote:
            'Every year with you feels like the first — thank you for choosing me, again and again.',
          hasVoice: true,
          voiceDurationSeconds: 18,
          voicePeaksSeed: 1.2,
        },
        {
          id: 'birthday',
          tabLabel: 'Birthday',
          recipientName: 'Mom',
          senderName: 'Kate',
          quote:
            'Happy birthday. You taught me how to love quietly and fiercely — this rose is for you.',
          hasVoice: false,
        },
        {
          id: 'thank-you',
          tabLabel: 'Thank you',
          recipientName: 'Dad',
          senderName: 'Michael',
          quote: 'Thank you for always showing up. I mean it, every single time.',
          hasVoice: true,
          voiceDurationSeconds: 12,
          voicePeaksSeed: 2.7,
        },
      ],
    },
  },
  valueStrip: {
    privateLink: {
      label: 'Private link',
      description: 'Only they can open it',
    },
    lasting: {
      label: 'Yours forever',
      description: 'A rose that stays with them',
    },
    personalMessage: {
      label: 'Personal message',
      description: 'Words meant for one person',
    },
  },
  howItWorks: {
    eyebrow: 'How it works',
    title: 'Two steps to something unforgettable',
    steps: {
      compose: {
        title: 'Compose',
        description:
          'Write their name, your name, and a message only they should read.',
      },
      share: {
        title: 'Share',
        description:
          'Copy the private link and send it by text, email, or however you choose.',
      },
    },
  },
  features: {
    eyebrow: 'Features',
    title: 'More than a message',
    subtitle:
      'A digital gift that feels considered, beautiful, and deeply personal.',
    rose: {
      title: 'Hand-rendered 3D rose',
      description:
        'A beautiful rose they can rotate and admire from every angle in the browser.',
    },
    message: {
      title: 'A message just for them',
      description:
        'Your words appear on an elegant card beneath the rose — intimate and personal.',
    },
    lasting: {
      title: 'Forever accessible',
      description:
        'Your link and rose remain — return whenever you want, with no rush.',
    },
    link: {
      title: 'One private link',
      description:
        'No app to download. Send a single URL and they see their rose instantly.',
    },
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'One rose. One moment.',
    oneTimePayment: 'One-time payment',
    included: {
      rose: 'One personalized 3D digital rose',
      card: 'Private message card',
      link: 'Shareable link — no app needed',
      lasting: 'Lifetime access to your rose',
    },
    cta: 'Create your rose',
  },
  footer: {
    tagline: 'A digital gift for someone who deserves more than a text.',
  },
  createForm: {
    eyebrow: 'Create',
    title: 'Compose your rose',
    subtitle:
      'Fill in the details below. After payment, you will receive a private link to share.',
    canceledNotice:
      'Checkout was canceled. Your rose is still waiting — pick up where you left off.',
    finalizingNotice: 'Finalizing your rose…',
    senderLabel: 'Your name',
    senderPlaceholder: 'Alex',
    recipientLabel: 'Their name',
    recipientPlaceholder: 'Someone special',
    messageLabel: 'Your message',
    messagePlaceholder: 'Write something only they should read...',
    delivery: {
      senderEmailLabel: 'Your email',
      senderEmailPlaceholder: 'you@example.com',
      methodLegend: 'How will you send it?',
      methodEmail: 'Email',
      methodPhone: 'Phone',
      methodLink: 'Link & QR',
      recipientEmailLabel: 'Their email',
      recipientEmailPlaceholder: 'them@example.com',
      recipientPhoneLabel: 'Their phone number',
      recipientPhonePlaceholder: '+48 600 000 000',
      linkMethodHint:
        'After payment you will get a private link and QR code to share yourself.',
    },
    voice: {
      label: 'Voice message (optional)',
      hint: (seconds: number): string =>
        `Record up to ${seconds} seconds. The recipient can play it on the rose page.`,
      record: 'Record voice message',
      stop: 'Stop recording',
      playPreview: 'Play preview',
      pausePreview: 'Pause preview',
      waveformLoading: 'Loading…',
      rerecord: 'Record again',
      remove: 'Remove',
      attached: 'Voice message attached — it will be sent with your rose.',
      recording: (time: string): string => `Recording ${time}`,
      unsupported: 'Voice recording is not supported in this browser.',
      errors: {
        unsupportedBrowser:
          'Voice recording is not supported in this browser.',
        noAudioCaptured: 'No audio was captured. Try recording again.',
        microphoneRequired:
          'Microphone access is required to record a voice message.',
        previewPlaybackFailed:
          'Could not play the voice message preview.',
      },
    },
    payButton: (price: string): string => `Pay ${price} & create rose`,
    redirecting: 'Redirecting to checkout…',
    errors: {
      verifyFailed: 'Could not verify your payment. Please contact support.',
      stillPreparing:
        'Payment received, but your rose is still being prepared. Refresh in a moment.',
      checkoutFailed: 'Could not start checkout. Please try again.',
      voiceUploadFailed: 'Could not upload the voice message. Please try again.',
    },
    preview: {
      label: 'Preview',
      caption:
        'Drag to rotate. Your rose stays available for as long as you keep the link.',
    },
  },
  checkoutSuccess: {
    title: 'Your rose is ready.',
    subtitleLink: 'Copy the link below or scan the QR code.',
    subtitleEmail: (email: string): string =>
      `Send the link below to ${email}.`,
    subtitlePhone: (phone: string): string =>
      `Send the link below by text to ${phone}.`,
    copy: 'Copy link',
    copied: 'Copied',
    qrLabel: 'Scan to open the rose',
    previewLink: 'Preview what they will see →',
  },
  flower: {
    forRecipient: (name: string): string => `For ${name}`,
    senderGaveRoseSuffix: ' sent you a rose',
    sendYourOwn: 'Send your own rose',
    voice: {
      label: 'Voice message',
      play: 'Play voice message',
      pause: 'Pause',
      loading: 'Loading voice message…',
      unavailable: 'Voice message is unavailable.',
    },
    lasting: {
      label: 'Forever',
      bloomedOn: (date: string): string => `Bloomed ${date}`,
      ariaLabel: (bloomedOn: string): string =>
        `A rose for keeps. Bloomed ${bloomedOn}`,
    },
  },
  notFound: {
    title: 'Rose not found',
    description: 'The link may be wrong, or this rose was never created.',
    cta: 'Send a new rose',
  },
  checkout: {
    productName: 'Digital Rose',
    productDescription:
      'A personalized digital rose with a private message. Yours to keep.',
  },
}

export type Dictionary = typeof en
