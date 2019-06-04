class Utill {
  constructor() {
    // this.MAX = 60 * 60 * 1000;
    this.MAX = -1;
  }
  timeCheck(count_time, now_time) {
    count_time = parseInt(count_time);
    now_time = parseInt(now_time);
    let t = count_time - now_time;
    if (t > this.MAX || this.MAX == -1) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = Utill;
