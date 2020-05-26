<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="5000" top color="success">
      Successfully Added!
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-app-bar app flat color="blue darken-3">
      <v-app-bar-nav-icon
        dark
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <router-link style="text-decoration: none" :to="'/'" >
        <v-toolbar-title class="white--text text-uppercase">
          <span class="font-weight-light">Todo</span>
          <span>Se7a</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
     

      <v-btn @click="darkMode()" text dark>
        <span>Change Theme</span>
        <v-icon right>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app dark v-model="drawer">
      <v-row class="text-center">
        <v-col cols="12">
          <v-avatar size="80">
            <img src="/imgs/1.jpg" alt="" />
          </v-avatar>
        </v-col>
        <v-col>
          <h2 class="white--text">Ahmad Sameh</h2>
        </v-col>
      </v-row>
      <div class="ma-5">
        <addPopup @taskAdded="snackbar=true" />
      </div>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import addPopup from './addPopup'
export default {
    components:{
        addPopup,
    },
    methods:{
      darkMode(){
              this.$vuetify.theme.dark = !this.$vuetify.theme.dark

      }
    },
  data() {
    return {
        dialog: false,
        drawer: false,
        snackbar:false,
        items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
        { title: "My Tasks", icon: "mdi-folder", route: "/tasks" },
        { title: "Team", icon: "mdi-account", route: "/team" },
        ],
    };
  },
};
</script>
