<template>
  <div id="form-account-settings">
    <div class="tab-group-item">
      <div class="tab-item">
        <div class="choose-avatar">
          <div class="c-user-avatar">
            <img
              alt=""
              :src="form.avatar || userData.avatar"
              class="avatar avatar-195 photo"
              height="195"
              width="195"
            />
          </div>
        </div>
        <div class="form form-choose-avatar">
          <div class="select-flie">
            <!--Update Avatar -->
            Nhấp để tải lên
            <label class="select-avata">
              <input type="file" name="wp-manga-user-avatar" @change="openCropImage($event)" >
              <span class="file-name" />
            </label>
            <input
              id="wp-manga-upload-avatar"
              type="submit"
              value="Cập Nhật"
              name="wp-manga-upload-avatar"
              :disabled="!form.avatar || isLoading"
              @click.prevent="updateInfo('avatar', form.avatar)"
            />
          </div>
        </div>
      </div>

      <div class="tab-item">
        <div class="settings-title">
          <h3>Tên Hiển Thị</h3>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Tên Hiện Tại</label>
          <div class="col-md-9">
            <span class="show">{{ userData.name }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Tên Mới</label>
          <div class="col-md-9">
            <input
              v-model="form.name"
              autocomplete="off"
              class="form-control"
              type="text"
              name="user-new-name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="name-input-submit" class="col-md-3" />
          <div class="col-md-9">
            <input
              id="name-input-submit"
              :disabled="!form.name || isLoading"
              type="submit"
              class="form-control"
              value="Xác Nhận"
              name="account-form-submit"
              @click.prevent="updateInfo('name', form.name)"
            >
          </div>
        </div>
      </div>

      <div class="tab-item">
        <div class="settings-title">
          <h3>Email Đăng Ký</h3>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Email Hiện Tại</label>
          <div class="col-md-9">
            <span class="show">{{ userData.email }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3">Email Mới</label>
          <div class="col-md-9">
            <input
              v-model="form.email || isLoading"
              autocomplete="off"
              class="form-control"
              type="text"
              name="user-new-name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="name-input-submit" class="col-md-3" />
          <div class="col-md-9">
            <input
              :disabled="!form.email || isLoading"
              autocomplete="off"
              type="submit"
              class="form-control"
              value="Xác Nhận"
              name="account-form-submit"
              @click.prevent="updateInfo('email', form.email)"
            />
          </div>
        </div>
      </div>

      <div class="tab-item">
        <div class="settings-title">
          <h3>Đổi Mật Khẩu</h3>
        </div>

        <div class="form-group row">
          <label for="currrent-password-input" class="col-md-3">Mật khẩu hiện tại</label>
          <div class="col-md-9">
            <input
              id="currrent-password-input"
              v-model="form.currentPass"
              class="form-control"
              type="password"
              value=""
              name="user-current-password"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="new-password-input" class="col-md-3"> Mật Khẩu Mới </label>
          <div class="col-md-9">
            <input
              id="new-password-input"
              v-model="form.password"
              class="form-control"
              type="password"
              value=""
              name="user-new-password"
            >
          </div>
        </div>
        <div class="form-group row">
          <label for="comfirm-password-input" class="col-md-3"> Xác Nhận Mật Khẩu </label>
          <div class="col-md-9">
            <input
              id="comfirm-password-input"
              v-model="form.rePass"
              class="form-control"
              type="password"
              value=""
              name="user-new-password-confirm"
            >
            <span id="password-strength" />
          </div>
        </div>
        <div class="form-group row">
          <label for="password-input-submit" class="col-md-3" />
          <div class="col-md-9">
            <input
              id="password-input-submit"
              class="form-control"
              type="submit"
              value="Thay Đổi"
              name="account-form-submit"
              :disabled="
                form.currentPass.length < 6 ||
                form.password < 6 ||
                form.password !== form.rePass ||
                isLoading
              "
              @click.prevent="updatePassword()"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="crop-avatar-modal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>Cắt Ảnh Của Bạn</h3>
            <div id="crop-avatar">
              <vue-cropper
                v-if="showCrop"
                id="cropImage"
                ref="cropper"
                :src="upload.avatar"
                output-type="jpg"
                :crop-box-resizable="false"
                :toggle-drag-mode-on-dblclick="false"
                :drag-mode="'move'"
                :aspect-ratio="1"
                :view-mode="1"
                :crop-box-movable="false"
              />
            </div>
            <div class="list-button d-flex justify-content-center mt-3">
              <div class="crop-butotn-action" @click="$refs.cropper.rotate(-90)">
                <i class="fas fa-undo" />
              </div>
              <div class="crop-butotn-action" @click="$refs.cropper.relativeZoom(-0.2)">
                <i class="fas fa-search-minus" />
              </div>
              <div class="crop-butotn-action" @click="$refs.cropper.relativeZoom(0.2)">
                <i class="fas fa-search-plus" />
              </div>
              <div class="crop-butotn-action" @click="$refs.cropper.rotate(90)">
                <i class="fas fa-undo" />
              </div>
            </div>
          </div>
          <div class="modal-footer pb-2">
            <input
              type="submit"
              value="Cắt Ảnh"
              name="wp-manga-upload-avatar"
              class="crop-button"
              :disabled="isLoadingImage"
              @click="cropAvatar()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CHANGE_PASS, USER_SETTINGS } from '../../graphql/mutations'

export default {
  name: 'AccountSetting',
  props: ['user'],
  data() {
    return {
      userData: JSON.parse(this.user),
      form: {
        name: '',
        email: '',
        avatar: '',
        password: '',
        currentPass: '',
        rePass: ''
      },
      upload: {
        avatar: ''
      },
      isLoading: false,
      isLoadingImage: false,
      showCrop: false
    }
  },
  methods: {
    async updateInfo(key, value) {
      this.isLoading = true
      try {
        const {
          data: { userSettings }
        } = await this.$apollo.mutate({
          mutation: USER_SETTINGS,
          variables: {
            key,
            value
          }
        })
        this.userData = Object.assign({}, this.userData, userSettings)
      } catch (e) {
        // lỗi
      }
      this.isLoading = false
    },

    async updatePassword() {
      this.isLoading = true
      try {
        await this.$apollo.mutate({
          mutation: CHANGE_PASS,
          variables: {
            oldPass: this.form.currentPass,
            newPass: this.form.password
          }
        })
      } catch (e) {}
      this.isLoading = false
    },

    openCropImage($event) {
      this.showCrop = false
      this.upload.avatar = URL.createObjectURL($event.target.files[0])
      window.$('#crop-avatar-modal').modal('show')
      setTimeout(() => {
        this.showCrop = true
      }, 400)
    },

    cropAvatar() {
      this.$refs.cropper.getCroppedCanvas().toBlob((data) => {
        if (!data) {
          return false
        } else {
          this.isLoadingImage = true
          const formData = new FormData()
          formData.append('image', data)
          formData.append('pathName', `users/${this.userData._id}/avatar`)
          formData.append('type', 'user-avatar')
          this.$http
            .post('/upload/single', formData)
            .then(({ data }) => {
              this.form.avatar = data.data
              window.$('#crop-avatar-modal').modal('hide')
            })
            .catch()
            .finally(() => {
              this.isLoadingImage = false
            })
        }
      })
    }
  }
}
</script>
