export const en = {
  meta: {
    rootTitle: 'Digital Rose',
    homeTitle: (productName: string): string =>
      `${productName} — Send a rose that lasts`,
    homeDescription:
      'Send a personalized digital rose with a private message. One payment, one link, five days of beauty.',
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
  },
  valueStrip: {
    privateLink: {
      label: 'Private link',
      description: 'Only they can open it',
    },
    freshness: {
      label: (days: number): string => `${days}-day freshness`,
      description: 'A rose that fades with time',
    },
    personalMessage: {
      label: 'Personal message',
      description: 'Words meant for one person',
    },
  },
  howItWorks: {
    eyebrow: 'How it works',
    title: 'Three steps to something unforgettable',
    steps: {
      compose: {
        title: 'Compose',
        description:
          'Write their name, your name, and a message only they should read.',
      },
      pay: {
        title: 'Pay',
        description: 'One simple payment. No subscription, no account required.',
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
    ephemeral: {
      title: 'Ephemeral by design',
      description: (days: number): string =>
        `Each rose stays fresh for ${days} days, then gently wilts — like the real thing.`,
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
      freshness: (days: number): string => `${days} days of freshness`,
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
    payButton: (price: string): string => `Pay ${price} & create rose`,
    redirecting: 'Redirecting to checkout…',
    errors: {
      verifyFailed: 'Could not verify your payment. Please contact support.',
      stillPreparing:
        'Payment received, but your rose is still being prepared. Refresh in a moment.',
      checkoutFailed: 'Could not start checkout. Please try again.',
    },
    preview: {
      label: 'Preview',
      caption: (days: number): string =>
        `Drag to rotate. Each rose stays fresh for ${days} days from the moment its link is created.`,
    },
  },
  checkoutSuccess: {
    title: 'Your rose is ready.',
    subtitle: 'Copy the link below and send it by email or text.',
    copy: 'Copy link',
    copied: 'Copied',
    previewLink: 'Preview what they will see →',
  },
  flower: {
    forRecipient: (name: string): string => `For ${name}`,
    senderGaveRoseSuffix: ' sent you a rose',
    sendYourOwn: 'Send your own rose',
    freshness: {
      wilted: 'Wilted',
      bloomedOn: (date: string): string => `Bloomed ${date}`,
      daysLeft: (days: number): string =>
        days === 1 ? '1 day left' : `${days} days left`,
      wiltedAria: (days: number, bloomedOn: string): string =>
        `Wilted after ${days} days. Bloomed ${bloomedOn}`,
      freshAria: (days: number, bloomedOn: string): string =>
        `${days} days of freshness left. Bloomed ${bloomedOn}`,
    },
  },
  notFound: {
    title: 'This rose has wilted',
    description: 'The link may be wrong, or this flower was never planted.',
    cta: 'Send a new rose',
  },
  checkout: {
    productName: 'Digital Rose',
    productDescription: (days: number): string =>
      `A personalized digital rose with a private message. Fresh for ${days} days.`,
  },
}

export type Dictionary = typeof en
