//输出通用axios实例
import axios from 'axios';

const instance = axios.create({
  timeout: 10000,
   headers: {
    'Content-Type': "application/json;charset=utf-8"
  }
});

export default {
  userLogin ( data ) {
    return instance.post('/api2/users/login', data);
  },
  getallURL () {
    return instance.get('/api2/sites/getallURL');
  },
  getHead (data) {
    return instance.get('/api2/users/download',data);
  },
  addNewUrl ( data ) {
    return instance.post('/api2/sites/addNewUrl', data);
  },
  deleteUrl ( data ) {
    return instance.post('/api2/sites/deleteURL', data);
  },


  allUser () {
    return instance.post('/api2/users');
  },
  allProduct () {
   return instance.post('/api/product')
  },
  upload (data) {
    return instance.post('/api/upload',data)
  },
  regist (data){
  	return instance.post('/api/createOrUpdateUser',data)
  }
};
