import { reactive, toRefs } from "vue";

const state = reactive({
  selectedCurrencyState: "",
});

export default function useTodos() {
  const fetchTodos = () => {
    if (localStorage.currency) {
      return;
    } else {
      state.selectedCurrencyState = "eur";
    }
  };

  return {
    ...toRefs(state), // convert to refs when returning
    fetchTodos,
  };
}
