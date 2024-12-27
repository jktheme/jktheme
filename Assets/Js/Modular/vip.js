//////////////////////VIPS页面顶部设计/////////////////////////////
var Myvips = new Vue({
    el: '#ict-lmyvips',
    data: {
        vips_tian: '',
        b2token: false,
    },
    mounted() {
        // if(this.$refs.tian){
        //     this.user_info()
        // }
        this.b2token = b2token;
        this.$http.post(b2_rest_url + 'getlmyVips').then(res => {
            this.vips_tian = res.data
        }).catch((e) => {
            console.log('获取数据失败');
        });
    },
    methods: {

    }
})