<template>
    <div>
        <div class="actions">
            <input type="file" id="upload" accept="image/jpeg,image/png" value="" />
            <hr>
            <div class="crop">
                <div class="box tailoring-box">
                    <img id="tailoringImg" src="">
                </div>

                圖片預覽：

                <div class="box preview">
                    <div id="previewImg"></div>
                </div>

                <button id="sureCut">裁剪</button>
            </div>
        </div>

        <div class="result">
            裁切壓縮後：
            <p></p>
            <span></span>
            <input type="hidden">
            <img id="newImg" src="">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.actions .crop .box {
  margin: 14px 4px;
  border: solid 1px #ddd;
}
.actions .crop .box.tailoring-box {
  width: 400px;
  height: 300px;
}
.actions .crop .box.preview {
  width: 400px;
  height: 200px;
}
.actions .crop .box #previewImg {
  width: 100%;
  height: 200px;
  margin: auto;
  overflow: hidden;
}
.result {
  display: none;
}
</style>