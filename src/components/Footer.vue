<template>
  <v-footer padless>
    <v-card
      flat
      class="text-center"
      width="100%"
    >
      <v-card-text  class="pa-0">
        <v-btn
          v-for="icon in icons"
          :key="icon.icon"
          :href="icon.link"
          class="mx-2 "
          icon
          target="_blank"
        >
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>

        <div class="pa-2">
          {{ new Date().getFullYear() }} — <strong>Made with ❤️ by -Ahmad Sameh</strong>
        </div>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({

      icons: [
        {icon:'mdi-stack-overflow',link:'https://stackoverflow.com/users/12441419/ahmad-sameh'},
        {icon:'mdi-linkedin',link:'https://www.linkedin.com/in/ahmed-sameh-232bb514b/'},
        {icon:'mdi-github',link:'https://github.com/AhmedSamehh'},
      ],
    }),
  }
</script>