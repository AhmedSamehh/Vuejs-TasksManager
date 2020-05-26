<template>
   <div class="team">
    <h2 class="subtitle-1 grey--text ">Team</h2>
    <v-container class="my-12">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="person in team" :key="person.name">
          <v-card class="text-center">
            <v-responsive class="pt-4">
              <v-avatar size="100">
                <img :src="person.avatar" alt="JohnWick">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <h2>{{person.name}}</h2>
              <div color="grey--text">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon left>mdi-message</v-icon>
                <span>Message!</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
data(){
  return{
    team: [
        { name: 'Ahmad Sameh', role: 'Web developer',avatar:'/imgs/1.jpg'},
        { name: 'Mark Zuckerberg', role: 'Senior Web developer',avatar:'/imgs/5.jpg' },
        { name: 'Steve Jobs', role: 'IOS Developer',avatar:'/imgs/4.jpg' },        
        { name: 'Bill Gates', role: 'Senior Software Engineer',avatar:'/imgs/6.jpg' },
        { name: 'John Wick', role: 'Bugs Killer',avatar:'/imgs/2.jpg' },
        { name: 'Walter White', role: 'Social media maverick',avatar:'/imgs/3.jpg' },
      ],
  }
}
}
</script>