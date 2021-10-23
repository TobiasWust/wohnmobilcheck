export const handleInput = (event, state) => {
  state[1]({ ...state[0], [event.target.id]: event.target.value });
};

export default handleInput;
