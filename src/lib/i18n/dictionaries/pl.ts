import type { Dictionary } from '#/lib/i18n/dictionaries/en'

export const pl: Dictionary = {
  meta: {
    rootTitle: 'Cyfrowa Laurka',
    homeTitle: (productName: string): string =>
      `${productName} — Wyślij różę, która trwa`,
    homeDescription:
      'Wyślij spersonalizowaną cyfrową różę z prywatną wiadomością. Jedna płatność, jeden link — na zawsze.',
  },
  header: {
    nav: {
      howItWorks: 'Jak to działa',
      features: 'Funkcje',
      pricing: 'Cennik',
    },
    cta: 'Wyślij różę',
  },
  hero: {
    titleLineOne: 'Wyślij różę,',
    titleLineTwo: 'która nie zwiędnie.',
    description:
      'Piękna cyfrowa róża wraz z wiadomością przeznaczoną dla wyjątkowej osoby.',
    primaryCta: 'Stwórz swoją różę',
    secondaryCta: 'Zobacz, jak to działa',
    examples: {
      eyebrow: 'Podgląd',
      title: 'Co zobaczy ta osoba',
      demoVoiceHint: 'Przykład',
      items: [
        {
          id: 'anniversary',
          tabLabel: 'Rocznica',
          recipientName: 'Anna',
          senderName: 'Jakub',
          quote:
            'Każdy rok z Tobą jest jak pierwszy — dziękuję, że znowu mnie wybrałaś.',
          hasVoice: true,
          voiceDurationSeconds: 18,
          voicePeaksSeed: 1.2,
        },
        {
          id: 'birthday',
          tabLabel: 'Urodziny',
          recipientName: 'Mamo',
          senderName: 'Kasia',
          quote:
            'Wszystkiego najlepszego. Nauczyłaś mnie kochać cicho i mocno — ta róża jest dla Ciebie.',
          hasVoice: false,
        },
        {
          id: 'thank-you',
          tabLabel: 'Podziękowanie',
          recipientName: 'Tato',
          senderName: 'Piotr',
          quote:
            'Dziękuję, że zawsze byłeś. Naprawdę — za każdym razem.',
          hasVoice: true,
          voiceDurationSeconds: 12,
          voicePeaksSeed: 2.7,
        },
      ],
    },
  },
  valueStrip: {
    privateLink: {
      label: 'Prywatny link',
      description: 'Otworzy go tylko ta jedna osoba',
    },
    lasting: {
      label: 'Na zawsze',
      description: 'Róża, która zostaje na zawsze',
    },
    personalMessage: {
      label: 'Osobista wiadomość',
      description: 'Słowa przeznaczone dla jednej osoby',
    },
  },
  howItWorks: {
    eyebrow: 'Jak to działa',
    title: 'Prostota ponad wszystko',
    steps: {
      compose: {
        title: 'Skomponuj swoją laurkę',
        description:
          'Do pięknej róży dołącz swoją prywatną wiadomość od serca - głosową lub tekstową.',
      },
      share: {
        title: 'My zajmiemy się resztą',
        description:
          'Wyślemy laurkę na wskazany adres e-mail, numer telefonu lub dostarczymy kod QR do wydruku.',
      },
    },
  },
  features: {
    eyebrow: 'Funkcje',
    title: 'Prezent dla kogoś, kto zasługuje na więcej niż SMS',
    subtitle:
      'Coś więcej niż wiadomość na messengerze.',
    rose: {
      title: 'Piękny trójwymiarowy model prawdziwej róży',
      description:
        'Cyfrowa róża, którą można obracać i podziwiać z każdej strony w przeglądarce.',
    },
    message: {
      title: 'Wiadomość od serca',
      description:
        'Twoje unikalne życzenia pojawiają się na eleganckiej karcie pod różą.',
    },
    lasting: {
      title: 'Ponadczasowy prezent',
      description:
        'Róża nie zwiędnie, a kartka nie pożółknie. Laurka dostępna będzie przez lata.',
    },
    link: {
      title: 'Prosty dostęp',
      description:
        'Nie musisz nic instalować. Wyślemy laurkę w formie e-mail, SMS lub kodu QR.',
    },
  },
  pricing: {
    eyebrow: 'Cennik',
    title: 'Cyfrowy prezent dla kogoś, kto zasługuje na więcej niż SMS.',
    oneTimePayment: 'Płatność jednorazowa',
    included: {
      rose: 'Trójwymiarowy model prawdziwej róży',
      card: 'Karta z prywatną wiadomością',
      link: 'Gwarancja dostarczenia wiadomości',
      lasting: 'Dostępna na lata',
    },
    cta: 'Stwórz swoją różę',
  },
  footer: {
    tagline: 'Cyfrowy prezent dla kogoś, kto zasługuje na więcej niż SMS.',
  },
  createForm: {
    eyebrow: 'Stwórz',
    title: 'Skomponuj swoją laurkę',
    subtitle:
      'Uzupełnij poniższe pola. Po płatności otrzymasz prywatny link do udostępnienia.',
    canceledNotice:
      'Płatność została anulowana. Twoja róża wciąż czeka — kontynuuj od miejsca, w którym skończono.',
    finalizingNotice: 'Finalizujemy Twoją różę…',
    senderLabel: 'Twoje imię',
    senderPlaceholder: 'Alex',
    recipientLabel: 'Imię odbiorcy',
    recipientPlaceholder: 'Ktoś wyjątkowy',
    messageLabel: 'Twoja wiadomość',
    messagePlaceholder: 'Napisz coś, co przeczyta tylko ta jedna osoba...',
    delivery: {
      senderEmailLabel: 'Twój e-mail',
      senderEmailPlaceholder: 'ty@example.com',
      methodLegend: 'Jak chcesz wysłać różę?',
      methodEmail: 'E-mail',
      methodPhone: 'Telefon',
      methodLink: 'Link i QR',
      recipientEmailLabel: 'E-mail odbiorcy',
      recipientEmailPlaceholder: 'oni@example.com',
      recipientPhoneLabel: 'Numer telefonu odbiorcy',
      recipientPhonePlaceholder: '+48 600 000 000',
      linkMethodHint:
        'Po płatności otrzymasz prywatny link i kod QR do samodzielnego udostępnienia.',
    },
    voice: {
      label: 'Wiadomość głosowa (opcjonalnie)',
      hint: (seconds: number): string =>
        `Nagraj do ${seconds} sekund. Odbiorca odtworzy ją na stronie róży.`,
      record: 'Nagraj wiadomość głosową',
      stop: 'Zatrzymaj nagrywanie',
      playPreview: 'Odtwórz podgląd',
      pausePreview: 'Wstrzymaj podgląd',
      waveformLoading: 'Ładowanie…',
      rerecord: 'Nagraj ponownie',
      remove: 'Usuń',
      attached: 'Wiadomość głosowa dołączona — wyślemy ją wraz z różą.',
      recording: (time: string): string => `Nagrywanie ${time}`,
      encoding: 'Kompresja do MP3…',
      unsupported:
        'Nagrywanie głosu nie jest obsługiwane w tej przeglądarce.',
      errors: {
        unsupportedBrowser:
          'Nagrywanie głosu nie jest obsługiwane w tej przeglądarce.',
        noAudioCaptured:
          'Nie nagrano dźwięku. Spróbuj nagrać wiadomość ponownie.',
        microphoneRequired:
          'Do nagrania wiadomości głosowej potrzebny jest dostęp do mikrofonu.',
        encodingFailed:
          'Nie udało się przygotować wiadomości głosowej. Spróbuj nagrać ponownie.',
        previewPlaybackFailed:
          'Nie udało się odtworzyć podglądu wiadomości głosowej.',
      },
    },
    payButton: (price: string): string => `Zapłać ${price} i stwórz różę`,
    redirecting: 'Przekierowanie do płatności…',
    errors: {
      verifyFailed:
        'Nie udało się zweryfikować płatności. Skontaktuj się z pomocą techniczną.',
      stillPreparing:
        'Płatność otrzymana, ale Twoja róża jest jeszcze przygotowywana. Odśwież za chwilę.',
      checkoutFailed:
        'Nie udało się rozpocząć płatności. Spróbuj ponownie.',
      voiceUploadFailed:
        'Nie udało się przesłać wiadomości głosowej. Spróbuj ponownie.',
    },
    preview: {
      label: 'Podgląd',
      caption:
        'Trójwymiarowy model róży, który można obracać i podziwiać z każdej strony w przeglądarce.',
    },
  },
  checkoutSuccess: {
    title: 'Twoja róża jest gotowa.',
    emailSent: (email: string): string => `Email wysłany na adres ${email}`,
    smsSent: (phone: string): string => `SMS wysłany na numer ${phone}`,
    linkSubtitle: 'Skopiuj poniższy link lub pobierz kod QR.',
    copy: 'Kopiuj link',
    copied: 'Skopiowano',
    qrLabel: 'Zeskanuj, aby otworzyć różę',
    downloadQr: 'Pobierz kod QR',
    openRose: 'Otwórz stronę róży',
    finalizing: 'Płatność otrzymana. Przygotowujemy Twoją różę…',
    previewEyebrow: 'Podgląd odbiorcy',
  },
  flower: {
    forRecipient: (name: string): string => `Dla ${name}`,
    senderGaveRoseSuffix: ' podarował Ci różę',
    sendYourOwn: 'Wyślij własną różę',
    voice: {
      label: 'Wiadomość głosowa',
      play: 'Odtwórz wiadomość głosową',
      pause: 'Wstrzymaj',
      loading: 'Ładowanie wiadomości głosowej…',
      unavailable: 'Wiadomość głosowa jest niedostępna.',
    },
    lasting: {
      label: 'Na zawsze',
      bloomedOn: (date: string): string => `Zakwitła ${date}`,
      ariaLabel: (bloomedOn: string): string =>
        `Róża na zawsze. Zakwitła ${bloomedOn}`,
    },
  },
  notFound: {
    title: 'Nie znaleziono róży',
    description: 'Link może być błędny albo ta róża nigdy nie została utworzona.',
    cta: 'Wyślij nową różę',
  },
  checkout: {
    productName: 'Cyfrowa Laurka',
    productDescription:
      'Spersonalizowana cyfrowa róża z prywatną wiadomością. Twoja na zawsze.',
  },
  roseEmail: {
    subjectForRecipient: (senderName: string): string =>
      `${senderName} podarował Ci różę`,
    subjectForSender: 'Twoja róża jest gotowa',
    greeting: (recipientName: string): string => `Cześć ${recipientName},`,
    introFromSender: (senderName: string): string =>
      `${senderName} stworzył dla Ciebie cyfrową różę.`,
    introOwnRose:
      'Twoja cyfrowa róża jest gotowa. Udostępnij ją lub otwórz link poniżej.',
    openRoseButton: 'Otwórz różę',
    qrLabel: 'Zeskanuj, aby otworzyć różę',
    footer: 'Maison de Rose — cyfrowa róża na zawsze.',
  },
}
