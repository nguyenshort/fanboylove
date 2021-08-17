<template>
  <div id="form-login" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="login" class="login">
            <h3>
              <a href="/" title="Madara Demo" tabindex="-1"> Đăng Nhập </a>
            </h3>
            <p class="message login">
              {{ error }}
            </p>
            <form id="loginform" name="loginform" method="post" @submit.prevent="login()">
              <p>
                <label>Tên tài khoản * <br >
                  <input v-model="email" type="text" name="log" class="input user_login" value="" size="20" />
                </label>
              </p>
              <p>
                <label>Mật khẩu * <br >
                  <input v-model="password" type="password" autocomplete="" name="pwd" class="input user_pass" value="" size="20" />
                </label>
              </p>
              <p />
              <p class="submit">
                <input type="submit" name="wp-submit" class="button button-primary button-large wp-submit" value="Đăng Nhập" />
              </p>
            </form>
            <p class="nav">
              <a href="javascript:void(0)" class="to-reset">Quên Mật Khẩu?</a>
            </p>
            <p class="backtoblog">
              <a href="javascript:void(0)">← Quay Lại</a>
            </p>
          </div>
        </div>
        <div class="modal-footer" />
      </div>
    </div>
  </div>
</template>

<script>
import { SIGN_IN } from '../../graphql/mutations'

export default {
  name: 'LoginModal',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      error: ''
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        return false
      }
      this.isLoading = true
      try {
        const {
          data: { signinUser }
        } = await this.$apollo.mutate({
          mutation: SIGN_IN,
          variables: {
            email: this.email,
            password: this.password
          }
        })
        window.Cookies.set('_token', signinUser.token)
        window.location.reload()
      } catch (e) {
        this.error = 'Tài khoản hoặc mật khẩu không chính xác'
      }
      this.isLoading = false
    }
  }
}
</script>
