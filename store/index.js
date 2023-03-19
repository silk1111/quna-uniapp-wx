import Vue from "vue";
import Vuex from 'vuex'
import state from "./state";
import mutations from "./mutations";
Vue.use(Vuex)

export default new Vuex.Store({
    state,//对state进行拆分，将与默认值相关的代码均放入state中
    // actions:{
    //     changeCity(ctx, city){
    //         // console.log(ctx,city);
    //         ctx.commit('changeCity', city)
            
    //     }
    // },
    mutations
})