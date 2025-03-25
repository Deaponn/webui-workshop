import {Observable} from '/js/src/index.js';

export default class Home extends Observable {
  constructor(model) {
    super();

    this.details = {};
    this.requestedTimes = 0;
    
    this.setDetails("session", JSON.stringify({...model.session, token: `${model.session.token.substring(0, 20)}...`}));
  }

  setDetails(key, content) {
    this.details[key] = content;
    this.notify();
  }

  getDetails() {
    this.requestedTimes++;
    return this.details;
  }

  getRequestedTimes() {
    return this.requestedTimes;
  }
}
