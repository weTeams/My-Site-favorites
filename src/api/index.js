//输出通用axios实例
import axios from 'axios';

const instance = axios.create({
  timeout: 10000,
   headers: {
    'Content-Type': "application/json;charset=utf-8"
  }
});

const ins_formdata = axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'multipart/form-data;' },
});

export default {

  //博客版本※※※※※※※※※※※※※※※※※※※※※※※※※※※

  //获得所有博客
  getAllBlog () {
    return instance.get('/api2/blogs/getAllBlog');
  },

  //获得所有博客的导览图片  data是id
  getHead (data) {
    return instance.get('/api2/blogs/getAllBlog',data);
  },

  //添加博客
  addNewBlog ( data ) {
    return instance.post('/api2/blogs/addNewBlog', data);
  },
  addNewBlog2 ( data ) {
    return ins_formdata.post('/api2/blogs/addNewBlog', data);
  },

  //根据id读取博客
  getBlog ( data ) {
    return instance.post('/api2/blogs/getBlog', data);
  },


  //※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
  getFeiyanData (){
    return instance.get('Feiyanapi/api?version=epidemic&appid=28936334&appsecret=jQmv77wE');
  },

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
