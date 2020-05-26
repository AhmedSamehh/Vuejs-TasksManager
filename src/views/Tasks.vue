<template>
  <div class="tasks">
    <v-snackbar v-model="taskDeleted" :timeout="5000" top color="error">
      Successfully Deleted!
      <v-btn color="white" text @click="taskDeleted = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="editSnack" :timeout="5000" top color="success">
      Successfully Edited!
      <v-btn color="white" text @click="editSnack = false">Close</v-btn>
    </v-snackbar>
    <h2 class="subtitle-1 grey--text ">Tasks</h2>
    <v-container class="my-12">
      <v-expansion-panels>
        <v-expansion-panel
          class="py-3"
          v-for="task in myTasks"
          :key="task.title"
        >
          <v-expansion-panel-header class="font-weight-bold">{{ task.title }}</v-expansion-panel-header>
          <v-expansion-panel-content class="grey--text">
            <hr />
            <div class="mt-2 font-weight-bold">Status: {{ task.status }}</div>
            <div class="mt-2 font-weight-bold">Due date: {{ task.due }}</div>
            <div>{{ task.content }}</div>
            <v-row>
              <v-btn small fab @click="checker(task.id,task.status)" class="mt-4 ml-3 success">
                <v-icon>mdi-check-bold</v-icon>
              </v-btn>
              <editPopup class="mt-4 mx-4" :task="task" @taskEdited="snackEdit()" />
              <v-btn small fab @click="deleteWindow=true" class="mt-4 " color="error">
                <v-icon>mdi-delete-forever</v-icon>
              </v-btn>
              
            </v-row>
            
            <v-dialog v-model="deleteWindow" max-width="290">
              <v-card>
                <v-card-title class="headline"
                  >Confirm delete</v-card-title>
                <v-card-text>
                  Are you sure you want to delete this task?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="deleteWindow = false">No</v-btn>
                  <v-btn color="red darken-1" text @click="deleteTask(task.id)">Yes</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import editPopup from '../components/editPopup'
import db from "@/fb.js";
export default {
  components:{
    editPopup
  },
  data() {
    return {
      tasks: [],
      deleteWindow:false,
      yesDelete:false,
      taskDeleted: false,
      editSnack:false,
      toggleComplete:false,
    };
  },
  computed: {
    myTasks() {
      return this.tasks.filter((t) => {
        return t.person === "Ahmad Sameh";
      });
    },
  },
  methods: {
    checker(taskId,status){
      var taskk = db.collection("tasks").doc(taskId);
      if(status=="Ongoing"){
        return taskk.update({
          status: "Completed"
        })
      }else if(status=="Completed"){
        return taskk.update({
          status: "Ongoing"
        })
      }
    },
    snackEdit(){
      this.editSnack=true
    },
    deleteTask(Id) {
      db.collection("tasks").doc(Id).delete()
      this.deleteWindow = false;
      this.taskDeleted = true;
    },
    

  },
  created() {
    db.collection("tasks").onSnapshot(response => {
      this.tasks = [];
      response.forEach(doc => {
        let t = doc.data()
        t.id = doc.id
        this.tasks.push(t)
      });
    });
  },
};
</script>