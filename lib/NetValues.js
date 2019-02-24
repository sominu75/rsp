class NetValues{
    constructor() {

    }
    static get REQ_OK(){
        return 1;
    }
    static get REQ_NO(){
        return 0;
    }
    static get REQ_LOGOUT(){
        return -1;
    }
    static get REQ_DB_ERROR(){
        return -2;
    }
    static get REQ_NOT_IS_ID(){
        return 2;
    }
    static get ADD_DB(){
      return 0;
    }
    static get DELETE_DB(){
      return 1;
    }
    static get UPDATE_DB(){
      return 2;
    }
}
module.exports = NetValues;
