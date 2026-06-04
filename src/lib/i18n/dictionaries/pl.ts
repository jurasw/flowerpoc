import type { Dictionary } from '#/lib/i18n/dictionaries/en'

export const pl: Dictionary = {
  meta: {
    rootTitle: 'Cyfrowa Róża',
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
    titleLineTwo: 'która trwa.',
    description:
      'Ręcznie wyrenderowana cyfrowa róża wraz z wiadomością przeznaczoną tylko dla tej jednej osoby. Skomponuj, zapłać raz i udostępnij prywatny link, którego nigdy nie zapomną.',
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
    title: 'Dwa kroki do czegoś niezapomnianego',
    steps: {
      compose: {
        title: 'Skomponuj',
        description:
          'Wpisz jej lub jego imię, swoje imię oraz wiadomość, którą przeczyta tylko ta osoba.',
      },
      share: {
        title: 'Udostępnij',
        description:
          'Skopiuj prywatny link i wyślij go SMS-em, e-mailem lub w dowolny inny sposób.',
      },
    },
  },
  features: {
    eyebrow: 'Funkcje',
    title: 'Coś więcej niż wiadomość',
    subtitle:
      'Cyfrowy prezent, który jest przemyślany, piękny i głęboko osobisty.',
    rose: {
      title: 'Ręcznie wyrenderowana róża 3D',
      description:
        'Piękna róża, którą można obracać i podziwiać z każdej strony w przeglądarce.',
    },
    message: {
      title: 'Wiadomość tylko dla tej osoby',
      description:
        'Twoje słowa pojawiają się na eleganckiej karcie pod różą — intymnie i osobiście.',
    },
    lasting: {
      title: 'Zawsze dostępna',
      description:
        'Twój link i róża zostają — wracaj kiedy chcesz, bez pośpiechu.',
    },
    link: {
      title: 'Jeden prywatny link',
      description:
        'Nie trzeba nic instalować. Wyślij jeden link, a róża pojawi się natychmiast.',
    },
  },
  pricing: {
    eyebrow: 'Cennik',
    title: 'Jedna róża. Jedna chwila.',
    oneTimePayment: 'Płatność jednorazowa',
    included: {
      rose: 'Jedna spersonalizowana cyfrowa róża 3D',
      card: 'Karta z prywatną wiadomością',
      link: 'Link do udostępnienia — bez aplikacji',
      lasting: 'Bezterminowy dostęp do Twojej róży',
    },
    cta: 'Stwórz swoją różę',
  },
  footer: {
    tagline: 'Cyfrowy prezent dla kogoś, kto zasługuje na więcej niż SMS.',
  },
  createForm: {
    eyebrow: 'Stwórz',
    title: 'Skomponuj swoją różę',
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
        'Przeciągnij, aby obrócić. Twoja róża pozostaje dostępna tak długo, jak zachowasz link.',
    },
  },
  checkoutSuccess: {
    title: 'Twoja róża jest gotowa.',
    subtitleLink: 'Skopiuj poniższy link lub zeskanuj kod QR.',
    subtitleEmail: (email: string): string =>
      `Wyślij poniższy link na adres ${email}.`,
    subtitlePhone: (phone: string): string =>
      `Wyślij poniższy link SMS-em na numer ${phone}.`,
    copy: 'Kopiuj link',
    copied: 'Skopiowano',
    qrLabel: 'Zeskanuj, aby otworzyć różę',
    previewLink: 'Zobacz, co zobaczy odbiorca →',
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
    productName: 'Cyfrowa Róża',
    productDescription:
      'Spersonalizowana cyfrowa róża z prywatną wiadomością. Twoja na zawsze.',
  },
}
