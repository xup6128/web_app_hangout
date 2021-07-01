<template>
    <div>
        <el-dialog title="圖片剪裁" :visible.sync="dialogVisible" append-to-body>
        <div class="cropper-content">
            <div class="cropper" style="text-align:center">
            <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :autoCrop="option.autoCrop"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :centerBox="option.centerBox"
                :infoTrue="option.infoTrue"
                :fixedBox="option.fixedBox"
            ></vueCropper>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="finish" :loading="loading">確認</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import VueCropper from 'vue-cropper'

    export default {
        name:'cropper',
        data() {
            return {
                // 裁剪元件的基礎配置option
                option: {
                    img: '', // 裁剪圖片的地址
                    info: true, // 裁剪框的大小資訊
                    outputSize: 0.8, // 裁剪生成圖片的質量
                    outputType: 'jpeg', // 裁剪生成圖片的格式
                    canScale: true, // 圖片是否允許滾輪縮放
                    autoCrop: true, // 是否預設生成截圖框
                    autoCropWidth: 600, // 預設生成截圖框寬度
                    autoCropHeight: 300, // 預設生成截圖框高度
                    fixedBox: false, // 固定截圖框大小 不允許改變
                    fixed: false, // 是否開啟截圖框寬高固定比例
                    fixedNumber: [7, 5], // 截圖框的寬高比例
                    full: true, // 是否輸出原圖比例的截圖
                    canMoveBox: true, // 截圖框能否拖動
                    original: true, // 上傳圖片按照原始比例渲染
                    high: true,
                    centerBox: true, // 截圖框是否被限制在圖片裡面
                    infoTrue: true // true 為展示真實輸出圖片寬高 false 展示看到的截圖框寬高
                },
                picsList: [],  //頁面顯示的陣列
                // 防止重複提交
                loading: false,
                dialogVisible:false,        // 控制彈框的顯示
                fileinfo:[],      
                RequestSource:'',           // oss直傳源地址
                baseurl:'',                 // 裁剪後的base64地址
                isVictory:false,        // 識別使用者是點否關閉
            }
        },
        components:{VueCropper},
        created() {
            this.$on('is-Show',this.isShow);
        },
        methods:{
            isShow(file){
                this.fileinfo = file;
                // 傳遞需要剪裁的地址 以彈框形式開啟
                this.$nextTick( () => {
                    this.option.img = file.url;
                    this.dialogVisible = true;
                    this.handlePostSuccess(file.url);
                })
            },
            // 關閉圖片剪裁
            cancel() {
                this.dialogVisible = false;
                // 點選取消時 去除已經回顯的圖片
                this.$parent.dislodge(this.fileinfo);
            },
            // 確認剪裁後觸發
            finish() {
                this.$refs.cropper.getCropData((data) => {
                    this.baseurl = data;
                    //將剪裁後base64的圖片轉化為file格式
                    let file = this.convertBase64UrlToBlob(data)
                    file.name = this.fileinfo.name
                    // <!--let file = URL.createObjectURL(data).match(/[^blob:]+/g).join('');-->
                    this.Directpass(this.RequestSource,file).then( (res) => {
                        if (res.status === 200) {
                            this.$parent.handleSuccess({
                                uid:this.fileinfo.uid,
                                imgUrl:res.config.url.split('?')[0]
                            });
                            this.dialogVisible = false;
                            this.isVictory = true;
                            this.loading = true;
                            this.$message('上傳成功!');
                            // 防止使用者不上傳圖片 點選關閉時 不能及時刪除回顯的問題
                            setTimeout(() => {
                                this.isVictory = false;
                            },1000)
                        }
                    })
                    
                })
            },
            Directpass(url,file){
                return new Promise( (resolve,reject) => {
                axios.put(url,file,{headers:{"x-oss-meta-author":"deshe","Content-Type":"application/octet-stream"}}).then( (res) => {
                    resolve(res)
                })
            })
        },
        // 將base64的圖片轉換為file檔案
        convertBase64UrlToBlob(urlData) {
            let bytes = window.atob(urlData.split(',')[1]);//去掉url的頭，並轉換為byte
            //處理異常,將ascii碼小於0的轉換為大於0
            let ab = new ArrayBuffer(bytes.length);
            let ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], { type: 'image/jpeg' });
        }
    },
    watch:{
        dialogVisible() {
            if (!this.dialogVisible && !this.isVictory) {
                this.loading = false
                // 點選關閉時 去除已經回顯的圖片
                this.$parent.dislodge(this.fileinfo);
            } else {
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped lang="less">
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
</style>