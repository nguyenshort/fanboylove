<template>
  <div class="nav-tabs-wrap">
    <ul class="nav nav-tabs">
      <router-link to="/settings/bookmark" custom v-slot="{ navigate, isActive }">
        <li :class="isActive ? 'active' : ''">
          <a @click="navigate" @keypress.enter="navigate" href="javascript:void(0)">
            <i class="icon ion-ios-bookmark"></i>
            Theo Dõi
          </a>
        </li>
      </router-link>



      <router-link to="/settings/history" custom v-slot="{ navigate, isActive }">
        <li :class="isActive ? 'active' : ''">
          <a @click="navigate" @keypress.enter="navigate" href="javascript:void(0)">
            <i class="icon ion-md-alarm"></i>
            Lịch Sử
          </a>
        </li>
      </router-link>

      <router-link to="/settings/account" custom v-slot="{ navigate, isActive }">
        <li :class="isActive ? 'active' : ''">
          <a @click="navigate" @keypress.enter="navigate" href="javascript:void(0)">
            <i class="icon ion-md-person"></i>
            Tài Khoản
          </a>
        </li>
      </router-link>


    </ul>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>
