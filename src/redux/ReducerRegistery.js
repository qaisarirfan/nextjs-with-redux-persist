// This class holds our active reducers.
// When a reducer is imported somewhere in code it gets automatically added to the store.

export class ReducerRegistery {
  constructor() {
    this.emitChange = null;
    this.reducers = {};
  }

  getReducers() {
    return { ...this.reducers };
  }

  register(name, reducer) {
    if (this.reducers[name]) return; // Skip if the reducer already exists

    this.reducers = { ...this.reducers, [name]: reducer };

    if (this.emitChange) this.emitChange(this.getReducers());
  }

  setChangeListener(listener) {
    this.emitChange = listener;
  }
}

const reducerRegistery = new ReducerRegistery();

export default reducerRegistery;
