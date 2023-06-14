Vue.use(window['vue-cropper'])
const app = new Vue({
   el: '#app',
      data: {
        model: false,
        modelSrc: '',
        crap: false,
        previews: {},
        lists: [
          {
            img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4'
          }
        ],
        option: {
          img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 750,
          autoCropHeight: 340,
          centerBox: true,
          high: true,
          max: 99999
        },
        show: true,
        fixed: false,
        fixedNumber: [16, 9]
      },
      components: {
      },
      methods: {
        changeImg() {
          this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
        },
        startCrop() {
          // start
          this.crap = true
          this.$refs.cropper.startCrop()
        },
        stopCrop() {
          //  stop
          this.crap = false
          this.$refs.cropper.stopCrop()
        },
        clearCrop() {
          // clear
          this.$refs.cropper.clearCrop()
        },
        refreshCrop() {
          // clear
          this.$refs.cropper.refresh()
        },
        changeScale(num) {
          num = num || 1
          this.$refs.cropper.changeScale(num)
        },
        rotateLeft() {
          this.$refs.cropper.rotateLeft()
        },
        rotateRight() {
          this.$refs.cropper.rotateRight()
        },
        finish(type) {
          // 输出
          // var test = window.open('about:blank')
          // test.document.body.innerHTML = '图片生成中..'
          if (type === 'blob') {
            this.$refs.cropper.getCropBlob((data) => {
              console.log(data);
              var img = window.URL.createObjectURL(data)
              this.model = true
              this.modelSrc = img
            })
          } else {
            this.$refs.cropper.getCropData((data) => {
              this.model = true
              this.modelSrc = data
            })
          }
        },
        // 实时预览函数
        realTime(data) {
          this.previews = data
          console.log(data)
        },

        finish2(type) {
          this.$refs.cropper2.getCropData((data) => {
            this.model = true
            this.modelSrc = data
          })
        },
        finish3(type) {
          this.$refs.cropper3.getCropData((data) => {
            this.model = true
            this.modelSrc = data
          })
        },
        down(type) {
          // event.preventDefault()
          var aLink = document.createElement('a')
          aLink.download = 'demo'
          // 输出
          if (type === 'blob') {
            this.$refs.cropper.getCropBlob((data) => {
              this.downImg = window.URL.createObjectURL(data)
              aLink.href = window.URL.createObjectURL(data)
              aLink.click()
            })
          } else {
            this.$refs.cropper.getCropData((data) => {
              this.downImg = data
              aLink.href = data
              aLink.click()
            })
          }
        },

        uploadImg(e, num) {
          //上传图片
          // this.option.img
          var file = e.target.files[0]
          if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
            return false
          }
          var reader = new FileReader()
          reader.onload = (e) => {
            let data
            if (typeof e.target.result === 'object') {
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL(new Blob([e.target.result]))
            } else {
              data = e.target.result
            }
            if (num === 1) {
              this.option.img = data
            } else if (num === 2) {
              this.example2.img = data
            }
          }
          // 转化为base64
          // reader.readAsDataURL(file)
          // 转化为blob
          reader.readAsArrayBuffer(file)
        },
        imgLoad(msg) {
          console.log(msg)
        },
        cropMoving(data) {
          console.log(data, '截图框当前坐标')
        }
      },
  mounted: function () {
    // console.log(window['vue-cropper'])
  }
  
})