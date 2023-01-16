import { defineStore } from 'pinia'

export const useDataStore = defineStore({
  id: 'site-store',
  state: () => {
    return {
      currentObservedProject: 0,
      selectedCurrencyState: 'eur',
      prismicData: {}
    }
  },
  actions: {
    changeObservedProject (el) {
      this.currentObservedProject = el
    },
    updateCurrency () {
      if (process.client) {
        if (localStorage.currency) {
          this.changeCurrencyState(localStorage.currency)
        } else {
          this.changeCurrencyState('eur')
        }
      } else {
        return
      }
    },
    changeCurrencyState (el) {
      this.selectedCurrencyState = el
    },
    updatePrismicData (el) {
      this.prismicData = el
    }
  },
  getters: {
    getCurrentObserved: state => state.currentObservedProject,
    getSelectedCurrency: state => state.selectedCurrencyState,
    getPrismicData: state => state.prismicData
  }
})
