let defaultCity = '上海';
try {
   
	uni.getStorage({
		key: 'city',
		success: function (res) {
			//console.log('成功读取city',res.data)
			defaultCity = res.data;
		}
	});
} catch (error) {
    console.log(error);
    
}
export default {
    city:defaultCity
};