export default {
    profile: {
        settings: {
            header: 'Settings',
            language: 'Language',
            locale: 'Localization',
            theme: 'Theme',
            songBrowser: {
                header: 'Song browser',
                autoTransform: 'Automatically transform',
                defaultTypeHeader: 'Default type',
                defaultViewHeader: 'Default view',
                defaultColumnsHeader: 'Default columns',
                defaultSortHeader: 'Default sort',
                defaultIconsHeader: 'Default icons',
                defaultItemsPerPageHeader: 'Number of items per page',
            },

            profile: {
                header: 'Profile',
                defaultChart: 'Default chart',
                statsStyling: 'Stats style',
                showOnePpCalc: 'Show +1PP calculator',
                showTwitchIcon: 'Show Twitch button',
                statsStyleBadge: 'Badges',
                statsStyleText: 'Text',
            },

            songLeaderboard: {
                header: 'Song ranking',
                showDiff: 'Show the differences',
                showWhatIfPp: 'Show the "What if you play it like that" button',
                showBgCover: 'Show background cover',
                defaultType: 'Default type',
            },

            others: {
                header: 'Others',
                bgDownload: 'Background download',
                refreshHeader: 'Data refresh',
                keepView: 'Keep the view',
                alwaysRefresh: 'Always refresh',
            },
            export: 'Export',
            import: 'Import',
        },
        addPlayer: 'Add player',
        setAsDefault: 'Set as your profile',
        addToFriends: 'Add to Friends',
        removeFromFriends: 'Remove from Friends',
        removePlayer: 'Remove player',
        rawNewPlay: 'raw pp new play',
        onePpParseError: 'Type in a number, ok? ${num1} is a number or ${num2} is. But "${str}"?',
        stats: {
            ranking: 'Player ranking',
            pp: 'Performance points',
            playCount: 'Play count',
            totalScore: 'Total score',
            replays: 'Replays watched by others',
            replaysShort: 'Replays',
            role: 'Role',
            inactiveAccount: 'Inactive account',
            rankedPlayCount: 'Ranked play count',
            countryRank: 'Rank in country leaderboards',
            best: 'Best',
            avg: 'Avg.',
            totalRankedScore: 'Total ranked score',
            avgRankedAccuracy: 'Average ranked accuracy',
            medianRankedAccuracy: 'Median ranked accuracy',
            stdDeviationRankedAccuracy: 'Std deviation ranked accuracy',
            avgRankedAccuracyShort: 'Average',
            medianRankedAccuracyShort: 'Median',
            stdDeviationRankedAccuracyShort: 'Std deviation',
        },
        twitch: {
            link: 'Link',
            linked: 'Linked',
            renew: 'Renew',
            daysLeft: 'Days left: ${days}',
            setupPlayerProfile: 'Set up a Twitch profile',
            userNotFound: 'Twitch user not found',
            vodsBadge: 'Twitch VODs',
            video: 'Video',
        },
        aside: {
            globalRanking: 'Global ranking',
            countryRanking: 'Country ranking',
            whatToPlay: 'What to play',
        },
        whatToPlay: {
            all: 'All',
            notPlayed: 'Not played',
            toImprove: 'To improve',
            algorithmBy: 'Accuracy estimation algorithm developed by',
        },
    },
    songBrowser: {
        types: {
            all: 'All',
            ranked_only: 'Ranked only',
            unranked_only: 'Unranked only',
            not_played_only: 'Not played only',
            sniper_mode: 'Sniper mode'
        },
        typesOptions: {
            all: 'All',
            not_best: 'When NOT the best',
            best: 'When THE best',
        },
        viewTypes: {
            compact: 'Compact',
            tabular: 'Tabular',
            cards: 'Cards',
        },
        fields: {
            timeset: 'Date of play',
            timesetShort: 'Date',
            rank: 'Rank',
            rankShort: '#',
            stars: 'Stars',
            starsShort: '*',
            pp: 'PP',
            ppShort: 'PP',
            estimatedPp: 'Est. PP',
            estimatedPpShort: 'Est. PP',
            acc: 'Accuracy',
            accShort: 'Acc',
            percentage: 'Percentage',
            percentageShort: '%',
            estimatedAcc: 'Est. accuracy',
            estimatedAccShort: 'Est. Acc',
            maxPp: 'Max PP',
            maxPpShort: 'Max PP',
            bpm: 'BPM',
            bpmShort: 'BPM',
            njs: 'NJS',
            njsShort: 'NJS',
            nps: 'NPS',
            npsShort: 'NPS',
            duration: 'Duration',
            durationShort: 'Time',
            diffPp: '+PP global',
            diffPpShort: '+PP',
            weighted: 'Weighted:',
            weightedPp: 'Weighted PP',
            weightedPpShort: 'w.PP',
            score: 'Score',
            scoreShort: 'Score',
            diff: 'Differences',
            diffShort: 'Diff',
            icons: 'Action icons',
            iconsShort: 'Icons',
            beatSaviorAcc: 'Beat Savior Acc',
            beatSaviorAccShort: 'Sav. Acc',
            beatSaviorStats: 'Beat Savior Stats',
            beatSaviorStatsShort: 'Sav. Stats',
        },
        sort: {
            ascending: 'Ascending',
            descending: 'Descending',
        },
        icons: {
            bsr: '!bsr',
            beatsaver: 'Beat Saver',
            oneclick: 'OneClick Install',
            preview: 'Map preview',
            twitch: 'Twitch',
            beatsavior: 'Beat Savior',
            bsrTooltip: 'Copy !bsr',
            beatSaverTooltip: 'Go to Beat Saver',
            beatSaviorTooltip: 'Show last played from Beat Savior',
            twitchTooltip: 'VOD preview',
        },
        typeHeader: 'Type',
        songHeader: 'Song',
        songPlaceholder: 'Start typing...',
        countryRankHeader: 'Country rank',
        viewHeader: 'View',
        showHeader: 'Show',
        sortingHeader: 'Sorting',
        compare: {
            label: 'Compare',
            add: 'Add a player to compare',
            remove: 'Remove from comparision',
            saveAsDefault: 'Save comparision as default'
        },
        playlist: {
            label: 'Playlist',
            showChecks: 'Show checkboxes',
            hideChecks: 'Hide checkboxes',
            checkAll: 'Check all',
            checkPage: 'Check the page',
            clear: 'Clear',
            export: 'Export playlist'
        },
        csv: {
            label: 'CSV',
            export: 'Export CSV',
        },
        transformingTheUniverse: 'Transformation of the universe in progress...',
        noData: {
            title: 'It\'s so empty here.',
            info: 'It seems that no song meets all the selected requirements. Change something maybe?',
        },
        noScore: 'No score',
        former: 'Former',
        totalPp: 'Total PP for ${name}',
        rankOfDate: 'Rank of ${date}, click to refresh',
        ssScoreType: {
            top: 'Top',
            recent: 'Recent',
        },
        estimated: 'Estimated',
        estimatedShort: 'Est.',
    },
    songLeaderboard: {
        player: 'Player',
        mods: 'Mods',
        nobodyPlayed: 'It seems that nobody has played this song yet.',
        searching: 'Searching for results...',
        ranked: 'Ranked',
        unranked: 'Unranked',
        maxPpSuffix: 'pp max',
        types: {
            all: 'All',
            country: 'Country only',
            manually_added: 'Friends',
        },
        difficultyGraph: 'Difficulty graph',
    },
    songCard: {
        scores: 'Scores',
        notes: 'Notes',
        bombs: 'Bombs',
        obstacles: 'Obstacles',
    },
    refresh: {
        lastDownload: 'Downloaded:',
        rankedsDownload: 'Downloading current rankeds',
        countryPlayersDownload: 'Downloading active players',
        waiting: '[Waiting ${seconds}s]',
        error: 'Download error. Try again.',
        btnDisabledBgDlInProgress: 'Refreshing disabled. Background downloading in progress...',
    },
    whatif: {
        label: 'If you play like this:',
    },
    dashboard: {
        rankingHeader: 'Ranking',
        showOriginal: 'Show the original',
        lastScores: 'Recent scores',
        bestScores: 'Best scores',
        ranking: {
            header: {
                player: 'Player',
                song: 'Song',
                timeset: 'Date',
                acc: 'Acc',
                pp: 'PP',
                change: 'Change',
            },
            changeOptions: {
                day: 'Daily change',
                week: 'Weekly change',
                month: 'Monthly change',
            },
        },
        periods: {
            last3Days: 'Last 3 days',
            lastWeek: 'Last week',
            last2Weeks: 'Last 2 weeks',
            lastMonth: 'Last month',
            last3Months: 'Last 3 months',
            lastHalfYear: 'Last 6 months',
            lastYear: 'Last year',
            all: 'All times',
        },
        setCurrentCountry: 'Set as the current country',
        areYouSureSetCurrentCountry: 'Are you sure you want to set ${country} as the current country?',
        areYouSureChangeCurrentCountry: 'Are you sure you want to change the country from ${currentCountry} to ${country}?',
        onboardingLine1: 'We have to download all the scores of players from the selected country.',
        onboardingLine2: 'Sit down comfortably, click Start and wait, because it will take a while...',
    },
    chart: {
        timeLabel: 'Time',
        rankLabel: 'Rank',
        ppLabel: 'PP',
        activityLabel: 'Activity',
        rankTooltip: '#${value}',
        ppTooltip: '${value}pp',
        activityTooltip: 'Activity: ${value} song(s)',
        starsLabel: 'Stars',
        accuracyLabel: 'Accuracy',
        accTooltip: 'Accuracy: ${acc}% (${mods}) | Stars: ${stars}*',
        percentageTooltip: 'Percentage: ${acc}% (${mods}) | Stars: ${stars}*',
        accTooltipNoMods: 'Accuracy: ${acc}% | Stars: ${stars}*',
        percentageTooltipNoMods: 'Percentage: ${acc}% | Stars: ${stars}*',
        rankingButton: 'Ranking',
        accuracyButton: 'Accuracy',
        percentageButton: 'Percentage',
        none: 'Disabled',
    },
    beatSaviorImporter: {
        beatSaviorBtn: 'Beat Savior',
        header: 'Beat Savior data import',
        importBtn: 'Import',
        selectOtherFolderBtn: 'Select other folder',
        introduction: 'This tool allows you to import data from the <a href="https://www.beatsavior.io/" target="_blank" rel="noopener">BeatSavior</a> mod stored <strong>on your computer</strong>. The tool uses the new File System Access API, Chrome/Edge browser version 86 or higher is required.',
        selectFolderFirst: 'The first time you import, you will need to point to the folder where the data is stored. Because the browser does not allow access to system directories you must first copy the <strong>C:\\Users\\&lt;YOUR WINDOWS USER&gt;\\AppData\\Roaming\\Beat Savior Data</strong> folder to another location, such as the desktop. Then point to that folder when prompted.',
        selectFolderConsecutive: 'Copy the new data from the <strong>C:\\Users\\&lt;YOUR WINDOWS USER&gt;\\AppData\\Roaming\\Beat Savior Data</strong> folder to the location where you keep your Beat Savior data.',
        permissions: 'The browser will ask you to confirm that you give permission to read local files, confirm it. This confirmation will be necessary during each new session (after closing a tab or reloading a page).',
        importInProgress: 'Importing data. Please wait...',
        importCompleted: 'The data has been imported',
        fileSystemApiNotAvailableException: 'File System Access API is not available',
        noFolderSelectedException: 'No folder selected',
        noDirectoryHandleException: 'Fetching directory handle failed',
        noPermissionException: 'No permission was granted to read local files',
        oldPlayerScoresException: 'Please refresh the scores. Data must be no older than 5 minutes.',
        skipping: 'skipping',
        loading: 'loading',
        loadingPlays: 'loading ${num} of ${total} / ${name}',
        fetchPlayerScores: 'fetching player scores',
        savingToDb: 'saving',
    },
    beatSavior: {
        left: 'Left',
        leftShort: 'L',
        right: 'Right',
        rightShort: 'R',
        accLeft: 'Accuracy left',
        accLeftShort: 'Acc L',
        accRight: 'Accuracy right',
        accRightShort: 'Acc R',
        avgAcc: 'Avg accuracy',
        avgAccShort: 'Avg acc',
        beforeCut: 'Before cut',
        beforeCutShort: 'Before',
        afterCut: 'After cut',
        afterCutShort: 'After',
        accuracy: 'Accuracy',
        accuracyShort: 'Acc',
        misses: 'Misses',
        missesShort: 'Misses',
        maxCombo: 'Max combo',
        maxComboShort: 'Combo',
        pauses: 'Pauses',
        pausesShort: 'Pauses',
        bombHit: 'Bomb hit',
        bombHitShort: 'Bomb hit',
        wallHit: 'Wall hit',
        wallHitShort: 'Wall hit',
        avgStatsBtn: 'Average',
        avgStatsTooltip: 'Show average accuracy',
        avgStatsHeader: 'Average accuracy from ${num} song(s)',
    },
    themes: {
        dark: 'The one and the only',
        light: 'Eyes burning',
        drakonno: "Drakonno's",
        sombra: "Sombra's"
    },
    plugin: {
        cachedButton: 'Cached',
        liveButton: 'Live',
    },
    common: {
        ok: 'OK',
        save: 'Save',
        cancel: 'Cancel',
        close: 'Close',
        options: 'Options',
        search: 'Search',
        nothingSelected: 'Nothing selected',
        to: 'to',
        noData: 'No data',
        downloadError: 'Download error',
    },
    import: {
        selectJsonFile: 'Select the JSON file containing the data export',
        oldVerNotSupported: 'Importing a file from an older version of the plugin is not supported',
        incorrectFile: 'Invalid export file',
        incorrectJsonFile: 'Invalid JSON file'
    },
    db: {
        conversionMessage: 'Database conversion',
        conversionSecondaryMessage: 'Please wait, this should not take more than half a minute...',
    },
    onboarding: {
        importOrSetProfile: "Import data or set as your profile"
    }
}