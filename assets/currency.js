// import { reactive, toRefs } from "vue";

const selectedCurrencyState = ref('')

export default function useCurrency () {
  const fetchCurrency = () => {
    if (process.client) {
      // console.log(localStorage)
      if (localStorage.currency) {
        return
      } else {
        selectedCurrencyState.value = 'eur'
      }
    } else {
      selectedCurrencyState.value = 'eur'
    }
  }

  return {
    selectedCurrencyState, // convert to refs when returning
    fetchCurrency
  }
}
