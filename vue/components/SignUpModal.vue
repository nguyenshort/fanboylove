<template>
  <div id="form-sign-up" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="sign-up" class="login">
            <h3>
              <a href="/" title="Madara Demo" tabindex="-1">Đăng Ký</a>
            </h3>
            <p class="message register">
              {{ error }}
            </p>
            <form
              id="registerform"
              name="registerform"
              novalidate="novalidate"
              @submit.prevent="signUp()"
            >
              <p>
                <label>Tên Hiển Thị * <br >
                  <input
                    v-model="name"
                    type="text"
                    name="user_sign-up"
                    class="input user_login"
                    value=""
                    size="20"
                  >
                </label>
              </p>
              <p>
                <label>Email * <br >
                  <input
                    v-model="email"
                    type="email"
                    name="email_sign-up"
                    class="input user_email"
                    value=""
                    size="20"
                  >
                </label>
              </p>
              <p>
                <label>Mật Khẩu *<br >
                  <input
                    v-model="password"
                    type="password"
                    name="pass_sign-up"
                    autocomplete=""
                    class="input user_pass"
                    value=""
                    size="25"
                  >
                </label>
              </p>
              <p />

              <p class="submit">
                <input
                  type="submit"
                  name="wp-submit"
                  class="button button-primary button-large wp-submit"
                  value="Đăng Ký"
                >
              </p>
            </form>
          </div>
        </div>
        <div class="modal-footer" />
      </div>
    </div>
  </div>
</template>

<script>
import { SIGN_UP } from '../graphql/mutations'

export default {
  name: 'SignUpModal',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isLoading: false,
      error: ''
    }
  },
  methods: {
    async signUp() {
      if (!this.name || !this.email || !this.password) {
        this.error = 'Vui lòng điền đầy đủ thông tin'
        return false
      }
      this.isLoading = true
      try {
        const {
          data: { signupUser }
        } = await this.$apollo.mutate({
          mutation: SIGN_UP,
          variables: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        })
        window.Cookies.set('_token', signupUser.token)
        window.location.reload()
      } catch (e) {
        this.error = 'Kiểm Tra Lại Thông Tin Của Bạn'
      }
      this.isLoading = false
    }
  }
}
</script>
