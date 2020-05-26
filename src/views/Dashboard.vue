<template>
  <div class="dashboard">
    <h2 class="subtitle-1 grey--text ">Dashboard</h2>
    <v-container class="my-8">      
      <v-row class="mb-4">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text color="grey" @click="sortBy('title')">
              <v-icon>mdi-folder</v-icon>
              <span class="text-lowercase">By task</span>
            </v-btn>
          </template>
          <span>Sort tasks by task title</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text color="grey" @click="sortBy('person')">
              <v-icon>mdi-account</v-icon>
              <span class="text-lowercase">By person</span>
            </v-btn>
          </template>
          <span>Sort tasks by person name</span>
        </v-tooltip>
      </v-row>
      <v-card v-for="task in tasks" :key="task.title" class="px-3 mb-5">
        <v-row :class="`task ${task.status}`">
          <v-col cols="12" sm="12" md="5">
            <div class="grey--text">Task title</div>
            <div>{{task.title}}</div>
          </v-col>
          <v-col cols="6" sm="4" md="2">
            <div class="grey--text">Author</div>
            <router-link style="text-decoration:none;color:inherit" v-if="task.person=='Ahmad Sameh'" :to="'/tasks'">
              <div>{{task.person}}</div>
            </router-link>
            <div v-else>{{task.person}}</div>
          </v-col>
          <v-col cols="6" sm="4" md="2">
            <div class="grey--text">Due date</div>
            <div>{{task.due}}</div>
          </v-col>
          <v-col cols="8" sm="4" md="3" class="text-right mt-2">
            <router-link :to="'/tasks'" class="mr-4 mb-4" v-if="task.person == 'Ahmad Sameh'">Edit</router-link>
            <v-chip class="v-chip--active white--text" :color="`${task.status}`">{{task.status}}</v-chip>
            
          </v-col>
        </v-row>
        <v-row cols="12" >
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb.js';
export default{
  data(){
    return{
      tasks:[],
    }
  },
  methods:{
    sortBy(p){
      this.tasks.sort((a,b)=> a[p] < b[p] ? -1 : 1)
    }
  },
  created(){
    db.collection('tasks').onSnapshot(response =>{
      const changes = response.docChanges();
      changes.forEach(change =>{
        if(change.type === 'added')
        {
          this.tasks.push({
            ...change.doc.data()
          })
        }
      })
      var today = new Date();
      var thisDay = String(today.getDate()).padStart(2, '0');
      var thisMonth = String(today.getMonth() + 1).padStart(2, '0');
      var thisYear = today.getFullYear();

      
      for(var i=0;i<this.tasks.length;i++ ){
        var date = this.tasks[i].due;
        var dateList = date.split("-");
        if(dateList[0]<=thisYear&&dateList[1]<=thisMonth&&dateList[2]<thisDay){
          this.tasks[i].status = "Overdue";
        }
      }
    })
  }
}
</script>
<style>
.task.Completed{
  border-left: 6px solid #4ce74c ;
}
.task.Overdue{
  border-left: 6px solid tomato ;
}
.task.Ongoing{
  border-left: 6px solid #64bdf5 ;
}

.v-chip.Completed{
  background: #1aa71a ;
}
.v-chip.Completed:hover{
  background: #2fbe2f;
  transition: 0.8s;
}
.v-chip.Overdue{
  background: rgb(180, 49, 25) ;
}
.v-chip.Overdue:hover{
  background: rgb(207, 64, 39);
  transition: 0.8s;
}
.v-chip.Ongoing{
  background: #278bc9;
}
.v-chip.Ongoing:hover{
  background: #48a8e4;
  transition: 0.8s;
}
</style>
