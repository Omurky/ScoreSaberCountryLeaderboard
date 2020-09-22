export default {
    profile: {
        settings: {
            header: 'Ustawienia',
            language: 'Język',
            locale: 'Lokalizacja',
            theme: 'Motyw',
            songBrowser: {
                header: 'Przeglądarka nut',
                autoTransform: 'Automatycznie transformuj',
                defaultTypeHeader: 'Domyślny rodzaj',
                defaultViewHeader: 'Domyślny widok',
                defaultColumnsHeader: 'Domyślne kolumny',
                defaultSortHeader: 'Domyślne sortowanie',
                defaultIconsHeader: 'Domyślne ikony',
                defaultItemsPerPageHeader: 'Liczba pozycji na stronę',
            },

            profile: {
                header: 'Profil',
                enlargeAvatar: 'Powiększaj avatar',
                showChart: 'Pokazuj wykres',
                showOnePpCalc: 'Pokazuj kalkulator +1PP'
            },

            songLeaderboard: {
                header: 'Ranking nutki',
                showDiff: 'Pokazuj różnice',
                showWhatIfPp: 'Pokazuj przycisk "jeśli tak zagrasz"',
                showBgCover: 'Pokazuj okładkę w tle',
                defaultType: 'Domyślny typ',
            },

            defaultSongList: {
                header: 'Domyślna lista nut',
                enhance: 'Dodawaj wynik/dokładność',
                showDiff: 'Pokazuj różnice',
            },

            others: {
                header: 'Inne',
                bgDownload: 'Pobieraj w tle',
                keepView: 'Utrzymuj widok',
                alwaysRefresh: 'Zawsze odświeżaj',
            },

            export: 'Eksport',
            import: 'Import',
        },
        addPlayer: 'Dodaj gracza',
        setAsDefault: 'Ustaw jako Twój profil',
        addToFriends: 'Dodaj do Przyjaciół',
        removeFromFriends: 'Usuń z Przyjaciół',
        removePlayer: 'Usuń gracza',
        rawNewPlay: 'pp w nowej grze',
        onePpParseError: 'Wpisz może jakąś liczbę, ok? ${num1} jest liczbą, ${num2} jest, a nawet ${num3}. Ale "${expectedStr}"?',
        mapToPp: 'Mapa ${stars}* przy ${acc}% da ${rawPp}pp raw i +${pp}pp global',
        stats: {
            ranking: 'Ranking',
            pp: 'Punkty',
            playCount: 'Liczba gier',
            totalScore: 'Wynik razem',
            replays: 'Powtórki obejrzane przez innych',
            role: 'Rola',
            rankedPlayCount: 'Liczba zagranych rankedów',
            totalRankedScore: 'Wynik rankedów razem',
            avgRankedAccuracy: 'Średnia celność rankedów',
        },
        twitch: {
            link: 'Połącz',
            linked: 'Połączono',
            renew: 'Odnów',
            daysLeft: 'Pozostało dni: ${days}',
        },
    },
    songBrowser: {
        types: {
            all: 'Wszystkie',
            ranked_only: 'Tylko rankingowe',
            unranked_only: 'Tylko nierankingowe',
            not_played_only: 'Tylko niezagrane',
            sniper_mode: 'Tryb snipera'
        },
        typesOptions: {
            all: 'Wszystkie',
            not_best: 'Gdy NIEnajlepszy',
            best: 'Gdy NAJlepszy',
        },
        viewTypes: {
            compact: 'Kompaktowy',
            tabular: 'Tabelaryczny',
            cards: 'Karty',
        },
        fields: {
            timeset: 'Data zagrania',
            timesetShort: 'Data',
            stars: 'Gwiazdki',
            starsShort: '*',
            pp: 'PP',
            ppShort: 'PP',
            acc: 'Celność',
            accShort: 'Cel.',
            maxPp: 'Max PP',
            maxPpShort: 'Max PP',
            bpm: 'BPM',
            bpmShort: 'BPM',
            njs: 'NJS',
            njsShort: 'NJS',
            nps: 'NPS',
            npsShort: 'NPS',
            duration: 'Czas',
            durationShort: 'Czas',
            diffPp: '+PP global',
            diffPpShort: '+PP',
            weighted: 'Ważone:',
            weightedPp: 'Ważone PP',
            weightedPpShort: 'wPP',
            score: 'Wynik',
            scoreShort: 'Wynik',
            diff: 'Różnice',
            diffShort: 'Różnice',
            icons: 'Ikony akcji',
            iconsShort: 'Ikony'
        },
        sort: {
            ascending: 'Rosnąco',
            descending: 'Malejąco',
        },
        icons: {
            bsr: '!bsr',
            beatsaver: 'Beat Saver',
            oneclick: 'OneClick Install',
            preview: 'Podgląd mapy',
            twitch: 'Twitch',
            bsrTooltip: 'Skopiuj !bsr',
            beatSaverTooltip: 'Przejdź na Beat Saver',
            twitchTooltip: 'Podgląd VOD',
        },
        typeHeader: 'Rodzaj',
        songHeader: 'Nutka',
        songPlaceholder: 'Zacznij wpisywać...',
        viewHeader: 'Widok',
        showHeader: 'Pokazuj',
        sortingHeader: 'Sortowanie',
        compare: {
            label: 'Porównaj',
            add: 'Dodaj gracza do porównania',
            remove: 'Usuń z porównania',
            saveAsDefault: 'Zapisz jako domyślne'
        },
        playlist: {
            label: 'Playlista',
            showChecks: 'Pokaż checkboksy',
            hideChecks: 'Ukryj checkboksy',
            checkAll: 'Zaznacz wszystkie',
            checkPage: 'Zaznacz stronę',
            clear: 'Wyczyść',
            export: 'Eksportuj playlistę'
        },
        csv: {
            label: 'CSV',
            export: 'Eksport do CSV',
        },
        transformingTheUniverse: 'Transformacja wszechświata w toku...',
        noData: {
            title: 'Strasznie tu pusto',
            info: 'Wygląda na to, że żadna nutka nie spełnia wszystkich wybranych wymagań. Zmień coś może?',
        },
        noScore: 'Brak wyniku',
        former: 'Poprzednio',
        totalPp: 'Razem dla ${name}'
    },
    songLeaderboard: {
        player: 'Gracz',
        mods: 'Mody',
        nobodyPlayed: 'Wygląda na to, że nikt jeszcze nie zagrał tej nutki.',
        searching: 'Wyszukiwanie wyników...',
        ranked: 'Rankingowa',
        unranked: 'Nierankingowa',
        maxPpSuffix: 'pp maks.',
        types: {
            all: 'Wszyscy',
            country: 'Tylko kraj',
            manually_added: 'Przyjaciele',
        },
    },
    songCard: {
        scores: 'Wyniki',
        notes: 'Klocki',
        bombs: 'Bomby',
        obstacles: 'Przeszkody',
    },
    refresh: {
        lastDownload: 'Pobrano:',
        rankedsDownload: 'Pobieranie aktualnych rankedów',
        countryPlayersDownload: 'Pobieranie listy top 50 ${country}...',
        waiting: '[Czekam ${seconds}s]',
        error: 'Błąd pobierania danych. Spróbuj ponownie.',
    },
    whatif: {
        label: 'Jeśli tak zagrasz:',
    },
    dashboard: {
        rankingHeader: 'Ranking',
        showOriginal: 'Pokaż oryginał',
        lastScores: 'Ostatnie wyniki',
        bestScores: 'Najlepsze wyniki',
        ranking: {
            header: {
                player: 'Gracz',
                song: 'Nuta',
                timeset: 'Data',
                acc: '%',
                pp: 'PP',
                change: 'Różnica',
            },
            changeOptions: {
                day: 'Dzień',
                week: 'Tydzień',
                month: 'Miesiąc',
            },
        },
        periods: {
            last3Days: 'Ostatnie 3 dni',
            lastWeek: 'Ostatni tydzień',
            last2Weeks: 'Ostatnie 2 tygodnie',
            lastMonth: 'Ostatni miesiąc',
        },
        setCurrentCountry: 'Ustaw jako aktualny kraj',
        areYouSureSetCurrentCountry: 'Czy na pewno chcesz ustawić ${country} jako bieżący kraj?',
        areYouSureChangeCurrentCountry: 'Czy na pewno chcesz zmienić kraj z ${currentCountry} na ${country}?',
        onboardingLine1: 'Musimy teraz pobrać wszystkie wyniki graczy z wybranego kraju.',
        onboardingLine2: 'Usiądź sobie wygodnie, kliknij Start i poczekaj, bo trochę to potrwa...',
    },
    chart: {
        timeLabel: 'Czas',
        rankLabel: 'Pozycja',
        rankTooltip: 'Pozycja ${rank}',
        starsLabel: 'Gwiazdki',
        accuracyLabel: 'Celność',
        accTooltip: 'Celność: ${acc}% | Gwiazdki: ${stars}*',
        rankingButton: 'Ranking',
        accuracyButton: 'Celność',
    },
    themes: {
        dark: 'Jedyny słuszny',
        light: 'Wypalający oczy',
        drakonno: 'Drakonno',
        sombra: 'Sombra'
    },
    plugin: {
        transformButton: 'Transformuj',
    },
    common: {
        ok: 'OK',
        save: 'Zapisz',
        cancel: 'Anuluj',
        options: 'Opcje',
        nothingSelected: 'Nic nie wybrano',
        to: 'do',
        noData: 'Brak danych',
    }
}