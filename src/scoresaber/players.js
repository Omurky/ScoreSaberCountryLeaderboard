import {getAdditionalPlayers} from "../network/scoresaber/players";
import tempConfig from '../temp';
import {getCacheAndConvertIfNeeded} from "../store";
import {getFilteredRankedChanges, getRankedSongs} from "./rankeds";
import {NEW_SCORESABER_URL, PLAYS_PER_PAGE, SCORESABER_URL, USER_PROFILE_URL} from "../network/scoresaber/consts";
import {substituteVars} from "../utils/format";
import {dateFromString} from "../utils/date";
import {isEmpty} from "../utils/js";
import {getMainPlayerId} from "../plugin-config";

export const getActiveCountry = async () => 'pl';

export const isActiveCountryPlayer = (u, country) => u && !!u.ssplCountryRank && !!u.ssplCountryRank[country] && (getAdditionalPlayers(country).includes(u.id) || u.country.toLowerCase() === country.toLowerCase());

export const getActiveCountryPlayers = async (country, withMain = false) => {
    const players = (await getPlayers()) ?? {};
    const mainPlayerId = withMain ? await getMainPlayerId() : null;
    return Object.values(players).filter(p => (mainPlayerId && p.id === mainPlayerId) || isActiveCountryPlayer(p, country))
}
export const getActiveCountryPlayersIds = async (country, withMain = false) => (await getActiveCountryPlayers(country, withMain)).map(p => p.id);

export const mapPlayersToObj = (playerIds, players) => playerIds.reduce((cum, playerId) => {
    cum[playerId] = players[playerId] ?? {};
    return cum;
}, {})

export const getCountryRanking = async (country) => {
    const players = await getActiveCountryPlayers(country);
    return players ? players.sort((a,b) => b.pp - a.pp).slice(0, tempConfig.COUNTRY_PLAYERS_QTY) : null;
}

export const isDataAvailable = async () => !isEmpty(await getPlayers());

export const getPlayers = async () => (await getCacheAndConvertIfNeeded())?.users;

export const getPlayerInfo = async playerId => (await getPlayers())?.[playerId] ?? null;

export const getPlayerLastUpdated = async playerId => (await getPlayerInfo(playerId))?.lastUpdated ?? null;
export const getPlayerProfileLastUpdated = async playerId => (await getPlayerInfo(playerId))?.profileLastUpdated ?? null;

export const getPlayerGroups = async () => (await getCacheAndConvertIfNeeded())?.groups ?? null;

export const addPlayerToGroup = async (playerId, groupId = 'default', groupName = 'Default') => {
    const data = await getCacheAndConvertIfNeeded();
    if (!data?.groups) data.groups = {};

    const groups = data.groups;
    if(!groups[groupId]) groups[groupId] = {name: groupName, players: []};

    groups[groupId].players = [...new Set(groups[groupId].players.concat([playerId]))];
}

export const removePlayerFromGroup = async (playerId, groupId = 'default') => {
    const data = await getCacheAndConvertIfNeeded();
    if (!data?.groups?.[groupId]?.players) return;

    data.groups[groupId].players = data.groups[groupId].players.filter(pId => pId !== playerId);
    if (data?.users?.[playerId]) delete data.users[playerId];
}

export const getGroupPlayerIds = async (groupId) => (await getPlayerGroups())?.[groupId] ?? null;

export const getManuallyAddedPlayersIds = async (country, withMain = false) => {
    const groups = await getPlayerGroups();
    if (!groups) return [];

    const players = await getPlayers();

    return [...new Set(
      Object.keys(groups)
        .reduce((cum, groupId) => cum.concat(groups[groupId].players), [])
        .filter(playerId => !isActiveCountryPlayer(players?.[playerId] ?? null, country))
        .concat(withMain ? [await getMainPlayerId()] : [])
        .filter(playerId => playerId)
    )];
}

export const getManuallyAddedPlayers = async (country, withMain = false) => Object.values(mapPlayersToObj(await getManuallyAddedPlayersIds(country, withMain), await getPlayers()));

export const getAllActivePlayersIds = async (country) => [...new Set((await getActiveCountryPlayersIds(country)).concat(await getManuallyAddedPlayersIds(country)))];

export const getAllActivePlayers = async (country) => Object.values(mapPlayersToObj(await getAllActivePlayersIds(country), await getPlayers()));

export const getPlayerProfileUrl = playerId => substituteVars(USER_PROFILE_URL, {userId: playerId})

export const getPlayerAvatarUrl = async playerId => {
    if (!playerId) return null;

    const playerInfo = await getPlayerInfo(playerId);
    return playerInfo && playerInfo.avatar ? (playerInfo.avatar.startsWith('http') ? playerInfo.avatar : NEW_SCORESABER_URL + playerInfo.avatar) : null;
}

export const getPlayerScores = async playerId => {
    const playerInfo = await getPlayerInfo(playerId);
    return playerInfo && playerInfo.scores ? playerInfo.scores : null;
}

export const getPlayerRankedScores = async playerId => {
    const scores = await getPlayerScores(playerId);
    const rankedMaps = await getRankedSongs();
    return scores
        ? Object.values(scores)
            .filter(s => s.pp > 0)
            .filter(s => rankedMaps?.[s.leaderboardId])
        : [];
}

export const getPlayerSongScore = async (playerId, leaderboardId) => {
    const score = (await getPlayerScores(playerId))?.[leaderboardId];

    return score ? score : null;
}

const getPlayerRankedsToUpdate = async (scores, previousLastUpdated) => {
    const songsChangedAfterPreviousUpdate = await getFilteredRankedChanges(timestamp => timestamp >= previousLastUpdated);

    // check all song changed after previous update
    return Object.keys(songsChangedAfterPreviousUpdate).reduce((cum, leaderboardId) => {
        // skip if the player didn't play the song
        if (!scores[leaderboardId]) return cum;

        const songLastPlayTimestamp = dateFromString(scores[leaderboardId].timeset).getTime();

        // skip if song was played AFTER previous update (because all new scores were downloaded with current update, changed or not)
        if (songLastPlayTimestamp > previousLastUpdated) return cum;

        // mark song to update
        cum.push(parseInt(leaderboardId, 10));

        return cum;
    }, [])
}

export const getPlayerRankedsScorePagesToUpdate = async (scores, previousLastUpdated) => {
    const songsToUpdate = await getPlayerRankedsToUpdate(scores, previousLastUpdated);
    if (!songsToUpdate.length) return {};

    return Object.values(scores)
        .map((s) => ({
            leaderboardId: s.leaderboardId,
            timeset: dateFromString(s.timeset)
        }))
        .sort((a, b) => b.timeset.getTime() - a.timeset.getTime())
        .reduce((cum, s, idx) => {
            if (songsToUpdate.includes(s.leaderboardId)) {
                const page = Math.floor(idx / PLAYS_PER_PAGE) + 1;
                cum[page] = (cum && cum[page] ? cum[page] : []).concat([
                    s.leaderboardId
                ]);
            }
            return cum;
        }, {});
}