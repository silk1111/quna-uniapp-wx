export default {
    changeCity(state,city){
        state.city = city;
        try {
			uni.setStorage({
				key:'city',
				data:city
			})
        } catch (error) {
            console.log(error);
            
        }
    }
}