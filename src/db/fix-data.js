import keyValueRepository from './repository/key-value';
import log from '../utils/logger';
import {db} from './db'
import {getConfig, setConfig} from '../plugin-config'

const FIXES_KEY = 'data-fix';

const getAppliedFixes = async () => keyValueRepository().get(FIXES_KEY, true);
const storeAppliedFixes = async fixes => keyValueRepository().set(fixes, FIXES_KEY);

const allFixes = {
  'rankeds-20201129': {
    validTo: new Date(2021, 0, 1),
    apply: async () => {
      log.info('Apply rankeds dl fix (20201129)')

      return db.runInTransaction(['rankeds-changes', 'rankeds', 'key-value'], async tx => {
        let cursor = await tx.objectStore('rankeds-changes').index('rankeds-changes-timestamp').openCursor(IDBKeyRange.lowerBound(1606646160000));

        const leaderboardsIds = [];

        // delete rankeds-changes after 2020-11-29, needs to be refeched together with updated scores
        while (cursor) {
          await cursor.delete();

          if (cursor.value.leaderboardId) leaderboardsIds.push(cursor.value.leaderboardId);

          cursor = await cursor.continue();
        }

        let store = tx.objectStore('rankeds');
        await Promise.all(leaderboardsIds.map(leaderboardId => store.delete(leaderboardId)));

        store = tx.objectStore('key-value')
        const allAppliedFixes = await store.get(FIXES_KEY) ?? [];
        allAppliedFixes.push('rankeds-20201129');
        await store.put(allAppliedFixes, FIXES_KEY);
      });
    },
  },

  'config-chart-20210108': {
    apply: async () => {
      log.info('Apply config showChart fix (20210108)');

      const config = await getConfig();
      if (config && config.profile) {
        config.profile.showChart = config.profile.showChart === true ? 'rank' : (config.profile.showChart === false ? 'none' : config.profile.showChart);
        await setConfig(config);
      }

      const allAppliedFixes = await getAppliedFixes() ?? [];
      allAppliedFixes.push('config-chart-20210108');
      await storeAppliedFixes(allAppliedFixes);
    }
  }
};

export const setupDataFixes = async () => {
  const appliedFixes = await getAppliedFixes() ?? [];
  const neededFixes = Object.keys(allFixes).filter(f => !appliedFixes.includes(f) && (!allFixes[f].validTo || allFixes[f].validTo > new Date()));

  if (!neededFixes.length) return;

  for (let key of neededFixes) {
    await allFixes[key].apply();
  }
}