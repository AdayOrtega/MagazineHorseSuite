import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'd92zmtgh',
    dataset: 'production'
  },
  deployment: {
    appId: 'm46fo6ysi7xsycwu8tc572v2',

    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
