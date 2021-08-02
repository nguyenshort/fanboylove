<template>
  <div class="nav-tabs-wrap">
    <ul class="nav nav-tabs">
      <router-link
        v-if="false"
        v-slot="{ navigate, isActive }"
        to="/settings/bookmark"
        custom
      >
        <li :class="isActive ? 'active' : ''">
          <a
            href="javascript:void(0)"
            @click="navigate"
            @keypress.enter="navigate"
          >
            <i class="icon ion-ios-bookmark" />
            Theo Dõi
          </a>
        </li>
      </router-link>

      <li class="">
        <a href="javascript:void(0)"
          ><i class="icon ion-ios-bookmark" />
          Theo Dõi
        </a>
      </li>

      <router-link
        v-if="false"
        v-slot="{ navigate, isActive }"
        to="/settings/history"
        custom
      >
        <li :class="isActive ? 'active' : ''">
          <a
            href="javascript:void(0)"
            @click="navigate"
            @keypress.enter="navigate"
          >
            <i class="icon ion-md-alarm" />
            Lịch Sử
          </a>
        </li>
      </router-link>

      <li class="">
        <a href="javascript:void(0)"
          ><i class="icon ion-md-alarm" />
          Lịch Sử
        </a>
      </li>

      <router-link
        v-slot="{ navigate, isActive }"
        to="/settings/account"
        custom
      >
        <li :class="isActive ? 'active' : ''">
          <a
            href="javascript:void(0)"
            @click="navigate"
            @keypress.enter="navigate"
          >
            <i class="icon ion-md-person" />
            Tài Khoản
          </a>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>
