import Profile from './Svelte/Components/Player/Profile.svelte';
import CountryDashboard from './Svelte/Components/Country/Dashboard.svelte';
import SongLeaderboard from './Svelte/Components/Song/Leaderboard.svelte';
import SongIcons from './Svelte/Components/Song/Icons.svelte';
import SongCard from './Svelte/Components/Song/LeaderboardCard.svelte';
import WhatIfpp from './Svelte/Components/Song/WhatIfPp.svelte';
import Avatar from './Svelte/Components/Common/Avatar.svelte';
import Flag from './Svelte/Components/Common/Flag.svelte';
import SetCountry from './Svelte/Components/Country/SetCountry.svelte';
import Message from './Svelte/Components/Global/Message.svelte';

import header from '../header.json';
import log from './utils/logger';
import {getThemeFromFastCache} from "./store";
import {convertArrayToObjectByKey, getFirstRegexpMatch} from "./utils/js";
import {
    getDiffAndTypeFromOnlyDiffName,
    getSongMaxScore, getSongScores,
} from "./song";

import twitch from './services/twitch';
import {getConfig, getMainPlayerId} from "./plugin-config";
import {getSsDefaultTheme, setTheme} from "./theme";
import eventBus from './utils/broadcast-channel-pubsub';
import initDownloadManager from './network/download-manager';
import initDatabase from './db/db';
import {setLangFromConfig} from "./Svelte/stores/i18n";
import {getActiveCountry} from "./scoresaber/country";
import {
    getPlayerProfileUrl,
    isPlayerDataAvailable,
} from "./scoresaber/players";
import {formatNumber} from "./utils/format";
import {parseSsLeaderboardScores, parseSsProfilePage} from './scoresaber/scores'
import {setupDataFixes} from './db/fix-data'
import scores from './db/repository/scores'
import {getSsplCountryRanks} from './scoresaber/sspl-cache'
import {parseSsFloat, parseSsInt} from './scoresaber/other'
import {dateFromString} from './utils/date'
import {fetchSsCountryRankPage} from './network/scoresaber/players'

const getLeaderboardId = () => parseInt(getFirstRegexpMatch(/\/leaderboard\/(\d+)(\?page=.*)?#?/, window.location.href.toLowerCase()), 10);
const isLeaderboardPage = () => null !== getLeaderboardId();
const getProfileId = () => getFirstRegexpMatch(/\/u\/(\d+)((\?|&|#).*)?$/, window.location.href.toLowerCase());
const isProfilePage = () => null !== getProfileId();
const getRankingCountry = () => {
    const match = window.location.href.match(new RegExp('^https://scoresaber.com/global(?:\\?|/1[&?])country=(.{1,3})'));
    return match && match.length > 1 ? match[1] : null;
}
const isCurrentCountryRankingPage = async () => getRankingCountry() === (await getActiveCountry());

async function setupLeaderboard() {
    log.info("Setup leaderboard page");

    const container = document.querySelector('.section .container');
    if (!container) return;

    const leaderboardId = getLeaderboardId();
    if (!leaderboardId) return;

    const diffs = [...document.querySelectorAll('.tabs ul li a') ?? []].map(a => ({name: a.innerText, id: parseInt(getFirstRegexpMatch(/leaderboard\/(\d+)$/, a.href), 10), color: a.querySelector('span')?.style?.color}));
    const currentDiffHuman = document.querySelector('.tabs li.is-active a span')?.innerText ?? null;
    const song = [
        {id: 'hash', label: 'ID', value: null},
        {id: 'scores', label: 'Scores', value: null},
        {id: 'status', label: 'Status', value: null},
        {id: 'totalScores', label: 'Total Scores', value: null},
        {id: 'noteCount', label: 'Note Count', value: null},
        {id: 'bpm', label: 'BPM', value: null},
        {id: 'stars', label: 'Star Difficulty', value: null},
        {id: 'levelAuthor', label: 'Mapped by', value: null},
    ]
      .map(sid => ({...sid, value: document.querySelector('.column.is-one-third-desktop .box:first-of-type').innerHTML.match(new RegExp(sid.label + ':\\s*<b>(.*?)</b>', 'i'))}))
      .concat([{id: 'name', value: [null, document.querySelector('.column.is-one-third-desktop .box:first-of-type .title a')?.innerText]}])
      .reduce((cum, sid) => {
          let value = Array.isArray(sid.value) ? sid.value[1] : null;
          if (value !== null && ['scores', 'totalScores', 'stars', 'bpm', 'noteCount'].includes(sid.id)) value = parseSsFloat(value);
          if (value && sid.id === 'name') {
              const songAuthorMatch = value.match(/^(.*?)\s-\s(.*)$/);
              if (songAuthorMatch) {
                  value = songAuthorMatch[2];
                  cum.songAuthor = songAuthorMatch[1];
              } else {
                  cum.songAuthor = '';
              }
          }
          if (value && sid.id === 'levelAuthor') {
              const el = document.createElement('div'); el.innerHTML = value;
              value = el.innerText;
          }
          if (value !== null) cum[sid.id] = value;

          return cum;
      }, {});
    const scores = [...document.querySelectorAll('table.ranking tbody tr')].map(tr => {
        let ret = {lastUpdated: new Date()};

        const parseValue = selector => parseSsFloat(tr.querySelector(selector)?.innerText ?? '') ?? null

        ret.avatarUrl = tr.querySelector('.picture img')?.src ?? null;

        const rank = tr.querySelector('td.rank');
        if (rank) {
            const rankMatch = parseSsInt(rank.innerText);
            ret.rank = rankMatch ?? null;
        } else {
            ret.rank = null;
        }

        const player = tr.querySelector('.player a');
        if (player) {
            ret.country = getFirstRegexpMatch(/^.*?\/flags\/([^.]+)\..*$/, player.querySelector('img')?.src ?? '') ?? null;
            ret.name = player.querySelector('span.songTop.pp')?.innerText ?? null;
            ret.playerId = getFirstRegexpMatch(/\/u\/(\d+)((\?|&|#).*)?$/, player.href ?? '') ?? null;
        } else {
            ret.country = null;
            ret.playerId = null;
            ret.name = null;
        }

        ret.score = parseValue('td.score');

        ret.timesetStr = tr.querySelector('td.timeset')?.innerText ?? null;
        ret.mods = tr.querySelector('td.mods')?.innerText?.replace('-','').split(',').filter(m => m && m.length) ?? [];

        ret.pp = parseValue('td.pp .scoreTop.ppValue');

        ret.acc = parseValue('td.percentage');
        ret.acc = ret.acc ? ret.acc / 100 : null;

        return ret;
    });
    const props = {
        leaderboardId,
        currentDiff: currentDiffHuman?.toLowerCase()?.replace('+', 'Plus') ?? null,
        currentDiffHuman,
        diffs,
        song,
        diffChart: (getFirstRegexpMatch(/'difficulty',\s*([0-9.,\s]+)\s*\]/, document.body.innerHTML) ?? '').split(',').map(i => parseFloat(i)).filter(i => i),
        pageNum: parseInt(document.querySelector('.pagination .pagination-list li a.is-current')?.innerText ?? '0', 10),
        pageQty: parseInt(document.querySelector('.pagination .pagination-list li:last-of-type')?.innerText ?? '0', 10),
        totalItems: song?.scores ?? 0,
        scores
    }
    console.warn(props)

    const profileDiv = document.createElement('div');
    profileDiv.classList.add('sspl-page');
    container.prepend(profileDiv);

    // TODO: remove comments
    // const originalContent = document.querySelector('.content');
    // if (originalContent) originalContent.remove();

    return;

    new SongLeaderboard({
        target: tblContainer,
        props: {leaderboardId, country: await getActiveCountry()}
    });

    if (songInfoBox && songInfoData && songInfoData.hash && songInfoData.hash.length) {
        const newSongBox = document.createElement('div');
        newSongBox.style.marginBottom = '1.5rem';
        songInfoBox.parentNode.insertBefore(newSongBox, songInfoBox);

        const songCard = new SongCard({
            target: newSongBox,
            props: {...songInfoData, leaderboardId}
        });
        songCard.$on('initialized', e => {
            if (e.detail) songInfoBox.remove()
            else {
                newSongBox.remove();
                new SongIcons({target: songInfoBox, props: {hash: songInfoData.hash}});
            }
        });

        const ssConfig = await getConfig('ssSong');
        const songEnhanceEnabled = ssConfig && !!ssConfig.enhance;

        if (songEnhanceEnabled) {
            const scores = parseSsLeaderboardScores(document);
            if (scores) {
                let diffInfo = {diff: songInfoData.difficulty, type: 'Standard'};
                if (leaderboardId) {
                    const leaderboardScores = await getSongScores(leaderboardId);
                    if (leaderboardScores && leaderboardScores.length) diffInfo = leaderboardScores[0].diffInfo;
                }

                const maxScore = await getSongMaxScore(songInfoData.hash, diffInfo);
                scores.forEach(s => {
                    if (s.score) {
                        const score = s.tr.querySelector('td.score');
                        if (score) {
                            score.innerHTML = formatNumber(s.score, 0);
                        }
                    }

                    const percentage = s.tr.querySelector('td.percentage center');
                    if (percentage && s.score && maxScore && maxScore > 0) {
                        percentage.innerHTML = formatNumber(s.mods && s.mods.length && s.mods !== '-' && s.percent ? s.percent * 100 : s.score * 100 / maxScore) + '%';
                    }

                    if (s.pp !== null) {
                        const pp = s.tr.querySelector('td.pp .scoreTop.ppValue');
                        if (pp) {
                            pp.innerHTML = formatNumber(s.pp);
                        }
                    }
                });
            }
        }
    }

    log.info("Setup leaderboard page / Done")
}

async function setupProfile() {
    log.info("Setup profile page");

    const profileId = getProfileId();
    if (!profileId) return;

    // redirect to recent plays if auto-transform is enabled or transforming was requested

    // fix url search params
    let urlStr = window.location.href
    const urlMatches = /(.*)\/u\/(\d+)(.*?)$/.exec(urlStr);
    if (urlMatches && urlMatches[3] && urlMatches[3].length) {
        urlStr = urlMatches[1] + '/u/' + urlMatches[2] + (urlMatches[3][0] === '&' ? '?' + urlMatches[3].slice(1) : urlMatches[3]);
    }
    const url = new URL(urlStr);
    const urlParams = new URLSearchParams(url.search);

    const songBrowserConfig = await getConfig('songBrowser');
    const urlHasTransformParam = urlParams.has('transform');
    const autoTransform = await isPlayerDataAvailable(profileId) && ((songBrowserConfig && songBrowserConfig.autoTransform) || urlHasTransformParam);
    const isRecentPlaysPage = urlParams.get('sort') === '2';
    const pageNum = urlParams.has('page') ? parseInt(urlParams.get('page') ?? '1', 10) : 1;

    if (autoTransform && !isRecentPlaysPage) {
        window.location.href = getPlayerProfileUrl(profileId, true, urlHasTransformParam);
        return;
    }

    if (urlHasTransformParam) {
        urlParams.delete('transform');
        url.search = urlParams.toString();
        history.replaceState(null, '', url.toString());
    }

    const avatarCol = document.querySelector('.column.avatar');
    if (avatarCol) avatarCol.classList.add('enlarge')

    const usersConfig = await getConfig('users');
    if(usersConfig && usersConfig.main && usersConfig.main === profileId) avatarCol.classList.add('main')

    const tbl = document.querySelector('table.ranking');
    if(tbl) tbl.classList.add('sspl');

    const container = document.querySelector('.section .container');
    if (!container) return;

    const profileDiv = document.createElement('div');
    profileDiv.classList.add('sspl-page');
    container.prepend(profileDiv);

    const props = {
        profileId,
        profilePage: {...parseSsProfilePage(document), type: isRecentPlaysPage ? 'recent' : 'top', pageNum, playerId: profileId},
        autoTransform,
    }

    const originalContent = document.querySelector('.content');
    if (originalContent) originalContent.remove();

    new Profile({target: profileDiv, props})

    log.info("Setup profile page / Done")
}

async function setupCountryRanking(diffOffset = 6) {
    const country = getRankingCountry();
    if (!country) return; // not a country leaderboard page

    log.info("Setup country ranking");

    if(!(await isCurrentCountryRankingPage())) {
        const rankingTable = document.querySelector('table.ranking.global');
        if (!rankingTable) return;

        const pagination = rankingTable.parentNode.parentNode.querySelector('.pagination');
        if (!pagination) return;

        const setCountryDiv = document.createElement('div');
        setCountryDiv.style.fontSize = '.875rem';
        pagination.insertBefore(setCountryDiv, pagination.querySelector('br'));

        new SetCountry({target: setCountryDiv, props: {country}});

        return;
    }

    const cont = document.querySelector('body > .section > .container');
    if(!cont) {
        log.error("Setup country ranking / container not found")
        return;
    }

    const actualPlayersPp = convertArrayToObjectByKey(parseSsLeaderboardScores(document).map(s => ({playerId: s.playerId, pp: s.pp})), 'playerId');

    cont.classList.add('original');
    cont.style.display = 'none';
    cont.parentNode.style.position = 'relative';

    const newCont = document.createElement('main');
    newCont.classList.add('container-fluid');
    newCont.style.paddingTop = '1.75rem';
    cont.parentNode.appendChild(newCont);

    new CountryDashboard({target: newCont, props: {country: await getActiveCountry(), overridePlayersPp: actualPlayersPp}});

    log.info("Setup country ranking / Done")
}

function setupStyles() {
    log.info("Setup styles");

    const addStyles = GM_addStyle ? GM_addStyle : () => {};

    addStyles(require('./resource/style/style.css').toString());

    document.querySelector('head').innerHTML += '<link rel="stylesheet" href="https://scoresaber.com/imports/css/darkmode.css?v=1.0.3" type="text/css"/>';

    let theme = getThemeFromFastCache();
    if(!theme) theme = getSsDefaultTheme();

    setTheme(theme);

    return theme;
}

async function refinedThemeSetup(currentTheme) {
    const configOthers = await getConfig('others');
    if(configOthers && configOthers.theme && configOthers.theme !== currentTheme)
        setTheme(configOthers.theme);
}

async function setupPlayerAvatar() {
    log.info("Setup player avatar");

    const usersConfig = await getConfig('users');
    if (!usersConfig || !usersConfig.main) return;

    const navbarBurger = document.querySelector('.navbar-brand .navbar-burger')
    if(!navbarBurger) return;

    const cont = document.createElement('div');
    cont.classList.add('navbar-item');
    cont.classList.add('sspl-avatar');
    navbarBurger.parentNode.insertBefore(cont, navbarBurger)

    // set newest avatar taken from user profile
    const profileId = getProfileId();
    const url = usersConfig.main === profileId ? document.querySelector('.column.avatar img')?.src : null;

    new Avatar({target: cont, props: {playerId: usersConfig.main, url}});
    new Flag({target: cont, props: {country: await getActiveCountry()}});
}

async function setupTwitch() {
    await twitch.processTokenIfAvailable();
    await twitch.createTwitchUsersCache();
}

async function setupGlobalEventsListeners() {
    const reloadPage = () => window.location.reload();

    // reload page when data was imported
    eventBus.on('data-imported', reloadPage);

    eventBus.on('reload-browser-cmd', reloadPage);

    eventBus.on('player-twitch-linked', async ({playerId}) => {
        await twitch.updateVideosForPlayerId(playerId);
    });
}

function addVersionInfoToFooter() {
    const footer = document.querySelector('footer .content');
    if (!footer) return;

    const p = document.createElement('p');
    p.innerText = header.name;

    const a = document.createElement('a');
    a.href = header.updateURL;
    a.innerText = ' v' + header.version;

    p.append(a);
    p.innerHTML +=  ' by ' + header.author;

    footer.append(p);
}

async function setupDelayed() {
    initialized = true;

    if (isLeaderboardPage()) {
        await setupLeaderboard();
    }

    if (isProfilePage()) {
        await setupProfile();
    }

    await initDownloadManager();
    addVersionInfoToFooter();
}

function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve); //faster than set time out
    });
}

function checkElement(selector) {
    if (document.querySelector(selector) === null) {
        return rafAsync().then(() => checkElement(selector));
    } else {
        return Promise.resolve(true);
    }
}

let initialized = false;

async function init() {
    try {
        log.info("init");

        if (initialized) {
            return;
        }

        new Message({
            target: document.body,
        });

        await initDatabase();

        await setupDataFixes();

        // pre-warm cache
        await getConfig();
        await getSsplCountryRanks();

        await Promise.allSettled(
            [
                refinedThemeSetup(),
                setLangFromConfig(),
                setupGlobalEventsListeners(),
                setupCountryRanking(),
                setupPlayerAvatar(),
                setupTwitch(),
            ]
        )

        await setupDelayed();

        log.info("Setup complete");
    }
    catch (e) {
        console.error(e);
    }
}

// setup styles as fast as possible
setupStyles();

document.addEventListener('DOMContentLoaded', init);